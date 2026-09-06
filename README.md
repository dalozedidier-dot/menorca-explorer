# Minorque Explorer

Carte interactive statique de Minorque, prête pour **GitHub Pages**.
HTML + CSS + JavaScript natif : aucun framework, aucune compilation, et aucun CDN pour le code
applicatif — Leaflet est inclus localement. Le site charge en revanche des services externes à
l’usage : polices Google Fonts, tuiles cartographiques (OpenStreetMap, OpenTopoMap, Esri) et
photographies via l’API Wikimedia Commons.

➡️ **[Voir le site](https://dalozedidier-dot.github.io/menorca-explorer/)**

## Ce que contient le site

| | |
|---|---|
| **95 lieux** | criques, plages, villages, phares, panoramas, patrimoine talayotique, marchés et producteurs — coordonnées vérifiées contre le trait de côte OpenStreetMap |
| **12 itinéraires** | journées thématiques, plans B « vent » et « pluie », condensé en 3 jours |
| **Camí de Cavalls** | les 20 étapes officielles du GR-223 avec distance, durée, difficulté, points d’eau, et découpages du tour complet en 5 / 7 / 10 jours |
| **Infos pratiques** | venir sur l’île, circuler, plages à accès réglementé, quand partir, budget, gestes de réserve de biosphère |
| **Climat mois par mois** | températures de la mer et de l’air et jours de pluie, d’après les normales AEMET |
| **Saveurs & culture** | produits AOP, fêtes, héritages britannique et français, pierre sèche |

## Fonctionnalités de l’interface

- **Thème clair / sombre**, suivant le système par défaut, mémorisé ensuite.
- **Filtres cumulables** : catégorie, région, effort d’accès, affluence, équipements.
- **Filtre « vent du jour »** — choisis le vent qui souffle, la carte ne garde que les rivages
  qui lui tournent le dos. C’est le filtre le plus utile de l’île.
- **Recherche plein texte** sur les noms, régions, descriptions et mots-clés.
- **Carte Leaflet** avec regroupement automatique des marqueurs, fonds *carte / relief / satellite*,
  corridor côtier du Camí de Cavalls, et « près de moi » par géolocalisation.
- **Photos par lieu** : vignette sur chaque carte de la liste et grande image sur chaque fiche,
  résolues à la volée depuis Wikimedia Commons (surcharge manuelle → recherche plein texte →
  recherche géographique), avec crédits automatiques et cache de 30 jours dans le navigateur.
- **Fiches détaillées** : vents dont le lieu est abrité, effort d’accès, affluence et lieux voisins.
- **Planificateur « Mon voyage »** : organisation par jour, réordonnancement, distance à vol d’oiseau,
  ouverture de la journée dans Google Maps, impression, et lien de partage qui contient toute la sélection.
- **Accessibilité** : navigation clavier complète, `aria-pressed` sur tous les filtres, contrastes vérifiés,
  respect de `prefers-reduced-motion`, palette de catégories validée pour les déficiences de la vision des couleurs.
- **Raccourcis clavier** : `/` recherche · `M` mon voyage · `T` thème · `R` lieu au hasard.

## Structure

```
index.html                  page unique
assets/
  styles.css                thèmes, composants, responsive, impression
  app.js                    carte, filtres, fiches, planificateur
  hero-macarella.jpg        photo de couverture
  vendor/leaflet/           Leaflet 1.9.4 (BSD-2), embarqué : pas de CDN pour le code
data/
  places.js                 les 95 lieux
  itineraries.js            les 12 itinéraires
  cami.js                   les 20 étapes + découpages 5/7/10 jours
  cami-trace.js             corridor côtier des 20 étapes (polylignes)
  photos.js                 surcharges de photos et termes de recherche Commons
  guide.js                  infos pratiques, climat, saveurs, culture
  outline.js                silhouette de l’île (tracé SVG)
```

## Ajouter ou modifier un lieu

Tout se passe dans `data/places.js`. Le schéma est documenté en tête de fichier :

```js
{id:'ma-crique', name:'Ma crique', cat:'plage', region:'Sud', lat:39.9, lng:4.0,
 score:4, icon:'🏝️', top:false, face:'S', effort:'marche', crowd:'calme',
 f:['snorkeling','ombre'], tags:['turquoise','à pied'],
 best:'Matin', access:'20 min de marche', desc:'…'}
```

- `face` est l’orientation du rivage : c’est ce qui alimente le filtre « vent du jour ».
- `f` accepte les clés listées dans `FLAGS` (`assets/app.js`).
- `cat` doit exister dans `CATS` (`assets/app.js`) — y ajouter une catégorie demande aussi
  une couleur `--c-…` dans `assets/styles.css`, pour les deux thèmes.

## Forcer la photo d’un lieu

Si l’image trouvée automatiquement ne convient pas, ouvre la page du fichier sur
[Wikimedia Commons](https://commons.wikimedia.org/), recopie son titre et ajoute une ligne
dans `data/photos.js` :

```js
window.MENORCA_PHOTOS = {
  'fornells': 'Fornells, Menorca.jpg',
  …
};
```

Le cache navigateur expire au bout de 30 jours ; pour voir l’effet tout de suite,
vider `menorca-photos` dans le stockage local.

## Développer en local

```bash
python -m http.server 8000
```

Puis ouvrir `http://localhost:8000`. Éviter d’ouvrir `index.html` en `file://` : les modules
de données et l’API Wikimedia s’en accommodent mal.

## Publication

Le workflow `.github/workflows/deploy-pages.yml` publie automatiquement à chaque push sur `main`.
Dans **Settings → Pages**, la source doit être réglée sur **GitHub Actions**.

## Données et licences

Voir [`CREDITS.md`](CREDITS.md). Code sous licence MIT ; données et médias conservent leurs licences propres.
