import { ui, defaultLang, type Lang, type UiKey } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  if (first && first in ui) return first as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/** Texto traducible en ficheros de datos. */
export type L10n<T = string> = Record<Lang, T>;
export const pick = <T,>(value: L10n<T>, lang: Lang): T => value[lang] ?? value[defaultLang];

/** Prefijo de ruta para un idioma ('' para el idioma por defecto). */
export const langPrefix = (lang: Lang) => (lang === defaultLang ? '' : `/${lang}`);

/** Ruta de detalle de proyecto por idioma. */
export const projectPath = (lang: Lang, slug: string) =>
  lang === 'es' ? `/proyectos/${slug}` : `/en/projects/${slug}`;

/** Equivalente de la ruta actual en el otro idioma. */
export function alternatePath(pathname: string, target: Lang): string {
  const clean = pathname.replace(/\/$/, '') || '/';
  const esProject = clean.match(/^\/proyectos\/([^/]+)$/);
  const enProject = clean.match(/^\/en\/projects\/([^/]+)$/);
  if (esProject) return projectPath(target, esProject[1]!);
  if (enProject) return projectPath(target, enProject[1]!);
  const withoutLang = clean.replace(/^\/en(?=\/|$)/, '') || '/';
  if (target === defaultLang) return withoutLang;
  return withoutLang === '/' ? '/en/' : `/en${withoutLang}`;
}
