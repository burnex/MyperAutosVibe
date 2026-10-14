# Roadmap · Intranet MyperAutos

> Perfil del cliente: taller **intermedio** — Gallo Autos, La Molina (Lima). +25 años, +12 técnicos, mecánica + planchado/pintura + detailing, atiende particulares, flotas y aseguradoras (Rímac, Pacífico, Mapfre, La Positiva, Qualitas, Interbank). Horario L–V 8:30–18:00, Sáb 8:30–15:00. Fuente: galloautos.com + reunión.
>
> **Dolor principal (dicho por el cliente):** todo es manual — ingreso del vehículo, stock y salida. Nada automatizado.

## 1. Objetivo y tesis de venta

Una herramienta **básica pero que genere ingresos y ordene el proceso**. Tres promesas medibles:

| Promesa | Cómo se logra | Indicador |
|---|---|---|
| **Más ingresos** | Adicionales aprobados con fotos, recordatorios de mantenimiento, recompra, cotizaciones que no se pierden | Ticket promedio, % adicionales aprobados, clientes recurrentes |
| **Orden** | Un solo flujo digital: cita → recepción → OT → entrega, con responsable y estado en cada paso | Tiempo de ciclo por vehículo, vehículos sin responsable = 0 |
| **Control** | Stock con kardex y mínimos, trazabilidad de quién hizo qué | Quiebres de stock, diferencias de inventario, repuestos sin OT |

Ya existe la **cara al cliente** (web + Mi Portal). Falta el **backoffice (intranet)** que alimenta ese portal: lo que el técnico y el asesor registran es lo que el cliente ve.

## 2. Usuarios y roles de la intranet

| Rol | Qué necesita hacer |
|---|---|
| **Asesor de servicio / Recepción** | Agendar, recibir el auto, cotizar, avisar al cliente, entregar y cobrar |
| **Jefe de taller** | Asignar técnico y bahía, ver carga del día, destrabar vehículos detenidos |
| **Mecánico / Técnico** | Ver sus OT, marcar etapas, subir fotos, pedir repuestos, anotar hallazgos |
| **Planchado y pintura** | Etapas propias (desarmado, plancha, preparación, pintura, armado, pulido) |
| **Almacén / Repuestos** | Atender pedidos de OT, ingresar compras, controlar stock |
| **Caja / Administración** | Comprobantes, cobros, cuentas por cobrar (seguros y flotas) |
| **Gerencia / Dueño** | Tablero de ingresos, productividad, vehículos en taller, alertas |
| **Cliente** (portal) | Ya construido: seguimiento, presupuesto con fotos, historial, citas |

## 3. Proceso objetivo (de punta a punta)

```
Cita ─► Recepción ─► Inspección ─► Cotización ─► Aprobación ─► OT / Asignación
 (web)   (hoja+fotos   (semáforo)   (S/ + fotos)  (cliente por    (técnico, bahía,
          +firma)                                  portal/WhatsApp)  fecha prometida)
                                                                        │
Postventa ◄─ Entrega + Cobro ◄─ Control de calidad ◄─ Ejecución ◄──────┘
(recordatorios,  (acta, factura)   (checklist final)   (etapas, fotos,
 encuesta)                                              repuestos de almacén)
```

Cada flecha es hoy un papel/WhatsApp. En la intranet cada flecha es un **cambio de estado con responsable, hora y evidencia**, y dispara un aviso automático al cliente.

## 4. Módulos

### A. Núcleo operativo (imprescindible)
1. **Agenda y capacidad** — citas web + presenciales, bloques por hora, capacidad por bahía/técnico, recordatorio WhatsApp 1 día antes, control de no-show.
2. **Recepción de vehículo** — búsqueda por placa (cliente y auto se crean una sola vez), km, combustible, daños previos con fotos, objetos en el auto, solicitud del cliente, firma digital. Genera la hoja de recepción.
3. **Inspección semáforo** — checklist de ~20 puntos, fotos por hallazgo, plantilla por tipo de servicio.
4. **Cotización / presupuesto** — servicios + repuestos con precios de catálogo, mano de obra, adicionales aparte, versiones (v1, actualizada), envío al portal para aprobación ítem por ítem.
5. **Orden de trabajo (OT)** — número correlativo, técnico y bahía asignados, fecha prometida, etapas, tablero Kanban del taller (Recibido → En diagnóstico → Esperando aprobación → En reparación → Control de calidad → Listo → Entregado).
6. **Entrega y cobro** — checklist de salida, aviso "listo para recoger", cobro (efectivo/Yape/transferencia/tarjeta), comprobante, guardianía si no recoge en 48 h.

### B. Stock y compras (segunda prioridad, dolor declarado)
7. **Catálogo de repuestos e insumos** — código, categoría, marca, precio costo/venta, ubicación en almacén.
8. **Kardex** — todo movimiento tiene origen: compra, consumo por OT, devolución, ajuste. Prohibido sacar sin OT.
9. **Mínimos y alertas** — "quedan 2 filtros de aceite del Cerato" antes de que falte.
10. **Compras y proveedores** — orden de compra, recepción contra factura, historial de precios.
11. **Reserva automática** — al aprobar una cotización, los repuestos quedan reservados para esa OT.

### C. Ingresos y fidelización (el módulo que "se paga solo")
12. **CRM ligero** — ficha de cliente y vehículos, historial, segmentos (particular / flota / seguro).
13. **Recordatorios automáticos** — próximo mantenimiento por km/fecha, SOAT/revisión técnica si se desea, reactivación a clientes inactivos 6+ meses.
14. **Promociones y paquetes** — promo del mes, combos (aceite + scanner, mantenimiento + lavado), cupones.
15. **Seguimiento de cotizaciones no aprobadas** — lista de oportunidades perdidas con recordatorio al asesor.
16. **Encuesta y reseña Google** — post-entrega, filtra quejas antes de que lleguen a Google.

