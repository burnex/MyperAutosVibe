# Prompt · Video de 60 s para la gerencia de Gallo Autos

> Estado: **borrador para confirmar**. Aún no se construye el video. Cuando se confirme, este contenido pasa a `BRIEF.md` del proyecto HyperFrames y arranca el flujo `product-launch-video` con storyboard.

## 1. Decisiones confirmadas

| Campo | Valor |
|---|---|
| Objetivo | **Vender**: que la gerencia lo vea, le guste y entre a la demo con el link |
| Público | Gerencia / dueño de Gallo Autos (taller intermedio en La Molina, Lima) |
| Duración | **60 segundos** |
| Formato | **Vertical 9:16** (1080×1920), para verlo en el celular o en WhatsApp |
| Idioma | Español de Perú |
| Audio | **Solo música + textos en pantalla** (sin voz). Debe entenderse incluso sin sonido. |
| Concepto | **Mezcla 4 + 3**: abre con "los números del dueño" (dinero quieto) y el clímax es la pantalla dividida taller ↔ celular del cliente, sincronizados |
| Marca Myper | **Solo al cierre**: "Desarrollado por Myper" con su logo, junto al logo de Gallo Autos y el link |
| Marca del producto | En todas las pantallas del sistema se ve **solo Gallo Autos** |
| Proceso | Flujo automático (`product-launch-video`) **con storyboard**: primero se aprueba el plan escena por escena y los bocetos; después, el video final |

## 2. Mensaje (una sola idea)

**"Tu taller ya hace el trabajo. Gallo Autos ahora te muestra la plata que se te escapa, y la recupera."**

Subidea del clímax: *el cliente aprueba desde su celular, con fotos, y el taller lo ve en ese segundo.*

## 3. Material

| Material | Fuente | Estado |
|---|---|---|
| Pantallas reales de la demo (web, Portal y Mi Auto) | Grabación local con Chrome sin interfaz desde `http://localhost:8000` (no es un sitio público) | Disponible. Se graban al construir |
| Logo de Gallo Autos | `intranet/img/logo1.png` (horizontal, blanco) y `logo2.png` (gallo + texto) | Disponible |
| Fotos reales de piezas | `miauto/img/neb.jpg`, `miauto/img/timon.jpg` | Disponible |
| Logo de Myper | `Myper/myper-logo-color.png` (863×193), `Myper/myper-logo-blanco.png` (860×184), `Myper/isotipo-512.png` (512×512) | Disponible |
| Manual de marca Myper | `Myper/Brandbook-Myper Software.pdf` (2023) | Disponible (reglas en § 4b) |
| **Link de la demo** para la tarjeta final | Lo envía el usuario | **Pendiente** |
| Música | Pista libre de derechos, enérgica pero elegante (corporativa moderna, ~110–120 BPM), resuelta con `/media-use` | Se elige en el storyboard |

**Regla de grabación para 9:16.** El Portal se graba en su vista de **tablet o celular** (es responsive). Cada pantalla se muestra con **acercamientos a la zona que importa** (la tarjeta que se mueve, la cifra que sube). Nunca se muestra una pantalla de escritorio completa encogida. Mi Auto se graba a 390×844 dentro de un marco de celular.

## 4. Diseño

- **Sistema visual:** el mismo de la demo. No se usa una plantilla genérica.
  - Azul Gallo `#2908F1` como color principal.
  - Navy `#0B1B3A` para los fondos oscuros.
  - Amarillo `#FFC800` **solo** para cifras clave y para el llamado final.
  - Fondo claro `#F6F7F9`, Roboto (800–900 en titulares) y bordes redondeados de 14 a 22 px.
- **Textos en pantalla:** de 3 a 6 palabras por frase, legibles en un celular (titulares ≥ 72 px a 1080 de ancho) y dentro de los márgenes seguros de 9:16.
- **Movimiento:**
  - Cortes y apariciones de texto **sobre el ritmo de la música** (análisis de beats).
  - Cifras que **cuentan hacia arriba**.
  - Acercamientos suaves sobre las pantallas.
  - Pantalla dividida (vertical: taller arriba, celular abajo) en el clímax.
  - Transiciones limpias. Nada de efectos de moda que distraigan.
- **Tono:** seguro, elegante, de negocio. Que se sienta como un producto terminado, no como un prototipo.

## 4b. Marca Myper (según su manual, solo en el cierre)

