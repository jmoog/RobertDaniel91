# Robert Daniel Couverture — Déploiement & reste à faire

_Mis à jour le 18 juin 2026._

Le site est en **Astro + adapter Node (standalone)** : les pages sont prérendues
en statique, et la route serveur **`/api/devis`** envoie les emails via **Brevo**
(même système que le site fwatoitures / Adnot). Le conteneur lance un serveur
Node sur le port **4321**.

---

## 1. Variables d'environnement (Brevo)

À renseigner dans **Coolify → Environment Variables**. Attention au moment où
chaque variable est lue :

| Variable | Rôle | Valeur | Moment | Secret |
|---|---|---|---|---|
| `BREVO_API_KEY` | Clé API Brevo qui envoie les emails | `xkeysib-…` (depuis app.brevo.com → Settings → SMTP & API → API Keys) | **Runtime** | 🔒 oui |
| `ADMIN_EMAILS` | Qui reçoit les demandes de devis (séparés par virgule) | `jmoog27@gmail.com,robert.entreprise@outlook.fr` | **Runtime** | non |
| `FROM_EMAIL` | Adresse expéditrice des emails | `contact@robert-daniel-couverture.fr` (**domaine vérifié sur Brevo**) | **Runtime** | non |
| `FROM_NAME` | Nom affiché de l'expéditeur | `Robert Daniel Couverture` | **Runtime** | non |
| `PUBLIC_TURNSTILE_SITE_KEY` | Clé publique anti-robot (optionnel) | clé « site » Cloudflare Turnstile | **Build** | non |
| `TURNSTILE_SECRET_KEY` | Clé secrète anti-robot (optionnel) | clé « secret » Cloudflare Turnstile | **Runtime** | 🔒 oui |

➡️ Les demandes de devis arrivent sur **`jmoog27@gmail.com`** (et sur
`robert.entreprise@outlook.fr`), via `ADMIN_EMAILS`. Le client reçoit en plus un
**accusé de réception** automatique.

### Mise en route du formulaire (3 points)

1. **Brevo** : créer un compte, générer une **clé API** → `BREVO_API_KEY`.
2. **Domaine expéditeur** : vérifier `robert-daniel-couverture.fr` dans Brevo
   (enregistrements DKIM/DMARC) pour que `FROM_EMAIL` parte sans finir en spam.
3. **Coolify** : ajouter les variables ci-dessus, puis redéployer.

> Turnstile est **optionnel** : sans les deux clés, le formulaire fonctionne
> quand même (honeypot + time-trap + filtre anti-spam serveur restent actifs).
> En local : copier `.env.example` en `.env`.

---

## 2. Ce qui reste à faire

### Prioritaire
- [ ] **Brevo** : créer la clé API + vérifier le domaine, renseigner
      `BREVO_API_KEY`, `ADMIN_EMAILS`, `FROM_EMAIL` dans Coolify → le formulaire enverra les emails.
- [ ] **Coolify** : confirmer que le service tourne bien en **Node** (Dockerfile),
      port **4321**. (Avant, le site était servi par nginx en statique — c'est
      maintenant un serveur Node.)
- [ ] **Rédiger les 7 sous-pages zinguerie** (encore en Lorem ipsum) :
      gouttières zinc / aluminium / PVC, descentes EP, noues & arêtiers,
      solins & raccords, couvertines.
- [ ] **Vérifier le rendu mobile en ligne** (logo centré, menu, WhatsApp).

### Secondaire
- [ ] (Optionnel) Activer **Cloudflare Turnstile** sur le formulaire.
- [ ] Finaliser les **redirections 301**, nettoyer les stubs `remplacement-toiture` et `contact`.
- [ ] Récupérer le **logo vectoriel** propre du graphiste.

### Déjà fait ✅
- 8 pages services + page zinguerie rédigées ; 22 pages villes (composant `PageVille`).
- Photos/vidéos intégrées ; menu mobile (logo centré, WhatsApp) ; logo Allianz.
- **Formulaire de devis branché sur Brevo** (route `/api/devis`, notif admin + accusé client, anti-spam).

---

## 3. Rappels de déploiement

- Push sur `main` → Coolify rebuild automatiquement (build Docker).
- **Coolify : « Ports Exposes » = `4321`** (le serveur Node écoute sur 4321).
- Le build génère `dist/server/entry.mjs` (serveur) + les pages statiques.
