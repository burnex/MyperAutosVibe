/* =========================================================
   Mi día: pendientes del perfil, indicadores clave y actividad
   ========================================================= */
function myTasks(role){
  const o=openOTs(),T=[];
  const add=(n,lvl,t,d,act)=>{if(n)T.push({n,lvl,t,d,act})};
  const late=o.filter(isLate),noTech=o.filter(x=>!x.tech),blocked=o.filter(x=>x.blocked),cc=o.filter(x=>x.stage==='cc'),listo=o.filter(x=>x.stage==='listo');
  const toQuote=cotList('enviar'),waiting=o.filter(x=>x.quote==='enviada');
  const appt=S.appts.filter(a=>a.date===D(0)&&a.status==='pend'),remind=S.vehicles.filter(v=>reminderFor(v)&&!S.contacted[v.plate]);
  const det=S.surveys.filter(s=>s.nps<=6&&!s.done),ped=pendingDeliveries().filter(({i})=>i.rs!=='sin stock'),nostock=pendingDeliveries().filter(({i})=>i.rs==='sin stock');
  const low=lowParts(),poIn=S.pos.filter(p=>p.st!=='recibida'),overdue=S.recv.filter(r=>!r.paid&&agingOf(r)>0),toInvoice=S.claims.filter(c=>c.status==='ent');
  const waitAmt=waiting.reduce((a,x)=>a+otTotals(x).pend,0);
  if(role==='asesor'||role==='gerencia'){
    add(appt.length,'info',`${appt.length} cita(s) por llegar hoy`,'Cuando lleguen, regístralos en recepción','go("agenda")');
    add(toQuote.length,'warn',`${toQuote.length} auto(s) con hallazgos por cotizar`,'Ponles precio y envíalos al cliente','go("cotizaciones",{tab:"enviar"})');
    add(waiting.length,'warn',`${waiting.length} cotización(es) esperando al cliente`,`${money0(waitAmt)} por aprobar · da seguimiento`,'go("cotizaciones",{tab:"esperando"})');
    add(listo.length,'ok',`${listo.length} auto(s) listos para entregar`,'Avisa al cliente y prepara el cobro','go("entrega")');
    add(remind.length,'info',`${remind.length} cliente(s) que ya deben volver`,`≈ ${money0(remind.length*avgTicket())} de ingreso posible`,'go("recordatorios")');
    add(det.length,'bad',`${det.length} cliente(s) insatisfechos`,'Llámalos antes de que lo publiquen en Google','go("encuestas")');
  }
  if(role==='jefe'||role==='gerencia'){
    add(late.length,'bad',`${late.length} auto(s) atrasados`,'Pasaron la fecha prometida al cliente','go("tablero")');
    add(blocked.length,'bad',`${blocked.length} auto(s) detenidos`,blocked.map(x=>x.plate+': '+x.blocked).slice(0,2).join(' · '),'go("tablero")');
    add(noTech.length,'warn',`${noTech.length} auto(s) sin técnico asignado`,'Asígnalos desde el tablero','go("tablero")');
    add(cc.length,'info',`${cc.length} auto(s) en control de calidad`,'Revisa y aprueba la salida','go("tablero")');
  }
  if(role==='almacen'){
    add(ped.length,'warn',`${ped.length} repuesto(s) por entregar a técnicos`,'Entrega y el stock se descuenta solo','INV.tab="ped";go("inventario")');
    add(nostock.length,'bad',`${nostock.length} pedido(s) sin stock`,'Genera la orden de compra','INV.tab="ped";go("inventario")');
    add(low.length,'warn',`${low.length} repuesto(s) bajo el mínimo`,'El sistema ya sugiere cuánto comprar','INV.tab="alert";go("inventario")');
    add(poIn.length,'info',`${poIn.length} orden(es) de compra en camino`,'Recíbelas al llegar la mercadería','INV.tab="oc";go("inventario")');
  }
  if(role==='caja'||role==='gerencia'){
    if(role==='caja')add(listo.length,'ok',`${listo.length} auto(s) por cobrar y entregar`,'Checklist, cobro y comprobante','go("entrega")');
    add(overdue.length,'bad',`${overdue.length} factura(s) vencidas`,`${money0(overdue.reduce((a,r)=>a+r.amt,0))} por cobrar a flotas y aseguradoras`,'go("cobranza")');
    add(toInvoice.length,'info',`${toInvoice.length} siniestro(s) entregados por facturar`,'Factura a la aseguradora','go("siniestros")');
  }
  if(role==='gerencia')add(low.length,'warn',`${low.length} repuesto(s) bajo el mínimo`,'Almacén ya tiene la compra sugerida','go("inventario")');
  const W={bad:0,warn:1,info:2,ok:3};T.sort((a,b)=>W[a.lvl]-W[b.lvl]);
  return role==='gerencia'?T.slice(0,6):T;
}
VIEWS.inicio={t:'Mi día',ic:'home',render(){
  const u=curUser(),h=new Date().getHours(),hi=h<12?'Buenos días':h<19?'Buenas tardes':'Buenas noches',T=myTasks(S.role);
  const o=openOTs(),today=S.ots.filter(x=>x.entAt&&x.entAt.slice(0,10)===D(0)),appt=S.appts.filter(a=>a.date===D(0)&&a.status!=='noshow');
  const k=[['En taller',o.length,`${o.filter(isLate).length} atrasados`,''],['Citas hoy',appt.length,`${appt.filter(a=>a.status==='llego').length} ya llegaron`,'y'],['Por aprobar',money0(o.filter(x=>x.quote==='enviada').reduce((a,x)=>a+otTotals(x).pend,0)),'en cotizaciones enviadas','w'],['Entregados hoy',today.length,money0(today.reduce((a,x)=>a+otTotals(x).total,0))+' cobrado','g']];
  return `<div class="hello"><div><h2>${hi}, ${esc(u.n.split(' ')[0])}</h2><p>${DN[new Date().getDay()]} ${fmtD(D(0))} · ${ROLES[S.role].n}</p></div>${can('recepcion')?`<button class="btn btn-y" onclick="go('recepcion')">${ic('car')} Recibir vehículo</button>`:''}</div>
  <div class="grid g4 mb">${k.map(x=>`<div class="kpi ${x[3]}"><small>${x[0]}</small><b>${x[1]}</b><span>${x[2]}</span></div>`).join('')}</div>
  <div class="grid g21" style="align-items:start"><div class="card" id="tasks"><h3><span class="l">Tus pendientes</span><small>${T.length?T.length+' por resolver':''}</small></h3>
   ${T.map(t=>`<div class="task"><span class="n ${t.lvl}">${t.n}</span><div class="sp"><b>${t.t}</b><small>${esc(t.d)}</small></div><button class="btn btn-o btn-s" onclick='${t.act}'>Resolver ${ic('chev',14)}</button></div>`).join('')||`<div class="empty">${ic('check',28)}<p class="mt">Todo al día. ¡Buen trabajo!</p></div>`}</div>
  <div class="card"><h3>Actividad reciente</h3><div class="feed">${S.audit.slice(0,8).map(a=>`<div><span class="av">${initials(a.who)}</span><div><b style="font-weight:500">${esc(a.txt)}</b><small>${esc(a.who)} · ${fmtDT(a.t)}</small></div></div>`).join('')}</div></div></div>`}};
