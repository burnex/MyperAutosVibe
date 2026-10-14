---
format: 1080x1920
duration: 60s
message: "Tu taller ya hace el trabajo: Gallo Autos ahora te muestra la plata que se te escapa, y la recupera."
arc: Hook (plata quieta) → Problema (3 fugas) → Producto → Recepción → Tablero → Técnico encuentra → Cliente aprueba (pantalla dividida) → Control → Resultado → CTA + Myper
audience: Gerencia / dueño de Gallo Autos (taller intermedio en La Molina, Lima)
mode: collaborative
music: confident modern corporate tech underscore, uplifting, clean beat, no vocals, around 115 bpm
---

## Video direction

- **Canvas:** 1080×1920 vertical; sin narración ni subtítulos. Todo el mensaje va en texto en pantalla. Contenido importante dentro del 83 % superior (la franja inferior queda limpia salvo en la escena 10, donde la franja crema de Myper es intencional y es el último elemento).
- **Paleta (frame.md):** fondo `bg` #F6F7F9 en escenas de producto; `navy` #0B1B3A en escenas de impacto (1, 2 y la cifra de la 9); `primary` azul Gallo #2908F1 para el giro (3) y el cierre (10), acentos, barras y bordes de foco. `highlight` amarillo #FFC800 **solo** para cifras clave (S/ 3,545 · 6 · 3 · 1 · S/ 54,630 · S/ 690) y el botón "Entra a la demo". Titulares en `text` #0F172A sobre claro o blanco sobre navy/azul. Myper solo en el cierre, con sus propios colores (crema #FFFCF8).
- **Tipografía:** Roboto. Titulares 800–900, ≥ 7.5 cqw, interlineado ajustado, 3–6 palabras por bloque. Cifras con `tabular-nums`. Rubik solo para "Desarrollado por" y el tagline de Myper.
- **Pantallas reales:** dentro de tarjetas blancas con radio grande y sombra suave sobre `bg`. El Portal va en un marco de tablet sencillo (bisel oscuro fino) o en recortes; Mi Auto, dentro de un marco de celular negro. Nunca se muestra una pantalla de escritorio entera encogida.
- **Motion grammar:** curvas largas y suaves (`power3`, `expo.out` en llegadas rápidas); nada de rebotes. Revelado secuencial: cada texto entra cuando le toca, repartido en la mitad trasera del plano; nunca todo en el primer 25 %. Las cifras **cuentan hacia arriba** (`counting-dynamic-scale`). Los acercamientos de cámara (`coordinate-target-zoom` / `multi-phase-camera`) terminan quietos; nada de paneo lento en la segunda mitad ni de "respiración". La única vida permitida en una pausa es un temblor sutil.
- **Ritmo:** escenas 1–2 rápidas y de tensión. La 3 es una pausa de alivio (logo quieto). Las 4–6 son de producto, con energía media. **La 7 es el clímax**, la más rica en movimiento. La 8 es rápida. La 9 tiene el número protagonista con una pausa sostenida. La 10 es calma, sostenida hasta el final, con la única salida real del video.
- **Prohibido:** formato diapositiva (todo de golpe y luego congelado), formato salvapantallas (todo flotando suelto), rebotes elásticos, degradados "IA" morados, bokeh, cursores o barras de navegador falsos, logos de Myper antes del cierre o sobre azul Gallo, URLs inventadas, `Math.random`/`Date.now`, `repeat`/`yoyo`.

Sin narración: todo el mensaje va en textos en pantalla (3–6 palabras), con cortes en el ritmo de la música. Las cifras salen de la demo real (`capture/assets/numbers.json`).

## Frame 1 — ¿Cuánta plata está quieta?

- scene: Fondo navy; la pregunta entra palabra por palabra y debajo una cifra amarilla cuenta de S/ 0 a S/ 3,545
- onscreen: "¿Cuánta plata está quieta hoy en tu taller?" · "S/ 3,545" · "esperando que tu cliente responda"
- voiceover: ""
- duration: 5s
- transition_in: cut
- status: animated
- src: compositions/frames/01-hook.html
- type: hook
- persuasion: Pain agitation con cifra real
- beat: curiosity + tension
- asset_candidates:
- blueprint: dataviz-countup (Adapt)
- focal: (tipográfico) la cifra S/ 3,545
- roles: —
- sfx: riser-soft, impact-soft

