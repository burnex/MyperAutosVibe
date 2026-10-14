/* =========================================================
   Gerencia y administración: tablero del dueño y usuarios/auditoría
   ========================================================= */
const monthOTs=()=>S.ots.filter(o=>o.stage==='ent'&&o.entAt&&daysSince(o.entAt)<=30);

VIEWS.dashboard={t:'Tablero del dueño',ic:'chart',render(){
  const mo=monthOTs(),rev=mo.reduce((a,o)=>a+otTotals(o).total,0),tk=mo.length?rev/mo.length:0,today=S.ots.filter(o=>o.entAt&&o.entAt.slice(0,10)===D(0)).reduce((a,o)=>a+otTotals(o).total,0);
  const wip=openOTs(),late=wip.filter(isLate),inShop=wip.reduce((a,o)=>a+otTotals(o).total,0),occ=new Set(wip.filter(o=>o.bay).map(o=>o.bay)).size;
  const series=[...Array(6)].map((_,i)=>{const d=new Date();d.setDate(1);d.setMonth(d.getMonth()-5+i);const key=`${d.getFullYear()}-${pad(d.getMonth()+1)}`;
    return {l:MN[d.getMonth()][0].toUpperCase()+MN[d.getMonth()].slice(1),v:S.ots.filter(o=>o.stage==='ent'&&o.entAt&&o.entAt.startsWith(key)).reduce((a,o)=>a+otTotals(o).total,0)}});
  const byArea={mec:0,plan:0,det:0};S.ots.filter(o=>o.stage==='ent'||o.stage==='rep').forEach(o=>byArea[o.area]+=otTotals(o).total);
  const byType={particular:0,flota:0,seguro:0};S.ots.forEach(o=>{if(o.stage==='ent'||o.stage==='rep')byType[clientOf(o).type]+=otTotals(o).total});
  const pend=S.ots.filter(o=>o.quote==='enviada').reduce((a,o)=>a+otTotals(o).pend,0),low=lowParts();
  const donut=[{l:'Mecánica',v:byArea.mec,c:'#2908F1'},{l:'Planchado y pintura',v:byArea.plan,c:'#FFC800'},{l:'Detailing',v:byArea.det,c:'#6EC1E4'}].map(x=>({...x,f:money0(x.v)}));
  const donut2=[{l:'Particulares',v:byType.particular,c:'#312682'},{l:'Flotas',v:byType.flota,c:'#FFC800'},{l:'Seguros',v:byType.seguro,c:'#6EC1E4'}].map(x=>({...x,f:money0(x.v)}));
  return `<div class="ph"><div><h2>Tablero <em>del dueño</em></h2><p>${DN[new Date().getDay()]} ${fmtD(D(0))} · cómo va el taller hoy, sin preguntar a nadie.</p></div></div>
  <div class="grid g4 mb"><div class="kpi"><small>Ingresos últimos 30 días</small><b>${money0(rev)}</b><span><span class="up">▲ 8%</span> vs. mes anterior</span></div><div class="kpi y"><small>Por aprobar</small><b>${money0(pend)}</b><span>Dinero esperando al cliente</span></div><div class="kpi g"><small>Ticket promedio</small><b>${money0(tk)}</b><span>${mo.length} servicios entregados</span></div><div class="kpi w"><small>En proceso (dinero en taller)</small><b>${money0(inShop)}</b><span>${wip.length} vehículos</span></div></div>
  <div class="grid g21 mb"><div class="card"><h3>Ingresos por mes</h3>${barsSVG(series,{hi:5,h:220,fmt:v=>Math.round(v/1000)+'k'})}<small>El mes actual va en curso.</small></div>
  <div class="card"><h3>Vehículos por etapa</h3>${STAGES.slice(0,6).map(s=>{const n=wip.filter(o=>o.stage===s.k).length;return `<div class="bar-row" style="grid-template-columns:120px 1fr 24px"><span>${s.n}</span><div class="meter"><i style="width:${n/Math.max(1,wip.length)*100}%;background:${s.c}"></i></div><b>${n}</b></div>`}).join('')}</div></div>
  <div class="grid g3 mb"><div class="card"><h3>Ingresos por área</h3><div class="row" style="flex-wrap:nowrap">${donutSVG(donut,{size:140})}${legend(donut)}</div></div>
  <div class="card"><h3>Ingresos por tipo de cliente</h3><div class="row" style="flex-wrap:nowrap">${donutSVG(donut2,{size:140})}${legend(donut2)}</div></div>
  <div class="card"><h3>Atención hoy</h3>${alerts().slice(0,5).map(a=>`<div class="alertbox ${a.lvl==='bad'?'bad':a.lvl==='info'?'info':''}" style="margin-bottom:6px;cursor:pointer" onclick="go('${a.view}')"><div class="ic">${ic(a.ic)}</div><div class="sp"><small style="color:var(--ink)">${a.txt}</small></div></div>`).join('')||'<div class="empty">Sin alertas</div>'}</div></div>
  <div class="card"><h3>Qué mover para ganar más</h3><div class="grid g3">
   <div class="alertbox info" style="margin:0;cursor:pointer" onclick="go('recordatorios')"><div class="ic">${ic('bell')}</div><div class="sp"><b>${inactive().length+S.vehicles.filter(v=>reminderFor(v)&&reminderFor(v).why!=='time').length} autos por volver</b><small>≈ ${money0((S.vehicles.filter(v=>reminderFor(v)).length)*avgTicket())} de ingreso potencial</small></div></div>
   <div class="alertbox" style="margin:0;cursor:pointer" onclick="go('cotizaciones',{tab:'rechazadas'})"><div class="ic">${ic('target')}</div><div class="sp"><b>${money0(opps().reduce((a,x)=>a+x.amt,0))} en cotizaciones por recuperar</b><small>${opps().length} presupuestos sin cerrar</small></div></div>
   <div class="alertbox ok" style="margin:0;cursor:pointer" onclick="go('cobranza')"><div class="ic">${ic('cash')}</div><div class="sp"><b>${money0(S.recv.filter(r=>!r.paid&&agingOf(r)>0).reduce((a,r)=>a+r.amt,0))} vencido por cobrar</b><small>Flotas y aseguradoras</small></div></div></div></div>`}};

