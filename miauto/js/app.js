/* =========================================================
   Mi Auto — app del cliente (Gallo Autos)
   Comparte estado con la intranet (localStorage, ver intranet/js/core.js).
   Requiere cargar antes: ../intranet/js/data.js y ../intranet/js/core.js
   Globales propios: MA, MA_ART, MA_MEDIA, MA_IMG, MA_IC, maIc, maRng, _maU
   ========================================================= */

/* ---------- ilustraciones del técnico (copiadas del sitio web) ---------- */
let _maU=0;
const maRng=seed=>()=>(seed=(seed*16807)%2147483647)/2147483647;
const MA_ART={
 emp(anim){const u='e'+(++_maU);
  const drop=(x,d)=>`<ellipse cx="${x}" cy="128" rx="3.6" ry="5.4" fill="#7A4A12">${anim?`<animate attributeName="cy" values="126;172" dur="1.7s" begin="${d}s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;1;0" dur="1.7s" begin="${d}s" repeatCount="indefinite"/>`:''}</ellipse>`;
  return `<svg class="art" viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="${u}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1C2436"/><stop offset="1" stop-color="#0A0F1C"/></linearGradient>
  <linearGradient id="${u}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E3E8F0"/><stop offset=".55" stop-color="#A7B1C3"/><stop offset="1" stop-color="#7C879B"/></linearGradient>
  <radialGradient id="${u}o" cx=".5" cy=".3" r=".7"><stop offset="0" stop-color="#9A5E17"/><stop offset="1" stop-color="#3B2206"/></radialGradient>
  <radialGradient id="${u}l" cx=".75" cy="0" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".18"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
  <rect width="320" height="180" fill="url(#${u}b)"/>
  <path d="M0 150 L320 140 L320 180 L0 180Z" fill="#131A28"/>
  <rect x="26" y="116" width="268" height="56" rx="6" fill="#2A3346"/>
  <path d="M40 132h240M40 146h240M40 160h240" stroke="#222A3B" stroke-width="3"/>
  <rect x="40" y="107" width="240" height="11" rx="3" fill="#4A2F14"/>
  <rect x="46" y="38" width="228" height="74" rx="20" fill="url(#${u}c)"/>
  <path d="M74 58h172M74 70h172M74 82h172M74 94h172" stroke="#6E798E" stroke-width="3.5" stroke-linecap="round" opacity=".55"/>
  <circle cx="236" cy="54" r="11" fill="#1F2937"/><circle cx="236" cy="54" r="5" fill="#374151"/>
  ${[[58,50],[262,50],[58,100],[262,100],[160,46]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="4.2" fill="#4B5563"/>`).join('')}
  <path d="M138 110 q10 -3 40 0 q12 4 8 18 q-4 9 -12 5 q-3 14 -11 4 q-6 -6 -12 3 q-10 -10 -13 -30z" fill="url(#${u}o)" opacity=".95"/>
  <path d="M120 112 q6 -2 16 0 q2 6 -4 8 q-8 2 -12 -8z" fill="#5C3A10" opacity=".8"/>
  ${drop(166,0)}${drop(178,.7)}${drop(152,1.2)}
  <circle cx="162" cy="118" r="33" fill="none" stroke="#FFC800" stroke-width="3" stroke-dasharray="7 5">${anim?'<animateTransform attributeName="transform" type="rotate" from="0 162 118" to="360 162 118" dur="12s" repeatCount="indefinite"/>':''}</circle>
  <rect x="204" y="132" width="104" height="26" rx="13" fill="#FFC800"/><text x="256" y="149.5" font-family="Roboto,Arial,sans-serif" font-size="12.5" font-weight="700" text-anchor="middle" fill="#000">Fuga de aceite</text>
  <rect width="320" height="180" fill="url(#${u}l)"/></svg>`;},
 pol(mode){const u='p'+(++_maU);
  const pleats=(x,dirty)=>{let p='';for(let i=0;i<11;i++){const xx=x+8+i*10;p+=`<rect x="${xx}" y="46" width="5" height="88" fill="${dirty?'#6E5E47':'#E7E2D3'}" opacity="${dirty?.55:.9}"/>`}
    if(dirty){const R=maRng(7);for(let i=0;i<70;i++){const cx=x+8+R()*112,cy=48+R()*84,r=.8+R()*2.2;p+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="#4A3E2D" opacity=".75"/>`}
      p+=`<path d="M${x+28} 70 q10 -8 18 2 q-8 8 -18 -2z" fill="#6B7F3A" opacity=".8"/><path d="M${x+86} 108 q8 -10 18 0 q-10 7 -18 0z" fill="#7C6A2F" opacity=".8"/>`}
    return p};
  if(mode==='close'){return `<svg class="art" viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><rect width="320" height="180" fill="#8B7B63"/>
   ${Array.from({length:16},(_,i)=>`<path d="M${i*21} 0 L${i*21+10} 180 L${i*21+21} 0" fill="${i%2?'#7A6A52':'#9C8B71'}"/>`).join('')}
   ${(()=>{const R=maRng(11);return Array.from({length:260},()=>`<circle cx="${R()*320}" cy="${R()*180}" r="${.6+R()*2.6}" fill="#3F3424" opacity="${.35+R()*.5}"/>`).join('')})()}
   <path d="M90 60 q22 -18 40 4 q-20 16 -40 -4z" fill="#6B7F3A"/><path d="M210 120 q16 -16 34 0 q-18 12 -34 0z" fill="#7C6A2F"/><path d="M40 140 q12 -10 24 2 q-12 8 -24 -2z" fill="#5E6B33"/>
   <rect x="12" y="12" width="132" height="26" rx="13" fill="#FFC800"/><text x="78" y="29.5" font-family="Roboto,Arial,sans-serif" font-size="12" font-weight="700" text-anchor="middle" fill="#000">Polvo y hojas</text></svg>`}
  return `<svg class="art" viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="${u}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F4F6FA"/><stop offset="1" stop-color="#DDE3EC"/></linearGradient></defs>
  <rect width="320" height="180" fill="url(#${u}g)"/>
  <rect x="22" y="38" width="128" height="104" rx="8" fill="#9C8B71" stroke="#5E5040" stroke-width="3"/>${pleats(22,true)}
  <rect x="170" y="38" width="128" height="104" rx="8" fill="#FBFAF5" stroke="#CFC9B8" stroke-width="3"/>${pleats(170,false)}
  <rect x="38" y="150" width="96" height="22" rx="11" fill="#FEE2E2"/><text x="86" y="165" font-family="Roboto,Arial,sans-serif" font-size="11" font-weight="700" text-anchor="middle" fill="#B91C1C">Tu filtro actual</text>
  <rect x="198" y="150" width="72" height="22" rx="11" fill="#DCFCE7"/><text x="234" y="165" font-family="Roboto,Arial,sans-serif" font-size="11" font-weight="700" text-anchor="middle" fill="#15803D">Nuevo</text>
  <text x="160" y="24" font-family="Roboto,Arial,sans-serif" font-size="12" font-weight="700" text-anchor="middle" fill="#042551">Filtro de polen · aire acondicionado</text></svg>`;}
};

const MA_IMG={neb:'img/neb.jpg',timon:'img/timon.jpg'};
const MA_MEDIA={
 emp:{type:'video',dur:15,title:'Video del técnico',sub:'Empaque de tapa de válvulas',items:[{art:()=>MA_ART.emp(true),cap:'“Aquí se ve cómo sale el aceite por el empaque de la tapa de válvulas. Ya está mojando el block del motor. Le recomiendo cambiarlo.”'}]},
 pol:{type:'photos',title:'Fotos del técnico',sub:'Filtro de polen',items:[{art:()=>MA_ART.pol(),cap:'A la izquierda, tu filtro actual; a la derecha, uno nuevo. Ese es el aire que entra a la cabina.'},{art:()=>MA_ART.pol('close'),cap:'De cerca: polvo y hojas acumulados entre los pliegues. Por eso el aire acondicionado enfría menos.'}]}
};
const MA_IC={
 play:'<path d="m7 4 13 8-13 8z" fill="currentColor" stroke="none"/>',
 pause:'<rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none"/><rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none"/>',
 pulse:'<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
 pin:'<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
 wa:'<path d="M3 21l1.65-4.8A8.6 8.6 0 1 1 7.9 19.5z"/><path d="M9 8.6c0 3.4 3 6.4 6.4 6.4l1.1-1.5-2-1-.9.8a4.2 4.2 0 0 1-2.4-2.4l.8-.9-1-2z"/>',
 info:'<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
 back:'<path d="m15 18-6-6 6-6"/>',
 spark:'<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/>',
 gauge:'<path d="M12 14l4-4"/><path d="M3.3 19a10 10 0 1 1 17.4 0"/>',
 receipt:'<path d="M4 2v20l3-2 3 2 3-2 3 2 3-2 2 2V2l-2 2-3-2-3 2-3-2-3 2z"/><path d="M8 8h8M8 12h8M8 16h5"/>'
};
const maIc=(n,s)=>`<svg class="i" viewBox="0 0 24 24" aria-hidden="true"${s?` style="width:${s}px;height:${s}px"`:''}>${MA_IC[n]||(typeof IC!=='undefined'&&IC[n])||''}</svg>`;

