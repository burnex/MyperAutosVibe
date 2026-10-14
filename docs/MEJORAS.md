# 20 mejoras al proceso actual, priorizadas

> **Alcance:** no se agregan funcionalidades nuevas. Son ajustes para que lo que ya existe sea más rápido, más claro y más confiable en el día a día del taller.
>
> **Cómo se priorizó.** Una mejora entra en las 10 imprescindibles si cumple al menos dos de estos criterios:
> 1. Ataca uno de los tres dolores que Gallo Autos dijo en la reunión: **ingreso del vehículo, stock y salida**.
> 2. Evita un error que **el cliente vería** en Mi Auto o en WhatsApp.
> 3. **Simplifica** la intranet, que se sentía cargada.
> 4. Se nota en la demo frente al dueño del taller.
>
> **Esfuerzo:** S = horas · M = 1–2 días · L = 3 o más días.

---

## Las 10 imprescindibles

> **Estado (14 oct 2026): implementadas las 10.** Decisiones tomadas con el usuario: marca **solo Gallo Autos**; WhatsApp en 4 momentos (recibido, aprobación, retraso, listo + entrega); saltar etapas **pide confirmación**; en recepción son obligatorios **firma y kilometraje**. Además, la recepción impide registrar un auto que ya está en el taller.

### 1. Recepción en 3 pasos · Dolor: ingreso · Esfuerzo M
- **Hoy:** la recepción es una sola página larga. Tiene 5 bloques: vehículo y cliente, servicios, estado de ingreso, firma y asignación. Con el cliente al lado, el asesor tiene que desplazarse y buscar qué le falta.
- **Mejora:** un asistente en 3 pasos con barra de avance:
  1. **Placa y cliente.** La placa va primero; si el auto ya existe, todo se completa solo y se muestra "Vehículo conocido · N visitas".
  2. **Qué necesita.** Servicios, lo que cuenta el cliente, combustible, objetos y fotos.
  3. **Firma y entrega.** Firma, técnico sugerido y fecha prometida.
- **Éxito:** recibir un auto conocido en menos de 60 segundos.
- **Recomendación:** es lo **primero que verá Gallo**, porque es su dolor número uno. Hazla antes de la siguiente demo.

### 2. Stock disponible vs. reservado, claro en todas partes · Dolor: stock · Esfuerzo S
- **Hoy:** el catálogo muestra "en mano · reservados · mínimo". Los pedidos de OT muestran "disp.". La OT muestra otra etiqueta. Son tres formas distintas de decir lo mismo, y "par", "juego" y "litro" se mezclan en los nombres.
- **Mejora:**
  - Tres números fijos en todas las pantallas: **En mano**, **Reservado** y **Disponible**, con la misma barra de color.
  - La unidad de medida va en su propia columna.
- **Éxito:** el almacenero nunca promete un repuesto que ya está comprometido con otro auto.
- **Recomendación:** barata y clave para la confianza en el módulo de stock. Hazla en la misma pasada que la mejora 3.

### 3. Entrega y cobro en un solo paso · Dolor: salida · Esfuerzo S
- **Hoy:** el checklist exige marcar 5 casillas sin mostrar el avance. Después de cobrar, el comprobante sale en un modal aparte y la encuesta se envía sin que el asesor lo vea.
- **Mejora:**
  - Progreso visible ("3 de 5") y la opción de marcar todo con un toque cuando ya se revisó.
  - Al cobrar, una sola pantalla de cierre: comprobante, "encuesta enviada", "bahía liberada" y "visible en Mi Auto".
- **Éxito:** entregar sin dejar al cliente esperando en caja.
- **Recomendación:** cierra el ciclo del auto. En la demo, es el final feliz del recorrido.

### 4. Hallazgos con precio sugerido · Proceso de cotización · Esfuerzo M
- **Hoy:** cuando el técnico reporta "Encontré algo más" o se cotizan los puntos rojos de la inspección, el ítem llega a la cotización en **S/ 0** y el asesor tiene que buscar el precio.
- **Mejora:**
  - El técnico elige la pieza o el servicio de una lista corta; si no está, lo escribe libre.
  - El ítem llega con el precio del catálogo (repuesto + mano de obra) y una marca "precio sugerido".
  - El asesor solo revisa y envía.
