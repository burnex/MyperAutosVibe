# MyperAutos · Demo para Gallo Autos

## Contexto
Prototipo/demo que el cliente **Gallo Autos** (taller mecánico y de planchado/pintura en La Molina, Lima; razón social S&C Autos S.A.C., RUC 20600246080) pidió para probar tras una reunión corta. Marca visible: **solo Gallo Autos** (decisión del usuario, 14 oct 2026). "MyperAutos" es solo el nombre interno del repo: **no debe aparecer en ninguna pantalla, correo ni mensaje**. Ver [docs/GLOSARIO.md](docs/GLOSARIO.md).

Propuesta de valor: transparencia total para el cliente del taller — agenda en 1 minuto, seguimiento del auto en vivo (como un delivery), presupuesto aprobado con fotos de las piezas, inspección "semáforo" (verde/amarillo/rojo) y historial con comprobantes.

## Roadmap
La intranet (backoffice para trabajadores) es lo que falta; el plan completo está en [ROADMAP.md](ROADMAP.md). Cliente = taller intermedio (ni básico ni avanzado); dolor: todo manual (ingreso, stock, salida). La demo muestra que los cambios en la intranet se reflejan en Mi Auto.

## Navegación de la demo
Servir la raíz: `python3 -m http.server 8000`.
- `gallo-autos-demo.html` — web pública. Botón **Portal** → `intranet/index.html?login=1` (login con selección de perfil). Botón **Mi auto** → `miauto/index.html#<vista>` (su `go('portal',…)` se redirige al final del archivo).
- **Intranet** y **Mi Auto** comparten estado en localStorage `myper_intranet_v1` (objeto `S`, `v:4`) y se sincronizan en vivo entre pestañas con el evento `storage` (`onExternalChange` en core.js). Si cambias la forma de los datos semilla, sube `v` en data.js y en `load()` de core.js.
- Caso estrella: placa **ADI-388** (Bruno Sánchez, OT 071102) en "Esperando aprobación" con 3 hallazgos (`urg`, `why`, `img`/`media`).

## Intranet (backoffice) — `intranet/`
Vanilla, sin build. `?role=gerencia|asesor|jefe|tecnico|almacen|caja` (+ `#vista`) entra directo; `?login=1` fuerza el login.
- Estilo claro y minimalista (tokens en `:root` de `css/styles.css`; azul `--blue` como acento, amarillo solo para la acción principal).
- `js/data.js` semilla + generador determinístico de volumen (60 clientes, ~70 vehículos, ~650 OT en 6 meses, 60 repuestos). Fechas relativas a hoy.
- `js/core.js` estado, router (`go`, `refresh`, `paint`), ayuda contextual, menú "+ Nuevo", drawer/modales, documentos, stock/etapas (`setStage`, `reserveItems`, `deliverItem`). `logOT(o,txt,pub)`: `pub` = visible para el cliente en Mi Auto.
- `js/help.js` textos de ayuda por vista (`HELP`) y tour guiado (`TOUR`, `startTour`).
- `js/v-inicio.js` "Mi día" por perfil · `v-operacion.js` tablero, OT (con "Siguiente paso"), agenda, recepción, cotizaciones, vista técnico, entrega · `v-stock.js` · `v-clientes.js` (CRM, recordatorios, oportunidades, encuestas) · `v-seguros.js` (siniestros, cobranza) · `v-gerencia.js` (dashboard, usuarios/auditoría, arranque).
- Cada vista: `VIEWS[nombre]={t,ic,render,after}`; perfiles y vistas permitidas en `ROLES` (data.js). Tras mutar estado: `save()` + `refresh()`.
- Recortadas por decisión del usuario: cuentas corporativas, productividad, reportes, mensajes, promociones. "Oportunidades" se unió a **Cotizaciones** (pestañas Por enviar · Esperando al cliente · Aprobadas · Rechazadas).
- Cambios de etapa desde la UI: usar `requestStage(id,k)` (confirma saltos y pide motivo al retroceder); `setStage` es la operación de bajo nivel.
- WhatsApp al cliente solo con `waMoment(o, 'recibido'|'aprobacion'|'retraso'|'listo'|'entrega')` (plantillas `WA_TPL` en core.js).
- Stock: siempre `stockCell(p)` (en mano · reservado · disponible); `lowParts()` usa lo disponible. Unidad en `p.unit`.
- Hallazgos: `addFinding(o, punto, urg, nota)` con precio sugerido vía `FIND_MAP`/`suggestFor`.
- Recepción: asistente de 3 pasos con estado en `REC` (firma y km obligatorios).
- Avance para el cliente: `o.hist` (historial de etapas con hora, lo llena `setStage`), `i.done` por trabajo (`toggleDone`, botón en la vista del técnico y checklist en la ficha de OT) y `workState(o,i)`. Mi Auto "Mi auto hoy" (`v_seguimiento` en miauto/js/app.js) usa esto para "Ahora mismo", "Lo que estamos haciendo" y "El viaje de tu auto" (textos en `MA.JR`). Público objetivo de 18 a 80 años: letra grande, botón Aa (`MA.fs*`), sin siglas.

