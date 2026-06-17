# Plan de migration Astro — robert-daniel-couverture.fr

**Décisions validées (16 juin 2026) :**
1. ✅ Abandon des sous-pages service×ville → une seule page riche par commune.
2. ✅ Création du contenu manquant (piliers vides + isolation).
3. ✅ Slugs propres pour tout le site, avec redirections 301.

Ce document fige l'arborescence cible, le plan de redirections (fichier `plan-redirections-301-definitif.csv`) et le backlog de contenu à produire avant/pendant le build Astro.

---

## 1. Arborescence cible (slugs propres)

```
/                                   Accueil — pilier « Couvreur Essonne (91) »
/a-propos/
/contact/
/mentions-legales/
/plan-du-site/

SERVICES (piliers, 1 par intention) :
/renovation-toiture/                rénovation + écran sous-toiture + pose tuiles/ardoises/zinc
/remplacement-toiture/              remplacement complet de couverture
/reparation-toiture/                réparation + recherche de fuite + infiltration + urgence/bâche
/nettoyage-toiture/                 nettoyage + démoussage + traitement hydrofuge
/charpente/                         traitement + réparation + diagnostic + modification charpente
/isolation-toiture/                 isolation combles/toiture (Sarking, rampants, écran)
/fenetre-de-toit-velux/             pose & remplacement de Velux
/inspection-toiture-drone/          inspection/diagnostic par drone
/ramonage-cheminee/                 ramonage

/zinguerie/                         pilier zinguerie
   /zinguerie/gouttieres-zinc/
   /zinguerie/gouttieres-aluminium/
   /zinguerie/gouttieres-pvc/
   /zinguerie/descentes-eaux-pluviales/
   /zinguerie/noues-aretiers/
   /zinguerie/solins-raccords/
   /zinguerie/couvertines/

VILLES (cocon homogène, 1 page/commune, slug /couvreur-[ville]/) :
/couvreur-etrechy/   /couvreur-etampes/   /couvreur-orsay/
+ 19 nouvelles (voir §3)
```

### Conventions de slug
- Minuscules, tirets, sans code postal ni « -91 » ni « -dans-l-essonne » (le ciblage géo reste dans title/H1/contenu).
- Communes : `/couvreur-[ville-en-tirets]/` (ex. `/couvreur-saint-sulpice-de-favieres/`).
- Cocon zinguerie niché sous `/zinguerie/` pour un silo thématique clair.

> ⚠️ **Point de vigilance 301** : `/services/couvertines-91/` est aujourd'hui positionnée **n°3**, et `/couvreur-a-etrechy-91580/` est la page la plus forte. La redirection est juste, mais ces deux URL sont à surveiller de près après mise en ligne (un léger creux temporaire est normal, la 301 transfère l'équité). *Option de prudence : conserver le slug actuel d'Étréchy si tu préfères zéro risque sur la meilleure page — à me dire.*

---

## 2. Backlog de contenu

### 2.1 Pages à CONSERVER en l'état (migration simple)
Home (optimiser uniquement les balises money), `/a-propos/`, `/contact/`, `/mentions-legales/`, `/zinguerie/` + ses 7 sous-pages cocon, `/inspection-toiture-drone/`. Contenu 2026 de qualité — on migre tel quel, on corrige juste les bugs de liens et on remet le maillage à jour.

### 2.2 Pages à CRÉER ou RÉÉCRIRE (contenu)

| Page cible | Action | Sources à fusionner |
|---|---|---|
| `/nettoyage-toiture/` | Créer (pilier) | nettoyage 2023 + démoussage + hydrofuge |
| `/charpente/` | Créer (pilier) | base `/traitement-de-charpente-91/`, étendre à réparation/diagnostic/modification, **corriger le `<title>` vide** |
| `/isolation-toiture/` | Créer (neuf) | — (page actuellement vide) |
| `/reparation-toiture/` | Créer (pilier) | réparation 2023 + recherche de fuite + infiltration + urgence/bâche |
| `/renovation-toiture/` | Réécrire/enrichir | `/renovation-de-toiture-91/` + pose tuiles/ardoises/zinc |
| `/remplacement-toiture/` | Réécrire | `/remplacement-de-toiture-91/` (préserver le bon ranking) |
| `/fenetre-de-toit-velux/` | Réécrire | `/pose-remplacement-de-velux/` |
| `/ramonage-cheminee/` | Réécrire | `/ramonage-de-cheminees-dans-l-essonne-91/` |

