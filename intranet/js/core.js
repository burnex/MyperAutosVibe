/* =========================================================
   Núcleo: estado, utilidades, UI base, router, documentos
   ========================================================= */
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money=n=>'S/ '+Number(n||0).toLocaleString('es-PE',{minimumFractionDigits:2,maximumFractionDigits:2});
const money0=n=>'S/ '+Math.round(Number(n||0)).toLocaleString('es-PE');
const MN=['ene','feb','mar','abr','may','jun','jul','ago','set','oct','nov','dic'],DN=['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
const fmtD=iso=>{if(!iso)return '—';const d=new Date(iso.slice(0,10)+'T12:00');return `${d.getDate()} ${MN[d.getMonth()]}`};
const fmtDT=iso=>!iso?'—':`${fmtD(iso)}${iso.length>10?', '+iso.slice(11,16):''}`;
const nowISO=()=>{const d=new Date();return `${D(0)}T${pad(d.getHours())}:${pad(d.getMinutes())}`};
const daysSince=iso=>Math.floor((new Date(D(0)+'T12:00')-new Date(iso.slice(0,10)+'T12:00'))/864e5);
const initials=n=>String(n).split(/\s+/).slice(0,2).map(w=>w[0]).join('').toUpperCase();
const plateTag=p=>`<span class="plate">${esc(p)}</span>`;
const pill=(t,c='gray')=>`<span class="pill ${c}">${t}</span>`;

/* ---------- iconos ---------- */
const IC={
 home:'<path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
 board:'<rect x="3" y="3" width="7" height="18" rx="1.5"/><rect x="14" y="3" width="7" height="10" rx="1.5"/>',
 calendar:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
 car:'<path d="M5 17h14M3 13l2.2-5.5A2 2 0 0 1 7.1 6h9.8a2 2 0 0 1 1.9 1.5L21 13v4a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-1H7v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><circle cx="7.5" cy="13.5" r="1"/><circle cx="16.5" cy="13.5" r="1"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',
 clip:'<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><path d="m9 14 2 2 4-4"/>',
 file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
 camera:'<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
 wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',
 tool:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',
 box:'<path d="m21 8-9-5-9 5v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
 truck:'<path d="M1 3h13v13H1zM14 8h4l3 3v5h-7"/><circle cx="5.5" cy="18.5" r="2"/><circle cx="17.5" cy="18.5" r="2"/>',
 users:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
 user:'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
 chart:'<path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/>',
 bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0"/>',
 chat:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
 shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
 cash:'<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M6 12h.01M18 12h.01"/>',
 settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
 search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
 check:'<path d="M20 6 9 17l-5-5"/>',x:'<path d="M18 6 6 18M6 6l12 12"/>',
 alert:'<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01"/>',
 clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
 arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',chev:'<path d="m9 18 6-6-6-6"/>',
 print:'<path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
 download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
 phone:'<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
 star:'<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
 tag:'<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z"/><circle cx="7" cy="7" r="1.5"/>',
 send:'<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
 logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
 list:'<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
 percent:'<path d="M19 5 5 19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
 building:'<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/>',
 history:'<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/>',
 eye:'<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
 menu:'<path d="M3 6h18M3 12h18M3 18h18"/>',
 external:'<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/>',
 refresh:'<path d="M21 12a9 9 0 0 1-15 6.7L3 16M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M3 21v-5h5"/>',
 mail:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
 target:'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
 trash:'<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>',
 pen:'<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
 info:'<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
 key:'<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6M15.5 7.5l3 3"/>'
};
const ic=(n,s)=>`<svg class="i" viewBox="0 0 24 24"${s?` style="width:${s}px;height:${s}px"`:''}>${IC[n]||''}</svg>`;

/* ---------- estado ---------- */
const KEY='myper_intranet_v1';
let S;
function load(){try{const j=localStorage.getItem(KEY);if(j){const o=JSON.parse(j);if(o&&o.v===4)return o}}catch(e){}return null}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function resetDemo(){try{localStorage.removeItem(KEY)}catch(e){}location.reload()}
function recalcRes(){S.parts.forEach(p=>p.res=0);S.ots.forEach(o=>{if(o.stage==='ent')return;o.items.forEach(i=>{if(i.sku&&i.rs==='reservado'&&i.ap===true){const p=part(i.sku);if(p)p.res+=i.qty}})})}

// Sincronización en vivo entre pestañas (intranet ↔ Mi Auto) en el mismo navegador
let onExternalChange=null;
window.addEventListener('storage',e=>{if(e.key!==KEY||!e.newValue)return;try{const o=JSON.parse(e.newValue);if(o&&o.v===4){S=o;if(onExternalChange)onExternalChange()}}catch(_){}});

/* ---------- accesos ---------- */
const ot=id=>S.ots.find(o=>o.id===id);
const client=id=>S.clients.find(c=>c.id===id);
const veh=p=>S.vehicles.find(v=>v.plate===p);
const part=s=>S.parts.find(p=>p.sku===s);
const tech=id=>TECHS.find(t=>t.id===id);
const sup=id=>S.suppliers.find(s=>s.id===id);
const user=id=>S.users.find(u=>u.id===id);
const stage=k=>STAGES.find(s=>s.k===k);
const avail=p=>p.stock-p.res;
const clientOf=o=>client(o.client)||{n:'Cliente',type:'particular'};
const carName=p=>{const v=veh(p);return v?`${v.brand} ${v.model}${v.year?' '+v.year:''}`:p};
const curUser=()=>user(ROLES[S.role]?.who)||{n:'Usuario'};
let ACTOR=null; // Mi Auto lo fija con el nombre del cliente
const who=()=>ACTOR||curUser().n;
S=load();if(!S){S=buildSeed();recalcRes();save()}
// Los ids de ítems nuevos siguen después del mayor ya usado (evita choques entre sesiones)
_id=Math.max(_id,...S.ots.flatMap(o=>o.items.map(i=>parseInt(String(i.id).slice(1))||0)));

function otTotals(o){
  let ok=0,pend=0;
  o.items.forEach(i=>{const v=i.price*i.qty;if(i.ap===true)ok+=v;else if(i.ap===null)pend+=v});
  const disc=o.disc?Math.round(ok*o.disc)/100:0;
  return {sub:ok,disc,total:ok-disc,pend,igv:(ok-disc)-(ok-disc)/1.18};
}
const isLate=o=>o.stage!=='ent'&&o.stage!=='listo'&&o.promised<D(0);
const openOTs=()=>S.ots.filter(o=>o.stage!=='ent');
const nextOTId=()=>String(++S.counters.ot).padStart(6,'0');

/* ---------- bitácora / auditoría / mensajes ---------- */
function audit(txt){S.audit.unshift({t:nowISO(),who:who(),txt});S.audit=S.audit.slice(0,300)}
function logOT(o,txt,pub){const e={t:nowISO(),who:who(),txt};if(pub)e.pub=1;o.log.push(e);audit(`${txt} (OT ${o.id})`)}
function notify(txt,lvl='info',icn='bell',view){S.notifs.unshift({id:'n'+Date.now()+Math.random(),t:nowISO(),ic:icn,lvl,txt,view});S.notifs=S.notifs.slice(0,40)}
function waSend(to,tel,txt,kind,silent){S.wa.unshift({t:nowISO(),to,tel,txt,kind});S.wa=S.wa.slice(0,80);if(!silent)toast(`WhatsApp enviado a ${to}`,'chat')}
function waOT(o,txt,kind){const c=clientOf(o);waSend(c.n,c.tel,txt,kind,true)}

/* ---------- toasts / modales / drawer ---------- */
function toast(t,i='bell'){const e=$('#toast');e.innerHTML=ic(i)+'<span>'+t+'</span>';e.classList.add('show');clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove('show'),3400)}
function openModal(title,body,foot='',wide=false,id='modal'){const m=$('#'+id);m.innerHTML=`<div class="mbox ${wide?'wide':''}"><div class="mh"><h3>${title}</h3><button class="icbtn" onclick="closeModal('${id}')">${ic('x')}</button></div><div class="mb2">${body}</div>${foot?`<div class="mf">${foot}</div>`:''}</div>`;m.classList.add('on');m.onclick=e=>{if(e.target===m)closeModal(id)}}
function closeModal(id='modal'){$('#'+id).classList.remove('on')}
let DRAWER=null;
function openDrawer(head,body,foot='',key=null){DRAWER=key;$('#drawer').innerHTML=`<div class="dh">${head}<button class="x" onclick="closeDrawer()">${ic('x')}</button></div><div class="db">${body}</div>${foot?`<div class="df">${foot}</div>`:''}`;$('#drawer').classList.add('on');$('#ov').classList.add('on')}
function closeDrawer(){DRAWER=null;$('#drawer').classList.remove('on');$('#ov').classList.remove('on')}
function confirmBox(txt,fn,btn='Confirmar'){window._cf=fn;openModal('Confirmar',`<p>${txt}</p>`,`<button class="btn btn-o" onclick="closeModal()">Cancelar</button><button class="btn btn-b" onclick="closeModal();_cf()">${btn}</button>`)}

