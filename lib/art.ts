// Registro central de las imágenes "de arte" (portadas a pantalla
// completa, estilo pantalla de carga de WeTransfer) que usan
// <ArtCover /> en la portada, /colombia, /cauca y el bloque "Síguenos".
//
// Deja el enlace directo a la imagen (una URL que termine en .jpg/.png,
// no el enlace a la página del álbum) en el campo `src` de cada slot.
// Si `src` queda vacío, ArtCover pinta un degradado abstracto con el
// mismo velo de color en su lugar, así que el sitio se ve bien aunque
// todavía no haya fotos cargadas.
export type ArtSlot = {
  src?: string;
  credit?: string;
};

export const ART: Record<"home" | "colombia" | "cauca" | "seguir", ArtSlot> = {
  home: { src: undefined, credit: undefined },
  colombia: { src: undefined, credit: undefined },
  cauca: { src: undefined, credit: undefined },
  seguir: { src: undefined, credit: undefined },
};