Adapt: se mantiene la firma (una sola cifra que estalla en tamaño mientras cuenta); sin íconos alrededor, solo la pregunta arriba y una línea de contexto.
Scene 1 (0.0–1.6s): fondo navy a sangre. La pregunta "¿Cuánta plata está quieta" entra palabra por palabra (`dynamic-content-sequencing`) en blanco, centrada en el tercio superior, 2 líneas.
Scene 2 (1.6–2.4s): se completa "hoy en tu taller?"; la palabra "plata" se marca con un subrayado amarillo que se dibuja (`css-marker-patterns`).
Scene 3 (2.4–4.2s): debajo, centrada, la cifra "S/ 3,545" en amarillo cuenta desde S/ 0 y crece de tamaño mientras sube (`counting-dynamic-scale`) hasta ocupar ~80 % del ancho; un brillo suave aparece detrás (`ambient-glow-bloom`).
Scene 4 (4.2–5.0s): aparece "esperando que tu cliente responda" en blanco al 70 % debajo de la cifra; todo se sostiene quieto.

narrativeRole: Abre en el idioma del dueño — dinero — antes de mostrar ningún software.
keyMessage: Hoy hay plata parada en tu taller y no la estás viendo.

## Frame 2 — Tres fugas

- scene: Tres cifras entran una por una al ritmo (6 · 3 · 1), cada una con su frase; al final las tres quedan apiladas
- onscreen: "6 clientes que ya debían volver" · "3 días de guardianía sin cobrar" · "1 auto parado por un repuesto"
- voiceover: ""
- duration: 6s
- transition_in: crossfade
- status: animated
- src: compositions/frames/02-fugas.html
- type: problem
- persuasion: Rule of three + Statistical proof
- beat: frustration → urgency
- asset_candidates:
- blueprint: kinetic-type-beats (Adapt)
- focal: (tipográfico) las tres cifras 6 · 3 · 1
- roles: —
- sfx: impact-soft ×3

Adapt: se mantiene la firma (tríptico de golpes, cada uno solo en su tiempo); cada golpe es cifra amarilla grande + frase blanca, apilados verticalmente.
Scene 1 (0.0–1.8s): navy. Entra "6" en amarillo (golpe con `kinetic-beat-slam`, asentamiento suave) en el tercio superior, y a su lado/debajo "clientes que ya debían volver".
Scene 2 (1.8–3.6s): el bloque 1 sube y se achica a una fila compacta; entra "3" + "días de guardianía sin cobrar" en el centro con el mismo golpe.
Scene 3 (3.6–5.0s): el bloque 2 también se compacta; entra "1" + "auto parado por un repuesto".
Scene 4 (5.0–6.0s): las tres filas quedan apiladas y alineadas a la izquierda (lista de 3), sostenidas quietas; una línea fina amarilla une las tres cifras.

narrativeRole: Convierte la pregunta en dolores concretos del día a día del taller (recordatorios, entrega, stock).
keyMessage: El trabajo se hace, pero la plata se escapa por detalles que nadie ve.

## Frame 3 — Todo tu taller, en un solo lugar

- scene: Barrido a azul Gallo; el logo de Gallo Autos aparece y debajo "Portal del taller · Mi Auto"
- onscreen: "Todo tu taller." · "En un solo lugar."
- voiceover: ""
- duration: 4s
- transition_in: zoom-through
- status: animated
- src: compositions/frames/03-giro.html
- type: product_intro
- persuasion: Negative contrast (caos → orden)
- beat: relief + clarity
- asset_candidates: assets/gallo-logo-horizontal-blanco.png — logo Gallo Autos horizontal blanco (sobre azul)
- blueprint: titlecard-reveal (Adapt)
- focal: assets/gallo-logo-horizontal-blanco.png
- roles: gallo-logo-horizontal-blanco = cutout (centro)
- sfx: whoosh, impact-soft

