// @ts-check
import { defineConfig, envField } from 'astro/config';
import { loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// URL de producción. Si conectas un dominio propio, cámbiala aquí y en public/robots.txt.
const SITE_URL = 'https://carlosvizcaino.vercel.app';

const { PUBLIC_ENABLE_ANALYTICS } = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'ignore',
  adapter: vercel({
    // Analítica sin cookies de Vercel. Se activa con PUBLIC_ENABLE_ANALYTICS=true.
    webAnalytics: { enabled: (process.env.PUBLIC_ENABLE_ANALYTICS ?? PUBLIC_ENABLE_ANALYTICS) === 'true' },
  }),
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      CONTACT_FROM: envField.string({
        context: 'server',
        access: 'secret',
        default: 'Portfolio <onboarding@resend.dev>',
      }),
      CONTACT_TO: envField.string({ context: 'server', access: 'secret', default: 'carlosvirigol@gmail.com' }),
    },
  },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'es', locales: { es: 'es-ES', en: 'en-GB' } },
      filter: (page) => !page.includes('/api/') && !page.includes('/404'),
    }),
  ],
  // CSS en línea: evita una petición que bloquea el primer pintado (~10 KB gzip)
  build: { inlineStylesheets: 'always' },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  vite: {
    plugins: [tailwindcss()],
  },
});