const MA={
 plate:null,tab:'login',pendingPlate:null,want:null,otp:null,sel:{},bk:{svc:null,day:null,hour:null,note:''},_t:null,_vt:null,_vm:null,
 TABS:[['inicio','Inicio','home'],['seguimiento','Mi auto hoy','pulse'],['presupuesto','Presupuesto','file'],['historial','Historial','history'],['agendar','Agendar','calendar']],
 SHORT:{recibido:'Recibido',diag:'Revisión',aprob:'Aprobación',rep:'Reparación',cc:'Calidad',listo:'Listo'},
 HINTS:{
  inicio:'Aquí ves en qué va tu auto, sin tener que llamar al taller.',
  seguimiento:'Aquí ves todo lo que hacemos con tu auto, paso a paso. Toca cada paso para ver el detalle y las fotos.',
  presupuesto:'Aquí apruebas o rechazas cada trabajo extra viendo la foto.',
  historial:'Todos los servicios de tu auto, con su comprobante.',
  agendar:'Elige servicio, día y hora: el taller ve tu cita al instante.'
 },
 SIDE:{
  login:{t:'Ingreso sin contraseñas',b:['El cliente entra solo con la placa de su auto: no crea cuentas ni recuerda claves.','Recibe un código de 4 dígitos por WhatsApp (en la demo se completa solo).','Funciona con cualquier placa registrada en la intranet. Prueba con ADI-388.','Se instala en el celular como una app, sin pasar por la tienda.'],tip:'Toca “Usar placa de demo ADI-388” para entrar como Bruno Sánchez, que tiene su Kia Cerato en el taller.'},
  inicio:{t:'Todo lo importante, de un vistazo',b:['En qué etapa está su auto, con avance y fecha de entrega estimada.','Un aviso claro cuando hay trabajos extra esperando su aprobación.','Cuándo le toca el próximo mantenimiento.','Un botón directo al WhatsApp de su asesor.'],tip:'Abre la intranet en otra pestaña (Portal) y avanza la etapa: verás el cambio aquí al instante.'},
  seguimiento:{t:'El viaje de su auto, explicado',b:['“Ahora mismo”: qué pasa hoy, en una frase, y la entrega estimada.','“Lo que estamos haciendo”: cada trabajo con ✓ terminado, trabajando ahora o por hacer.','Seis pasos en orden, de “Recibimos tu auto” a “Listo para recoger”, cada uno con “¿Qué significa?”.','En “Recibimos tu auto”: kilometraje, combustible, lo que pidió, objetos, fotos de ingreso y la hoja firmada.','Botón “Aa” arriba para agrandar la letra.'],tip:'En el Portal, entra a la Vista del técnico y marca un trabajo como terminado: aquí aparece el ✓ al instante.'},
  presupuesto:{t:'Aprobación con evidencia',b:['Cada trabajo extra viene con foto o video, urgencia y explicación.','El cliente aprueba ítem por ítem y ve el total al momento.','Al confirmar, la OT pasa a “En reparación” y se reservan los repuestos.','El asesor recibe la notificación en la campana de la intranet.'],tip:'Aprueba 2 de 3 y mira el tablero de la intranet: el Cerato cambia de columna solo.'},
  historial:{t:'La hoja de vida del auto',b:['Todos los servicios entregados, con fecha y monto.','Cada comprobante se abre en un toque.','Genera confianza y facilita vender el auto con historial.'],tip:'Cuando la intranet entrega y cobra una OT, aparece aquí automáticamente.'},
  agendar:{t:'Citas en 3 toques',b:['Servicio, día y hora: sin llamadas ni esperas.','Las horas ya ocupadas aparecen deshabilitadas.','La cita entra directo a la Agenda de la intranet como “Mi Auto”.'],tip:'Agenda una cita y ábrela en la Agenda de la intranet: ya está ahí.'}
 },

 /* ---------- utilidades ---------- */
 ss(k,v){try{if(v===undefined)return sessionStorage.getItem(k);if(v===null)sessionStorage.removeItem(k);else sessionStorage.setItem(k,v)}catch(e){return null}},
 hintsOff(){try{return JSON.parse(localStorage.getItem('miauto_hints')||'{}')||{}}catch(e){return {}}},
 hideHint(){const h=MA.hintsOff();h[MA.tab]=1;try{localStorage.setItem('miauto_hints',JSON.stringify(h))}catch(e){}const el=document.querySelector('#maMain .hint');if(el)el.remove()},
 iso(d){return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`},
 dlong(iso){if(!iso)return '—';const d=new Date(iso.slice(0,10)+'T12:00');const k=iso.slice(0,10);
  if(k===D(0))return 'Hoy';if(k===D(1))return 'Mañana, '+fmtD(k);if(k===D(-1))return 'Ayer, '+fmtD(k);
  return `${DN[d.getDay()].toLowerCase()} ${fmtD(k)}`},
 when(t){if(!t)return '';const h=t.length>10?t.slice(11,16):'';const k=t.slice(0,10);
  const d=k===D(0)?'Hoy':k===D(-1)?'Ayer':`${DN[new Date(k+'T12:00').getDay()].toLowerCase()} ${fmtD(k)}`;return h?`${d}, ${h}`:d},
 greet(){const h=new Date().getHours();return h<12?'Buenos días':h<19?'Buenas tardes':'Buenas noches'},
 hash(){const h=(location.hash||'').replace('#','');return MA.TABS.some(t=>t[0]===h)?h:null},

 /* ---------- datos ---------- */
 v(){return MA.plate?veh(MA.plate):null},
 c(){const v=MA.v();return (v&&client(v.client))||{n:'Cliente',tel:''}},
 first(){return String(MA.c().n||'').split(' ')[0]},
 active(){return S.ots.filter(o=>o.plate===MA.plate&&o.stage!=='ent').sort((a,b)=>(b.created||'').localeCompare(a.created||''))[0]||null},
 hist(){return S.ots.filter(o=>o.plate===MA.plate&&o.stage==='ent').sort((a,b)=>(b.entAt||b.promised||'').localeCompare(a.entAt||a.promised||''))},
 pend(o){return o&&o.quote==='enviada'?o.items.filter(i=>i.ap===null):[]},
 advisor(o){const u=o&&typeof user==='function'?user(o.asesor):null;return (u&&u.n)||'Christian Carbajal'},
 st(o){
  const idx=Math.max(0,STAGES.findIndex(s=>s.k===o.stage)),s=stage(o.stage)||{n:o.stage,c:'#2908F1'},np=MA.pend(o).length;
  const label={recibido:'Recibimos tu auto',diag:'En diagnóstico',aprob:np?'Esperando tu aprobación':'Preparando tu presupuesto',rep:'En reparación',cc:'Control de calidad',listo:'¡Listo para recoger!',ent:'Entregado'}[o.stage]||s.n;
  const pct=Math.min(100,Math.round(idx/5*100));
  const eta=o.stage==='listo'?'Hoy, cuando gustes':(o.stage==='aprob'&&np&&!o.delay)?'Se confirma tras tu aprobación':MA.dlong(o.promised);
  return {label,pct,eta,c:s.c,idx};
 },

 /* ---------- arranque ---------- */
 boot(){
  onExternalChange=MA.ext;
  window.addEventListener('hashchange',()=>{const h=MA.hash();if(!h)return;if(MA.plate){if(h!==MA.tab)MA.go(h)}else MA.want=h});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){MA.closeViewer();MA.closeSheet()}});
  MA.clock();setInterval(MA.clock,30000);
  MA.want=MA.hash();
  const p=MA.ss('miauto_plate');
  if(p&&veh(p))MA.enter(p,true);else MA.login();
 },
 clock(){const el=document.getElementById('maClock');if(el){const d=new Date();el.textContent=d.getHours()+':'+pad(d.getMinutes())}},
 ext(){
  if(!MA.plate){return}
  if(!veh(MA.plate)){MA.logout();return}
  ACTOR=MA.c().n;MA.render(true);MA.toast('Actualizado por el taller','refresh');
 },

 /* ---------- login ---------- */
 login(){
  clearTimeout(MA._t);MA.plate=null;MA.pendingPlate=null;MA.tab='login';ACTOR=null;
  const app=$('#app');app.className='ma-app is-login';
  app.innerHTML=`<div class="lg">
   <div class="lg-hero"><img src="../intranet/img/logo2.png" alt="Gallo Autos"><h1>Mi Auto</h1><p>Sigue a tu auto en el taller, aprueba trabajos viendo las fotos y agenda tu próxima cita.</p></div>
   <div class="lg-card" id="lgBody">${MA.lgPlate()}</div>
   <p class="lg-foot">Gallo Autos · Av. La Molina 724</p></div>${MA.overlays()}`;
  MA.side();
 },
 lgPlate(err){return `<h2>Ingresa con tu placa</h2><p class="mut">Te enviaremos un código por WhatsApp. Sin contraseñas.</p>
   <label class="plate-in"><span class="pb">PERÚ</span><input id="maPlate" maxlength="7" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="ABC-123" aria-label="Placa" oninput="MA.fmtPlate(this)" onkeydown="if(event.key==='Enter')MA.submitPlate()"></label>
   ${err?`<div class="lg-err">${maIc('alert',18)}<span>${err}</span></div>`:''}
   <button class="btn btn-y btn-block" onclick="MA.submitPlate()">Continuar ${maIc('arrow',18)}</button>
   <button class="btn-link" onclick="MA.demo()">Usar placa de demo <b>ADI-388</b></button>`},
 fmtPlate(el){let s=el.value.toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,6);if(s.length>3)s=s.slice(0,3)+'-'+s.slice(3);el.value=s},
 demo(){const i=$('#maPlate');if(i)i.value='ADI-388';MA.submitPlate()},
 submitPlate(){
  const i=$('#maPlate');const p=String(i?i.value:'').toUpperCase().replace(/[^A-Z0-9]/g,'');
  const plate=p.length>3?p.slice(0,3)+'-'+p.slice(3):p;
  if(!plate){$('#lgBody').innerHTML=MA.lgPlate('Escribe la placa de tu auto.');$('#maPlate').focus();return}
  const v=veh(plate);
  if(!v){$('#lgBody').innerHTML=MA.lgPlate(`No encontramos la placa <b>${esc(plate)}</b>. Si es tu primera visita, escríbenos por <a href="https://wa.me/51997572471" target="_blank" rel="noopener">WhatsApp</a> y te ayudamos.`);$('#maPlate').value=plate;return}
  MA.pendingPlate=plate;const c=client(v.client)||{};const tel=String(c.tel||'').replace(/\D/g,'');
  MA.otp=String(Math.floor(1000+Math.random()*9000));
  $('#lgBody').innerHTML=`<button class="lg-back" onclick="MA.login()">${maIc('back',16)} Cambiar placa</button>
   <h2>Revisa tu WhatsApp</h2><p class="mut">Enviamos un código de 4 dígitos al <b>${tel?esc(tel.slice(0,3)+' ••• '+tel.slice(-3)):'número registrado'}</b>.</p>
   <div class="wa-msg">${maIc('wa',18)}<span><b>Gallo Autos</b><br>Tu código de Mi Auto es <b>${MA.otp}</b></span></div>
   <div class="otp">${[0,1,2,3].map(k=>`<input id="maOtp${k}" inputmode="numeric" maxlength="1" readonly aria-label="Dígito ${k+1}">`).join('')}</div>
   <button class="btn btn-y btn-block" id="maOtpGo" disabled onclick="MA.enter(MA.pendingPlate)">Ingresar</button>
   <p class="mut sm center">Demo: el código se completa solo.</p>`;
  clearTimeout(MA._t);let k=0;
  const step=()=>{const e=$('#maOtp'+k);if(!e)return;e.value=MA.otp[k];e.classList.add('on');k++;
   if(k<4)MA._t=setTimeout(step,240);else{$('#maOtpGo').disabled=false;MA._t=setTimeout(()=>{if(MA.pendingPlate&&!MA.plate)MA.enter(MA.pendingPlate)},700)}};
  MA._t=setTimeout(step,1100);
 },
 enter(p,quiet){
  clearTimeout(MA._t);if(!p||!veh(p)){MA.login();return}
  MA.plate=p;MA.pendingPlate=null;MA.ss('miauto_plate',p);ACTOR=MA.c().n;MA.sel={};
  const app=$('#app');app.className='ma-app';
  app.innerHTML=`<header class="top" id="maTop"></header><main class="main" id="maMain"></main><nav class="tabs" id="maTabs"></nav>${MA.overlays()}`;
  const t=MA.want||MA.hash()||'inicio';MA.want=null;MA.go(t);
  if(!quiet)MA.toast(`¡Hola, ${esc(MA.first())}!`,'check');
 },
 logout(){
  MA.ss('miauto_plate',null);MA.closeViewer();
  try{history.replaceState(null,'',location.pathname+location.search)}catch(e){}
  MA.login();
 },
 overlays(){return `<div class="sheet-bg" id="maSheetBg" onclick="MA.closeSheet()"></div><div class="sheet" id="maSheet" role="dialog" aria-modal="true"></div><div class="viewer" id="maViewer" role="dialog" aria-modal="true"></div><div class="toast" id="maToast" role="status"></div><div class="toast" id="toast"></div>`},

 /* ---------- navegación ---------- */
 go(t){
  if(!MA.plate){MA.want=t;return}
  if(!MA.TABS.some(x=>x[0]===t))t='inicio';
  MA.tab=t;
  if(location.hash!=='#'+t){try{history.replaceState(null,'','#'+t)}catch(e){location.hash=t}}
  MA.closeSheet();MA.render();const m=$('#maMain');if(m)m.scrollTop=0;
 },
 render(keep){
  if(!MA.plate||!$('#maMain'))return;
  const v=MA.v();if(!v){MA.logout();return}
  const o=MA.active(),m=$('#maMain'),st=m.scrollTop;
  $('#maTop').innerHTML=`<button class="top-car" onclick="MA.profile()"><span class="logo-b"><img src="../intranet/img/logo2.png" alt=""></span><span class="tc-t"><b>${esc(carName(MA.plate))}</b><small><span class="pl">${esc(MA.plate)}</span>${v.color?' · '+esc(v.color):''}</small></span></button><button class="aa" onclick="MA.fsNext()" aria-label="Cambiar tamaño de letra" title="Tamaño de letra">A<span>a</span></button><button class="av" onclick="MA.profile()" aria-label="Mi perfil">${esc(initials(MA.c().n))}</button>`;
  m.innerHTML=MA.hint()+MA['v_'+MA.tab](o)+'<div class="end"></div>';
  const np=MA.pend(o).length;
  $('#maTabs').innerHTML=MA.TABS.map(([k,n,i])=>`<button class="${MA.tab===k?'on':''}" onclick="MA.go('${k}')" aria-label="${n}">${maIc(i,22)}<span>${n}</span>${k==='presupuesto'&&np?`<em>${np}</em>`:''}</button>`).join('');
  MA.fsApply();
  if(keep)m.scrollTop=st;
  MA.side();
 },
 /* Tamaño de letra: tres niveles, se recuerda en este celular */
 FS:[1.06,1.2,1.35],
 fs(){let n=0;try{n=+localStorage.getItem('miauto_fs')||0}catch(e){}return Math.min(2,Math.max(0,n))},
 fsApply(){const m=$('#maMain');if(m)m.style.zoom=MA.FS[MA.fs()]},
 fsNext(){const n=(MA.fs()+1)%3;try{localStorage.setItem('miauto_fs',n)}catch(e){}MA.fsApply();MA.toast(['Letra normal','Letra grande','Letra muy grande'][n],'info')},
 hint(){if(MA.hintsOff()[MA.tab]||!MA.HINTS[MA.tab])return '';return `<div class="hint">${maIc('info',16)}<span>${MA.HINTS[MA.tab]}</span><button onclick="MA.hideHint()" aria-label="Ocultar ayuda">${maIc('x',14)}</button></div>`},
 side(){
  const el=document.getElementById('maSide');if(!el)return;const s=MA.SIDE[MA.tab]||MA.SIDE.inicio;
  el.innerHTML=`<a class="sd-back" href="../gallo-autos-demo.html">${maIc('back',16)} Volver al sitio web</a>
   <span class="eyebrow">Así lo ve tu cliente</span><h2>${s.t}</h2>
   <ul>${s.b.map(x=>`<li><span class="ck">${maIc('check',14)}</span><span>${x}</span></li>`).join('')}</ul>
   <div class="tip">${maIc('spark',20)}<div><b>Pruébalo en vivo</b><p>${s.tip}</p><a href="../intranet/index.html" target="_blank" rel="noopener">Abrir la intranet ${maIc('external',14)}</a></div></div>
   ${MA.plate?`<div class="sd-nav">${MA.TABS.map(([k,n])=>`<button class="${MA.tab===k?'on':''}" onclick="MA.go('${k}')">${n}</button>`).join('')}</div>`:''}`;
 },

 /* ---------- piezas ---------- */
 thumb(x,on,big){
  const m=x.media&&MA_MEDIA[x.media];
  const inner=m?MA_ART[x.media]():(x.img&&MA_IMG[x.img])?`<img src="${MA_IMG[x.img]}" alt="${esc(x.lbl||'')}" loading="lazy">`:`<span class="ph-ph">${maIc('camera',22)}</span>`;
  const tag=m?(m.type==='video'?`${maIc('play',12)} Video 0:${pad(m.dur)}`:`${maIc('camera',12)} ${m.items.length} fotos`):(x.img?`${maIc('camera',12)} Foto`:'');
  return `<button class="th ${big?'big':''}" onclick="${on}">${inner}${m&&m.type==='video'?`<span class="th-play">${maIc('play',18)}</span>`:''}${tag?`<span class="th-tag">${tag}</span>`:''}${!big&&x.lbl?`<span class="th-l">${esc(x.lbl)}</span>`:''}</button>`;
 },
 openPhoto(id,i){const o=ot(id),p=o&&o.photos[i];if(!p)return;
  if(p.media&&MA_MEDIA[p.media])MA.openMedia(p.media,p.t);else MA.openImg(p.img,p.lbl,p.t)},
 itemMedia(i,o){
  const p=(o.photos||[]).find(x=>(i.media&&x.media===i.media)||(i.img&&x.img===i.img));
  if(i.media&&MA_MEDIA[i.media])return MA.thumb({media:i.media},`MA.openMedia('${i.media}','${p?p.t:''}')`,true);
  if(i.img&&MA_IMG[i.img])return MA.thumb({img:i.img,lbl:i.desc},`MA.openImg('${i.img}',null,'${p?p.t:''}',${JSON.stringify(i.desc).replace(/"/g,'&quot;')})`,true);
  return '';
 },
 wa(o){const c=MA.c(),a=MA.advisor(o);
  return `<a class="wa-btn" href="https://wa.me/51997572471?text=${encodeURIComponent(`Hola ${a.split(' ')[0]}, soy ${c.n} (${MA.plate}).`)}" target="_blank" rel="noopener"><span class="wa-i">${maIc('wa',22)}</span><span class="wa-t"><b>Escríbele a ${esc(a)}</b><small>Tu asesor de servicio · WhatsApp</small></span>${maIc('chev',18)}</a>`},
 empty(icon,t,p,btn){return `<div class="card empty"><span class="em-i">${maIc(icon,28)}</span><h3>${t}</h3><p>${p}</p>${btn||''}</div>`},

 /* Retrasos explicados: pausa (auto detenido) o cambio de fecha, en lenguaje simple */
 delayCard(o){if(!o)return '';
  if(o.blocked)return `<div class="alert-card delay"><span class="ac-i">${maIc('clock',22)}</span><span class="ac-t"><b>Tu auto está en pausa</b><small>Por ahora ${esc(blockPub(o.blocked))}. Te avisaremos por WhatsApp apenas retomemos.</small></span></div>`;
  const d=o.delay;if(d&&d.t&&daysSince(d.t)<=5&&d.to===o.promised)return `<div class="alert-card delay"><span class="ac-i">${maIc('calendar',22)}</span><span class="ac-t"><b>${d.to<d.from?'Adelantamos tu entrega':'Cambió tu fecha de entrega'}</b><small>Antes ${fmtD(d.from)}, ahora <b>${MA.dlong(d.to)}</b>. Motivo: ${esc(d.reason)}.</small></span></div>`;
  return ''},
 /* ---------- INICIO ---------- */
 v_inicio(o){
  const v=MA.v(),pend=MA.pend(o);
  let h=`<div class="hello"><small>${MA.greet()}</small><h1>Hola, ${esc(MA.first())}</h1></div>`;
  if(o){const s=MA.st(o),tn=(o.tech&&tech(o.tech))?tech(o.tech).n:'Por asignar';
   h+=`<button class="status ${o.stage==='listo'?'ready':''}" onclick="MA.go('seguimiento')">
    <span class="st-top"><span class="st-dot"></span>Orden ${esc(o.id)} · ${esc(o.svc)}</span>
    <span class="st-h">${s.label}</span>
    <span class="bar"><i style="width:${s.pct}%"></i></span>
    <span class="st-meta"><span><small>Entrega estimada</small><b>${s.eta}</b></span><span><small>Técnico</small><b>${esc(tn)}</b></span></span>
    <span class="st-go">${maIc('chev',20)}</span></button>`+MA.delayCard(o);
   if(pend.length){const sum=pend.reduce((a,i)=>a+i.price*i.qty,0);
    h+=`<button class="alert-card" onclick="MA.go('presupuesto')"><span class="ac-i">${maIc('camera',22)}</span><span class="ac-t"><b>Encontramos ${pend.length} ${pend.length===1?'cosa':'cosas'} más</b><small>Mira las fotos y decide · hasta ${money0(sum)}</small></span>${maIc('chev',18)}</button>`}
   if(o.stage==='listo')h+=`<div class="alert-card ok"><span class="ac-i">${maIc('check',22)}</span><span class="ac-t"><b>Te esperamos en el taller</b><small>Lun–Vie 8:30–18:00 · Sáb 8:30–15:00 · Av. La Molina 724</small></span></div>`;
  }else{const last=MA.hist()[0];
   h+=MA.empty('car',`Tu ${esc(v.brand+' '+v.model)} no está en el taller`,last?`Último servicio: <b>${esc(last.svc)}</b> · ${MA.dlong(last.entAt||last.promised)}`:'Aún no tenemos servicios registrados.',`<button class="btn btn-y btn-block" onclick="MA.go('agendar')">${maIc('calendar',18)} Agendar una cita</button>`);
  }
  const every=v.every||10000,nk=(v.lastKm||v.km||0)+every,left=nk-(v.km||0);
  const nd=new Date((v.lastDate||D(0)).slice(0,10)+'T12:00');nd.setMonth(nd.getMonth()+6);
  h+=`<div class="card maint"><span class="mi">${maIc('gauge',22)}</span><span class="mt"><small>Próximo mantenimiento</small><b>${nk.toLocaleString('es-PE')} km</b><span>${left>0?`Faltan ~${left.toLocaleString('es-PE')} km`:'Ya te toca'} · o el ${fmtD(MA.iso(nd))}</span></span><button class="btn btn-s" onclick="MA.go('agendar')">Agendar</button></div>`;
  h+=MA.wa(o);
  const np=pend.length;
  h+=`<div class="tiles">
   <button onclick="MA.go('seguimiento')"><span class="ti">${maIc('pulse',20)}</span><b>Mi auto hoy</b><small>Seguimiento en vivo</small></button>
   <button onclick="MA.go('presupuesto')"><span class="ti">${maIc('file',20)}</span><b>Presupuesto</b><small>${np?np+' por aprobar':'Fotos y detalle'}</small></button>
   <button onclick="MA.go('historial')"><span class="ti">${maIc('history',20)}</span><b>Historial</b><small>${MA.hist().length} servicio(s)</small></button>
   <button onclick="MA.go('agendar')"><span class="ti">${maIc('calendar',20)}</span><b>Agendar</b><small>Elige día y hora</small></button></div>`;
  return h;
 },

 /* ---------- SEGUIMIENTO ---------- */
 /* ---------- MI AUTO HOY: el viaje de tu auto, explicado paso a paso ---------- */
 JR:{
  recibido:{t:'Recibimos tu auto',now:'Tu auto ya está con nosotros',d:'Dejaste tu auto en el taller. Anotamos cómo llegó, lo que nos pediste y lo que dejaste adentro. Todo queda en tu hoja de recepción firmada.'},
  diag:{t:'Revisamos tu auto',now:'Estamos revisando tu auto',d:'Un técnico revisa tu auto para encontrar la causa del problema y empieza los trabajos que acordamos al recibirlo.'},
  aprob:{t:'Tú decides los extras',now:'Necesitamos tu respuesta',d:'Si encontramos algo más, te mostramos fotos y el precio. Tú decides qué hacemos. Nunca hacemos un trabajo extra sin tu permiso.'},
  rep:{t:'Reparamos tu auto',now:'Estamos trabajando en tu auto',d:'Hacemos todos los trabajos acordados, incluidos los extras que aprobaste, con repuestos de calidad.'},
  cc:{t:'Lo probamos',now:'Estamos probando tu auto',d:'Revisamos que todo quedó bien y salimos a manejarlo, para confirmar que no hay ruidos ni fallas antes de entregártelo.'},
  listo:{t:'Listo para recoger',now:'¡Tu auto está listo!',d:'Tu auto está limpio y listo. Puedes recogerlo en el horario del taller. Pasadas 48 horas del aviso se cobra guardianía.'}
 },
 jrOpen:{},jrQ:{},
 jrT(k){MA.jrOpen[k]=!MA.jrOpenNow(k);MA.render(true)},
 jrQt(k){MA.jrQ[k]=!MA.jrQ[k];MA.render(true)},
 jrOpenNow(k){const o=MA.active();return k in MA.jrOpen?MA.jrOpen[k]:(o&&o.stage===k)},
 stageAt(o,t){let k='recibido';(o.hist||[]).forEach(h=>{if(h.t&&t&&h.t<=t)k=h.k});return k},
 stageDate(o,k){const h=(o.hist||[]).find(x=>x.k===k);if(h)return h.t;if(k==='recibido')return o.created;const e=o.log.find(x=>x.pub&&MA.stageAt(o,x.t)===k);return e?e.t:null},
 fuelTxt(f){return f>=100?'Tanque lleno':f>=75?'Tres cuartos':f>=50?'Medio tanque':f>=25?'Un cuarto':'Casi vacío'},
 now(o){const J=MA.JR[o.stage]||MA.JR.recibido,pend=MA.pend(o),tn=(o.tech&&tech(o.tech))?tech(o.tech).n.split(' ')[0]:'Nuestro técnico',W=workItems(o),left=W.filter(i=>!i.done).length;
  let sub='',btn='';
  if(o.stage==='recibido')sub='Pronto un técnico empezará a revisarlo. Te avisaremos cada avance aquí.';
  if(o.stage==='diag')sub=`${tn} está revisando tu auto${W.some(i=>i.done)?' y ya avanzó con algunos trabajos':''}.`;
  if(o.stage==='aprob'){sub=pend.length?`Encontramos ${pend.length} ${pend.length===1?'cosa':'cosas'} más en tu auto. Mira las fotos y dinos qué hacemos.`:'Estamos preparando tu presupuesto. Te avisaremos por WhatsApp.';if(pend.length)btn=`<button class="btn btn-y btn-block big" onclick="MA.go('presupuesto')">${maIc('camera',20)} Ver fotos y decidir</button>`}
  if(o.stage==='rep')sub=left?`${tn} está haciendo los trabajos. ${left===1?'Falta 1 trabajo':'Faltan '+left+' trabajos'}.`:`${tn} está terminando los últimos detalles.`;
  if(o.stage==='cc')sub='Es el último paso antes de entregártelo.';
  if(o.stage==='listo'){sub='Te esperamos de lunes a viernes de 8:30 a 18:00 y sábados de 8:30 a 15:00, en Av. La Molina 724.';btn=`<a class="btn btn-y btn-block big" href="https://maps.google.com/?q=Av.+La+Molina+724,+La+Molina" target="_blank" rel="noopener">${maIc('pin',20)} Cómo llegar</a>`}
  const s=MA.st(o);
  return `<div class="nowc ${o.stage==='listo'?'ready':''}"><small>Ahora mismo</small><h2>${o.stage==='aprob'&&!pend.length?'Preparamos tu presupuesto':J.now}</h2><p>${sub}</p>
   <div class="nowc-eta">${maIc('calendar',18)}<span>Entrega estimada<b>${s.eta}</b></span></div>${btn}</div>`},
 works(o){const W=o.items.filter(i=>i.ap!==false);if(!W.length)return '';
  const ok=W.filter(i=>i.ap===true),done=ok.filter(i=>i.done).length;
  const lbl={done:'Terminado',now:'Trabajando ahora',todo:'Por hacer',ask:'Esperando tu decisión'};
  return `<div class="sec-t big"><span>Lo que estamos haciendo</span><small>${done} de ${ok.length} listos</small></div>
   <div class="card wl"><div class="bar"><i style="width:${ok.length?done/ok.length*100:0}%"></i></div>${W.map(i=>{const w=workState(o,i);
    return `<div class="wl-r ${w}" ${w==='ask'?`role="button" tabindex="0" onclick="MA.go('presupuesto')"`:''}><span class="wl-c">${w==='done'?maIc('check',16):w==='ask'?maIc('camera',15):''}</span><span class="wl-t"><b>${esc(i.desc)}</b><small>${lbl[w]}${w==='done'&&i.done?' · '+MA.when(i.done):''}${w==='ask'?' · toca para ver':''}</small></span></div>`}).join('')}</div>`},
 recBlock(o){const v=MA.v(),u=o.asesor&&typeof user==='function'?user(o.asesor):null,base=o.items.filter(i=>i.st==='base'),ing=(o.photos||[]).map((p,i)=>({p,i})).filter(x=>x.p.ing),objs=(o.objs||'').split(',').map(x=>x.trim()).filter(Boolean);
  const f=o.fuel??50;
  return `<div class="rcp">
   <div class="rcp-g"><div><small>Llegó</small><b>${MA.when(o.created)}</b></div><div><small>Te atendió</small><b>${esc(u?u.n:'Tu asesor')}</b></div>
    <div><small>Kilometraje</small><b>${Number(o.km||v.km||0).toLocaleString('es-PE')} km</b></div><div><small>Combustible</small><b>${MA.fuelTxt(f)}</b><span class="fuel"><i style="width:${f}%"></i></span></div></div>
   ${o.note?`<div class="rcp-s"><small>Lo que nos contaste</small><p class="quote">“${esc(o.note)}”</p></div>`:''}
   ${base.length?`<div class="rcp-s"><small>Lo que acordamos hacer</small>${base.map(i=>`<div class="rcp-i"><span>${esc(i.desc)}</span><b>${money0(i.price*i.qty)}</b></div>`).join('')}</div>`:''}
   <div class="rcp-s"><small>Lo que dejaste en el auto</small>${objs.length?`<div class="chips">${objs.map(x=>`<span class="chip">${esc(x)}</span>`).join('')}</div>`:'<p>No dejaste objetos de valor.</p>'}</div>
   ${ing.length?`<div class="rcp-s"><small>Así llegó tu auto</small><div class="gal">${ing.map(x=>MA.thumb(x.p,`MA.openPhoto('${o.id}',${x.i})`)).join('')}</div></div>`:''}
   <button class="btn btn-o btn-block big" onclick="MA.recSheet('${o.id}')">${maIc('file',20)} Ver hoja de recepción firmada</button></div>`},
 recSheet(id){const o=ot(id);if(!o)return;const v=veh(o.plate)||{},u=o.asesor&&typeof user==='function'?user(o.asesor):null,base=o.items.filter(i=>i.st==='base');
  MA.sheet(`<div class="sh-c"><h3>Hoja de recepción</h3><p class="mut">Orden ${esc(o.id)} · ${MA.when(o.created)}</p>
   <div class="card list flat">
    <div class="ap-r"><span class="ap-n"><b>Cliente</b><small>${esc(MA.c().n)}</small></span></div>
    <div class="ap-r"><span class="ap-n"><b>Auto</b><small>${esc(carName(o.plate))} · ${esc(o.plate)}${v.color?' · '+esc(v.color):''}</small></span></div>
    <div class="ap-r"><span class="ap-n"><b>Kilometraje y combustible</b><small>${Number(o.km||v.km||0).toLocaleString('es-PE')} km · ${MA.fuelTxt(o.fuel??50)}</small></span></div>
    <div class="ap-r"><span class="ap-n"><b>Lo que nos contaste</b><small>${esc(o.note||'—')}</small></span></div>
    <div class="ap-r"><span class="ap-n"><b>Objetos dejados</b><small>${esc(o.objs||'Ninguno')}</small></span></div>
    ${base.map(i=>`<div class="ap-r"><span class="ap-n"><b>${esc(i.desc)}</b><small>Servicio acordado</small></span><span class="ap-p">${money(i.price*i.qty)}</span></div>`).join('')}
   </div>
   <div class="sig-box">${o.sig?`<img src="${o.sig}" alt="Tu firma">`:`<span class="sig-fake">${esc(MA.c().n)}</span>`}<small>Firmado por ti en la tablet del taller · ${MA.when(o.created)}${u?' · atendido por '+esc(u.n):''}</small></div>
   <p class="mut sm">Pasadas 48 horas del aviso de “listo”, se cobra guardianía de US$ 10 por día. El taller no se responsabiliza por objetos de valor no declarados.</p>
   <button class="btn btn-y btn-block" onclick="MA.closeSheet()">Entendido</button></div>`)},
 v_seguimiento(o){
  let h=`<div class="pg-h"><h1>Mi auto hoy</h1><p>${o?`${esc(o.svc)} · Orden ${esc(o.id)}`:esc(carName(MA.plate))}</p></div>`;
  if(!o)return h+MA.empty('car','Tu auto no está en el taller ahora','Cuando lo dejes con nosotros, aquí verás paso a paso todo lo que hacemos, con fotos.',`<button class="btn btn-o btn-block" onclick="MA.go('historial')">Ver historial</button>`);
  h+=MA.now(o)+MA.delayCard(o)+MA.works(o);
  const keys=STAGES.filter(x=>x.k!=='ent').map(x=>x.k),cur=keys.indexOf(o.stage),ph=o.photos||[];
  const ev=o.log.filter(e=>e.pub).slice().sort((a,b)=>(a.t||'').localeCompare(b.t||''));
  const att={};ph.forEach((p,pi)=>{if(!p.t||p.ing)return;let best=-1;ev.forEach((e,ei)=>{if(e.t&&e.t<=p.t&&e.t.slice(0,10)===p.t.slice(0,10))best=ei});if(best>=0)(att[best]=att[best]||[]).push(pi)});
  const hadAprob=(o.hist||[]).some(x=>x.k==='aprob')||o.items.some(i=>i.st==='adic');
  h+=`<div class="sec-t big"><span>El viaje de tu auto</span><small>Toca cada paso</small></div><div class="jr-l">`;
  keys.forEach((k,j)=>{
   const J=MA.JR[k],skip=k==='aprob'&&j<cur&&!hadAprob,st=skip?'skip':j<cur||(o.stage==='listo'&&j===cur)?'done':j===cur?'cur':'next';
   const dt=MA.stageDate(o,k),open=st!=='next'&&!skip&&MA.jrOpenNow(k),q=MA.jrQ[k]||(st==='cur'&&!(k in MA.jrQ));
   const evs=ev.map((e,i)=>({e,i})).filter(x=>MA.stageAt(o,x.e.t)===k&&!(k==='recibido'&&/^Recibimos tu auto/.test(x.e.txt)));
   const status=skip?'No hizo falta: no hubo trabajos extra':st==='done'?'Hecho'+(dt?' · '+MA.when(dt):''):st==='cur'?'Ahora':'Después';
   h+=`<div class="jr ${st}"><button class="jr-h" ${st==='next'||skip?'disabled':''} onclick="MA.jrT('${k}')" aria-expanded="${open}"><span class="jr-n">${st==='done'?maIc('check',18):st==='skip'?'–':j+1}</span><span class="jr-t"><b>${J.t}</b><small>${status}${st!=='next'&&!skip&&!open&&(evs.length||k==='recibido')?' · ver detalle':''}</small></span>${st!=='next'&&!skip?`<span class="jr-ch ${open?'up':''}">${maIc('chev',18)}</span>`:''}</button>
    <div class="jr-b">${q?`<p class="jr-d">${J.d}</p>`:''}<button class="jr-q" onclick="MA.jrQt('${k}')">${maIc('info',16)} ${q?'Ocultar explicación':'¿Qué significa?'}</button>
    ${open?(k==='recibido'?MA.recBlock(o):'')+(evs.length?`<div class="jr-ev">${evs.map(({e,i})=>`<div class="ev"><small>${MA.when(e.t)}${e.who?' · '+(e.who===MA.c().n?'Tú':esc(e.who)):''}</small><p>${esc(e.txt)}</p>${att[i]?`<div class="tl-ph">${att[i].map(pi=>MA.thumb({...ph[pi],lbl:''},`MA.openPhoto('${o.id}',${pi})`)).join('')}</div>`:''}</div>`).join('')}</div>`:(k!=='recibido'?'<p class="mut">Aún no hay novedades en este paso.</p>':'')):''}</div></div>`;
  });
  h+=`</div>`+MA.wa(o);
  return h;
 },

 /* ---------- PRESUPUESTO ---------- */
 v_presupuesto(o){
  let h=`<div class="pg-h"><h1>Presupuesto</h1><p>${o?`Orden ${esc(o.id)} · ${esc(o.svc)}`:esc(carName(MA.plate))}</p></div>`;
  if(!o)return h+MA.empty('file','No tienes un presupuesto activo','Los comprobantes de tus servicios anteriores están en el historial.',`<button class="btn btn-o btn-block" onclick="MA.go('historial')">Ver historial</button>`);
  const t=otTotals(o),pend=MA.pend(o);
  pend.forEach(i=>{if(!(i.id in MA.sel))MA.sel[i.id]=i.urg!=='opt'});
  const selItems=pend.filter(i=>MA.sel[i.id]),selSum=selItems.reduce((a,i)=>a+i.price*i.qty,0);
  const selNet=selSum-(o.disc?Math.round(selSum*o.disc)/100:0);
  h+=`<div class="tot-card"><small>${pend.length?'Total con lo que elegiste':'Total de tu orden'}</small><div class="big">${money(t.total+selNet)}</div><small>Ya aprobado: ${money(t.total)}${t.disc?` · incluye ${o.disc}% de descuento`:''} · Precios con IGV</small></div>`;
  if(pend.length){
   h+=`<div class="sec-t"><span>Nuevos hallazgos</span><small>${pend.length} esperan tu decisión</small></div>`;
   h+=pend.map(i=>{const U={bad:['Urgente','bad'],warn:['Recomendado','warn'],opt:['Opcional','opt']}[i.urg]||['Sugerido','opt'];const on=!!MA.sel[i.id];
    return `<div class="xc ${on?'on':'off'}">${MA.itemMedia(i,o)}<div class="xc-b"><span class="tag ${U[1]}">${U[0]}</span><h3>${esc(i.desc)}</h3>${i.why?`<p>${esc(i.why)}</p>`:''}
     <div class="xc-f"><b>${money(i.price*i.qty)}</b><div class="yn" role="group" aria-label="¿Lo hacemos?"><button class="${on?'on y':''}" onclick="MA.pick('${i.id}',1)">${maIc('check',16)} Sí</button><button class="${!on?'on n':''}" onclick="MA.pick('${i.id}',0)">No</button></div></div></div></div>`}).join('');
   h+=`<div class="decide"><span><small>Agregas ${selItems.length} de ${pend.length}</small><b>+ ${money(selSum)}</b></span><button class="btn btn-y" onclick="MA.askConfirm()">Confirmar mi decisión</button></div>`;
  }else if(o.quote==='borrador'||(o.stage==='aprob'&&o.quote!=='aprobada')||o.stage==='diag'||o.stage==='recibido'){
   h+=`<div class="card note">${maIc('clock',20)}<span>Estamos revisando tu auto. Si encontramos algo más, te avisaremos por WhatsApp y lo verás aquí con fotos.</span></div>`;
  }
  const ok=o.items.filter(i=>i.ap===true),no=o.items.filter(i=>i.ap===false);
  if(ok.length||no.length){
   h+=`<div class="sec-t"><span>Lo que ya aprobaste</span><small>${ok.length} trabajo(s)</small></div><div class="card list">${ok.map(i=>MA.apRow(i,true)).join('')}${no.map(i=>MA.apRow(i,false)).join('')}
    ${t.disc?`<div class="ap-t"><span>Descuento ${o.disc}%</span><span>−${money(t.disc)}</span></div>`:''}<div class="ap-t tt"><span>Total aprobado</span><b>${money(t.total)}</b></div></div>`;
  }
  const ins=o.insp||[];
  if(ins.length){
   const cnt={ok:0,warn:0,bad:0};ins.forEach(x=>cnt[x.s]=(cnt[x.s]||0)+1);
   const ord={bad:0,warn:1,ok:2},lbl={bad:'Atender ya',warn:'Pronto',ok:'Bien'};
   const row=x=>`<div class="in-r"><span class="sem-d ${x.s}"></span><span><b>${esc(x.n)}</b><small>${esc(x.c)}${x.note?' · '+esc(x.note):''}</small></span><span class="in-s ${x.s}">${lbl[x.s]||''}</span></div>`;
   const nok=ins.filter(x=>x.s!=='ok').sort((a,b)=>ord[a.s]-ord[b.s]),oks=ins.filter(x=>x.s==='ok');
   h+=`<div class="sec-t"><span>Inspección de ${ins.length} puntos</span></div><div class="card insp">
    <div class="sem"><div class="s bad"><b>${cnt.bad}</b><small>Atender ya</small></div><div class="s warn"><b>${cnt.warn}</b><small>Pronto</small></div><div class="s ok"><b>${cnt.ok}</b><small>Bien</small></div></div>
    ${nok.map(row).join('')}
    ${oks.length?`<details><summary>Ver los ${oks.length} puntos en buen estado ${maIc('chev',16)}</summary>${oks.map(row).join('')}</details>`:''}</div>`;
  }
  return h;
 },
 apRow(i,ok){const ph=i.img&&MA_IMG[i.img]?`<button class="ap-ph" onclick="MA.openImg('${i.img}',null,null,${JSON.stringify(i.desc).replace(/"/g,'&quot;')})"><img src="${MA_IMG[i.img]}" alt=""></button>`:'';
  return `<div class="ap-r ${ok?'':'no'}"><span class="ap-c ${ok?'ok':'no'}">${maIc(ok?'check':'x',14)}</span><span class="ap-n"><b>${esc(i.desc)}</b><small>${i.k==='S'?'Servicio':'Repuesto'}${i.qty>1?' · '+i.qty+' u.':''}${ok?'':' · No aprobado'}</small></span>${ph}<span class="ap-p">${money(i.price*i.qty)}</span></div>`},
 pick(id,v){MA.sel[id]=!!v;MA.render(true)},
 askConfirm(){
  const o=MA.active(),pend=MA.pend(o);if(!pend.length)return;
  const yes=pend.filter(i=>MA.sel[i.id]),sum=yes.reduce((a,i)=>a+i.price*i.qty,0);
  MA.sheet(`<div class="sh-c"><h3>¿Confirmas tu decisión?</h3><p class="mut">Le avisaremos al taller al instante.</p>
   <div class="card list flat">${pend.map(i=>`<div class="ap-r ${MA.sel[i.id]?'':'no'}"><span class="ap-c ${MA.sel[i.id]?'ok':'no'}">${maIc(MA.sel[i.id]?'check':'x',14)}</span><span class="ap-n"><b>${esc(i.desc)}</b><small>${MA.sel[i.id]?'Sí, háganlo':'Por ahora no'}</small></span><span class="ap-p">${money(i.price*i.qty)}</span></div>`).join('')}
   <div class="ap-t tt"><span>Agregas</span><b>${money(sum)}</b></div></div>
   <button class="btn btn-y btn-block" onclick="MA.confirmQuote()">Sí, confirmar</button><button class="btn-link" onclick="MA.closeSheet()">Volver a revisar</button></div>`);
 },
 confirmQuote(){
  const o=MA.active(),pend=MA.pend(o);if(!o||!pend.length){MA.closeSheet();return}
  const yes=[],no=[];
  pend.forEach(i=>{const v=!!MA.sel[i.id];i.ap=v;i.apAt=nowISO();(v?yes:no).push(i)});
  o.quote=yes.length?'aprobada':'rechazada';o.quoteAnsAt=nowISO();
  const name=MA.c().n,sum=yes.reduce((a,i)=>a+i.price*i.qty,0);
  logOT(o,yes.length?`Aprobaste: ${yes.map(i=>i.desc).join(', ')}.${no.length?` No aprobaste: ${no.map(i=>i.desc).join(', ')}.`:''}`:`No aprobaste los trabajos adicionales: ${no.map(i=>i.desc).join(', ')}.`,1);
  notify(yes.length?`${name} aprobó ${yes.length} de ${pend.length} adicionales de ${o.plate} (OT ${o.id}) desde Mi Auto · +${money0(sum)}`:`${name} rechazó los adicionales de ${o.plate} (OT ${o.id}) desde Mi Auto`,yes.length?'ok':'warn',yes.length?'check':'x','tablero');
  if(o.stage==='aprob')setStage(o.id,'rep',{silent:true});
  reserveItems(o);save();
  MA.sel={};MA.render();
  MA.sheet(`<div class="sh-c center"><span class="done-i">${maIc('check',34)}</span><h3>¡Listo, ${esc(MA.first())}!</h3><p class="mut">${yes.length?`Aprobaste ${yes.length} de ${pend.length} trabajos. Tu auto ya pasó a <b>reparación</b>.`:'Registramos que por ahora no deseas los trabajos extra. Seguimos con lo aprobado.'}</p>
   <div class="big-t"><small>Nuevo total de tu orden</small><b>${money(otTotals(o).total)}</b></div>
   <button class="btn btn-y btn-block" onclick="MA.go('seguimiento')">Ver mi auto hoy</button><button class="btn-link" onclick="MA.closeSheet()">Cerrar</button></div>`);
 },

 /* ---------- HISTORIAL ---------- */
 v_historial(o){
  const hs=MA.hist();
  let h=`<div class="pg-h"><h1>Historial</h1><p>${esc(carName(MA.plate))} · ${esc(MA.plate)}</p></div>`;
  if(o)h+=`<button class="hrow cur" onclick="MA.go('seguimiento')"><span class="hr-d now">${maIc('wrench',18)}</span><span class="hr-n"><b>${esc(o.svc)}</b><small>En curso · Orden ${esc(o.id)}</small></span><span class="hr-t">${MA.st(o).label}</span>${maIc('chev',16)}</button>`;
  if(!hs.length)return h+MA.empty('history','Aún no hay servicios entregados','Cuando recojas tu auto, aquí quedará el detalle y el comprobante.');
  const sum=hs.reduce((a,x)=>a+otTotals(x).total,0);
  h+=`<div class="card hsum"><span><b>${hs.length}</b><small>servicio(s)</small></span><span><b>${money0(sum)}</b><small>invertidos en tu auto</small></span></div>`;
  h+=`<div class="card list">${hs.map(x=>{const d=new Date((x.entAt||x.promised||D(0)).slice(0,10)+'T12:00');
   return `<button class="hrow" onclick="MA.receipt('${x.id}')"><span class="hr-d"><b>${d.getDate()}</b><small>${MN[d.getMonth()]} ${String(d.getFullYear()).slice(2)}</small></span><span class="hr-n"><b>${esc(x.svc)}</b><small>Orden ${esc(x.id)}${x.tech&&tech(x.tech)?' · '+esc(tech(x.tech).n):''}</small></span><span class="hr-t">${money0(otTotals(x).total)}</span>${maIc('chev',16)}</button>`}).join('')}</div>`;
  return h;
 },
 receipt(id){
  const o=ot(id);if(!o)return;const t=otTotals(o),v=veh(o.plate)||{};
  const no=(o.doc==='factura'?'F001-':'B001-')+String(900+(parseInt(String(o.id).slice(-3),10)||0)).padStart(6,'0');
  MA.sheet(`<div class="rc"><div class="rc-h"><img src="../intranet/img/logo1.png" alt="Gallo Autos"><span><b>${o.doc==='factura'?'Factura':'Boleta'} electrónica</b><small>${no}</small></span></div>
   <div class="rc-m"><div><small>Fecha</small><b>${fmtDT(o.entAt||o.promised)}</b></div><div><small>Vehículo</small><b>${esc(carName(o.plate))}</b></div><div><small>Placa</small><b>${esc(o.plate)}</b></div><div><small>Pago</small><b>${esc(o.pay||'—')}</b></div>${o.km?`<div><small>Kilometraje</small><b>${Number(o.km).toLocaleString('es-PE')} km</b></div>`:''}<div><small>OT</small><b>${esc(o.id)}</b></div></div>
   <div class="rc-i">${o.items.filter(i=>i.ap===true).map(i=>`<div><span><b>${esc(i.desc)}</b><small>${i.qty} × ${money(i.price)} · ${i.k==='S'?'Servicio':'Repuesto'}</small></span><span>${money(i.price*i.qty)}</span></div>`).join('')}</div>
   <div class="rc-t">${t.disc?`<div><span>Subtotal</span><span>${money(t.sub)}</span></div><div><span>Descuento ${o.disc}%</span><span>−${money(t.disc)}</span></div>`:''}<div><span>IGV incluido</span><span>${money(t.igv)}</span></div><div class="tt"><span>Total</span><b>${money(t.total)}</b></div></div>
   <p class="rc-n">Garantía de 30 días en mano de obra y según fabricante en repuestos. Documento simulado para demostración.</p>
   <button class="btn btn-o btn-block" onclick="MA.closeSheet()">Cerrar</button></div>`);
 },

 /* ---------- AGENDAR ---------- */
 SVC_IDS:['S01','S02','S03','S05','S06','S07','S09','S14','S16'],
 HOURS:['08:30','09:00','09:30','10:00','10:30','11:00','11:30','14:00','14:30','15:00','16:00','17:00'],
 days(){const r=[];for(let n=1;n<=7;n++){const k=D(n),d=new Date(k+'T12:00');r.push({k,d,off:d.getDay()===0})}return r},
 v_agendar(){
  const b=MA.bk,days=MA.days();
  if(!b.day||!days.some(x=>x.k===b.day&&!x.off))b.day=(days.find(x=>!x.off)||days[0]).k;
  const taken=S.appts.filter(a=>a.date===b.day&&!['cancel','cancelada','noshow'].includes(a.status)).map(a=>a.hour);
  if(b.hour&&taken.includes(b.hour))b.hour=null;
  const sv=MA.SVC_IDS.map(id=>SERV.find(s=>s.id===id)).filter(Boolean);
  const up=S.appts.filter(a=>a.plate===MA.plate&&a.date>=D(0)&&a.status==='pend').sort((a,c)=>(a.date+a.hour).localeCompare(c.date+c.hour));
  let h=`<div class="pg-h"><h1>Agendar cita</h1><p>Elige servicio, día y hora. Te confirmamos al instante.</p></div>`;
  if(up.length)h+=`<div class="card list">${up.map(a=>`<div class="ap-r"><span class="ap-c cal">${maIc('calendar',14)}</span><span class="ap-n"><b>${esc(a.svc)}</b><small>${MA.dlong(a.date)} · ${esc(a.hour)}</small></span><span class="tag ok">Confirmada</span></div>`).join('')}</div>`;
  h+=`<div class="card"><div class="lbl"><i>1</i>¿Qué necesita tu auto?</div><div class="chips">${sv.map(s=>`<button class="chip svc ${b.svc===s.id?'on':''}" onclick="MA.bkSet('svc','${s.id}')"><b>${esc(s.n)}</b><small>desde ${money0(s.price)}</small></button>`).join('')}</div></div>
   <div class="card"><div class="lbl"><i>2</i>Elige el día</div><div class="chips row">${days.map(x=>`<button class="chip day ${b.day===x.k?'on':''}" ${x.off?'disabled':''} onclick="MA.bkSet('day','${x.k}')"><small>${DN[x.d.getDay()]}</small><b>${x.d.getDate()}</b><small>${x.off?'Cerrado':MN[x.d.getMonth()]}</small></button>`).join('')}</div></div>
   <div class="card"><div class="lbl"><i>3</i>Elige la hora</div><div class="chips hours">${MA.HOURS.map(x=>`<button class="chip ${b.hour===x?'on':''}" ${taken.includes(x)?'disabled title="Ocupado"':''} onclick="MA.bkSet('hour','${x}')">${x}</button>`).join('')}</div></div>
   <div class="card"><div class="lbl"><i>4</i>¿Algo que debamos revisar? <small>(opcional)</small></div><textarea id="maNote" rows="2" maxlength="300" placeholder="Ej.: suena la llanta delantera al frenar" oninput="MA.bk.note=this.value">${esc(b.note)}</textarea></div>`;
  const s=b.svc&&SERV.find(x=>x.id===b.svc),ready=s&&b.day&&b.hour;
  h+=`<div class="decide"><span><small>Tu cita</small><b>${ready?`${MA.dlong(b.day)} · ${b.hour}`:s?'Elige la hora':'Elige un servicio'}</b></span><button class="btn btn-y" ${ready?'':'disabled'} onclick="MA.book()">Confirmar cita</button></div>`;
  return h;
 },
 bkSet(k,v){MA.bk[k]=v;MA.render(true)},
 book(){
  const b=MA.bk,s=b.svc&&SERV.find(x=>x.id===b.svc);
  if(!s||!b.day||!b.hour){MA.toast('Elige servicio, día y hora','alert');return}
  const name=MA.c().n;S.counters=S.counters||{};if(typeof S.counters.appt!=='number')S.counters.appt=S.appts.length;
  const a={id:'a'+(++S.counters.appt),date:b.day,hour:b.hour,plate:MA.plate,client:name,svc:s.n,status:'pend',src:'Mi Auto'};
  const note=String(b.note||'').trim().slice(0,300);if(note)a.note=note;
  S.appts.push(a);
  notify(`Nueva cita desde Mi Auto: ${name} (${MA.plate}) · ${s.n} · ${fmtD(b.day)} ${b.hour}`,'info','calendar','agenda');
  if(typeof waSend==='function'){try{waSend(name,MA.c().tel||'',`Hola ${MA.first()}, tu cita para tu ${carName(MA.plate)} (${MA.plate}) quedó confirmada: ${fmtD(b.day)} a las ${b.hour}. ¡Te esperamos!`,'recordatorio cita',true)}catch(e){}}
  save();
  MA.bk={svc:null,day:null,hour:null,note:''};MA.render();
  MA.sheet(`<div class="sh-c center"><span class="done-i">${maIc('calendar',32)}</span><h3>¡Cita confirmada!</h3><p class="mut">Te enviamos la confirmación por WhatsApp.</p>
   <div class="card list flat"><div class="ap-r"><span class="ap-n"><small>Servicio</small><b>${esc(s.n)}</b></span></div><div class="ap-r"><span class="ap-n"><small>Día y hora</small><b>${MA.dlong(a.date)} · ${esc(a.hour)}</b></span></div><div class="ap-r"><span class="ap-n"><small>Dónde</small><b>Av. La Molina 724, La Molina</b></span></div>${note?`<div class="ap-r"><span class="ap-n"><small>Tu nota</small><b>${esc(note)}</b></span></div>`:''}</div>
   <button class="btn btn-y btn-block" onclick="MA.go('inicio')">Volver al inicio</button></div>`);
 },

 /* ---------- perfil ---------- */
 profile(){
  const c=MA.c(),v=MA.v();if(!v)return;
  MA.sheet(`<div class="sh-c"><div class="pf"><span class="av big">${esc(initials(c.n))}</span><span><b>${esc(c.n)}</b><small>${esc(c.tel||'')}${c.mail?' · '+esc(c.mail):''}</small></span></div>
   <div class="card list flat"><div class="ap-r"><span class="ap-c cal">${maIc('car',14)}</span><span class="ap-n"><b>${esc(carName(MA.plate))}</b><small>${esc(v.color||'')} · ${Number(v.km||0).toLocaleString('es-PE')} km</small></span><span class="pl">${esc(MA.plate)}</span></div>
   <a class="ap-r" href="../gallo-autos-demo.html"><span class="ap-c cal">${maIc('external',14)}</span><span class="ap-n"><b>Ir al sitio web de Gallo Autos</b></span></a></div>
   <button class="btn btn-o btn-block" onclick="MA.logout()">${maIc('logout',18)} Cerrar sesión</button></div>`);
 },

 /* ---------- hojas, visor, toast ---------- */
 sheet(html){const s=$('#maSheet');if(!s)return;s.innerHTML=`<span class="grab"></span>${html}`;s.scrollTop=0;s.classList.add('on');$('#maSheetBg').classList.add('on')},
 closeSheet(){const s=$('#maSheet');if(s)s.classList.remove('on');const b=$('#maSheetBg');if(b)b.classList.remove('on')},
 openMedia(k,t){const m=MA_MEDIA[k],vw=$('#maViewer');if(!m||!vw)return;MA._vm={k,i:0,s:0,play:true};
  vw.innerHTML=`<div class="vw-top"><span><b>${m.title}</b><small>${esc(m.sub)}${t?' · '+MA.when(t):''}</small></span><button class="vw-x" onclick="MA.closeViewer()" aria-label="Cerrar">${maIc('x',22)}</button></div>
   <div class="vw-stage" id="maVStage"></div>
   ${m.items.length>1?`<div class="vw-thumbs">${m.items.map((it,i)=>`<button onclick="MA.vShow(${i})">${it.art()}</button>`).join('')}</div>`:''}
   <p class="vw-cap" id="maVCap"></p><p class="vw-who">${esc(MA.advisor(MA.active()))} · tu asesor</p>`;
  vw.classList.add('on');MA.vShow(0)},
 vShow(i){if(!MA._vm)return;const m=MA_MEDIA[MA._vm.k],it=m.items[i];MA._vm.i=i;
  $('#maVStage').innerHTML=it.art()+(m.type==='video'?`<span class="rec">Video del taller</span><div class="vctl"><button id="maVBtn" onclick="MA.vToggle()" aria-label="Pausa">${maIc('pause',16)}</button><span id="maVTime">0:00</span><div class="vbar"><i id="maVBar"></i></div><span>0:${pad(m.dur)}</span></div>`:'');
  $('#maVCap').textContent=it.cap;
  $$('#maViewer .vw-thumbs button').forEach((b,j)=>b.classList.toggle('on',j===i));
  clearInterval(MA._vt);
  if(m.type==='video'){MA._vm.s=0;MA._vm.play=true;MA._vt=setInterval(()=>{const vm=MA._vm,bar=$('#maVBar');if(!vm||!bar){clearInterval(MA._vt);return}if(!vm.play)return;vm.s+=.1;if(vm.s>=m.dur)vm.s=0;bar.style.width=(vm.s/m.dur*100)+'%';$('#maVTime').textContent='0:'+pad(Math.floor(vm.s))},100)}},
 vToggle(){const vm=MA._vm;if(!vm)return;vm.play=!vm.play;$('#maVBtn').innerHTML=maIc(vm.play?'pause':'play',16);const sv=$('#maVStage svg');try{vm.play?sv.unpauseAnimations():sv.pauseAnimations()}catch(e){}},
 openImg(img,lbl,t,title){const vw=$('#maViewer');if(!vw)return;clearInterval(MA._vt);MA._vm=null;const src=MA_IMG[img];
  vw.innerHTML=`<div class="vw-top"><span><b>${esc(title||lbl||'Foto del taller')}</b><small>Foto del técnico${t?' · '+MA.when(t):''}</small></span><button class="vw-x" onclick="MA.closeViewer()" aria-label="Cerrar">${maIc('x',22)}</button></div>
   <div class="vw-stage img">${src?`<img src="${src}" alt="${esc(lbl||title||'')}">`:`<span class="ph-ph big">${maIc('camera',40)}<small>${esc(lbl||'Foto')}</small><small>La foto se ve en alta en el taller</small></span>`}</div>`;
  vw.classList.add('on')},
 closeViewer(){clearInterval(MA._vt);MA._vm=null;const vw=$('#maViewer');if(vw){vw.classList.remove('on');vw.innerHTML=''}},
 toast(t,i='bell'){const e=$('#maToast');if(!e)return;e.innerHTML=maIc(i,18)+'<span>'+t+'</span>';e.classList.add('show');clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove('show'),2800)}
};

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',MA.boot);else MA.boot();