/* ---------- gráficos SVG ---------- */
function barsSVG(data,{w=560,h=200,fmt=v=>v,color='#D9D3FF',hi=null}={}){
  const max=Math.max(...data.map(d=>d.v),1),bw=Math.min(54,(w-40)/data.length-14),step=(w-40)/data.length;
  let s=`<svg class="chart" viewBox="0 0 ${w} ${h}" width="100%" role="img">`;
  for(let i=0;i<=3;i++){const y=14+(h-50)*i/3;s+=`<line x1="30" x2="${w}" y1="${y}" y2="${y}" stroke="#E5E7EB"/>`}
  data.forEach((d,i)=>{const bh=(h-50)*d.v/max,x=36+i*step+(step-bw)/2,y=h-30-bh;
    s+=`<rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="6" fill="${d.c||(i===hi?'#2908F1':color)}"/><text x="${x+bw/2}" y="${y-5}" text-anchor="middle" style="fill:#042551;font-weight:700">${fmt(d.v)}</text><text x="${x+bw/2}" y="${h-10}" text-anchor="middle">${d.l}</text>`});
  return s+'</svg>';
}
function donutSVG(data,{size=170}={}){
  const tot=data.reduce((a,d)=>a+d.v,0)||1,r=60,c=2*Math.PI*r;let off=0;
  let s=`<svg viewBox="0 0 170 170" width="${size}" height="${size}"><circle cx="85" cy="85" r="${r}" fill="none" stroke="#EEF0F4" stroke-width="26"/>`;
  data.forEach(d=>{const len=c*d.v/tot;s+=`<circle cx="85" cy="85" r="${r}" fill="none" stroke="${d.c}" stroke-width="26" stroke-dasharray="${len} ${c-len}" stroke-dashoffset="${-off}" transform="rotate(-90 85 85)"/>`;off+=len});
  return s+`<text x="85" y="82" text-anchor="middle" style="font-size:22px;font-weight:900;fill:#042551">${tot>999?Math.round(tot/1000)+'k':tot}</text><text x="85" y="100" text-anchor="middle" style="font-size:10px;fill:#6B7280">total</text></svg>`;
}
const legend=d=>`<div class="legend" style="flex-direction:column;gap:6px;margin:0">${d.map(x=>`<span><i style="background:${x.c}"></i>${x.l} · <b>${x.f||x.v}</b></span>`).join('')}</div>`;

