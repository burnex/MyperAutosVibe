/* =========================================================
   Datos semilla (ficticios). Fechas relativas a "hoy".
   ========================================================= */
const pad=n=>String(n).padStart(2,'0');
const D=(n=0)=>{const d=new Date();d.setDate(d.getDate()+n);return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`};
const DT=(n,hm)=>`${D(n)}T${hm}`;

const STAGES=[
  {k:'recibido',n:'Recibido',c:'#6EC1E4'},
  {k:'diag',n:'En diagnóstico',c:'#312682'},
  {k:'aprob',n:'Esperando aprobación',c:'#F59E0B'},
  {k:'rep',n:'En reparación',c:'#2908F1'},
  {k:'cc',n:'Control de calidad',c:'#0EA5E9'},
  {k:'listo',n:'Listo para entrega',c:'#16A34A'},
  {k:'ent',n:'Entregado',c:'#6B7280'}
];
const AREAS={mec:'Mecánica',plan:'Planchado y pintura',det:'Detailing'};
const INSURERS=['Rímac','Pacífico','Mapfre','La Positiva','Qualitas','Interbank Seguros'];

const SERV=[
  {id:'S01',n:'Cambio de aceite y filtro',price:149,hrs:.75,area:'mec'},
  {id:'S02',n:'Mantenimiento preventivo 10,000 km',price:680,hrs:3,area:'mec'},
  {id:'S03',n:'Mantenimiento preventivo 20,000 km',price:890,hrs:4,area:'mec'},
  {id:'S04',n:'Scanner automotriz',price:80,hrs:.5,area:'mec'},
  {id:'S05',n:'Diagnóstico general',price:60,hrs:.5,area:'mec'},
  {id:'S06',n:'Frenos (mano de obra)',price:120,hrs:1.5,area:'mec'},
  {id:'S07',n:'Alineación y balanceo',price:90,hrs:1,area:'mec'},
  {id:'S08',n:'Suspensión (mano de obra)',price:220,hrs:2.5,area:'mec'},
  {id:'S09',n:'Afinamiento completo',price:160,hrs:2,area:'mec'},
  {id:'S10',n:'Sistema de refrigeración',price:150,hrs:2,area:'mec'},
  {id:'S11',n:'Cambio de embrague (mano de obra)',price:650,hrs:6,area:'mec'},
  {id:'S12',n:'Planchado (por panel)',price:450,hrs:6,area:'plan'},
  {id:'S13',n:'Pintura (por panel)',price:520,hrs:5,area:'plan'},
  {id:'S14',n:'Detailing completo',price:280,hrs:4,area:'det'},
  {id:'S15',n:'Pulido y encerado',price:180,hrs:3,area:'det'},
  {id:'S16',n:'Lavado interior y exterior',price:60,hrs:.75,area:'det'}
];

const TECHS=[
  {id:'t1',n:'Jorge Ramos',area:'mec',bays:['B1','B2']},
  {id:'t2',n:'Luis Paredes',area:'mec',bays:['B3','B4']},
  {id:'t3',n:'Miguel Soto',area:'mec',bays:['B1','B3'],esp:'Electrónica / Scanner'},
  {id:'t4',n:'Ricardo Huamán',area:'plan',bays:['P1'],esp:'Planchado'},
  {id:'t5',n:'Edgar Vilchez',area:'plan',bays:['P2'],esp:'Pintura'},
  {id:'t6',n:'Pedro Cano',area:'det',bays:['D1'],esp:'Detailing'}
];
const BAYS=['B1','B2','B3','B4','P1','P2','D1'];

const ROLES={
  gerencia:{n:'Gerencia',ic:'chart',home:'inicio',views:'*',desc:'Ve todo el negocio y sus números',who:'u5'},
  asesor:{n:'Asesor de servicio',ic:'user',home:'inicio',views:['inicio','tablero','agenda','recepcion','cotizaciones','entrega','clientes','recordatorios','encuestas','siniestros'],desc:'Recepción, cotización y entrega',who:'u1'},
  jefe:{n:'Jefe de taller',ic:'tool',home:'inicio',views:['inicio','tablero','agenda','cotizaciones','tecnico','siniestros','inventario'],desc:'Asigna técnico y bahía, destraba autos',who:'u2'},
  tecnico:{n:'Técnico',ic:'wrench',home:'tecnico',views:['tecnico'],desc:'Mis OT desde el celular',who:'u6'},
  almacen:{n:'Almacén',ic:'box',home:'inicio',views:['inicio','tablero','inventario'],desc:'Stock, compras y entrega de repuestos',who:'u3'},
  caja:{n:'Caja / Administración',ic:'cash',home:'inicio',views:['inicio','entrega','cobranza','siniestros'],desc:'Cobros, comprobantes y cuentas por cobrar',who:'u4'}
};

const USERS=[
  {id:'u1',n:'Christian Carbajal',role:'asesor',mail:'christian@galloautos.com',last:DT(0,'08:31'),on:true},
  {id:'u2',n:'Hugo Alarcón',role:'jefe',mail:'hugo@galloautos.com',last:DT(0,'08:12'),on:true},
  {id:'u3',n:'Rosa Medina',role:'almacen',mail:'rosa@galloautos.com',last:DT(0,'08:40'),on:true},
  {id:'u4',n:'Karen Díaz',role:'caja',mail:'karen@galloautos.com',last:DT(-1,'17:50'),on:true},
  {id:'u5',n:'Patricia Vega',role:'gerencia',mail:'patricia@galloautos.com',last:DT(-1,'19:02'),on:true},
  {id:'u6',n:'Jorge Ramos',role:'tecnico',tech:'t1',mail:'jorge@galloautos.com',last:DT(0,'08:05'),on:true},
  {id:'u7',n:'Luis Paredes',role:'tecnico',tech:'t2',mail:'luis@galloautos.com',last:DT(0,'08:20'),on:true},
  {id:'u8',n:'Ex-colaborador (cuenta anterior)',role:'asesor',mail:'practicante@galloautos.com',last:DT(-60,'10:10'),on:false}
];

const SUPPLIERS=[
  {id:'p1',n:'Repuestos Lima Norte SAC',ruc:'20512345671',tel:'01 523 4410',lead:1,rate:4.6,cat:'Repuestos multimarca'},
  {id:'p2',n:'Autopartes del Sur EIRL',ruc:'20498765432',tel:'01 478 9920',lead:2,rate:4.1,cat:'Frenos y suspensión'},
  {id:'p3',n:'Pinturas Andina SAC',ruc:'20601234567',tel:'01 612 0034',lead:1,rate:4.8,cat:'Pintura y planchado'},
  {id:'p4',n:'Lubricantes Perú SA',ruc:'20100998877',tel:'01 224 7788',lead:1,rate:4.4,cat:'Aceites y filtros'},
  {id:'p5',n:'Importaciones Kia Parts',ruc:'20555123890',tel:'01 330 5521',lead:5,rate:3.9,cat:'Originales Kia/Hyundai'}
];

// sku,name,cat,brand,cost,price,stock,min,loc,sup
const P=(sku,name,cat,brand,cost,price,stock,min,loc,sup,res=0)=>({sku,name,cat,brand,cost,price,stock,min,loc,sup,res});
const PARTS=[
  P('ACE-5W30','Aceite sintético 5W-30 (litro)','Lubricantes','Mobil',28,42,64,40,'A-01','p4'),
  P('FIL-ACE-KIA','Filtro de aceite Kia/Hyundai','Filtros','Mann',14,28,12,10,'A-02','p4'),
  P('FIL-ACE-TOY','Filtro de aceite Toyota','Filtros','Denso',15,30,9,10,'A-02','p4'),
  P('FIL-AIR-CER','Filtro de aire Cerato','Filtros','Mann',22,45,5,4,'A-03','p1'),
  P('FIL-POL-CER','Filtro de polen Cerato','Filtros','Mann',35,80,2,3,'A-03','p1'),
  P('FIL-COMB','Filtro de combustible universal','Filtros','Wix',16,35,10,5,'A-03','p1'),
  P('BUJ-NGK','Bujías NGK iridium (juego x4)','Motor','NGK',90,160,6,4,'B-01','p1'),
  P('EMP-TV-CER','Empaque tapa de válvulas Cerato','Motor','Original Kia',95,180,3,2,'B-02','p5'),
  P('COR-DIS-TUC','Kit de distribución Tucson','Motor','Gates',220,410,2,1,'B-03','p1'),
  P('KIT-EMB-CER','Kit de embrague Cerato','Transmisión','Valeo',780,1250,1,1,'B-04','p2'),
  P('PAS-DEL-YAR','Pastillas de freno delanteras Yaris','Frenos','Brembo',85,170,3,2,'C-01','p2'),
  P('DIS-DEL-YAR','Discos de freno delanteros Yaris (par)','Frenos','Brembo',180,340,0,2,'C-02','p2'),
  P('LIQ-FRE','Líquido de frenos DOT 4 (500 ml)','Frenos','Bosch',12,25,18,8,'C-03','p2'),
  P('AMO-DEL-ACC','Amortiguador delantero Accent (par)','Suspensión','Monroe',280,520,0,2,'C-04','p2',2),
  P('TER-DIR','Terminales de dirección universal','Suspensión','TRW',45,90,8,4,'C-05','p2'),
  P('REF-COOL','Refrigerante 50/50 (galón)','Fluidos','Prestone',24,45,11,6,'D-01','p4'),
  P('BAT-60','Batería 60 Ah','Eléctrico','Bosch',260,390,4,2,'D-02','p1'),
  P('NEB-LED','Juego LED neblineros','Eléctrico','Philips',210,420,2,2,'D-03','p1'),
  P('ESC-LIM','Escobillas limpiaparabrisas (par)','Accesorios','Bosch',18,40,14,6,'D-04','p1'),
  P('PIN-BASE','Pintura base metálica (litro)','Pintura','PPG',85,140,12,8,'E-01','p3'),
  P('BAR-2K','Barniz 2K (litro)','Pintura','PPG',70,110,7,6,'E-02','p3'),
  P('MAS-PL','Masilla plástica (kg)','Pintura','Sika',22,40,9,5,'E-03','p3'),
  P('LIJ-P800','Lija al agua P800 (pliego)','Pintura','3M',2,4,120,60,'E-04','p3'),
  P('PUL-SET','Kit pulido (compuesto + cera)','Detailing','3M',40,70,9,4,'F-01','p3')
];

const V=(plate,brand,model,year,color,km,client,lastDate,lastKm,every)=>({plate,brand,model,year,color,km,client,lastDate,lastKm,every});
const CLIENTS=[
  {id:'c1',n:'Bruno Sánchez',type:'particular',tel:'997 572 221',mail:'bruno@mail.com',since:2019,note:'Prefiere WhatsApp. Cliente desde 2019.'},
  {id:'c2',n:'María Torres',type:'particular',tel:'987 114 302',mail:'mtorres@mail.com',since:2022,note:''},
  {id:'c3',n:'Carlos Quispe',type:'particular',tel:'955 220 671',mail:'cquispe@mail.com',since:2023,note:'Pregunta mucho por garantía.'},
  {id:'c4',n:'Lucía Fernández',type:'seguro',tel:'944 880 123',mail:'lfernandez@mail.com',since:2026,note:'Asegurada Rímac'},
  {id:'c5',n:'Andrés Villanueva',type:'seguro',tel:'933 410 877',mail:'avillanueva@mail.com',since:2026,note:'Asegurado Pacífico'},
  {id:'c6',n:'Transportes Andina SAC',type:'flota',tel:'01 345 8890',mail:'flota@tandina.pe',since:2021,note:'Facturación a 30 días. Descuento pactado 10%.',disc:10,credit:30},
  {id:'c7',n:'Distribuidora La Molina SAC',type:'flota',tel:'01 349 1120',mail:'logistica@dlm.pe',since:2023,note:'Descuento pactado 8%.',disc:8,credit:15},
  {id:'c8',n:'Patricia Ríos',type:'particular',tel:'976 555 018',mail:'prios@mail.com',since:2021,note:''},
  {id:'c9',n:'Jorge Medina',type:'particular',tel:'966 301 774',mail:'jmedina@mail.com',since:2024,note:''},
  {id:'c10',n:'Rosa Campos',type:'particular',tel:'922 118 540',mail:'rcampos@mail.com',since:2020,note:''},
  {id:'c11',n:'Edwin Vargas',type:'particular',tel:'988 764 310',mail:'evargas@mail.com',since:2022,note:'No vuelve hace meses.'},
  {id:'c12',n:'Cristina Alva',type:'particular',tel:'977 245 009',mail:'calva@mail.com',since:2021,note:'Dejó 5 estrellas en Google.'}
];
const VEHICLES=[
  V('ADI-388','Kia','Cerato',2014,'Blanco',100523,'c1',DT(-9,'11:36').slice(0,10),100523,10000),
  V('BMK-512','Toyota','Yaris',2019,'Gris',48200,'c2',D(-200),44000,10000),
  V('CPL-204','Hyundai','Tucson',2017,'Negro',72100,'c3',D(-150),68000,10000),
  V('D3F-771','Chevrolet','Sail',2018,'Rojo',61000,'c4',D(-300),55000,10000),
  V('FRT-905','Kia','Rio',2020,'Azul',39000,'c5',D(-20),38000,10000),
  V('X7K-310','Toyota','Hilux',2021,'Blanco',98400,'c6',D(-40),88000,10000),
  V('X7K-311','Toyota','Hilux',2021,'Blanco',91800,'c6',D(-35),82000,10000),
  V('H2L-452','Toyota','Hiace',2019,'Blanco',142000,'c6',D(-190),132000,10000),
  V('NFR-228','Nissan','Frontier',2020,'Plata',84000,'c7',D(-3),84000,10000),
  V('H1A-663','Hyundai','H100',2018,'Blanco',117000,'c7',D(-100),110000,10000),
  V('CX5-118','Mazda','CX-5',2021,'Rojo',45800,'c8',D(-170),40000,10000),
  V('SWF-390','Suzuki','Swift',2016,'Plomo',88900,'c9',D(-80),85000,5000),
  V('ACC-447','Hyundai','Accent',2015,'Plata',121000,'c10',D(-60),117000,5000),
  V('VRS-880','Nissan','Versa',2017,'Blanco',79000,'c11',D(-250),72000,10000),
  V('COR-361','Toyota','Corolla',2016,'Negro',96000,'c12',D(-215),90000,10000)
];

let _id=0;
const it=(k,desc,price,qty=1,sku=null,st='base',ap=true,extra={})=>({id:'i'+(++_id),k,desc,price,qty,sku,st,ap,rs:'',...extra});
const sem=(c,n,s,note='')=>({c,n,s,note});
const INSP_TPL=[
  ['Motor','Nivel y estado de aceite'],['Motor','Fugas de aceite / empaques'],['Motor','Correas y mangueras'],['Motor','Filtro de aire'],['Motor','Batería y bornes'],
  ['Frenos','Pastillas delanteras'],['Frenos','Discos / tambores'],['Frenos','Líquido de frenos'],
  ['Suspensión y dirección','Amortiguadores'],['Suspensión y dirección','Terminales y rótulas'],['Suspensión y dirección','Bieletas y bujes'],
  ['Llantas','Desgaste y presión'],['Llantas','Alineación (desgaste irregular)'],
  ['Luces y eléctrico','Luces delanteras y neblineros'],['Luces y eléctrico','Luces posteriores / freno'],['Luces y eléctrico','Limpiaparabrisas'],
  ['Fluidos','Refrigerante'],['Fluidos','Líquido de dirección'],['Interior','Aire acondicionado / filtro de polen'],['Interior','Timón, pedales, tapizado']
];
const mkInsp=(over={})=>INSP_TPL.map(([c,n])=>({c,n,s:over[n]||'ok',note:''}));

const OTS=[
 {id:'071102',plate:'ADI-388',client:'c1',svc:'Mantenimiento 10,000 km + embrague',area:'mec',stage:'aprob',tech:'t1',bay:'B2',created:DT(-3,'11:36'),promised:D(1),km:100523,fuel:50,asesor:'u1',
  note:'Ruido en llanta delantera izquierda al frenar. Revisar luces.',objs:'Documentos, Llanta de repuesto, Gata y llave',quote:'enviada',quoteAt:DT(0,'10:02'),
  hist:[{k:'recibido',t:DT(-3,'11:36')},{k:'diag',t:DT(-3,'12:05')},{k:'aprob',t:DT(0,'10:02')}],
  items:[it('S','Mantenimiento 10,000 km',680,1,null,'base',true,{why:'Aceite sintético y filtro, filtro de aire, limpieza de obturador, afinamiento, frenos, luces y niveles, lavado y aspirado.'}),
         it('R','Kit de embrague (incluye mano de obra)',1890,1,'KIT-EMB-CER','base',true,{rs:'entregado',why:'Disco, plato y collarín nuevos.',done:DT(-1,'09:56')}),
         it('S','Forro de timón',380,1,null,'base',true,{img:'timon',why:'El timón estaba desgastado.'}),
         it('S','Empaque de tapa de válvulas (incluye mano de obra)',580,1,'EMP-TV-CER','adic',null,{urg:'bad',media:'emp',why:'Hay fuga de aceite: la presión del motor lo empuja hacia afuera por el empaque, que ya está endurecido. Si gotea sobre el escape puede generar humo.'}),
         it('R','Filtro de polen del aire acondicionado',160,1,'FIL-POL-CER','adic',null,{urg:'warn',media:'pol',why:'Filtra el aire que respiras dentro del auto. Está saturado de polvo y hojas.'}),
         it('R','Juego de luces LED para neblineros',680,1,'NEB-LED','adic',null,{urg:'opt',img:'neb',why:'El neblinero delantero izquierdo está quemado. Si prefieres, puedes traer el repuesto y lo instalamos.'})],
  insp:mkInsp({'Fugas de aceite / empaques':'bad','Aire acondicionado / filtro de polen':'warn','Luces delanteras y neblineros':'warn','Timón, pedales, tapizado':'warn','Alineación (desgaste irregular)':'warn'}),
  photos:[{lbl:'Frente',t:DT(-3,'11:38'),ing:1},{lbl:'Lateral izquierdo',t:DT(-3,'11:39'),ing:1},{lbl:'Tablero (100,523 km)',t:DT(-3,'11:40'),ing:1},{lbl:'Forro de timón',t:DT(-3,'11:45'),img:'timon',ing:1},{lbl:'Neblinero quemado',t:DT(-1,'12:17'),img:'neb'},{lbl:'Fuga de aceite (video 0:15)',t:DT(0,'10:02'),media:'emp'}],
  log:[{t:DT(-3,'11:36'),who:'Christian Carbajal',txt:'Recibimos tu auto y firmaste la hoja de recepción.',pub:1},{t:DT(-3,'12:10'),who:'Jorge Ramos',txt:'Empezamos a cambiar el embrague.',pub:1},{t:DT(-1,'09:56'),who:'Jorge Ramos',txt:'Terminamos de cambiar el embrague. Ahora seguimos con el mantenimiento.',pub:1},{t:DT(-1,'12:17'),who:'Jorge Ramos',txt:'Encontramos que el neblinero delantero izquierdo está quemado.',pub:1},{t:DT(0,'10:02'),who:'Christian Carbajal',txt:'Encontramos 3 cosas más en tu auto. Te mandamos fotos para que decidas.',pub:1}],doc:'boleta'},
 {id:'071108',plate:'BMK-512',client:'c2',svc:'Frenos: pastillas y discos delanteros',area:'mec',stage:'diag',tech:'t2',bay:'B3',created:DT(0,'08:45'),promised:D(1),km:48200,fuel:25,asesor:'u1',
  note:'Chirrido al frenar y vibración en el timón.',quote:'borrador',
  items:[it('S','Frenos (mano de obra)',120),it('R','Pastillas de freno delanteras Yaris',170,1,'PAS-DEL-YAR','adic',null),it('R','Discos de freno delanteros Yaris (par)',340,1,'DIS-DEL-YAR','adic',null)],
  insp:mkInsp(),photos:[{lbl:'Recepción: frente',t:DT(0,'08:47')}],log:[{t:DT(0,'08:45'),who:'Christian Carbajal',txt:'Vehículo recibido.'},{t:DT(0,'09:20'),who:'Luis Paredes',txt:'Iniciado diagnóstico de frenos.'}],doc:'boleta'},
 {id:'071109',plate:'CPL-204',client:'c3',svc:'Scanner + luz check engine',area:'mec',stage:'aprob',tech:'t3',bay:'B1',created:DT(-3,'10:10'),promised:D(1),km:72100,fuel:75,asesor:'u1',
  note:'Se prende la luz del motor y pierde fuerza en subida.',quote:'enviada',quoteAt:DT(-2,'16:30'),
  items:[it('S','Scanner automotriz',80),it('S','Afinamiento completo',160,1,null,'adic',null),it('R','Bujías NGK iridium (juego x4)',160,1,'BUJ-NGK','adic',null),it('R','Filtro de combustible universal',35,1,'FIL-COMB','adic',null)],
  insp:mkInsp({'Motor':'ok','Correas y mangueras':'warn'}),photos:[{lbl:'Códigos de falla P0300',t:DT(-3,'11:20')}],log:[{t:DT(-3,'10:10'),who:'Christian Carbajal',txt:'Vehículo recibido.'},{t:DT(-3,'11:20'),who:'Miguel Soto',txt:'Scanner: P0300 (fallo de encendido). Cotización enviada.'},{t:DT(-2,'16:30'),who:'Christian Carbajal',txt:'Cotización enviada al cliente. Sin respuesta.'}],doc:'boleta'},
 {id:'071105',plate:'X7K-310',client:'c6',svc:'Mantenimiento 40,000 km (flota)',area:'mec',stage:'cc',tech:'t2',bay:'B4',created:DT(-1,'08:30'),promised:D(0),km:98400,fuel:50,asesor:'u1',
  note:'Unidad de reparto. Entrega hoy 17:00.',quote:'aprobada',
  items:[it('S','Mantenimiento preventivo 20,000 km',890),it('R','Filtro de aceite Toyota',30,1,'FIL-ACE-TOY','base',true,{rs:'entregado'}),it('R','Aceite sintético 5W-30 (litro)',42,5,'ACE-5W30','base',true,{rs:'entregado'})],
  insp:mkInsp({'Llantas':'warn'}),photos:[],log:[{t:DT(-1,'08:30'),who:'Christian Carbajal',txt:'Unidad de flota recibida.'},{t:DT(0,'10:40'),who:'Luis Paredes',txt:'Mantenimiento terminado. Pasa a control de calidad.'}],doc:'factura',disc:10},
 {id:'071100',plate:'NFR-228',client:'c7',svc:'Cambio de aceite + alineación',area:'mec',stage:'listo',tech:'t1',bay:'B1',created:DT(-4,'09:00'),promised:D(-3),listoAt:DT(-3,'16:40'),km:84000,fuel:25,asesor:'u1',
  note:'',quote:'aprobada',
  items:[it('S','Cambio de aceite y filtro',149),it('S','Alineación y balanceo',90),it('R','Aceite sintético 5W-30 (litro)',42,6,'ACE-5W30','base',true,{rs:'entregado'}),it('R','Filtro de aceite Kia/Hyundai',28,1,'FIL-ACE-KIA','base',true,{rs:'entregado'})],
  insp:mkInsp(),photos:[],log:[{t:DT(-4,'09:00'),who:'Christian Carbajal',txt:'Recibido.'},{t:DT(-3,'16:40'),who:'Jorge Ramos',txt:'Terminado y aprobado por control de calidad. Cliente avisado.'}],doc:'factura',disc:8},
 {id:'071110',plate:'D3F-771',client:'c4',svc:'Siniestro: parachoque y puerta',area:'plan',stage:'rep',tech:'t4',bay:'P1',created:DT(-6,'10:00'),promised:D(3),km:61000,fuel:25,asesor:'u1',claim:'S-01',
  note:'Choque lateral. Proceso con aseguradora.',quote:'aprobada',
  items:[it('S','Planchado (por panel) · parachoque',450),it('S','Planchado (por panel) · puerta',450),it('S','Pintura (por panel) · parachoque',520),it('S','Pintura (por panel) · puerta',520),it('R','Pintura base metálica (litro)',140,2,'PIN-BASE','base',true,{rs:'entregado'}),it('R','Barniz 2K (litro)',110,1,'BAR-2K','base',true,{rs:'reservado'}),it('R','Masilla plástica (kg)',40,2,'MAS-PL','base',true,{rs:'entregado'})],
  insp:mkInsp(),photos:[{lbl:'Daño lateral',t:DT(-6,'10:05')},{lbl:'Parachoque',t:DT(-6,'10:06')}],log:[{t:DT(-6,'10:00'),who:'Christian Carbajal',txt:'Recibido por siniestro Rímac.'},{t:DT(-3,'12:00'),who:'Christian Carbajal',txt:'Aseguradora autorizó presupuesto.'},{t:DT(-1,'15:00'),who:'Ricardo Huamán',txt:'Planchado terminado. Pasa a preparación y pintura.'}],doc:'factura'},
 {id:'071111',plate:'FRT-905',client:'c5',svc:'Siniestro: lateral derecho',area:'plan',stage:'aprob',tech:'t5',bay:'P2',created:DT(-2,'11:00'),promised:D(6),km:39000,fuel:50,asesor:'u1',claim:'S-02',
  note:'Esperando autorización de Pacífico.',quote:'enviada',quoteAt:DT(-1,'09:00'),
  items:[it('S','Planchado (por panel) · puerta posterior',450,1,null,'adic',null),it('S','Pintura (por panel) · puerta posterior',520,1,null,'adic',null),it('S','Pintura (por panel) · guardafango',520,1,null,'adic',null),it('R','Pintura base metálica (litro)',140,2,'PIN-BASE','adic',null)],
  insp:mkInsp(),photos:[{lbl:'Lateral derecho',t:DT(-2,'11:05')}],log:[{t:DT(-2,'11:00'),who:'Christian Carbajal',txt:'Recibido por siniestro Pacífico.'},{t:DT(-1,'09:00'),who:'Christian Carbajal',txt:'Presupuesto enviado a la aseguradora.'}],doc:'factura'},
 {id:'071112',plate:'CX5-118',client:'c8',svc:'Detailing completo + pulido',area:'det',stage:'rep',tech:'t6',bay:'D1',created:DT(0,'09:00'),promised:D(0),km:45800,fuel:50,asesor:'u1',
  note:'Pulido de capó y techo.',quote:'aprobada',
  items:[it('S','Detailing completo',280),it('S','Pulido y encerado',180),it('R','Kit pulido (compuesto + cera)',70,1,'PUL-SET','base',true,{rs:'entregado'})],
  insp:mkInsp(),photos:[],log:[{t:DT(0,'09:00'),who:'Christian Carbajal',txt:'Recibido.'}],doc:'boleta'},
 {id:'071113',plate:'SWF-390',client:'c9',svc:'Cambio de aceite',area:'mec',stage:'recibido',tech:null,bay:null,created:DT(0,'09:35'),promised:D(0),km:88900,fuel:25,asesor:'u1',
  note:'',quote:'borrador',
  items:[it('S','Cambio de aceite y filtro',149),it('R','Aceite sintético 5W-30 (litro)',42,4,'ACE-5W30'),it('R','Filtro de aceite Kia/Hyundai',28,1,'FIL-ACE-KIA')],
  insp:mkInsp(),photos:[],log:[{t:DT(0,'09:35'),who:'Christian Carbajal',txt:'Vehículo recibido (cita 9:30).'}],doc:'boleta'},
 {id:'071098',plate:'ACC-447',client:'c10',svc:'Suspensión: amortiguadores delanteros',area:'mec',stage:'rep',tech:'t2',bay:'B3',created:DT(-5,'10:15'),promised:D(-2),km:121000,fuel:25,asesor:'u1',
  note:'Golpetea en baches.',quote:'aprobada',blocked:'Falta repuesto: amortiguadores delanteros (llegan mañana)',
  items:[it('S','Suspensión (mano de obra)',220),it('R','Amortiguador delantero Accent (par)',520,1,'AMO-DEL-ACC','base',true,{rs:'sin stock'})],
  insp:mkInsp({'Amortiguadores':'bad'}),photos:[{lbl:'Amortiguador con fuga',t:DT(-5,'11:00')}],log:[{t:DT(-5,'10:15'),who:'Christian Carbajal',txt:'Recibido.'},{t:DT(-4,'12:00'),who:'Luis Paredes',txt:'Pedido de repuesto: sin stock. Compra a Autopartes del Sur.'}],doc:'boleta'}
];
// Historial entregado (para ingresos, CRM y encuestas)
const H=(id,plate,client,svc,area,daysAgo,total,tech,doc='boleta',extra={})=>({id,plate,client,svc,area,stage:'ent',tech,bay:null,created:DT(-daysAgo-1,'09:00'),promised:D(-daysAgo),entAt:DT(-daysAgo,'17:00'),km:0,fuel:50,asesor:'u1',note:'',quote:'aprobada',items:[it('S',svc,total)],insp:[],photos:[],log:[{t:DT(-daysAgo,'17:00'),who:'Christian Carbajal',txt:'Vehículo entregado y cobrado.',pub:1}],doc,paid:true,pay:'Yape',...extra});
OTS.push(
 H('071070','FRT-905','c5','Mantenimiento 30,000 km','mec',20,780,'t1'),
 H('071074','X7K-310','c6','Mantenimiento 30,000 km (flota)','mec',40,1450,'t2','factura',{pay:'Crédito 30 días',disc:10}),
 H('071077','X7K-311','c6','Mantenimiento 30,000 km (flota)','mec',35,1450,'t2','factura',{pay:'Crédito 30 días',disc:10}),
 H('071081','SWF-390','c9','Frenos delanteros','mec',80,620,'t1'),
 H('071083','ACC-447','c10','Mantenimiento 20,000 km','mec',60,890,'t2'),
 H('071088','H1A-663','c7','Mantenimiento 100,000 km (flota)','mec',100,2100,'t3','factura',{pay:'Crédito 15 días',disc:8}),
 H('071091','CX5-118','c8','Pintura de capó','plan',170,1250,'t5','boleta',{pay:'Tarjeta'}),
 H('071093','BMK-512','c2','Cambio de aceite','mec',200,210,'t1',  'boleta',{pay:'Efectivo'}),
 H('071095','CPL-204','c3','Suspensión','mec',150,1480,'t1','boleta',{pay:'Transferencia'}),
 H('071096','COR-361','c12','Mantenimiento 90,000 km','mec',215,980,'t2','boleta',{pay:'Tarjeta'}),
 H('071101','D3F-771','c4','Cambio de aceite','mec',300,190,'t2','boleta',{pay:'Efectivo'}),
 H('071103','H2L-452','c6','Frenos y suspensión (flota)','mec',190,2650,'t2','factura',{pay:'Crédito 30 días',disc:10}),
 H('071104','VRS-880','c11','Mantenimiento 70,000 km','mec',250,870,'t1','boleta',{pay:'Efectivo'}),
 H('071106','NFR-228','c7','Cambio de aceite','mec',3,310,'t1','factura',{pay:'Crédito 15 días',disc:8}),
 H('071107','ADI-388','c1','Detailing + lavado','det',14,340,'t6','boleta',{pay:'Yape'})
);

const MONTHS_REV=[ // ingresos de meses previos (mock) para el gráfico
  {m:'May',v:48200,t:176},{m:'Jun',v:51400,t:183},{m:'Jul',v:46900,t:171},{m:'Ago',v:55800,t:196},{m:'Set',v:58300,t:201}
];
const APPTS=[
 {id:'a1',date:D(0),hour:'08:30',plate:'BMK-512',client:'María Torres',svc:'Frenos',status:'llego',src:'Web'},
 {id:'a2',date:D(0),hour:'09:30',plate:'SWF-390',client:'Jorge Medina',svc:'Cambio de aceite',status:'llego',src:'Web'},
 {id:'a3',date:D(0),hour:'11:00',plate:'CRV-562',client:'Ricardo Cárdenas',svc:'Scanner',status:'pend',src:'Web'},
 {id:'a4',date:D(0),hour:'14:30',plate:'VRS-880',client:'Edwin Vargas',svc:'Mantenimiento 10,000 km',status:'pend',src:'Teléfono'},
 {id:'a5',date:D(0),hour:'16:00',plate:'COR-361',client:'Cristina Alva',svc:'Alineación y balanceo',status:'pend',src:'Web'},
 {id:'a6',date:D(1),hour:'08:30',plate:'H2L-452',client:'Transportes Andina SAC',svc:'Mantenimiento 150,000 km',status:'pend',src:'Teléfono'},
 {id:'a7',date:D(1),hour:'10:00',plate:'ADI-388',client:'Bruno Sánchez',svc:'Entrega programada',status:'pend',src:'Mi Auto'},
 {id:'a8',date:D(1),hour:'15:00',plate:'ABC-123',client:'Nuevo cliente',svc:'Diagnóstico general',status:'pend',src:'Web'},
 {id:'a9',date:D(2),hour:'09:00',plate:'CX5-118',client:'Patricia Ríos',svc:'Cambio de aceite',status:'pend',src:'Mi Auto'},
 {id:'a10',date:D(2),hour:'11:30',plate:'H1A-663',client:'Distribuidora La Molina SAC',svc:'Frenos',status:'pend',src:'Teléfono'},
 {id:'a11',date:D(3),hour:'10:00',plate:'FRT-905',client:'Andrés Villanueva',svc:'Revisión post-siniestro',status:'pend',src:'Mi Auto'},
 {id:'a12',date:D(-1),hour:'10:00',plate:'ZZZ-000',client:'Cliente sin aviso',svc:'Cambio de aceite',status:'noshow',src:'Web'}
];

const CLAIMS=[
 {id:'S-01',ins:'Rímac',no:'RIM-2026-448812',proc:'Marco Delgado',plate:'D3F-771',client:'c4',ot:'071110',status:'rep',budget:2680,auth:2680,ded:350,created:D(-6),authAt:D(-3),promisedIns:D(3),docs:['Denuncia policial','Fotos de daño','Carta de autorización']},
 {id:'S-02',ins:'Pacífico',no:'PAC-0077-2026-9921',proc:'Elena Núñez',plate:'FRT-905',client:'c5',ot:'071111',status:'presup',budget:1810,auth:0,ded:300,created:D(-2),authAt:null,promisedIns:D(6),docs:['Fotos de daño']},
 {id:'S-03',ins:'Mapfre',no:'MAP-2026-33410',proc:'Carlos Ibáñez',plate:'ABC-777',client:null,clientN:'Mónica Salas',ot:null,status:'ingreso',budget:0,auth:0,ded:250,created:D(0),authAt:null,promisedIns:D(9),docs:[]},
 {id:'S-04',ins:'La Positiva',no:'LAP-2026-11870',proc:'Fiorella Cruz',plate:'KLM-209',client:null,clientN:'Raúl Domínguez',ot:null,status:'perito',budget:3240,auth:0,ded:400,created:D(-4),authAt:null,promisedIns:D(8),docs:['Fotos de daño','Denuncia policial']},
 {id:'S-05',ins:'Qualitas',no:'QUA-2026-55120',proc:'Jorge Salazar',plate:'TRB-432',client:null,clientN:'Ana Lozano',ot:null,status:'fact',budget:1950,auth:1950,ded:300,created:D(-25),authAt:D(-20),promisedIns:D(-12),docs:['Carta de autorización','Acta de conformidad']}
];
const CLAIM_ST=[['ingreso','Ingresado'],['perito','Inspección perito'],['presup','Presupuesto enviado'],['aut','Autorizado'],['rep','En reparación'],['ent','Entregado'],['fact','Facturado']];

const RECV=[ // cuentas por cobrar
 {id:'r1',doc:'F001-000231',client:'Transportes Andina SAC',amt:1305,date:D(-40),due:D(-10),paid:false,type:'flota'},
 {id:'r2',doc:'F001-000236',client:'Transportes Andina SAC',amt:1305,date:D(-35),due:D(-5),paid:false,type:'flota'},
 {id:'r3',doc:'F001-000244',client:'Distribuidora La Molina SAC',amt:1932,date:D(-100),due:D(-85),paid:false,type:'flota'},
 {id:'r4',doc:'F001-000239',client:'Transportes Andina SAC',amt:2385,date:D(-190),due:D(-160),paid:true,type:'flota'},
 {id:'r5',doc:'F001-000250',client:'Distribuidora La Molina SAC',amt:285,date:D(-3),due:D(12),paid:false,type:'flota'},
 {id:'r6',doc:'F001-000241',client:'Rímac Seguros',amt:1950,date:D(-20),due:D(10),paid:false,type:'seguro'},
 {id:'r7',doc:'F001-000228',client:'Mapfre',amt:2880,date:D(-75),due:D(-45),paid:false,type:'seguro'}
];

const SURVEYS=[
 {ot:'071107',nps:10,txt:'Quedó impecable el auto, súper rápido.',g:true},
 {ot:'071070',nps:9,txt:'Me avisaron todo por WhatsApp.',g:true},
 {ot:'071083',nps:7,txt:'Buen trabajo pero demoraron un día más de lo prometido.',g:false},
 {ot:'071081',nps:4,txt:'El cobro final fue distinto al presupuesto inicial.',g:false},
 {ot:'071095',nps:10,txt:'Muy profesionales, me explicaron cada repuesto.',g:true}
];

const KARDEX0=[
 {t:DT(-3,'09:10'),sku:'ACE-5W30',type:'salida',qty:6,ref:'OT 071100',who:'Rosa Medina'},
 {t:DT(-3,'09:10'),sku:'FIL-ACE-KIA',type:'salida',qty:1,ref:'OT 071100',who:'Rosa Medina'},
 {t:DT(-2,'11:30'),sku:'ACE-5W30',type:'entrada',qty:40,ref:'OC-0012 · Lubricantes Perú',who:'Rosa Medina'},
 {t:DT(-1,'10:05'),sku:'PIN-BASE',type:'salida',qty:2,ref:'OT 071110',who:'Rosa Medina'},
 {t:DT(-1,'10:05'),sku:'MAS-PL',type:'salida',qty:2,ref:'OT 071110',who:'Rosa Medina'},
 {t:DT(0,'08:55'),sku:'PUL-SET',type:'salida',qty:1,ref:'OT 071112',who:'Rosa Medina'},
 {t:DT(0,'09:00'),sku:'AMO-DEL-ACC',type:'reserva',qty:2,ref:'OT 071098 (sin stock)',who:'Sistema'},
 {t:DT(-6,'15:00'),sku:'LIJ-P800',type:'ajuste',qty:-4,ref:'Inventario cíclico',who:'Rosa Medina'}
];
const POS0=[
 {id:'OC-0013',sup:'p2',date:D(0),eta:D(1),st:'enviada',lines:[{sku:'AMO-DEL-ACC',qty:2,cost:280}]},
 {id:'OC-0012',sup:'p4',date:D(-3),eta:D(-2),st:'recibida',lines:[{sku:'ACE-5W30',qty:40,cost:28}]}
];
const WA0=[
 {t:DT(-2,'16:30'),to:'Carlos Quispe',tel:'955 220 671',txt:'Hola Carlos, te enviamos la cotización de tu Hyundai Tucson (CPL-204). Revísala y apruébala en Mi Auto: galloautos.com/miauto',kind:'cotización'},
 {t:DT(-3,'16:40'),to:'Distribuidora La Molina SAC',tel:'01 349 1120',txt:'Tu Nissan Frontier (NFR-228) está listo para recoger. Recuerda: pasadas 48 h se cobra guardianía de US$ 10 por día.',kind:'listo'},
 {t:DT(-1,'09:00'),to:'María Torres',tel:'987 114 302',txt:'Hola María, te esperamos mañana a las 8:30 con tu Toyota Yaris. ¡Gracias por agendar!',kind:'recordatorio cita'}
];
const NOTIFS0=[
 {id:'n1',t:DT(0,'08:00'),ic:'alert',lvl:'bad',txt:'OT 071098 (ACC-447) está atrasada 2 días: falta repuesto.',view:'tablero'},
 {id:'n2',t:DT(0,'08:05'),ic:'box',lvl:'warn',txt:'Stock bajo: 6 repuestos por debajo del mínimo.',view:'inventario'},
 {id:'n3',t:DT(0,'08:10'),ic:'cash',lvl:'warn',txt:'NFR-228 lleva 3 días listo sin recoger: guardianía en curso.',view:'entrega'},
 {id:'n4',t:DT(-1,'18:00'),ic:'clock',lvl:'info',txt:'Cotización de CPL-204 sin respuesta hace 2 días.',view:'cotizaciones'}
];


/* ---------------------------------------------------------
   Datos de volumen (generados de forma determinística) para
   que la demo se vea como un taller real de tamaño intermedio
   --------------------------------------------------------- */
(function(){
  let seed=20261014;const R=()=>(seed=(seed*1103515245+12345)%2147483648)/2147483648;
  const pick=a=>a[Math.floor(R()*a.length)],rint=(a,b)=>a+Math.floor(R()*(b-a+1));
  const FN=['Alejandro','Valeria','Diego','Camila','Renzo','Fiorella','Gonzalo','Daniela','Martín','Lucía','Sebastián','Andrea','Javier','Milagros','Fernando','Claudia','Rodrigo','Gabriela','Óscar','Paola','Hugo','Rocío','Miguel Ángel','Carla','Raúl','Ximena','Eduardo','Natalia','Luis Alberto','Mariela','César','Karina','Iván','Silvia','Manuel','Lorena','Gustavo','Pamela','Víctor','Jimena'];
  const LN=['García','Rodríguez','Flores','Chávez','Rojas','Huamán','Mendoza','Castillo','Gutiérrez','Vásquez','Salazar','Ramírez','Paredes','Torres','Zevallos','Delgado','Arévalo','Benavides','Cárdenas','Otárola','Pacheco','Valdivia','Bustamante','Del Castillo','Aguirre','Montoya','Palacios','Ríos','Tello','Ugarte'];
  const CARS=[['Toyota','Yaris'],['Toyota','Corolla'],['Toyota','RAV4'],['Toyota','Rush'],['Hyundai','Accent'],['Hyundai','Creta'],['Hyundai','Tucson'],['Hyundai','Elantra'],['Kia','Rio'],['Kia','Picanto'],['Kia','Sportage'],['Kia','Soluto'],['Nissan','Versa'],['Nissan','Sentra'],['Nissan','Kicks'],['Chevrolet','Onix'],['Chevrolet','Sail'],['Suzuki','Swift'],['Suzuki','Vitara'],['Suzuki','Dzire'],['Mazda','3'],['Mazda','CX-30'],['Honda','Civic'],['Honda','CR-V'],['Volkswagen','Gol'],['Renault','Duster'],['MG','ZS'],['Changan','CS35'],['Subaru','Forester'],['Mitsubishi','ASX']];
  const COLORS=['Blanco','Plata','Gris','Negro','Rojo','Azul','Plomo','Beige'];
  const L='ABCDEFGHJKLMNPRSTUVWXYZ',used=new Set(VEHICLES.map(v=>v.plate));
  const plate=()=>{let p;do{p=L[rint(0,22)]+L[rint(0,22)]+rint(0,9)+'-'+String(rint(100,999))}while(used.has(p));used.add(p);return p};
  const tel=()=>'9'+rint(10,99)+' '+rint(100,999)+' '+rint(100,999);

  // clientes particulares
  for(let i=0;i<46;i++){const fn=pick(FN),ln=pick(LN)+' '+pick(LN),id='g'+i;
    CLIENTS.push({id,n:fn+' '+ln,type:'particular',tel:tel(),mail:(fn.split(' ')[0]+'.'+ln.split(' ')[0]).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'')+'@mail.com',since:rint(2016,2026),note:''});
    const [b,m]=pick(CARS),yr=rint(2012,2024),km=(2026-yr)*rint(9000,16000)+rint(0,8000);
    VEHICLES.push(V(plate(),b,m,yr,pick(COLORS),km,id,D(-rint(5,330)),km-rint(500,9000),R()<.25?5000:10000));
    if(R()<.12){const [b2,m2]=pick(CARS),y2=rint(2014,2024),k2=(2026-y2)*rint(9000,15000);VEHICLES.push(V(plate(),b2,m2,y2,pick(COLORS),k2,id,D(-rint(20,300)),k2-rint(800,7000),10000))}
  }
  // flotas nuevas
  [['f1','Courier Express Lima SAC',12,30,5],['f2','Inversiones Los Olivos SAC',8,15,3]].forEach(([id,n,disc,credit,nv])=>{
    CLIENTS.push({id,n,type:'flota',tel:'01 '+rint(200,799)+' '+rint(1000,9999),mail:'flota@'+n.split(' ')[0].toLowerCase()+'.pe',since:rint(2019,2024),note:`Descuento pactado ${disc}%. Crédito ${credit} días.`,disc,credit});
    for(let i=0;i<nv;i++){const [b,m]=id==='f1'?pick([['Toyota','Hiace'],['Hyundai','H100'],['Kia','K2500']]):pick([['Toyota','Hilux'],['Nissan','Frontier'],['Mitsubishi','L200']]),yr=rint(2018,2023),km=(2026-yr)*rint(25000,40000);
      VEHICLES.push(V(plate(),b,m,yr,'Blanco',km,id,D(-rint(10,120)),km-rint(2000,9000),10000))}
  });

  // historial entregado: ~6 meses
  const SV=[['Cambio de aceite y filtro','mec',150,320],['Mantenimiento preventivo 10,000 km','mec',620,890],['Mantenimiento preventivo 20,000 km','mec',820,1150],['Frenos delanteros','mec',380,820],['Alineación y balanceo','mec',90,160],['Scanner + afinamiento','mec',240,520],['Suspensión delantera','mec',680,1600],['Sistema de refrigeración','mec',220,640],['Cambio de batería','mec',390,450],['Planchado y pintura de parachoque','plan',850,1400],['Pintura de puerta','plan',600,980],['Detailing completo','det',280,460],['Pulido y encerado','det',180,320],['Lavado de salón','det',60,120]];
  const PAYS=['Yape','Tarjeta','Efectivo','Transferencia','Yape','Tarjeta'];
  let n=64000;const cand=VEHICLES.filter(v=>!['ADI-388','BMK-512','CPL-204','D3F-771','FRT-905','X7K-310','NFR-228','CX5-118','SWF-390','ACC-447'].includes(v.plate));
  for(let day=178;day>=1;day--){
    const dt=new Date();dt.setDate(dt.getDate()-day);if(dt.getDay()===0)continue;
    const k=dt.getDay()===6?rint(2,3):rint(3,6);
    for(let j=0;j<k;j++){const v=pick(cand),c=CLIENTS.find(x=>x.id===v.client),[svc,area,lo,hi]=pick(SV),tot=Math.round((lo+R()*(hi-lo))/10)*10,
      t=area==='plan'?pick(['t4','t5']):area==='det'?'t6':pick(['t1','t2','t3']),flota=c.type==='flota';
      OTS.push(H(String(++n).padStart(6,'0'),v.plate,c.id,svc,area,day,tot,t,flota?'factura':'boleta',{pay:flota?'Crédito '+c.credit+' días':pick(PAYS),disc:c.disc||0,km:v.lastKm}));
      if(day<v.__d||v.__d===undefined){v.__d=day}}
  }
  VEHICLES.forEach(v=>{if(v.__d!==undefined){v.lastDate=D(-v.__d);delete v.__d}});

  // más autos en taller ahora mismo
  const NOW=[['Cambio de aceite + scanner','mec','diag','t3',0,[it('S','Cambio de aceite y filtro',149),it('S','Scanner automotriz',80)]],
    ['Mantenimiento 30,000 km','mec','rep','t1',1,[it('S','Mantenimiento preventivo 20,000 km',890),it('R','Aceite sintético 5W-30 (litro)',42,4,'ACE-5W30','base',true,{rs:'entregado'})]],
    ['Pintura de capó','plan','rep','t5',3,[it('S','Pintura (por panel) · capó',520),it('R','Pintura base metálica (litro)',140,1,'PIN-BASE','base',true,{rs:'entregado'})]],
    ['Frenos posteriores','mec','cc','t3',0,[it('S','Frenos (mano de obra)',120),it('R','Líquido de frenos DOT 4 (500 ml)',25,1,'LIQ-FRE','base',true,{rs:'entregado'})]],
    ['Lavado de salón + pulido','det','recibido',null,0,[it('S','Pulido y encerado',180),it('S','Lavado interior y exterior',60)]],
    ['Alineación y balanceo','mec','listo','t2',0,[it('S','Alineación y balanceo',90)]],
    ['Ruido en suspensión','mec','diag','t1',1,[it('S','Diagnóstico general',60)]]];
  NOW.forEach(([svc,area,st,t,prom,items],i)=>{const v=cand[i*5+3],id=String(71114+i).padStart(6,'0');
    OTS.push({id,plate:v.plate,client:v.client,svc,area,stage:st,tech:t,bay:t?{t1:'B2',t2:'B4',t3:'B1',t5:'P2'}[t]:null,created:DT(-rint(0,2),pick(['08:40','09:15','10:05','11:30'])),promised:D(prom),km:v.km,fuel:pick([25,50,75]),asesor:'u1',note:'',quote:'aprobada',items,insp:mkInsp(),photos:[],log:[{t:DT(0,'08:50'),who:'Christian Carbajal',txt:'Vehículo recibido.',pub:1}],doc:'boleta',...(st==='listo'?{listoAt:DT(0,'11:20')}:{})})});

  // repuestos adicionales
  [['ACE-10W40','Aceite semisintético 10W-40 (litro)','Lubricantes','Castrol',22,34,48,30,'A-01','p4'],['ACE-0W20','Aceite sintético 0W-20 (litro)','Lubricantes','Mobil',32,48,26,20,'A-01','p4'],['ATF-DIII','Aceite de caja ATF Dexron III (litro)','Lubricantes','Valvoline',26,42,14,8,'A-04','p4'],
   ['FIL-ACE-NIS','Filtro de aceite Nissan','Filtros','Mann',15,30,11,8,'A-02','p4'],['FIL-ACE-SUZ','Filtro de aceite Suzuki','Filtros','Denso',14,28,7,6,'A-02','p4'],['FIL-AIR-YAR','Filtro de aire Yaris','Filtros','Denso',24,48,6,4,'A-03','p1'],['FIL-AIR-ACC','Filtro de aire Accent','Filtros','Mann',22,45,3,4,'A-03','p1'],['FIL-POL-UNI','Filtro de polen universal','Filtros','Bosch',28,65,9,4,'A-03','p1'],
   ['BUJ-DEN','Bujías Denso iridium (juego x4)','Motor','Denso',96,170,4,3,'B-01','p1'],['COR-ACC','Correa de accesorios','Motor','Gates',48,95,6,3,'B-03','p1'],['TER-REF','Termostato universal','Motor','Gates',55,110,3,2,'B-05','p1'],['BOM-AGU','Bomba de agua Hyundai','Motor','GMB',190,340,1,1,'B-05','p5'],
   ['PAS-DEL-ACC','Pastillas de freno delanteras Accent','Frenos','Bosch',78,160,4,3,'C-01','p2'],['PAS-DEL-RIO','Pastillas de freno delanteras Rio','Frenos','Bosch',80,165,5,3,'C-01','p2'],['PAS-POS-UNI','Zapatas de freno posteriores','Frenos','Bendix',70,140,6,3,'C-01','p2'],['DIS-DEL-ACC','Discos de freno delanteros Accent (par)','Frenos','Brembo',170,320,2,2,'C-02','p2'],
   ['AMO-POS-YAR','Amortiguador posterior Yaris (par)','Suspensión','KYB',250,470,2,1,'C-04','p2'],['BIE-DEL','Bieletas delanteras (par)','Suspensión','CTR',60,120,7,4,'C-05','p2'],['ROT-INF','Rótula inferior','Suspensión','CTR',55,110,5,3,'C-05','p2'],['BUJ-PAR','Bujes de parrilla (juego)','Suspensión','CTR',65,130,4,2,'C-05','p2'],
   ['BAT-45','Batería 45 Ah','Eléctrico','Bosch',220,330,3,2,'D-02','p1'],['BAT-75','Batería 75 Ah','Eléctrico','Etna',310,460,2,1,'D-02','p1'],['FOC-H4','Foco H4 halógeno (par)','Eléctrico','Philips',28,60,10,4,'D-03','p1'],['FUS-SET','Juego de fusibles','Eléctrico','Bosch',8,20,25,10,'D-03','p1'],
   ['LIQ-DIR','Líquido de dirección (litro)','Fluidos','Valvoline',18,35,9,4,'D-01','p4'],['LIM-INY','Limpiador de inyectores','Fluidos','Wynn’s',22,45,12,6,'D-01','p4'],['REF-CON','Refrigerante concentrado (galón)','Fluidos','Prestone',38,70,5,4,'D-01','p4'],
   ['PIN-NEG','Pintura negro perlado (litro)','Pintura','PPG',90,150,4,3,'E-01','p3'],['PIN-BLA','Pintura blanco perla (litro)','Pintura','PPG',95,155,5,3,'E-01','p3'],['IMP-2K','Imprimante 2K (litro)','Pintura','Sikkens',60,95,6,4,'E-02','p3'],['THI-STD','Thinner estándar (galón)','Pintura','Tekno',30,50,10,6,'E-02','p3'],['LIJ-P400','Lija al agua P400 (pliego)','Pintura','3M',2,4,80,60,'E-04','p3'],['CIN-ENM','Cinta de enmascarar 2"','Pintura','3M',6,12,30,15,'E-05','p3'],
   ['SHA-AUT','Shampoo automotriz (galón)','Detailing','Meguiar’s',35,60,6,3,'F-01','p3'],['CER-LIQ','Cera líquida (500 ml)','Detailing','Turtle Wax',30,55,4,3,'F-01','p3'],['ESC-POS','Escobilla posterior','Accesorios','Bosch',15,35,8,4,'D-04','p1']
  ].forEach(a=>PARTS.push(P(...a)));

  // citas de la semana
  const HRS=['08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','14:00','14:30','15:00','15:30','16:00','16:30'],SRC=['Web','Mi Auto','Teléfono','Mi Auto','Web','Presencial'];
  let an=100;for(let d=0;d<=6;d++){const dt=new Date();dt.setDate(dt.getDate()+d);if(dt.getDay()===0)continue;const k=dt.getDay()===6?3:rint(4,7),taken=new Set(APPTS.filter(a=>a.date===D(d)).map(a=>a.hour));
    for(let j=0;j<k;j++){let h=pick(HRS);if(taken.has(h))continue;taken.add(h);const v=pick(cand),c=CLIENTS.find(x=>x.id===v.client);APPTS.push({id:'a'+(++an),date:D(d),hour:h,plate:v.plate,client:c.n,svc:pick(SV)[0],status:'pend',src:pick(SRC)})}}

  // encuestas de entregas recientes
  const CM=[[10,'Excelente atención, me avisaron todo por WhatsApp.'],[9,'Rápidos y ordenados. Volveré.'],[10,'Me mandaron fotos de las piezas, eso da confianza.'],[8,'Buen trabajo, el lavado podría mejorar.'],[9,'Cumplieron la hora de entrega.'],[6,'Tuve que llamar dos veces para saber el avance.'],[10,'El asesor me explicó todo con paciencia.'],[7,'Bien, aunque el precio subió un poco.'],[9,'Muy profesionales.'],[3,'Me entregaron el auto con una mancha de grasa en el asiento.']];
  OTS.filter(o=>o.stage==='ent'&&daysSince0(o.entAt)<=45).slice(-40).forEach((o,i)=>{if(i%3===0){const [nps,txt]=CM[i/3%CM.length];SURVEYS.push({ot:o.id,nps,txt,g:nps>=9})}});

  // siniestros y cobranzas adicionales
  CLAIMS.push(
   {id:'S-06',ins:'Rímac',no:'RIM-2026-451022',proc:'Marco Delgado',plate:'BRT-618',client:null,clientN:'Jorge Benavides',ot:null,status:'aut',budget:2240,auth:2100,ded:350,created:D(-5),authAt:D(-1),promisedIns:D(4),docs:['Fotos de daño','Carta de autorización']},
   {id:'S-07',ins:'Pacífico',no:'PAC-0077-2026-9988',proc:'Elena Núñez',plate:'KTR-552',client:null,clientN:'Sofía Arévalo',ot:null,status:'ent',budget:1480,auth:1480,ded:300,created:D(-14),authAt:D(-11),promisedIns:D(-1),docs:['Fotos de daño','Carta de autorización','Acta de conformidad']},
   {id:'S-08',ins:'Interbank Seguros',no:'IBK-2026-00731',proc:'Renato Lazo',plate:'PLM-903',client:null,clientN:'Daniel Ugarte',ot:null,status:'perito',budget:0,auth:0,ded:300,created:D(-1),authAt:null,promisedIns:D(9),docs:['Fotos de daño']});
  RECV.push({id:'r8',doc:'F001-000253',client:'Courier Express Lima SAC',amt:3480,date:D(-12),due:D(18),paid:false,type:'flota'},{id:'r9',doc:'F001-000247',client:'Courier Express Lima SAC',amt:2110,date:D(-48),due:D(-18),paid:false,type:'flota'},{id:'r10',doc:'F001-000256',client:'Pacífico Seguros',amt:1180,date:D(-1),due:D(29),paid:false,type:'seguro'},{id:'r11',doc:'F001-000240',client:'Inversiones Los Olivos SAC',amt:1620,date:D(-30),due:D(-15),paid:true,type:'flota'});
})();
function daysSince0(iso){return Math.floor((new Date(D(0)+'T12:00')-new Date(iso.slice(0,10)+'T12:00'))/864e5)}

// Unidad de medida en su propia columna: "(litro)", "(par)", "(juego x4)"… salen del nombre
PARTS.forEach(p=>{const m=p.name.match(/\s*\(([^)]+)\)\s*$/);p.unit=m?m[1]:'unidad';if(m)p.name=p.name.slice(0,m.index)});

// Historial de etapas y trabajos terminados para las OT de ejemplo (alimenta "Mi auto hoy")
OTS.forEach(o=>{
  const lastT=o.log.length?o.log[o.log.length-1].t:o.created;
  if(!o.hist){o.hist=[{k:'recibido',t:o.created}];if(o.stage!=='recibido')o.hist.push({k:o.stage,t:o.stage==='ent'?(o.entAt||lastT):lastT>o.created?lastT:o.created})}
  if(['cc','listo','ent'].includes(o.stage))o.items.forEach(i=>{if(i.ap===true&&!i.done)i.done=o.listoAt||o.entAt||lastT});
  (o.photos||[]).forEach(p=>{if(!p.ing&&p.t&&p.t.slice(0,16)<=o.created.slice(0,13)+':59'&&/recepción|ingreso/i.test(p.lbl))p.ing=1});
});

function buildSeed(){
  const S={v:4,role:null,
    clients:JSON.parse(JSON.stringify(CLIENTS)),vehicles:JSON.parse(JSON.stringify(VEHICLES)),ots:JSON.parse(JSON.stringify(OTS)),
    parts:JSON.parse(JSON.stringify(PARTS)),kardex:JSON.parse(JSON.stringify(KARDEX0)),pos:JSON.parse(JSON.stringify(POS0)),suppliers:JSON.parse(JSON.stringify(SUPPLIERS)),
    appts:JSON.parse(JSON.stringify(APPTS)),claims:JSON.parse(JSON.stringify(CLAIMS)),recv:JSON.parse(JSON.stringify(RECV)),
    surveys:JSON.parse(JSON.stringify(SURVEYS)),wa:JSON.parse(JSON.stringify(WA0)),notifs:JSON.parse(JSON.stringify(NOTIFS0)),users:JSON.parse(JSON.stringify(USERS)),
    contacted:{},audit:[
      {t:DT(0,'09:35'),who:'Christian Carbajal',txt:'Recibió el vehículo SWF-390 (OT 071113)'},
      {t:DT(0,'09:20'),who:'Luis Paredes',txt:'Inició diagnóstico en OT 071108'},
      {t:DT(0,'08:55'),who:'Rosa Medina',txt:'Entregó 1 × PUL-SET a OT 071112'},
      {t:DT(-1,'15:00'),who:'Ricardo Huamán',txt:'Movió OT 071110 a En reparación'}
    ],counters:{ot:71130,oc:13,claim:5,appt:12,rcv:7},
    skippedIds:0};
  return S;
}
