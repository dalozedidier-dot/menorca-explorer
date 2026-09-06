/* Contenu éditorial : infos pratiques, calendrier, saveurs, culture.
 * Rien ici n'est daté au jour près — vérifier toujours les sources officielles
 * avant de partir (voir CREDITS.md). */

/* Climat — valeurs sourcées, voir CREDITS.md :
 *   air      température moyenne mensuelle, normales AEMET 1981-2010,
 *            station « Menorca, Aeropuerto ».
 *   rainDays nombre moyen de jours avec précipitations >= 1 mm dans le mois,
 *            mêmes normales AEMET. Ce n'est pas un indice : c'est une moyenne.
 *   sea      température moyenne de l'eau de mer à Maó (moyennes sur dix ans,
 *            seatemperature.info).
 *   crowd    affluence touristique ressentie, de 1 à 5. C'est la seule valeur
 *            éditoriale du tableau : une appréciation, pas une mesure.
 */
window.MENORCA_MONTHS = [
 {m:'Jan',  sea:15.0, air:10.8, rainDays:7.1, crowd:1, note:'Île au repos, beaucoup de fermetures. Randonnée idéale.'},
 {m:'Fév',  sea:14.1, air:10.8, rainDays:6.9, crowd:1, note:'Amandiers en fleur, lumière très pure, vent fréquent.'},
 {m:'Mar',  sea:14.2, air:12.3, rainDays:5.8, crowd:1, note:'Le Camí de Cavalls dans les meilleures conditions.'},
 {m:'Avr',  sea:15.6, air:14.3, rainDays:6.0, crowd:2, note:'Tout reverdit, oiseaux migrateurs, mer encore froide.'},
 {m:'Mai',  sea:18.3, air:17.8, rainDays:4.4, crowd:2, note:'Le mois idéal : doux, vert, calme, baignade possible.'},
 {m:'Juin', sea:22.2, air:21.8, rainDays:2.0, crowd:3, note:'Longues journées, Sant Joan à Ciutadella, avant la foule.'},
 {m:'Juil', sea:25.4, air:24.9, rainDays:0.6, crowd:5, note:'Le mois le plus sec de l’année. Criques saturées dès 10 h.'},
 {m:'Août', sea:26.5, air:25.4, rainDays:2.0, crowd:5, note:'Le pic absolu. Réserver tout, très longtemps à l’avance.'},
 {m:'Sep',  sea:25.4, air:22.6, rainDays:5.4, crowd:3, note:'Le meilleur compromis : mer chaude, foule en reflux.'},
 {m:'Oct',  sea:22.9, air:19.4, rainDays:7.4, crowd:2, note:'Mer encore bonne, mais l’automne est la saison des pluies.'},
 {m:'Nov',  sea:19.6, air:14.9, rainDays:8.1, crowd:1, note:'Le mois le plus arrosé. Île rendue aux Minorquins.'},
 {m:'Déc',  sea:16.7, air:12.1, rainDays:8.8, crowd:1, note:'Doux et venteux, parfait pour marcher et manger.'}
];

window.MENORCA_WINDS = [
 {dir:'N',  name:'Tramontane', local:'tramuntana', note:'Le vent roi de l’île. Sec, froid, souvent violent : la côte nord devient impraticable, le sud reste calme.'},
 {dir:'NE', name:'Grégal',     local:'gregal',     note:'Vent humide de nord-est ; il lève la houle sur Favàritx et Es Grau.'},
 {dir:'E',  name:'Levant',     local:'llevant',    note:'Vent d’est, souvent chargé de nuages ; l’ouest de l’île reste abrité.'},
 {dir:'SE', name:'Sirocco',    local:'xaloc',      note:'Vent chaud venu d’Afrique : l’air devient lourd et l’horizon se brouille.'},
 {dir:'S',  name:'Vent du midi', local:'migjorn',  note:'Les criques du sud se troublent, le nord redevient limpide.'},
 {dir:'SW', name:'Labech',     local:'llebeig',    note:'Vent de sud-ouest, généralement modéré ; il gêne surtout les plages du sud-ouest.'},
 {dir:'W',  name:'Ponant',     local:'ponent',     note:'Vent d’ouest sec, agité sur la côte de Ciutadella.'},
 {dir:'NW', name:'Mistral',    local:'mestral',    note:'Proche de la tramontane : nord et nord-ouest à éviter.'}
];

