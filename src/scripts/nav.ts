import { lenis } from './smooth';
import type { Cleanup } from './env';

/** Indicador de sección activa + ocultar la barra al bajar y mostrarla al subir. */
export function initNav(): Cleanup | void {
  const header = document.querySelector<HTMLElement>('[data-nav]');
  if (!header) return;
  const list = header.querySelector<HTMLElement>('[data-nav-list]');
  const indicator = header.querySelector<HTMLElement>('[data-nav-indicator]');
  const links = [...header.querySelectorAll<HTMLAnchorElement>('[data-section-link]')];
  const cleanups: Cleanup[] = [];

  const setActive = (id: string | null) => {
    let active: HTMLAnchorElement | undefined;
    for (const link of links) {
      if (link.dataset.sectionLink === id) {
        link.setAttribute('aria-current', 'true');
        active = link;
      } else link.removeAttribute('aria-current');
    }
    if (!indicator || !list) return;
    if (!active) {
      indicator.style.opacity = '0';
      return;
    }
    indicator.style.opacity = '1';
    indicator.style.width = `${active.offsetWidth}px`;
    indicator.style.transform = `translateX(${active.offsetLeft}px)`;
  };

  const sections = links
    .map((l) => document.getElementById(l.dataset.sectionLink!))
    .filter((s): s is HTMLElement => !!s);
  if (sections.length && 'IntersectionObserver' in window) {
    const visible = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        const current = sections.find((s) => visible.has(s.id));
        setActive(current?.id ?? null);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    cleanups.push(() => io.disconnect());
  }

  // Ocultar al bajar / mostrar al subir
  let lastY = scrollY;
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const y = scrollY;
      header.classList.toggle('is-scrolled', y > 60);
      const hide = y > 480 && y > lastY + 4 && !header.contains(document.activeElement);
      if (hide) header.style.transform = 'translateY(-130%)';
      else if (y < lastY - 4 || y <= 480) header.style.transform = '';
      lastY = y;
    });
  };
  const onFocus = () => (header.style.transform = '');
  header.classList.toggle('is-scrolled', scrollY > 60);
  addEventListener('scroll', onScroll, { passive: true });
  header.addEventListener('focusin', onFocus);
  cleanups.push(() => {
    removeEventListener('scroll', onScroll);
    header.removeEventListener('focusin', onFocus);
  });

  return () => cleanups.forEach((c) => c());
}

/** Menú móvil a pantalla completa: foco atrapado, Escape para cerrar, sin scroll de fondo. */
export function bindMenu() {
  let lastFocus: HTMLElement | null = null;

  const els = () => ({
    menu: document.querySelector<HTMLElement>('[data-menu]'),
    openBtn: document.querySelector<HTMLButtonElement>('[data-menu-open]'),
  });

  const open = () => {
    const { menu, openBtn } = els();
    if (!menu) return;
    lastFocus = document.activeElement as HTMLElement | null;
    menu.classList.remove('hidden');
    openBtn?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    lenis?.stop();
    menu.querySelector<HTMLElement>('[data-menu-close]')?.focus();
  };
  const close = (restoreFocus = true) => {
    const { menu, openBtn } = els();
    if (!menu || menu.classList.contains('hidden')) return;
    menu.classList.add('hidden');
    openBtn?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    lenis?.start();
    if (restoreFocus) (lastFocus ?? openBtn)?.focus();
  };

  document.addEventListener('click', (e) => {
    const t = e.target as Element;
    if (t.closest('[data-menu-open]')) open();
    else if (t.closest('[data-menu-close]')) close();
    else if (t.closest('[data-menu-link]')) close(false);
  });
  document.addEventListener('keydown', (e) => {
    const { menu } = els();
    if (!menu || menu.classList.contains('hidden')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'Tab') {
      const focusables = [...menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }
  });
  matchMedia('(min-width: 1024px)').addEventListener('change', (e) => e.matches && close(false));
  document.addEventListener('astro:before-swap', () => close(false));
}
