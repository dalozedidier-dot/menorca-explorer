/* Photographies : surcharges manuelles.
 *
 * Par défaut, chaque lieu résout sa photo à l'exécution via l'API Wikimedia
 * Commons (recherche plein texte sur l'espace Fichier, puis repli sur une
 * recherche géographique autour du point). Les entrées ci-dessous forcent un
 * fichier précis quand on veut garantir l'image — vérifiées une à une sur
 * commons.wikimedia.org.
 *
 * Format : identifiant du lieu → nom exact du fichier Commons, sans « File: ».
 * Pour en ajouter une : ouvrir la page du fichier sur Commons et recopier le
 * titre tel quel (les espaces sont autorisés, ne pas encoder).
 */
window.MENORCA_PHOTOS = {
  'macarella':             'Cala Macarella (Menorca).jpg',
  'macarelleta':           'Cala Macarelleta (Menorca).jpg',
  'turqueta':              'Cala Turqueta - Menorca.jpg',
  'galdana':               'Cala Santa Galdana.jpg',
  'pregonda':              'Cala Pregonda. Menorca costa Norte.JPG',
  'cala-morell':           'Cala Morell Menorca.JPG',
  'cala-en-brut':          "Cala'n Brut Menorca.JPG",
  'naveta':                'Naveta des Tudons, Menorca.jpg',
  'torralba':              'Taula (Torralba d´en Salord).jpg',
  'torre-galmes':          "Cercle 6 Torre d'en Galmés.jpg",
  'lithica':               "Vista de Líthica - Pedrera de s'Hostal.jpg",
  'cavalleria-lighthouse': 'Far de Cavalleria - 00.jpg',
  'punta-nati':            'Punta Nati Lighthouse (37377399362).jpg'
};

/* Termes de recherche personnalisés, quand le nom affiché ne fait pas une
 * bonne requête (noms composés, doublons avec Majorque…). */
window.MENORCA_PHOTO_QUERIES = {
  'son-saura':        'Son Saura Ciutadella Menorca platja',
  'binigaus':         'Platja de Binigaus Menorca',
  'son-bou':          'Platja de Son Bou Menorca',
  'cavalleria-beach': 'Platja de Cavalleria Menorca',
  'ferragut':         'Platja Ferragut Menorca',
  'sa-torreta':       'Platja Sa Torreta Menorca',
  'favaritx':         'Far de Favàritx Menorca',
  'cavalleria-lighthouse':'Far de Cavalleria Menorca',
  'artrutx':          'Far d Artrutx Menorca',
  'punta-nati':       'Far de Punta Nati Menorca',
  'sa-farola':        'Castell de Sant Nicolau Ciutadella',
  'la-mola':          'Fortalesa de La Mola Menorca',
  'torre-fornells':   'Torre de Fornells Menorca',
  'santa-agueda':     'Castell de Santa Àgueda Menorca',
  'son-catlar':       'Son Catlar Ciutadella talaiòtic',
  'ses-salines':      'Ses Salines Fornells Menorca',
  'lluriac':          'Basses de Lluriac Menorca',
  'mitjana':          'Cala Mitjana Ferreries Menorca',
  'presili-tortuga':  'Cala Presili Menorca',
  'cala-mica':        'Cala Mica Menorca',
  'pudent':           'Cala Pudent Menorca',
  'alocs':            'Ets Alocs Menorca',
  'es-grau-beach':    'Es Grau platja Menorca',
  'mercat-mao':       'Mercat des Peix Maó',
  'mercat-ciutadella':'Mercat Ciutadella Menorca',
  'subaida':          'Formatge Mahón Menorca',
  'binissermenya':    'Vinya Menorca celler',
  'xoriguer':         'Gin Xoriguer Maó',
  'sant-tomas':       'Sant Tomàs Es Migjorn Gran platja',
  'atalis':           'Sant Jaume Son Bou Menorca',
  'port-mao':         'Port de Maó Menorca',
  'cala-en-bosc':     'Cala en Bosc Ciutadella Menorca',
  'fort-marlborough': 'Fort Marlborough Menorca',
  'es-castell':       'Cales Fonts Es Castell Menorca',
  'sa-farola':        'Castell de Sant Nicolau Ciutadella'
};