window.MENORCA_PRACTICAL = [
 {id:'venir', icon:'✈️', title:'Venir à Minorque',
  items:[
   ['Avion','L’aéroport de Minorque (MAH) est à 4,5 km de Maó. Liaisons directes toute l’année depuis Barcelone, Madrid et Palma ; nombreux vols saisonniers depuis la France, la Belgique, la Suisse, le Royaume-Uni et l’Allemagne d’avril à octobre.'],
   ['Ferry','Baleària et Trasmed relient Barcelone, Valence et Palma à Maó et Ciutadella. La traversée la plus courte est Alcúdia (Majorque) → Ciutadella, environ une heure et demie en navire rapide. Réserver très tôt si vous embarquez une voiture en été.'],
   ['Vaut-il le coup d’amener sa voiture ?','Rarement. Le ferry avec véhicule coûte souvent plus cher qu’une location sur place, et l’île se traverse en une heure. Amener sa voiture ne se justifie que pour un séjour long ou hors saison.']]},

 {id:'circuler', icon:'🚗', title:'Se déplacer sur l’île',
  items:[
   ['La règle d’or','Une seule vraie route, la Me-1, relie Maó à Ciutadella en 45 min. Tout le reste part de cet axe en cul-de-sac vers la côte : on ne longe presque jamais le littoral en voiture.'],
   ['Louer une voiture','Quasi indispensable hors des villes. En juillet-août, réserver plusieurs mois à l’avance : le parc de véhicules de l’île est limité et les prix s’envolent.'],
   ['Bus','Le réseau TMSA dessert les villages et les grandes plages depuis Maó, Ciutadella et Es Mercadal. Correct en été, très réduit en hiver et le dimanche.'],
   ['Vélo','L’île est plate et les distances courtes, mais la Me-1 est dangereuse à vélo. Le Camí de Cavalls n’est autorisé aux VTT que sur certaines sections.'],
   ['Bateau','Le meilleur moyen de voir les criques inaccessibles à pied. Excursions au départ de Ciutadella, Cala Galdana, Fornells et Maó ; location de petits bateaux sans permis possible.']]},

 {id:'acces', icon:'⛔', title:'Plages à accès réglementé',
  items:[
   ['Le principe','Plusieurs routes littorales sont fermées aux voitures et aux motos pendant la haute saison, et remplacées par des lignes de bus. <b>Les dates sont fixées chaque année</b> par le Consell Insular et annoncées au printemps : en 2026, la fermeture de Favàritx a été avancée de quinze jours par rapport au calendrier habituel. Ne jamais partir sur les dates de l’année précédente.'],
   ['Favàritx, Presili, Tortuga','Route du phare fermée aux véhicules privés en haute saison — en 2026 dès la mi-mai. Desservi par la ligne 43 au départ de la gare routière de Maó.'],
   ['Macarella & Macarelleta','Route fermée aux voitures et motos en haute saison — le 1ᵉʳ juin en 2026 comme en 2025. Navette depuis Ciutadella, vélo, ou marche depuis Cala Galdana (≈ 1 h).'],
   ['Punta Nati','Route fermée aux voitures en plein été ; navette depuis Ciutadella. Vérifier les dates de l’année en cours.'],
   ['Cala en Turqueta et Son Saura','Accès en voiture maintenu, mais parkings à <b>capacité limitée</b> : des panneaux annoncent les places restantes sur la route d’accès, et l’accès est coupé une fois le parking plein. La disponibilité de Macarella, Son Saura, La Vall et Turqueta se consulte en temps réel avant de partir. Arriver tôt reste la seule stratégie fiable.'],
   ['Es Talaier','Pas de parking propre : on y accède à pied depuis Son Saura, environ 15 min par le Camí de Cavalls.'],
   ['Algaiarens (La Vall)','Deux parkings au bout de la route, à capacité limitée, et une ligne de bus estivale depuis Ciutadella. Le site est classé zone naturelle d’intérêt spécial.'],
   ['Binibèquer Vell','C’est un village habité : la visite piétonne n’est ouverte que sur une plage horaire, affichée à l’entrée.'],
   ['Bon à savoir','Vélos et piétons ne sont jamais concernés par ces fermetures.']]},

 {id:'quand', icon:'📅', title:'Quand partir',
  items:[
   ['Mai, juin et septembre','Le trio gagnant : mer praticable, île verte ou dorée, criques respirables, tarifs raisonnables.'],
   ['Juillet-août','Chaleur, eau à 26 °C et ambiance de fête, mais criques saturées, routes fermées, prix doublés. Réserver 6 mois à l’avance.'],
   ['Octobre à avril','Beaucoup d’hôtels et de restaurants ferment, surtout en novembre. En revanche c’est la saison rêvée du Camí de Cavalls et des villages sans personne.'],
   ['La règle du vent','Consulter la prévision de vent avant de choisir sa plage compte souvent plus que la météo : par tramontane, le nord est impraticable et le sud reste parfait.']]},

 {id:'budget', icon:'💶', title:'Budget et logistique',
  items:[
   ['Taxe de séjour','Les Baléares appliquent une taxe touristique par nuit et par personne, modulée selon la catégorie d’hébergement et la saison. Elle est le plus souvent réglée sur place.'],
   ['Où loger','Maó et Ciutadella pour la vie et les restaurants ; Es Mercadal ou Ferreries pour être au centre et limiter les trajets ; Fornells pour le nord ; Cala Galdana pour le sud et les randonnées.'],
   ['Ravitaillement','Aucun service sur la majorité des criques sauvages. Prévoir eau, ombre et de quoi manger, et repartir avec ses déchets.'],
   ['Santé et urgences','Numéro d’urgence européen : 112. Hôpital Mateu Orfila à Maó ; centres de santé dans chaque village.']]},

 {id:'respect', icon:'🌿', title:'Réserve de biosphère : les gestes qui comptent',
  items:[
   ['Une île entière classée','Minorque est réserve de biosphère de l’UNESCO depuis le 7 octobre 1993. Le classement couvre la totalité de la surface terrestre de l’île — environ 70 000 hectares — et s’étend depuis à un très vaste périmètre marin. À l’intérieur, un parc naturel et un réseau de sites Natura 2000 portent les protections réglementaires les plus fortes.'],
   ['Rester sur les sentiers','Dunes, zones humides et pelouses littorales sont les milieux les plus fragiles ; un raccourci suffit à ouvrir une brèche d’érosion.'],
   ['La posidonie','Les « algues » brunes échouées sur le sable sont de la posidonie, une plante marine protégée qui protège la plage de l’érosion. On ne la ramasse pas.'],
   ['Crème solaire','Préférer une protection minérale : les filtres chimiques dégradent les herbiers et les fonds rocheux.'],
   ['Murs de pierre sèche','Les murs de l’île — plus de 10 000 km selon les estimations disponibles — sont un patrimoine agricole vivant : ne pas les escalader ni en déplacer les pierres, et refermer les barrières derrière soi.'],
   ['Emporter ses déchets','Aucune poubelle sur les criques sauvages, et aucun ramassage. Ce qui monte redescend.']]}
];

