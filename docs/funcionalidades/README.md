# Funcionalidades · fichas para video

Cada archivo describe **una funcionalidad** de la demo de Gallo Autos y trae un **guion de video** listo para grabar o para generar con herramientas de video. Todas las fichas siguen la misma estructura, para que se puedan procesar en lote.

## Estructura de cada ficha

| Sección | Para qué sirve en el video |
|---|---|
| Ficha técnica (cita inicial) | Módulo, perfil, URL de captura y duración sugerida |
| En una frase | Título o subtítulo en pantalla |
| Antes / Ahora | Gancho del video: el dolor y la solución |
| Paso a paso | Orden de las tomas |
| Guion | Tabla escena por escena: lo que se ve + lo que se narra |
| Datos de ejemplo | Placas, nombres y montos que deben aparecer en pantalla |
| Mensaje clave | Cierre de la escena o texto final |

## Contexto común para todos los videos

- **Taller:** Gallo Autos, Av. La Molina 724, La Molina (Lima). Más de 25 años, más de 12 técnicos, mecánica, planchado y pintura, y detailing. Atiende particulares, flotas y aseguradoras.
- **Dolor principal:** todo se hace a mano, desde que el auto entra hasta que sale. Cuaderno, papel y WhatsApp sueltos.
- **Marca:** en pantalla solo aparece **Gallo Autos** (MyperAutos es el nombre interno del proyecto y no se menciona en los videos). Tres partes conectadas: la **web**, el **Portal** (intranet del equipo) y **Mi Auto** (app del cliente en el celular).
- **WhatsApp al cliente:** solo en 4 momentos — recibido, necesitamos tu aprobación, retraso o cambio de fecha, y listo + entrega. Lo demás se ve en Mi Auto.
- **Caso protagonista:** Bruno Sánchez y su **Kia Cerato 2014, placa ADI-388**, OT 071102 (mantenimiento 10,000 km + embrague). El técnico encontró 3 cosas más: fuga en el empaque de tapa de válvulas (urgente), filtro de polen saturado (recomendado) y neblinero quemado (opcional).
- **Equipo de la demo (ficticio):** Christian Carbajal (asesor), Hugo Alarcón (jefe de taller), Jorge Ramos y Luis Paredes (mecánicos), Rosa Medina (almacén), Karen Díaz (caja), Patricia Vega (gerencia).
- **Tono de narración:** cercano, en español de Perú, frases cortas, hablando de "tú" al dueño del taller. Sin tecnicismos de software.
- **Cómo grabar:** servir la carpeta con `python3 -m http.server 8000` y usar Chrome a 1440×900 (o 390×844 para celular). Antes de cada grabación: Portal → Usuarios y auditoría → **Reiniciar demo**.

## Orden sugerido (video completo ≈ 9–10 min)

| # | Ficha | Parte | Duración |
|---|---|---|---|
| 00 | [Visión general](00-vision-general.md) | Todo | 0:45 |
| 01 | [Web pública](01-web-publica.md) | Web | 0:20 |
| 02 | [Acceso al Portal](02-acceso-portal.md) | Portal | 0:20 |
| 03 | [Mi día](03-mi-dia.md) | Portal | 0:30 |
| 04 | [Agenda y capacidad](04-agenda.md) | Portal | 0:25 |
| 05 | [Recepción de vehículo](05-recepcion.md) | Portal | 0:40 |
| 06 | [Tablero del taller](06-tablero-taller.md) | Portal | 0:35 |
| 07 | [Orden de trabajo](07-orden-de-trabajo.md) | Portal | 0:35 |
| 08 | [Vista del técnico](08-vista-tecnico.md) | Portal | 0:40 |
| 09 | [Cotizaciones](09-cotizaciones.md) | Portal | 0:40 |
| 10 | [Mi Auto: acceso](10-mi-auto-acceso.md) | Mi Auto | 0:20 |
| 11 | [Mi Auto: inicio y "Mi auto hoy"](11-mi-auto-inicio-seguimiento.md) | Mi Auto | 0:45 |
| 12 | [Mi Auto: presupuesto con fotos](12-mi-auto-presupuesto.md) | Mi Auto | 0:40 |
| 13 | [Conexión en vivo](13-conexion-en-vivo.md) | Ambos | 0:30 |
| 14 | [Inventario y compras](14-inventario-compras.md) | Portal | 0:40 |
| 15 | [Entrega y cobro](15-entrega-cobro.md) | Portal | 0:30 |
| 16 | [Mi Auto: historial y agendar](16-mi-auto-historial-agendar.md) | Mi Auto | 0:25 |
| 17 | [Clientes y vehículos](17-clientes.md) | Portal | 0:20 |
| 18 | [Recordatorios](18-recordatorios.md) | Portal | 0:30 |
| 20 | [Encuestas y reseñas](20-encuestas.md) | Portal | 0:25 |
| 21 | [Siniestros](21-siniestros.md) | Portal | 0:30 |
| 22 | [Cuentas por cobrar](22-cuentas-por-cobrar.md) | Portal | 0:20 |
| 23 | [Tablero del dueño](23-tablero-dueno.md) | Portal | 0:30 |
| 24 | [Usuarios y auditoría](24-usuarios-auditoria.md) | Portal | 0:20 |
| 25 | [Ayuda y tour guiado](25-ayuda-tour.md) | Portal | 0:20 |

**Versiones cortas:**
- **60 segundos** (redes): 00 → 05 → 08 → 12 → 13 → 23.
- **3 minutos** (presentación comercial): 00, 03, 05, 06, 08, 12, 13, 14, 18, 23.
