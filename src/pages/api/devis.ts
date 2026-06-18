import type { APIRoute } from 'astro';

// Route a la demande (pas de prerendu statique).
export const prerender = false;

// ────────────────────────────────────────────────────────────────────────
// Variables d'environnement (a configurer dans Coolify) :
//   BREVO_API_KEY      → Cle API Brevo (commence par xkeysib-...)   [RUNTIME, secret]
//   ADMIN_EMAILS       → jmoog27@gmail.com,robert.entreprise@outlook.fr  [RUNTIME]
//   FROM_EMAIL         → contact@robert-daniel-couverture.fr (domaine verifie Brevo) [RUNTIME]
//   FROM_NAME          → Robert Daniel Couverture (optionnel)        [RUNTIME]
//   TURNSTILE_SECRET_KEY → cle secrete Cloudflare Turnstile (optionnel) [RUNTIME]
// ────────────────────────────────────────────────────────────────────────

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
const LOGO_URL = 'https://robert-daniel-couverture.fr/images/logo-email.png';
const TEL_AFFICHE = '06 83 96 15 18';
const TEL_HREF = '+33683961518';

// Charte Robert Daniel Couverture
const COLOR_BLUE = '#006CB4';
const COLOR_RED = '#E2231A';
const COLOR_LIGHT = '#F2F6FA';
const COLOR_TEXT = '#1A1A1A';
const COLOR_MUTED = '#6C6C6C';
const COLOR_BORDER = '#E2E5E9';

// ────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────

function escapeHtml(s: unknown): string {
  if (s === undefined || s === null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function nl2br(s: unknown): string {
  return escapeHtml(s).replace(/\r?\n/g, '<br>');
}

// Anti-spam : detection de contenu indesirable (liens, demarchage SEO/avis, etc.).
const SPAM_PATTERNS =
  /(https?:\/\/|www\.|wa\.me|t\.me|bit\.ly|tinyurl|telegra|\b(whatsapp|telegram|viber|crypto|bitcoin|casino|loan|viagra|escort)\b|avis google|google my business|google reviews|trustpilot|tripadvisor|pagesjaunes|backlink|référencement|seo (services|expert|agency|company)|ranking)/i;
function isSpam(...fields: Array<string | undefined>): boolean {
  return SPAM_PATTERNS.test(fields.filter(Boolean).join(' \n '));
}

// Verification du jeton Cloudflare Turnstile (si la cle secrete est configuree).
async function verifyTurnstile(token: string, secret: string, ip?: string): Promise<boolean> {
  const body = new URLSearchParams();
  body.append('secret', secret);
  body.append('response', token || '');
  if (ip) body.append('remoteip', ip);
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body,
    });
    const data = (await res.json().catch(() => ({}))) as { success?: boolean };
    return data?.success === true;
  } catch {
    return false;
  }
}

interface DevisData {
  nom: string;
  tel: string;
  email: string;
  ville: string;
  travaux: string;
  message?: string;
}

// ────────────────────────────────────────────────────────────────────────
// Brevo API client (fetch direct, pas de SDK)
// ────────────────────────────────────────────────────────────────────────

interface BrevoSendArgs {
  apiKey: string;
  fromEmail: string;
  fromName: string;
  to: Array<{ email: string; name?: string }>;
  replyTo?: { email: string; name?: string };
  subject: string;
  htmlContent: string;
}

async function brevoSend(args: BrevoSendArgs): Promise<{ ok: boolean; error?: string }> {
  const body: Record<string, unknown> = {
    sender: { email: args.fromEmail, name: args.fromName },
    to: args.to,
    subject: args.subject,
    htmlContent: args.htmlContent,
  };
  if (args.replyTo) body.replyTo = args.replyTo;

  try {
    const res = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'api-key': args.apiKey,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      let detail = `HTTP ${res.status}`;
      try {
        const err = await res.json();
        if (err?.message) detail = String(err.message);
        else if (err?.code) detail = String(err.code);
      } catch {}
      return { ok: false, error: detail };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Erreur inconnue' };
  }
}

// ────────────────────────────────────────────────────────────────────────
// Template — Notification admin
// ────────────────────────────────────────────────────────────────────────

