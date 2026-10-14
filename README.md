# MyperAutos · Demo

Prototipo de intranet para el taller y app móvil para sus clientes (demo solicitada por **Gallo Autos**, La Molina, Lima).

El cliente entra con su placa y puede:
- **Agendar** una cita (servicio, día, hora).
- **Seguir su auto en vivo**: cada etapa de la reparación con hora y comentarios del técnico.
- **Aprobar el presupuesto con fotos** de las piezas, ítem por ítem, y descargar el PDF.
- Ver la **inspección semáforo** (verde / amarillo / rojo) explicada punto por punto.
- Consultar su **historial** de servicios, kilometraje y comprobantes.

> Es un prototipo: todos los datos son ficticios y no hay backend.

## Ejecutar

No requiere instalación. Desde la raíz del repo:

```bash
python3 -m http.server 8000
```

Abrir <http://localhost:8000/gallo-autos-demo.html>.

## Las tres partes

| Parte | URL | Para quién |
|---|---|---|
| Web pública | <http://localhost:8000/gallo-autos-demo.html> | Visitantes del taller |
| **Portal** (intranet) | <http://localhost:8000/intranet/index.html?login=1> | Equipo: gerencia, asesor, jefe de taller, técnico, almacén, caja |
| **Mi Auto** (app del cliente) | <http://localhost:8000/miauto/index.html> | Clientes, desde el celular |

Portal y Mi Auto comparten los datos: ábrelos en pestañas del mismo navegador y lo que haces en uno aparece al instante en el otro.

## Recorrido sugerido para la reunión

1. En la web, entra a **Portal** y pulsa "Haz el tour guiado" (10 pasos por todo el flujo).
2. En otra pestaña abre **Mi Auto** con la placa **ADI-388** (el código de WhatsApp se completa solo).
3. En Mi Auto → Presupuesto, aprueba 2 de los 3 hallazgos. En el Portal, el Kia Cerato pasa solo a "En reparación".
4. En el Portal → Vista del técnico, entra al Cerato y toca "Terminé". Mi Auto muestra el nuevo estado.
5. Cada pantalla del Portal tiene un recuadro "¿para qué sirve?" (se oculta con ✕ y vuelve con "?").

Para empezar de cero: Portal → Usuarios y auditoría → "Reiniciar demo".

## Publicar (dist)

```bash
./scripts/build-dist.sh
```

Genera `dist/` (≈640 KB): la web como `index.html`, más `intranet/` (Portal) y `miauto/` (Mi Auto). Es 100 % estático: se sube tal cual a Netlify, Vercel, GitHub Pages, S3 o cualquier hosting. El link para gerencia es la raíz del sitio; el Portal queda en `/intranet/index.html?login=1` y Mi Auto en `/miauto/`.

## Documentación

- [docs/funcionalidades/](docs/funcionalidades/README.md): una ficha por funcionalidad, con guion para video.
- [docs/MEJORAS.md](docs/MEJORAS.md): 20 mejoras priorizadas (las 10 imprescindibles ya están implementadas).
- [docs/GLOSARIO.md](docs/GLOSARIO.md): marca, términos, etapas y reglas de WhatsApp.
- [ROADMAP.md](ROADMAP.md): visión por fases.

## Tecnología

HTML, CSS y JavaScript sin dependencias ni compilación (solo fuente Roboto de Google Fonts). Los datos son ficticios y se guardan en el navegador. Ver [CLAUDE.md](CLAUDE.md) para la estructura interna y convenciones.

## Próximos pasos

- Definir con el cliente el alcance tras la demo (backend, WhatsApp real, pagos, fotos reales).
- Reemplazar el logo por el de MyperAutos.
- Separar el archivo en módulos cuando deje de ser prototipo.
