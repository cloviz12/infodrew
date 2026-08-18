# Fotos - agosto 2026

8 fotos aéreas/de territorio para una futura noticia de la sección Cauca.

Pendiente:
- Título, texto y sección/categoría definitiva del post (no se generó
  contenido editorial automáticamente para no publicar información
  inventada en el sitio).
- Los 5 videos DJI que acompañan estas fotos no se subieron: pesan entre
  12MB y 512MB, y GitHub bloquea archivos mayores a 100MB en un push
  normal (el total, ~1.46GB, tampoco cabe en la cuota gratuita de Git
  LFS de un repo). Hay que subirlos a un host externo (YouTube/Vimeo) y
  usar esa URL como `Media.url` al crear el post.

Una vez haya título/texto, se puede crear el post desde `/enviar` en el
sitio (o `prisma/seed.js`) usando estas imágenes como `coverImage` /
`media[].url`, por ejemplo `/media/cauca-2026-08/<archivo>.jpg`.