- **Éxito:** de "hallazgo reportado" a "cotización enviada" en minutos, no en horas.
- **Recomendación:** es la mejora que **más ingresos mueve**: cuanto antes llega la cotización, más probable es el "sí".

### 5. Una sola bandeja de cotizaciones · Simplicidad · Esfuerzo M
- **Hoy:** Cotizaciones y Oportunidades son dos entradas del menú para el mismo proceso, visto en dos momentos.
- **Mejora:** una sola pantalla, **Cotizaciones**, con pestañas:
  - Por enviar.
  - Esperando al cliente (con días sin respuesta y "Insistir").
  - Aprobadas.
  - Rechazadas (con "Ofrecer 5 %").
- **Éxito:** el menú baja de 16 a 15 opciones y el asesor ve todo el embudo en un lugar.
- **Recomendación:** responde directamente a "veo muy cargada la intranet".

### 6. Reglas claras al mover etapas · Evita errores ante el cliente · Esfuerzo S
- **Hoy:** en el tablero se puede arrastrar un auto de "Recibido" a "Listo para entrega" directamente. El cliente recibiría "¡Tu auto está listo!" por error.
- **Mejora:**
  - Solo se avanza a la etapa siguiente sin preguntar.
  - Si se salta etapas, aparece una confirmación que explica qué falta ("No pasó por control de calidad").
  - Hacia atrás, se pide el motivo.
- **Éxito:** cero mensajes equivocados al cliente.
- **Recomendación:** imprescindible antes de que alguien real lo use. Es barata.

### 7. Retrasos explicados en Mi Auto · Confianza del cliente · Esfuerzo S
- **Hoy:** si el auto queda detenido (falta un repuesto, espera a la aseguradora) o cambia la fecha prometida, el Portal lo sabe. Mi Auto solo muestra la nueva fecha, sin explicar por qué.
- **Mejora:** Mi Auto muestra un aviso en lenguaje simple ("Estamos esperando un repuesto que llega mañana. Nueva entrega: jueves 16"), y el WhatsApp dice lo mismo.
- **Éxito:** menos llamadas de reclamo por retrasos.
- **Recomendación:** un retraso explicado genera confianza; uno escondido genera reclamos.

### 8. WhatsApp solo en los momentos clave · Confianza del cliente · Esfuerzo S
- **Hoy:** cada cambio de etapa envía un WhatsApp: recibido, diagnóstico, reparación, control de calidad, listo. Son hasta 6 mensajes por visita.
- **Mejora:**
  - **Por WhatsApp**, solo 4 momentos: *Recibido*, *Necesitamos tu aprobación*, *Retraso* (mejora 7) y *Listo para recoger*.
  - Las demás etapas se ven en Mi Auto, sin mensaje.
  - Todas las plantillas con el mismo tono y la firma del taller.
- **Éxito:** el cliente no silencia el chat del taller.
- **Recomendación:** es una decisión de proceso más que de código. Valídala con Gallo en la reunión.

### 9. Una sola identidad visual (incluye web liviana y lenguaje unificado) · Demo · Esfuerzo M
- **Hoy:**
  - La web pública tiene otro estilo que el Portal y Mi Auto.
  - Arrastra el portal antiguo que ya no se usa, con imágenes incrustadas que la hacen pesada.
  - Hay textos que dicen "OT", otros "orden" y otros "trabajo".
- **Mejora:**
  - Mismo sistema visual en las tres partes (colores, tipografía, botones).
  - Marca definida: **solo "Gallo Autos"** en todas las pantallas (decisión del usuario).
  - Se retira el código muerto de la web.
  - Glosario único: OT, Mi Auto, Portal y nombres de etapas.
- **Éxito:** el cliente pasa de la web a Mi Auto y siente que es la misma empresa. La web carga rápido en el celular.
- **Recomendación:** junta en una sola pasada las mejoras 15, 18 y 19 de la lista original. Es lo que más eleva la percepción de "producto terminado".

