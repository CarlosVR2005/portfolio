/**
 * Genera los archivos estáticos derivados: favicons, imágenes Open Graph y CV de ejemplo.
 * Uso: npm run assets
 * Los resultados se guardan en /public y se suben al repositorio (no hace falta ejecutarlo en Vercel).
 */
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = new URL('../', import.meta.url);
const pub = (p) => new URL(`public/${p}`, root);
const C = {
  sand: '#f3e9d6',
  surface: '#fffbf2',
  ink: '#16120f',
  lava: '#e8471c',
  lavaInk: '#a82f0c',
  ocean: '#4fc3e0',
  sulfur: '#ffc53d',
  ok: '#1a7a43',
};
const DISPLAY = "'Arial Black', 'Helvetica Neue', Arial, sans-serif";
const MONO = "Consolas, 'DejaVu Sans Mono', monospace";

/* ───────── Favicons ───────── */
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect x="5" y="5" width="56" height="56" rx="14" fill="${C.ink}"/>
  <rect x="2" y="2" width="56" height="56" rx="14" fill="${C.lava}" stroke="${C.ink}" stroke-width="4"/>
  <text x="30" y="41" text-anchor="middle" font-family="${DISPLAY}" font-weight="900" font-size="25" fill="${C.ink}" letter-spacing="-1">CV</text>
</svg>`;

/* ───────── Open Graph ───────── */
async function ogSvg(lang) {
  const photo = (await readFile(new URL('src/assets/carlos.jpg', root))).toString('base64');
  const t =
    lang === 'es'
      ? { badge: 'Disponible para prácticas · feb 2027', role: '> Futuro ingeniero de software', meta: 'Ing. Software @ UCM · Madrid · Lanzarote' }
      : { badge: 'Open to internships · Feb 2027', role: '> Software engineer to be', meta: 'Software Eng. @ UCM · Madrid · Lanzarote' };
  const grid = Array.from({ length: 40 }, (_, i) => `<path d="M${i * 32} 0V630M0 ${i * 32}H1200" stroke="${C.ink}" stroke-opacity=".06"/>`).join('');
  const badgeW = t.badge.length * 12.4 + 70;
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <clipPath id="ph"><path d="M820 110c80-38 210-28 266 50 52 72 38 200-10 270-50 74-176 104-262 62-84-42-118-150-96-236 14-58 46-112 102-146z"/></clipPath>
  </defs>
  <rect width="1200" height="630" fill="${C.sand}"/>
  ${grid}
  <!-- ondas -->
  <path d="M0 585c50-18 100-18 150 0s100 18 150 0 100-18 150 0 100 18 150 0 100-18 150 0 100 18 150 0 100-18 150 0 100 18 150 0" fill="none" stroke="${C.ocean}" stroke-width="6"/>
  <path d="M0 610c50-18 100-18 150 0s100 18 150 0 100-18 150 0 100 18 150 0 100-18 150 0 100 18 150 0 100-18 150 0 100 18 150 0" fill="none" stroke="${C.ink}" stroke-opacity=".25" stroke-width="4"/>

  <!-- badge -->
  <rect x="64" y="64" width="${badgeW}" height="50" rx="25" fill="${C.surface}" stroke="${C.ink}" stroke-width="3"/>
  <circle cx="94" cy="89" r="8" fill="${C.ok}"/>
  <text x="114" y="97" font-family="Arial, sans-serif" font-weight="700" font-size="21" fill="${C.ink}">${t.badge}</text>

  <!-- nombre -->
  <g transform="rotate(-2.5 230 215)">
    <rect x="76" y="160" width="372" height="122" rx="22" fill="${C.ink}"/>
    <rect x="68" y="152" width="372" height="122" rx="22" fill="${C.lava}" stroke="${C.ink}" stroke-width="4"/>
    <text x="92" y="250" font-family="${DISPLAY}" font-weight="900" font-size="94" fill="${C.ink}" letter-spacing="-4">Carlos</text>
  </g>
  <text x="62" y="392" font-family="${DISPLAY}" font-weight="900" font-size="104" fill="${C.ink}" letter-spacing="-5">Vizcaino<tspan fill="${C.lava}">.</tspan></text>
  <text x="68" y="458" font-family="${MONO}" font-size="32" fill="${C.lavaInk}">${t.role}</text>
  <text x="68" y="512" font-family="Arial, sans-serif" font-size="24" fill="${C.ink}" fill-opacity=".75">${t.meta}</text>

  <!-- foto -->
  <path d="M832 122c80-38 210-28 266 50 52 72 38 200-10 270-50 74-176 104-262 62-84-42-118-150-96-236 14-58 46-112 102-146z" fill="${C.ink}"/>
  <image x="700" y="80" width="420" height="495" preserveAspectRatio="xMidYMid slice" clip-path="url(#ph)" xlink:href="data:image/jpeg;base64,${photo}"/>
  <path d="M820 110c80-38 210-28 266 50 52 72 38 200-10 270-50 74-176 104-262 62-84-42-118-150-96-236 14-58 46-112 102-146z" fill="none" stroke="${C.ink}" stroke-width="5"/>

  <!-- sticker -->
  <g transform="rotate(7 1040 110)">
    <rect x="955" y="86" width="180" height="46" rx="10" fill="${C.sulfur}" stroke="${C.ink}" stroke-width="3"/>
    <text x="1045" y="117" text-anchor="middle" font-family="${MONO}" font-weight="700" font-size="20" fill="${C.ink}">UCM 2023→27</text>
  </g>
</svg>`;
}

