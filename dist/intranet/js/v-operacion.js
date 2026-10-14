/* =========================================================
   Operación: tablero, OT, agenda, recepción, cotizaciones,
   vista técnico (móvil) y entrega/cobro
   ========================================================= */

/* ---------- TABLERO KANBAN ---------- */
let KB={area:'all',tech:'all',q:''};
function otCard(o){
  const c=clientOf(o),t=tech(o.tech),late=isLate(o);
  const cls=late?'late':c.type==='seguro'?'seg':c.type==='flota'?'flo':'';
  const tt=otTotals(o);
  return `<div class="ot ${cls}" draggable="true" ondragstart="event.dataTransfer.setData('t','${o.id}')" onclick="openOT('${o.id}')">
   <div class="t">${plateTag(o.plate)}<span class="sp"></span><small>${late?`<span style="color:var(--bad)">${ic('alert',13)} ${daysSince(o.promised)}d atraso</span>`:'OT '+o.id}</small></div>
   <h5>${esc(carName(o.plate))}</h5><p>${esc(o.svc)}</p>
   ${o.blocked?`<p style="color:var(--bad);font-weight:600;margin-top:4px">⚠ ${esc(o.blocked)}</p>`:''}
   <div class="m"><span class="row" style="gap:6px">${t?`<span class="av" title="${t.n}">${initials(t.n)}</span>`:`<span class="pill warn">Sin asignar</span>`}${o.bay?`<span>Bahía ${o.bay}</span>`:''}</span><span>${o.quote==='enviada'?pill('Cotiz. enviada','y'):''} ${fmtD(o.promised)}</span></div>
   <div class="m"><span>${esc(c.n.split(' ').slice(0,2).join(' '))}</span><b>${money0(tt.total+tt.pend)}</b></div><button class="ot-mv" title="Mover a otra etapa" aria-label="Mover a otra etapa" onclick="event.stopPropagation();moveMenu(event,'${o.id}')">Mover ${ic('chev',13)}</button></div>`;
}
VIEWS.tablero={t:'Tablero del taller',ic:'board',render(){
  const list=openOTs().filter(o=>stage(o.stage).k!=='ent').filter(o=>(KB.area==='all'||o.area===KB.area)&&(KB.tech==='all'||o.tech===KB.tech)&&(!KB.q||(o.plate+o.id+clientOf(o).n).toLowerCase().includes(KB.q)));
  const cols=STAGES.slice(0,6);
  const late=openOTs().filter(isLate).length,total=openOTs().length;
  const occ=new Set(openOTs().filter(o=>o.bay).map(o=>o.bay)).size;
  return `<div class="ph"><div><h2>Tablero del taller</h2><p>${total} vehículos en taller hoy</p></div>
   <div class="acts"><button class="btn btn-o" onclick="window.open("../index.html","_blank")">${ic('external')} Ver Mi Auto</button>${can('recepcion')?`<button class="btn btn-y" onclick="go('recepcion')">${ic('plus')} Recibir vehículo</button>`:''}</div></div>
   <div class="grid g4 mb"><div class="kpi"><small>En taller</small><b>${total}</b><span>${occ} de ${BAYS.length} bahías ocupadas</span></div>
   <div class="kpi r"><small>Atrasados</small><b>${late}</b><span>Pasaron la fecha prometida</span></div>
   <div class="kpi w"><small>Esperando aprobación</small><b>${S.ots.filter(o=>o.stage==='aprob').length}</b><span>${money0(S.ots.filter(o=>o.stage==='aprob').reduce((a,o)=>a+otTotals(o).pend,0))} por aprobar</span></div>
   <div class="kpi g"><small>Listos para entrega</small><b>${S.ots.filter(o=>o.stage==='listo').length}</b><span>Cobro pendiente</span></div></div>
   <div class="row mb"><div class="chips">${[['all','Todas las áreas'],...Object.entries(AREAS)].map(([k,n])=>`<button class="chip ${KB.area===k?'on':''}" onclick="KB.area='${k}';refresh()">${n}</button>`).join('')}</div>
   <select class="chip" onchange="KB.tech=this.value;refresh()"><option value="all">Todos los técnicos</option>${TECHS.map(t=>`<option value="${t.id}" ${KB.tech===t.id?'selected':''}>${t.n}</option>`).join('')}</select>
   <span class="sp"></span><div class="legend" style="margin:0"><span><i style="background:var(--bad)"></i>Atrasado</span><span><i style="background:var(--violet)"></i>Seguro</span><span><i style="background:var(--yellow)"></i>Flota</span><span><i style="background:var(--sky)"></i>Particular</span></div></div>
   <div class="kb">${cols.map(s=>{const cs=list.filter(o=>o.stage===s.k);return `<div class="col" ondragover="event.preventDefault();this.classList.add('over')" ondragleave="this.classList.remove('over')" ondrop="dropOT(event,'${s.k}')"><h4><i style="background:${s.c}"></i>${s.n}<span>${cs.length}</span></h4>${cs.map(otCard).join('')||'<div class="empty" style="padding:20px;font-size:12px">Sin vehículos</div>'}</div>`}).join('')}</div>`;
}};
function moveMenu(e,id){const o=ot(id),m=$('#ctx');m.innerHTML=`<div class="mh2">Mover ${o.plate} a…</div>`+STAGES.slice(0,6).map(st=>`<button ${st.k===o.stage?'disabled':''} onclick="$('#ctx').classList.remove('on');requestStage('${id}','${st.k}')"><i class="dotc" style="background:${st.c}"></i>${st.n}${st.k===o.stage?' <small>(actual)</small>':''}</button>`).join('');
  const r=e.currentTarget.getBoundingClientRect();m.style.top=Math.min(innerHeight-300,r.bottom+4)+'px';m.style.left=Math.min(innerWidth-260,r.left)+'px';m.classList.add('on')}
document.addEventListener('click',e=>{if(!e.target.closest('#ctx,.ot-mv'))$('#ctx')?.classList.remove('on')});
function dropOT(e,k){e.preventDefault();requestStage(e.dataTransfer.getData('t'),k)}

