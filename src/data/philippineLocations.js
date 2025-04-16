export const regions = [
  { code: 'NCR', name: 'National Capital Region' },
  { code: 'CAR', name: 'Cordillera Administrative Region' },
  { code: 'REGION_I', name: 'Region I (Ilocos Region)' },
  { code: 'REGION_II', name: 'Region II (Cagayan Valley)' },
  { code: 'REGION_III', name: 'Region III (Central Luzon)' },
  { code: 'REGION_IV-A', name: 'Region IV-A (CALABARZON)' },
  { code: 'REGION_IV-B', name: 'Region IV-B (MIMAROPA)' },
  { code: 'REGION_V', name: 'Region V (Bicol Region)' },
  { code: 'REGION_VI', name: 'Region VI (Western Visayas)' },
  { code: 'REGION_VII', name: 'Region VII (Central Visayas)' },
  { code: 'REGION_VIII', name: 'Region VIII (Eastern Visayas)' },
  { code: 'REGION_IX', name: 'Region IX (Zamboanga Peninsula)' },
  { code: 'REGION_X', name: 'Region X (Northern Mindanao)' },
  { code: 'REGION_XI', name: 'Region XI (Davao Region)' },
  { code: 'REGION_XII', name: 'Region XII (SOCCSKSARGEN)' },
  { code: 'REGION_XIII', name: 'Region XIII (Caraga)' },
  { code: 'BARMM', name: 'Bangsamoro Autonomous Region in Muslim Mindanao' },
];

