# Audit SEO 360° — robert-daniel-couverture.fr

**Client :** M. ROBERT Daniel — Artisan couvreur, 42 grande rue, 91580 Étréchy (Essonne)
**Objet :** Diagnostic stratégique avant migration WordPress → Astro
**Date :** 16 juin 2026
**Données analysées :** sitemap (60 URL), export Google Search Console (3 mois), crawl d'un échantillon de 16 pages, recherche citations externes.

---

## 1. Synthèse exécutive

Le site ne se positionne pas parce que son autorité est **fragmentée et diluée** sur trop de pages, dont beaucoup sont **vides ou en doublon**. Concrètement :

- **~22 pages indexées sont des coquilles vides** (aucun contenu : titre = slug brut, pas de meta description). Cela représente environ **un tiers du site**. Google reçoit un signal de qualité globale dégradé qui plombe l'ensemble du domaine.
- **Trois générations de pages services coexistent** et se cannibalisent : vieux articles de blog 2023 (avec formulaire de commentaires ouvert), pages « service-de-toiture-91 » du menu, et nouveau cocon `/services/…-91`. Pour la plupart des prestations, **2 à 6 URL différentes visent la même intention**.
- **Les mots-clés qui rapportent sont bloqués en page 2**, pendant que des micro-pages se positionnent en top 3 sur des requêtes à volume quasi nul. L'effort SEO est mal alloué.
- **Le maillage interne est incohérent et bugué** : 4 jeux de liens parallèles, un lien cassé (`/lien`), une ancre erronée, des pages de menu qui pointent vers des URL différentes du cocon.
- **La cohérence NAP est rompue** : 3 adresses différentes selon les annuaires, 2 emails dont un sur un autre domaine, et un homonyme concurrent (« Daniel Robert SAS » à Igny) qui parasite la marque.

**La bonne nouvelle :** le contenu récent (2026) est de très bonne qualité (home, zinguerie, inspection drone, à-propos, page Étréchy). Le problème n'est pas la qualité rédactionnelle, c'est **l'architecture**. La migration Astro est le moment idéal pour assainir la structure plutôt que de recopier le désordre.

### Chiffres-clés (GSC, 3 derniers mois)

| Indicateur | Valeur | Lecture |
|---|---|---|
| Clics totaux (toutes pages) | ~60 | Très faible pour un site de cette taille |
| Page d'accueil | 44 clics / 2 968 impressions / **pos. 11,35** | Le site rank pour « couvreur 91 » mais reste en page 2 |
| « couvreur 91 » (requête n°1) | 1 440 impressions / **pos. 12,5** / 0,69 % CTR | Mot-clé money bloqué page 2 |
| `/services/couvertines-91/` | **pos. 3,07** / 187 impressions / 2 clics | Rank top 3… sur une requête à très faible volume |
| Pages à 0 clic malgré des impressions | majorité du site | Cannibalisation + page 2 + CTR faible |

---

## 2. Inventaire & état réel des pages

Le site mélange plusieurs « époques » de production, jamais nettoyées.

### 2.1 Pages de qualité à conserver (contenu 2026, bien rédigé)

| URL | État | GSC (pos.) |
|---|---|---|
| `/` (accueil) | Pilier « couvreur Essonne » — bon | 11,35 |
| `/zinguerie/` | Pilier zinguerie — bon, bien maillé | 12,01 |
| `/a-propos/` | Très bon (récit 1re personne) | 9,05 |
| `/couvreur-a-etrechy-91580/` | Page ville riche — **modèle de référence** | 14,91 |
| `/services/inspection-toiture-drone-91/` | Excellent contenu | — |
| `/services/couvertines-91/` | Bon | **3,07** |
| `/services/gouttieres-zinc-91/` | Bon | — |
| `/services/gouttieres-aluminium-91/`, `/gouttieres-pvc/`, `/descentes-eaux-pluviales-91/`, `/noues-aretiers-zinc-91/`, `/solins-raccords-91/` | Bons (cocon zinguerie) | — |

### 2.2 Pages anciennes à contenu (à conserver/retravailler, slugs « -91 » du menu)

`/diagnostic-de-toiture-91/` (pos. 21), `/renovation-de-toiture-91/` (15,25), `/remplacement-de-toiture-91/` (**5,35**), `/reparation-de-toiture-91/` (24,7), `/application-de-traitement-hydrofuge-91/` (24,4), `/traitement-de-charpente-91/` (10,9), `/pose-remplacement-de-velux/` (36,3), `/couvreur-a-etampes-91150/` (30,7), `/couvreur-a-orsay-91400/` (12,3).

> Ces pages ont du contenu mais souffrent de défauts éditoriaux (voir §4) : emojis 🧡, formules bannies, promo expirée (« Fête l'été jusqu'au 15 septembre 2025 »), erreurs de copier-coller (« travaux de couverture à Étréchy » présent sur la page **Étampes**), intros quasi-dupliquées d'une ville à l'autre.

