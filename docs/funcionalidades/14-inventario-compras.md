# 14 · Inventario y compras

> **Parte:** Portal · **Perfil:** almacén, jefe de taller, gerencia · **Captura:** Portal → Inventario y compras · **Duración:** 0:40

## En una frase
Cada repuesto que entra o sale queda ligado a una orden de trabajo, y lo que se acaba se compra antes de que falte.

## Antes / Ahora
| Antes | Ahora |
|---|---|
| Stock en un cuaderno o en la memoria del almacenero | 60 productos con stock, ubicación, costo y precio |
| "¿Quién sacó este filtro?" | Regla de oro: nada sale sin una OT |
| Se descubre que falta un repuesto con el auto desarmado | Alertas de mínimos y orden de compra sugerida |

## Qué se ve
- **Indicadores:** stock valorizado, productos bajo el mínimo, pedidos de OT por entregar y compras en camino.
- **Pestañas:**
  - **Catálogo:** búsqueda por nombre, SKU o marca; **unidad de medida** en su columna (litro, par, juego x4…); stock siempre con tres números: **en mano · reservado · disponible**; botón **Ajustar** (conteo físico con motivo).
  - **Pedidos de OT:** lo que piden los técnicos; **Entregar** descuenta el stock; si no hay, **Pedir compra**.
  - **Alertas de mínimos:** cantidad sugerida y costo estimado por proveedor; **Generar órdenes de compra** en un clic.
  - **Kardex:** cada movimiento (entrada, salida, reserva, ajuste) con fecha, origen y responsable.
  - **Compras:** órdenes enviadas; **Recibir mercadería** suma stock.
  - **Proveedores:** plazo de entrega, calificación y productos.
- Exportar a Excel desde el catálogo y el kardex.

## Paso a paso (ciclo completo)
1. El cliente aprueba en Mi Auto y los repuestos quedan **reservados** para esa OT.
2. El técnico los pide y almacén pulsa **Entregar**: el stock baja y queda en el kardex.
3. Si un producto baja del mínimo, aparece en alertas con la compra sugerida.
4. **Generar órdenes de compra** agrupa por proveedor.
5. Al llegar la mercadería, **Recibir**:
   - El stock sube.
   - Las OT que esperaban esa pieza se **destraban solas**.
   - El cliente recibe un aviso: "Llegó el repuesto".

## Guion
| Escena | En pantalla | Narración | Dur. |
|---|---|---|---|
| 1 | Catálogo con "en mano · reservado · disponible" | "Rosa ve tres números claros: lo que hay, lo que ya está comprometido con un auto y lo que realmente puede usar." | 0:08 |
| 2 | Pestaña "Pedidos de OT" → "Entregar" | "Cuando un técnico pide, ella entrega y el stock se descuenta solo." | 0:09 |
| 3 | "Alertas de mínimos" → "Generar órdenes de compra" | "Lo que se acaba, el sistema lo pide antes de que falte." | 0:09 |
| 4 | Compras → "Recibir mercadería" → aviso "OT destrabadas" | "Y cuando llega, el auto que esperaba esa pieza vuelve a avanzar." | 0:09 |
| 5 | Kardex | "Todo queda registrado: qué, cuánto, quién y para qué auto." | 0:05 |

## Datos de ejemplo
- Sin stock: amortiguador delantero Accent (OT 071098 detenida), discos de freno Yaris. Compra en camino: OC-0013 a Autopartes del Sur.

## Mensaje clave
Repuesto que sale, repuesto que se cobra.
