// Point d'entrée du conteneur : serveur Astro Node (standalone) + cache navigateur
// longue durée sur les médias. Sans ça, les images partent en « max-age=0 » et le
// navigateur les revérifie à chaque page vue (lenteur ressentie sur mobile).
import http from 'node:http';

process.env.ASTRO_NODE_AUTOSTART = 'disabled';
const { handler } = await import('./dist/server/entry.mjs');

const MEDIAS = /^\/(images|videos|fonts)\/|\.(webp|avif|jpe?g|png|svg|ico|woff2|mp4)$/i;
const CACHE = 'public, max-age=2592000, stale-while-revalidate=86400'; // 30 jours

const server = http.createServer((req, res) => {
  const chemin = (req.url || '').split('?')[0];
  if (MEDIAS.test(chemin)) {
    const set = res.setHeader.bind(res);
    res.setHeader = (nom, valeur) =>
      String(nom).toLowerCase() === 'cache-control' ? set(nom, CACHE) : set(nom, valeur);
    set('Cache-Control', CACHE);
  }
  handler(req, res);
});

const port = Number(process.env.PORT) || 4321;
const host = process.env.HOST || '0.0.0.0';
server.listen(port, host, () => console.log(`Serveur prêt sur http://${host}:${port}`));