### 2.3 Vieux articles de blog 2023 (à fusionner/migrer)

`/recherche-de-fuites-toitures-91/` (formulaire de commentaires ouvert, auteur « Jmoog », meta = « Il est important… » = formule bannie), `/nettoyage-de-toiture-dans-l-essonne-91/`, `/ramonage-de-cheminees-dans-l-essonne-91/`, `/pose-et-remplacement-de-gouttieres/`.

### 2.4 ⚠️ Pages VIDES indexées (à supprimer + 301)

**4 piliers du sitemap principal, sans aucun contenu :**
`/reparation/`, `/charpente/`, `/couverture-generale/`, `/entretien-toiture/`.

**~18 pages du cocon `/services/`, coquilles vides** (titre = slug, pas de meta) :
`nettoyage-toiture-91`, `demoussage-toiture-91`, `traitement-toiture-91`, `recherche-fuite-toiture-91`, `infiltration-toiture-91`, `pose-bache-protection-91`, `renovation-toiture-91`, `remplacement-toiture-91`, `pose-ardoises-91`, `pose-tuiles-91`, `toiture-zinc-91`, `isolation-toiture-91`, `fenetre-toit-velux-91`, `diagnostic-charpente-91`, `traitement-charpente-91`, `reparation-charpente-91`, `modification-charpente-91`, `ramonage-cheminee-91`.

> Toutes sont en `index, follow`. Elles diluent la qualité perçue du domaine et créent de la cannibalisation. **Priorité n°1 absolue.**

---

## 3. Cannibalisation & intentions de recherche

Pour presque chaque prestation, plusieurs URL se disputent la même intention. Google répartit les signaux entre elles → aucune ne passe en page 1.

| Intention | URL en concurrence | Action |
|---|---|---|
| **Remplacement toiture** | `/remplacement-de-toiture-91/` (contenu, **pos. 5,35**) + `/services/remplacement-toiture-91/` (vide, pos. 1,6) | Garder la 1re, 301 la vide |
| **Rénovation toiture** | `/renovation-de-toiture-91/` (contenu) + `/services/renovation-toiture-91/` (vide) | Garder la 1re, 301 la vide |
| **Réparation toiture** | `/reparation/` (vide) + `/reparation-de-toiture-91/` (contenu) | 301 le pilier vide vers la page contenu |
| **Recherche de fuite** | `/recherche-de-fuites-toitures-91/` (vieux post) + `/services/recherche-fuite-toiture-91/` (vide) + `/services/infiltration-toiture-91/` (vide) | Fusionner en 1 page « réparation/urgence », 301 le reste |
| **Nettoyage / démoussage** | `/nettoyage-de-toiture-dans-l-essonne-91/` + `/services/nettoyage-toiture-91/` + `/services/demoussage-toiture-91/` + `/services/traitement-toiture-91/` + `/application-de-traitement-hydrofuge-91/` | 1 pilier « entretien » + 301 |
| **Velux / fenêtre de toit** | `/pose-remplacement-de-velux/` (contenu) + `/services/fenetre-toit-velux-91/` (vide) | Garder la 1re, 301 la vide |
| **Charpente** | `/charpente/` (vide) + `/traitement-de-charpente-91/` (contenu) + 4 `/services/…-charpente-91/` (vides) | 1 pilier charpente + 301 les 5 |
| **Gouttières** | `/pose-et-remplacement-de-gouttieres/` (vieux) + cocon `/services/gouttieres-*` (bons) | Rattacher au pilier `/zinguerie/`, 301 le vieux |
| **Ramonage** | `/ramonage-de-cheminees-dans-l-essonne-91/` (contenu) + `/services/ramonage-cheminee-91/` (vide) | Garder la 1re, 301 la vide |
| **Diagnostic / inspection** | `/diagnostic-de-toiture-91/` + `/services/inspection-toiture-drone-91/` (drone, bon) + `/services/diagnostic-charpente-91/` (vide) | Clarifier les 2 angles, 301 la vide |

**Mauvaise allocation d'autorité (le cœur du problème) :** le site se classe **n°3 pour « couvertines essonne »** (≈ 0 recherche/mois) mais **n°12 pour « couvreur 91 »** et **n°32 pour « couvreur étampes »** (le vrai volume). Trop de jus envoyé vers des micro-prestations, pas assez vers les têtes de requêtes « couvreur + ville/91 ».

---

## 4. Qualité on-page & balises

Mesuré contre vos propres guidelines (PDF balises SEO + rédaction villes) :

