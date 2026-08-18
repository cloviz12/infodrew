// Registro de las imágenes "de arte" (portadas a pantalla completa,
// estilo pantalla de carga de WeTransfer) que usa <ArtCover /> en la
// portada, /colombia, /cauca y el bloque "Síguenos".
//
// Las fotos vienen de data/flickr-art.json, que sincroniza
// scripts/sync-flickr-art.js vía el workflow
// .github/workflows/sync-flickr-art.yml (corre en GitHub Actions, no
// aquí — este archivo solo lee el resultado ya commiteado). Mientras
// ese archivo esté vacío (antes del primer sync), ArtCover pinta un
// degradado abstracto en su lugar, así que el sitio se ve bien de
// todas formas.
import manifest from "@/data/flickr-art.json";

export type ArtSlot = {
  src?: string;
  credit?: string;
};

type FlickrPhoto = { id: string; title?: string; url: string; album?: string };

const photos: FlickrPhoto[] = manifest.photos ?? [];

function hash(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (Math.imul(h, 31) + input.charCodeAt(i)) >>> 0;
  }
  return h;
}

// Una foto distinta por sección y por día: da la sensación de "obra
// distinta en cada visita" sin que cambie en cada refresh de la misma
// página, y sin depender de random() (que rompería el render estático).
function pick(key: string): ArtSlot {
  if (photos.length === 0) return {};
  const today = new Date().toISOString().slice(0, 10);
  const photo = photos[hash(`${key}:${today}`) % photos.length];
  return { src: photo.url, credit: photo.title };
}

export const ART: Record<"home" | "colombia" | "cauca" | "seguir", ArtSlot> = {
  get home() {
    return pick("home");
  },
  get colombia() {
    return pick("colombia");
  },
  get cauca() {
    return pick("cauca");
  },
  get seguir() {
    return pick("seguir");
  },
};