/* ---------- CSV ---------- */
function downloadCSV(name,rows){
  const csv='﻿'+rows.map(r=>r.map(c=>`"${String(c??'').replace(/"/g,'""')}"`).join(';')).join('\r\n');
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));a.download=name+'.csv';a.click();toast(`Archivo ${name}.csv descargado`,'download');
}

/* ---------- inventario: lógica compartida ---------- */
function moveKardex(sku,type,qty,ref){S.kardex.unshift({t:nowISO(),sku,type,qty,ref,who:who()})}
function reserveItems(o){
  o.items.forEach(i=>{
    if(!i.sku||i.ap!==true||(i.rs&&i.rs!=='sin stock'&&i.rs!=='solicitado'))return;
    const p=part(i.sku);if(!p)return;
    if(avail(p)>=i.qty){i.rs='reservado';moveKardex(i.sku,'reserva',i.qty,'OT '+o.id);p.res+=i.qty}
    else{i.rs='sin stock';notify(`OT ${o.id}: sin stock de ${p.name}. Sugerida compra.`,'bad','box','inventario')}
  });
}
function deliverItem(o,i){
  const p=part(i.sku);if(!p||i.rs==='entregado')return false;
  if(i.rs!=='reservado'){if(avail(p)<i.qty){toast('No hay stock disponible de '+p.name,'alert');return false}p.res+=i.qty;i.rs='reservado'}
  p.stock-=i.qty;p.res=Math.max(0,p.res-i.qty);i.rs='entregado';
  moveKardex(i.sku,'salida',i.qty,'OT '+o.id);logOT(o,`Almacén entregó ${i.qty} × ${p.name}`);
  if(p.stock<=p.min)notify(`Stock bajo: ${p.name} (${p.stock} u., mínimo ${p.min})`,'warn','box','inventario');
  return true;
}
const lowParts=()=>S.parts.filter(p=>avail(p)<=p.min);
/* Stock siempre con los mismos tres números: en mano · reservado · disponible */
const stockLvl=p=>{const a=avail(p);return a<=0?'bad':a<=p.min?'warn':'ok'};
const stockPill=p=>{const l=stockLvl(p);return pill(l==='bad'?'Sin disponible':l==='warn'?'Bajo mínimo':'OK',l)};
function stockCell(p,compact){const a=avail(p),l=stockLvl(p);
  return `<div class="stk"><div class="meter ${l}"><i style="width:${Math.max(4,Math.min(100,a/((p.min||1)*2)*100))}%"></i></div><div class="stk-n"><span><b>${p.stock}</b> en mano</span><span><b>${p.res}</b> reservado</span><span class="${l}"><b>${a}</b> disponible</span>${compact?'':`<span class="mut">mín. ${p.min}</span>`}</div></div>`}
const suggestQty=p=>Math.max(p.min*2-avail(p),p.min);

