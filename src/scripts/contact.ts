import { contactLimits as L, EMAIL_RE, type ContactField, type ContactResponse } from '@/lib/contact';

type Messages = Record<'name' | 'email' | 'message' | 'long' | 'sending' | 'submit' | 'success' | 'error' | 'rate' | 'copied' | 'copy', string>;
const FIELDS: ContactField[] = ['name', 'email', 'company', 'message'];

function validate(data: Record<ContactField, string>): Partial<Record<ContactField, keyof Messages>> {
  const errors: Partial<Record<ContactField, keyof Messages>> = {};
  const name = data.name.trim();
  const email = data.email.trim();
  const message = data.message.trim();
  if (name.length < L.name.min) errors.name = 'name';
  else if (name.length > L.name.max) errors.name = 'long';
  if (!EMAIL_RE.test(email)) errors.email = 'email';
  else if (email.length > L.email.max) errors.email = 'long';
  if (data.company.trim().length > L.company.max) errors.company = 'long';
  if (message.length < L.message.min) errors.message = 'message';
  else if (message.length > L.message.max) errors.message = 'long';
  return errors;
}

function showErrors(form: HTMLFormElement, errors: Partial<Record<ContactField, string>>, msgs: Messages) {
  for (const f of FIELDS) {
    const input = form.elements.namedItem(f) as HTMLInputElement | null;
    const slot = form.querySelector<HTMLElement>(`[data-error-for="${f}"]`);
    const code = errors[f];
    if (input) {
      if (code) input.setAttribute('aria-invalid', 'true');
      else input.removeAttribute('aria-invalid');
    }
    if (slot) slot.textContent = code ? (msgs[code as keyof Messages] ?? msgs.long) : '';
  }
}

function setStatus(form: HTMLFormElement, kind: 'ok' | 'error' | 'clear', text = '', email?: string) {
  const box = form.querySelector<HTMLElement>('[data-form-status]');
  if (!box) return;
  box.replaceChildren();
  if (kind === 'clear') return;
  const p = document.createElement('p');
  p.className = `brut-sm flex flex-wrap items-center gap-x-1.5 px-4 py-3 font-medium text-[#16120f] ${kind === 'ok' ? 'bg-[#c9efd8]' : 'bg-[#ffd9d2]'}`;
  p.append(`${kind === 'ok' ? '✓' : '✕'} ${text}`);
  if (email) {
    const a = document.createElement('a');
    a.href = `mailto:${email}`;
    a.className = 'link font-semibold';
    a.textContent = email;
    p.append(' ', a);
  }
  box.append(p);
}

export function bindContact() {
  document.addEventListener('submit', async (e) => {
    const form = e.target as HTMLFormElement;
    if (!form.matches('[data-contact-form]')) return;
    e.preventDefault();
    if (form.dataset.busy === 'true') return;

    const msgs = JSON.parse(form.dataset.messages ?? '{}') as Messages;
    const fd = new FormData(form);
    const data = Object.fromEntries(FIELDS.map((f) => [f, String(fd.get(f) ?? '')])) as Record<ContactField, string>;
    const errors = validate(data);
    showErrors(form, errors, msgs);
    setStatus(form, 'clear');
    const firstInvalid = FIELDS.find((f) => errors[f]);
    if (firstInvalid) {
      (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }

    const btn = form.querySelector<HTMLButtonElement>('[data-submit]');
    const label = form.querySelector<HTMLElement>('[data-submit-label]');
    form.dataset.busy = 'true';
    form.setAttribute('aria-busy', 'true');
    if (btn) btn.disabled = true;
    if (label) label.textContent = msgs.sending;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, website: String(fd.get('website') ?? ''), lang: String(fd.get('lang') ?? 'es') }),
      });
      const body = (await res.json().catch(() => ({ ok: false, error: 'server' }))) as ContactResponse;
      if (body.ok) {
        form.reset();
        showErrors(form, {}, msgs);
        setStatus(form, 'ok', msgs.success);
      } else if (body.error === 'validation') {
        showErrors(form, body.fields, msgs);
        const first = FIELDS.find((f) => body.fields[f]);
        if (first) (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      } else if (body.error === 'rate_limit') {
        setStatus(form, 'error', msgs.rate);
      } else {
        setStatus(form, 'error', msgs.error, form.dataset.email);
      }
    } catch {
      setStatus(form, 'error', msgs.error, form.dataset.email);
    } finally {
      form.dataset.busy = 'false';
      form.removeAttribute('aria-busy');
      if (btn) btn.disabled = false;
      if (label) label.textContent = msgs.submit;
    }
  });

  // Al corregir un campo marcado como erróneo, se revalida en vivo
  document.addEventListener('input', (e) => {
    const input = e.target as HTMLInputElement;
    const form = input.closest<HTMLFormElement>('[data-contact-form]');
    if (!form || input.getAttribute('aria-invalid') !== 'true') return;
    const fd = new FormData(form);
    const data = Object.fromEntries(FIELDS.map((f) => [f, String(fd.get(f) ?? '')])) as Record<ContactField, string>;
    const name = input.name as ContactField;
    const err = validate(data)[name];
    if (!err) {
      input.removeAttribute('aria-invalid');
      const slot = form.querySelector<HTMLElement>(`[data-error-for="${name}"]`);
      if (slot) slot.textContent = '';
    }
  });

  // Copiar email
  document.addEventListener('click', async (e) => {
    const btn = (e.target as Element).closest<HTMLButtonElement>('[data-copy]');
    if (!btn) return;
    const label = btn.querySelector<HTMLElement>('[data-copy-label]');
    const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
    const msgs = JSON.parse(form?.dataset.messages ?? '{}') as Partial<Messages>;
    try {
      await navigator.clipboard.writeText(btn.dataset.copy ?? '');
      if (label && msgs.copied) {
        label.textContent = `${msgs.copied} ✓`;
        window.setTimeout(() => (label.textContent = msgs.copy ?? ''), 2000);
      }
    } catch {
      location.href = `mailto:${btn.dataset.copy}`;
    }
  });
}