À traiter pour toutes : retirer emojis 🧡, formules bannies (« il est important », « essentielle », « en tant que »…), supprimer les formulaires de commentaires (passer de `type=article` à page service), 1re personne du singulier (M. Robert), CTA boutons (pas de tél. dans le texte).

### 2.3 Pages villes

**Réécrire (existantes)** : `/couvreur-etrechy/` (retirer la promo « été 2025 » périmée, dédupliquer l'intro, refaire le maillage vers les piliers), `/couvreur-etampes/` (corriger « travaux à **Étréchy** », « **Hitel** de Ville », dédupliquer), `/couvreur-orsay/`.

**Créer (19 nouvelles)** selon `redactionpagesvilles.pdf` + `guidelinesBAlisesSEO.pdf` :
Chamarande, Auvers-Saint-Georges, Morigny-Champigny, Saint-Sulpice-de-Favières, Mauchamps, Boissy-sous-Saint-Yon, Chauffour-lès-Étréchy, Souzy-la-Briche, Villeconin, Lardy, Torfou, Janville-sur-Juine, Bouray-sur-Juine, Villeneuve-sur-Auvers, Cerny, Brières-les-Scellés, Égly, Breuillet, Saint-Yon.
*(Étampes figure dans la liste des 20 mais existe déjà → réécriture.)*

Gabarit ville (d'après guidelines) : Hero + H1, paragraphe sous-H1 rassurant (1re personne, champ lexical couverture), liste à puces variée (3 éléments), section avis (3 avis variés/ville), section services (cards), CTA. Anti-duplication stricte d'une commune à l'autre.

---

## 3. Maillage interne cible
- **Menu** = piliers réels uniquement (rénovation, remplacement, réparation, nettoyage, charpente, isolation, velux, zinguerie, inspection drone, ramonage). Supprimer les liens vers les anciennes URL/doublons.
- **Pages villes** → liens vers les **piliers services** (plus jamais vers les vieux articles).
- **Home** → piliers + top villes.
- **Cocon zinguerie** → maillé depuis `/zinguerie/` et cité dans les pages villes.
- Corriger les 2 liens cassés (`/lien`, `/nettoyage-de-toiture-91/`) et l'ancre « Couverture générale ».

---

## 4. À faire côté technique (migration)
1. Implémenter les 301 du fichier `plan-redirections-301-definitif.csv` (au niveau hébergeur/Astro adapter ou `_redirects`).
2. NAP unique sur tout le site (42 grande rue 91580 Étréchy + 06 83 96 15 18 + **un seul** email — choisir entre `robert.entreprise@outlook.fr` et `contact@robert-daniel.fr`).
3. Données structurées `LocalBusiness` / `RoofingContractor` cohérentes avec le NAP.
4. Nouveau sitemap.xml propre (slugs cibles only), resoumettre en Search Console + surveiller les 301.
5. Conserver la médiathèque (`contenuWordpress/`, 1 898 images) — mapper les images réutilisées.

---

## 5. Prochaine étape proposée
Une fois ce plan validé : je peux **scaffolder le projet Astro** (structure de composants : Layout, Header/menu propre, Hero, BlocServices/Cards, Avis, CTA, Footer NAP, gabarit Ville, gabarit Service/Pilier, gabarit Cocon) et commencer à produire le contenu des piliers, puis dérouler les 19 villes. Dis-moi si je démarre par le scaffolding Astro ou par la rédaction des piliers de contenu.
