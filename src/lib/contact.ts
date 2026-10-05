/**
 * Reglas del formulario de contacto, compartidas por el cliente y el servidor.
 * El servidor valida con zod (src/pages/api/contact.ts); el cliente usa estos mismos límites
 * sin cargar zod en el navegador.
 */
export const contactLimits = {
  name: { min: 2, max: 80 },
  email: { max: 160 },
  company: { max: 120 },
  message: { min: 10, max: 4000 },
} as const;

export type ContactField = 'name' | 'email' | 'company' | 'message';
export type ContactErrorCode = 'name' | 'email' | 'message' | 'long';

/** Respuesta del endpoint. */
export type ContactResponse =
  | { ok: true }
  | { ok: false; error: 'validation'; fields: Partial<Record<ContactField, ContactErrorCode>> }
  | { ok: false; error: 'rate_limit' | 'server' | 'bad_request' };

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
