// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// TODO: cambia esta URL por tu dominio final (o la URL que te dé Vercel).
const SITE_URL = 'https://carlosvizcaino.vercel.app';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'ignore',
  adapter: vercel({
    webAnalytics: { enabled: process.env.PUBLIC_ENABLE_ANALYTICS === 'true' },
  }),
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'es', locales: { es: 'es-ES', en: 'en-GB' } },
      filter: (page) => !page.includes('/api/'),
    }),
  ],
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  vite: {
    plugins: [tailwindcss()],
  },
});