/* ---------- DETALLE OT (drawer) ---------- */
window._otTab='res';
function openOT(id,tab='res',keep=false){
  const o=ot(id);if(!o)return;window._otTab=tab;const c=clientOf(o),t=tech(o.tech),tt=otTotals(o),si=STAGES.findIndex(s=>s.k===o.stage);
  const tabs=[['res','Resumen'],['insp','Inspección'],['cot','Cotización'],['rep','Repuestos'],['fotos','Fotos'],['bit','Bitácora']];
  const head=`<div><div class="row" style="gap:8px">${plateTag(o.plate)}<small>OT ${o.id} · ingresó ${fmtDT(o.created)}</small></div><h3>${esc(carName(o.plate))}</h3><small>${esc(c.n)} · ${esc(c.tel||'')} · ${pill(stage(o.stage).n,'info')}</small></div>`;
  let body=`<div class="stepper">${STAGES.slice(0,7).map((s,i)=>`<div class="${i<si?'done':i===si?'cur':''}" onclick="stageTo('${o.id}','${s.k}')">${s.n}</div>`).join('')}</div>
  <div class="tabs">${tabs.map(([k,n])=>`<button class="${tab===k?'on':''}" onclick="openOT('${o.id}','${k}',true)">${n}</button>`).join('')}</div>`;
  if(tab==='res'){const W=workItems(o);body+=nextStep(o)+(W.length?`<div class="card mb"><h3><span class="l">Trabajos</span><small>${W.filter(i=>i.done).length} de ${W.length} terminados · el cliente lo ve en Mi Auto</small></h3>${W.map(i=>{const w=workState(o,i);return `<label class="ck" style="justify-content:space-between"><span class="row" style="gap:9px"><input type="checkbox" ${i.done?'checked':''} onchange="toggleDone('${o.id}','${i.id}')">${esc(i.desc)}</span>${w==='done'?pill('Terminado '+fmtDT(i.done),'ok'):w==='now'?pill('Trabajando ahora','info'):pill('Por hacer','gray')}</label>`}).join('')}</div>`:'')+`<div class="grid g2"><div class="card"><h3>Datos</h3>
   <p><small>Servicio</small><br><b>${esc(o.svc)}</b></p><div class="divider"></div>
   <p><small>Solicitud del cliente</small><br>${esc(o.note||'—')}</p><div class="divider"></div>
   <div class="row"><div><small>Km</small><br><b>${(o.km||0).toLocaleString('es-PE')}</b></div><div><small>Combustible</small><br><b>${o.fuel??'—'}%</b></div><div><small>Prometida</small><br><b>${fmtD(o.promised)}</b></div></div></div>
   <div class="card"><h3>Asignación</h3>
   <div class="f"><label>Técnico</label><select onchange="assignTech('${o.id}',this.value)"><option value="">Sin asignar</option>${TECHS.filter(x=>x.area===o.area||!o.area).map(x=>`<option value="${x.id}" ${o.tech===x.id?'selected':''}>${x.n}${x.esp?' · '+x.esp:''}</option>`).join('')}</select></div>
   <div class="fg"><div class="f"><label>Bahía</label><select onchange="assignBay('${o.id}',this.value)"><option value="">—</option>${BAYS.map(b=>`<option ${o.bay===b?'selected':''}>${b}</option>`).join('')}</select></div>
   <div class="f"><label>Fecha prometida</label><input type="date" value="${o.promised}" onchange="setPromised('${o.id}',this.value)"></div></div>
   <p>${pill(c.type==='seguro'?'Siniestro '+(o.claim||''):c.type==='flota'?'Flota':'Particular',c.type==='particular'?'gray':'info')} ${o.blocked?pill('Detenido','bad'):''}</p></div></div>
   ${o.blocked?`<div class="alertbox bad mt"><div class="ic">${ic('alert')}</div><div class="sp"><b>Vehículo detenido</b><small>${esc(o.blocked)}</small></div><button class="btn btn-o btn-s" onclick="unblock('${o.id}')">Marcar resuelto</button></div>`:''}
   <div class="sumbar"><span>Total aprobado${tt.pend?` · por aprobar ${money(tt.pend)}`:''}</span><b>${money(tt.total)}</b></div>`}
  if(tab==='insp'){const cnt={ok:0,warn:0,bad:0};o.insp.forEach(x=>cnt[x.s]++);
   body+=o.insp.length?`<div class="row mb"><span class="pill ok">${cnt.ok} verde</span><span class="pill warn">${cnt.warn} amarillo</span><span class="pill bad">${cnt.bad} rojo</span><span class="sp"></span><button class="btn btn-o btn-s" onclick="inspToQuote('${o.id}')">${ic('plus')} Cotizar rojos y amarillos</button></div><div class="card">${o.insp.map((x,i)=>`<div class="sem"><span class="l" style="background:${{ok:'var(--ok)',warn:'var(--warn)',bad:'var(--bad)'}[x.s]}"></span><div><b>${esc(x.n)}</b><small>${esc(x.c)}</small></div><div class="sw">${[['ok','#16A34A'],['warn','#F59E0B'],['bad','#DC2626']].map(([k,col])=>`<button class="${x.s===k?'on':''}" style="background:${col}" onclick="setInsp('${o.id}',${i},'${k}')"></button>`).join('')}</div></div>`).join('')}</div>`:`<div class="card empty">Este vehículo ingresó sin inspección.<br><button class="btn btn-b mt" onclick="startInsp('${o.id}')">Iniciar inspección semáforo</button></div>`}
  if(tab==='cot')body+=cotTab(o);
  if(tab==='rep'){const rows=o.items.filter(i=>i.sku);body+=`<div class="card"><h3>Repuestos de esta OT</h3>${rows.length?`<table class="tbl"><thead><tr><th>Repuesto</th><th class="r">Cant.</th><th>Stock</th><th>Estado</th><th></th></tr></thead><tbody>${rows.map(i=>{const p=part(i.sku);return `<tr><td>${esc(i.desc)}<br><small>${i.sku}</small></td><td class="r">${i.qty} ${p?esc(p.unit):''}</td><td>${p?stockCell(p,1):''}</td><td>${rsPill(i)}</td><td class="r">${i.ap===true&&i.rs!=='entregado'&&can('inventario')?`<button class="btn btn-o btn-s" onclick="deliverFromOT('${o.id}','${i.id}')">Entregar al técnico</button>`:''}</td></tr>`}).join('')}</tbody></table>`:'<div class="empty">Esta OT no usa repuestos.</div>'}${can('tecnico')||can('inventario')?`<div class="row mt"><select id="reqPart" class="chip" style="min-width:260px">${S.parts.map(p=>`<option value="${p.sku}">${esc(p.name)} · ${avail(p)} disponible(s)</option>`).join('')}</select><button class="btn btn-b btn-s" onclick="requestPart('${o.id}')">Solicitar a almacén</button></div>`:''}</div>`}
  if(tab==='fotos')body+=`<div class="photos">${o.photos.map((f,i)=>f.img?`<div class="photo img" style="background-image:url(../miauto/img/${f.img}.jpg)"><span>${esc(f.lbl)}</span><small>${fmtDT(f.t)}</small></div>`:`<div class="photo" style="background:linear-gradient(135deg,${['#2908F1','#4F46E5','#0B1B3A','#0EA5E9'][i%4]},#0B1B3A)">${ic('camera',22)}<span>${esc(f.lbl)}</span><small>${fmtDT(f.t)}</small></div>`).join('')}<div class="photo add" onclick="addPhoto('${o.id}')">${ic('plus',22)}<span>Agregar foto</span></div></div><p class="mut mt">Las fotos que marques como hallazgo se muestran al cliente en Mi Auto al cotizar.</p>`;
  if(tab==='bit')body+=`<div class="card"><p class="mut mb" style="font-size:12.5px">Los puntos rellenos son mensajes que el cliente ve en Mi Auto.</p><div class="log">${[...o.log].reverse().map(l=>`<div class="${l.pub?'pub':''}"><b>${esc(l.txt)}</b><small>${esc(l.who)} · ${fmtDT(l.t)}</small></div>`).join('')}</div><div class="row"><input id="nt" placeholder="Agregar nota interna…" style="flex:1;border:1.5px solid var(--line);border-radius:12px;padding:10px"><button class="btn btn-b btn-s" onclick="addNote('${o.id}')">Agregar</button></div></div>`;
  const foot=`<button class="btn btn-o btn-s" onclick="showDoc('rec','${o.id}')">${ic('file')} Recepción</button><button class="btn btn-o btn-s" onclick="showDoc('cot','${o.id}')">${ic('file')} Presupuesto</button><button class="btn btn-o btn-s" onclick="showDoc('ot','${o.id}')">${ic('file')} Orden de trabajo</button><span class="sp"></span><small>Documentos imprimibles</small>`;
  openDrawer(head,body,foot,'ot:'+id);
}
function rsPill(i){return i.rs==='entregado'?pill('Entregado','ok'):i.rs==='reservado'?pill('Reservado','info'):i.rs==='sin stock'?pill('Sin stock','bad'):i.rs==='solicitado'?pill('Solicitado','warn'):pill('—','gray')}
function stageTo(id,k){requestStage(id,k)}
function nextStage(id){const o=ot(id),i=STAGES.findIndex(s=>s.k===o.stage);stageTo(id,STAGES[i+1].k)}
function assignTech(id,tid){const o=ot(id);o.tech=tid||null;if(tid&&!o.bay)o.bay=freeBay(o.area,tid);logOT(o,tid?`Asignó a ${tech(tid).n}`:'Quitó técnico');refresh()}
function assignBay(id,b){const o=ot(id);o.bay=b||null;logOT(o,`Bahía ${b||'—'}`);save()}
function setPromised(id,d){const o=ot(id);if(!d||d===o.promised)return;
  window._sp=()=>{const r=$('#spR').value;closeModal();const from=o.promised;o.promised=d;o.delay={from,to:d,reason:r,t:nowISO()};
    logOT(o,`Nueva fecha prometida: ${fmtD(d)} (antes ${fmtD(from)}). Motivo: ${r}`);o.log.push({t:nowISO(),who:'Taller',txt:`Cambiamos tu fecha de entrega al ${fmtD(d)}: ${r}.`,pub:1});
    waMoment(o,'retraso',r);save();toast('Fecha actualizada · el cliente recibió el motivo por WhatsApp','chat');refresh()};
  openModal('Cambiar fecha prometida',`<p>De <b>${fmtD(o.promised)}</b> a <b>${fmtD(d)}</b>. El cliente recibe el motivo por WhatsApp y lo ve en Mi Auto.</p><div class="f mt"><label>Motivo (así lo leerá el cliente)</label><select id="spR"><option>estamos esperando un repuesto</option><option>aprobaste trabajos adicionales</option><option>esperamos la autorización de tu aseguradora</option><option>el trabajo tomó más tiempo del previsto</option><option>pudimos adelantar la entrega</option></select></div>`,`<button class="btn btn-o" onclick="closeModal();refresh()">Cancelar</button><button class="btn btn-b" onclick="_sp()">Guardar y avisar</button>`)}
function unblock(id){const o=ot(id);o.blocked=null;logOT(o,'Detención resuelta');o.log.push({t:nowISO(),who:'Taller',txt:'Retomamos el trabajo en tu auto.',pub:1});waMoment(o,'retraso','ya retomamos el trabajo');save();toast('Destrabado · el cliente recibió el aviso','check');refresh()}
function setInsp(id,i,s){ot(id).insp[i].s=s;save();openOT(id,'insp',true)}
function startInsp(id){ot(id).insp=mkInsp();logOT(ot(id),'Inicio de inspección semáforo');refresh();openOT(id,'insp',true)}
function inspToQuote(id){const o=ot(id);let n=0,amt=0;o.insp.filter(x=>x.s!=='ok').forEach(x=>{if(!o.items.some(i=>i.hall===x.n)){amt+=addFinding(o,x.n,x.s,x.note||'');n++}});
  logOT(o,`Agregó ${n} hallazgo(s) de la inspección a la cotización`);toast(n?`${n} hallazgo(s) agregados con precio sugerido (${money0(amt)}). Revisa y envía.`:'No hay hallazgos nuevos','clip');save();openOT(id,'cot',true)}