function notifTemplate(d: DevisData) {
  const presta = d.travaux || 'Non précisé';
  const telClean = (d.tel || '').replace(/[^0-9+]/g, '');
  const ville = d.ville || 'commune non précisée';
  const subject = `Nouvelle demande — ${presta}${d.ville ? ' à ' + d.ville : ''}`;
  const prenom = (d.nom || '').split(' ')[0] || 'le client';

  const html = `<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${escapeHtml(subject)}</title></head>
<body style="margin:0;padding:0;background:${COLOR_LIGHT};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${COLOR_TEXT};">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:${COLOR_LIGHT};padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width:600px;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.06);">
        <tr><td style="height:5px;background:${COLOR_RED};line-height:5px;font-size:0;">&nbsp;</td></tr>
        <tr><td style="background:#ffffff;padding:26px 32px 20px;text-align:center;border-bottom:1px solid ${COLOR_BORDER};">
          <img src="${LOGO_URL}" width="210" alt="Robert Daniel Couverture — Artisan couvreur dans l'Essonne" style="display:block;margin:0 auto;width:210px;max-width:72%;height:auto;border:0;">
        </td></tr>
        <tr><td style="background:${COLOR_BLUE};padding:22px 32px;color:#fff;text-align:center;">
          <div style="font-size:12px;text-transform:uppercase;letter-spacing:.12em;opacity:.85;font-weight:700;">Nouvelle demande de devis</div>
          <div style="font-size:22px;font-weight:800;margin-top:6px;">${escapeHtml(presta)}</div>
          <div style="font-size:14px;opacity:.9;margin-top:4px;">${escapeHtml(ville)}</div>
        </td></tr>
        <tr><td style="padding:24px 32px 8px;">
          <div style="font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:${COLOR_MUTED};font-weight:700;margin-bottom:8px;">Client</div>
          <div style="font-size:18px;font-weight:700;color:${COLOR_BLUE};">${escapeHtml(d.nom)}</div>
        </td></tr>
        <tr><td style="padding:8px 32px;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr>
            <td width="50%" valign="top" style="padding:12px 12px 12px 0;">
              <div style="font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:${COLOR_MUTED};font-weight:700;">Téléphone</div>
              <a href="tel:${escapeHtml(telClean)}" style="display:inline-block;margin-top:4px;color:${COLOR_BLUE};font-size:16px;font-weight:700;text-decoration:none;">${escapeHtml(d.tel)}</a>
            </td>
            <td width="50%" valign="top" style="padding:12px 0 12px 12px;border-left:1px solid ${COLOR_BORDER};">
              <div style="font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:${COLOR_MUTED};font-weight:700;">Email</div>
              <a href="mailto:${escapeHtml(d.email)}" style="display:inline-block;margin-top:4px;color:${COLOR_BLUE};font-size:14px;font-weight:600;text-decoration:none;word-break:break-all;">${escapeHtml(d.email)}</a>
            </td>
          </tr></table>
        </td></tr>
        <tr><td style="padding:8px 32px 24px;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr>
            <td align="center" style="padding:8px;" width="50%">
              <a href="tel:${escapeHtml(telClean)}" style="display:block;background:${COLOR_RED};color:#fff;text-decoration:none;padding:14px 16px;border-radius:8px;font-weight:700;font-size:14px;">Appeler ${escapeHtml(prenom)}</a>
            </td>
            <td align="center" style="padding:8px;" width="50%">
              <a href="mailto:${escapeHtml(d.email)}?subject=${encodeURIComponent('Re: votre demande de devis — Robert Daniel Couverture')}" style="display:block;background:${COLOR_BLUE};color:#fff;text-decoration:none;padding:14px 16px;border-radius:8px;font-weight:700;font-size:14px;">Répondre par email</a>
            </td>
          </tr></table>
        </td></tr>
        <tr><td style="padding:0 32px 24px;">
          <div style="background:${COLOR_LIGHT};border-radius:8px;padding:18px 20px;">
            <div style="font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:${COLOR_MUTED};font-weight:700;margin-bottom:10px;">Description du projet</div>
            <div style="font-size:14px;line-height:1.65;color:${COLOR_TEXT};">${d.message ? nl2br(d.message) : '<em style="color:' + COLOR_MUTED + ';">Aucune description fournie.</em>'}</div>
          </div>
        </td></tr>
        <tr><td style="background:${COLOR_LIGHT};padding:16px 32px;border-top:1px solid ${COLOR_BORDER};font-size:12px;color:${COLOR_MUTED};text-align:center;">
          Demande reçue le ${new Date().toLocaleString('fr-FR', { dateStyle: 'long', timeStyle: 'short', timeZone: 'Europe/Paris' })}<br>
          via <a href="https://robert-daniel-couverture.fr/devis-gratuit/" style="color:${COLOR_BLUE};text-decoration:none;">robert-daniel-couverture.fr/devis-gratuit/</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  return { subject, html };
}

// ────────────────────────────────────────────────────────────────────────
// Template — Accuse de reception client
// ────────────────────────────────────────────────────────────────────────

function ackTemplate(d: DevisData) {
  const presta = (d.travaux || 'votre projet').toLowerCase();
  const subject = `Nous avons bien reçu votre demande — Robert Daniel Couverture`;
  const prenom = (d.nom || '').split(' ')[0];

  const html = `<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${escapeHtml(subject)}</title></head>
<body style="margin:0;padding:0;background:${COLOR_LIGHT};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${COLOR_TEXT};">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:${COLOR_LIGHT};padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width:600px;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.06);">
        <tr><td style="height:5px;background:${COLOR_RED};line-height:5px;font-size:0;">&nbsp;</td></tr>
        <tr><td style="background:#ffffff;padding:34px 32px 24px;text-align:center;">
          <img src="${LOGO_URL}" width="240" alt="Robert Daniel Couverture — Artisan couvreur dans l'Essonne" style="display:block;margin:0 auto;width:240px;max-width:78%;height:auto;border:0;">
        </td></tr>
        <tr><td style="background:${COLOR_BLUE};padding:12px 32px;color:#fff;text-align:center;font-size:13px;letter-spacing:.06em;font-weight:600;">
          Artisan couvreur dans l'Essonne (91)
        </td></tr>
        <tr><td style="padding:34px 36px 10px;">
          <h1 style="margin:0 0 18px;font-size:21px;font-weight:800;color:${COLOR_BLUE};line-height:1.35;">Bonjour ${escapeHtml(prenom)},</h1>
          <p style="margin:0 0 18px;font-size:15px;line-height:1.75;color:${COLOR_TEXT};">
            Merci pour votre demande&nbsp;: j'ai bien reçu votre projet de <strong>${escapeHtml(presta)}</strong>${d.ville ? ' à <strong>' + escapeHtml(d.ville) + '</strong>' : ''}, et je vous remercie de votre confiance.
          </p>
          <p style="margin:0 0 18px;font-size:15px;line-height:1.75;color:${COLOR_TEXT};">
            Je reviens vers vous <strong>très rapidement</strong> pour échanger sur vos travaux, convenir d'une visite si besoin, et vous remettre un devis détaillé, gratuit et sans engagement.
          </p>
          <p style="margin:0 0 26px;font-size:15px;line-height:1.75;color:${COLOR_TEXT};">
            Une urgence, une fuite à stopper&nbsp;? N'attendez pas mon rappel, appelez-moi directement&nbsp;:
          </p>
        </td></tr>
        <tr><td style="padding:0 32px 24px;" align="center">
          <a href="tel:${TEL_HREF}" style="display:inline-block;background:${COLOR_RED};color:#fff;text-decoration:none;padding:14px 28px;border-radius:8px;font-weight:700;font-size:15px;">Appeler le ${TEL_AFFICHE}</a>
        </td></tr>
        <tr><td style="padding:0 32px 28px;">
          <div style="background:${COLOR_LIGHT};border-radius:8px;padding:18px 20px;">
            <div style="font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:${COLOR_MUTED};font-weight:700;margin-bottom:12px;">Récapitulatif de votre demande</div>
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size:14px;">
              <tr><td style="padding:4px 0;color:${COLOR_MUTED};width:120px;">Travaux</td><td style="padding:4px 0;color:${COLOR_TEXT};font-weight:600;">${escapeHtml(d.travaux || 'À préciser')}</td></tr>
              ${d.ville ? `<tr><td style="padding:4px 0;color:${COLOR_MUTED};">Commune</td><td style="padding:4px 0;color:${COLOR_TEXT};font-weight:600;">${escapeHtml(d.ville)}</td></tr>` : ''}
              <tr><td style="padding:4px 0;color:${COLOR_MUTED};">Téléphone</td><td style="padding:4px 0;color:${COLOR_TEXT};font-weight:600;">${escapeHtml(d.tel)}</td></tr>
            </table>
          </div>
        </td></tr>
        <tr><td style="padding:0 32px 28px;">
          <p style="margin:0;font-size:15px;line-height:1.5;color:${COLOR_TEXT};">
            À très vite,<br>
            <strong style="color:${COLOR_BLUE};">Robert Daniel</strong><br>
            <span style="color:${COLOR_MUTED};font-size:13px;">Artisan couvreur — Essonne (91)</span>
          </p>
        </td></tr>
        <tr><td style="background:${COLOR_BLUE};padding:20px 32px;color:#fff;text-align:center;font-size:12px;line-height:1.6;">
          <strong style="font-size:14px;">Robert Daniel Couverture</strong><br>
          42 Grande Rue, 91580 Étréchy<br>
          <a href="https://robert-daniel-couverture.fr" style="color:#fff;text-decoration:underline;opacity:.85;">robert-daniel-couverture.fr</a> &nbsp;·&nbsp; <a href="tel:${TEL_HREF}" style="color:#fff;text-decoration:underline;opacity:.85;">${TEL_AFFICHE}</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  return { subject, html };
}

