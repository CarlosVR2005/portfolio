import type { APIRoute } from 'astro';
import { z } from 'astro/zod';
import { Resend } from 'resend';
import { RESEND_API_KEY, CONTACT_FROM, CONTACT_TO } from 'astro:env/server';
import { contactLimits as L, type ContactResponse, type ContactField, type ContactErrorCode } from '@/lib/contact';

export const prerender = false;

const schema = z.object({
  name: z.string().trim().min(L.name.min, 'name').max(L.name.max, 'long'),
  email: z.email('email').trim().max(L.email.max, 'long'),
  company: z.string().trim().max(L.company.max, 'long').optional().default(''),
  message: z.string().trim().min(L.message.min, 'message').max(L.message.max, 'long'),
  /** Honeypot: los humanos no lo ven, los bots lo rellenan. */
  website: z.string().optional().default(''),
  lang: z.enum(['es', 'en']).optional().default('es'),
});

/* Límite de tasa básico en memoria: 5 envíos por IP cada 10 minutos.
   Vive mientras viva la instancia serverless; suficiente para frenar abusos simples. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return false;
}

const json = (body: ContactResponse, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let raw: unknown;
  try {
    const type = request.headers.get('content-type') ?? '';
    raw = type.includes('application/json')
      ? await request.json()
      : Object.fromEntries(await request.formData());
  } catch {
    return json({ ok: false, error: 'bad_request' }, 400);
  }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const fields: Partial<Record<ContactField, ContactErrorCode>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as ContactField;
      if (key && !fields[key]) fields[key] = (issue.message as ContactErrorCode) || 'long';
    }
    return json({ ok: false, error: 'validation', fields }, 422);
  }

  const data = parsed.data;
  // Bot: respondemos "ok" para no darle pistas, pero no enviamos nada.
  if (data.website) return json({ ok: true });

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || clientAddress || 'unknown';
  if (rateLimited(ip)) return json({ ok: false, error: 'rate_limit' }, 429);

  const subject = `Portfolio · ${data.name}${data.company ? ` (${data.company})` : ''}`;
  const text = [
    `Nombre: ${data.name}`,
    `Email: ${data.email}`,
    `Empresa: ${data.company || '-'}`,
    `Idioma: ${data.lang}`,
    '',
    data.message,
  ].join('\n');
  const html = `
    <div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.55;color:#16120f">
      <h2 style="margin:0 0 12px">Nuevo mensaje desde el portfolio</h2>
      <p style="margin:0"><b>Nombre:</b> ${escapeHtml(data.name)}</p>
      <p style="margin:0"><b>Email:</b> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
      <p style="margin:0"><b>Empresa:</b> ${escapeHtml(data.company || '-')}</p>
      <p style="margin:0 0 16px"><b>Idioma:</b> ${data.lang}</p>
      <div style="white-space:pre-wrap;padding:14px;border:2px solid #16120f;border-radius:10px;background:#fffbf2">${escapeHtml(data.message)}</div>
    </div>`;

  if (!RESEND_API_KEY) {
    if (import.meta.env.DEV) {
      // En local sin clave: se simula el envío para poder probar el flujo completo.
      console.info('[contact] RESEND_API_KEY no configurada. Mensaje simulado:\n' + text);
      return json({ ok: true });
    }
    console.error('[contact] Falta RESEND_API_KEY en las variables de entorno.');
    return json({ ok: false, error: 'server' }, 500);
  }

  try {
    const resend = new Resend(RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      replyTo: data.email,
      subject,
      text,
      html,
    });
    if (error) {
      console.error('[contact] Resend error:', error);
      return json({ ok: false, error: 'server' }, 502);
    }
  } catch (err) {
    console.error('[contact] Unexpected error:', err);
    return json({ ok: false, error: 'server' }, 500);
  }

  return json({ ok: true });
};

export const ALL: APIRoute = () => new Response(null, { status: 405, headers: { Allow: 'POST' } });
