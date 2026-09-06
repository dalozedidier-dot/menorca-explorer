# Crédits, sources et licences

## Fonds de carte

Trois fonds sont proposés dans l’interface :

- **Carte** — tuiles **OpenStreetMap**, données sous **Open Database License (ODbL)**
  · <https://www.openstreetmap.org/copyright>
- **Relief** — tuiles **OpenTopoMap**, sous **CC BY-SA 3.0**, données OpenStreetMap sous ODbL
  · <https://opentopomap.org>
- **Satellite** — imagerie **Esri World Imagery** (Esri, Maxar, Earthstar Geographics et
  la communauté d’utilisateurs SIG), utilisée selon les conditions du service ArcGIS Online.

La bibliothèque cartographique est **Leaflet 1.9.4**, licence BSD-2-Clause, embarquée dans
`assets/vendor/leaflet/` (le fichier `LICENSE` du projet y est conservé) · <https://leafletjs.com/>

## Coordonnées des lieux

Les 95 lieux ont été positionnés puis **contrôlés automatiquement contre le trait de côte
OpenStreetMap** : chaque plage, crique et phare a été replacé sur le rivage réel, et un
contrôle final vérifie que chaque point tombe sur l’île (à l’exception, attendue, de
l’Illa del Rei et de l’Illa d’en Colom, qui sont des îles distinctes).

Le trait de côte à haute résolution provient de **geoBoundaries** (release `gbOpen`,
Espagne ADM2), lui-même dérivé d’OpenStreetMap et publié sous **CC BY 4.0** ·
<https://www.geoboundaries.org/>

## Camí de Cavalls (GR-223)

Le découpage en **20 étapes officielles**, les distances et les points de ravitaillement
suivent la documentation touristique du Consell Insular de Menorca et les guides de référence
du GR-223. Les durées indiquées sont des estimations pour un marcheur régulier, hors pauses.

**Le tracé dessiné sur la carte est un corridor côtier indicatif**, pas la trace GPS du sentier.
Il a été généralisé à partir du trait de côte OpenStreetMap (simplification de Douglas–Peucker,
tolérance 70 m), puis raccordé en ligne droite aux trois endroits que le sentier ne suit pas :
la péninsule de La Mola, le cap de Cavalleria et le fond de la baie de Fornells. Il situe
l’étape, il ne remplace ni le balisage sur le terrain ni une carte de randonnée.

## Silhouette de l’île

Le tracé SVG utilisé pour le logo et le filigrane de la section Camí est la même géométrie,
simplifiée à 200 m de tolérance.

## Photographies

- **Photo de couverture** : *Cala Macarella*, par **Paul Stephenson**, via Wikimedia Commons,
  licence **CC BY 2.0** · <https://commons.wikimedia.org/wiki/File:Cala_Macarella.jpg>
  · <https://creativecommons.org/licenses/by/2.0/>
- **Photos des lieux** (vignettes de la liste et image des fiches) : résolues à
  l'exécution via l'**API Wikimedia Commons**, en trois temps :
  1. une surcharge manuelle, quand `data/photos.js` impose un fichier précis ;
  2. sinon une recherche plein texte sur l'espace *Fichier* de Commons ;
  3. sinon une recherche géographique dans un rayon de 1,2 km autour du point.
  Les cartes, écussons, logos, schémas et fichiers SVG sont écartés, et seules les
  images d'au moins 500 px de large sont retenues. L'auteur et la licence renvoyés
  par l'API sont affichés sous chaque image de fiche, avec un lien vers la page
  Commons du fichier ; sur les vignettes, ils apparaissent en infobulle. Les
  résultats sont mis en cache 30 jours dans le navigateur du visiteur.
  **Aucune image n'est copiée dans ce dépôt** : tout reste servi par Wikimedia.
  Si aucune photo libre n'est trouvée, la fiche affiche une vignette colorée.

## Données climatiques

- **Température moyenne de l'air** et **nombre moyen de jours de précipitations ≥ 1 mm par mois** :
  normales climatiques **1981-2010** de l'**AEMET** (Agencia Estatal de Meteorología), station
  *Menorca, Aeropuerto* · <https://www.aemet.es/>
- **Température de l'eau de mer** : moyennes mensuelles relevées à Maó, calculées sur une dizaine
  d'années · <https://seatemperature.info/>
- L'**affluence** (échelle de 1 à 5) est la seule valeur du tableau qui ne soit pas mesurée :
  c'est une appréciation éditoriale, indiquée comme telle dans l'interface.

## Palette de couleurs

La palette des sept catégories a été vérifiée avec un validateur de contraste et de
séparation pour les déficiences de la vision des couleurs (protanopie, deutéranopie,
tritanopie), dans les deux thèmes. Chaque catégorie est en outre toujours doublée d’un
pictogramme et d’un libellé : la couleur n’est jamais la seule information.

## Typographie

**Fraunces** et **Inter**, servies par Google Fonts, toutes deux sous **SIL Open Font License 1.1**.

## Contenu éditorial

Les descriptions, conseils et textes culturels sont des rédactions originales.

Les informations pratiques (accès réglementés, transports, saisons) reflètent l'état connu au
moment de la rédaction : **elles changent chaque saison**. Les fermetures de routes vers
Macarella, Favàritx et Punta Nati sont reconduites et **ajustées chaque année** par le Consell
Insular de Menorca — en 2026, la fermeture de Favàritx a été avancée de quinze jours par rapport
au calendrier habituel. C'est pourquoi le site n'affiche plus de période fixe. Toujours vérifier
les sources officielles avant de partir.

Deux principes ont été appliqués au contenu factuel :

- **aucun chiffre n'est avancé sans source.** Les affirmations qui ne pouvaient pas être vérifiées
  ont été retirées plutôt que remplacées par une estimation. C'est le cas des tarifs de
  stationnement : le site indique désormais la capacité des parkings et leur saturation, pas leur
  prix, sauf là où une source l'établit.
- **les données mesurées et les appréciations éditoriales sont distinguées.** Les températures et
  les jours de pluie sont des moyennes mesurées et sourcées ; l'affluence, l'intérêt d'un lieu
  (les étoiles) et l'effort d'accès sont des jugements assumés.

Sources consultées pour les informations d'accès : la plateforme officielle du Consell Insular de
Menorca (*descobreixmenorca.com*), le service de disponibilité des parkings des calas du sud, et
la presse locale minorquine pour le calendrier 2026 des fermetures.

## Code

Le code de ce projet est réutilisable et adaptable sous **licence MIT** (voir `LICENSE`).
Les données tierces et les médias conservent leurs licences propres, listées ci-dessus.