// ────────────────────────────────────────────────────────────────────────
// Handler
// ────────────────────────────────────────────────────────────────────────

const jsonResponse = (status: number, payload: unknown) =>
  new Response(JSON.stringify(payload), { status, headers: { 'content-type': 'application/json' } });

export const POST: APIRoute = async ({ request }) => {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error('[devis] BREVO_API_KEY manquante');
    return jsonResponse(500, { ok: false, error: 'Configuration serveur incomplète.' });
  }

  let raw: any;
  try {
    raw = await request.json();
  } catch {
    return jsonResponse(400, { ok: false, error: 'Requête invalide' });
  }

  // Honeypot : champ "site_web" doit rester vide.
  if (raw?.site_web && String(raw.site_web).trim() !== '') {
    return jsonResponse(200, { ok: true });
  }

  // Filtre anti-spam (contenu) → succès silencieux, aucun email.
  if (isSpam(raw?.nom, raw?.telephone, raw?.email, raw?.ville, raw?.travaux, raw?.message)) {
    console.warn('[devis] Spam filtré (contenu)');
    return jsonResponse(200, { ok: true });
  }

  // Champs obligatoires.
  const required = ['nom', 'telephone', 'email', 'message'] as const;
  for (const f of required) {
    if (!raw?.[f] || String(raw[f]).trim() === '') {
      return jsonResponse(400, { ok: false, error: `Champ manquant : ${f}` });
    }
  }

  // Turnstile (actif si la clé secrète est définie).
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret) {
    const token = String(raw?.['cf-turnstile-response'] || '');
    const ip =
      request.headers.get('cf-connecting-ip') ||
      (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() ||
      undefined;
    const human = await verifyTurnstile(token, turnstileSecret, ip);
    if (!human) {
      return jsonResponse(400, { ok: false, error: 'Vérification anti-robot échouée. Merci de réessayer.' });
    }
  }

  const data: DevisData = {
    nom: String(raw.nom).trim().slice(0, 100),
    tel: String(raw.telephone).trim().slice(0, 30),
    email: String(raw.email).trim().slice(0, 200),
    ville: String(raw.ville || '').trim().slice(0, 100),
    travaux: String(raw.travaux || '').trim().slice(0, 80),
    message: String(raw.message || '').trim().slice(0, 4000),
  };

  const adminEmails = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  if (adminEmails.length === 0) {
    console.error('[devis] ADMIN_EMAILS manquante');
    return jsonResponse(500, { ok: false, error: 'Configuration serveur incomplète.' });
  }

  const fromEmail = process.env.FROM_EMAIL || 'contact@robert-daniel-couverture.fr';
  const fromName = process.env.FROM_NAME || 'Robert Daniel Couverture';

  // 1) Notification admin
  const notif = notifTemplate(data);
  const r1 = await brevoSend({
    apiKey,
    fromEmail,
    fromName,
    to: adminEmails.map((email) => ({ email })),
    replyTo: { email: data.email, name: data.nom },
    subject: notif.subject,
    htmlContent: notif.html,
  });
  if (!r1.ok) {
    console.error('[devis] Erreur envoi notif admin:', r1.error);
    return jsonResponse(502, { ok: false, error: `Envoi impossible pour le moment, merci de m'appeler au ${TEL_AFFICHE}.` });
  }

  // 2) Accuse client (best effort)
  const ack = ackTemplate(data);
  const r2 = await brevoSend({
    apiKey,
    fromEmail,
    fromName,
    to: [{ email: data.email, name: data.nom }],
    replyTo: { email: fromEmail, name: fromName },
    subject: ack.subject,
    htmlContent: ack.html,
  });
  if (!r2.ok) console.error('[devis] Echec accusé client (non bloquant):', r2.error);

  return jsonResponse(200, { ok: true });
};

export const GET: APIRoute = () =>
  new Response('Method Not Allowed', { status: 405, headers: { allow: 'POST' } });
