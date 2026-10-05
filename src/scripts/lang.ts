/**
 * Idioma, sin redirecciones: si la persona no ha elegido idioma y su navegador está en el otro,
 * aparece un aviso pequeño. La elección se recuerda en localStorage.
 */
const read = () => {
  try {
    return localStorage.getItem('lang');
  } catch {
    return null;
  }
};
const save = (lang: string) => {
  try {
    localStorage.setItem('lang', lang);
  } catch {}
};

export function bindLang() {
  document.addEventListener('click', (e) => {
    const t = e.target as Element;
    const sw = t.closest<HTMLElement>('[data-lang-switch]');
    if (sw?.dataset.langSwitch) save(sw.dataset.langSwitch);
    const dismiss = t.closest<HTMLElement>('[data-lang-dismiss]');
    if (dismiss) {
      const box = dismiss.closest<HTMLElement>('[data-lang-suggest]');
      if (box?.dataset.currentLang) save(box.dataset.currentLang);
      box?.classList.add('hidden');
    }
  });
}

export function initLangSuggest() {
  const box = document.querySelector<HTMLElement>('[data-lang-suggest]');
  if (!box) return;
  const other = box.dataset.langSuggest!;
  const stored = read();
  const browser = (navigator.languages?.[0] ?? navigator.language ?? '').slice(0, 2).toLowerCase();
  const suggest = stored ? stored === other : browser === other;
  if (!suggest) return;
  const id = window.setTimeout(() => box.classList.remove('hidden'), 1800);
  return () => clearTimeout(id);
}