/* ---------- Hallazgos con precio sugerido del catálogo ---------- */
// Punto de inspección → servicio (SERV) y/o palabra clave del repuesto en el catálogo
const FIND_MAP={
  'Nivel y estado de aceite':{s:'S01'},'Fugas de aceite / empaques':{s:'S05',kw:'empaque'},'Correas y mangueras':{kw:'correa'},
  'Filtro de aire':{kw:'filtro de aire'},'Batería y bornes':{kw:'batería'},'Pastillas delanteras':{s:'S06',kw:'pastillas de freno delanteras'},
  'Discos / tambores':{s:'S06',kw:'discos de freno'},'Líquido de frenos':{kw:'líquido de frenos'},'Amortiguadores':{s:'S08',kw:'amortiguador'},
  'Terminales y rótulas':{s:'S08',kw:'terminales'},'Bieletas y bujes':{s:'S08',kw:'bieletas'},'Desgaste y presión':{s:'S07'},
  'Alineación (desgaste irregular)':{s:'S07'},'Luces delanteras y neblineros':{kw:'foco'},'Luces posteriores / freno':{kw:'foco'},
  'Limpiaparabrisas':{kw:'escobillas'},'Refrigerante':{s:'S10',kw:'refrigerante'},'Líquido de dirección':{kw:'líquido de dirección'},
  'Aire acondicionado / filtro de polen':{kw:'filtro de polen'}
};
function suggestFor(point,plate){
  const m=FIND_MAP[point]||{},v=veh(plate),r=[];
  if(m.s){const sv=SERV.find(x=>x.id===m.s);if(sv)r.push({k:'S',desc:sv.n,price:sv.price})}
  if(m.kw){const ps=S.parts.filter(p=>p.name.toLowerCase().includes(m.kw));const pp=(v&&ps.find(p=>p.name.includes(v.model)))||ps.find(p=>/universal/i.test(p.name))||ps[0];if(pp)r.push({k:'R',desc:pp.name,price:pp.price,sku:pp.sku})}
  return r;
}
// Agrega el hallazgo a la cotización con precio del catálogo; si no hay referencia, queda "Falta precio"
function addFinding(o,point,urg,why){
  const sug=FIND_MAP[point]?suggestFor(point,o.plate):[],extra={sug:1,hall:point,urg,why:why||'Lo detectó el técnico durante la revisión de tu auto.'};
  if(sug.length)sug.forEach(x=>o.items.push(it(x.k,x.desc,x.price,1,x.sku||null,'adic',null,extra)));
  else o.items.push(it('S',point,0,1,null,'adic',null,{...extra,sug:0}));
  if(o.quote==='aprobada'||o.quote==='rechazada')o.quote='borrador';
  return sug.reduce((a,x)=>a+x.price,0);
}

/* ---------- Avance trabajo por trabajo (lo ve el cliente en Mi Auto) ---------- */
// Estado de cada trabajo aprobado: 'done' terminado · 'now' trabajando ahora · 'todo' por hacer · 'ask' espera decisión del cliente
function workState(o,i){
  if(i.ap===null)return 'ask';if(i.ap!==true)return null;if(i.done)return 'done';
  if(!['diag','rep','aprob'].includes(o.stage))return 'todo';
  const first=o.items.find(x=>x.ap===true&&!x.done);return first&&first.id===i.id?'now':'todo';
}
const workItems=o=>o.items.filter(i=>i.ap===true);
function toggleDone(id,iid){const o=ot(id),i=o.items.find(x=>x.id===iid);if(!i)return;
  if(i.done){delete i.done;logOT(o,`Desmarcó como terminado: ${i.desc}`)}
  else{i.done=nowISO();logOT(o,`Trabajo terminado: ${i.desc}`);o.log.push({t:i.done,who:who(),txt:`Terminamos: ${i.desc}.`,pub:1})}
  save();refresh()}

/* ---------- OT: etapas y asignación ---------- */
function suggestTech(area){
  const load={};openOTs().forEach(o=>{if(o.tech)load[o.tech]=(load[o.tech]||0)+1});
  return TECHS.filter(t=>t.area===area).sort((a,b)=>(load[a.id]||0)-(load[b.id]||0))[0]||null;
}
function freeBay(area,tid){
  const used=new Set(openOTs().filter(o=>o.bay).map(o=>o.bay));
  const pool=area==='plan'?['P1','P2']:area==='det'?['D1']:['B1','B2','B3','B4'];
  return pool.find(b=>!used.has(b))||pool[0];
}
/* WhatsApp al cliente: solo en 4 momentos clave (lo demás se ve en Mi Auto) */
const WA_FIRMA='\n— Gallo Autos';
const firstName=o=>clientOf(o).n.split(' ')[0];
const WA_TPL={
  recibido:o=>`Hola ${firstName(o)}, recibimos tu ${carName(o.plate)} (${o.plate}). Puedes seguir cada avance en Mi Auto: galloautos.com/miauto`,
  aprobacion:(o,n,amt)=>`Hola ${firstName(o)}, encontramos ${n} trabajo(s) extra en tu ${carName(o.plate)}. Mira las fotos y decide en Mi Auto (hasta ${money(amt)}).`,
  retraso:(o,motivo)=>`Hola ${firstName(o)}, te avisamos un cambio en tu ${carName(o.plate)}: ${motivo}. Entrega estimada: ${fmtD(o.promised)}.`,
  listo:o=>`¡Hola ${firstName(o)}! Tu ${carName(o.plate)} está listo para recoger. Horario: L–V 8:30–18:00, S 8:30–15:00. Pasadas 48 h se cobra guardianía de US$ 10 por día.`,
  entrega:o=>`Gracias por confiar en nosotros, ${firstName(o)}. Tu comprobante ya está en Mi Auto. ¿Cómo calificas tu experiencia del 0 al 10?`
};
function waMoment(o,k,...a){waOT(o,WA_TPL[k](o,...a)+WA_FIRMA,k)}
/* Motivos de detención en lenguaje del cliente (se muestran en Mi Auto) */
const BLOCK_PUB={'Falta repuesto':'estamos esperando un repuesto','Esperando aprobación del cliente':'esperamos tu aprobación para continuar','Esperando autorización de aseguradora':'esperamos la autorización de tu aseguradora','Equipo o herramienta en uso':'tu auto está en cola para un equipo especializado'};
const blockPub=b=>BLOCK_PUB[b]||(b&&b.toLowerCase().startsWith('falta repuesto')?'estamos esperando un repuesto':'estamos resolviendo un detalle técnico');
const STAGE_PUB={diag:'Tu auto pasó a diagnóstico.',aprob:'Te enviamos hallazgos para que los apruebes.',rep:'Tu auto está en reparación.',cc:'Control de calidad y prueba de ruta.',listo:'¡Tu auto está listo para recoger!'};
function setStage(id,k,{silent}={}){
  const o=ot(id);if(!o||o.stage===k)return false;
  if(k==='ent'){toast('Para entregar usa "Entrega y cobro"','alert');return false}
  if(k==='rep'&&o.items.some(i=>i.ap===null&&o.stage==='aprob'&&i.st==='adic')&&!o.items.some(i=>i.ap===true&&i.st==='base')){toast('Primero el cliente debe aprobar el presupuesto','alert');return false}
  if(['diag','rep'].includes(k)&&!o.tech){const t=suggestTech(o.area);if(t){o.tech=t.id;o.bay=freeBay(o.area,t.id);logOT(o,`Asignado a ${t.n} · bahía ${o.bay}`)}}
  const from=stage(o.stage).n;o.stage=k;if(k==='listo'){o.listoAt=nowISO()}
  (o.hist=o.hist||[]).push({k,t:nowISO()});
  if(k==='cc'||k==='listo')o.items.forEach(i=>{if(i.ap===true&&!i.done)i.done=nowISO()});
  if(k==='rep'||k==='diag')o.blocked=null;
  logOT(o,`Movió de ${from} a ${stage(k).n}`);if(STAGE_PUB[k])o.log.push({t:nowISO(),who:'Taller',txt:STAGE_PUB[k],pub:1});
  if(k==='rep')reserveItems(o);
  if(k==='listo'&&!silent)waMoment(o,'listo');
  save();return true;
}

