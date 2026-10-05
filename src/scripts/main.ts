/**
 * Punto de entrada del JS del sitio.
 * - bind*: listeners delegados en `document`, se registran una sola vez.
 * - init*: dependen del DOM de la página; se ejecutan en cada navegación (View Transitions)
 *   y devuelven una función de limpieza.
 */
import type { Cleanup } from './env';
import { initSmooth, bindAnchors } from './smooth';
import { bindTheme } from './theme';
import { initNav, bindMenu } from './nav';
import { initReveal, initTimeline } from './reveal';
import { initDots, initTerminal } from './hero';
import { bindProjectFilters } from './projects';
import { initTilt } from './tilt';
import { bindCursor } from './cursor';
import { bindLang, initLangSuggest } from './lang';
import { bindContact } from './contact';

bindTheme();
bindAnchors();
bindMenu();
bindProjectFilters();
bindCursor();
bindLang();
bindContact();

let cleanups: Cleanup[] = [];

function run(fn: () => Cleanup | void) {
  try {
    const c = fn();
    if (c) cleanups.push(c);
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener('astro:page-load', () => {
  [initSmooth, initReveal, initNav, initTimeline, initDots, initTerminal, initTilt, initLangSuggest].forEach(run);
});

document.addEventListener('astro:before-swap', () => {
  cleanups.forEach((c) => c());
  cleanups = [];
});
