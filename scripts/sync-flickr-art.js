// Sincroniza el banco de imágenes de arte del sitio con los álbumes
// públicos de una cuenta de Flickr. Corre desde GitHub Actions (ver
// .github/workflows/sync-flickr-art.yml), no localmente ni durante el
// build de Vercel: necesita FLICKR_API_KEY y acceso a api.flickr.com,
// que este proyecto no requiere para funcionar en producción — el
// resultado (data/flickr-art.json) queda commiteado y es lo único que
// lee la app en runtime (ver lib/art.ts).
//
// Recorre los álbumes ("photosets") públicos de FLICKR_USER_ID y junta
// la URL de imagen de mayor resolución disponible de cada foto.

const fs = require("node:fs");
const path = require("node:path");

const FLICKR_USER_ID = "75474645@N02";
const API_BASE = "https://api.flickr.com/services/rest/";
const OUTPUT_PATH = path.join(__dirname, "..", "data", "flickr-art.json");
const PER_PAGE = 500;

const apiKey = process.env.FLICKR_API_KEY;
if (!apiKey) {
  console.error("[sync-flickr-art] Falta la variable de entorno FLICKR_API_KEY.");
  process.exit(1);
}

async function flickrCall(method, params = {}) {
  const url = new URL(API_BASE);
  url.searchParams.set("method", method);
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("format", "json");
  url.searchParams.set("nojsoncallback", "1");
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, String(value));
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`[sync-flickr-art] ${method} respondió HTTP ${response.status}`);
  }
  const data = await response.json();
  if (data.stat !== "ok") {
    throw new Error(`[sync-flickr-art] ${method} falló: ${data.message ?? "error desconocido"} (code ${data.code})`);
  }
  return data;
}

async function getAllPhotosets() {
  const photosets = [];
  let page = 1;
  let pages = 1;
  do {
    const data = await flickrCall("flickr.photosets.getList", {
      user_id: FLICKR_USER_ID,
      page,
      per_page: PER_PAGE,
    });
    photosets.push(...data.photosets.photoset);
    pages = data.photosets.pages;
    page += 1;
  } while (page <= pages);
  return photosets;
}

function bestUrl(photo) {
  return (
    photo.url_o ||
    photo.url_k ||
    photo.url_l ||
    `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`
  );
}

async function getAlbumPhotos(photosetId, albumTitle) {
  const photos = [];
  let page = 1;
  let pages = 1;
  do {
    const data = await flickrCall("flickr.photosets.getPhotos", {
      photoset_id: photosetId,
      user_id: FLICKR_USER_ID,
      extras: "url_o,url_k,url_l",
      page,
      per_page: PER_PAGE,
    });
    for (const photo of data.photoset.photo) {
      photos.push({
        id: photo.id,
        title: photo.title || albumTitle,
        album: albumTitle,
        url: bestUrl(photo),
      });
    }
    pages = data.photoset.pages;
    page += 1;
  } while (page <= pages);
  return photos;
}

async function main() {
  console.log(`[sync-flickr-art] Buscando álbumes de ${FLICKR_USER_ID}...`);
  const photosets = await getAllPhotosets();
  console.log(`[sync-flickr-art] ${photosets.length} álbum(es) encontrados.`);

  const seen = new Map();
  for (const set of photosets) {
    const title = set.title._content || set.title;
    const photos = await getAlbumPhotos(set.id, title);
    console.log(`[sync-flickr-art]   ${title}: ${photos.length} foto(s)`);
    for (const photo of photos) {
      if (!seen.has(photo.id)) seen.set(photo.id, photo);
    }
  }

  const manifest = {
    syncedAt: new Date().toISOString(),
    source: `https://www.flickr.com/photos/${FLICKR_USER_ID}/albums/`,
    photos: Array.from(seen.values()),
  };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`[sync-flickr-art] ${manifest.photos.length} foto(s) únicas guardadas en ${OUTPUT_PATH}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
