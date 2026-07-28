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
| `_data/empresa.js` | Textos de Quiénes somos: intro, servicios, valores y equipo |

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
    img/{eventos,clientes,servicios,staff,marca}/
  root/                   se copia tal cual a la raíz (_headers, _redirects, robots.txt)
  index.njk  quienes-somos.njk  portfolio.njk  contacto.njk
  404.njk  sitemap.njk
```

## Diseño

Paleta tomada del logo: rojo `#d0383f` y carbón `#161414`. Están en el bloque
`:root` arriba de `assets/css/style.css` — cambiando esas líneas cambia el sitio
entero. Tipografía [Jost](https://fonts.google.com/specimen/Jost), que acompaña la
geométrica del wordmark. Los `.woff2` están en el repo; no se le pide nada a Google.

Contrastes verificados contra WCAG AA. Ojo con un detalle: el rojo de marca da
4.86:1 sobre blanco, suficiente para texto pero justo — por eso los enlaces usan
una variante más oscura (`--red-ink`, 6.91:1) y el rojo pleno queda para fondos,
bordes y detalles.

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
- `/contact-us/` pasó a `/contacto/`, y `/about-us/` a `/quienes-somos/`. Las URLs
  viejas redirigen con 301.
- Dos fotos del equipo estaban en formato HEIC y la portada del evento de Audi era
  un PDF — no se veían en la mayoría de los navegadores. Convertidas a JPEG.
- La paginación de `/portfolio/` devolvía las mismas 29 imágenes en las 6 páginas.
  Ahora es una sola página.
