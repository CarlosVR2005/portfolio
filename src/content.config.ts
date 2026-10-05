import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Proyectos: un archivo Markdown por proyecto e idioma.
 *   src/content/projects/es/<slug>.md
 *   src/content/projects/en/<slug>.md
 * El cuerpo del Markdown se muestra como "Detalles técnicos" (desplegable).
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    slug: z.string(),
    lang: z.enum(['es', 'en']),
    order: z.number(),
    title: z.string(),
    hook: z.string(),
    category: z.enum(['team', 'entrepreneurship', 'freelance', 'academic']),
    featured: z.boolean().default(false),
    /** false = no se publica (ni tarjeta ni página) */
    visible: z.boolean().default(true),
    status: z.enum(['live', 'wip', 'done']),
    /** private = sin repo público, imágenes con datos ficticios */
    privacy: z.enum(['public', 'private']).default('public'),
    year: z.string(),
    role: z.string(),
    team: z.string().optional(),
    stack: z.array(z.string()),
    highlights: z.array(z.string()).min(1),
    problem: z.string(),
    solution: z.array(z.string()),
    result: z.string(),
    links: z
      .object({
        repo: z.url().optional(),
        demo: z.url().optional(),
        sites: z.array(z.object({ label: z.string(), url: z.url() })).optional(),
      })
      .default({}),
    mockup: z.enum(['sprintpilot', 'origen', 'psicofactur', 'musculo', 'webs', 'tfg']),
    accent: z.enum(['lava', 'ocean', 'sulfur']).default('lava'),
  }),
});

export const collections = { projects };
