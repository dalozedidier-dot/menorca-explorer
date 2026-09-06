/* Minorque Explorer — base de lieux
 * Schéma d'un lieu :
 *   id      identifiant stable (utilisé dans l'URL : #lieu=macarella)
 *   name    nom affiché
 *   cat     plage | nature | village | phare | panorama | patrimoine | saveur
 *   region  découpage éditorial de l'île
 *   lat/lng WGS84
 *   score   1–5 (intérêt éditorial)
 *   icon    emoji du marqueur
 *   top     true = incontournable
 *   face    orientation du rivage (N, NE, E, SE, S, SW, W, NW) — sert au filtre « vent du jour »
 *   effort  facile | marche | rando
 *   crowd   calme | modere | frequente
 *   f       étiquettes fonctionnelles (voir FLAGS dans app.js)
 *   tags    mots-clés éditoriaux, utilisés par la recherche
 *   best    meilleur moment
 *   access  conditions d'accès
 *   desc    description courte
 *   wiki    (optionnel) titre d'article Wikipédia FR/CA pour la photo
 */
window.MENORCA_PLACES = [

  /* ─────────────  SUD-OUEST : les criques de carte postale  ───────────── */
  {id:'macarella',name:'Cala Macarella',cat:'plage',region:'Sud-Ouest',lat:39.93836,lng:3.93703,score:5,icon:'🏝️',top:true,face:'S',effort:'marche',crowd:'frequente',
   f:['snorkeling','ombre','services','navette'],tags:['turquoise','sable blanc','snorkeling','pinède','emblématique'],
   best:'Avant 10 h ou après 17 h',access:'Route fermée aux voitures en haute saison, à des dates fixées chaque année : navette depuis Ciutadella, ou marche depuis Cala Galdana (≈ 1 h)',
   desc:'La carte postale de Minorque : une crique claire encaissée entre falaises calcaires et pinède, dont l’eau passe du vert d’eau au bleu profond en quelques mètres.',wiki:'Cala Macarella'},

  {id:'macarelleta',name:'Cala Macarelleta',cat:'plage',region:'Sud-Ouest',lat:39.93616,lng:3.93484,score:5,icon:'🐚',top:true,face:'SE',effort:'marche',crowd:'frequente',
   f:['snorkeling','naturisme'],tags:['turquoise','sauvage','à pied','naturisme','intime'],
   best:'Tôt le matin',access:'10 min de sentier depuis Macarella, descente par des marches taillées',
   desc:'La petite sœur de Macarella : une entaille turquoise minuscule, spectaculaire par sa transparence et son cirque rocheux.'},

  {id:'turqueta',name:'Cala en Turqueta',cat:'plage',region:'Sud-Ouest',lat:39.93254,lng:3.91498,score:5,icon:'💎',top:true,face:'S',effort:'marche',crowd:'frequente',
   f:['famille','snorkeling','ombre','navette'],tags:['turquoise','famille','sable blanc','pinède'],
   best:'Avant 10 h ou fin d’après-midi',access:'Parking à capacité limitée, fermé une fois plein (état consultable en temps réel) ; navette estivale depuis Ciutadella',
   desc:'Deux langues de sable blanc séparées par une pointe rocheuse, encadrées de pins : l’une des criques les plus photographiées du sud.',wiki:'Cala en Turqueta'},

  {id:'son-saura',name:'Plage de Son Saura',cat:'plage',region:'Sud-Ouest',lat:39.92716,lng:3.89435,score:5,icon:'🌴',top:true,face:'S',effort:'marche',crowd:'modere',
   f:['famille','ombre','navette'],tags:['sauvage','sable blanc','pinède','famille','grande plage'],
   best:'Matin',access:'Parking gratuit mais à capacité limitée ; 10 min de marche à travers la pinède',
   desc:'Un long ruban clair bordé de pins et d’une zone humide, plus ouvert et plus respirable que les petites criques voisines.'},

  {id:'talaier',name:'Cala des Talaier',cat:'plage',region:'Sud-Ouest',lat:39.92689,lng:3.90268,score:4,icon:'⛵',face:'S',effort:'marche',crowd:'modere',
   f:['famille','snorkeling'],tags:['petite crique','tour de guet','sable clair'],
   best:'Matin',access:'15 min à pied depuis Son Saura par le Camí de Cavalls',
   desc:'Crique ronde et peu profonde, dominée par une tour de guet, idéale comme étape entre Son Saura et Turqueta.'},

  {id:'cala-en-bosc',name:'Cala en Bosc & Son Xoriguer',cat:'plage',region:'Sud-Ouest',lat:39.92687,lng:3.83411,score:3,icon:'🛥️',face:'S',effort:'facile',crowd:'frequente',
   f:['famille','services','parking'],tags:['station balnéaire','marina','sports nautiques','famille'],
   best:'Hors saison',access:'Très facile, parking et services',
   desc:'Le pôle balnéaire du sud-ouest : marina, bases nautiques et deux plages aménagées — pratique en famille, loin de l’ambiance sauvage.'},

  {id:'cala-blanca',name:'Cala Blanca',cat:'plage',region:'Ouest',lat:39.94051,lng:3.82584,score:3,icon:'🤍',face:'SW',effort:'facile',crowd:'modere',
   f:['famille','services','parking','coucher'],tags:['sable blanc','falaises basses','famille'],
   best:'Fin de journée',access:'Facile depuis la route de Cap d’Artrutx',
   desc:'Petite baie sableuse coincée entre deux falaises basses, agréable en fin de journée quand la lumière passe à l’ouest.'},

  /* ─────────────  SUD : ravins, longues plages et criques à pied  ───────────── */
  {id:'mitjana',name:'Cala Mitjana & Mitjaneta',cat:'plage',region:'Sud',lat:39.93447,lng:3.97275,score:5,icon:'🌊',top:true,face:'S',effort:'marche',crowd:'frequente',
   f:['snorkeling','ombre','saut'],tags:['turquoise','falaises','à pied','sauvage'],
   best:'Matin',access:'25 min de marche depuis Cala Galdana',
   desc:'Large crique claire fermée par des falaises et de la forêt, doublée d’une minuscule Mitjaneta à quelques minutes de sentier.'},

  {id:'galdana',name:'Cala Galdana',cat:'plage',region:'Sud',lat:39.93981,lng:3.96169,score:4,icon:'⛱️',face:'S',effort:'facile',crowd:'frequente',
   f:['famille','services','parking','ombre'],tags:['famille','services','départ randonnée','baie abritée'],
   best:'Matin',access:'Route directe, parkings et hôtels',
   desc:'Grande baie en fer à cheval, la plus équipée du sud : excellent camp de base pour rejoindre Macarella ou Mitjana à pied.'},

  {id:'trebaluger',name:'Cala Trebalúger',cat:'plage',region:'Sud',lat:39.93108,lng:3.98975,score:5,icon:'🥾',face:'S',effort:'rando',crowd:'calme',
   f:['snorkeling'],tags:['sauvage','à pied','isolée','ravin','rivière'],
   best:'Journée entière',access:'1 h à 1 h 30 de marche, ou par la mer',
   desc:'Crique isolée au débouché d’un ravin verdoyant, où un filet d’eau douce rejoint parfois la mer. Aucun service : tout se porte.'},

  {id:'fustam',name:'Cala Fustam',cat:'plage',region:'Sud',lat:39.92591,lng:4.00039,score:4,icon:'🌵',face:'S',effort:'rando',crowd:'calme',
   f:[],tags:['sauvage','galets et sable','isolée'],
   best:'Matin',access:'Marche depuis Sant Tomàs ou Cala Mitjana',
   desc:'Petite crique sauvage entre Trebalúger et Escorxada, souvent déserte car elle ne se mérite qu’à pied.'},

  {id:'escorxada',name:'Cala Escorxada',cat:'plage',region:'Sud',lat:39.92534,lng:4.00432,score:5,icon:'🏜️',face:'S',effort:'rando',crowd:'calme',
   f:['naturisme'],tags:['très sauvage','sable clair','isolée','ravin'],
   best:'Journée calme',access:'Environ 1 h de marche depuis Sant Tomàs',
   desc:'Sans doute la plus belle des criques « sans route » du centre-sud : sable clair, falaises ocre et sensation d’être seul au monde.'},

  {id:'binigaus',name:'Plage de Binigaus',cat:'plage',region:'Sud',lat:39.91906,lng:4.02839,score:5,icon:'🌾',top:true,face:'S',effort:'marche',crowd:'modere',
   f:['naturisme'],tags:['sauvage','longue plage','naturisme','ravin','dunes'],
   best:'Fin de matinée',access:'20 min à pied depuis Sant Tomàs',
   desc:'Grande plage naturelle adossée au ravin de Binigaus, avec une sensation d’espace rare sur la côte sud.'},

  {id:'sant-tomas',name:'Plage de Sant Tomàs',cat:'plage',region:'Sud',lat:39.91236,lng:4.04378,score:3,icon:'🏖️',face:'S',effort:'facile',crowd:'modere',
   f:['famille','services','parking'],tags:['famille','services','longue plage'],
   best:'Matin',access:'Très facile',
   desc:'Plage aménagée qui prolonge Binigaus : le compromis pratique entre confort et accès rapide aux criques sauvages voisines.'},

  {id:'son-bou',name:'Plage de Son Bou',cat:'plage',region:'Sud',lat:39.90187,lng:4.06696,score:4,icon:'🌅',face:'S',effort:'facile',crowd:'frequente',
   f:['famille','services','parking','coucher'],tags:['famille','services','longue plage','coucher de soleil','zone humide'],
   best:'Fin de journée',access:'Très facile',
   desc:'La plus longue plage de l’île, adossée à une zone humide protégée — une tout autre échelle que les criques encaissées du sud.'},

  {id:'atalis',name:'Plages de Sant Jaume et Atalis',cat:'plage',region:'Sud',lat:39.89623,lng:4.07821,score:3,icon:'🐚',face:'S',effort:'facile',crowd:'modere',
   f:['famille','services','parking'],tags:['famille','prolongement de Son Bou'],
   best:'Matin',access:'Facile',
   desc:'L’extrémité est de la grande baie de Son Bou, plus calme et plus facile à garer que le cœur de la station.'},

  {id:'cala-en-porter',name:'Cala en Porter',cat:'plage',region:'Sud-Est',lat:39.86898,lng:4.13301,score:4,icon:'🏞️',face:'S',effort:'facile',crowd:'frequente',
   f:['famille','services','parking'],tags:['famille','ravin','falaises','services'],
   best:'Matin',access:'Facile — escaliers depuis le haut du village',
   desc:'Plage au fond d’un profond ravin, encadrée de hautes falaises percées de grottes : un site spectaculaire malgré l’urbanisation.'},

  /* ─────────────  SUD-EST : petites criques et villages blancs  ───────────── */
  {id:'canutells',name:'Es Canutells',cat:'plage',region:'Sud-Est',lat:39.84347,lng:4.17417,score:3,icon:'⚓',face:'S',effort:'facile',crowd:'modere',
   f:['famille','parking'],tags:['crique','abris de barques','calme'],
   best:'Matin',access:'Facile',
   desc:'Petite crique de sable au fond d’une entaille rocheuse, bordée de garages à bateaux traditionnels.'},

  {id:'binidali',name:'Cala Binidalí',cat:'plage',region:'Sud-Est',lat:39.8375,lng:4.18723,score:4,icon:'🪨',face:'S',effort:'marche',crowd:'calme',
   f:['snorkeling'],tags:['minuscule','falaises','eau claire','photogénique'],
   best:'Matin',access:'Escalier depuis le petit lotissement',
   desc:'Crique miniature au pied de falaises verticales, l’une des plus jolies du sud-est pour un bain rapide et du snorkeling.'},

  {id:'biniparratx',name:'Cala Biniparratx',cat:'plage',region:'Sud-Est',lat:39.83353,lng:4.20298,score:4,icon:'🕳️',face:'S',effort:'marche',crowd:'calme',
   f:['snorkeling'],tags:['fjord','grottes','préhistoire','eau turquoise'],
   best:'Matin',access:'10 min à pied par le fond du ravin',
   desc:'Un mini-fjord au fond d’un ravin, avec des grottes préhistoriques dans les parois et une eau extraordinairement claire.'},

  {id:'binisafuller',name:'Cala Binissafúller',cat:'plage',region:'Sud-Est',lat:39.82521,lng:4.20973,score:3,icon:'🐟',face:'S',effort:'facile',crowd:'modere',
   f:['famille','snorkeling'],tags:['crique','barques','calme','famille'],
   best:'Matin',access:'Facile',
   desc:'Crique tranquille entourée de villas basses, réputée pour ses fonds et ses abris à barques.'},

  {id:'binibeca-beach',name:'Cala Binibèquer',cat:'plage',region:'Sud-Est',lat:39.82161,lng:4.23035,score:4,icon:'🐠',face:'S',effort:'facile',crowd:'frequente',
   f:['famille','services','snorkeling'],tags:['famille','sable fin','snorkeling'],
   best:'Matin',access:'Facile',
   desc:'Petite plage claire à deux pas du célèbre village blanc de Binibèquer Vell, très appréciée des familles.'},

  {id:'cala-torret',name:'Cala Torret',cat:'plage',region:'Sud-Est',lat:39.81683,lng:4.24587,score:3,icon:'🩵',face:'S',effort:'facile',crowd:'calme',
   f:['snorkeling'],tags:['rochers','baignade','ambiance village'],
   best:'Fin d’après-midi',access:'Facile',
   desc:'Pas de sable ici mais des plateformes rocheuses et une eau limpide, dans un lotissement blanc très paisible.'},

  {id:'punta-prima',name:'Punta Prima',cat:'plage',region:'Sud-Est',lat:39.81503,lng:4.28747,score:4,icon:'🌤️',face:'SE',effort:'facile',crowd:'frequente',
   f:['famille','services','parking','lever'],tags:['famille','vue îlot','lever de soleil','services'],
   best:'Lever du soleil',access:'Très facile',
   desc:'Plage ouverte face à l’Illa de l’Aire et à son phare : le meilleur endroit de l’île pour un lever de soleil sans marcher.'},

  {id:'alcalfar',name:'Cala d’Alcalfar',cat:'plage',region:'Sud-Est',lat:39.82556,lng:4.29412,score:4,icon:'🏘️',face:'SE',effort:'facile',crowd:'calme',
   f:['famille','snorkeling','lever'],tags:['village de pêcheurs','crique','authentique'],
   best:'Matin',access:'Facile',
   desc:'Une des criques les plus attachantes du sud-est : maisons blanches, barques et petite plage au fond d’une anse étroite.'},

  {id:'s-algar',name:'S’Algar',cat:'plage',region:'Sud-Est',lat:39.82901,lng:4.29274,score:3,icon:'🤿',face:'E',effort:'facile',crowd:'modere',
   f:['snorkeling','services','lever'],tags:['plongée','plateformes rocheuses','calme'],
   best:'Matin',access:'Facile',
   desc:'Station tranquille sans plage de sable, réputée comme base de plongée et de snorkeling sur la côte est.'},

  {id:'rafalet',name:'Cala Rafalet',cat:'plage',region:'Sud-Est',lat:39.84095,lng:4.29815,score:4,icon:'🌲',face:'E',effort:'marche',crowd:'calme',
   f:['ombre'],tags:['ravin boisé','galets','sauvage','ombre'],
   best:'Milieu de journée',access:'15 min de marche dans un ravin depuis S’Algar',
   desc:'Une entaille étroite et boisée qui débouche sur quelques mètres de galets : la plus « fraîche » des criques du sud-est.'},

  /* ─────────────  EST : Maó, son port et la côte de Favàritx  ───────────── */
  {id:'mao',name:'Maó / Mahón',cat:'village',region:'Est',lat:39.88949,lng:4.26621,score:5,icon:'⚓',top:true,face:'N',effort:'facile',crowd:'frequente',
   f:['famille','services','parking','pluie'],tags:['capitale','port naturel','architecture','histoire britannique','marchés'],
   best:'Matin pour le marché, soirée pour le port',access:'Facile — parkings en périphérie du centre',
   desc:'La capitale, posée en balcon au-dessus d’un des plus grands ports naturels d’Europe, avec un centre marqué par un siècle de présence britannique.',wiki:'Mahón'},

  {id:'port-mao',name:'Port de Maó',cat:'panorama',region:'Est',lat:39.89330,lng:4.28270,score:5,icon:'🚢',top:true,face:'N',effort:'facile',crowd:'modere',
   f:['services','coucher','pluie'],tags:['port naturel','croisière','5 km de rade','îlots'],
   best:'Fin de journée',access:'Promenades des deux rives ; excursions en bateau depuis Maó et Es Castell',
   desc:'Une longue rade abritée, jalonnée de forts, d’îlots et d’anciens hôpitaux militaires : le tour en bateau reste la meilleure façon de la lire.'},

  {id:'illa-del-rei',name:'Illa del Rei',cat:'patrimoine',region:'Est',lat:39.8878,lng:4.2853,score:4,icon:'🏝',face:'N',effort:'facile',crowd:'calme',
   f:['pluie','services'],tags:['île','hôpital militaire','art contemporain','basilique paléochrétienne'],
   best:'Matin',access:'Navette bateau depuis Maó — horaires saisonniers',
   desc:'Îlot au milieu du port : ancien hôpital naval britannique restauré, mosaïque paléochrétienne et galerie d’art contemporain.'},

  {id:'la-mola',name:'Forteresse de La Mola',cat:'patrimoine',region:'Est',lat:39.87594,lng:4.30822,score:5,icon:'🏰',top:true,face:'E',effort:'marche',crowd:'modere',
   f:['pluie','parking','panorama'],tags:['forteresse','XIXe siècle','histoire militaire','panorama'],
   best:'Matin',access:'Billet d’entrée ; compter 2 h à pied sur le site',
   desc:'Immense forteresse du XIXᵉ siècle à l’entrée du port : galeries, remparts, batteries et vues plongeantes sur la rade.'},

  {id:'fort-marlborough',name:'Fort Marlborough & Cala Sant Esteve',cat:'patrimoine',region:'Est',lat:39.87220,lng:4.29370,score:4,icon:'🛡️',face:'E',effort:'facile',crowd:'calme',
   f:['pluie','famille'],tags:['fort britannique','galeries souterraines','crique étroite'],
   best:'Milieu de journée',access:'Billet d’entrée ; visite en partie souterraine',
   desc:'Fort britannique creusé dans la roche au bord d’une crique en couloir, face aux ruines du château de Sant Felip.'},

  {id:'es-castell',name:'Es Castell & Cales Fonts',cat:'village',region:'Est',lat:39.87986,lng:4.29046,score:4,icon:'🌇',face:'N',effort:'facile',crowd:'frequente',
   f:['services','famille','coucher'],tags:['port','héritage britannique','restaurants','soirée'],
   best:'Fin de journée',access:'Facile',
   desc:'Ancienne ville de garnison britannique dont le petit port de Cales Fonts, creusé de caves devenues terrasses, s’anime au crépuscule.'},

  {id:'sa-mesquida',name:'Sa Mesquida',cat:'plage',region:'Est',lat:39.90871,lng:4.29389,score:4,icon:'🗼',face:'NE',effort:'facile',crowd:'modere',
   f:['famille','services','parking'],tags:['tour de défense','village de pêcheurs','vagues'],
   best:'Matin',access:'Facile depuis Maó (10 min)',
   desc:'Plage dominée par une tour de défense, avec un hameau de pêcheurs et une belle exposition aux ambiances du nord-est.'},

  {id:'es-grau',name:'Es Grau',cat:'village',region:'Est',lat:39.95000,lng:4.26700,score:4,icon:'🛶',face:'E',effort:'facile',crowd:'modere',
   f:['famille','services','parking'],tags:['pêcheurs','maisons blanches','kayak','parc naturel'],
   best:'Matin',access:'Facile',
   desc:'Village de pêcheurs au seuil du parc naturel, base idéale pour associer plage, lagune et sortie en kayak vers l’Illa d’en Colom.'},

  {id:'es-grau-beach',name:'Plage d’Es Grau',cat:'plage',region:'Est',lat:39.95272,lng:4.26456,score:4,icon:'🦆',face:'E',effort:'facile',crowd:'modere',
   f:['famille','services','parking','ombre'],tags:['famille','eau peu profonde','dunes','lagune'],
   best:'Matin',access:'Facile',
   desc:'Plage peu profonde et abritée, adossée aux dunes qui séparent la mer de la grande lagune de s’Albufera : parfaite avec des enfants.'},

  {id:'illa-den-colom',name:'Illa d’en Colom',cat:'nature',region:'Est',lat:39.9601,lng:4.2929,score:4,icon:'🏝',face:'W',effort:'facile',crowd:'calme',
   f:['snorkeling'],tags:['île','kayak','deux plages','réserve'],
   best:'Matin',access:'Kayak ou bateau-taxi depuis Es Grau',
   desc:'La plus grande île satellite de Minorque, avec deux petites plages et des fonds clairs, dans la réserve de s’Albufera.'},

  {id:'albufera',name:'Parc Natural de s’Albufera des Grau',cat:'nature',region:'Est',lat:39.94745,lng:4.25572,score:5,icon:'🦩',top:true,face:'E',effort:'marche',crowd:'calme',
   f:['famille','oiseaux','ombre'],tags:['zone humide','oiseaux','sentiers','réserve de biosphère'],
   best:'Matin ou fin de journée',access:'Centre d’accueil de Rodríguez Femenias ; sentiers balisés et observatoires',
   desc:'Le cœur écologique de la réserve de biosphère : lagune saumâtre, bois d’oliviers sauvages, dunes et observatoires à oiseaux.'},

  {id:'sa-torreta',name:'Plage de Sa Torreta',cat:'plage',region:'Nord-Est',lat:39.97696,lng:4.25994,score:4,icon:'🌾',face:'NE',effort:'rando',crowd:'calme',
   f:[],tags:['sauvage','parc naturel','à pied','talayotique à proximité'],
   best:'Matin',access:'1 h de marche depuis Es Grau par le Camí de Cavalls',
   desc:'Plage sauvage du parc naturel, sans aucun aménagement, souvent déserte même en août.'},

  {id:'presili-tortuga',name:'Cala Presili & Cala Tortuga',cat:'plage',region:'Nord-Est',lat:39.98884,lng:4.25503,score:5,icon:'🌑',top:true,face:'NE',effort:'marche',crowd:'modere',
   f:['naturisme'],tags:['sauvage','schiste noir','à pied','Favàritx','dunes'],
   best:'Matin',access:'15 à 25 min de marche depuis Favàritx, dont la route est fermée aux voitures en haute saison ; secteur protégé',
   desc:'Deux plages claires cernées de schiste sombre : le contraste le plus saisissant de l’île entre roche noire et eau turquoise.'},

  {id:'favaritx',name:'Phare de Favàritx',cat:'phare',region:'Nord-Est',lat:39.99626,lng:4.26504,score:5,icon:'🗼',top:true,face:'NE',effort:'facile',crowd:'frequente',
   f:['parking','coucher','lever'],tags:['phare','schiste noir','photo','paysage lunaire'],
   best:'Lever du soleil, ou par ciel couvert',access:'Route fermée aux voitures privées en haute saison, à des dates fixées chaque année : bus depuis Maó, ou vélo',
   desc:'Le phare le plus graphique de Minorque, planté dans un chaos de schiste noir qui ne ressemble à rien d’autre sur l’île.',wiki:'Phare de Favàritx'},

  /* ─────────────  NORD-EST : baies familiales et dunes  ───────────── */
  {id:'arenal-castell',name:'Arenal d’en Castell',cat:'plage',region:'Nord-Est',lat:40.02176,lng:4.18192,score:4,icon:'🌙',face:'N',effort:'facile',crowd:'frequente',
   f:['famille','services','parking'],tags:['baie en croissant','famille','services'],
   best:'Matin',access:'Très facile',
   desc:'Baie presque circulaire au sable doux et à l’eau calme : la plage « facile » du nord, très prisée des familles.'},

  {id:'son-parc',name:'Son Saura del Nord (Son Parc)',cat:'plage',region:'Nord-Est',lat:40.03354,lng:4.16175,score:4,icon:'🌲',face:'N',effort:'facile',crowd:'modere',
   f:['famille','services','parking','ombre'],tags:['dunes','pinède','famille','golf'],
   best:'Matin',access:'Facile',
   desc:'Longue plage ouverte bordée d’un cordon dunaire et d’une pinède, alternative accessible aux criques sauvages du nord.'},

  {id:'pudent',name:'Cala Pudent & Cala Rotja',cat:'plage',region:'Nord-Est',lat:40.04344,lng:4.15912,score:4,icon:'🥾',face:'N',effort:'marche',crowd:'calme',
   f:[],tags:['sauvage','à pied','sable roux'],
   best:'Fin de matinée',access:'25 min de marche depuis Son Parc',
   desc:'Deux criques sauvages accessibles à pied depuis Son Parc, avec le sable rougeâtre caractéristique du nord.'},

  {id:'addaia',name:'Port d’Addaia & Na Macaret',cat:'village',region:'Nord-Est',lat:40.01310,lng:4.19970,score:3,icon:'⛵',face:'E',effort:'facile',crowd:'calme',
   f:['services','famille'],tags:['ria','marina','village blanc','calme'],
   best:'Fin de journée',access:'Facile',
   desc:'Une ria étroite transformée en petit port de plaisance, prolongée par le hameau très photogénique de Na Macaret.'},

  /* ─────────────  NORD : le pays de la tramontane  ───────────── */
  {id:'fornells',name:'Fornells',cat:'village',region:'Nord',lat:40.05476,lng:4.12972,score:5,icon:'🦞',top:true,face:'W',effort:'facile',crowd:'frequente',
   f:['services','famille','coucher'],tags:['village de pêcheurs','baie','caldereta','kayak','planche à voile'],
   best:'Fin de journée',access:'Facile',
   desc:'Village blanc tourné vers une longue baie fermée : capitale de la caldereta de langouste et terrain de jeu des sports de vent.',wiki:'Fornells'},

  {id:'torre-fornells',name:'Tour de Fornells',cat:'patrimoine',region:'Nord',lat:40.06143,lng:4.13055,score:4,icon:'🛡️',face:'N',effort:'marche',crowd:'modere',
   f:['panorama','coucher'],tags:['tour britannique','panorama','baie'],
   best:'Fin d’après-midi',access:'10 min de montée depuis Fornells',
   desc:'Grosse tour de défense britannique dominant l’entrée de la baie : le meilleur point de vue sur Fornells et la côte nord.'},

  {id:'ses-salines',name:'Salines de Fornells',cat:'nature',region:'Nord',lat:40.03920,lng:4.12680,score:3,icon:'🧂',face:'N',effort:'facile',crowd:'calme',
   f:['oiseaux'],tags:['salines','oiseaux','zone humide','vélo'],
   best:'Matin ou fin de journée',access:'Sentier plat depuis la route de Fornells',
   desc:'Anciens marais salants au fond de la baie, aujourd’hui refuge d’échassiers — un arrêt court mais très reposant.'},

  {id:'cala-tirant',name:'Cala Tirant',cat:'plage',region:'Nord',lat:40.04476,lng:4.10263,score:4,icon:'🏄',face:'N',effort:'facile',crowd:'modere',
   f:['famille','parking','oiseaux'],tags:['dunes','zone humide','vagues','famille'],
   best:'Matin',access:'Facile',
   desc:'Large baie sableuse doublée d’une zone humide, exposée à la houle du nord : un spot apprécié des surfeurs débutants.'},

  {id:'binimella',name:'Binimel·là',cat:'plage',region:'Nord',lat:40.05192,lng:4.05364,score:4,icon:'🧭',face:'N',effort:'facile',crowd:'modere',
   f:['parking','famille'],tags:['sable roux','départ Pregonda','nature'],
   best:'Matin',access:'Piste puis parking à capacité limitée',
   desc:'Plage naturelle au sable roux et point de départ classique de la marche vers Cala Pregonda.'},

  {id:'pregonda',name:'Cala Pregonda',cat:'plage',region:'Nord',lat:40.05691,lng:4.04055,score:5,icon:'🪐',top:true,face:'N',effort:'marche',crowd:'modere',
   f:['snorkeling'],tags:['sable ocre','îlots','paysage unique','à pied'],
   best:'Matin ou fin d’après-midi',access:'25 à 30 min de marche depuis Binimel·là — aucun service sur place',
   desc:'Un décor presque martien : sable ocre, roches rouges érodées et îlots dressés dans une eau vert clair. Le paysage le plus singulier de l’île.',wiki:'Cala Pregonda'},

  {id:'cala-mica',name:'Cala Mica & Cala Barril',cat:'plage',region:'Nord',lat:40.06263,lng:4.0294,score:4,icon:'🧡',face:'N',effort:'rando',crowd:'calme',
   f:[],tags:['sauvage','sable rouge','isolée','à pied'],
   best:'Matin',access:'Marche au-delà de Pregonda',
   desc:'Deux criques rouges très sauvages qui prolongent Pregonda vers l’ouest, presque toujours désertes.'},

  {id:'cavalleria-beach',name:'Plage de Cavalleria',cat:'plage',region:'Nord',lat:40.05974,lng:4.07680,score:5,icon:'🌬️',top:true,face:'N',effort:'marche',crowd:'modere',
   f:['parking','naturisme'],tags:['sauvage','sable sombre','tramontane','falaises rouges'],
   best:'Fin de journée',access:'Parking à capacité limitée, puis 10 min de descente',
   desc:'Grande plage encadrée de falaises rouges, ouverte plein nord : superbe par temps calme, spectaculaire quand la tramontane se lève.'},

  {id:'cavalleria-lighthouse',name:'Phare de Cavalleria',cat:'phare',region:'Nord',lat:40.08964,lng:4.09253,score:5,icon:'🌄',top:true,face:'N',effort:'facile',crowd:'frequente',
   f:['parking','coucher','panorama'],tags:['phare','falaises','coucher de soleil','point le plus au nord'],
   best:'Coucher du soleil',access:'Route jusqu’au parking, puis 5 min à pied',
   desc:'Le point le plus septentrional de l’île : un phare posé sur 90 m de falaises, battu par le vent, face à un horizon vide.'},

  {id:'sanitja',name:'Port de Sanitja & Écomusée du Cap',cat:'patrimoine',region:'Nord',lat:40.0816,lng:4.091,score:4,icon:'🏺',face:'W',effort:'marche',crowd:'calme',
   f:['pluie'],tags:['port romain','archéologie','écomusée','tour de guet'],
   best:'Matin',access:'Sur la route du phare de Cavalleria',
   desc:'Une crique-abri occupée depuis l’Antiquité : vestiges d’un camp romain, tour de défense et petit écomusée qui raconte le cap.'},

  {id:'lluriac',name:'Zones humides de Lluriac',cat:'nature',region:'Nord',lat:40.03390,lng:4.07830,score:3,icon:'🦉',face:'N',effort:'facile',crowd:'calme',
   f:['oiseaux'],tags:['zone humide','oiseaux migrateurs','prairies inondables'],
   best:'Fin d’hiver et printemps',access:'Depuis la route de Binimel·là — observation depuis les chemins',
   desc:'Prairies inondables du nord, l’un des meilleurs sites d’observation d’oiseaux migrateurs de Minorque au printemps.'},

  /* ─────────────  NORD-OUEST : la côte la plus sauvage  ───────────── */
  {id:'ferragut',name:'Plage de Ferragut',cat:'plage',region:'Nord-Ouest',lat:40.05489,lng:3.98746,score:4,icon:'🪨',face:'N',effort:'rando',crowd:'calme',
   f:[],tags:['très sauvage','galets','isolée'],
   best:'Journée entière',access:'Longue marche depuis Ets Alocs ou Cala Pilar',
   desc:'Une plage de galets et de sable roux au pied d’une côte quasiment inhabitée : l’un des rivages les plus solitaires de l’île.'},

  {id:'cala-pilar',name:'Cala Pilar & Alfurí',cat:'plage',region:'Nord-Ouest',lat:40.05113,lng:3.97782,score:5,icon:'🥾',top:true,face:'N',effort:'rando',crowd:'calme',
   f:['naturisme'],tags:['très sauvage','sable rouge','randonnée','forêt de chênes'],
   best:'Journée entière',access:'45 min de marche à travers bois et dunes — eau et chaussures indispensables',
   desc:'Après une traversée de chênes verts et de dunes, une plage rouge sombre encadrée de falaises : la sauvagerie du nord à son sommet.'},

  {id:'alocs',name:'Ets Alocs',cat:'plage',region:'Nord-Ouest',lat:40.05811,lng:3.99997,score:3,icon:'🌊',face:'N',effort:'marche',crowd:'calme',
   f:[],tags:['galets','étape du Camí','isolée'],
   best:'Matin',access:'Piste puis marche ; étape 6/7 du Camí de Cavalls',
   desc:'Une crique de galets sans aucun aménagement, surtout connue comme charnière entre deux étapes du Camí de Cavalls.'},

  {id:'santa-agueda',name:'Château de Santa Àgueda',cat:'panorama',region:'Nord-Ouest',lat:40.01280,lng:3.99920,score:4,icon:'🗻',face:'N',effort:'rando',crowd:'calme',
   f:['panorama'],tags:['château','chemin romain','panorama','troisième sommet'],
   best:'Matin, par temps clair',access:'45 min de montée sur un chemin pavé d’origine romaine',
   desc:'Les ruines d’une forteresse musulmane au sommet du troisième relief de l’île, atteintes par un chemin pavé spectaculaire.'},

  {id:'algaiarens',name:'Cala Algaiarens (La Vall)',cat:'plage',region:'Nord-Ouest',lat:40.04543,lng:3.92084,score:5,icon:'🌾',top:true,face:'N',effort:'marche',crowd:'modere',
   f:['parking','ombre','famille'],tags:['deux plages','dunes','espace naturel protégé','pinède'],
   best:'Matin',access:'Deux parkings au bout de la route, à capacité limitée ; ligne de bus estivale depuis Ciutadella',
   desc:'Deux plages jumelles au sable presque orange, au débouché d’une vallée boisée classée zone naturelle d’intérêt spécial. La route s’arrête aux parkings, et la fréquentation reste modérée par leur capacité.'},

  {id:'cala-morell',name:'Cala Morell',cat:'plage',region:'Nord-Ouest',lat:40.05328,lng:3.8826,score:4,icon:'🤿',face:'N',effort:'facile',crowd:'modere',
   f:['snorkeling','parking'],tags:['falaises','snorkeling','maisons blanches'],
   best:'Fin d’après-midi',access:'Facile — escaliers depuis le lotissement',
   desc:'Crique rocheuse encaissée à l’eau très claire, doublée d’un intérêt archéologique majeur juste au-dessus.'},

  {id:'cala-morell-necropolis',name:'Nécropole de Cala Morell',cat:'patrimoine',region:'Nord-Ouest',lat:40.05076,lng:3.88176,score:5,icon:'🕳️',face:'N',effort:'facile',crowd:'calme',
   f:['famille'],tags:['nécropole','grottes','préhistoire','gratuit'],
   best:'Fin d’après-midi',access:'Accès libre, court sentier',
   desc:'Une quinzaine de grottes funéraires taillées dans la falaise entre 1600 et 100 av. J.-C., certaines avec colonnes et façades sculptées.'},

  /* ─────────────  OUEST : Ciutadella et ses caps  ───────────── */
  {id:'ciutadella',name:'Ciutadella de Menorca',cat:'village',region:'Ouest',lat:40.00110,lng:3.83900,score:5,icon:'🏛️',top:true,face:'W',effort:'facile',crowd:'frequente',
   f:['services','famille','pluie','coucher'],tags:['vieille ville','cathédrale','port encaissé','palais','Sant Joan'],
   best:'Fin d’après-midi et soirée',access:'Facile — stationner hors des remparts',
   desc:'L’ancienne capitale : ruelles ombragées, palais aristocratiques, cathédrale gothique et un port encaissé qui s’allume à la nuit tombée.',wiki:'Ciutadella'},

  {id:'sa-farola',name:'Phare de Sa Farola et château de Sant Nicolau',cat:'phare',region:'Ouest',lat:39.99873,lng:3.82578,score:4,icon:'🌇',face:'W',effort:'facile',crowd:'modere',
   f:['coucher','panorama'],tags:['phare','tour de guet','coucher de soleil','promenade'],
   best:'Coucher du soleil',access:'Promenade à pied depuis le port de Ciutadella',
   desc:'À l’entrée du port de Ciutadella, une tour de guet du XVIIᵉ et un petit phare blanc : le rendez-vous du coucher de soleil des locaux.'},

  {id:'pont-den-gil',name:'Pont d’en Gil',cat:'panorama',region:'Ouest',lat:40.00890,lng:3.79750,score:5,icon:'🪨',top:true,face:'W',effort:'marche',crowd:'modere',
   f:['coucher','panorama'],tags:['arche naturelle','falaises','coucher de soleil','photo'],
   best:'Coucher du soleil',access:'10 min de marche depuis Cala en Blanes',
   desc:'Une grande arche rocheuse détachée de la falaise, sculptée par la mer : le spot de coucher de soleil le plus photogénique de l’ouest.'},

  {id:'cala-en-blanes',name:'Cala en Blanes & Cales Piques',cat:'plage',region:'Ouest',lat:40.00075,lng:3.80709,score:3,icon:'⛱️',face:'W',effort:'facile',crowd:'frequente',
   f:['famille','services','parking'],tags:['petite plage','famille','falaises','coucher de soleil'],
   best:'Fin de journée',access:'Très facile',
   desc:'Minuscule plage de sable au fond d’un ravin urbanisé, prolongée par les plateformes rocheuses de Cales Piques.'},

  {id:'cala-en-brut',name:'Cala en Brut',cat:'plage',region:'Ouest',lat:39.99945,lng:3.8123,score:3,icon:'🪜',face:'W',effort:'facile',crowd:'modere',
   f:['snorkeling','saut'],tags:['plateformes','échelles','saut','sans sable'],
   best:'Milieu de journée',access:'Facile',
   desc:'Pas de sable : des terrasses de roche taillées en gradins avec échelles pour plonger directement dans une eau très claire.'},

  {id:'artrutx',name:'Phare d’Artrutx',cat:'phare',region:'Sud-Ouest',lat:39.92369,lng:3.82645,score:4,icon:'🌅',face:'SW',effort:'facile',crowd:'modere',
   f:['coucher','parking'],tags:['phare rayé','coucher de soleil','Majorque à l’horizon'],
   best:'Coucher du soleil',access:'Facile — parking au pied du phare',
   desc:'Phare noir et blanc à la pointe sud-ouest, d’où l’on devine Majorque par temps clair : le soleil y tombe droit dans la mer.'},

  {id:'punta-nati',name:'Phare de Punta Nati',cat:'phare',region:'Nord-Ouest',lat:40.05071,lng:3.82341,score:5,icon:'🌇',top:true,face:'NW',effort:'facile',crowd:'modere',
   f:['coucher','parking','panorama'],tags:['phare','pierre sèche','paysage lunaire','ponts de berger'],
   best:'Coucher du soleil',access:'Petite route depuis Ciutadella, puis courte marche ; route fermée aux voitures en plein été, navette depuis Ciutadella',
   desc:'Un plateau nu quadrillé de murs de pierre sèche et de « barraques » de berger, qui s’achève brutalement sur la mer. Vent garanti.'},

  /* ─────────────  CENTRE : villages, reliefs et ravins  ───────────── */
  {id:'el-toro',name:'Monte Toro (El Toro)',cat:'panorama',region:'Centre',lat:39.98508,lng:4.11309,score:5,icon:'⛰️',top:true,face:'N',effort:'facile',crowd:'frequente',
   f:['panorama','parking','pluie','famille'],tags:['panorama 360°','point culminant','sanctuaire','358 m'],
   best:'Jour clair, tôt le matin',access:'Route sinueuse jusqu’au sommet ; parking',
   desc:'À 358 m, le seul endroit d’où l’île se lit d’un seul regard, du cap de Cavalleria à la baie de Maó. Un sanctuaire du XVIIᵉ occupe le sommet.',wiki:'Monte Toro'},

  {id:'mercadal',name:'Es Mercadal',cat:'village',region:'Centre',lat:39.98813,lng:4.09260,score:4,icon:'🥐',face:'N',effort:'facile',crowd:'modere',
   f:['services','pluie'],tags:['centre de l’île','gastronomie','pâtisserie','base nord'],
   best:'Midi',access:'Facile',
   desc:'Village blanc au pied du Monte Toro, carrefour de l’île et bonne adresse pour la cuisine minorquine traditionnelle.'},

  {id:'alaior',name:'Alaior',cat:'village',region:'Centre-Est',lat:39.93371,lng:4.13977,score:3,icon:'🏘️',face:'S',effort:'facile',crowd:'calme',
   f:['services','pluie'],tags:['village blanc','fromage','centre historique','artisanat'],
   best:'Fin de matinée',access:'Facile',
   desc:'Village étagé sur une colline, capitale du fromage Mahón-Menorca et bon prétexte pour quitter le littoral une demi-journée.'},

  {id:'ferreries',name:'Ferreries',cat:'village',region:'Centre-Ouest',lat:39.98335,lng:4.01095,score:3,icon:'👞',face:'N',effort:'facile',crowd:'calme',
   f:['services','pluie'],tags:['artisanat','chaussure','marché du vendredi','randonnée'],
   best:'Matin',access:'Facile',
   desc:'Le village le plus haut de l’île, connu pour ses ateliers de chaussures et son marché artisanal du vendredi soir en été.'},

  {id:'migjorn',name:'Es Migjorn Gran',cat:'village',region:'Centre-Sud',lat:39.94940,lng:4.05939,score:3,icon:'🌿',face:'S',effort:'facile',crowd:'calme',
   f:['services'],tags:['calme','rural','ravins','départ de randonnées'],
   best:'Midi ou fin de journée',access:'Facile',
   desc:'Le plus petit municipe de l’île, porte d’entrée des ravins et des plages sauvages du centre-sud.'},

  {id:'sant-lluis',name:'Sant Lluís',cat:'village',region:'Sud-Est',lat:39.84913,lng:4.25798,score:3,icon:'⚙️',face:'S',effort:'facile',crowd:'calme',
   f:['services','pluie'],tags:['village blanc','moulin','fondation française','damier'],
   best:'Matin',access:'Facile',
   desc:'Village en damier fondé par les Français au XVIIIᵉ siècle, d’une blancheur éclatante, avec son moulin restauré au centre.'},

  {id:'sant-climent',name:'Sant Climent',cat:'village',region:'Sud-Est',lat:39.86630,lng:4.21890,score:2,icon:'🎷',face:'S',effort:'facile',crowd:'calme',
   f:['services'],tags:['jazz','village rural','soirée'],
   best:'Soirée',access:'Facile',
   desc:'Petit village rural près de l’aéroport, connu bien au-delà de l’île pour ses soirées jazz d’été dans son unique bar.'},

  {id:'binibeca-vell',name:'Binibèquer Vell',cat:'village',region:'Sud-Est',lat:39.82420,lng:4.23360,score:4,icon:'🤍',face:'S',effort:'facile',crowd:'frequente',
   f:['famille','services'],tags:['maisons blanches','ruelles','photo','village conçu'],
   best:'Tôt le matin ou après 20 h',access:'Facile — respecter les horaires de visite et le calme des habitants',
   desc:'Un labyrinthe blanc de ruelles voûtées bâti dans les années 1970 en pastiche de village de pêcheurs. Très photogénique, très fréquenté.'},

  /* ─────────────  MINORQUE TALAYOTIQUE  ───────────── */
  {id:'naveta',name:'Naveta des Tudons',cat:'patrimoine',region:'Ouest',lat:40.00308,lng:3.89127,score:5,icon:'🗿',top:true,face:'S',effort:'facile',crowd:'frequente',
   f:['famille','parking'],tags:['préhistoire','talayotique','monument funéraire','UNESCO'],
   best:'Matin',access:'Petit parking sur la Me-1 ; droit d’entrée, horaires variables selon la saison',
   desc:'Le monument préhistorique le plus célèbre de l’île : un tombeau collectif en pierre sèche en forme de navire renversé, vieux de 3 000 ans.',wiki:'Naveta des Tudons'},

  {id:'torre-galmes',name:'Torre d’en Galmés',cat:'patrimoine',region:'Centre-Est',lat:39.90244,lng:4.11772,score:5,icon:'🏺',top:true,face:'S',effort:'marche',crowd:'modere',
   f:['famille','parking','panorama'],tags:['talayotique','archéologie','taula','UNESCO','panorama'],
   best:'Matin',access:'Centre d’accueil et droit d’entrée ; compter 1 h 30 sur le site',
   desc:'Le plus vaste ensemble talayotique des Baléares : trois talayots, une taula, des maisons circulaires et un ingénieux système de citernes.'},

  {id:'torralba',name:'Torralba d’en Salort',cat:'patrimoine',region:'Centre-Est',lat:39.91177,lng:4.15889,score:4,icon:'🗿',face:'S',effort:'facile',crowd:'calme',
   f:['parking'],tags:['taula monumentale','archéologie','UNESCO'],
   best:'Matin',access:'Site aménagé en bord de route ; droit d’entrée',
   desc:'La taula la plus imposante de Minorque, encore debout dans son enceinte : le sanctuaire talayotique le plus impressionnant de l’île.'},

  {id:'talati',name:'Talatí de Dalt',cat:'patrimoine',region:'Est',lat:39.88870,lng:4.20720,score:4,icon:'🪨',face:'S',effort:'facile',crowd:'modere',
   f:['famille','ombre'],tags:['taula','talayot','oliviers','UNESCO'],
   best:'Fin d’après-midi',access:'Droit d’entrée ; court sentier ombragé',
   desc:'Un village préhistorique posé parmi les oliviers sauvages, dont la taula est étayée par un pilier effondré — l’image la plus connue du talayotique.'},

  {id:'trepuco',name:'Trepucó',cat:'patrimoine',region:'Est',lat:39.87556,lng:4.25510,score:4,icon:'🏛',face:'S',effort:'facile',crowd:'calme',
   f:['famille'],tags:['taula','talayot','près de Maó','gratuit'],
   best:'Matin',access:'Accès libre, à 10 min de Maó',
   desc:'Site talayotique aux portes de Maó, avec l’une des plus grandes taules de l’île, cerné d’une fortification en étoile du XVIIIᵉ.'},

  {id:'son-catlar',name:'Village talayotique de Son Catlar',cat:'patrimoine',region:'Ouest',lat:39.95850,lng:3.86720,score:4,icon:'🧱',face:'S',effort:'facile',crowd:'calme',
   f:['parking'],tags:['muraille','talayotique','UNESCO','le plus grand enclos'],
   best:'Fin d’après-midi',access:'Sur la route de Son Saura, accès libre ou modique',
   desc:'Le seul village préhistorique de l’île dont la muraille d’enceinte soit encore visible sur tout son pourtour, en blocs cyclopéens.'},

  {id:'sant-agusti',name:'Sant Agustí Vell & Es Galliner',cat:'patrimoine',region:'Centre-Sud',lat:39.95270,lng:4.04660,score:3,icon:'🪵',face:'S',effort:'marche',crowd:'calme',
   f:[],tags:['hypostyle','talayotique','colonnes en bois'],
   best:'Matin',access:'Depuis Es Migjorn Gran, chemin rural',
   desc:'Un ensemble talayotique méconnu qui conserve une salle hypostyle et de rares linteaux de bois d’origine.'},

  {id:'cales-coves',name:'Cales Coves',cat:'nature',region:'Sud-Est',lat:39.86518,lng:4.14531,score:5,icon:'🪨',top:true,face:'S',effort:'marche',crowd:'calme',
   f:['snorkeling'],tags:['nécropole','grottes','crique','à pied'],
   best:'Matin',access:'20 min de marche sur terrain rocheux',
   desc:'Deux criques jumelles dont les falaises sont criblées de grottes funéraires creusées dans la roche — l’une des plus grandes nécropoles rupestres des Baléares.'},

  {id:'basilica-son-bou',name:'Basilique paléochrétienne de Son Bou',cat:'patrimoine',region:'Sud',lat:39.90240,lng:4.07810,score:3,icon:'✝️',face:'S',effort:'facile',crowd:'calme',
   f:['famille'],tags:['paléochrétien','Ve siècle','bord de plage','gratuit'],
   best:'Fin de journée',access:'À l’extrémité est de la plage de Son Bou, accès libre',
   desc:'Les fondations d’une basilique du Vᵉ siècle posées au bord du sable, avec son baptistère taillé dans la roche — le plus ancien lieu de culte chrétien de l’île.'},

  {id:'lithica',name:'Líthica — Pedreres de s’Hostal',cat:'patrimoine',region:'Ouest',lat:39.99424,lng:3.87646,score:5,icon:'🧩',top:true,face:'S',effort:'facile',crowd:'modere',
   f:['famille','parking','pluie'],tags:['carrières de marès','jardins','labyrinthe','concerts'],
   best:'Matin ou fin d’après-midi',access:'Billet d’entrée ; horaires saisonniers',
   desc:'D’anciennes carrières de pierre de taille transformées en paysage monumental : puits de lumière, labyrinthe végétal et parois sciées à la main.'},

  {id:'xoroi',name:'Cova d’en Xoroi',cat:'panorama',region:'Sud-Est',lat:39.86720,lng:4.13810,score:4,icon:'🕶️',face:'S',effort:'facile',crowd:'frequente',
   f:['coucher','services','panorama'],tags:['grotte','falaise','coucher de soleil','bar'],
   best:'Une heure avant le coucher du soleil',access:'Droit d’entrée ; escaliers taillés dans la falaise',
   desc:'Un balcon aménagé dans une grotte à mi-falaise, entre légende locale et bar à coucher de soleil. Touristique, mais la vue est imbattable.'},

  {id:'museu-menorca',name:'Museu de Menorca',cat:'patrimoine',region:'Est',lat:39.89030,lng:4.26260,score:4,icon:'🏺',face:'N',effort:'facile',crowd:'calme',
   f:['pluie','famille'],tags:['musée','talayotique','histoire','jour de pluie'],
   best:'Jour de pluie ou heures chaudes',access:'Centre de Maó, ancien couvent de Sant Francesc',
   desc:'La meilleure introduction à l’île : 5 000 ans d’histoire minorquine dans un couvent du XVIIᵉ, avec une salle talayotique remarquable.'},

  /* ─────────────  SAVEURS & MARCHÉS  ───────────── */
  {id:'xoriguer',name:'Distillerie Xoriguer',cat:'saveur',region:'Est',lat:39.89060,lng:4.26240,score:4,icon:'🍸',face:'N',effort:'facile',crowd:'modere',
   f:['pluie','services'],tags:['gin','dégustation','port de Maó','héritage britannique'],
   best:'Fin de matinée',access:'Sur le quai du port de Maó, visite libre de la boutique',
   desc:'Le gin de Maó, distillé au feu de bois dans des alambics de cuivre depuis l’époque britannique — à goûter en <em>pomada</em>, allongé de limonade.'},

  {id:'mercat-mao',name:'Marchés de Maó',cat:'saveur',region:'Est',lat:39.88980,lng:4.26340,score:4,icon:'🐟',face:'N',effort:'facile',crowd:'modere',
   f:['pluie','famille','services'],tags:['marché','tapas','poisson','cloître'],
   best:'Le matin, ou en soirée pour l’apéritif',access:'Centre de Maó',
   desc:'Le cœur gourmand de la capitale : l’ancien cloître du couvent du Carme, devenu halle alimentaire, et la halle aux poissons de 1927, rendez-vous de l’apéritif.'},

  {id:'mercat-ciutadella',name:'Marché de Ciutadella',cat:'saveur',region:'Ouest',lat:40.00060,lng:3.83800,score:4,icon:'🥬',face:'W',effort:'facile',crowd:'modere',
   f:['pluie','famille','services'],tags:['marché','fruits et légumes','poisson','plaça Llibertat'],
   best:'Le matin, sauf dimanche',access:'Plaça de la Llibertat, dans la vieille ville',
   desc:'Deux pavillons modernistes au cœur de la vieille ville : produits de l’île, fromages fermiers et le meilleur des étals de poisson.'},

  {id:'subaida',name:'Fromageries d’Alaior',cat:'saveur',region:'Centre-Est',lat:39.94640,lng:4.14650,score:4,icon:'🧀',face:'N',effort:'facile',crowd:'calme',
   f:['famille','parking','pluie'],tags:['fromage Mahón-Menorca','visite de ferme','AOP'],
   best:'Matin',access:'Fermes signalées autour d’Alaior — visites sur réservation',
   desc:'Le fromage Mahón-Menorca AOP se comprend mieux à la ferme : caves d’affinage, croûtes frottées au beurre et dégustations, du plus jeune au plus affiné.'},

  {id:'binissermenya',name:'Caves & vins de Minorque',cat:'saveur',region:'Est',lat:39.90300,lng:4.19800,score:3,icon:'🍷',face:'S',effort:'facile',crowd:'calme',
   f:['pluie','parking'],tags:['vin','vignoble','dégustation','renaissance viticole'],
   best:'Fin d’après-midi',access:'Domaines répartis autour de Sant Lluís, Maó et Es Migjorn — sur réservation',
   desc:'La viticulture minorquine renaît depuis vingt ans : une dizaine de petits domaines produisent des blancs vifs et des rouges de climat maritime.'}
];