- **Colores corporativos:** azul `#249DF5` y azul intenso `#2357F6`. **Apoyo:** `#3D9BE9`, crema `#FFFCF8` y azul petróleo `#054261`.
- **Combinaciones permitidas:**
  - Logo **a color** sobre crema `#FFFCF8` o sobre azul petróleo `#054261`.
  - Logo **blanco** sobre azul `#2357F6` o sobre celeste `#249DF5`.
  - Nunca sobre fotos ni sobre el azul Gallo `#2908F1`, ni con colores o tipografía modificados.
- **Área de protección:** alrededor del isologo, un espacio libre igual a la altura del isotipo ("X"). **Tamaño mínimo digital:** 100 px de ancho para el isologo.
- **Tagline oficial (opcional en el cierre):** "¡Únete a la transformación digital!", en Rubik semibold, centrado y debajo del isologo, separado en proporción a 30 px.
- **Tipografías:** Autobus Omnibus (solo en el logotipo) y Rubik (textos de Myper). El resto del video usa Roboto, igual que la demo.
- **Cómo se resuelve en el cierre:** la tarjeta final es de Gallo Autos (azul Gallo) con el link. Debajo va una franja **crema `#FFFCF8`** con "Desarrollado por" en Rubik y el **isologo a color** de Myper (≥ 220 px de ancho a 1080 px, con su área de protección). Así se respetan los colores de las dos marcas sin mezclarlas.

## 5. Guion visual propuesto (se ajusta en el storyboard)

| Tiempo | Escena | En pantalla | Texto |
|---|---|---|---|
| 0:00–0:04 | **Gancho** | Fondo navy; una cifra cuenta de S/ 0 a S/ 3,545 en amarillo | "¿Cuánta plata está quieta hoy en tu taller?" |
| 0:04–0:10 | **El dolor** | Tres cifras que entran en el ritmo: 6 · 3 · 1 | "6 clientes que ya debían volver" · "3 días de guardianía sin cobrar" · "1 auto parado por un repuesto" |
| 0:10–0:14 | **El giro** | Logo Gallo Autos + "Portal del taller" | "Todo tu taller. En un solo lugar." |
| 0:14–0:20 | **Recepción** | Recepción en 3 pasos (tablet): placa ADI-388 → datos completos → firma | "Recibe un auto en 1 minuto." |
| 0:20–0:26 | **Tablero** | Acercamiento al tablero; una tarjeta pasa de columna y la roja de atraso se resalta | "Cada auto. Cada técnico. A la vista." |
| 0:26–0:40 | **Clímax: pantalla dividida** | Arriba, el técnico toca "Encontré algo más" → "Precio sugerido S/ 690". Abajo, Mi Auto del cliente muestra el video de la fuga → "Sí" → "Confirmar". Arriba, la tarjeta pasa sola a "En reparación" | "Tu cliente ve la falla." · "Aprueba desde su celular." · "Y tú lo ves al instante." |
| 0:40–0:46 | **Control** | Inventario (en mano · reservado · disponible) → entrega con "Entrega completada" | "Repuesto que sale, repuesto que se cobra." |
| 0:46–0:52 | **El resultado** | Tablero del dueño: ingresos de 30 días cuentan hacia arriba; recordatorios "Enviar a todos" | "Clientes que vuelven. Ingresos que se ven." |
| 0:52–0:60 | **Cierre + llamado** | Logo Gallo Autos; botón amarillo "Prueba la demo" + link. Al final entra la franja crema con "Desarrollado por" + isologo de Myper a color (opcional: tagline "¡Únete a la transformación digital!") | "Pruébalo tú mismo." |

Las cifras salen de los datos de la demo el día de la grabación (S/ 3,545 por aprobar, 6 clientes por volver, etc.). Si cambian, el texto se ajusta para que coincida con lo que se ve.

## 6. Proceso

1. **Storyboard** en un tablero en vivo: plan escena por escena → bocetos → aprobación.
2. Grabación de las pantallas, música y construcción.
3. Revisión del video completo → ajustes → render MP4 1080×1920.

## 7. Pendiente del usuario

- [x] Logo de Myper y manual de marca (carpeta `Myper/`).
- [ ] ¿Incluimos el tagline "¡Únete a la transformación digital!" debajo del logo de Myper?
- [ ] Link exacto de la demo para la tarjeta final.
- [ ] (Opcional) Texto del llamado final, si no es "Prueba la demo".

## 8. Lo que asumí (corrígelo si no aplica)

- La tarjeta final muestra el link escrito. No lleva código QR, porque en 9:16 se verá en el mismo celular. Se puede agregar QR si lo proyectarán en una reunión.
- La música es libre de derechos y sin letra.
- No se muestran nombres reales de personas de Gallo Autos. El equipo de la demo es ficticio.
- Myper no aparece antes del cierre, ni como marca de agua.