function addPhoto(id){const o=ot(id);o.photos.push({lbl:'Foto '+(o.photos.length+1),t:nowISO()});logOT(o,'Subió una foto');save();openOT(id,'fotos',true);toast('Foto agregada (simulada)','camera')}
function addNote(id){const v=$('#nt').value.trim();if(!v)return;logOT(ot(id),'Nota: '+v);save();openOT(id,'bit',true)}
function requestPart(id,sku){const o=ot(id);sku=sku||$('#reqPart').value;const p=part(sku);o.items.push(it('R',p.name,p.price,1,sku,'adic',null,{rs:'solicitado'}));logOT(o,`Solicitó ${p.name} a almacén`);notify(`Pedido de ${p.name} para OT ${o.id}`,'info','box','inventario');save();toast('Pedido enviado a almacén','box');openOT(id,'rep',true)}
function deliverFromOT(id,iid){const o=ot(id),i=o.items.find(x=>x.id===iid);if(deliverItem(o,i)){toast('Repuesto entregado: stock descontado','check')}save();refresh()}

const NEXT={
  recibido:o=>['Asignar técnico y empezar el diagnóstico','El técnico revisa el auto y anota lo que encuentra.','Iniciar diagnóstico',`stageTo('${o.id}','diag')`],
  diag:o=>o.items.some(i=>i.ap===null)?['Cotizar los hallazgos y enviarlos al cliente','El cliente los aprueba con fotos desde Mi Auto.','Ir a cotización',`openOT('${o.id}','cot',true)`]:['Iniciar la reparación','No hay trabajos extra por aprobar.','Pasar a reparación',`stageTo('${o.id}','rep')`],
  aprob:o=>['Esperando la respuesta del cliente',`Enviado ${o.quoteAt?fmtDT(o.quoteAt):''}. Puedes simular la aprobación como si fueras el cliente.`,'Simular aprobación del cliente',`simApprove('${o.id}')`],
  rep:o=>o.blocked?['Destrabar el vehículo',o.blocked,'Marcar resuelto',`unblock('${o.id}')`]:['Reparación en curso','Cuando el técnico termine, pasa a control de calidad.','Pasar a control de calidad',`stageTo('${o.id}','cc')`],
  cc:o=>['Control de calidad y prueba de ruta','Si todo está bien, el cliente recibe el aviso de “listo”.','Aprobar: listo para entrega',`stageTo('${o.id}','listo')`],
  listo:o=>['Entregar y cobrar','Checklist de salida, cobro y comprobante.','Ir a entrega y cobro',`closeDrawer();go('entrega')`],
  ent:o=>['Servicio entregado',`Cobrado con ${o.pay||'—'}.`,'Ver comprobante',`showDoc('ent','${o.id}')`]
};
function nextStep(o){const n=NEXT[o.stage](o);return `<div class="next"><div class="ni">${ic(o.stage==='ent'?'check':'arrow')}</div><div class="sp"><small>Siguiente paso</small><b>${n[0]}</b><p>${esc(n[1])}</p></div><button class="btn btn-b" onclick="${n[3]}">${n[2]}</button></div>`}

/* ---------- COTIZACIÓN (tab + builder) ---------- */
function cotTab(o){
  const tt=otTotals(o),qs={borrador:['Borrador','gray'],enviada:['Enviada al cliente','y'],aprobada:['Aprobada','ok'],rechazada:['Rechazada','bad']}[o.quote]||['—','gray'];
  return `<div class="card"><h3><span class="l">Presupuesto ${pill(qs[0],qs[1])}</span><span class="row"><select id="addSel" class="chip" style="max-width:240px">${SERV.map(s=>`<option value="s:${s.id}">${esc(s.n)} · ${money0(s.price)}</option>`).join('')}${S.parts.map(p=>`<option value="p:${p.sku}">${esc(p.name)} · ${money0(p.price)}</option>`).join('')}</select><button class="btn btn-o btn-s" onclick="addItem('${o.id}')">${ic('plus')} Agregar</button></span></h3>
  <div class="tscroll"><table class="tbl"><thead><tr><th>Ítem</th><th class="r">Cant.</th><th class="r">Precio</th><th>Cliente</th><th></th></tr></thead><tbody>${o.items.map(i=>`<tr><td>${esc(i.desc)} ${i.st==='adic'?pill('Adicional','y'):''} ${i.ap===null&&!i.price?pill('Falta precio','bad'):i.sug&&i.ap===null?pill('Precio sugerido','info'):''}${i.hall&&i.hall!==i.desc?`<br><small>Hallazgo: ${esc(i.hall)}</small>`:''}</td><td class="r">${i.qty}</td><td class="r"><input type="number" value="${i.price}" min="0" style="width:84px;text-align:right;border:1.5px solid var(--line);border-radius:8px;padding:4px 6px" onchange="setPrice('${o.id}','${i.id}',this.value)"></td>
  <td>${i.ap===true?pill('Aprobado','ok'):i.ap===false?pill('Rechazado','bad'):pill('Pendiente','warn')}</td><td class="r"><button class="icbtn" style="width:28px;height:28px" onclick="delItem('${o.id}','${i.id}')">${ic('trash',15)}</button></td></tr>`).join('')}</tbody></table></div>
  <div class="sumbar"><span>Aprobado ${money(tt.total)}${tt.disc?` (dto. ${o.disc}%)`:''}</span><span>Por aprobar <b>${money(tt.pend)}</b></span></div>
  ${o.items.some(i=>i.ap===null&&!i.price)?`<div class="alertbox bad mt"><div class="ic">${ic('alert')}</div><div class="sp"><b>Hay ítems sin precio</b><small>Complétalos antes de enviar al cliente.</small></div></div>`:''}<div class="row mt"><button class="btn btn-b" onclick="sendQuote('${o.id}')" ${tt.pend&&!o.items.some(i=>i.ap===null&&!i.price)?'':'disabled'}>${ic('send')} Enviar al cliente (Mi Auto + WhatsApp)</button>
  <button class="btn btn-o" onclick="simApprove('${o.id}')" ${o.quote==='enviada'?'':'disabled'}>Simular aprobación del cliente</button><button class="btn btn-o" onclick="simReject('${o.id}')" ${o.quote==='enviada'?'':'disabled'}>Simular rechazo</button></div></div>`;
}
function addItem(id){const o=ot(id),v=$('#addSel').value,[k,x]=v.split(':');
  if(k==='s'){const s=SERV.find(z=>z.id===x);o.items.push(it('S',s.n,s.price,1,null,'adic',null))}else{const p=part(x);o.items.push(it('R',p.name,p.price,1,x,'adic',null))}
  if(o.quote==='aprobada')o.quote='borrador';logOT(o,'Agregó ítem a la cotización');save();openOT(id,'cot',true)}
function delItem(id,iid){const o=ot(id);o.items=o.items.filter(i=>i.id!==iid);save();openOT(id,'cot',true)}
function setPrice(id,iid,v){ot(id).items.find(i=>i.id===iid).price=+v||0;save();openOT(id,'cot',true)}
function sendQuote(id){const o=ot(id);const tt=otTotals(o);o.quote='enviada';o.quoteAt=nowISO();if(o.stage==='diag'||o.stage==='recibido')o.stage='aprob';
  logOT(o,`Cotización enviada: ${money(tt.pend)} por aprobar`);o.log.push({t:nowISO(),who:who(),txt:`Te enviamos ${o.items.filter(i=>i.ap===null).length} hallazgo(s) para que los apruebes.`,pub:1});waMoment(o,'aprobacion',o.items.filter(i=>i.ap===null).length,tt.pend);
  save();toast('Enviada: el cliente la ve en Mi Auto y por WhatsApp','send');refresh()}
function simApprove(id){const o=ot(id);o.items.forEach(i=>{if(i.ap===null)i.ap=true});o.quote='aprobada';logOT(o,'Cliente aprobó el presupuesto desde Mi Auto',1);notify(`${clientOf(o).n} aprobó el presupuesto de ${o.plate}`,'ok','check','tablero');
  if(o.stage==='aprob')setStage(id,'rep',{silent:true});reserveItems(o);save();toast('Aprobado por el cliente: repuestos reservados y OT en reparación','check');refresh()}
function simReject(id){const o=ot(id);o.items.forEach(i=>{if(i.ap===null)i.ap=false});o.quote='rechazada';logOT(o,'Cliente rechazó los adicionales',1);notify(`${clientOf(o).n} rechazó adicionales de ${o.plate}`,'warn','x','cotizaciones');if(o.stage==='aprob')setStage(id,'rep',{silent:true});save();refresh();toast('Adicionales rechazados: quedan como oportunidad','x')}

/* Una sola bandeja: por enviar → esperando cliente → aprobadas / rechazadas */
let COT={tab:'enviar'};
const COT_TABS=[['enviar','Por enviar'],['esperando','Esperando al cliente'],['aprobadas','Aprobadas'],['rechazadas','Rechazadas']];
function cotList(tab){const l=S.ots.filter(o=>o.stage!=='ent');
  if(tab==='enviar')return l.filter(o=>o.quote!=='enviada'&&o.items.some(i=>i.ap===null));
  if(tab==='esperando')return l.filter(o=>o.quote==='enviada');
  if(tab==='aprobadas')return l.filter(o=>o.quote==='aprobada'&&!o.items.some(i=>i.ap===null));
  return l.filter(o=>o.items.some(i=>i.ap===false));}