/* Cambio de etapa desde la interfaz: avanzar 1 etapa es directo; saltar pide
   confirmación explicando qué falta; retroceder pide el motivo */
function stageToast(k){return k==='listo'?'Listo para entrega · el cliente recibió el aviso por WhatsApp':`${stage(k).n} · el cliente ya lo ve en Mi Auto`}
function requestStage(id,k,after){
  const o=ot(id);if(!o||o.stage===k)return;
  if(k==='ent'){toast('Para entregar usa "Entrega y cobro"','alert');return}
  const i=STAGES.findIndex(s=>s.k===o.stage),j=STAGES.findIndex(s=>s.k===k),pend=o.items.filter(x=>x.ap===null).length;
  const done=()=>{if(setStage(id,k))toast(stageToast(k),'check');after?after():refresh()};
  if(j>i){
    const skip=STAGES.slice(i+1,j).filter(s=>!(s.k==='aprob'&&!pend)).map(s=>s.n);
    if(!skip.length)return done();
    const miss=[];if(pend&&i<2)miss.push(`${pend} trabajo(s) extra todavía sin respuesta del cliente`);if(j>=5&&i<4)miss.push('El auto no pasó por control de calidad');
    window._rs=done;
    openModal('¿Saltar etapas?',`<p>Vas a mover <b>${o.plate}</b> de <b>${stage(o.stage).n}</b> a <b>${stage(k).n}</b>.</p><div class="alertbox mt"><div class="ic">${ic('alert')}</div><div class="sp"><b>Se saltan: ${skip.join(', ')}</b>${miss.map(m=>`<small>• ${m}</small>`).join('')}</div></div>${k==='listo'?'<p class="mut mt">El cliente recibirá el WhatsApp de “listo para recoger”.</p>':''}`,`<button class="btn btn-o" onclick="closeModal();refresh()">Cancelar</button><button class="btn btn-b" onclick="closeModal();_rs()">Sí, mover</button>`);
    return;
  }
  window._rb=()=>{const m=$('#bkR').value;closeModal();if(setStage(id,k,{silent:true})){logOT(o,'Motivo del retroceso: '+m);save();toast(`Regresó a ${stage(k).n}`,'refresh')}after?after():refresh()};
  openModal('Regresar a una etapa anterior',`<p>Vas a regresar <b>${o.plate}</b> de <b>${stage(o.stage).n}</b> a <b>${stage(k).n}</b>. El motivo queda en la bitácora.</p><div class="f mt"><label>Motivo</label><select id="bkR"><option>Falla en control de calidad</option><option>Se encontró un problema nuevo</option><option>Error al mover la tarjeta</option><option>Otro</option></select></div>`,`<button class="btn btn-o" onclick="closeModal();refresh()">Cancelar</button><button class="btn btn-b" onclick="_rb()">Regresar</button>`);
}

