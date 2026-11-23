# IA Academy — site de la formation Google Flow (Académie Digitale)

Site statique (HTML + CSS + JS, sans framework, sans build). Il vend la formation « Google Flow » de l'Académie Digitale.

## Structure

```
index.html           page de vente (ne pas modifier pour les liens ou les prix)
politique.html       politique de confidentialité + conditions de vente
config/config.js     TOUS les liens et les prix (seul fichier à modifier au quotidien)
assets/site.js       comportement : intro, liens depuis la config, FAQ, YouTube, animations
assets/*             images, vidéos du mur (mp4), logos
vercel.json          réglages Vercel (URLs propres, cache)
```

## Règle n°1 : les liens et les prix se changent UNIQUEMENT dans `config/config.js`

Quand le propriétaire envoie un nouveau lien (paiement Chariow, YouTube, WhatsApp, Telegram, TikTok) ou un nouveau prix :
1. Modifier la valeur correspondante dans `config/config.js`, rien d'autre.
2. Garder les guillemets. Numéros WhatsApp : chiffres seulement avec l'indicatif (ex. `2250709743973`).
3. YouTube : coller le lien complet (watch, youtu.be ou shorts). Vide = le bloc affiche « La vidéo arrive très bientôt » ; pour `youtubeCommentPayer`, vide = la section est cachée.
4. Commit + push : Vercel redéploie automatiquement.

Ne pas réécrire `index.html` pour un changement de lien ou de prix : `assets/site.js` lit la config et remplit tous les éléments marqués `data-link`, `data-cfg`, `data-tel`, `data-text`, `data-youtube`.

## Design à respecter (le propriétaire y tient)

- Fond noir #07070A, accent turquoise #00F5D4, texte #F2F2EE. Pas d'autre couleur d'accent.
- Titres en Anton (majuscules), texte en Plus Jakarta Sans, petites étiquettes en Space Mono.
- Intro : le logo « flow » s'ouvre comme une porte (2 moitiés), puis le titre s'écrit lettre par lettre.
- Arrière-plan du haut : l'image Google Flow floutée et IMMOBILE. Rien ne doit bouger derrière le texte.
- Pas de bande qui défile, pas de rangée « Suivre sur ».
- Ne change que ce qui est demandé. Ne refais jamais le design de toi-même.

## Déploiement (première fois)

Le propriétaire a déjà un autre site « academie-digitale » sur GitHub et Vercel. NE PAS le toucher.

1. Créer un NOUVEAU dépôt GitHub `ia-academy` (privé), y pousser ce dossier sur la branche `main`.
2. Sur Vercel, créer un NOUVEAU projet `ia-academy` relié à ce dépôt :
   - Framework preset : Other
   - Build command : aucune · Output directory : `.` (racine)
3. Vérifier le déploiement : la page s'ouvre, l'intro « flow » s'ouvre, les boutons « Payer maintenant » ouvrent le lien Chariow, la page `/politique` s'affiche.
4. Donner l'URL de production au propriétaire (ex. `ia-academy.vercel.app`).

## Mises à jour ensuite

Modifier → commit avec un message clair en français → push sur `main` → Vercel redéploie → vérifier l'URL.