VIEWS.cotizaciones={t:'Cotizaciones',ic:'file',render(p){
  if(p&&p.tab)COT.tab=p.tab;
  const L={};COT_TABS.forEach(([k])=>L[k]=cotList(k));const pendAmt=l=>l.reduce((a,o)=>a+otTotals(o).pend,0),rej=o=>o.items.filter(i=>i.ap===false).reduce((a,i)=>a+i.price*i.qty,0);
  const list=L[COT.tab];
  const row=o=>{const t=otTotals(o),c=clientOf(o),noPr=o.items.filter(i=>i.ap===null&&!i.price).length,days=o.quoteAt?daysSince(o.quoteAt):0;
    let st='',acts=`<button class="btn btn-o btn-s" onclick="openOT('${o.id}','cot')">Ver</button>`,amt=t.pend;
    if(COT.tab==='enviar'){st=noPr?pill(noPr+' sin precio','bad'):pill('Listo para enviar','info');acts=`<button class="btn btn-b btn-s" onclick="openOT('${o.id}','cot')">${noPr?'Completar precios':'Revisar y enviar'}</button>`}
    if(COT.tab==='esperando'){st=pill(days?`Sin respuesta hace ${days} d`:'Enviada hoy',days>=2?'bad':days?'warn':'gray');acts=`<button class="btn btn-g btn-s" onclick="chase('${o.id}')">${ic('chat')} Insistir</button><button class="btn btn-o btn-s" onclick="offerDisc('${o.id}')">Ofrecer 5%</button>`+acts}
    if(COT.tab==='aprobadas'){st=pill('Aprobada','ok');amt=t.total}
    if(COT.tab==='rechazadas'){st=pill('Rechazó '+o.items.filter(i=>i.ap===false).length+' ítem(s)','bad');amt=rej(o);acts=`<button class="btn btn-g btn-s" onclick="chase('${o.id}')">${ic('chat')} Insistir</button><button class="btn btn-o btn-s" onclick="offerDisc('${o.id}')">Ofrecer 5%</button>`+acts}
    return `<tr><td>${plateTag(o.plate)}<br><small>OT ${o.id}</small></td><td><b style="font-weight:500">${esc(carName(o.plate))}</b><br><small>${esc(c.n)}</small></td><td>${st}</td><td class="r"><b>${money(amt)}</b></td><td class="r"><div class="row" style="justify-content:flex-end;gap:6px">${acts}</div></td></tr>`};
  return `<div class="ph"><div><h2>Cotizaciones</h2><p>Todo el camino del presupuesto en un solo lugar: armarlo, enviarlo, darle seguimiento y recuperar lo rechazado.</p></div></div>
  <div class="grid g4 mb"><div class="kpi"><small>Por enviar</small><b>${L.enviar.length}</b><span>${money0(pendAmt(L.enviar))} en hallazgos</span></div><div class="kpi y"><small>Esperando al cliente</small><b>${money0(pendAmt(L.esperando))}</b><span>${L.esperando.length} cotización(es)</span></div><div class="kpi g"><small>Aprobadas</small><b>${L.aprobadas.length}</b><span>En ejecución</span></div><div class="kpi r"><small>Rechazado por recuperar</small><b>${money0(L.rechazadas.reduce((a,o)=>a+rej(o),0))}</b><span>${L.rechazadas.length} OT</span></div></div>
  <div class="tabs">${COT_TABS.map(([k,n])=>`<button class="${COT.tab===k?'on':''}" onclick="COT.tab='${k}';refresh()">${n} (${L[k].length})</button>`).join('')}</div>
  <div class="card" id="cotTbl">${list.length?`<div class="tscroll"><table class="tbl"><thead><tr><th>Vehículo</th><th>Cliente</th><th>Estado</th><th class="r">${COT.tab==='rechazadas'?'Rechazado':COT.tab==='aprobadas'?'Total':'Por aprobar'}</th><th></th></tr></thead><tbody>${list.map(row).join('')}</tbody></table></div>`:`<div class="empty">${{enviar:'No hay hallazgos por cotizar.',esperando:'Ninguna cotización esperando al cliente.',aprobadas:'Sin cotizaciones aprobadas en curso.',rechazadas:'Nada rechazado por recuperar. ¡Bien!'}[COT.tab]}</div>`}</div>`}};

/* ---------- AGENDA ---------- */
let AG={day:D(0)};
const HOURS=['08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','14:00','14:30','15:00','15:30','16:00','16:30','17:00'];
const CAP=12;
VIEWS.agenda={t:'Agenda y capacidad',ic:'calendar',render(){
  const days=[...Array(7)].map((_,i)=>D(i-1)),list=S.appts.filter(a=>a.date===AG.day).sort((a,b)=>a.hour.localeCompare(b.hour));
  const used=list.filter(a=>a.status!=='noshow').length;const ns=S.appts.filter(a=>a.status==='noshow').length;
  return `<div class="ph"><div><h2>Agenda <em>y capacidad</em></h2><p>Citas de la web, Mi Auto y teléfono. Capacidad diaria: ${CAP} ingresos.</p></div><div class="acts"><button class="btn btn-o" onclick="remindDay()">${ic('chat')} Recordatorios WhatsApp</button><button class="btn btn-y" onclick="newAppt()">${ic('plus')} Nueva cita</button></div></div>
  <div class="days">${days.map(d=>{const dt=new Date(d+'T12:00'),n=S.appts.filter(a=>a.date===d&&a.status!=='noshow').length;return `<div class="day ${AG.day===d?'on':''}" onclick="AG.day='${d}';refresh()"><small>${d===D(0)?'Hoy':DN[dt.getDay()]}</small><b>${dt.getDate()}</b><span>${n}/${CAP} citas</span></div>`}).join('')}</div>
  <div class="grid g21"><div class="card"><h3>Citas del ${fmtD(AG.day)}</h3>${HOURS.map(h=>{const as=list.filter(a=>a.hour===h);return `<div class="slot"><b>${h}</b><div>${as.map(a=>`<div class="appt ${a.status==='llego'?'arr':a.status==='noshow'?'ns':''}"><div class="sp"><b>${esc(a.client)}</b> ${plateTag(a.plate)}<br><small>${esc(a.svc)} · ${esc(a.src)}${a.note?' · “'+esc(a.note)+'”':''}</small></div>${a.status==='pend'&&a.date===D(0)?`<button class="btn btn-b btn-s" onclick="arrive('${a.id}')">Llegó</button><button class="btn btn-o btn-s" onclick="noShow('${a.id}')">No vino</button>`:a.status==='llego'?pill('Llegó','ok'):a.status==='noshow'?pill('No-show','bad'):pill('Confirmada','info')}</div>`).join('')}</div></div>`}).join('')}</div>
  <div><div class="card mb"><h3>Capacidad del día</h3><div class="meter ${used>CAP*.85?'bad':used>CAP*.6?'warn':'ok'}" style="height:14px"><i style="width:${Math.min(100,used/CAP*100)}%"></i></div><p class="mt"><b>${used}</b> de ${CAP} ingresos · ${CAP-used} cupos libres</p></div>
  <div class="card mb"><h3>Bahías</h3>${BAYS.map(b=>{const o=openOTs().find(x=>x.bay===b);return `<div class="row" style="padding:6px 0;border-bottom:1px solid var(--line)"><b style="width:34px">${b}</b>${o?`${plateTag(o.plate)}<small class="sp">${esc(o.svc.slice(0,26))}</small>${pill(tech(o.tech)?.n.split(' ')[0]||'—','info')}`:`<span class="sp mut">Libre</span>${pill('Disponible','ok')}`}</div>`}).join('')}</div>
  <div class="card"><h3>Control de no-show</h3><p><b>${ns}</b> cita(s) no asistida(s) esta semana. Enviar recordatorio un día antes reduce las faltas.</p></div></div></div>`}};
function arrive(id){const a=S.appts.find(x=>x.id===id);a.status='llego';save();go('recepcion',{appt:id})}
function noShow(id){S.appts.find(x=>x.id===id).status='noshow';audit('Marcó no-show en cita '+id);save();refresh()}
function remindDay(){const l=S.appts.filter(a=>a.date===AG.day&&a.status==='pend');l.forEach(a=>waSend(a.client,'',`Hola ${a.client.split(' ')[0]}, te esperamos el ${fmtD(a.date)} a las ${a.hour} (${a.svc}). Responde "CONFIRMO" o "REPROGRAMAR".`,'recordatorio cita',true));toast(`${l.length} recordatorio(s) enviados por WhatsApp`,'chat');save()}
function newAppt(){openModal('Nueva cita',`<div class="fg"><div class="f"><label>Cliente</label><input id="apC"></div><div class="f"><label>Placa</label><input id="apP" placeholder="ABC-123" style="text-transform:uppercase"></div></div><div class="fg3"><div class="f"><label>Día</label><input id="apD" type="date" value="${AG.day}"></div><div class="f"><label>Hora</label><select id="apH">${HOURS.map(h=>`<option>${h}</option>`).join('')}</select></div><div class="f"><label>Origen</label><select id="apS"><option>Teléfono</option><option>Web</option><option>Mi Auto</option><option>Presencial</option></select></div></div><div class="f"><label>Servicio</label><select id="apV">${SERV.map(s=>`<option>${esc(s.n)}</option>`).join('')}</select></div>`,`<button class="btn btn-o" onclick="closeModal()">Cancelar</button><button class="btn btn-y" onclick="saveAppt()">Guardar cita</button>`)}
function saveAppt(){const c=$('#apC').value.trim(),p=$('#apP').value.trim().toUpperCase();if(!c||!p){toast('Completa cliente y placa','alert');return}
  S.appts.push({id:'a'+(++S.counters.appt),date:$('#apD').value,hour:$('#apH').value,plate:p,client:c,svc:$('#apV').value,status:'pend',src:$('#apS').value});audit(`Creó cita de ${c} (${p})`);closeModal();AG.day=$('#apD')?AG.day:AG.day;toast('Cita creada','calendar');refresh()}

