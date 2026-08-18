# Fotos y videos - agosto 2026

8 fotos aéreas/de territorio para una futura noticia de la sección Cauca.

Los 5 videos DJI que las acompañan pesan entre 12MB y 512MB (~1.46GB en
total): superan el límite de 100MB por archivo de git/GitHub y la cuota
gratuita de Git LFS, así que no están en este commit. En su lugar se
subieron como assets del release
[`media-cauca-2026-08`](https://github.com/cloviz12/infodrew/releases/tag/media-cauca-2026-08),
que sí acepta archivos de hasta 2GB sin costo. URLs de descarga directa,
listas para usarse como `Media.url` (tipo VIDEO):

| Archivo | Tamaño | URL |
| --- | --- | --- |
| DJI_0008.MP4 | 12MB | https://github.com/cloviz12/infodrew/releases/download/media-cauca-2026-08/DJI_0008.MP4 |
| DJI_0009.MP4 | 165MB | https://github.com/cloviz12/infodrew/releases/download/media-cauca-2026-08/DJI_0009.MP4 |
| DJI_0012.MP4 | 512MB | https://github.com/cloviz12/infodrew/releases/download/media-cauca-2026-08/DJI_0012.MP4 |
| DJI_0021.MP4 | 303MB | https://github.com/cloviz12/infodrew/releases/download/media-cauca-2026-08/DJI_0021.MP4 |
| DJI_0025.MP4 | 501MB | https://github.com/cloviz12/infodrew/releases/download/media-cauca-2026-08/DJI_0025.MP4 |

Pendiente:
- Título, texto y sección/categoría definitiva del post (no se generó
  contenido editorial automáticamente para no publicar información
  inventada en el sitio).

Una vez haya título/texto, se puede crear el post desde `/enviar` en el
sitio (o `prisma/seed.js`) usando las fotos como `coverImage` /
`media[].url` (ej. `/media/cauca-2026-08/<archivo>.jpg`) y los videos de
la tabla de arriba como `media[].url` tipo VIDEO.
