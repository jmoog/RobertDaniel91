# syntax=docker/dockerfile:1.7
# ────────────────────────────────────────────────────────────────────────
# Astro 6 + adapter Node (standalone) — pages statiques + route /api/devis (Brevo)
# ────────────────────────────────────────────────────────────────────────

# ── Stage 1 : build ─────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

# Cle publique Turnstile (optionnelle) : build-time, inlinee dans le HTML.
# Coolify -> Build Variables. Laisser vide desactive le widget.
ARG PUBLIC_TURNSTILE_SITE_KEY=""
ENV PUBLIC_TURNSTILE_SITE_KEY=$PUBLIC_TURNSTILE_SITE_KEY

COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci

COPY . .
RUN npm run build

# ── Stage 2 : runtime ───────────────────────────────────────────────────
FROM node:22-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4321

COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --omit=dev && npm cache clean --force

COPY --from=builder /app/dist ./dist

RUN addgroup -S astro && adduser -S astro -G astro && chown -R astro:astro /app
USER astro

EXPOSE 4321

# Serveur Astro Node (standalone) — sert les pages statiques + /api/devis
CMD ["node", "./dist/server/entry.mjs"]