/* ---------- RECEPCIÓN (asistente en 3 pasos) ---------- */
const recNew=()=>({step:1,plate:'',cn:'',b:'',m:'',y:'',tel:'',km:'',type:'particular',svc:[],note:'',fuel:50,objs:[],photos:0,sig:null,tech:'',prom:D(1),appt:null,err:{}});
let REC=recNew();
const REC_STEPS=['Vehículo y cliente','Qué necesita','Firma y asignación'];
const recKnown=()=>veh(REC.plate);
const recErr=k=>REC.err[k]?`<small class="err">${REC.err[k]}</small>`:'';
function recSet(k,v){REC[k]=v;if(REC.err[k]){delete REC.err[k];const e=$('#e-'+k);if(e)e.remove()}}
const recInput=(k,label,attrs='')=>`<div class="f ${REC.err[k]?'bad':''}"><label>${label}</label><input value="${esc(REC[k])}" oninput="recSet('${k}',this.value)" ${attrs}>${REC.err[k]?`<small class="err" id="e-${k}">${REC.err[k]}</small>`:''}</div>`;
VIEWS.recepcion={t:'Recepción de vehículo',ic:'car',render(p){
  if(p&&p.appt){const a=S.appts.find(x=>x.id===p.appt);REC=recNew();REC.appt=a;REC.plate=a.plate;REC.cn=a.client;recFill();CUR.param=null}
  const st=REC.step,sv=REC.svc.map(x=>SERV.find(z=>z.id===x)),v=recKnown();
  let body='';
  if(st===1)body=`<div class="card"><h3>1 · Vehículo y cliente</h3>
   <div class="f ${REC.err.plate?'bad':''}"><label>Placa</label><input class="plate-in" list="plates" value="${esc(REC.plate)}" placeholder="ABC-123" maxlength="7" oninput="recPlate(this.value)" autofocus><datalist id="plates">${S.vehicles.map(x=>`<option value="${x.plate}">${esc(x.brand+' '+x.model)}</option>`).join('')}</datalist>${recErr('plate')}</div>
   <div id="recHint">${recHint()}</div>
   <div class="fg">${recInput('cn','Cliente')}${recInput('tel','Teléfono (WhatsApp)','inputmode="tel" placeholder="9XX XXX XXX"')}</div>
   <div class="fg3">${recInput('b','Marca')}${recInput('m','Modelo')}${recInput('y','Año','type="number"')}</div>
   <div class="fg">${recInput('km','Kilometraje actual *','type="number" inputmode="numeric"')}<div class="f"><label>Tipo de cliente</label><select onchange="recSet('type',this.value)">${[['particular','Particular'],['flota','Flota'],['seguro','Seguro']].map(([k,n])=>`<option value="${k}" ${REC.type===k?'selected':''}>${n}</option>`).join('')}</select></div></div></div>`;
  if(st===2)body=`<div class="card mb"><h3>2 · Qué necesita</h3><div class="chips">${SERV.map(s=>`<button class="chip ${REC.svc.includes(s.id)?'on':''}" onclick="recSvc('${s.id}')">${esc(s.n)} · ${money0(s.price)}</button>`).join('')}</div>${recErr('svc')}
   <div class="f mt"><label>Lo que cuenta el cliente</label><textarea rows="2" oninput="recSet('note',this.value)" placeholder="Ej.: suena la llanta delantera al frenar">${esc(REC.note)}</textarea></div></div>
   <div class="card"><h3>Estado de ingreso</h3><div class="f"><label>Combustible: <b id="fv">${REC.fuel}%</b></label><input type="range" min="0" max="100" step="25" value="${REC.fuel}" oninput="REC.fuel=+this.value;$('#fv').textContent=this.value+'%'"></div>
   <div class="sec-t">Objetos en el vehículo</div><div class="chips">${['Documentos','Llanta de repuesto','Gata y llave','Equipo de sonido','Extintor','Triángulos'].map(x=>`<button class="chip ${REC.objs.includes(x)?'on':''}" onclick="recObj('${x}')">${x}</button>`).join('')}</div>
   <div class="sec-t">Fotos de ingreso (daños previos)</div><div class="photos" id="rPh">${recPhotos()}</div></div>`;
  if(st===3){const area=sv[0]?.area||'mec',sug=suggestTech(area);if(!REC.tech&&sug)REC.tech=sug.id;
   body=`<div class="card mb ${REC.err.sig?'bad':''}"><h3>3 · Firma del cliente <small>obligatoria</small></h3><canvas id="sig" class="sigpad"></canvas><div class="row mt"><small class="sp">El cliente firma con el dedo en la tablet o con el mouse.</small><button class="btn btn-o btn-s" onclick="sigClear()">Borrar</button></div>${recErr('sig')}</div>
   <div class="card"><h3>Asignación</h3><div class="fg"><div class="f"><label>Técnico ${sug?`<small>(sugerido: ${sug.n}, menor carga)</small>`:''}</label><select onchange="REC.tech=this.value">${TECHS.filter(t=>t.area===area).map(t=>`<option value="${t.id}" ${REC.tech===t.id?'selected':''}>${t.n}${t.esp?' · '+t.esp:''} · ${openOTs().filter(o=>o.tech===t.id).length} OT</option>`).join('')}</select></div>
   <div class="f"><label>Entrega prometida</label><input type="date" value="${REC.prom}" onchange="REC.prom=this.value"></div></div><small>Bahía sugerida: <b>${freeBay(area)}</b> · ${sv.reduce((a,x)=>a+x.hrs,0)} h estimadas de trabajo</small></div>`}
  const total=sv.reduce((a,x)=>a+x.price,0);
  return `<div class="ph"><div><h2>Recepción de vehículo</h2><p>Tres pasos con el cliente al lado. Al terminar se crea la OT y el cliente recibe su enlace a Mi Auto.</p></div>${REC.plate||REC.svc.length?`<div class="acts"><button class="btn btn-t" onclick="REC=recNew();refresh()">Empezar de nuevo</button></div>`:''}</div>
  <div class="wiz">${REC_STEPS.map((n,i)=>`<div class="${i+1<st?'done':i+1===st?'cur':''}" onclick="${i+1<st?`REC.step=${i+1};refresh()`:''}"><span>${i+1<st?ic('check',14):i+1}</span>${n}</div>`).join('')}</div>
  <div class="grid g21" style="align-items:start"><div>${body}
   <div class="row mt">${st>1?`<button class="btn btn-o btn-lg" onclick="REC.step--;refresh()">Atrás</button>`:''}<span class="sp"></span>${st<3?`<button class="btn btn-b btn-lg" onclick="recNext()">Siguiente ${ic('arrow')}</button>`:`<button class="btn btn-y btn-lg" onclick="saveRec()">${ic('check')} Recibir y generar OT</button>`}</div></div>
  <div class="card rec-sum"><h3>Resumen</h3>
   <div class="row" style="margin-bottom:10px">${REC.plate?plateTag(REC.plate):'<span class="mut">Sin placa</span>'}${v?pill('Cliente conocido','ok'):REC.plate.length>=6?pill('Nuevo','info'):''}</div>
   <p><b>${esc(REC.cn||'—')}</b><br><small>${esc([REC.b,REC.m,REC.y].filter(Boolean).join(' ')||'Vehículo')}${REC.km?' · '+Number(REC.km).toLocaleString('es-PE')+' km':''}</small></p>
   <div class="divider"></div>${sv.length?sv.map(x=>`<div class="row" style="justify-content:space-between;font-size:13px;padding:3px 0"><span>${esc(x.n)}</span><b style="font-weight:500">${money0(x.price)}</b></div>`).join('')+`<div class="row" style="justify-content:space-between;margin-top:6px"><span>Total referencial</span><b>${money0(total)}</b></div>`:'<small>Aún sin servicios</small>'}
   <div class="divider"></div><small>${REC.photos} foto(s) · combustible ${REC.fuel}% · ${REC.sig?'firmado ✓':'sin firma'}</small></div></div>`},
 after(){if(REC.step===3)sigInit()}};
