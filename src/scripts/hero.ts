import { reducedMotion, type Cleanup } from './env';

/**
 * Fondo del hero: rejilla de puntos tipo "carril de piscina".
 * - Con ratón, los puntos cercanos crecen, se apartan y se tiñen de lava.
 * - Un clic o toque lanza una onda, como al tirarse al agua.
 * Solo se pinta cuando hay algo que animar y el hero está a la vista.
 */
export function initDots(): Cleanup | void {
  const canvas = document.querySelector<HTMLCanvasElement>('[data-dots]');
  const ctx = canvas?.getContext('2d');
  if (!canvas || !ctx) return;
  const host = canvas.parentElement!;
  const still = reducedMotion();

  const GAP = 28;
  const BASE = 1.3;
  const RADIUS = 150;
  let w = 0;
  let h = 0;
  let dpr = 1;
  let dots: Float32Array = new Float32Array();
  let ink = '#16120f';
  let lava = '#e8471c';
  let pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
  let ripples: { x: number; y: number; t: number }[] = [];
  let raf = 0;
  let visible = true;
  let lastMove = 0;

  const readColors = () => {
    const cs = getComputedStyle(document.documentElement);
    ink = cs.getPropertyValue('--ink').trim() || ink;
    lava = cs.getPropertyValue('--lava').trim() || lava;
  };

  const resize = () => {
    const r = host.getBoundingClientRect();
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = r.width;
    h = r.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    const cols = Math.ceil(w / GAP) + 1;
    const rows = Math.ceil(h / GAP) + 1;
    const ox = (w - (cols - 1) * GAP) / 2;
    dots = new Float32Array(cols * rows * 2);
    let i = 0;
    for (let y = 0; y < rows; y++)
      for (let x = 0; x < cols; x++) {
        dots[i++] = ox + x * GAP;
        dots[i++] = 12 + y * GAP;
      }
    draw(performance.now());
  };

  const draw = (now: number) => {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    pointer.x += (pointer.tx - pointer.x) * 0.16;
    pointer.y += (pointer.ty - pointer.y) * 0.16;
    ripples = ripples.filter((r) => now - r.t < 1600);

    const hot: number[] = [];
    ctx.fillStyle = ink;
    ctx.globalAlpha = 0.16;
    ctx.beginPath();
    for (let i = 0; i < dots.length; i += 2) {
      const x = dots[i]!;
      const y = dots[i + 1]!;
      // Desvanecer hacia abajo para que el texto respire
      const fade = 1 - Math.max(0, (y - h * 0.55) / (h * 0.45));
      let f = 0;
      let dx = 0;
      let dy = 0;
      const px = x - pointer.x;
      const py = y - pointer.y;
      const d = Math.hypot(px, py);
      if (d < RADIUS) {
        const k = 1 - d / RADIUS;
        f = k * k;
        dx = (px / (d || 1)) * f * 9;
        dy = (py / (d || 1)) * f * 9;
      }
      for (const r of ripples) {
        const age = (now - r.t) / 1600;
        const front = age * 700;
        const dist = Math.hypot(x - r.x, y - r.y);
        const band = 1 - Math.abs(dist - front) / 46;
        if (band > 0) f = Math.max(f, band * (1 - age));
      }
      if (f > 0.08) {
        hot.push(x + dx, y + dy, f * fade);
        continue;
      }
      if (fade <= 0) continue;
      ctx.moveTo(x + BASE, y);
      ctx.arc(x, y, BASE * (0.6 + 0.4 * fade), 0, Math.PI * 2);
    }
    ctx.fill();

    if (hot.length) {
      ctx.fillStyle = lava;
      for (let i = 0; i < hot.length; i += 3) {
        const f = hot[i + 2]!;
        ctx.globalAlpha = 0.25 + f * 0.75;
        ctx.beginPath();
        ctx.arc(hot[i]!, hot[i + 1]!, BASE + f * 2.6, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  };

  const loop = (now: number) => {
    draw(now);
    const settling = Math.abs(pointer.tx - pointer.x) + Math.abs(pointer.ty - pointer.y) > 0.5;
    raf = visible && (ripples.length || settling || now - lastMove < 300) ? requestAnimationFrame(loop) : 0;
  };
  const kick = () => {
    if (!raf && visible && !still) raf = requestAnimationFrame(loop);
  };

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const r = canvas.getBoundingClientRect();
    pointer.tx = e.clientX - r.left;
    pointer.ty = e.clientY - r.top;
    if (pointer.x < -999) {
      pointer.x = pointer.tx;
      pointer.y = pointer.ty;
    }
    lastMove = performance.now();
    kick();
  };
  const onLeave = () => {
    pointer.tx = pointer.ty = -9999;
    pointer.x = pointer.y = -9999;
    kick();
  };
  const onDown = (e: PointerEvent) => {
    if ((e.target as Element).closest('a, button')) return;
    const r = canvas.getBoundingClientRect();
    ripples.push({ x: e.clientX - r.left, y: e.clientY - r.top, t: performance.now() });
    if (ripples.length > 4) ripples.shift();
    kick();
  };
  const onTheme = () => {
    readColors();
    draw(performance.now());
  };

  readColors();
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(host);
  const io = new IntersectionObserver(([e]) => {
    visible = !!e?.isIntersecting;
    if (visible) kick();
  });
  io.observe(host);
  document.addEventListener('themechange', onTheme);

  if (!still) {
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);
    host.addEventListener('pointerdown', onDown);
    // Onda de bienvenida
    window.setTimeout(() => {
      ripples.push({ x: w * 0.72, y: h * 0.42, t: performance.now() });
      kick();
    }, 900);
  }

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
    document.removeEventListener('themechange', onTheme);
    host.removeEventListener('pointermove', onMove);
    host.removeEventListener('pointerleave', onLeave);
    host.removeEventListener('pointerdown', onDown);
  };
}

/** Terminal del hero: escribe los comandos letra a letra. Con reduced-motion se muestra completo. */
export function initTerminal(): Cleanup | void {
  const term = document.querySelector<HTMLElement>('[data-terminal]');
  if (!term || reducedMotion()) return;
  const lines = [...term.querySelectorAll<HTMLElement>('[data-term-line]')].map((line) => ({
    line,
    cmd: line.querySelector<HTMLElement>('[data-term-cmd]')!,
    out: line.querySelector<HTMLElement>('[data-term-out]')!,
  }));
  const texts = lines.map((l) => l.cmd.textContent ?? '');
  const timers: number[] = [];
  const wait = (ms: number) => new Promise<void>((res) => timers.push(window.setTimeout(res, ms)));
  let cancelled = false;

  // visibility (no opacity) para que la salida nunca exista "a medias" con bajo contraste
  for (const l of lines) {
    l.cmd.textContent = '';
    l.out.style.visibility = 'hidden';
    l.line.style.visibility = 'hidden';
  }

  (async () => {
    await wait(700);
    for (const [i, l] of lines.entries()) {
      if (cancelled) return;
      l.line.style.visibility = '';
      const text = texts[i]!;
      for (let c = 1; c <= text.length; c++) {
        if (cancelled) return;
        l.cmd.textContent = text.slice(0, c);
        await wait(55 + Math.random() * 60);
      }
      await wait(260);
      l.out.style.visibility = '';
      await wait(520);
    }
  })();

  return () => {
    cancelled = true;
    timers.forEach(clearTimeout);
  };
}
