# Portfolio · Carlos Vizcaino Rigol

Portfolio personal bilingüe (ES/EN) hecho con **Astro 7**, **Tailwind CSS 4** y desplegado en **Vercel**.
Concepto visual: *"Carril volcánico"*, una mezcla de terminal y pop-brutalismo con paleta canaria
(picón, jable, lava, Atlántico y azufre) y guiños a la natación (ondas, carriles).

## Puesta en marcha

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # astro check + build de producción
npm run assets     # regenera favicons, imágenes OG y CV de ejemplo (public/)
```

Requisitos: Node 22 o superior (Vercel usa Node 24).

## Estructura

```
src/
  config/site.ts            ← email, LinkedIn, GitHub, CV y disponibilidad (único sitio)
  i18n/ui.ts                ← todos los textos de interfaz en ES y EN
  content/projects/{es,en}/ ← un Markdown por proyecto e idioma
  data/                     ← trayectoria, habilidades y formación (ES/EN en el mismo objeto)
  components/sections/      ← Hero, Sobre mí, Proyectos, Trayectoria, Habilidades, Formación, Contacto
  components/mockups/       ← ilustraciones SVG de cada proyecto (datos 100 % inventados)
  pages/                    ← / (es), /en/, /proyectos/[slug], /en/projects/[slug], 404, api/contact
  scripts/                  ← JS del cliente: animaciones, tema, menú, filtros, formulario
public/
  cv/                       ← PDF del CV (ES y EN)
  og/                       ← imágenes para redes sociales
scripts/generate-assets.mjs ← genera favicons, OG y CV de ejemplo
```

## Cómo actualizar el contenido

### Añadir un proyecto
1. Copia un archivo de `src/content/projects/es/` y otro de `src/content/projects/en/` con el mismo `slug`.
2. Rellena los campos (el esquema está en `src/content.config.ts`; si falta algo, `npm run build` te avisa).
3. `order` decide la posición, `featured: true` lo hace más ancho, `visible: false` lo oculta sin borrarlo
   y `privacy: private` muestra la etiqueta "Código privado".
4. El cuerpo del Markdown aparece en "Detalles técnicos" (desplegable) de la página del proyecto.
5. Para la imagen, `mockup` elige una ilustración de `ProjectMockup.astro`. Si quieres otra, añade un nuevo
   `kind` en ese componente y en el `enum` del esquema.

### Añadir un hito, una habilidad o un título
Edita `src/data/timeline.ts`, `src/data/skills.ts` o `src/data/education.ts`. Cada texto lleva `{ es, en }`.

### Cambiar email, redes o CV
Todo está en `src/config/site.ts`. Sustituye los PDF de `public/cv/` por los tuyos con el mismo nombre.

### Añadir un idioma
1. Añádelo a `languages` en `src/i18n/ui.ts` y copia el bloque de textos.
2. Añádelo a `i18n.locales` en `astro.config.mjs` (y al `sitemap`).
3. Crea `src/pages/<idioma>/index.astro` y la ruta de proyectos, y añade la carpeta en `src/content/projects/`.
4. Añade la clave del idioma en los objetos `{ es, en }` de `src/data/`.

## Formulario de contacto

`src/pages/api/contact.ts` es una función serverless que envía el mensaje con [Resend](https://resend.com).
Valida en cliente y servidor (zod), tiene honeypot anti-spam y un límite de 5 envíos por IP cada 10 minutos.

Variables de entorno (ver `.env.example`):

| Variable | Para qué |
| --- | --- |
| `RESEND_API_KEY` | Clave de Resend. **Obligatoria en producción.** |
| `CONTACT_FROM` | Remitente. Por defecto `Portfolio <onboarding@resend.dev>` (dominio de pruebas de Resend). |
| `CONTACT_TO` | Destinatario. Por defecto `carlosvirigol@gmail.com`. |
| `PUBLIC_ENABLE_ANALYTICS` | `true` activa Vercel Web Analytics (sin cookies). |

En local, sin `RESEND_API_KEY`, el envío se **simula** (el mensaje sale en la consola) para poder probar el flujo.
Con el remitente de pruebas `onboarding@resend.dev`, Resend solo entrega al email con el que creaste la cuenta;
para usar otro remitente, verifica tu dominio en Resend.

## Despliegue en Vercel

1. Sube el repositorio a GitHub.
2. En [vercel.com/new](https://vercel.com/new) importa el repositorio. Vercel detecta Astro automáticamente.
3. En *Settings → Environment Variables* añade `RESEND_API_KEY` (y las demás si quieres cambiarlas).
4. Despliega. Cada `git push` a `main` vuelve a desplegar.
5. Cambia `SITE_URL` en `astro.config.mjs` y la línea `Sitemap:` de `public/robots.txt` por tu URL final.

### Dominio propio
1. En el proyecto de Vercel: *Settings → Domains → Add* y escribe tu dominio.
2. En tu proveedor de dominio crea los registros DNS que te indique Vercel
   (normalmente un `A` a `76.76.21.21` para el dominio raíz y un `CNAME` a `cname.vercel-dns.com` para `www`).
3. Actualiza `SITE_URL` (astro.config.mjs) y `robots.txt`, y vuelve a desplegar.
4. Opcional: verifica el dominio en Resend para enviar desde `portfolio@tudominio.com`.

## Calidad

- Lighthouse móvil (build de producción, local): Rendimiento 98-99 · Accesibilidad 100 · Buenas prácticas 100 · SEO 100.
- Tema claro/oscuro sin parpadeo (script en `<head>`), guardado en `localStorage`.
- `prefers-reduced-motion`: sin scroll suave, sin animaciones de entrada, terminal escrito desde el principio.
- Sitemap con `hreflang`, `robots.txt`, Open Graph por idioma, JSON-LD `Person`, manifest y favicons.

## Privacidad

Ningún proyecto muestra datos reales: las ilustraciones de Psicofactur y Músculo Lab usan nombres y cifras
inventados, y no hay claves ni referencias internas de servicios en el repositorio.
Los proyectos con clientes tienen `visible` en su archivo para ocultarlos si el cliente no da permiso.

## Pendientes (TODO)

Busca `TODO` en el código para verlos en contexto.

- [ ] **CV:** sustituir `public/cv/Carlos-Vizcaino-CV.pdf` y `-EN.pdf` (ahora son de ejemplo). Sin teléfono ni dirección.
- [ ] **Clave de Resend** en Vercel (`RESEND_API_KEY`) y prueba real del formulario en producción.
- [ ] **URL final** en `astro.config.mjs` (`SITE_URL`) y `public/robots.txt`.
- [ ] **Niveles de habilidades** en `src/data/skills.ts` (asignados por criterio, revísalos).
- [ ] **Fechas de la trayectoria** (`src/data/timeline.ts`): eventos juveniles, fundación de Origen LZT,
      curso de Google, curso de las matrículas/sobresalientes y curso de SprintPilot.
- [ ] **SprintPilot:** confirmar asignatura/curso en el Markdown y, si quieres, capturas reales.
- [ ] **Webs para negocios locales:** confirmar tecnologías usadas y permiso de los clientes para enlazarlas.
- [ ] **Psicofactur y Músculo Lab:** confirmar permiso del cliente para mostrarlos (`visible`).
- [ ] **TFG:** decidir si se publica (`visible: true` en `src/content/projects/*/tfg-daos.md`) y confirmar el stack.