function recHint(){const v=recKnown();if(v){const c=client(v.client),n=S.ots.filter(o=>o.plate===v.plate).length;return `<div class="alertbox ok" style="margin-bottom:12px"><div class="ic">${ic('check')}</div><div class="sp"><b>Vehículo conocido · ${n} visita(s)</b><small>${esc(c.n)} · cliente desde ${c.since}. Completamos sus datos.</small></div><button class="btn btn-o btn-s" onclick="openClient('${c.id}')">Ver ficha</button></div>`}
  return REC.plate.length>=6?`<div class="alertbox info" style="margin-bottom:12px"><div class="ic">${ic('plus')}</div><div class="sp"><b>Vehículo nuevo</b><small>Se registrará junto con el cliente.</small></div></div>`:''}
function recFill(){const v=recKnown();if(!v)return;const c=client(v.client);Object.assign(REC,{cn:c.n,b:v.brand,m:v.model,y:String(v.year||''),tel:c.tel||'',km:String(v.km||''),type:c.type})}
function recPlate(val){let p=val.toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,6);if(p.length>3)p=p.slice(0,3)+'-'+p.slice(3);REC.plate=p;delete REC.err.plate;
  const was=!!REC._known,k=!!recKnown();REC._known=k;if(k){recFill();refresh();const i=$('.plate-in');if(i){i.focus();i.setSelectionRange(9,9)}}else{if(was){Object.assign(REC,{cn:'',b:'',m:'',y:'',tel:'',km:''});refresh();const i=$('.plate-in');if(i){i.focus();i.setSelectionRange(9,9)}}else $('#recHint').innerHTML=recHint()}}
function recNext(){REC.err={};
  if(REC.step===1){if(!/^[A-Z0-9]{3}-[A-Z0-9]{3}$/.test(REC.plate))REC.err.plate='Escribe la placa completa (ej.: ABC-123)';else{const op=openOTs().find(o=>o.plate===REC.plate);if(op)REC.err.plate=`Este auto ya está en el taller (OT ${op.id} · ${stage(op.stage).n})`}if(!REC.cn.trim())REC.err.cn='¿A nombre de quién recibimos el auto?';if(!(+REC.km>0))REC.err.km='El kilometraje es obligatorio: lo usamos para los recordatorios de mantenimiento';
    const v=recKnown();if(v&&+REC.km>0&&+REC.km<v.km)REC.err.km=`Es menor al último registrado (${v.km.toLocaleString('es-PE')} km)`}
  if(REC.step===2&&!REC.svc.length)REC.err.svc='Elige al menos un servicio';
  if(Object.keys(REC.err).length){refresh();return}
  REC.step++;refresh();$('#main').scrollTop=0}
const recPhotos=()=>[...Array(REC.photos)].map((_,i)=>`<div class="photo" style="background:linear-gradient(135deg,#4F46E5,#0B1B3A)">${ic('camera',20)}<span>${['Frente','Lateral izq.','Posterior','Lateral der.','Tablero','Interior'][i%6]}</span></div>`).join('')+`<div class="photo add" onclick="REC.photos++;$('#rPh').innerHTML=recPhotos()">${ic('plus',22)}<span>Tomar foto</span></div>`;
function recSvc(id){const i=REC.svc.indexOf(id);i<0?REC.svc.push(id):REC.svc.splice(i,1);delete REC.err.svc;REC.tech='';refresh()}
function recObj(x){const i=REC.objs.indexOf(x);i<0?REC.objs.push(x):REC.objs.splice(i,1);refresh()}
function sigInit(){const c=$('#sig');if(!c)return;c.width=c.offsetWidth*2;c.height=240;const x=c.getContext('2d');x.scale(2,2);x.lineWidth=2.2;x.lineCap='round';x.strokeStyle='#0B1B3A';let d=false;
  if(REC.sig){const im=new Image();im.onload=()=>x.drawImage(im,0,0,c.offsetWidth,120);im.src=REC.sig}
  const pos=e=>{const r=c.getBoundingClientRect(),t=e.touches?e.touches[0]:e;return[t.clientX-r.left,t.clientY-r.top]};
  const st=e=>{d=true;const[a,b]=pos(e);x.beginPath();x.moveTo(a,b);e.preventDefault()},mv=e=>{if(!d)return;const[a,b]=pos(e);x.lineTo(a,b);x.stroke();e.preventDefault()},
        en=()=>{if(!d)return;d=false;REC.sig=c.toDataURL();if(REC.err.sig){delete REC.err.sig;const e=$('#e-sig');if(e)e.remove()}};
  c.onmousedown=st;c.onmousemove=mv;c.onmouseup=en;c.onmouseleave=en;c.ontouchstart=st;c.ontouchmove=mv;c.ontouchend=en}
function sigClear(){const c=$('#sig');if(c)c.getContext('2d').clearRect(0,0,c.width,c.height);REC.sig=null}
function saveRec(){
  REC.err={};if(!REC.sig)REC.err.sig='Falta la firma del cliente';if(Object.keys(REC.err).length){refresh();return}
  const p=REC.plate;let v=veh(p),c;
  if(v)c=client(v.client);else{c={id:'c'+Date.now(),n:REC.cn.trim(),type:REC.type,tel:REC.tel.trim(),mail:'',since:new Date().getFullYear(),note:''};S.clients.push(c);
    v={plate:p,brand:REC.b||'—',model:REC.m||'',year:+REC.y||'',color:'',km:+REC.km,client:c.id,lastDate:D(0),lastKm:+REC.km,every:10000};S.vehicles.push(v)}
  if(REC.tel.trim()&&!c.tel)c.tel=REC.tel.trim();
  v.km=+REC.km;
  const sv=REC.svc.map(x=>SERV.find(z=>z.id===x)),area=sv[0].area,t=tech(REC.tech)||suggestTech(area),id=nextOTId();
  const o={id,plate:p,client:c.id,svc:sv.map(s=>s.n).join(' + '),area,stage:'recibido',tech:null,bay:null,created:nowISO(),promised:REC.prom,km:v.km,fuel:REC.fuel,asesor:ROLES[S.role].who||'u1',note:REC.note,objs:REC.objs.join(', '),quote:'borrador',
    items:sv.map(s=>it('S',s.n,s.price)),insp:mkInsp(),photos:[...Array(REC.photos)].map((_,i)=>({lbl:['Frente','Lateral izquierdo','Parte posterior','Lateral derecho','Tablero','Interior'][i%6],t:nowISO(),ing:1})),hist:[{k:'recibido',t:nowISO()}],log:[],doc:c.type==='particular'?'boleta':'factura',sig:REC.sig,disc:c.disc||0};
  if(t){o.tech=t.id;o.bay=freeBay(area,t.id)}
  S.ots.push(o);logOT(o,'Vehículo recibido. Hoja de recepción firmada.',1);if(t)logOT(o,`Asignado a ${t.n} · bahía ${o.bay}`);
  waMoment(o,'recibido');
  if(REC.appt){const a=S.appts.find(x=>x.id===REC.appt.id);if(a)a.status='llego'}
  REC=recNew();save();
  toast(`OT ${id} creada · ${t?t.n:'sin técnico'} · el cliente recibió su enlace a Mi Auto`,'check');
  go('tablero');openOT(id);
}