## Mi Auto (cliente) — `miauto/`
App móvil (PWA instalable) que carga `../intranet/js/data.js` y `core.js` y luego `js/app.js` (namespace `MA`, no redeclarar globals de core). En escritorio se ve dentro de un marco de celular con panel explicativo. Rutas `#inicio|seguimiento|presupuesto|historial|agendar`. Fija `ACTOR` con el nombre del cliente para la bitácora.

## Documentación
- `docs/funcionalidades/NN-*.md`: una ficha por funcionalidad, con la misma estructura (ficha técnica, antes/ahora, paso a paso, guion en tabla, datos de ejemplo, mensaje clave), pensadas para generar videos. **Si cambias una funcionalidad, actualiza su ficha.**
- `docs/MEJORAS.md`: 20 mejoras de proceso acordadas como siguientes pasos (sin funcionalidades nuevas).

## Pruebas
Sin suite formal. Se verificó con jsdom y puppeteer-core (Chrome del sistema) desde un directorio temporal: recorrer todas las vistas por perfil, flujo cotizar→aprobar→reservar→entregar, y sincronización intranet↔Mi Auto.

## Web pública (`gallo-autos-demo.html`)
- Un solo archivo limpio (~30 KB, HTML + CSS + JS inline, sin base64) con el mismo sistema visual que el Portal y Mi Auto. Botones: **Portal** → `intranet/index.html?login=1`, **Mi auto** → `miauto/index.html#inicio`, **Agendar cita** → `miauto/index.html#agendar`.
- La versión anterior (con el portal de cliente antiguo y sus imágenes en base64) está en `legacy/gallo-autos-demo-v1.html`. No se usa; solo es respaldo.

## Cómo correr
```
python3 -m http.server 8000   # en la raíz
# web:    http://localhost:8000/gallo-autos-demo.html
# portal: http://localhost:8000/intranet/index.html?login=1
# cliente: http://localhost:8000/miauto/index.html  (placa demo ADI-388)
```

## Convenciones
- Idioma de UI y código de dominio: **español (Perú)**; moneda `S/` (soles) y `US$`.
- Paleta en variables CSS `:root` (`--blue #2908F1` azul Gallo, `--yellow` solo para la acción principal). Reutilizar tokens, no hardcodear colores.
- HTML/CSS/JS vanilla, sin build ni frameworks salvo que el usuario lo pida.
- Vocabulario y tono según [docs/GLOSARIO.md](docs/GLOSARIO.md). Al tocar textos, verificar que no aparezca "Myper" en la UI: `grep -rni myper gallo-autos-demo.html intranet miauto | grep -v myper_` debe salir vacío (las claves de localStorage `myper_*` son internas).

## Pendientes conocidos
- Correo/web `galloautos.com` son de la demo; confirmar los reales con el cliente.
- Decidir con el cliente: backend real, WhatsApp Business API, facturación SUNAT, pagos, multi-sucursal.
- Mejoras deseables 11–20 en [docs/MEJORAS.md](docs/MEJORAS.md).
