# marcelalussich.com.uy

Sitio de Marcela Lussich Eventos & Promociones.
[Eleventy](https://www.11ty.dev/) → HTML estático → Cloudflare Pages.

Una sola dependencia (`@11ty/eleventy`), sin JavaScript en el cliente y sin pedidos
a terceros: la tipografía está autohospedada.

## Correrlo

```bash
npm install
npm run dev      # http://localhost:8081, con recarga automática
npm run build    # genera _site/
```

## Dónde se edita cada cosa

Todo el contenido vive en `src/_data/`. No hace falta tocar plantillas ni CSS
para cambiar textos, sumar un evento o agregar un cliente.

| Archivo | Qué contiene |
| --- | --- |
| `_data/site.js` | Nombre, mail, teléfono, ciudades, menú de navegación |
| `_data/eventos.js` | Los eventos de la home: título, imagen y texto alternativo |
| `_data/clientes.js` | Los logos de la página Clientes |
| `_data/empresa.js` | Textos de Nosotros: intro y equipo. También la lista de servicios, que hoy no se muestra en ninguna página y solo alimenta el JSON-LD |

### Sumar un evento

Una entrada nueva arriba del todo en `_data/eventos.js`, y la foto en
`src/assets/img/eventos/` con el mismo nombre que pongas en `img`:

```js
{
  slug: "nombre-del-evento",
  title: "Nombre del evento",
  img: "nombre-del-evento",           // → assets/img/eventos/nombre-del-evento.jpg
  alt: "Descripción de la foto, para lectores de pantalla.",
},
```

Las fotos conviene subirlas a 1600 px de ancho. Desde la Terminal:

```bash
sips -Z 1600 -s format jpeg -s formatOptions 72 original.jpg --out src/assets/img/eventos/nombre.jpg
```

## Estructura

```
src/
  _data/                  todo el contenido editable
  _includes/layouts/
    base.njk              el shell: head, menú, footer
  assets/
    css/style.css         todo el CSS, con la paleta arriba de todo
    fonts/                Jost (variable, subsets latin y latin-ext)
    img/{eventos,clientes,staff,marca}/
  root/                   se copia tal cual a la raíz (_headers, _redirects, robots.txt)
  index.njk  nosotros.njk  portfolio.njk  contacto.njk
  404.njk  sitemap.njk

marca-master/             originales del logo (PDF, JPG, PNG). NO se publica.
```

## Diseño

Paleta tomada del logo del diseñador: rojo `#db2f36` y carbón `#1a171c`. Están en
el bloque `:root` arriba de `assets/css/style.css` — cambiando esas líneas cambia
el sitio entero. Tipografía [Jost](https://fonts.google.com/specimen/Jost), que
acompaña la geométrica del wordmark. Los `.woff2` están en el repo; no se le pide
nada a Google.

El rojo va exacto, sin retocar: da 4.70:1 con blanco encima, arriba del 4.5 que
pide WCAG AA para texto normal, y ese color es el fondo de la banda de cierre y de
los botones. Para texto rojo sobre blanco hay una variante más oscura (`--red-ink`,
6.91:1). El `--ink` del sitio es `#161414` y no el `#1a171c` del logo a propósito:
la diferencia es imperceptible y los grises suaves están derivados del cálido.

El logo publicado es `assets/img/marca/logo.svg`, con el `viewBox` recortado a la
caja real del dibujo — el archivo del diseñador venía con un tercio del ancho y
más de la mitad del alto en margen vacío, y el espaciado conviene que lo decida el
CSS. Los otros formatos que mandó (PDF, JPG, PNG) están en `marca-master/`, fuera
de `src/`, porque **todo lo que está bajo `src/assets` se publica** y el PDF solo
pesa 676 KB. El favicon reusa los dos trazados del símbolo, copiados del mismo
archivo.

## Deploy en Cloudflare Pages

| Campo | Valor |
| --- | --- |
| Build command | `npm run build` |
| Build output directory | `_site` |
| Variable de entorno | `NODE_VERSION` = `22` |

Cada push a `main` publica. `src/root/_headers` define headers de seguridad y
caché; `src/root/_redirects` mantiene vivas las URLs del WordPress anterior.

> **El dominio tiene el correo en Google Workspace.** Al apuntar
> `marcelalussich.com.uy` a Pages hay que tocar únicamente los registros A/CNAME.
> Si se borran los MX, se cae el mail de la empresa.

## Migrado desde WordPress

Contenido importado del export de julio de 2026. Cambios respecto del sitio viejo:

- La home era un loop de posts paginado (`/home/`, `/home/page/2/`); ahora es una
  sola grilla en `/`.
- `/contact-us/` pasó a `/contacto/`, y `/about-us/` a `/nosotros/`. Las URLs
  viejas redirigen con 301.
- Dos fotos del equipo estaban en formato HEIC y la portada del evento de Audi era
  un PDF — no se veían en la mayoría de los navegadores. Convertidas a JPEG.
- La paginación de `/portfolio/` devolvía las mismas 29 imágenes en las 6 páginas.
  Ahora es una sola página.