/* ---------- VISTA TÉCNICO (móvil) ---------- */
let TK={tech:'t1',tab:'mis',ot:null};
const ACT_LBL={recibido:['play','Iniciar diagnóstico','diag','pri'],diag:['play','Iniciar reparación','rep','pri'],rep:['check','Terminé: pasar a control de calidad','cc','okb'],cc:['check','Todo bien: listo para entrega','listo','okb']};
function tkScreen(){
  const t=tech(TK.tech),mine=openOTs().filter(o=>o.tech===TK.tech),o=TK.ot&&ot(TK.ot);
  if(o){const items=o.items.filter(i=>i.sku),a=ACT_LBL[o.stage];
   return `<div class="sh"><button class="btn-t btn" style="padding:0;margin-bottom:6px" onclick="TK.ot=null;refresh()">‹ Mis autos</button><h4>${esc(carName(o.plate))}</h4><small><span class="plate">${o.plate}</span> · Bahía ${o.bay||'—'} · ${pill(stage(o.stage).n,'info')}</small></div><div class="sb">
   <div class="tk" style="cursor:default"><small>Qué pidió el cliente</small><p style="margin-top:2px">${esc(o.note||o.svc)}</p>${o.blocked?`<p class="mt">${pill('Detenido: '+esc(o.blocked),'bad')}</p>`:''}</div>
   ${a?`<button class="bigbtn ${a[3]}" onclick="tkStage('${o.id}','${a[2]}')">${ic(a[0])} ${a[1]}</button>`:o.stage==='aprob'?`<div class="tk" style="cursor:default;background:var(--warn-50);border-color:#FDE68A"><b>Esperando que el cliente apruebe</b><br><small>Sigue con los trabajos ya aprobados.</small></div>`:`<div class="tk" style="cursor:default"><b>Listo. ¡Buen trabajo!</b></div>`}
   ${workItems(o).length?`<div class="sec-t">Trabajos de este auto · ${workItems(o).filter(i=>i.done).length} de ${workItems(o).length} listos</div>${workItems(o).map(i=>{const w=workState(o,i);return `<button class="bigbtn wk ${w}" onclick="toggleDone('${o.id}','${i.id}')"><span class="wk-c">${w==='done'?ic('check',16):''}</span><span class="sp">${esc(i.desc)}<small>${w==='done'?'Terminado · toca para deshacer':w==='now'?'Trabajando ahora · toca al terminar':'Por hacer · toca al terminar'}</small></span></button>`}).join('')}<p class="mut" style="font-size:11.5px;margin:6px 2px 0">El cliente ve este avance en Mi Auto.</p>`:''}
   <div class="sec-t">Reportar</div>
   <button class="bigbtn" onclick="tkPhoto('${o.id}')">${ic('camera')} Subir foto <small class="sp r">la ve el cliente</small></button>
   <button class="bigbtn" onclick="tkFinding('${o.id}')">${ic('alert')} Encontré algo más <small class="sp r">va al asesor</small></button>
   <button class="bigbtn" onclick="tkPart('${o.id}')">${ic('box')} Pedir repuesto <small class="sp r">va a almacén</small></button>
   <button class="bigbtn" onclick="tkBlock('${o.id}')">${ic('clock')} No puedo avanzar <small class="sp r">avisa al jefe</small></button>
   <div class="sec-t">Repuestos de este auto</div>${items.map(i=>`<div class="tk" style="cursor:default"><div class="row"><span class="sp">${esc(i.desc)}<br><small>${i.qty} u.</small></span>${rsPill(i)}</div></div>`).join('')||'<small>Sin repuestos</small>'}</div>`}
  if(TK.tab==='ped'){const l=[];openOTs().filter(x=>x.tech===TK.tech).forEach(x=>x.items.filter(i=>i.sku&&i.ap!==false).forEach(i=>l.push({x,i})));
   return `<div class="sh"><small>Mis pedidos a almacén</small><h4>Repuestos</h4></div><div class="sb">${l.map(({x,i})=>`<div class="tk" style="cursor:default"><div class="row"><span class="sp"><b style="font-weight:500">${esc(i.desc)}</b><br><small>${x.plate} · ${i.qty} u.</small></span>${rsPill(i)}</div></div>`).join('')||'<div class="empty">Sin pedidos</div>'}</div>`}
  return `<div class="sh"><small>Hola,</small><h4>${t.n}</h4><small>${AREAS[t.area]}${t.esp?' · '+t.esp:''}</small></div><div class="sb">
   <div class="sec-t" style="margin-top:4px">Mis autos de hoy · ${mine.length}</div>
   ${mine.map(x=>`<div class="tk" onclick="TK.ot='${x.id}';refresh()"><div class="row"><span class="plate">${x.plate}</span><span class="sp"></span>${isLate(x)?pill('Atrasado','bad'):`<small>Entrega ${fmtD(x.promised)}</small>`}</div><b style="display:block;margin-top:8px">${esc(carName(x.plate))}</b><small>${esc(x.svc)}</small><div class="row" style="margin-top:8px">${pill(stage(x.stage).n,'info')}${x.blocked?pill('Detenido','bad'):''}<span class="sp"></span>${ic('chev',16)}</div></div>`).join('')||'<div class="empty">No tienes autos asignados.</div>'}</div>`;
}
VIEWS.tecnico={t:'Vista del técnico',ic:'wrench',render(){
  if(S.role==='tecnico'){const u=user(ROLES.tecnico.who);TK.tech=u.tech||'t1'}
  const feed=S.audit.slice(0,7);
  return `<div class="ph"><div><h2>Vista del técnico</h2><p>Así se ve en el celular del mecánico. Prueba tocando un auto y luego un botón.</p></div>
  ${S.role!=='tecnico'?`<div class="acts"><select class="chip" onchange="TK.tech=this.value;TK.ot=null;TK.tab='mis';refresh()">${TECHS.map(x=>`<option value="${x.id}" ${TK.tech===x.id?'selected':''}>${x.n} · ${AREAS[x.area]}</option>`).join('')}</select></div>`:''}</div>
  <div class="grid" style="grid-template-columns:auto 1fr;align-items:start;gap:28px"><div class="phone"><div class="scr">${tkScreen()}
   <div class="nav2"><button class="${TK.tab==='mis'?'on':''}" onclick="TK.tab='mis';TK.ot=null;refresh()">${ic('car')}Mis autos</button><button class="${TK.tab==='ped'?'on':''}" onclick="TK.tab='ped';TK.ot=null;refresh()">${ic('box')}Repuestos</button></div></div></div>
  <div><div class="card mb"><h3>Cómo funciona</h3><ol class="steps">
   <li><span><b>El técnico ve solo sus autos</b><br><small>Los asigna el jefe de taller o la recepción.</small></span></li>
   <li><span><b>Avanza con un botón grande</b><br><small>“Iniciar”, “Terminé”, “Todo bien”. Cada toque mueve el auto en el tablero.</small></span></li>
   <li><span><b>Reporta sin dejar la bahía</b><br><small>Fotos y hallazgos llegan al asesor para cotizar; los repuestos, a almacén.</small></span></li>
   <li><span><b>El cliente se entera solo</b><br><small>Recibe WhatsApp y lo ve en Mi Auto. Nadie tiene que llamar a preguntar.</small></span></li></ol></div>
  <div class="card"><h3><span class="l"><span class="dotc" style="background:var(--ok)"></span>En vivo en el sistema</span><small>últimas acciones</small></h3><div class="live">${feed.map(a=>`<div><b style="font-weight:500">${esc(a.txt)}</b><br><small>${esc(a.who)} · ${fmtDT(a.t)}</small></div>`).join('')}</div></div></div></div>`}};
IC.play='<path d="M6 4l14 8-14 8z"/>';
function tkStage(id,k){requestStage(id,k)}
function tkPhoto(id){const o=ot(id);o.photos.push({lbl:'Foto del técnico '+(o.photos.length+1),t:nowISO()});logOT(o,'Nueva foto del técnico',1);save();toast('Foto subida: el cliente ya la ve en Mi Auto','camera');refresh()}
function tkFinding(id){const o=ot(id);openModal('Encontré algo más',`<p class="mut mb">Elige qué encontraste: llega al asesor con el precio del catálogo, listo para enviar al cliente.</p>
  <div class="f"><label>¿Qué encontraste?</label><select id="hp" onchange="$('#hfW').style.display=this.value==='__otro'?'flex':'none';findPrev('${id}')">${INSP_TPL.map(([c,n])=>`<option value="${n}">${c} · ${n}</option>`).join('')}<option value="__otro">Otro (escribir)</option></select></div>
  <div class="f" id="hfW" style="display:none"><label>Describe el hallazgo</label><input id="hf" placeholder="Ej.: fuga en retén de cigüeñal"></div>
  <div class="fg"><div class="f"><label>Urgencia</label><select id="hu"><option value="bad">Urgente</option><option value="warn">Recomendado</option><option value="opt">Opcional</option></select></div><div class="f"><label>Nota para el cliente (opcional)</label><input id="hn" placeholder="Qué viste y por qué importa"></div></div>
  <div id="hprev"></div>`,`<button class="btn btn-o" onclick="closeModal()">Cancelar</button><button class="btn btn-b" onclick="saveFinding('${id}')">Enviar al asesor</button>`);findPrev(id)}
function findPrev(id){const p=$('#hp').value,el=$('#hprev');if(!el)return;if(p==='__otro'){el.innerHTML=`<div class="alertbox"><div class="ic">${ic('alert')}</div><div class="sp"><small>Sin precio de referencia: el asesor lo completará.</small></div></div>`;return}
  const r=suggestFor(p,ot(id).plate);el.innerHTML=r.length?`<div class="alertbox info"><div class="ic">${ic('tag')}</div><div class="sp"><b>Precio sugerido: ${money(r.reduce((a,x)=>a+x.price,0))}</b><small>${r.map(x=>esc(x.desc)+' '+money0(x.price)).join(' + ')}</small></div></div>`:`<div class="alertbox"><div class="ic">${ic('alert')}</div><div class="sp"><small>Sin precio de referencia: el asesor lo completará.</small></div></div>`}
function saveFinding(id){const o=ot(id),p=$('#hp').value,free=($('#hf')?.value||'').trim(),point=p==='__otro'?free:p;if(!point){toast('Describe el hallazgo','alert');return}
  const amt=addFinding(o,point,$('#hu').value,$('#hn').value.trim());logOT(o,'Hallazgo reportado: '+point);notify(`Hallazgo en ${o.plate}: ${point}${amt?` · sugerido ${money0(amt)}`:' · falta precio'}`,'warn','alert','cotizaciones');
  closeModal();save();toast(amt?`Enviado al asesor con precio sugerido de ${money0(amt)}`:'Enviado al asesor: falta ponerle precio','send');refresh()}