Adapt: una sola tarjeta de título (logo + 2 líneas), sin la secuencia de tres tarjetas oscuras; se mantiene la firma de que el logo aparece primero y el texto se encadena después.
Scene 1 (0.0–1.2s): fondo azul Gallo (#2908F1) a sangre; el logo de Gallo Autos (blanco) aparece centrado en el tercio superior con una escala suave de 0.92→1 y desenfoque que se aclara.
Scene 2 (1.2–2.6s): debajo, "Todo tu taller." entra en blanco 900, grande.
Scene 3 (2.6–4.0s): "En un solo lugar." entra en amarillo debajo; sostener quieto (pausa de alivio).

narrativeRole: Lanza la solución con la marca del taller, no con la del proveedor.
keyMessage: Gallo Autos ya tiene su propio sistema.

## Frame 4 — Recibe un auto en 1 minuto

- scene: Tablet flotando sobre fondo claro; se ve la recepción con la placa ADI-388 y el aviso verde "Vehículo conocido", luego pasa al paso 2 con servicios y fotos
- onscreen: "Recibe un auto en 1 minuto." · "Sin papel. Con fotos y firma."
- voiceover: ""
- duration: 6s
- transition_in: push-slide UP
- status: animated
- src: compositions/frames/04-recepcion.html
- type: key_feature
- persuasion: Friction reduction
- beat: ease
- asset_candidates: assets/portal-recepcion-1-tablet.png — recepción paso 1, placa ADI-388 con "Vehículo conocido"; assets/portal-recepcion-2-tablet.png — recepción paso 2 con servicios y fotos de ingreso
- blueprint: device-surface-showcase (Adapt)
- focal: assets/portal-recepcion-1-tablet.png
- roles: portal-recepcion-1-tablet = cutout (dentro del marco de tablet) · portal-recepcion-2-tablet = supporting (segunda pantalla del mismo marco)
- sfx: whoosh-soft, click

Adapt: el marco de tablet sostiene dos pantallas en ciclo (paso 1 → paso 2) con titulares arriba; sin cursor.
Scene 1 (0.0–1.4s): fondo `bg`. Titular "Recibe un auto en 1 minuto." entra arriba (tercio superior, texto oscuro 900, "1 minuto" en azul) con revelado por palabras.
Scene 2 (1.4–3.4s): debajo, una tablet (marco oscuro fino, ~78 % del ancho, inclinada levemente y enderezándose) sube desde abajo con la pantalla del paso 1 (placa ADI-388, aviso verde "Vehículo conocido"); un acercamiento suave lleva la vista al aviso verde (`coordinate-target-zoom`).
Scene 3 (3.4–5.0s): la pantalla interna cambia al paso 2 con un deslizamiento hacia arriba dentro del marco (corte con velocidad igualada, `cut-catalog.md`); se ven servicios y fotos de ingreso.
Scene 4 (5.0–6.0s): aparece una línea secundaria "Sin papel. Con fotos y firma." bajo el titular; se sostiene.

narrativeRole: Primer contacto con el producto en el momento que hoy más papel genera.
keyMessage: El ingreso deja de ser una hoja que se pierde.

## Frame 5 — Cada auto, a la vista

- scene: Acercamiento al tablero del taller en tablet; la tarjeta del Kia Cerato ADI-388 se resalta con un borde amarillo
- onscreen: "Cada auto. Cada técnico." · "A la vista."
- voiceover: ""
- duration: 6s
- transition_in: push-slide UP
- status: animated
- src: compositions/frames/05-tablero.html
- type: key_feature
- persuasion: Show-don't-tell proof
- beat: control
- asset_candidates: assets/portal-tablero-tablet.png — tablero Kanban con ADI-388 en "Esperando aprobación"; assets/card-adi-aprob.png — recorte de la tarjeta ADI-388 con "Cotiz. enviada"
- blueprint: camera-journey (Adapt)
- focal: assets/portal-tablero-tablet.png
- roles: portal-tablero-tablet = background (pantalla completa en tarjeta) · card-adi-aprob = cutout (tarjeta que se separa del tablero)
- sfx: whoosh

Adapt: un solo vuelo de cámara sobre el tablero que aterriza en la tarjeta del Kia Cerato, que se separa hacia el frente (firma: el aterrizaje en la tarjeta héroe); sin 3D extremo.
Scene 1 (0.0–1.5s): fondo `bg`. Titular "Cada auto. Cada técnico." arriba en oscuro 900.
Scene 2 (1.5–3.5s): debajo, el tablero en una tarjeta blanca grande; la cámara se acerca de la vista general a la columna "Esperando aprobación" (`coordinate-target-zoom`), y el resto se desenfoca (`depth-of-field-blur`).
Scene 3 (3.5–5.0s): la tarjeta ADI-388 se separa hacia el frente (escala ~1.25, sombra) con un borde amarillo que se dibuja alrededor.
Scene 4 (5.0–6.0s): "A la vista." entra en azul junto al titular; todo quieto.
- handoff_out: la tarjeta ADI-388 (card-adi-aprob) queda centrada horizontalmente, en y≈62 % del lienzo, escala 1.25 respecto a su tamaño en tablero, opacidad 1, sin movimiento.

narrativeRole: Muestra que el dueño ve todo el taller sin preguntar, y presenta al auto protagonista.
keyMessage: Sabes en qué va cada auto sin ir a la bahía.

## Frame 6 — El técnico encuentra algo

- scene: Celular del técnico a la izquierda/arriba con el Cerato abierto; entra la tarjeta "Encontré algo más" y se ilumina "Precio sugerido: S/ 690"
- onscreen: "Tu técnico encuentra algo." · "El precio sale solo."
- voiceover: ""
- duration: 7s
- transition_in: crossfade
- status: animated
- src: compositions/frames/06-tecnico.html
- type: key_feature
- persuasion: Feature-to-benefit translation
- beat: confidence
- asset_candidates: assets/tecnico-phone-ot.png — celular del técnico con el Kia Cerato abierto y la lista de trabajos; assets/modal-hallazgo-precio.png — modal "Encontré algo más" con "Precio sugerido: S/ 690.00"
- blueprint: device-surface-showcase (Adapt)
- focal: assets/modal-hallazgo-precio.png
- roles: tecnico-phone-ot = cutout (celular del técnico, izquierda/abajo) · modal-hallazgo-precio = cutout (tarjeta que emerge del celular)
- sfx: notification, impact-soft

Adapt: el celular del técnico es la superficie; de él sale la tarjeta del hallazgo con el precio (firma: un flujo completo dentro de la superficie sostenida).
Scene 1 (0.0–1.5s): fondo `bg`. Titular "Tu técnico encuentra algo." arriba. El celular del técnico entra desde abajo a la izquierda (~55 % del alto, leve inclinación), mostrando el Kia Cerato abierto.
Scene 2 (1.5–3.8s): de la mitad derecha del celular emerge la tarjeta "Encontré algo más" (escala desde el celular hacia la derecha, superpuesta, ~85 % del ancho), con sombra.
Scene 3 (3.8–5.6s): el recuadro "Precio sugerido: S/ 690.00" de la tarjeta se ilumina: borde amarillo y un breve resplandor (`asr-keyword-glow`); al mismo tiempo, "El precio sale solo." entra bajo el titular con "solo" en azul.
Scene 4 (5.6–7.0s): se sostiene; un pulso suave único en el botón "Enviar al asesor" (`press-release-spring`) como cierre.

narrativeRole: Prepara el clímax: el hallazgo llega con precio, listo para el cliente.
keyMessage: Cotizar ya no toma horas.

## Frame 7 — El cliente aprueba desde su celular

- scene: PANTALLA DIVIDIDA vertical. Abajo, el celular de Bruno (Mi Auto) con el video de la fuga y "Confirmar mi decisión"; un toque. Arriba, la tarjeta ADI-388 salta de "Esperando aprobación" a "En reparación" en el mismo instante, con un destello
- onscreen: "Tu cliente ve la falla." · "Aprueba desde su celular." · "Y tú lo ves al instante."
- voiceover: ""
- duration: 8s
- transition_in: zoom-through
- status: animated
- src: compositions/frames/07-aprueba.html
- type: key_feature
- persuasion: Show-don't-tell proof (sincronía en vivo)
- beat: awe + trust
- asset_candidates: assets/miauto-presupuesto.png — Mi Auto presupuesto con video de fuga y botón amarillo; assets/miauto-confirmar.png — hoja "¿Confirmas tu decisión?"; assets/card-adi-aprob.png — tarjeta ADI-388 antes; assets/card-adi-rep.png — tarjeta ADI-388 en "En reparación"
- blueprint: comparison-split (Adapt)
- focal: assets/miauto-presupuesto.png
- roles: miauto-presupuesto = cutout (celular de Bruno, mitad inferior) · miauto-confirmar = supporting (hoja que sube en el mismo celular) · card-adi-aprob = cutout (mitad superior, antes) · card-adi-rep = cutout (mitad superior, después)
- sfx: whoosh, click, success-chime

Adapt: la pantalla dividida es vertical (taller arriba, cliente abajo) en lugar de dos tarjetas lado a lado; firma conservada: los dos lados reflejan la misma acción en el mismo instante.
- handoff_in: la tarjeta ADI-388 (card-adi-aprob) llega centrada horizontalmente, y≈62 %, escala 1.25, opacidad 1, quieta; en los primeros 0.8 s sube a su lugar en la mitad superior (y≈26 %, escala 1.0).
Scene 1 (0.0–1.4s): el lienzo se divide con una línea fina horizontal al 46 %. Mitad superior (fondo `bg`, rótulo pequeño "TALLER"): la tarjeta ADI-388 sube a su lugar con la etiqueta "Esperando aprobación". Mitad inferior (fondo navy, rótulo "TU CLIENTE"): el celular de Bruno entra desde abajo con Mi Auto, presupuesto y video de fuga.
Scene 2 (1.4–3.2s): texto grande "Tu cliente ve la falla." sobre la mitad inferior junto al celular; el video del celular hace un acercamiento a la fuga (`coordinate-target-zoom`).
Scene 3 (3.2–4.6s): "Aprueba desde su celular."; un toque (onda, `cursor-click-ripple` sin cursor visible, solo la onda) en "Confirmar mi decisión"; la hoja "¿Confirmas tu decisión?" sube en el celular y se toca "Sí, confirmar" (`press-release-spring`).
Scene 4 (4.6–6.2s): **momento clave:** en el mismo instante del toque, arriba la tarjeta ADI-388 cambia: la etiqueta "Esperando aprobación" se convierte en "En reparación" (intercambio `scale-swap-transition` de card-adi-aprob → card-adi-rep) con un destello verde y una línea que conecta ambas mitades (`svg-path-draw`).
Scene 5 (6.2–8.0s): "Y tú lo ves al instante." en azul sobre la mitad superior; todo quieto.

narrativeRole: Clímax: la conexión taller ↔ cliente que ningún cuaderno puede hacer; el "sí" llega con evidencia.
keyMessage: Con fotos, el cliente aprueba más y más rápido.

## Frame 8 — Repuesto que sale, repuesto que se cobra

- scene: Tarjeta del inventario con "en mano · reservado · disponible"; corte al modal "Entrega completada" con sus 5 checks verdes entrando en cascada
- onscreen: "Repuesto que sale, repuesto que se cobra." · "Entrega en un toque."
- voiceover: ""
- duration: 5s
- transition_in: push-slide UP
- status: animated
- src: compositions/frames/08-control.html
- type: benefits
- persuasion: Value stacking
- beat: control + peace of mind
- asset_candidates: assets/portal-inventario-tablet.png — inventario con stock en mano/reservado/disponible; assets/modal-entrega-completada.png — modal con 5 confirmaciones verdes
- blueprint: grid-card-assemble (Adapt)
- focal: assets/modal-entrega-completada.png
- roles: portal-inventario-tablet = supporting (recorte de la tabla de stock) · modal-entrega-completada = cutout (lista de 5 confirmaciones)
- sfx: tick ×5

Adapt: dos tarjetas en vez de una cuadrícula; la segunda es una lista que se arma ítem por ítem (firma: la lista que se acumula).
Scene 1 (0.0–1.8s): fondo `bg`. "Repuesto que sale," arriba; debajo, una tarjeta con un recorte del inventario (3–4 filas con "en mano · reservado · disponible") entra desde la derecha; "repuesto que se cobra." completa la frase.
Scene 2 (1.8–3.8s): la tarjeta de inventario se reduce y sube a una esquina; la tarjeta "Entrega completada" ocupa el centro y sus 5 confirmaciones verdes aparecen una por una (`dynamic-content-sequencing`).
Scene 3 (3.8–5.0s): "Entrega en un toque." entra; se sostiene.

narrativeRole: Cierra el ciclo operativo (stock y salida), los otros dos dolores declarados por Gallo.
keyMessage: Nada sale sin cobrarse; nada se olvida en la entrega.

## Frame 9 — Ingresos que se ven

- scene: Tablero del dueño; la cifra de ingresos 30 días cuenta hasta S/ 54,630 en amarillo y las barras del gráfico crecen; abajo "6 clientes listos para volver"
- onscreen: "Clientes que vuelven." · "Ingresos que se ven." · "S/ 54,630 en 30 días"
- voiceover: ""
- duration: 6s
- transition_in: crossfade
- status: animated
- src: compositions/frames/09-resultado.html
- type: benefits
- persuasion: Future pacing + Statistical proof
- beat: aspiration + control
- asset_candidates: assets/portal-dashboard-tablet.png — tablero del dueño con KPIs y gráfico de ingresos por mes; assets/portal-recordatorios-tablet.png — recordatorios con ingreso potencial
- blueprint: dataviz-countup (Adapt)
- focal: (tipográfico) S/ 54,630 + assets/portal-dashboard-tablet.png
- roles: portal-dashboard-tablet = supporting (recorte del gráfico de ingresos) · portal-recordatorios-tablet = supporting (recorte del KPI "ingreso potencial")
- sfx: riser, impact

Adapt: la cifra héroe cuenta mientras las barras del gráfico real crecen detrás; firma conservada: la cifra que crece de tamaño al contar.
Scene 1 (0.0–1.5s): fondo navy. "Clientes que vuelven." entra arriba en blanco.
Scene 2 (1.5–4.0s): en el centro, "S/ 54,630" en amarillo cuenta desde 0 creciendo de tamaño (`counting-dynamic-scale`); debajo, "en 30 días" en blanco. Detrás, una tarjeta clara con el gráfico de barras real del tablero del dueño sube con las barras creciendo en secuencia (`stat-bars-and-fills`, revelado de abajo hacia arriba sobre la captura).
Scene 3 (4.0–6.0s): "Ingresos que se ven." entra bajo la cifra; se sostiene quieto (pausa del número).

narrativeRole: Responde la pregunta del inicio: la plata ahora se ve y se recupera.
keyMessage: El dueño decide con números, no con intuición.

## Frame 10 — Pruébalo tú mismo

- scene: Fondo azul Gallo con el logo Gallo Autos; "Pruébalo tú mismo." y el botón amarillo "Entra a la demo" con la línea "Link en el mensaje" debajo (sin URL: el link va en el WhatsApp). En los últimos ~3 s sube desde abajo una franja crema con "Desarrollado por" + isologo Myper a color + tagline
- onscreen: "Pruébalo tú mismo." · botón "Entra a la demo" · "Link en el mensaje" · "Desarrollado por" + Myper · "¡Únete a la transformación digital!"
- voiceover: ""
- duration: 7s
- transition_in: zoom-through
- status: animated
- src: compositions/frames/10-cta.html
- type: cta
- persuasion: Risk reversal (pruébalo sin compromiso)
- beat: urgency-to-act
- asset_candidates: assets/gallo-logo-horizontal-blanco.png — logo Gallo Autos blanco; assets/myper-logo-color.png — isologo Myper a color (solo sobre crema)
- blueprint: titlecard-reveal (Adapt)
- focal: assets/gallo-logo-horizontal-blanco.png
- roles: gallo-logo-horizontal-blanco = cutout (centro superior) · myper-logo-color = cutout (franja crema final)
- sfx: impact-soft, chime

Adapt: cadena de tarjeta final (frase → botón → logo) y al final la franja de firma de Myper; es la única escena con salida real.
Scene 1 (0.0–1.4s): fondo azul Gallo a sangre. Logo Gallo Autos blanco centrado arriba.
Scene 2 (1.4–3.0s): "Pruébalo tú mismo." entra en blanco 900, grande, al centro.
Scene 3 (3.0–4.2s): el botón amarillo "Entra a la demo" (con flecha) aparece con un asentamiento suave y un brillo; debajo, "Link en el mensaje" en blanco al 75 %.
Scene 4 (4.2–5.6s): desde abajo sube una franja crema (#FFFCF8) que ocupa ~30 % inferior: "Desarrollado por" (Rubik 500, gris petróleo) y el isologo Myper a color (≥ 220 px de ancho, con su área de protección), con "¡Únete a la transformación digital!" (Rubik 600, #054261) centrado debajo.
Scene 5 (5.6–7.0s): todo se sostiene; en los últimos 0.4 s, fundido suave a negro (salida final).

narrativeRole: Convierte el interés en una acción concreta: entrar a la demo. Myper firma al final sin competir con Gallo.
keyMessage: Entra a la demo hoy.