- **Pages vides = balises cassées.** Title = slug brut (`nettoyage-toiture-91 – Artisan couvreur…`), aucune meta description. ~22 pages concernées.
- **Triplette / homogénéité non respectée** sur les pages anciennes ; les nouvelles pages 2026 respectent bien la logique (title/H1/meta variés).
- **Formules bannies présentes** (votre liste) : « Il est important » (meta de `/recherche-de-fuites-toitures-91/`), « essentielle », « En tant que », emojis 🧡 dans les H2 des pages villes et services anciens.
- **Contenu dupliqué entre pages villes** : l'intro « Mon métier de couvreur à… » d'Étréchy est quasi identique à celle d'Étampes → viole votre Règle 1 (anti-duplication).
- **Erreurs de copier-coller** : page Étampes mentionne « travaux de couverture à **Étréchy** » et « Place de l'**Hitel** de Ville » (typo).
- **Contenu périmé** : promo « Fête l'été jusqu'au 15 septembre 2025 » toujours en ligne sur la page Étréchy (nous sommes en juin 2026).
- **CTR catastrophique** même en page 1 : `/services/couvertines-91/` en pos. 3 ne génère quasi aucun clic → titres/metas peu incitatifs et/ou requêtes sans volume.

---

## 5. Maillage interne & pages orphelines

Quatre graphes de liens parallèles qui ne se rejoignent pas :

1. **Menu principal** → pointe vers les 7 pages « `…-de-toiture-91` » (diagnostic, rénovation, remplacement, recherche de fuites, réparation, hydrofuge, traitement charpente). Ces cibles **ne sont pas** le cocon `/services/`.
2. **Pilier `/zinguerie/`** → pointe vers le cocon `/services/gouttieres-*`, couvertines, solins… (bon silo, mais isolé du reste).
3. **Pages villes** (Étréchy, Étampes) → pointent vers les **vieilles** URL (`/nettoyage-de-toiture-dans-l-essonne-91/`, `/pose-remplacement-de-velux/`, `/ramonage…`) — jamais vers le cocon `/services/`.
4. **Cocon `/services/`** → se maille en interne mais reçoit peu de liens des pages fortes.