function tkPart(id){openModal('Pedir repuesto',`<div class="f"><label>Repuesto</label><select id="tp">${S.parts.map(p=>`<option value="${p.sku}">${esc(p.name)} · ${avail(p)} disponible(s)</option>`).join('')}</select></div>`,`<button class="btn btn-o" onclick="closeModal()">Cancelar</button><button class="btn btn-b" onclick="requestPart('${id}',$('#tp').value);closeModal();refresh()">Pedir</button>`)}
function tkBlock(id){openModal('No puedo avanzar',`<p class="mut mb">El auto queda “detenido” en rojo en el tablero y el cliente recibe el motivo en lenguaje simple.</p><div class="f"><label>Motivo</label><select id="bk">${Object.keys(BLOCK_PUB).map(x=>`<option>${x}</option>`).join('')}</select></div>`,`<button class="btn btn-o" onclick="closeModal()">Cancelar</button><button class="btn btn-r" onclick="tkBlockSave('${id}')">Detener</button>`)}
function tkBlockSave(id){const o=ot(id),b=$('#bk').value;o.blocked=b;o.blockedAt=nowISO();logOT(o,'Vehículo detenido: '+b);o.log.push({t:nowISO(),who:'Taller',txt:'Pausa: '+blockPub(b)+'.',pub:1});notify('OT '+o.id+' detenida: '+b,'bad','alert','tablero');waMoment(o,'retraso',blockPub(b));save();closeModal();toast('Detenido · el jefe de taller y el cliente fueron avisados','alert');refresh()}

/* ---------- ENTREGA Y COBRO (un solo paso) ---------- */
let ENT={chk:{},pay:{},doc:{}};
const CHK=['Lavado y aspirado realizado','Repuestos reemplazados devueltos al cliente','Se explicó el trabajo y recomendaciones','Objetos personales verificados','Documento firmado por el cliente'];
const chkN=id=>CHK.filter((_,i)=>(ENT.chk[id]||{})[i]).length;
function chk(id,i,v){ENT.chk[id]=ENT.chk[id]||{};ENT.chk[id][i]=v;refresh()}
function chkAll(id){ENT.chk[id]={};CHK.forEach((_,i)=>ENT.chk[id][i]=true);refresh()}
VIEWS.entrega={t:'Entrega y cobro',ic:'truck',render(){
  const list=S.ots.filter(o=>o.stage==='listo'),cc=S.ots.filter(o=>o.stage==='cc'),done=S.ots.filter(o=>o.stage==='ent').sort((a,b)=>(b.entAt||'').localeCompare(a.entAt||'')).slice(0,6);
  const todayL=S.ots.filter(o=>o.entAt&&o.entAt.slice(0,10)===D(0)),today=todayL.reduce((a,o)=>a+otTotals(o).total,0);
  return `<div class="ph"><div><h2>Entrega y cobro</h2><p>Checklist, cobro y comprobante en un solo paso.</p></div></div>
  <div class="grid g3 mb"><div class="kpi g"><small>Listos para entregar</small><b>${list.length}</b><span>Esperan al cliente</span></div><div class="kpi y"><small>En control de calidad</small><b>${cc.length}</b><span>Próximos a salir</span></div><div class="kpi"><small>Cobrado hoy</small><b>${money0(today)}</b><span>${todayL.length} entrega(s)</span></div></div>
  ${list.map(o=>{const t=otTotals(o),c=clientOf(o),dias=o.listoAt?daysSince(o.listoAt):0,guard=Math.max(0,dias-2)*10,k=ENT.chk[o.id]||{},n=chkN(o.id),ok=n===CHK.length,credit=c.credit;
   const pays=['Efectivo','Yape','Transferencia','Tarjeta',...(credit?['Crédito '+credit+' días']:[])],pm=ENT.pay[o.id]||pays[0],dc=ENT.doc[o.id]||o.doc;
   return `<div class="card mb"><div class="row"><div class="sp"><span class="plate">${o.plate}</span> <b>${esc(carName(o.plate))}</b><br><small>OT ${o.id} · ${esc(c.n)} · ${esc(o.svc)}</small></div>${dias>=2?pill(`${dias} días sin recoger · guardianía US$ ${guard}`,'bad'):pill(dias?'Listo hace '+dias+' día(s)':'Listo hoy','ok')}<button class="btn btn-o btn-s" onclick="openOT('${o.id}')">Ver OT</button></div>
   <div class="grid g2 mt"><div><div class="row" style="margin-bottom:6px"><div class="sec-t" style="margin:0">Checklist de salida</div><span class="sp"></span><b style="font-size:12.5px;color:${ok?'var(--ok)':'var(--mut)'}">${n} de ${CHK.length}</b>${ok?'':`<button class="btn btn-t btn-s" onclick="chkAll('${o.id}')">Marcar todo</button>`}</div>
    <div class="meter ${ok?'ok':''}" style="margin-bottom:8px"><i style="width:${n/CHK.length*100}%"></i></div>
    ${CHK.map((x,i)=>`<label class="ck"><input type="checkbox" ${k[i]?'checked':''} onchange="chk('${o.id}',${i},this.checked)">${x}</label>`).join('')}</div>
   <div><div class="sec-t" style="margin-top:0">Cobro</div><div class="fg"><div class="f"><label>Medio de pago</label><select onchange="ENT.pay['${o.id}']=this.value;refresh()">${pays.map(m=>`<option ${m===pm?'selected':''}>${m}</option>`).join('')}</select></div><div class="f"><label>Comprobante</label><select onchange="ENT.doc['${o.id}']=this.value"><option value="boleta" ${dc==='boleta'?'selected':''}>Boleta</option><option value="factura" ${dc==='factura'?'selected':''}>Factura</option></select></div></div>
   <div class="sumbar" style="margin-top:0"><span>${t.disc?`Incluye dto. de convenio ${o.disc}%`:'Total del servicio'}${pm.startsWith('Crédito')?' · a crédito':''}</span><b>${money(t.total)}</b></div>${guard?`<p class="mut" style="font-size:12.5px;margin-top:6px">+ Guardianía US$ ${guard} (${dias-2} día(s) después de las 48 h de aviso)</p>`:''}
   <button class="btn btn-y btn-lg mt" style="width:100%" ${ok?'':'disabled'} onclick="deliver('${o.id}',${guard})">${ic('check')} ${ok?(pm.startsWith('Crédito')?'Entregar y facturar a crédito':'Cobrar y entregar'):`Completa el checklist (${n} de ${CHK.length})`}</button></div></div></div>`}).join('')||'<div class="card empty">No hay vehículos listos para entrega.</div>'}
  <div class="card"><h3>Últimas entregas</h3><table class="tbl"><tbody>${done.map(o=>`<tr class="click" onclick="showDoc('ent','${o.id}')"><td>${plateTag(o.plate)}</td><td>${esc(clientOf(o).n)}</td><td>${esc(o.svc)}</td><td>${pill(o.pay||'—','gray')}</td><td class="r"><b>${money(otTotals(o).total)}</b></td><td class="r">${ic('file',16)}</td></tr>`).join('')}</tbody></table></div>`}};
function deliver(id,guard){const o=ot(id),t=otTotals(o),c=clientOf(o),credit=c.credit;
  o.pay=ENT.pay[id]||'Efectivo';o.doc=ENT.doc[id]||o.doc;o.stage='ent';o.entAt=nowISO();o.paid=!o.pay.startsWith('Crédito');o.guard=guard||0;
  const bay=o.bay;o.bay=null;
  const v=veh(o.plate);if(v){v.lastDate=D(0);v.lastKm=o.km||v.km}
  let rcv=null;if(!o.paid){const days=parseInt(o.pay.match(/\d+/)[0]);rcv={id:'r'+(++S.counters.rcv),doc:'F001-'+String(250+S.counters.rcv).padStart(6,'0'),client:c.n,amt:t.total,date:D(0),due:D(days),paid:false,type:'flota'};S.recv.push(rcv)}
  o.items.forEach(i=>{if(i.rs==='reservado'&&i.sku)deliverItem(o,i)});
  logOT(o,`Entregado y cobrado (${o.pay}) ${money(t.total)}${guard?` + guardianía US$ ${guard}`:''}`);o.log.push({t:nowISO(),who:'Taller',txt:'Entregamos tu auto. Tu comprobante ya está disponible.',pub:1});waMoment(o,'entrega');
  delete ENT.chk[id];recalcRes();save();refresh();
  const L=[['file',`${o.doc==='factura'?'Factura':'Boleta'} generada por ${money(t.total)}${guard?` + guardianía US$ ${guard}`:''}`],['cash',o.paid?`Cobrado con ${o.pay}`:`A crédito: ${rcv.doc} vence el ${fmtD(rcv.due)} (en Cuentas por cobrar)`],['star','Encuesta de satisfacción enviada por WhatsApp'],['board',bay?`Bahía ${bay} liberada`:'Sin bahía asignada'],['eye','El comprobante ya está en el historial de Mi Auto']];
  openModal('Entrega completada',`<div class="row mb"><span class="plate">${o.plate}</span><b>${esc(carName(o.plate))}</b><small>· ${esc(c.n)}</small></div>${L.map(([i,tx])=>`<div class="alertbox ok" style="margin-bottom:6px"><div class="ic">${ic(i)}</div><div class="sp"><b style="font-weight:500">${tx}</b></div></div>`).join('')}`,`<button class="btn btn-o" onclick="closeModal();showDoc('ent','${id}')">${ic('print')} Ver comprobante</button><button class="btn btn-b" onclick="closeModal()">Listo</button>`);
}