window.MENORCA_FLAVOURS = [
 {icon:'🧀', name:'Fromage Mahón-Menorca AOP', text:'Fromage de vache à croûte orangée, frottée au beurre et au paprika. Du plus jeune (3 semaines) au plus affiné (plus de 5 mois), il change complètement de caractère. Les fermes autour d’Alaior se visitent.'},
 {icon:'🦞', name:'La caldereta de langouste', text:'La langouste mijotée à la minorquine, servie avec des tranches de pain. Née dans les cabanes de pêcheurs de Fornells, c’est aujourd’hui le plat le plus cher — et le plus mythique — de l’île.'},
 {icon:'🍸', name:'Le gin de Maó', text:'Distillé au feu de bois depuis l’occupation britannique du XVIIIᵉ siècle. Il se boit en <em>pomada</em>, allongé de limonade : la boisson de toutes les fêtes de l’île.'},
 {icon:'🥖', name:'Charcuteries de l’île', text:'Charcuteries au paprika issues du porc noir local. La sobrassada se tartine ; la <em>carn i xulla</em> se tranche épais.'},
 {icon:'🥐', name:'Pâtisseries', text:'La spirale feuilletée des Baléares, au saindoux, et les petits biscuits secs aux amandes qui accompagnent le café.'},
 {icon:'🍆', name:'La cuisine paysanne', text:'<em>Oliaigua</em> (soupe de légumes à l’huile), <em>tumbet</em>, aubergines farcies, <em>perol</em> de poisson : la table minorquine est plus rustique que celle de Majorque.'},
 {icon:'🍷', name:'Les vins de l’île', text:'Une dizaine de domaines relancent la vigne depuis les années 2000, sous l’indication « Vi de la Terra Illa de Menorca ». Blancs vifs et rouges légers, très marqués par la mer.'},
 {icon:'🍯', name:'Miel, câpres et sel', text:'Le miel de garrigue, les câpres sauvages et le sel des salines de Fornells sont les souvenirs les plus honnêtes à rapporter.'}
];