### 10. Pensado para tablet y celular del taller · Uso real · Esfuerzo M
- **Hoy:** recepción, tablero y ficha de OT están diseñados para computadora. En una tablet, los botones y campos son pequeños, y arrastrar tarjetas con el dedo es incómodo.
- **Mejora:**
  - Botones y campos de al menos 48 px.
  - Tablero deslizable con un menú "Mover a…" además de arrastrar.
  - Recepción a pantalla completa en tablet vertical.
- **Éxito:** el asesor recibe autos con la tablet en la mano, en la puerta del taller.
- **Recomendación:** en un taller real nadie lleva una laptop a la bahía. Sin esto, el sistema se queda en la oficina.

---

## Las 10 deseables (después de las imprescindibles)

| # | Mejora | Qué cambia | Esfuerzo | Recomendación |
|---|---|---|---|---|
| 11 | **Tiempo en etapa visible** | Cada tarjeta muestra "3 h en diagnóstico" y se colorea al pasar un umbral. | S | Muy vistosa en la demo. Si sobra tiempo, súbela al grupo de imprescindibles. |
| 12 | **Inspección como guía de diagnóstico** | No se pasa a "Esperando aprobación" sin inspección; rojos y amarillos se proponen como hallazgos. | M | Estandariza a los técnicos. Hazla después de la 4, que la complementa. |
| 13 | **Deshacer en acciones críticas** | Aviso con "Deshacer" al mover etapa, entregar o ajustar stock. | M | Da confianza al equipo en las primeras semanas de uso. |
| 14 | **Validaciones en línea** | Los errores aparecen junto al campo, no como aviso flotante. | S | Hazla junto con la 1 (recepción). |
| 15 | **Búsqueda rápida (Ctrl + K)** | Resultados mientras escribes; Enter abre la ficha. | M | Útil cuando el cliente llama: "¿cómo va la placa ABC-123?". |
| 16 | **Notificaciones ordenadas** | Agrupadas, marcables como leídas y sin repetir lo que ya está en Mi día. | S | Hoy la campana muestra 9; con el uso real crecerá. |
| 17 | **Accesibilidad básica** | Contraste AA, foco visible y etiquetas en los íconos. | M | Necesaria para producción; no cambia la demo. |
| 18 | **Guardado eficiente y tablas por páginas** | El guardado se agrupa y las tablas largas se dividen en páginas. | M | Solo importa con meses de datos reales. Va con el backend. |
| 19 | **Nuevo total en la confirmación de Mi Auto** | La hoja "¿Confirmas tu decisión?" ya muestra lo aprobado y lo rechazado; le falta el **total final de la OT**. | S | Ajuste menor. La parte importante del resumen ya existe. |
| 20 | **Bitácora interna vs. cliente con filtro** | En la bitácora de la OT, un interruptor: "Ver solo lo que ve el cliente". | S | Ayuda al asesor a saber qué ya se le contó al cliente. |

> **Nota:** en la versión anterior de esta lista figuraba "Resumen antes de confirmar en Mi Auto". Al revisarlo, **ya existe**: la hoja "¿Confirmas tu decisión?" muestra qué se aprueba, qué no y el monto. Quedó solo el ajuste del total final (19). En su lugar entró "WhatsApp solo en los momentos clave" (8).

---

## Plan recomendado

| Bloque | Mejoras | Tiempo estimado | Objetivo |
|---|---|---|---|
| **Antes de la próxima demo** | 6, 2, 3, 7, 8 | 2–3 días | Cero errores visibles y flujo de salida pulido |
| **Semana 1** | 1, 4, 5 | 4–5 días | Los dolores de Gallo resueltos de punta a punta |
| **Semana 2** | 9, 10 | 3–4 días | Se ve como un producto terminado y se usa en tablet |
| **Después** | 11 a 20 | Según la respuesta de Gallo | Pulido y preparación para producción |

**Mi recomendación general:** no muestres a Gallo una lista de 20 cambios. Haz las imprescindibles 6, 2, 3, 7 y 8 antes de volver a reunirte, y presenta la recepción en 3 pasos (1) y la bandeja única de cotizaciones (5) como lo que se ajustó a partir de su feedback. Eso demuestra que se escucha al cliente sin sumar complejidad.
