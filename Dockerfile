# syntax=docker/dockerfile:1

# ── Étape 1 : build du site Astro statique ──────────────────────────
FROM node:22-slim AS build
WORKDIR /app

# Dépendances (cache optimisé)
COPY package.json package-lock.json ./
RUN npm ci

# Code source + build -> /app/dist
COPY . .
RUN npm run build

# ── Étape 2 : service des fichiers statiques via nginx ──────────────
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