/* ---------- router / UI ---------- */
const VIEWS={};
const NAV=[
 ['',['inicio']],
 ['Operación',['tablero','agenda','recepcion','cotizaciones','tecnico','entrega']],
 ['Stock',['inventario']],
 ['Clientes',['clientes','recordatorios','encuestas']],
 ['Seguros y flotas',['siniestros','cobranza']],
 ['Gerencia',['dashboard','usuarios']]
];
let CUR={view:null,param:null};
const can=v=>{const r=ROLES[S.role];return r&&(r.views==='*'||r.views.includes(v))};
function badges(){return {
  tablero:[openOTs().filter(isLate).length,1],
  inventario:[lowParts().length,0],
  cotizaciones:[S.ots.filter(o=>o.quote==='enviada'&&o.stage!=='ent').length,0],
  entrega:[S.ots.filter(o=>o.stage==='listo').length,0],
  siniestros:[S.claims.filter(c=>['ingreso','perito','presup'].includes(c.status)).length,0]}}
function renderNav(){
  const b=badges();
  $('#nav').innerHTML=NAV.map(([g,vs])=>{const ok=vs.filter(can);if(!ok.length)return '';
    return (g?`<h6>${g}</h6>`:'')+ok.map(v=>`<a class="${CUR.view===v?'on':''}" onclick="go('${v}')" data-v="${v}">${ic(VIEWS[v].ic)}<span>${VIEWS[v].t}</span>${b[v]&&b[v][0]?`<span class="bd ${b[v][1]?'hot':''}">${b[v][0]}</span>`:''}</a>`).join('')}).join('');
  const u=curUser(),r=ROLES[S.role];
  $('#me').innerHTML=`<span class="av" style="width:32px;height:32px">${initials(u.n)}</span><div><b>${esc(u.n)}</b><small>${r?r.n:''}</small></div>`;
}
/* ayuda contextual por pantalla (textos en help.js) */
let HELP_OFF={};try{HELP_OFF=JSON.parse(localStorage.getItem('myper_help_off')||'{}')}catch(e){}
function helpBanner(view){
  const h=HELP[view];if(!h||HELP_OFF[view])return '';
  return `<div class="help" id="helpBox"><div class="hi">${ic('info')}</div><div><b>${h.t}</b><p>${h.d}</p>${h.tips?`<ul>${h.tips.map(t=>`<li>${t}</li>`).join('')}</ul>`:''}</div><button class="x" onclick="hideHelp('${view}')" title="Ocultar">${ic('x',16)}</button></div>`;
}
function hideHelp(v){HELP_OFF[v]=1;try{localStorage.setItem('myper_help_off',JSON.stringify(HELP_OFF))}catch(e){}const b=$('#helpBox');if(b)b.remove()}
function toggleHelp(){const v=CUR.view;if(HELP_OFF[v]){delete HELP_OFF[v];try{localStorage.setItem('myper_help_off',JSON.stringify(HELP_OFF))}catch(e){}refresh();$('#main').scrollTop=0}else hideHelp(v)}
function paint(param){const v=VIEWS[CUR.view];$('#main').innerHTML=helpBanner(CUR.view)+v.render(param);if(v.after)v.after(param)}
function go(view,param){
  if(!can(view)){toast('Tu perfil no tiene acceso a esta sección','shield');return}
  CUR={view,param};closeDrawer();$('#side').classList.remove('on');$('#pop').classList.remove('on');$('#newMenu').classList.remove('on');
  $('#title').innerHTML=VIEWS[view].t;
  paint(param);$('#main').scrollTop=0;renderNav();renderBell();
}
function refresh(){
  const st=$('#main').scrollTop;paint(CUR.param);$('#main').scrollTop=st;renderNav();renderBell();save();
  if(DRAWER&&DRAWER.startsWith('ot:'))openOT(DRAWER.slice(3),window._otTab||'res',true);
}
function setRole(r){S.role=r;save();$('#login').style.display='none';$('#roleSel').value=r;go(ROLES[r].home)}
/* menú "+ Nuevo" */
const NEW_ACTIONS=[
  ['recepcion','car','Recibir vehículo','Crea la OT y avisa al cliente',()=>go('recepcion')],
  ['agenda','calendar','Nueva cita','Reserva un horario en la agenda',()=>{go('agenda');newAppt()}],
  ['siniestros','shield','Nuevo siniestro','Expediente con la aseguradora',()=>{go('siniestros');newClaim()}],
  ['inventario','box','Orden de compra','Pide repuestos a un proveedor',()=>{go('inventario');newPO()}],
  ['inventario','plus','Nuevo repuesto','Agrega un producto al catálogo',()=>{go('inventario');newPart()}]
];
function toggleNew(e){e.stopPropagation();const m=$('#newMenu');const l=NEW_ACTIONS.filter(a=>can(a[0]));
  m.innerHTML=l.map((a,i)=>`<button onclick="NEW_ACTIONS[${NEW_ACTIONS.indexOf(a)}][4]();$('#newMenu').classList.remove('on')">${ic(a[1])}<span><b>${a[2]}</b><small>${a[3]}</small></span></button>`).join('')||'<div class="empty">Tu perfil no crea registros desde aquí</div>';
  const r=$('#newBtn').getBoundingClientRect();m.style.left=(r.left-$('.top').getBoundingClientRect().left)+'px';m.classList.toggle('on')}
