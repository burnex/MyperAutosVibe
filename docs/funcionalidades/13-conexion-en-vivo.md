# 13 · Conexión en vivo (Portal ↔ Mi Auto)

> **Parte:** Portal + Mi Auto · **Perfil:** asesor y cliente · **Captura:** dos ventanas lado a lado en el mismo navegador · **Duración:** 0:30

## En una frase
Lo que hace el taller aparece al instante en el celular del cliente, y lo que decide el cliente aparece al instante en el taller.

## Qué se sincroniza
| Desde | Acción | Se ve en |
|---|---|---|
| Portal | Mover etapa (tablero, técnico o ficha de OT) | Mi Auto: tarjeta de estado y línea de tiempo |
| Portal | Subir foto del técnico | Mi Auto: seguimiento |
| Portal | Marcar un trabajo como terminado | Mi Auto: ✓ en "Lo que estamos haciendo" |
| Portal | Enviar cotización | Mi Auto: aviso y pantalla de presupuesto |
| Portal | Cambiar fecha prometida (con motivo) | Mi Auto: aviso "Cambió tu fecha de entrega" + WhatsApp |
| Portal | Detener el auto ("No puedo avanzar") | Mi Auto: aviso "Tu auto está en pausa" + WhatsApp |
| Portal | Entregar y cobrar | Mi Auto: historial y comprobante |
| Mi Auto | Aprobar o rechazar el presupuesto | Portal: tablero, campana de notificaciones y repuestos reservados |
| Mi Auto | Agendar una cita | Portal: Agenda (origen "Mi Auto") |

## Cómo grabarlo
1. **Reiniciar demo** en el Portal.
2. Ventana izquierda: Portal con perfil Asesor, en el **Tablero del taller**.
3. Ventana derecha: Mi Auto con la placa **ADI-388**, en **Presupuesto**.
4. En Mi Auto, **Confirmar mi decisión**. A la izquierda, el Cerato pasa a "En reparación" y aparece el aviso "Actualizado desde Mi Auto".
5. En el Portal, arrastra el Cerato a "Control de calidad". A la derecha, Mi Auto muestra "Actualizado por el taller" y la nueva etapa.

## Guion
| Escena | En pantalla | Narración | Dur. |
|---|---|---|---|
| 1 | Las dos ventanas lado a lado | "A la izquierda, el taller. A la derecha, el celular del cliente." | 0:06 |
| 2 | Clic en "Confirmar mi decisión" → la tarjeta se mueve sola | "Bruno aprueba… y el taller lo ve en ese segundo." | 0:10 |
| 3 | Arrastre en el tablero → Mi Auto cambia | "El taller avanza… y Bruno lo ve en ese segundo." | 0:10 |
| 4 | Texto en pantalla | "Sin llamadas. Sin esperas." | 0:04 |

## Notas técnicas
- En la demo, la conexión funciona entre pestañas del **mismo navegador** porque los datos se guardan ahí.
- En producción, la misma lógica usa un servidor y llega a cualquier celular.

## Mensaje clave
Un mismo sistema, dos pantallas: taller y cliente siempre en la misma página.
