// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://robert-daniel-couverture.fr',
  output: 'static',
  trailingSlash: 'always',
  compressHTML: true,

  // Pages prerendues en statique + route serveur /api/devis (Brevo).
  adapter: node({ mode: 'standalone' }),

  // Derriere le reverse proxy Coolify, l'Origin percu peut differer du Host
  // reel -> 403 sur les POST. La route /api/devis a son propre honeypot +
  // validation + Turnstile, on desactive donc le check CSRF d'Astro.
  security: {
    checkOrigin: false,
  },

  // Polices 100% locales : fichiers woff2 dans /public/fonts, @font-face dans
  // global.css. Aucune requete vers Google, ni au build ni au runtime (RGPD).

  build: {
    inlineStylesheets: 'always',
    format: 'directory',
  },

  // ── Redirections 301 ──────────────────────────────────────────────
  // Source : plan-redirections-301-definitif.csv
  redirects: {
    // Sitemaps
    '/sitemaps.xml': '/sitemap-index.xml',
    '/sitemap.xml': '/sitemap-index.xml',

    // Cocon zinguerie
    '/services/gouttieres-zinc-91/': '/zinguerie/gouttieres-zinc/',
    '/services/gouttieres-aluminium-91/': '/zinguerie/gouttieres-aluminium/',
    '/services/gouttieres-pvc/': '/zinguerie/gouttieres-pvc/',
    '/services/descentes-eaux-pluviales-91/': '/zinguerie/descentes-eaux-pluviales/',
    '/services/noues-aretiers-zinc-91/': '/zinguerie/noues-aretiers/',
    '/services/solins-raccords-91/': '/zinguerie/solins-raccords/',
    '/services/couvertines-91/': '/zinguerie/couvertines/',

    // Inspection / diagnostic
    '/services/inspection-toiture-drone-91/': '/inspection-toiture-drone/',
    '/diagnostic-de-toiture-91/': '/inspection-toiture-drone/',

    // Renovation toiture
    '/renovation-de-toiture-91/': '/renovation-toiture/',
    '/couverture-generale/': '/renovation-toiture/',
    '/services/renovation-toiture-91/': '/renovation-toiture/',
    '/services/pose-tuiles-91/': '/renovation-toiture/',
    '/services/pose-ardoises-91/': '/renovation-toiture/',
    '/services/toiture-zinc-91/': '/renovation-toiture/',

    // Remplacement toiture (fusionne avec Renovation -> anti-cannibalisation)
    // La page /remplacement-toiture/ est un stub noindex qui redirige (meta refresh).
    '/remplacement-de-toiture-91/': '/renovation-toiture/',
    '/services/remplacement-toiture-91/': '/renovation-toiture/',

    // Reparation toiture
    '/reparation-de-toiture-91/': '/reparation-toiture/',
    '/reparation/': '/reparation-toiture/',
    '/recherche-de-fuites-toitures-91/': '/reparation-toiture/',
    '/services/recherche-fuite-toiture-91/': '/reparation-toiture/',
    '/services/infiltration-toiture-91/': '/reparation-toiture/',
    '/services/pose-bache-protection-91/': '/reparation-toiture/',

    // Nettoyage toiture
    '/nettoyage-de-toiture-dans-l-essonne-91/': '/nettoyage-toiture/',
    '/entretien-toiture/': '/nettoyage-toiture/',
    '/services/nettoyage-toiture-91/': '/nettoyage-toiture/',
    '/services/demoussage-toiture-91/': '/nettoyage-toiture/',
    '/services/traitement-toiture-91/': '/nettoyage-toiture/',
    '/application-de-traitement-hydrofuge-91/': '/nettoyage-toiture/',

    // Charpente
    '/traitement-de-charpente-91/': '/charpente/',
    '/services/diagnostic-charpente-91/': '/charpente/',
    '/services/traitement-charpente-91/': '/charpente/',
    '/services/reparation-charpente-91/': '/charpente/',
    '/services/modification-charpente-91/': '/charpente/',

    // Isolation
    '/services/isolation-toiture-91/': '/isolation-toiture/',

    // Velux
    '/pose-remplacement-de-velux/': '/fenetre-de-toit-velux/',
    '/services/fenetre-toit-velux-91/': '/fenetre-de-toit-velux/',

    // Gouttieres vers pilier zinguerie
    '/pose-et-remplacement-de-gouttieres/': '/zinguerie/',

    // Ramonage
    '/ramonage-de-cheminees-dans-l-essonne-91/': '/ramonage-cheminee/',
    '/services/ramonage-cheminee-91/': '/ramonage-cheminee/',

    // Pages villes
    '/couvreur-a-etrechy-91580/': '/couvreur-etrechy/',
    '/couvreur-a-etrechy-91580/remplacement-de-toiture-a-etrechy/': '/couvreur-etrechy/',
    '/couvreur-a-etrechy-91580/isolation-de-toiture-a-etrechy/': '/couvreur-etrechy/',
    '/couvreur-a-etrechy-91580/etancheite-de-toiture-a-etrechy/': '/couvreur-etrechy/',
    '/couvreur-a-etampes-91150/': '/couvreur-etampes/',
    '/couvreur-a-orsay-91400/': '/couvreur-orsay/',
    '/couvreur-a-orsay-91400/nettoyage-de-toiture-a-orsay/': '/couvreur-orsay/',
    '/couvreur-a-orsay-91400/installation-de-fenetre-de-toit-a-orsay/': '/couvreur-orsay/',
  },

  integrations: [
    sitemap({
      filter: (page) => !page.includes('/merci/') && !page.includes('/remplacement-toiture/') && !page.includes('/contact/'),
      serialize(item) {
        const u = new URL(item.url);
        let path = u.pathname;
        if (!path.endsWith('/')) path += '/';

        // Priorites SEO : home > services > villes > pages info
        if (path === '/') item.priority = 1.0;
        else if ([
          '/renovation-toiture/', '/reparation-toiture/',
          '/nettoyage-toiture/', '/charpente/', '/isolation-toiture/',
          '/fenetre-de-toit-velux/', '/inspection-toiture-drone/',
          '/ramonage-cheminee/', '/zinguerie/',
        ].includes(path)) item.priority = 0.8;
        else if (path.startsWith('/zinguerie/')) item.priority = 0.7;
        else if ([
          '/mentions-legales/', '/plan-du-site/',
        ].includes(path)) item.priority = 0.3;
        else item.priority = 0.7;

        item.changefreq = 'monthly';
        return item;
      },
    }),
  ],
});