/* ---------- USUARIOS Y AUDITORÍA ---------- */
let US={tab:'users'};
const MODS=[['tablero','Tablero'],['recepcion','Recepción'],['cotizaciones','Cotizaciones'],['inventario','Inventario'],['clientes','Clientes'],['siniestros','Siniestros'],['cobranza','Cobranza'],['dashboard','Dashboard']];
VIEWS.usuarios={t:'Usuarios y auditoría',ic:'key',render(){
  const tabs=[['users','Usuarios'],['perm','Permisos por rol'],['aud','Auditoría']];let b='';
  if(US.tab==='users')b=`<div class="card"><h3>Equipo <button class="btn btn-y btn-s" onclick="newUser()">${ic('plus')} Nuevo usuario</button></h3><table class="tbl"><thead><tr><th>Usuario</th><th>Rol</th><th>Último acceso</th><th>Estado</th><th></th></tr></thead><tbody>${S.users.map(u=>`<tr><td><div class="row"><span class="av" style="width:32px;height:32px">${initials(u.n)}</span><div><b>${esc(u.n)}</b><br><small>${esc(u.mail)}</small></div></div></td><td>${pill(ROLES[u.role].n,'info')}</td><td>${fmtDT(u.last)}</td><td>${u.on?pill('Activo','ok'):pill('Desactivado','gray')}</td><td class="r"><button class="btn btn-o btn-s" onclick="toggleUser('${u.id}')">${u.on?'Desactivar':'Activar'}</button></td></tr>`).join('')}</tbody></table></div>`;
  if(US.tab==='perm')b=`<div class="card"><h3>Qué ve cada rol</h3><div class="tscroll"><table class="tbl"><thead><tr><th>Módulo</th>${Object.values(ROLES).map(r=>`<th class="c">${r.n}</th>`).join('')}</tr></thead><tbody>${MODS.map(([k,n])=>`<tr><td><b>${n}</b></td>${Object.values(ROLES).map(r=>`<td class="c">${r.views==='*'||r.views.includes(k)?`<span style="color:var(--ok)">${ic('check')}</span>`:'<span class="mut">—</span>'}</td>`).join('')}</tr>`).join('')}</tbody></table></div><p class="mut mt">El técnico solo ve sus OT; almacén solo inventario; caja solo cobros y cuentas por cobrar.</p></div>`;
  if(US.tab==='aud')b=`<div class="card"><h3>Registro de actividad <small>Últimas ${Math.min(S.audit.length,100)} acciones</small></h3><div class="log">${S.audit.slice(0,100).map(a=>`<div><b>${esc(a.txt)}</b><small>${esc(a.who)} · ${fmtDT(a.t)}</small></div>`).join('')}</div></div>`;
  return `<div class="ph"><div><h2>Usuarios <em>y auditoría</em></h2><p>Cada acción queda registrada. Si algo cambia, se sabe quién y cuándo.</p></div><div class="acts"><button class="btn btn-o" onclick="confirmBox('Se borrarán los cambios hechos en esta demo y volverá a los datos iniciales.',resetDemo,'Reiniciar demo')">${ic('refresh')} Reiniciar demo</button></div></div><div class="tabs">${tabs.map(([k,n])=>`<button class="${US.tab===k?'on':''}" onclick="US.tab='${k}';refresh()">${n}</button>`).join('')}</div>${b}`}};
function toggleUser(id){const u=user(id);u.on=!u.on;audit(`${u.on?'Activó':'Desactivó'} al usuario ${u.n}`);save();refresh()}
function newUser(){openModal('Nuevo usuario',`<div class="fg"><div class="f"><label>Nombre</label><input id="uN"></div><div class="f"><label>Correo</label><input id="uM"></div></div><div class="f"><label>Rol</label><select id="uR">${Object.entries(ROLES).map(([k,r])=>`<option value="${k}">${r.n}</option>`).join('')}</select></div>`,`<button class="btn btn-o" onclick="closeModal()">Cancelar</button><button class="btn btn-y" onclick="saveUser()">Crear</button>`)}
function saveUser(){const n=$('#uN').value.trim();if(!n)return;S.users.push({id:'u'+Date.now(),n,role:$('#uR').value,mail:$('#uM').value||'—',last:null,on:true});audit('Creó usuario '+n);closeModal();save();refresh()}

/* ---------- arranque ---------- */
window.addEventListener('DOMContentLoaded',()=>{onExternalChange=()=>{if(S.role){refresh();toast('Actualizado desde Mi Auto','refresh')}};boot()});