document.addEventListener('click',e=>{if(!e.target.closest('#newMenu,#newBtn'))$('#newMenu')?.classList.remove('on');if(!e.target.closest('#pop,.icbtn'))$('#pop')?.classList.remove('on')});
function logout(){S.role=null;save();showLogin()}
let PICK=null;
function showLogin(){
  PICK=null;$('#login').style.display='grid';$('#lgUser').value='';$('#lgGo').disabled=true;
  $('#roles').innerHTML=Object.entries(ROLES).map(([k,r])=>`<button class="rolecard" data-r="${k}" onclick="pickRole('${k}')"><span class="ri">${ic(r.ic)}</span><span><b>${r.n}</b><small>${r.desc}</small></span></button>`).join('');
}
function pickRole(k){PICK=k;$$('.rolecard').forEach(b=>b.classList.toggle('on',b.dataset.r===k));const u=user(ROLES[k].who);$('#lgUser').value=u?u.mail:'';$('#lgGo').disabled=false}
function enterRole(){if(PICK)setRole(PICK)}
function alerts(){
  const a=[];
  openOTs().filter(isLate).forEach(o=>a.push({ic:'alert',lvl:'bad',txt:`OT ${o.id} (${o.plate}) atrasada ${daysSince(o.promised)} día(s)${o.blocked?': '+o.blocked:''}`,view:'tablero'}));
  const lp=lowParts();if(lp.length)a.push({ic:'box',lvl:'warn',txt:`${lp.length} repuesto(s) bajo mínimo: ${lp.slice(0,3).map(p=>p.sku).join(', ')}…`,view:'inventario'});
  S.ots.filter(o=>o.stage==='listo'&&daysSince(o.listoAt)>=2).forEach(o=>a.push({ic:'cash',lvl:'warn',txt:`${o.plate} lleva ${daysSince(o.listoAt)} días listo sin recoger (guardianía)`,view:'entrega'}));
  S.ots.filter(o=>o.quote==='enviada'&&o.quoteAt&&daysSince(o.quoteAt)>=1).forEach(o=>a.push({ic:'clock',lvl:'info',txt:`Cotización ${o.plate} sin respuesta hace ${daysSince(o.quoteAt)} día(s)`,view:'cotizaciones'}));
  return a;
}
function renderBell(){
  const all=[...S.notifs.slice(0,6),...alerts()];
  $('#bellN').textContent=all.length;$('#bellN').style.display=all.length?'grid':'none';
  $('#pop').innerHTML=`<h4>Notificaciones</h4>`+all.map(n=>`<div class="it" onclick="go('${n.view||'tablero'}')"><span class="pill ${n.lvl==='bad'?'bad':n.lvl==='warn'?'warn':'info'}">${ic(n.ic,14)}</span><div>${esc(n.txt)}${n.t?`<br><small>${fmtDT(n.t)}</small>`:''}</div></div>`).join('')||'<div class="empty">Sin novedades</div>';
}
function togglePop(){$('#pop').classList.toggle('on')}
function globalSearch(e){
  if(e.key!=='Enter')return;const q=e.target.value.trim().toLowerCase();if(!q)return;
  const r=[];
  S.ots.forEach(o=>{if((o.id+o.plate+clientOf(o).n+o.svc).toLowerCase().includes(q))r.push(`<tr class="click" onclick="closeModal();openOT('${o.id}')"><td>OT ${o.id}</td><td>${plateTag(o.plate)}</td><td>${esc(clientOf(o).n)}</td><td>${esc(o.svc)}</td><td>${pill(stage(o.stage).n,'info')}</td></tr>`)});
  S.clients.forEach(c=>{if((c.n+c.tel+c.mail).toLowerCase().includes(q))r.push(`<tr class="click" onclick="closeModal();openClient('${c.id}')"><td>Cliente</td><td colspan="3">${esc(c.n)} · ${esc(c.tel)}</td><td>${pill(c.type,'gray')}</td></tr>`)});
  openModal(`Resultados para "${esc(q)}"`,r.length?`<table class="tbl"><tbody>${r.slice(0,25).join('')}</tbody></table>`:'<div class="empty">Sin resultados</div>',`<button class="btn btn-o" onclick="closeModal()">Cerrar</button>`,true);
}