/* ───────── PDF de ejemplo (CV pendiente) ───────── */
function placeholderPdf(lines) {
  const esc = (s) => s.replace(/[\\()]/g, (c) => `\\${c}`);
  const text = lines
    .map((l, i) => `BT /F1 ${i === 0 ? 22 : 13} Tf 72 ${720 - i * 34} Td (${esc(l)}) Tj ET`)
    .join('\n');
  const objs = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>',
    `<< /Length ${Buffer.byteLength(text, 'latin1')} >>\nstream\n${text}\nendstream`,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>',
  ];
  let out = '%PDF-1.4\n';
  const offsets = [];
  objs.forEach((o, i) => {
    offsets.push(Buffer.byteLength(out, 'latin1'));
    out += `${i + 1} 0 obj\n${o}\nendobj\n`;
  });
  const xref = Buffer.byteLength(out, 'latin1');
  out += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`;
  out += offsets.map((o) => `${String(o).padStart(10, '0')} 00000 n \n`).join('');
  out += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return Buffer.from(out, 'latin1');
}

const exists = (u) => access(u).then(() => true, () => false);

async function main() {
  await mkdir(pub('og'), { recursive: true });
  await mkdir(pub('cv'), { recursive: true });

  await writeFile(pub('favicon.svg'), favicon);
  await sharp(Buffer.from(favicon)).resize(32, 32).png().toFile(fileURLToPath(pub('favicon-32.png')));
  // apple-touch / manifest: fondo opaco y margen
  const padded = (size) =>
    sharp({ create: { width: size, height: size, channels: 4, background: C.sand } })
      .composite([{ input: Buffer.from(favicon.replace('viewBox="0 0 64 64"', `viewBox="-8 -8 80 80" width="${size}" height="${size}"`)) }])
      .png();
  await padded(180).toFile(fileURLToPath(pub('apple-touch-icon.png')));
  await padded(192).toFile(fileURLToPath(pub('icon-192.png')));
  await padded(512).toFile(fileURLToPath(pub('icon-512.png')));

  for (const lang of ['es', 'en']) {
    await sharp(Buffer.from(await ogSvg(lang))).png({ compressionLevel: 9 }).toFile(fileURLToPath(pub(`og/${lang}.png`)));
  }

  // Solo crea los CV de ejemplo si todavía no has puesto los tuyos.
  const cvs = {
    'Carlos-Vizcaino-CV.pdf': ['Carlos Vizcaino Rigol - CV', 'CV en preparacion.', 'Mientras tanto: carlosvirigol@gmail.com'],
    'Carlos-Vizcaino-CV-EN.pdf': ['Carlos Vizcaino Rigol - CV', 'CV coming soon.', 'In the meantime: carlosvirigol@gmail.com'],
  };
  for (const [file, lines] of Object.entries(cvs)) {
    if (!(await exists(pub(`cv/${file}`)))) await writeFile(pub(`cv/${file}`), placeholderPdf(lines));
  }
  console.log('Assets generados en /public');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
