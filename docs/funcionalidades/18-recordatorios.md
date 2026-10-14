# 18 · Recordatorios

> **Parte:** Portal · **Perfil:** asesor, gerencia · **Captura:** Portal → Recordatorios · **Duración:** 0:30

## En una frase
El sistema detecta qué autos ya deben volver (por kilometraje o por tiempo) y deja el WhatsApp listo para enviar.

## Antes / Ahora
| Antes | Ahora |
|---|---|
| El cliente vuelve solo cuando se acuerda, o se va a otro taller | El taller lo llama a tiempo, con un mensaje y una promo |
| No se sabe cuántos clientes se perdieron | Lista de inactivos de más de 6 meses, con el ingreso potencial |

## Qué se ve
- **Indicadores:**
  - Autos por volver.
  - **Ingreso potencial**: autos por volver × ticket promedio.
  - Clientes ya contactados.
  - Inactivos de más de 6 meses.
- **Tabla:** vehículo, cliente, motivo ("7 meses sin servicio", "Vencido por km", "Próximo servicio"), último servicio y estado (pendiente o contactado).
- **WhatsApp** por fila y **Enviar a los N pendientes** en lote.

## Paso a paso
1. El sistema revisa cada vehículo: los días desde su último servicio y los km frente a su intervalo.
2. El asesor envía los recordatorios uno por uno o todos juntos.
3. El mensaje incluye la promo del mes y el enlace para agendar en Mi Auto.
4. La fila queda "Contactado" con la fecha.

## Guion
| Escena | En pantalla | Narración | Dur. |
|---|---|---|---|
| 1 | Indicador de ingreso potencial | "Aquí está la plata que hoy se pierde: autos que ya deberían volver." | 0:10 |
| 2 | Tabla con los motivos | "El sistema sabe quién toca mantenimiento, por kilómetros o por tiempo." | 0:08 |
| 3 | "Enviar a todos" → aviso | "Un clic, y todos reciben su recordatorio por WhatsApp." | 0:12 |

## Mensaje clave
El cliente que vuelve es el más barato de conseguir.