/* ---------- documentos imprimibles ---------- */
const COMPANY={n:'S&C Autos S.A.C.',ruc:'20600246080',addr:'Av. La Molina 724, La Molina',tel:'997 572 471'};
function docHead(title,no){return `<div class="hd"><img src="img/logo1.png" alt="Gallo Autos"><div style="text-align:right"><b>${title}</b><br>N° ${no}<br><small>${COMPANY.n} · RUC ${COMPANY.ruc}<br>${COMPANY.addr} · Telf. ${COMPANY.tel}</small></div></div>`}
function docVeh(o){const v=veh(o.plate)||{},c=clientOf(o);return `<table><tr><th>Cliente</th><th>Teléfono</th><th>Placa</th><th>Vehículo</th><th>Color</th><th>Km</th><th>Combustible</th></tr><tr><td>${esc(c.n)}</td><td>${esc(c.tel||'')}</td><td>${o.plate}</td><td>${esc(carName(o.plate))}</td><td>${esc(v.color||'')}</td><td>${(o.km||v.km||0).toLocaleString('es-PE')}</td><td>${o.fuel??''}%</td></tr></table>`}
function docItems(o,only){const rows=o.items.filter(i=>only?only(i):i.ap===true);return `<table><tr><th>Descripción</th><th>Tipo</th><th class="r">Cant.</th><th class="r">P. unit.</th><th class="r">Importe</th></tr>${rows.map(i=>`<tr><td>${esc(i.desc)}</td><td>${i.k==='S'?'Servicio':'Repuesto'}</td><td class="r">${i.qty}</td><td class="r">${money(i.price)}</td><td class="r">${money(i.price*i.qty)}</td></tr>`).join('')}</table>`}
function docTotals(o){const t=otTotals(o);return `<div class="tot">${t.disc?`Subtotal ${money(t.sub)} · Descuento convenio ${o.disc}%: −${money(t.disc)}<br>`:''}<small>Incluye IGV ${money(t.igv)}</small><br><b>TOTAL ${money(t.total)}</b></div>`}
function showDoc(kind,id){
  const o=ot(id);if(!o)return;let body='',title='';
  if(kind==='rec'){title='Hoja de recepción';body=docHead('HOJA DE RECEPCIÓN','001-'+o.id)+docVeh(o)+`<h2>Solicitud del cliente</h2><p>${esc(o.note||'—')}</p><h2>Estado al ingreso</h2><p>${o.photos.length} foto(s) registradas. Objetos en el vehículo: ${esc(o.objs||'ninguno declarado')}.</p><h2>Servicios solicitados</h2>${docItems(o,i=>i.st==='base')}<div class="sig"><div>${o.sig?`<img src="${o.sig}" style="height:50px;display:block;margin:0 auto">`:''}Firma del cliente</div><div>${esc(user(o.asesor)?.n||'Asesor')}<br>Asesor de servicio</div></div><div class="note">Fecha de ingreso: ${fmtDT(o.created)} · Entrega prometida: ${fmtD(o.promised)}. Pasadas 48 horas del aviso de recojo se cobrará guardianía de US$ 10.00 por día. La empresa no se responsabiliza por objetos de valor dejados en el vehículo.</div>`}
  if(kind==='ot'||kind==='cot'){title=kind==='cot'?'Presupuesto':'Orden de trabajo';body=docHead(kind==='cot'?'PRESUPUESTO':'ORDEN DE TRABAJO','001-'+o.id)+docVeh(o)+`<h2>${kind==='cot'?'Detalle del presupuesto':'Trabajos autorizados'}</h2>${docItems(o,kind==='cot'?(i=>i.ap!==false):null)}${docTotals(o)}<div class="note">Técnico: ${esc(tech(o.tech)?.n||'por asignar')} · Bahía ${o.bay||'—'} · Entrega prometida ${fmtD(o.promised)}. Precios incluyen IGV. Todo servicio es al contado salvo convenio. Medios de pago: transferencia, Yape o tarjeta en taller.</div>`}
  if(kind==='ent'){title='Acta de entrega y comprobante';const t=otTotals(o);body=docHead(o.doc==='factura'?'FACTURA ELECTRÓNICA (simulada)':'BOLETA ELECTRÓNICA (simulada)',(o.doc==='factura'?'F001-':'B001-')+String(900+parseInt(o.id.slice(-3))).padStart(6,'0'))+docVeh(o)+`<h2>Detalle</h2>${docItems(o)}${docTotals(o)}<h2>Acta de entrega</h2><p>El cliente recibe el vehículo en conformidad. Forma de pago: <b>${esc(o.pay||'—')}</b>. Fecha: ${fmtDT(o.entAt||nowISO())}.</p><div class="sig"><div>Firma del cliente</div><div>${esc(who())}<br>Entrega</div></div><div class="note">Garantía de 30 días en mano de obra y según fabricante en repuestos. Documento simulado para demostración: no tiene validez tributaria.</div>`}
  openModal(title,`<div class="paper">${body}</div>`,`<button class="btn btn-o" onclick="closeModal('docModal')">Cerrar</button><button class="btn btn-y" onclick="window.print()">${ic('print')} Imprimir / PDF</button>`,true,'docModal');
}

/* ---------- arranque ---------- */
function boot(){
  $('#roleSel').innerHTML=Object.entries(ROLES).map(([k,r])=>`<option value="${k}">${r.n}</option>`).join('');
  const q=new URLSearchParams(location.search).get('role');
  const fresh=new URLSearchParams(location.search).get('login');
  if(fresh){S.role=null;save();showLogin()}else if(q&&ROLES[q]){setRole(q);const h=location.hash.slice(1);if(h&&VIEWS[h]&&can(h))go(h)}else if(S.role&&ROLES[S.role]){setRole(S.role)}else showLogin();
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();closeModal('docModal');closeDrawer()}});
}