export const provinces = [
  {
    code: 'NCR',
    name: 'Metro Manila',
    cities: [
      {
        code: 'MNL',
        name: 'Manila',
        barangays: [
          'Binondo', 'Ermita', 'Intramuros', 'Malate', 'Paco', 
          'Pandacan', 'Port Area', 'Quiapo', 'Sampaloc', 'San Andres', 
          'San Miguel', 'San Nicolas', 'Santa Ana', 'Santa Cruz', 
          'Santa Mesa', 'Tondo'
        ]
      },
      {
        code: 'QC',
        name: 'Quezon City',
        barangays: [
          'Alicia', 'Bagong Silangan', 'Batasan Hills', 'Commonwealth',
          'Culiat', 'Fairview', 'Holy Spirit', 'Novaliches Proper',
          'Payatas', 'Project 6', 'San Francisco Del Monte', 'UP Campus'
        ]
      },
      {
        code: 'MKTI',
        name: 'Makati',
        barangays: [
          'Bangkal', 'Bel-Air', 'Carmona', 'Cembo', 'Comembo', 
          'Forbes Park', 'Guadalupe Nuevo', 'Guadalupe Viejo', 
          'Kasilawan', 'La Paz', 'Magallanes', 'Olympia', 
          'Palanan', 'Poblacion', 'San Lorenzo', 'Urdaneta'
        ]
      }
    ]
  },
  {
    code: 'BTN',
    name: 'Bataan',
    cities: [
      {
        code: 'BALANGA',
        name: 'Balanga City',
        barangays: [
          'Bagong Silang', 'Cabog-Cabog', 'Central', 'Cupang Proper',
          'Dangcol', 'Ibayo', 'Munting Batangas', 'Poblacion', 
          'Puerto Rivas Ibaba', 'Puerto Rivas Itaas', 'Sibacan', 
          'Talisay', 'Tortugas'
        ]
      },
      {
        code: 'MARIVELES',
        name: 'Mariveles',
        barangays: [
          'Alion', 'Baseco', 'Batangas II', 'Biaan', 'Cabcaben',
          'Lucanin', 'Malaya', 'Mt. View', 'Poblacion', 'San Isidro'
        ]
      }
    ]
  },
  {
    code: 'PAMP',
    name: 'Pampanga',
    cities: [
      {
        code: 'ANGELES',
        name: 'Angeles City',
        barangays: [
          'Balibago', 'Claro M. Recto', 'Lourdes North West',
          'Malabanias', 'Mining', 'Pampang', 'Pulungbulu',
          'Pulung Maragul', 'Santo Cristo', 'Santo Rosario'
        ]
      },
      {
        code: 'SAN_FERNANDO',
        name: 'San Fernando City',
        barangays: [
          'Calulut', 'Del Carmen', 'Dolores', 'Juliana', 
          'Maimpis', 'San Jose', 'Santo Niño', 'Sindalan', 
          'Telabastagan'
        ]
      }
    ]
  },
  {
    code: 'LAGUNA',
    name: 'Laguna',
    cities: [
      {
        code: 'CALAMBA',
        name: 'Calamba City',
        barangays: [
          'Banlic', 'Barandal', 'Batino', 'Bucal', 'Canlubang',
          'Halang', 'Majada', 'Mapagong', 'Parian', 'Real',
          'San Cristobal', 'Turbina'
        ]
      },
      {
        code: 'STA_ROSA',
        name: 'Santa Rosa City',
        barangays: [
          'Aplaya', 'Balibago', 'Don Jose', 'Dita', 'Macabling',
          'Market Area', 'Pulong Santa Cruz', 'Santo Domingo',
          'Tagapo'
        ]
      }
    ]
  },
  {
    code: 'CAV',
    name: 'Cavite',
    cities: [
      {
        code: 'CAV_BACOOR',
        name: 'Bacoor',
        barangays: [
          'Alima', 'Aniban', 'Banalo', 'Bayanan', 'Daang Bukid',
          'Digman', 'Dulong Bayan', 'Habay', 'Kaingin', 'Ligas',
          'Mabolo', 'Maliksi', 'Molino', 'Niog', 'Panapaan',
          'Real', 'Salinas', 'Sineguelasan', 'Talaba', 'Zapote'
        ]
      },
      {
        code: 'CAV_DASMA',
        name: 'Dasmariñas',
        barangays: [
          'Burol', 'Datu Esmael', 'Langkaan', 'Paliparan',
          'Sabang', 'Salawag', 'Salitran', 'Sampaloc',
          'San Agustin', 'San Jose'
        ]
      }
    ]
  },
  {
    code: 'CEB',
    name: 'Cebu',
    cities: [
      {
        code: 'CEB_CITY',
        name: 'Cebu City',
        barangays: [
          'Apas',
          'Banilad',
          'Basak',
          'Capitol Site',
          'Guadalupe',
          'Lahug',
          'Luz',
          'Mabolo',
          'Pardo',
          'Talamban',
          'Tisa'
        ]
      },
      {
        code: 'LAP_LAP',
        name: 'Lapu-Lapu',
        barangays: [
          'Agus',
          'Babag',
          'Bankal',
          'Basak',
          'Buaya',
          'Canjulao',
          'Gun-ob',
          'Looc',
          'Mactan',
          'Maribago',
          'Pajo',
          'Pusok'
        ]
      }
    ]
  },
    
  {
    code: 'DVO_SUR',
    name: 'Davao del Sur',
    municipalities: [
      {
        code: 'DAVAO CITY',
        name: 'Davao City',
        barangays: [
          'Acacia', 'Agdao', 'Alambre', 'Alejandra Navarro', 'Alfonso Angliongto Sr.', 'Angalan', 'Atan-awe', 'Baganihan', 'Bago Aplaya', 'Bago Gallera',
          'Bago Oshiro', 'Baguio', 'Balengaeng', 'Baliok', 'Bangkas Heights', 'Bantol', 'Baracatan', 'Barangay 10-A', 'Barangay 11-B', 'Barangay 12-B',
          'Barangay 13-B', 'Barangay 14-B', 'Barangay 15-B', 'Barangay 16-B', 'Barangay 17-B', 'Barangay 18-B', 'Barangay 19-B', 'Barangay 1-A', 'Barangay 20-B', 'Barangay 21-C',
          'Barangay 22-C', 'Barangay 23-C', 'Barangay 24-C', 'Barangay 25-C', 'Barangay 26-C', 'Barangay 27-C', 'Barangay 28-C', 'Barangay 29-C', 'Barangay 2-A', 'Barangay 50-C',
          'Barangay 30-C', 'Barangay 31-D', 'Barangay 32-D', 'Barangay 33-D', 'Barangay 34-D', 'Barangay 35-D', 'Barangay 36-D', 'Barangay 37-D', 'Barangay 38-D', 'Barangay 39-D',
          'Barangay 3-A', 'Barangay 40-D', 'Barangay 4-A', 'Barangay 5-A', 'Barangay 6-A', 'Barangay 7-A', 'Barangay 8-A', 'Barangay 9-A', 'Bato', 'Bayabas',
          'Biao Escuela', 'Biao Joaquin', 'Binugao', 'Bucana', 'Buda', 'Buhangin', 'Bunawan', 'Cabantian', 'Cadalian', 'Calinan',
          'Callawa', 'Camansi', 'Carmen', 'Catalunan Grande', 'Catalunan Pequeño', 'Catigan', 'Cawayan', 'Centro', 'Colosas', 'Communal',
          'Crossing Bayabas', 'Dacudao', 'Dalag', 'Dalagdag', 'Daliao', 'Daliaon Plantation', 'Datu Salumay', 'Dominga', 'Dumoy', 'Eden',
          'Fatima', 'Gatungan', 'Gov. Paciano Bangoy', 'Gov. Vicente Duterte', 'Gumalang', 'Gumitan', 'Ilang', 'Inayangan', 'Indangan', 'Kap. Tomas Monteverde, Sr.',
          'Kilate',  'Lacson', 'Lamanan', 'Lampianao', 'Langub', 'Lapu-lapu', 'Leon Garcia, Sr.', 'Lizada', 'Los Amigos', 'Lubogan',
          'Lumian',  'Ma-a', 'Mabuhay', 'Magsaysay', 'Magtuod', 'Mahayag', 'Malabog', 'Malagos', 'Malamba', 'Manambulan',
          'Mandug',  'Manuel Guianga', 'Mapula', 'Marapangi', 'Marilog', 'Matina Aplaya', 'Matina Biao', 'Matina Crossing', 'Matina Pangi', 'Megkawayan',
          'Mintal',  'Mudiang', 'Mulig', 'New Carmen', 'New Valencia', 'Pangpanga', 'Panacan', 'Panalum', 'Pandaitan', 'Pangyan',
          'Paquibato',  'Paradise Embak', 'Rafael Castillo', 'Riverside', 'Salapawan', 'Salaysay', 'Saloy', 'San Antonio', 'San Isidro', 'Santo Niño',
          'Sasa',  'Sibulan', 'Sirawan', 'Sirib', 'Suawan', 'Subasta', 'Sumimao', 'Tacunan', 'Tagakpan', 'Tagluno',
          'Tagurano',  'Talandang', 'Talomo', 'Talomo River', 'Tamayong', 'Tambobong', 'Tamugan', 'Tapak', 'Tawan-tawan', 'Tibuloy',
          'Tibungco',  'Tigatto', 'Toril', 'Tugbok', 'Tungakalan', 'Ubalde', 'Ula', 'Vicente Hizon Sr.', 'Waan', 'Wangan',
          'Wilfredo Aquino',  'Wines', 
        ]
      },
      {
        code: 'DIGOS',
        name: 'Digos City',
        barangays: [
          'Aplaya', 'Balabag', 'Binaton', 'Cogon', 'Colorado', 'Dawis', 'Dulangan', 'Goma', 'Igpit', 'Kapatagan',
          'Kiagot', 'Lungag', 'Mahayahay', 'Matti', 'Ruparan', 'San Agustin', 'San Jose', 'San Miguel', 'San Roque', 'Sinawilan',
          'Soong', 'Tiguman', 'Tres de Mayo', 'Zone 1', 'Zone 2', 'Zone 3',
        ]
      },
      {
        code: 'BANSALAN',
        name: 'Bansalan',
        barangays: [
          'Alegre', 'Alta Vista', 'Anonang', 'Bitaug', 'Bonifacio', 'Buenavista', 'Darapuay', 'Dolo', 'Eman', 'Kinuskusan',
          'Libertad', 'Linawan', 'Mabuhay', 'Mabunga', 'Managa', 'Marber', 'New Clarin', 'Poblacion', 'Poblacion Dos', 'Rizal',
           'Santo Niño', 'Sibayan', 'Tinongtongan', 'Tubod' , 'Union'
        ]
      },
      {
        code: 'HAGONOY',
        name: 'Hagonoy',
        barangays: [
          'Balutakay', 'Clib', 'Guihing', 'Guihing Aplaya', 'Hagonoy Crossing', 'Kibuaya', 'La Union', 'Lanuro', 'Lapulabao', 'Leling',
          'Mahayahay', 'Malabang Damsite', 'Maliit Digos', 'New Quezon', 'Paligue', 'Poblacion', 'Sacub', 'San Guillermo', 'San Isidro', 'Siniyawan',
          'Tologan',
          
        ]
      },
      {
        code: 'KIBLAWAN',
        name: 'Kiblawan',
        barangays: [
          'Abnate', 'Bagong Negros', 'Bagong Silang', 'Bagumbayan', 'Balasaiao', 'Bonifacio', 'Bulol Salo', 'Bunot', 'Cogon-Bacaca', 'Dapok',
          'Ihan', 'Kibongbong', 'Kimlawis', 'Kisulan', 'Lati-an', 'Manual', 'Maraga-a', 'Molopolo', 'New Sibonga', 'Panaglib',
          'Pasig', 'Poblacion', 'Pocaleel', 'San Isidro', 'San Jose', 'San Pedro', 'Santo Niño', 'Tacub', 'Tacul', 'Waterfall',
        ]
      },
      {
        code: 'MAGSAYSAY',
        name: 'Magsaysay',
        barangays: [
          'Bacungan', 'Balnate', 'Barayong', 'Blocon', 'Dalawinon', 'Dalumay', 'Glamang', 'Kanapulo', 'Kasuga', 'Lower Bala',
          'Mabini', 'Maibo', 'Malawanit', 'Malongon', 'New Ilocos', 'New Opon', 'Poblacion', 'San Isidro', 'San Miguel', 'Tacul',
          'Tagaytay', 'Upper Bala'
        ]
      },
      {
        code: 'MALALAG',
        name: 'Malalag',
        barangays: [
          'Bagumbayan', 'Baybay', 'Bolton', 'Bulacan', 'Caputian', 'Ibo', 'Kiblagon', 'Lapu Lapu', 'Mabini', 'New Baclayon',
          'Pitu', 'Poblacion', 'Rizal', 'San Isidro', 'Tagansule'
        ]
      },
      {
        code: 'MATANAO',
        name: 'Matanao',
        barangays: [
          'Asbang', 'Asinan', 'Bagumbayan', 'Bangkal', 'Buas', 'Buri', 'Cabligan', 'Camanchiles', 'Ceboza', 'Colonsabak', 
          'Dongan-Pekong', 'Kabasagan', 'Kapok', 'Kauswagan', 'Kibao', 'La Suerte', 'Langa-an', 'Lower Marber', 'Manga', 'New Katipunan', 
          'New Murcia', 'New Visayas', 'Poblacion', 'Saboy', 'San Jose', 'San Miguel', 'San Vicente', 'Saub', 'Sinaragan', 'Sinawilan', 
          'Tamlangon', 'Tibongbong', 'Towak',
        ]
      },
      {
        code: 'PADADA',
        name: 'Padada',
        barangays: [
          'Almendras', 'Don Sergio Osmenia Jr.', 'Harada Butai', 'Lower Katipuna', 'Lower Limonzo', 'Lower Malinao', 'NC Ordaneza District', 'Northern Paligue', 'Palili', 'Piape', 
          'Punta Piape', 'Quirino District', 'San Isidro', 'Souther Paligue', 'Tulogan', 'Upper Limonzo', 'Upper Malinao',
        ]
      },
      {
        code: 'SANTA_CRUZ',
        name: 'Santa Cruz',
        barangays: [
          'Astorga', 'Bato', 'Coronon', 'Darong', 'Inawayan', 'Jose Rizal', 'Matutungan', 'Melilia', 'Saliducon', 'Sibulan', 
          'Sinoron', 'Tagabuli', 'Tibolo', 'Tuban', 'Zone 1', 'Zone 2', 'Zone 3', 'Zone 4',
          
        ]
      },
      {
        code: 'SULOP',
        name: 'Sulop',
        barangays: [
          'Balasinon', 'Buguis', 'Carre', 'Clib', 'Harada Butai', 'Katipunan', 'Kiblagon', 'Labon', 'Laperas', 'Lapla',
          'Litos', 'Luparan', 'Mckinley', 'New Cebu', 'Osmenia', 'Palili', 'Parame', 'Poblacion', 'Roxas', 'Solongvale',
           'Tagolilong', ' Talao', 'Talas', 'Tanwalang', 'Waterfall',
          
        ]
      }
    ]
  },
  {
    code: 'DVO_NOR',
    name: 'Davao del Norte',
    municipalities: [
      {
        code: 'ASUNCION',
        name: 'Asuncion',
        barangays: [
          'Binancian', 'Buan', 'Buclad', 'Cabaywa', 'Camansa', 'Cambanogoy', 'Camoning', 'Canatan', 'Concepcion', 'Doña Andrea',
          'Magatos', 'Napungas', 'New Bantayan', 'New Loon', 'New Santiago', 'Pamacaun', 'Sagayen', 'San Vicente', 'Santa Filomena', 'Sonlon',
        ]
      },
      {
        code: 'BRAULIO E. DUJALI',
        name: 'Braulio E. Dujali',
        barangays: [
          'Cabayangan', 'Dujali', 'Magupising', 'New Casay', 'Tanglao',
        ]
      },
      {
        code: 'CARMEN',
        name: 'Carmen',
        barangays: [
          'Alejal', 'Anibongan', 'Asuncion', 'Cebulano', 'Guadalupe', 'Ising', 'La Paz', 'Mabaus', 'Mabuhay', 'Magsaysay',
          'Mangalcal', 'Minda', 'New Camiling', 'Salvacion', 'San Isidro', 'Santo Niño', 'Taba', 'Tibulao', 'Tubod', 'Tuganay',
        ]
      },
      {
        code: 'KAPALONG',
        name: 'Kapalong',
        barangays: [
          'Capungagan', 'Florida', 'Gabuyan', 'Gupitan', 'Katipunan', 'Luna', 'Mabantao', 'Mamacao', 'Maniki', 'Pag-asa',
          'Sampao', 'Semong', 'Sua-on', 'Tiburcia',
        ]
      },
      {
        code: 'NEW CORELLA',
        name: 'New Corella',
        barangays: [
          'Cabidianan', 'Carcor', 'Del Monte', 'Del Pilar', 'El Salvador', 'Limba-an', 'Macgum', 'Mambing','Mesaoy', 'New Bohol',
          'New Cortez', 'New Sambog', 'Patrocenio', 'Poblacion', 'San Jose', 'San Roque', 'Santa Cruz', 'Santa Fe','Santo Niño', 'Suawon',
        ]
      },
      {
        code: 'PANABO',
        name: 'Panabo',
        barangays: [
          'A.O. Floirendo', 'Buenavista', 'Cacao', 'Cagangohan', 'Consolacion', 'Dapco', 'Datu Abdul Dadia', 'Gredu','J.P. Laurel', 'Kasilak',
          'Katipunan', 'Katualan', 'Kauswagan', 'Kiotoy', 'Little Panay', 'Lower Panaga', 'Mabunao', 'Maduao','Malativas', 'Manay',
          'Nanyo', 'New Malaga', 'New Malitbog', 'New Pandan', 'New Visayas', 'Quezon', 'Salvacion', 'San Francisco','San Nicholas', 'San Pedro',
          'San Roque', 'San Vicente', 'Santa Cruz', 'Santo Niño', 'Sindaton', 'Southern Davao', 'Tagpore', 'Tibungol','Upper Licanan', 'Waterfall',
        ]
      },
      {
        code: 'SAMAL',
        name: 'Samal',
        barangays: [
          'Adecor', 'Anonang', 'Aumbay', 'Aundanao', 'Balet', 'Bandera', 'Caliclic', 'Camudmud','Catagman', 'Cawag',
          'Cogon', 'Cogon (Talicod)', 'Dadatan', 'Del Monte', 'Guilon', 'Kanaan', 'Kinawitnon', 'Libertad','Libuak', 'Licup',
          'Limao', 'Linosutan', 'Mambago-A', 'Mambago-B', 'Miranda', 'Moncando', 'Pangubatan', 'Peñaplata','Poblacion', 'San Agustin',
          'San Antonio', 'San Isidro (Babak)', 'San Isidro (Kaputian)', 'San Jose', 'San Miguel', 'San Remigio', 'Santa Cruz', 'Santo Niño','Sion', 'Tagbaobo',
          'Tagbay', 'Tagbitan-ag', 'Tagdaliao', 'Tagpopongan', 'Tambo', 'Toril',
               ]
      },
      {
        code: 'SAN ISIDRO',
        name: 'San Isidro',
        barangays: [
          'Dacudao', 'Datu Balong', 'Igangon', 'Kipalili', 'Libuton', 'Linao', 'Mamangan', 'Monte Dujali', 'Pinamuno', 'San Miguel',
          'Santo Niño', 'Sawata',
        ]
      },
      {
        code: 'SANTO TOMAS',
        name: 'Santo Tomas',
        barangays: [
          'Balagunan', 'Bobongon', 'Casig-ang', 'Esperanza', 'Kimamon', 'Kinamayan', 'La Libertad', 'Lungaog', 'Magwawa', 'New Katipunan',
          'New Visayas', 'Pantaron', 'Salvacion', 'San Jose', 'San Miguel', 'San Vicente', 'Talomo', 'Tibal-og', 'Tulalian',
        ]
      },
      {
        code: 'TAGUM',
        name: 'Tagum',
        barangays: [
         'Apokon', 'Bincungan', 'Bunsaon', 'Canocotan', 'Cuambogan', 'La Filipina', 'Liboganon', 'Madaum','Magdum', 'Magugpo East',
          'Magugpo North', 'Magugpo Poblacion', 'Magugpo South', 'Magugpo West', 'Mankilam', 'New Balamban', 'Nueva Fuerza', 'Pagsabangan','Pandapan', 'San Agustin',
          'San Isidro', 'San Miguel', 'Visayan Village',
        ]
      },
      {
        code: 'TALAINGOD',
        name: 'Talaingod',
        barangays: [
          'Dagohoy', 'Palma Gil', 'Santo Niño', 
        ]
      }
    ]
  },
  {
    code: 'DVO_ORI',
    name: 'Davao Oriental',
    municipalities: [
      {
        code: 'BAGANGA',
        name: 'Baganga',
        barangays: [
          'Baculin', 'Banao', 'Batawan', 'Batiano', 'Binondo', 'Bobonao', 'Campawan', 'Central', 'Dapnan', 'Kinablangan',
          'Lambajon', 'Lucod', 'Mahanub', 'Mikit', 'Salingcomot', 'San Isidro', 'San Victor', 'Saoquegue',
          
        ]
      },
      {
        code: 'BANAYBANAY',
        name: 'Banaybanay',
        barangays: [
          'Cabangcalan', 'Caganganan', 'Calubihan', 'Causwagan', 'Mahayag', 'Maputi', 'Mogbongcogon', 'Panikian', 'Pintatagan', 'Piso Proper', 'Poblacion',
          'Punta Linao', 'Rang-ay', 'San Vicente', 
          
        ]
      },
      {
        code: 'BOSTON',
        name: 'Boston',
        barangays: [
          'Caatihan', 'Cabasagan', 'Carmen', 'Cawayanan', 'Poblacion',
          'San Jose', 'Sibajay', 'Simolao', 
        ]
      },
      {
        code: 'CARAGA',
        name: 'Caraga',
        barangays: [
          'Alvar', 'Caningag', 'Don Leon Balante', 'Lamiawan', 'Manorigao', 'Mercedes', 'Palma Gil', 'Pichon', 'Poblacion', 'San Antonio',
          'San Jose', 'San Luis', 'San Miguel', 'San Pedro', 'Santa Fe', 'Santiago', 'Sobrecarey'
        ]
      },
      {
        code: 'CATEEL',
        name: 'Cateel',
        barangays: [
          'Abijod', 'Alegria', 'Aliwagwag', 'Aragon', 'Baybay', 'Maglahus', 'Mainit', 'Malibago', 'Poblacion', 'San Alfonso',
          'San Antonio', 'San Miguel', 'San Rafael', 'San Vicente', 'Santa Filomena', 'Taytayan',
        ]
      },
      {
        code: 'GOVERNOR GENEROSO',
        name: 'Governor Generosa',
        barangays: [
          'Anitap', 'Crispin Dela Cruz', 'Don Aurelio Chicote', 'Lavigan', 'Luzon', 'Magdog', 'Manuel Roxas', 'Monserrat', 'Nangan', 'Oregon',
          'Poblacion', 'Pundaguitan', 'Sergio Osmeña', 'Surop', 'Tagabebe', 'Tamban', 'Tandang Sora', 'Tibanban', 'Tiblawan', 'Upper Tibanban',
        ]
      },
      {
        code: 'LUPON',
        name: 'Lupon',
        barangays: [
          'Bagumbayan', 'Cabadiangan', 'Calapagan', 'Cocornon', 'Corporacion', 'Don Mariano Marcos', 'Ilangay', 'Langka', 'Lantawan', 'Limbahan',
          'Macangao', 'Magsaysay', 'Mahayahay', 'Maragtas', 'Marayag', 'New Visayas', 'Poblacion', 'San Isidro', 'San Jose', 'Tagboa',
          'Tagugpo',
        ]
      },
      {
        code: 'MANAY',
        name: 'Manay',
        barangays: [
          'Capasnan', 'Cayawan', 'Central', 'Concepcion', 'Del Pilar', 'Guza', 'Holy Cross', 'Lambog', 'Mabini', 'Manreza',
          'New Taokanga', 'Old Macopa', 'Rizal', 'San Fermin', 'San Ignacio', 'San Isidro', 'Zaragosa'
        ]
      },
      {
        code: 'MATI',
        name: 'Mati',
        barangays: [
          'Badas', 'Bobon', 'Buso', 'Cabuaya', 'Central', 'Culian', 'Dahican', 'Danao', 'Dawan', 'Don Enrique Lopez',
          'Don Martin Marundan', 'Don Salvador Lopez, Sr.', 'Langka', 'Lawigan', 'Libudon', 'Luban', 'Macambol', 'Mamali', 'Matiao', 'Mayo',
          'Sainz', 'Sanghay', 'Tagabakid', 'Tagbinonga', 'Taguibo', 'Tamisan',
        ]
      },
      {
        code: 'SAN ISIDRO',
        name: 'San Isidro',
        barangays: [
          'Baon', 'Batobato', 'Bitaogan', 'Cambaleon', 'Dugmanon', 'Iba', 'La Union', 'Lapu-lapu', 'Maag', 'Manikling',
          'Maputi', 'San Miguel', 'San Roque', 'Santo Rosario', 'Sudlon', 'Talisay',
        ]
      },
      {
        code: 'TARRAGONA',
        name: 'Tarragona',
        barangays: [
          'Cabagayan', 'Central', 'Dadong', 'Jovellar', 'Limot', 'Lucatan', 'Maganda', 'Ompao', 'Tomoaong', 'Tubaon',
        ]
      }
    ]
  },
  {
    code: 'DVO_OCC',
    name: 'Davao Occidental',
    municipalities: [
      {
        code: 'DON MARCELINO',
        name: 'Don Marcelino',
        barangays: [
          'Baluntaya', 'Calian', 'Dalupan', 'Kinanga', 'Kiobog', 'Lanao', 'Linadasan', 'Mabuhay', 'North Lamidan', 'Nueva Villa', 
          'South Lamidan', 'Talagutong', 'West Lamidan',
        ]
      },
      {
        code: 'JOSE ABAD SANTOS',
        name: 'Jose Abad Santos',
        barangays: [
          'Balangonan', 'Buguis', 'Bukid', 'Butuan', 'Butulan', 'Caburan Big', 'Caburan Small', 'Camalian', 'Carahayan', 'Cayaponga',
          'Culaman', 'Kalbay', 'Kitayog', 'Magulibas', 'Malalan', 'Mangile', 'Marabutuan', 'Meybio', 'Molmol', 'Nuing', 'Patulang',
          'Quiapo', 'San Isidro', 'Sugal', 'Tabayon', 'Tanuman',
        ]
      },
      {
        code: 'MALITA',
        name: 'Malita',
        barangays: [
          'Bito', 'Bolila', 'Buhangin', 'Culaman', 'Datu Danwata', 'Demoloc', 'Felis', 'Fishing Village', 'Kibalatong', 'Kidalapong',
          'Kilalag', 'Kinangan', 'Lacaron', 'Lagumit', 'Lais', 'Little Baguio', 'Macol', 'Mana', 'Manuel Peralta', 'New Argao',
          'Pangaleon', 'Pangian', 'Pinalpalan', 'Poblacion', 'Sangay', 'Talogoy', 'Tical', 'Ticulon', 'Tingolo', 'Tubalan',
        ]
      },
      {
        code: 'STA MARIA',
        name: 'Sta Maria',
        barangays: [
          'Basiawan', 'Buca', 'Cadaatan', 'Datu Daligasao', 'Datu Intan', 'Kidadan', 'Kinilidan', 'Kisulad', 'Malalag Tubig', 'Mamacao',
          'Ogpao', 'Poblacion', 'Pongpong', 'San Agustin', 'San Antonio', 'San Isidro', 'San Juan', 'San Pedro', 'San Roque', 'Santo Niño ', 
          'Santo Rosario', 'Tanglad',
        ]
      },
      {
        code: 'SARANGANI',
        name: 'Sarangani',
        barangays: [
          'Batuganding', 'Camahual', 'Camalig', 'Gomtago', 'Konel', 'Laker', 'Lipol', 'Mabila', 'Patuco', 'Tagen',
          'Tinina', 'Tucal',
        ]
      }
    ]
  },
  {
    code: 'DAVAO DE ORO',
    name: 'Davao De Oro',
    municipalities: [
      {
        code: 'COMPOSTELA',
        name: 'Compostela',
        barangays: [
          'Aurora', 'Bagongon', 'Gabi', 'Lagab', 'Mangayon', 'Mapaca', 'Maparat', 'New Alegria', 'Ngan', 'Osmeña',
          'Panansalan', 'Poblacion', 'San Jose', 'San Miguel', 'Siocon', 'Tamia',
        ]
      },
      {
        code: 'LAAK',
        name: 'Laak',
        barangays: [
          'Aguinaldo', 'Amor Cruz', 'Ampawid', 'Andap', 'Anitap', 'Bagong Silang', 'Banbanon', 'Belmonte', 'Binasbas', 'Bullucan',
          'Cebulida', 'Concepcion', 'Datu Ampunan', 'Datu Davao', 'Doña Josefa', 'El Katipunan', 'Il Papa', 'Imelda', 'Inacayan', 'Kaligutan',
          'Kapatagan', 'Kidawa', 'Kilagding', 'Kiokmay', 'Laac', 'Langtud', 'Longanapan', 'Mabuhay', 'Macopa', 'Malinao',
          'Mangloy', 'Melale', 'Naga', 'New Bethlehem', 'Panamoren', 'Sabud', 'San Antonio', 'Santa Emilia', 'Santo Niño', 'Sisimon',
        ]
      },
      {
        code: 'MABINI',
        name: 'Mabini',
        barangays: [
          'Anitapan', 'Cabuyuan', 'Cadunan', 'Cuambog', 'Del Pilar',
          'Golden Valley', 'Libodon', 'Pangibiran', 'Pindasan', 'San Antonio', 'Tagnanan',
        ]
      },
      {
        code: 'MACO',
        name: 'Maco',
        barangays: [
          'Anibongan', 'Anislagan', 'Binuangan', 'Bucana', 'Calabcab','Concepcion','Dumlan', 'Elizalde','Gubatan','Hijo',
          'Kinuban','Langgam', 'Lapu-Lapu', 'Libay-libay', 'Limbo', 'Lumatab', 'Magangit', 'Mainit','Malamodao','Manipongol',
          'Mapaang','Masara','New Asturias','New Barili', 'New Leyte','New Visayas','Panangan','Pangi','Panibasan','Panoraon',
          'Poblacion','San Juan','San Roque','Sangab','Tagbaros','Taglawig','Teresa',
        ]
      },
      {
        code: 'MARAGUSAN',
        name: 'Maragusan',
        barangays: [
          'Bagong Silang', 'Bahi', 'Cambagang', 'Coronobe', 'Katipunan', 'Lahi', 'Langgawisan', 'Mabugnao', 'Magcagong', 'Mahayahay',
          'Mapawa', 'Maragusan', 'Mauswagon', 'New Albay', 'New Katiputan', 'New Manay', 'New Panay', 'Paloc', 'Pamintaran', 'Parasanon',
           'Talian', 'Tandik', 'Tigbao', 'Tupas', 
        ]
      },
      {
        code: 'MAWAB',
        name: 'Mawab',
        barangays: [
          'Andili', 'Bawani', 'Concepcion', 'Malinawon', 'Nueva Visayas',
          'New Iloco', 'Poblacion', 'Salvacion', 'Saosao', 'Sawangan', 'Tuboran',
        ]
      },
      {
        code: 'MONKAYO',
        name: 'Monkayo',
        barangays: [
          'Awao', 'Babag', 'Banlag', 'Baylo', 'Casoon','Haguimitan', 'Inambatan', 'Macopa', 'Mamunga', 'Mount Diwata',
          'Naboc', 'Olaycon', 'Pasian', 'Poblacion', 'Rizal','Salvacion', 'San Isidro', 'San Jose', 'Tubo-tubo', 'Union',
          'Upper Ulip',
        ]
      },
      {
        code: 'MONTEVISTA',
        name: 'Montevista',
        barangays: [
          'Banagbanag', 'Banglasan', 'Bankerohan Norte', 'Bankerohan Sur', 'Camansi', 'Camantangan', 'Canidkid', 'Concepcion', 'Dauman', 'Lebanon',
          'Linoan', 'Mayaon', 'New Calape', 'New Cebulan', 'New Dalaguete', 'New Visayas', 'Prosperidad', 'San Jose', 'San Vicente', 'Tapia',
        ]
      },
      {
        code: 'NABUNTURAN',
        name: 'Nabunturan',
        barangays: [
          'Anislagan', 'Antequera', 'Basak', 'Bayabas', 'Bukal','Cabacungan', 'Cabidianan', 'Katipunan', 'Libasan', 'Linda',
          'Magading', 'Magsaysay', 'Mainit', 'Manat', 'Matilo','Mipangi', 'New Dauis', 'New Sibonga', 'Ogao', 'Pangutusan',
          'Poblacion', 'San Isidro', 'San Roque', 'San Vicente', 'Santa Maria','Santo Niño', 'Sasa', 'Tagnocon', 
        ]
      },
      {
        code: 'NEW BATAAN',
        name: 'New Bataan',
        barangays: [
          'Andap', 'Bantacan', 'Batinao', 'Cabinuangan', 'Camanlangan', 'Cogonon', 'Fatima', 'Kahayag', 'Katipunan', 'Magangit',
          'Magsaysay', 'Manurigao', 'Pagsabangan', 'Panag', 'San Roque','Tandawan',
        ]
      },
      {
        code: 'PANTUKAN',
        name: 'Pantukan',
        barangays: [
          'Araibo', 'Bongabong', 'Bongbong', 'Kingking', 'Las Arenas','Magnaga', 'Matiao', 'Napnapan', 'P. Fuentes', 'Tagdangua',
          'Tag-ugpo', 'Tambongon', 'Tibagon',
        ]
      }

    ]
  },
  {
    code: 'ZAM_SUR',
    name: 'Zamboanga del Sur',
    cities: [
      {
        code: 'ZAM_CITY',
        name: 'Zamboanga City',
        barangays: [
          'Ayala', 'Baliwasan', 'Campo Islam', 'Canelar', 
          'Divisoria', 'Guiwan', 'Mercedes', 'Pasonanca', 
          'Putik', 'San Roque', 'Santa Barbara', 'Santa Maria',
          'Tetuan', 'Tugbungan', 'Zone I', 'Zone II', 'Zone III', 'Zone IV'
        ]
      },
      {
        code: 'PAG_CITY',
        name: 'Pagadian City',
        barangays: [
          'Balangasan', 'Bomba', 'Danlugan', 'Dumagoc', 'Kawit',
          'Lumbia', 'San Pedro', 'Santiago', 'Tiguma', 'Tuburan'
        ]
      }
    ]
  },
  {
    code: 'CDO',
    name: 'Cagayan de Oro',
    cities: [
      {
        code: 'CDO_CITY',
        name: 'Cagayan de Oro City',
        barangays: [
          'Agusan', 'Balulang', 'Carmen', 'Consolacion', 'Gusa',
          'Iponan', 'Kauswagan', 'Lapasan', 'Lumbia', 'Macabalan',
          'Macasandig', 'Nazareth', 'Patag', 'Puerto', 'Tablon'
        ]
      }
    ]
  },
  {
    code: 'BUKIDNON',
    name: 'Bukidnon',
    cities: [
      {
        code: 'MALAYBALAY',
        name: 'Malaybalay City',
        barangays: [
          'Aglayan', 'Bangcud', 'Casisang', 'Dalwangan', 'Kalasungay',
          'Linabo', 'Managok', 'Poblacion', 'San Jose', 'Santo Niño'
        ]
      },
      {
        code: 'VALENCIA',
        name: 'Valencia City',
        barangays: [
          'Bagontaas', 'Catumbalon', 'Guinoyoran', 'Lilingayon',
          'Lumbo', 'Mailag', 'Poblacion', 'San Carlos', 'Sugod',
          'Tongantongan'
        ]
      }
    ]
  },
  {
    code: 'GEN_SAN',
    name: 'General Santos',
    cities: [
      {
        code: 'GSC',
        name: 'General Santos City',
        barangays: [
          'Apopong', 'Baluan', 'Batomelong', 'Buayan', 'Calumpang',
          'City Heights', 'Conel', 'Dadiangas East', 'Dadiangas North',
          'Dadiangas South', 'Dadiangas West', 'Fatima', 'Katangawan',
          'Labangal', 'Lagao', 'Ligaya', 'Mabuhay', 'San Isidro',
          'San Jose', 'Siguel', 'Sinawal', 'Tambler', 'Tinagacan'
        ]
      }
    ]
  },
  {
    code: 'COTABATO',
    name: 'Cotabato',
    cities: [
      {
        code: 'KIDAPAWAN',
        name: 'Kidapawan City',
        barangays: [
          'Amazion', 'Amas', 'Balabag', 'Binoligan', 'Ginatilan',
          'Lanao', 'Linangkob', 'Macabolig', 'Magsaysay', 'Manongol',
          'Marbel', 'Mateo', 'Nuangan', 'Paco', 'Poblacion',
          'San Roque', 'Santo Niño', 'Sudapin'
        ]
      }
    ]
  },
  {
    code: 'ZAM_NOR',
    name: 'Zamboanga del Norte',
    cities: [
      {
        code: 'DIPOLOG',
        name: 'Dipolog City',
        barangays: [
          'Barra', 'Central', 'Dicayas', 'Diwan', 'Estaka',
          'Gulayon', 'Lugdungan', 'Minaog', 'Miputak', 'Punta',
          'San Jose', 'Santa Filomena', 'Santa Isabel', 'Sicayab',
          'Turno'
        ]
      },
      {
        code: 'DAPITAN',
        name: 'Dapitan City',
        barangays: [
          'Aliguay', 'Barcelona', 'Baylimango', 'Daro', 'Dawo',
          'Ilaya', 'Maria Cristina', 'Polo', 'Potol', 'San Pedro',
          'Sicayab Bocana', 'Taguilon', 'Talisay'
        ]
      }
    ]
  },
  {
    code: 'AGUSAN_NOR',
    name: 'Agusan del Norte',
    cities: [
      {
        code: 'BUTUAN',
        name: 'Butuan City',
        barangays: [
          'Agusan Pequeño', 'Ampayon', 'Anticala', 'Antongalon',
          'Baan KM 3', 'Baan Riverside', 'Babag', 'Bancasi',
          'Banza', 'Bayanihan', 'Buhangin', 'Doongan', 'Golden Ribbon',
          'Holy Redeemer', 'Limaha', 'Lumbocan', 'Mahogany',
          'Maibu', 'Mandamo', 'Masao', 'Obrero', 'Port Poyohon',
          'Tungao', 'Villa Kananga'
        ]
      },
      {
        code: 'CABADBARAN',
        name: 'Cabadbaran City',
        barangays: [
          'Calibunan', 'Comagascas', 'Katugasan', 'La Union',
          'Mabini', 'Poblacion 1', 'Poblacion 2', 'Poblacion 3',
          'Poblacion 4', 'Poblacion 5', 'Poblacion 6', 'Poblacion 7'
        ]
      }
    ]
  },
  {
    code: 'AGUSAN_SUR',
    name: 'Agusan del Sur',
    cities: [
      {
        code: 'BAYUGAN',
        name: 'Bayugan City',
        barangays: [
          'Calaitan', 'Charito', 'Fili', 'Gethsemane', 'Grace Estate',
          'Hamogaway', 'Katipunan', 'Maygatasan', 'Noli', 'Poblacion',
          'Salvacion', 'San Juan', 'Santa Irene', 'Taglatawan',
          'Taglibas', 'Villa Paz'
        ]
      }
    ]
  },
  {
    code: 'SURIGAO_NOR',
    name: 'Surigao del Norte',
    cities: [
      {
        code: 'SURIGAO_CITY',
        name: 'Surigao City',
        barangays: [
          'Alegria', 'Alipayo', 'Anomar', 'Bailongan', 'Bitaugan',
          'Bonifacio', 'Canlanipa', 'Cagniog', 'Danao', 'Day-asan',
          'Ipil', 'Lipata', 'Luna', 'Mabua', 'Nabago', 'Punta Bilar',
          'Rizal', 'San Juan', 'Taft', 'Trinidad', 'Washington'
        ]
      }
    ]
  },
  {
    code: 'SURIGAO_SUR',
    name: 'Surigao del Sur',
    cities: [
      {
        code: 'TANDAG',
        name: 'Tandag City',
        barangays: [
          'Awasian', 'Bagong Lungsod', 'Buenavista', 'Dagocdoc',
          'Mabuhay', 'Maitum', 'Pandanon', 'Rosario', 'San Agustin Sur',
          'San Antonio', 'San Jose', 'Telaje'
        ]
      },
      {
        code: 'BISLIG',
        name: 'Bislig City',
        barangays: [
          'Bucto', 'Coleto', 'Lawigan', 'Mabuhay', 'Maharlika',
          'Mangagoy', 'Pamanlinan', 'Poblacion', 'San Fernando',
          'Tabon'
        ]
      }
    ]
  },
  {
    code: 'LANAO_NOR',
    name: 'Lanao del Norte',
    cities: [
      {
        code: 'ILIGAN',
        name: 'Iligan City',
        barangays: [
          'Abuno', 'Acmac', 'Bagong Silang', 'Bonbonon', 'Bunawan',
          'Digkilaan', 'Hindang', 'Hinaplanon', 'Kabacsanan', 'Kalilangan',
          'Luinab', 'Mahayahay', 'Mainit', 'Mandulog', 'Maria Cristina',
          'Poblacion', 'Puga-an', 'Rogongon', 'San Miguel', 'San Roque',
          'Santa Elena', 'Santa Filomena', 'Santiago', 'Saray', 'Tibanga',
          'Tipanoy', 'Tubod', 'Upper Hinaplanon'
        ]
      }
    ]
  },
  {
    code: 'LANAO_SUR',
    name: 'Lanao del Sur',
    cities: [
      {
        code: 'MARAWI',
        name: 'Marawi City',
        barangays: [
          'Amito Marantao', 'Banggolo Poblacion', 'Bubong', 'Daguduban',
          'Dansalan', 'Datu Saber', 'Lilod Madaya', 'Lumbac Marinaut',
          'Matalin', 'Matampay', 'Norhaya Village', 'Panggao Saduc',
          'Raya Madaya', 'Sabala Amanao', 'Saber', 'Saduc Proper',
          'Tuca', 'Wawalayan Marinaut'
        ]
      }
    ]
  },
  {
    code: 'SOUTH_COT',
    name: 'South Cotabato',
    cities: [
      {
        code: 'KORONADAL',
        name: 'Koronadal City',
        barangays: [
          'Assumption', 'Avancena', 'Carpenter Hill', 'Concepcion',
          'General Paulino Santos', 'Mabini', 'Morales', 'New Pangasinan',
          'Paraiso', 'San Isidro', 'San Jose', 'Santa Cruz', 
          'Santo Niño', 'Zone I', 'Zone II', 'Zone III', 'Zone IV'
        ]
      },
      {
        code: 'TAMPAKAN',
        name: 'Tampakan',
        barangays: [
          'Kipalbig', 'Lambayong', 'Liberty', 'Maltana',
          'Poblacion', 'Palo', 'San Isidro', 'Tablu'
        ]
      }
    ]
  },
  {
    code: 'NORTH_COT',
    name: 'North Cotabato',
    cities: [
      {
        code: 'MLANG',
        name: 'M\'lang',
        barangays: [
          'Bagontapay', 'Bialong', 'Buayan', 'Dalipe', 'Dugong',
          'Gaunan', 'Langkong', 'Lepaga', 'Lika', 'Luna Norte',
          'Luna Sur', 'New Antique', 'New Consolacion', 'New Janiuay',
          'Poblacion', 'Pulang-lupa', 'Tawantawan'
        ]
      },
      {
        code: 'MIDSAYAP',
        name: 'Midsayap',
        barangays: [
          'Anonang', 'Bual', 'Central Glad', 'Damatulan', 'Kapinpilan',
          'Kadingilan', 'Lomopog', 'Malamote', 'Nabalawag', 'Olandang',
          'Poblacion 1', 'Poblacion 2', 'Poblacion 3', 'Poblacion 4',
          'Poblacion 5', 'Poblacion 6', 'Poblacion 7', 'Poblacion 8'
        ]
      }
    ]
  },
  {
    code: 'SULTAN_KUD',
    name: 'Sultan Kudarat',
    cities: [
      {
        code: 'TACURONG',
        name: 'Tacurong City',
        barangays: [
          'Baras', 'Buenaflor', 'Calean', 'Carmen', 'Griño',
          'New Carmen', 'New Isabela', 'Poblacion', 'San Emmanuel',
          'San Pablo', 'Upper Katungal'
        ]
      },
      {
        code: 'ISULAN',
        name: 'Isulan',
        barangays: [
          'Bambad', 'Dansuli', 'Impao', 'Kalawag I', 'Kalawag II',
          'Kalawag III', 'Kenram', 'Kudanding', 'Lagandang', 'Laguilayan',
          'Poblacion', 'Sampao'
        ]
      }
    ]
  },
  {
    code: 'MAGUINDANAO',
    name: 'Maguindanao',
    cities: [
      {
        code: 'COTABATO_CITY',
        name: 'Cotabato City',
        barangays: [
          'Bagua', 'Bagua I', 'Bagua II', 'Bagua III', 'Kalanganan', 'Kalanganan I', 'Kalanganan II', 'Poblacion', 'Poblacion I', 'Poblacion II',
          'Poblacion III', 'Poblacion IV', 'Poblacion IX', 'Poblacion V', 'Poblacion VI', 'Poblacion VII', 'Poblacion VIII', 'Rosary Heights', 'Rosary Heights I', 'Rosary Heights II',
          'Rosary Heights III', 'Rosary Heights IV', 'Rosary Heights V', 'Rosary Heights VI', 'Rosary Heights VII', 'Rosary Heights VIII', 'Rosary Heights IX', 'Rosary Heights X', 'Rosary Heights XI', 'Rosary Heights XII', 
          'Rosary Heights XIII', 'Tamontaka', 'Tamontaka I', 'Tamontaka II' , 'Tamontaka III', 'Tamontak IV', 'Tamontaka V'
        ]
      }
    ]
  },
  {
    code: 'SARANGANI',
    name: 'Sarangani',
    cities: [
      {
        code: 'ALABEL',
        name: 'Alabel',
        barangays: [
          'Alegria', 'Bagacay', 'Baluntay', 'Datal Anggas', 
          'Domolok', 'Kawas', 'Ladol', 'Maribulan', 'Pag-asa', 
          'Paraiso', 'Poblacion', 'Spring', 'Tokawal'
        ]
      },
      {
        code: 'GLAN',
        name: 'Glan',
        barangays: [
          'Baliton', 'Batulaki', 'Big Margus', 'Cablalan', 
          'Calabanit', 'Capatan', 'Cross', 'Datalbatong', 
          'Gumasa', 'Ilaya', 'Lago', 'Laguimit', 'Mudan', 
          'Nueva Era', 'Pangyan', 'Poblacion', 'Rio del Pilar', 
          'San Vicente', 'Small Margus', 'Taluya', 'Tango'
        ]
      }
    ]
  },
  {
    code: 'BASILAN',
    name: 'Basilan',
    cities: [
      {
        code: 'LAMITAN',
        name: 'Lamitan City',
        barangays: [
          'Baimbing', 'Balas', 'Bato', 'Boheyakan', 'Bohebaca',
          'Buahan', 'Calugusan', 'Campo Uno', 'Colonia', 'Kulay Bato',
          'Limo-ok', 'Lo-ok', 'Lubukan', 'Maganda', 'Malo-ong',
          'Matibay', 'Parangbasak', 'Sabong', 'Santa Clara', 'Tandung Ahas'
        ]
      },
      {
        code: 'ISABELA',
        name: 'Isabela City',
        barangays: [
          'Aguada', 'Baluno', 'Busay', 'Carbon', 'Isabela Proper',
          'Kapatagan Grande', 'Kapayawan', 'Kumalarang', 'La Piedad',
          'Lampinigan', 'Lanote', 'Lukbuton', 'Mabarung', 'Maligue',
          'Marketsite', 'Menzi', 'Panigayan', 'Panunsulan', 'Port Area',
          'Riverside', 'San Rafael', 'Santa Barbara', 'Santa Cruz',
          'Seaside', 'Sumagdang', 'Tabuk', 'Tabiawan'
        ]
      }
    ]
  }
]; 