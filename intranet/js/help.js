/* =========================================================
   Textos de ayuda por pantalla y tour guiado de la demo
   ========================================================= */
const HELP={
  inicio:{t:'Tu día en un vistazo',d:'Cada perfil ve aquí solo lo que tiene que resolver hoy. Toca una tarea para ir directo a ella.',tips:['Las tareas se calculan solas con lo que pasa en el taller','Cambia de perfil arriba para ver otro punto de vista']},
  tablero:{t:'Todos los autos del taller, por etapa',d:'Cada tarjeta es un vehículo. Arrástrala a la siguiente columna (o usa “Mover”) cuando avance: el cliente lo ve al instante en Mi Auto. Si saltas etapas, el sistema te pide confirmar.',tips:['Rojo = atrasado','Morado = seguro, amarillo = flota','Toca una tarjeta para ver su orden de trabajo']},
  agenda:{t:'Citas y capacidad del día',d:'Las citas llegan de la web, de Mi Auto o por teléfono. Cuando el cliente llega, “Llegó” abre la recepción con sus datos.',tips:['“Recordatorios WhatsApp” confirma las citas de mañana','Las faltas (no-show) quedan registradas']},
  recepcion:{t:'Recibir un vehículo en 3 pasos',d:'Vehículo y cliente → Qué necesita → Firma y asignación. Reemplaza la hoja de papel; al terminar se crea la OT y el cliente recibe su enlace a Mi Auto.',tips:['Escribe ADI-388: si el auto ya vino, todo se completa solo','Kilometraje y firma son obligatorios','El sistema sugiere el técnico con menos carga']},
  cotizaciones:{t:'Todo el camino del presupuesto',d:'Por enviar → Esperando al cliente → Aprobadas o Rechazadas. Los hallazgos del técnico llegan con precio sugerido del catálogo; tú solo revisas y envías a Mi Auto.',tips:['“Insistir” y “Ofrecer 5%” recuperan lo que no se aprobó','Al aprobar, los repuestos se reservan solos']},
  tecnico:{t:'Lo que ve el técnico en su celular',d:'El mecánico solo ve sus autos asignados y actualiza el avance con botones grandes. Si encuentra algo, lo elige de una lista y llega al asesor con precio sugerido del catálogo.',tips:['Elige el técnico arriba a la derecha','Mira el panel “En vivo” para ver qué pasa en el sistema']},
  entrega:{t:'Entregar y cobrar en un solo paso',d:'Checklist de salida, medio de pago y comprobante. Al cobrar: comprobante, encuesta por WhatsApp, bahía liberada y el historial de Mi Auto actualizado, todo a la vez.',tips:['Si el auto lleva más de 48 h listo, se calcula la guardianía','Las flotas pueden pagar a crédito: pasa a Cuentas por cobrar']},
  inventario:{t:'Repuestos bajo control',d:'Siempre tres números: en mano, reservado para OT y disponible. Cada repuesto que sale queda ligado a una OT y, cuando lo disponible baja del mínimo, el sistema arma la orden de compra.',tips:['“Pedidos de OT”: lo que piden los técnicos','“Recibir mercadería” suma stock y destraba autos detenidos']},
  clientes:{t:'Ficha única de cada cliente',d:'Datos, vehículos, historial de visitas y cuánto ha gastado. Ya no depende de la memoria del asesor.',tips:['Busca por nombre, teléfono o correo']},
  recordatorios:{t:'Clientes que deben volver',d:'El sistema detecta los autos que ya toca mantenimiento (por kilometraje o por tiempo) y prepara el WhatsApp. Es ingreso que hoy se pierde.',tips:['“Enviar a todos” contacta a los pendientes de una vez']},
  encuestas:{t:'Qué tan contentos se van los clientes',d:'Tras la entrega se pregunta del 0 al 10 por WhatsApp. Las quejas se atienden antes de que lleguen a Google y a los contentos se les pide una reseña.'},
  siniestros:{t:'Expedientes con aseguradoras',d:'Cada siniestro con su número, procurador, montos autorizados y documentos. Arrastra la tarjeta cuando cambie el estado.',tips:['Al autorizar, la orden de trabajo pasa a reparación']},
  cobranza:{t:'Lo que te deben flotas y aseguradoras',d:'Facturas a crédito ordenadas por antigüedad. Recuerda el pago por WhatsApp o regístralo cuando llegue.'},
  dashboard:{t:'Cómo va el negocio',d:'Ingresos, ticket promedio, autos en proceso, alertas y dónde está la plata por ganar. Sin pedir reportes a nadie.'},
  usuarios:{t:'Quién entra y qué hace',d:'Usuarios por perfil, qué ve cada perfil y el registro de cada acción (auditoría).',tips:['“Reiniciar demo” vuelve a los datos iniciales']}
};