**Bugs de maillage relevés :**
- Lien cassé : sur `/zinguerie/`, « gouttières aluminium sur mesure » pointe vers `https://robert-daniel-couverture.fr/lien` (placeholder).
- Lien cassé : sur `/traitement-de-charpente-91/`, « nettoyage de toiture » pointe vers `/nettoyage-de-toiture-91/` (URL inexistante).
- Ancre erronée : en pied de page, « Couverture générale » pointe vers `/charpente/`.
- Le menu envoie du jus vers des pages qui devraient être supprimées (doublons), gaspillant le PageRank interne.
- Paragraphe dupliqué mot pour mot sur `/services/couvertines-91/` (section « secteurs d'intervention » répétée 2×).

**Bugs techniques additionnels :**
- `/traitement-de-charpente-91/` : **balise `<title>` vide** (title et og:title vides) — défaut SEO grave sur une page que l'on garde comme canonique.
- Plusieurs « piliers » sont en réalité d'anciens **articles de blog 2023** (`type=article`, auteur « Jmoog ») avec **formulaire de commentaires ouvert** (`/diagnostic-de-toiture-91/`, `/traitement-de-charpente-91/`, `/recherche-de-fuites-toitures-91/`) → risque de spam + signal « article » au lieu de « page service ». À convertir en pages de service lors de la migration.

**Conséquence :** le jus de liens se disperse, les pages stratégiques (home, villes) ne sont pas renforcées, et des pages vides captent des liens internes.

---

## 6. Citations locales & NAP

| Source | Donnée trouvée | Problème |
|---|---|---|
| Site web | 42 grande rue, 91580 Étréchy | Référence officielle |
| PagesJaunes | « Robert Daniel **Marcoussis** » | Ville incohérente |
| Mappy | « 3 rte de Briis, **91460** » | Adresse incohérente |
| Email site (footer) | `robert.entreprise@outlook.fr` **et** `contact@robert-daniel.fr` | 2 emails, dont un sur un **autre domaine** |
| Homonyme | « **Daniel Robert SAS** », Igny 91430 | Concurrent homonyme → confusion de marque (requête GSC « daniel robert igny » pos. 14) |

**Impact :** un NAP incohérent affaiblit directement le référencement local (Google Business Profile + pack local). C'est un frein majeur pour un artisan dont 100 % de la clientèle est locale.

**À faire :** figer **un** NAP de référence (Nom + Adresse 42 grande rue 91580 Étréchy + Tél 06 83 96 15 18 + un seul email), puis auditer/corriger chaque annuaire. Annuaires prioritaires couvreur 91 : Google Business Profile, PagesJaunes, Bing Places, Apple Plans, Solocal, Houzz, Travaux.com, Ooreka/Pages d'Or, annuaires CMA/Chambre des Métiers, annuaires couverture (lacouverture.fr, etc.).

---

## 7. Architecture cible recommandée

Principe directeur : **un sujet = une page = une URL**, et **minimiser le churn d'URL** (on garde les URL qui rankent déjà, on ne redirige que les vides et les doublons).

### 7.1 Structure cible

```
/                                  ← pilier « Couvreur Essonne (91) » (page money)
/a-propos/  /contact/  /mentions-legales/  /plan-du-site/

SERVICES (piliers, 1 par intention forte) :
/renovation-de-toiture-91/         ← rénovation + remplacement + pose tuiles/ardoises/zinc
/reparation-de-toiture-91/         ← réparation + recherche de fuite + urgence/bâche
/entretien-toiture/  (à recréer)   ← nettoyage + démoussage + hydrofuge
/zinguerie/                        ← pilier zinguerie (déjà bon)
   └─ cocon : gouttières zinc / alu / pvc, descentes, noues, solins, couvertines
/charpente/  (à recréer)           ← traitement + réparation + diagnostic charpente
/isolation-de-toiture-91/ (à créer)← isolation combles/toiture
/pose-remplacement-de-velux/       ← fenêtres de toit
/services/inspection-toiture-drone-91/  ← inspection drone (déjà excellent)
/ramonage-de-cheminees-dans-l-essonne-91/

COCON VILLES (homogène, 1 page par commune) :
/couvreur-a-etrechy-91580/   (référence)
/couvreur-a-etampes-91150/   /couvreur-a-orsay-91400/
+ 20 nouvelles villes (Chamarande, Auvers-Saint-Georges, Lardy, Breuillet, …)
```

### 7.2 Décisions de structure à trancher (3 points)

1. **Sous-pages service×ville** (modèle actuel Orsay/Étréchy : `/couvreur-a-orsay-91400/nettoyage-de-toiture-a-orsay/`) → **à abandonner**. Elles créent du contenu fin et de la cannibalisation. Recommandation : **une seule page riche par commune**, et 301 des sous-pages vers la page ville. *(à confirmer)*
2. **Schéma d'URL** : garder les slugs actuels qui rankent (recommandé, SEO-safe) **ou** profiter de la migration pour des slugs propres (`/reparation-toiture/` au lieu de `/reparation-de-toiture-91/`) avec un plan 301 complet. *(à confirmer)*
3. **Pages à recréer vs rediriger** : `entretien-toiture`, `charpente`, `isolation` ont du volume de recherche → **les recréer avec du contenu** plutôt que rediriger. Les autres vides → 301. *(validé par défaut)*

### 7.3 Maillage cible

- **Menu** = uniquement les piliers réels (supprimer les liens vers les doublons).
- **Pages villes** → lier vers les **piliers services** (pas les vieux articles).
- **Home** → lier vers les 5-6 piliers + top villes.
- Corriger les 2 bugs (`/lien`, ancre « Couverture générale »).
- Réinjecter le cocon zinguerie dans le maillage des pages villes.

---

## 8. Plan d'action priorisé

**Phase 0 — Préparation migration (maintenant)**
La migration Astro EST le levier de nettoyage. Geler l'architecture cible + le plan de redirections AVANT de coder (voir CSV joint).

**Phase 1 — Stopper l'hémorragie (impact immédiat)**
1. Supprimer/rediriger les ~22 pages vides (301 vers canonique). → restaure la qualité globale du domaine.
2. Résoudre les 10 clusters de cannibalisation (1 URL canonique par intention + 301).
3. Corriger le NAP (1 référence) + reprendre Google Business Profile.

**Phase 2 — Renforcer ce qui rank déjà (gagner la page 1)**
4. Optimiser la home + balises pour « couvreur 91 / essonne » (passer de pos. 11 à page 1).
5. Recréer les piliers manquants (entretien, charpente, isolation) avec du vrai contenu.
6. Réparer le maillage interne (menu, villes → piliers, bugs).

**Phase 3 — Étendre (cocon villes)**
7. Migrer/réécrire les pages villes existantes (dédupliquer intros, retirer promos périmées, formules bannies).
8. Créer les 20 nouvelles pages villes selon vos guidelines (1 page riche/commune).
9. Audit citations locales complet + nettoyage annuaires.

**Phase 4 — Mesurer**
10. Suivi positions « couvreur + ville » + Search Console après mise en ligne.

---

## 9. Livrables joints

- **`plan-migration-urls-redirections.csv`** — chaque URL actuelle, son état, l'action recommandée et la cible de redirection 301. Base directe du fichier de redirections pour la migration Astro.

---

*Audit réalisé à partir des données de production, de l'export GSC fourni et des guidelines internes. Les recommandations d'architecture (§7.2) nécessitent votre validation avant de figer le plan de redirections et de démarrer le build Astro.*