window.MENORCA_CULTURE = [
 {icon:'🐴', name:'Sant Joan à Ciutadella', when:'23–24 juin', text:'La plus spectaculaire des fêtes des Baléares : des chevaux noirs minorquins se cabrent au milieu de la foule au son des fifres et tambours. Deux jours de <em>jaleo</em> — la danse des chevaux au milieu de la foule —, de pomada et de cohue : un choc, à vivre au moins une fois.'},
 {icon:'🎠', name:'Les fêtes des villages', when:'juin → septembre', text:'Chaque village a la sienne : Es Mercadal, Ferreries, Alaior, Sant Lluís, Es Castell et Maó (fête de la Vierge de Grâce, début septembre) reprennent le même rituel équestre à leur échelle, souvent plus accessible que Sant Joan.'},
 {icon:'🗿', name:'Minorque talayotique — UNESCO', when:'depuis 2023', text:'Talayots, taules et navetes ont été bâtis ici entre 1600 et 100 av. J.-C. environ. L’ensemble est inscrit au patrimoine mondial de l’UNESCO depuis septembre 2023 sous le nom de « Minorque talayotique ».'},
 {icon:'🇬🇧', name:'Un siècle britannique', when:'1708–1802', text:'Trois occupations britanniques ont laissé Es Castell et ses casernes, les fenêtres à guillotine de Maó, le gin, le mot <em>xoc</em> pour la craie et une conduite très ordonnée. Les Français, eux, ont fondé Sant Lluís entre 1756 et 1763.'},
 {icon:'🧱', name:'Les murs de pierre sèche', when:'paysage vivant', text:'Des milliers de kilomètres de murs sans mortier — plus de 10 000 selon les estimations disponibles — découpent l’île en parcelles, ponctués de <em>barraques</em>, abris à bétail en coupole. Le savoir-faire de la pierre sèche est inscrit au patrimoine culturel immatériel de l’UNESCO.'},
 {icon:'🌍', name:'Réserve de biosphère', when:'depuis 1993', text:'Le classement, obtenu le 7 octobre 1993, couvre toute la surface terrestre de l’île et un large périmètre marin. Il consacre et renforce une politique de conservation engagée avant lui — il n’a pas décidé à lui seul du sort du littoral dans les décennies précédentes, mais il l’a rendue difficile à défaire.'}
];