### D. Seguros y flotas (diferenciador B2B)
17. **Expedientes de siniestro** — aseguradora, N.° de siniestro, procurador, autorización de presupuesto, fotos, estado de aprobación, fechas de ingreso/entrega.
18. **Cuentas por cobrar** — facturación a aseguradoras/flotas, antigüedad de deuda.
19. **Cuentas corporativas** — varios vehículos por empresa, tarifas pactadas, reporte mensual.

### E. Gerencia y administración
20. **Tablero del dueño** — vehículos hoy en taller, ingresos del día/mes, ticket promedio, ocupación de bahías, vehículos retrasados, stock crítico.
21. **Productividad** — horas/OT por técnico, retrabajos, cumplimiento de fecha prometida.
22. **Usuarios, roles y auditoría** — quién cambió qué y cuándo.
23. **Reportes exportables** — Excel/PDF.

### F. Transversal
24. **Notificaciones** — WhatsApp (estado, aprobación, listo), email, avisos internos.
25. **Documentos imprimibles** — recepción, presupuesto, OT, acta de entrega, factura (ya existen en el portal).
26. **Móvil-first para el taller** — el técnico usa celular/tablet con fotos y botones grandes.

## 5. Fases

| Fase | Foco | Entregable | Valor al cliente |
|---|---|---|---|
| **0 · Demo (ahora)** | Convencer | Intranet clickeable conectada a Mi Portal, datos ficticios | "Esto es mi taller, pero ordenado" |
| **1 · Núcleo (MVP real)** | Agenda → Recepción → OT → Entrega | Módulos A1–A6 + notificaciones + usuarios | Se acaba el papel y el WhatsApp suelto |
| **2 · Stock** | Kardex, mínimos, compras, reserva | Módulos B7–B11 | Control de repuestos, menos fugas y quiebres |
| **3 · Ingresos** | CRM, recordatorios, promos, cotizaciones perdidas | Módulos C12–C16 | Ingresos recurrentes medibles |
| **4 · Seguros y flotas** | Siniestros, cuentas por cobrar | Módulos D17–D19 | Ordena el negocio más grande y con más plata detenida |
| **5 · Gerencia y escala** | Tableros, productividad, multi-sucursal | Módulos E20–E23 | Decisiones con datos |

Cada fase es vendible por separado (precio por fase o suscripción mensual escalonada).

## 6. Alcance propuesto de la DEMO de intranet

Demo clickeable en el mismo estilo del portal, con el auto **ADI-388** como hilo conductor para que el cliente vea el mismo caso desde los dos lados. Orden sugerido de pantallas:

1. **Login interno + selector de rol** (asesor, jefe de taller, técnico, almacén, gerencia).
2. **Tablero del taller (Kanban de OT)** — pantalla estrella: todos los autos en taller, por estado, con responsable y fecha prometida; alertas de retraso.
3. **Agenda del día** — citas, capacidad por bahía.
4. **Recepción de vehículo** — formulario con placa, fotos, firma → genera OT.
5. **Vista del técnico (celular)** — mis OT, cambiar etapa, subir foto, pedir repuesto.
6. **Cotización** — armar presupuesto y "enviarlo al cliente" → se refleja en Mi Portal (aprobar ahí y ver el cambio en la intranet).
7. **Almacén** — stock, mínimos en rojo, kardex, descuento al consumir en OT.
8. **Entrega y cobro** — checklist de salida y comprobante.
9. **Tablero del dueño** — ingresos, ticket promedio, cotizaciones pendientes, stock crítico.
10. **Recordatorios / oportunidades** — lista de clientes a contactar con botón de WhatsApp.

Lo que **sí** debe sentirse real en la demo: el cambio de estado en la intranet se ve en el portal del cliente (y viceversa). Lo que se **simula**: WhatsApp, facturación electrónica SUNAT, pagos, persistencia (puede usar `localStorage` para que sobreviva al recargar).

## 7. Preguntas para validar con Gallo Autos

- ¿Cuántos autos entran al día/semana? ¿Cuántos son de seguros vs. particulares vs. flota?
- ¿Cuántas bahías y cuántos técnicos por área (mecánica vs. planchado/pintura)?
- ¿Cómo llevan hoy el stock (cuaderno, Excel)? ¿Compran repuestos por pedido o mantienen inventario? ¿Valor aproximado de stock?
- ¿Qué sistema de facturación usan? (¿SUNAT vía OSE/PSE?) ¿Necesitan integrarlo?
- ¿Cómo trabajan los siniestros: quién gestiona con la aseguradora y en qué se atrasan más?
- ¿Cuál es el cuello de botella hoy: aprobación del cliente, falta de repuestos, falta de espacio?
- ¿Quién usará el sistema y con qué dispositivos (PC en recepción, celular de técnicos)?
- ¿Presupuesto aproximado y fecha en que quieren decidir?

## 8. Decisiones técnicas pendientes (post-demo)

- Demo: HTML/JS en un archivo, datos mock (como hoy). Si la demo crece, pasar a archivos separados sin build.
- Producto real: backend + base de datos relacional, autenticación por roles, almacenamiento de fotos, API de WhatsApp Business, facturación electrónica. Stack a definir cuando se cierre alcance.
- Multi-sucursal y multi-taller (MyperAutos como producto reutilizable para otros talleres) como visión a futuro, **no** en el alcance inicial.

## 9. Siguiente paso

Confirmar qué pantallas de la sección 6 entran en la primera versión de la demo (recomiendo 2, 4, 5, 6, 7 y 9 como mínimo) y empezar por el **tablero Kanban de OT**, ya conectado al caso ADI-388 del portal.