/* ---------- tour guiado ---------- */
const TOUR=[
 {v:'inicio',sel:'#tasks',t:'Empieza el día',d:'Cada persona entra y ve sus pendientes. Nada de pizarras ni cuadernos: el sistema sabe qué falta.'},
 {v:'agenda',sel:'.days',t:'1 · El cliente agenda',d:'Las citas llegan desde la web o Mi Auto. Un día antes sale el recordatorio por WhatsApp.'},
 {v:'recepcion',sel:'.wiz',t:'2 · Recepción sin papel',d:'Placa, fotos, combustible y firma en pantalla. Se crea la orden de trabajo y el cliente recibe un WhatsApp.'},
 {v:'tablero',sel:'.kb',t:'3 · Todo el taller en una pantalla',d:'El jefe de taller ve cada auto, su técnico y si está atrasado. Arrastrar una tarjeta cambia la etapa.'},
 {v:'tecnico',sel:'.phone',t:'4 · El técnico avanza desde su celular',d:'Marca etapas, sube fotos y reporta hallazgos. Prueba: entra a un auto y toca “Terminé”.'},
 {v:'cotizaciones',sel:'#cotTbl',t:'5 · El cliente aprueba con fotos',d:'Los hallazgos se cotizan y el cliente los aprueba desde Mi Auto. Abre Mi Auto en otra pestaña con la placa ADI-388 y aprueba: aquí se actualiza solo.',btn:['Abrir Mi Auto','window.open("../miauto/index.html","_blank")']},
 {v:'inventario',sel:'.tabs',t:'6 · Repuestos con control',d:'Al aprobar se reservan; al entregarlos al técnico se descuentan. Lo que falta genera la orden de compra.'},
 {v:'entrega',sel:'#main .card',t:'7 · Entrega y cobro',d:'Checklist de salida, cobro y comprobante. Luego llega la encuesta por WhatsApp.'},
 {v:'recordatorios',sel:'.tbl',t:'8 · Que el cliente vuelva',d:'Los autos que ya deben mantenimiento aparecen solos con su mensaje listo. Este módulo genera ingresos nuevos.'},
 {v:'dashboard',sel:'.grid',t:'9 · El dueño ve todo',d:'Ingresos, ticket promedio, retrasos y dinero por recuperar. Fin del tour: ahora explora libremente.'}
];
let TI=-1;
function startTour(){if(S.role!=='gerencia'){S.role='gerencia';save();$('#login').style.display='none';$('#roleSel').value='gerencia'}TI=0;tourShow()}
function tourShow(){
  $$('.tour-hl').forEach(e=>e.classList.remove('tour-hl'));
  const s=TOUR[TI];if(!s){endTour();return}
  go(s.v);setTimeout(()=>{const el=$(s.sel);if(el){el.classList.add('tour-hl');el.scrollIntoView({behavior:'smooth',block:'center'})}},60);
  const t=$('#tour');t.innerHTML=`<div class="tp">Tour guiado · ${TI+1} de ${TOUR.length}</div><h4>${s.t}</h4><p>${s.d}</p><div class="bar"><i style="width:${(TI+1)/TOUR.length*100}%"></i></div>
   <div class="row">${s.btn?`<button class="btn btn-o btn-s" onclick='${s.btn[1]}'>${s.btn[0]} ↗</button>`:''}<span class="sp"></span><button class="btn btn-t btn-s" onclick="endTour()">Salir</button>${TI?`<button class="btn btn-o btn-s" onclick="TI--;tourShow()">Atrás</button>`:''}<button class="btn btn-b btn-s" onclick="TI++;tourShow()">${TI===TOUR.length-1?'Terminar':'Siguiente'}</button></div>`;
  t.classList.add('on');
}
function endTour(){TI=-1;$('#tour').classList.remove('on');$$('.tour-hl').forEach(e=>e.classList.remove('tour-hl'))}
