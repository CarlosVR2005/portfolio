import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '@/i18n/ui';

export type Project = CollectionEntry<'projects'>;

/** Proyectos visibles de un idioma, ordenados. */
export async function getProjects(lang: Lang): Promise<Project[]> {
  const all = await getCollection('projects', ({ data }) => data.lang === lang && data.visible);
  return all.sort((a, b) => a.data.order - b.data.order);
}

export const accentBg: Record<Project['data']['accent'], string> = {
  lava: 'bg-[#ff6a3d]',
  ocean: 'bg-[#4fc3e0]',
  sulfur: 'bg-[#ffc53d]',
};
