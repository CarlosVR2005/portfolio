# Estado del proyecto (trabajo en curso)

Proyecto pausado a petición de Carlos el 5 oct 2026. Todavía **no compila**: faltan piezas.

## Hecho
- Configuración: Astro 7 + Tailwind 4 + adaptador Vercel + sitemap + i18n (ES por defecto, EN en /en/).
- Tokens de diseño "Carril volcánico" (claro/oscuro) en `src/styles/global.css`.
- Datos centralizados: `src/config/site.ts` (email, LinkedIn, GitHub, CV).
- Textos de interfaz ES/EN: `src/i18n/ui.ts` + utilidades en `src/i18n/utils.ts`.
- Contenido tipado: 6 proyectos ES/EN en `src/content/projects/` (TFG con `visible: false`),
  trayectoria, habilidades y formación en `src/data/`.
- Componentes: layout base (tema sin parpadeo, SEO, JSON-LD), Nav, Footer, ThemeToggle,
  aviso de idioma, cursor, iconos, marquee, mockups SVG con datos ficticios,
  secciones Hero, Sobre mí, Proyectos (+ tarjeta y filtros), Trayectoria, Habilidades y Formación.

## Falta
- Sección Contacto + `src/pages/api/contact.ts` (Resend + zod + honeypot + límite de tasa).
- Páginas: `src/pages/index.astro`, `src/pages/en/index.astro`, detalle de proyecto
  (`src/pages/proyectos/[slug].astro`, `src/pages/en/projects/[slug].astro`), 404.
- Scripts cliente (`src/scripts/main.ts`): animaciones (Motion), Lenis, rejilla de puntos del hero,
  terminal, filtros, tilt, cursor, menú móvil, tema, formulario.
- Favicon, manifest, imágenes OG, robots.txt, PDFs del CV (placeholder), README.
- Build, Lighthouse y despliegue en Vercel.

## Para seguir
```bash
npm install
npm run dev
```
