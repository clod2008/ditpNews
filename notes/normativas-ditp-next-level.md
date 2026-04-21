# Normativas — Think Thailand: Next Level 2026
**DITP Argentina · ditp.com.ar/next-level**

> Versión 3.0 · Fuente: thinkthailand.ditp.go.th + capturas reales del sitio oficial  
> Audiencia: B2C + B2B · Argentina  
> Tono visual: Blanco/crema · Rojo Thai · Azul Thai · Degradado azul→magenta · Sans-serif condensed bold

---

## Índice

1. [Concepto rector](#1-concepto-rector)
2. [El sitio oficial](#2-el-sitio-oficial)
3. [Paleta de colores](#3-paleta-de-colores)
4. [Sistema de degradados](#4-sistema-de-degradados)
5. [Sistema tipográfico](#5-sistema-tipográfico)
6. [Embajadores oficiales 2026](#6-embajadores-oficiales-2026)
7. [Marcas destacadas](#7-marcas-destacadas)
8. [Assets reales — URLs oficiales DITP](#8-assets-reales--urls-oficiales-ditp)
9. [Estructura de la landing](#9-estructura-de-la-landing)
10. [Tono de comunicación](#10-tono-de-comunicación)
11. [Links oficiales y redes sociales](#11-links-oficiales-y-redes-sociales)
12. [Lo que no hacer](#12-lo-que-no-hacer)

---

## 1. Concepto rector

Todo elemento visual y de copy debe responder una pregunta:  
**¿Esto comunica que Tailandia innova desde su identidad, no a pesar de ella?**

El sitio oficial define la campaña como:
> *"Elevating Thai Products, Expanding into New Markets, Advancing to the Global Stage."*

El concepto central es **"Thainess with a Twist"** — de lo tradicional a lo contemporáneo sin perder identidad. El registro correcto es contemporáneo, global y confiable. El azul profundo y el degradado de la campaña evocan ambición, tecnología y alcance global.

### Los tres pilares

| Pilar | Definición |
|-------|-----------|
| **01 · Identidad** | Moda, wellness y gastronomía con raíces culturales tailandesas reales como ventaja competitiva, no como curiosidad turística. |
| **02 · Innovación** | Productos que compiten por diseño, creatividad y estándares internacionales: PM Award, DEmark, T-Mark, Thai SELECT. |
| **03 · Proyección global** | "Next Level" = apertura a nuevos mercados. Para Argentina: Tailandia como socio comercial y cultural. |

---

## 2. El sitio oficial

**URL de referencia primaria:** https://thinkthailand.ditp.go.th/home-en  
**Artículo de lanzamiento:** https://thinkthailand.ditp.go.th/articles1-en

### Estructura visual observada en el sitio real

- **Navbar:** fondo azul oscuro `#0D1B55`, logo blanco, tipografía condensed bold uppercase
- **Hero:** degradado azul→púrpura→magenta (135°), texto blanco, wordmark display bold
- **Grid embajadores:** tres portraits en fondo gris neutro `#EBEBEB`, sector tag azul en esquina superior
- **Secciones de contenido:** fondo crema/blanco, texto negro, tipografía body regular
- **Footer:** fondo azul oscuro, links blancos

### Texto oficial de lanzamiento (23 enero 2026)
Fuente autorizada para adaptar el copy en español:

> "Advancing Thai products into new markets and expanding their reach worldwide. The campaign supports Thai entrepreneurs by strengthening confidence in the quality of Thai products and services while creating opportunities to broaden market access on a global scale with quality assured by the Department of International Trade Promotion (DITP)."

---

## 3. Paleta de colores

### Primarios de marca

| Nombre | Hex | Uso |
|--------|-----|-----|
| **Thai Red** | `#C1281C` | CTAs, sector tags, acentos, bordes activos |
| **Red Dark** | `#8C1C13` | Hover sobre rojo, texto sobre rojo claro |
| **Thai Blue** | `#1B2E8C` | Navbar, badges, acentos tipográficos, botones secundarios |
| **Blue Dark** | `#0D1B55` | Fondo navbar, inicio del degradado hero |

> ⚠️ **Corrección v3:** el azul marino tailandés es tan primario como el rojo. Aparece en navbar, hero y badges en el sitio real. No puede omitirse de la paleta.

### Degradado hero — Paradas de color

| Posición | Nombre | Hex |
|----------|--------|-----|
| 0% | Blue Dark | `#0D1B55` |
| 30% | Thai Blue | `#1B2E8C` |
| 65% | Purple | `#6B2D9B` |
| 100% | Magenta | `#B81F6E` |

### Neutros y soporte

| Nombre | Hex | Uso |
|--------|-----|-----|
| **Editorial Black** | `#1A1A18` | Títulos sobre fondo claro. Nunca `#000000` puro. |
| **Warm Cream** | `#F8F5EF` | Fondo de secciones de contenido |
| **Photo Gray** | `#EBEBEB` | Fondo de fotos de embajadores (cutout) |
| **Gold** | `#C49A3C` | Acento "X" en logo. Certificaciones. Uso mínimo. |

### Combinaciones válidas

- ✅ Blanco sobre degradado azul→magenta (sección hero)
- ✅ Negro / `#1A1A18` sobre crema `#F8F5EF` (cuerpo de texto)
- ✅ Blanco sobre azul oscuro `#0D1B55` (navbar, footer)
- ❌ Fondo negro sólido como base del hero (el fondo oscuro siempre es el degradado)
- ❌ Texto largo sobre rojo sólido (el rojo solo en botones, eyebrows y elementos acento)

---

## 4. Sistema de degradados

El degradado hero es el elemento visual más distintivo de la campaña 2026.

### CSS

```css
background: linear-gradient(135deg, #0D1B55 0%, #1B2E8C 30%, #6B2D9B 65%, #B81F6E 100%);
```

### Reglas de uso

| Contexto | Regla |
|----------|-------|
| **Hero de la landing** | Fondo completo del hero. Texto siempre blanco encima. Dirección 135°. |
| **Navbar y footer** | Usar el extremo `#0D1B55` como sólido — consistente con el inicio del degradado. |
| **CTA final** | El bloque de CTA final puede repetir el degradado para coherencia visual. |
| **Secciones de contenido** | ❌ No usar el degradado en secciones con texto largo. Solo crema/blanco. |
| **Dirección** | ❌ No invertir. Siempre azul arriba/izquierda → magenta abajo/derecha. |

---

## 5. Sistema tipográfico

> ⚠️ **Corrección v3:** la wordmark del sitio usa una sans-serif condensada bold de alta tensión — no serif elegante ni IBM Plex Sans genérica.

### Fuente 1 — Display / Wordmark

**Barlow Condensed**  
- Pesos: `700 Bold` · `800 ExtraBold`  
- Fuente: Google Fonts · Libre y gratuita  
- Alternativas: Bebas Neue (solo display), DM Sans Bold

**Cuándo usar:**  
H1 hero (52–80px), H2 secciones (32–48px), nombres de embajadores en cards, marcas de productos, cualquier texto que requiera impacto visual.  
**Siempre en `uppercase`.**

**Especificaciones:**
```css
font-family: 'Barlow Condensed', sans-serif;
font-weight: 800;
text-transform: uppercase;
letter-spacing: 0.04em;
```

### Fuente 2 — Body / UI

**Barlow**  
- Pesos: `300 Light` · `400 Regular` · `600 SemiBold` · `700 Bold`  
- Fuente: Google Fonts · Libre y gratuita

| Variante | Uso | Especificaciones |
|----------|-----|-----------------|
| Light 300 | Body text, descripciones largas | 15–17px, leading 1.85 |
| Regular 400 | Texto de interfaz, navegación | 14–15px, leading 1.7 |
| SemiBold 600 | Labels de sector, subtítulos | 12–13px, uppercase, tracking 0.08em |
| Bold 700 | Eyebrows, CTAs, botones | 11–13px, uppercase, tracking 0.10–0.18em |

> `uppercase` solo en eyebrows, sector tags y botones CTA. **Nunca en párrafos de texto largo.**

### Acento dorado en la "X" de NEXT

La "X" de "NEXT LEVEL" aparece en color dorado `#C49A3C` en la wordmark del sitio oficial.  
- Solo aplicar en la wordmark hero principal
- No extender el dorado a otros caracteres
- No usar en texto corrido

```css
/* Ejemplo CSS para la wordmark */
.wordmark .x-accent { color: #C49A3C; }
```

### Qué NO usar

| ❌ No usar | ✅ Usar en cambio |
|-----------|-----------------|
| Cormorant Garamond | Barlow Condensed 800 |
| Playfair Display | Barlow Condensed 800 |
| Serif italics en display | Condensed bold uppercase |
| IBM Plex Sans como display | Barlow Condensed como display |

---

## 6. Embajadores oficiales 2026

Fuente: artículo oficial DITP, 23 enero 2026  
https://thinkthailand.ditp.go.th/articles1-en

> Las fotos del sitio real muestran **cutouts sobre fondo gris neutro `#EBEBEB`**, formato portrait vertical 3:4. Sector tag en azul Thai sobre la foto, esquina superior izquierda.

---

### Pancake Khemanit Jamikorn
**Sector: Moda · Fashion**  
**Credenciales:** Thai Supermodel Contest · Model of the World

**Bio oficial (ES):**  
Modelo y actriz tailandesa, ganadora del Thai Supermodel Contest y Model of the World. Con amplia experiencia en pasarelas internacionales, representa a la moda tailandesa como fusión de herencia cultural, creatividad y diseño contemporáneo. Comunica la fortaleza y el potencial de la industria de la moda tailandesa a consumidores, socios e inversores globales, destacando que los productos de moda tailandesa son distintivos, estilizados y plenamente competitivos en el mercado internacional.

**Especificaciones visuales de foto:**
- Fondo: gris neutro claro `#EBEBEB`
- Ratio: 3:4 portrait · cutout o fondo liso
- Alta clave · sin filtros oscuros
- Sin overlay de ningún color sobre el rostro
- Caption: *"Moda · DITP 2026"*

---

### Popor Sapsiree Taerattanachai
**Sector: Health & Wellness**  
**Credenciales:** Campeona Mundial de Bádminton · Múltiple World Tour titleholder · Ex N°1 en dobles mixtos

**Bio oficial (ES):**  
Integrante del equipo nacional de bádminton de Tailandia. Campeona mundial y múltiple ganadora del World Tour que alcanzó el ranking N°1 en dobles mixtos. Representa la credibilidad y el continuo crecimiento del sector de salud y wellness tailandés a través de su imagen de fortaleza, expertise y profesionalismo reconocidos en el escenario global. Refleja el potencial a largo plazo de Tailandia como hub líder en turismo médico y de bienestar. Los productos y servicios de salud y wellness tailandeses se destacan por su integración holística de healthcare, cultura, belleza, seguridad y estándares certificados internacionalmente.

**Especificaciones visuales de foto:**
- Fondo: gris neutro claro `#EBEBEB`
- Ratio: 3:4 portrait · outfit wellness/elegante (blanco en el sitio real)
- Alta clave · paleta limpia: blancos, cielos, verdes
- Sin overlay sobre el rostro
- Caption: *"Wellness · DITP 2026"*

---

### Bie Thassapak Hsu · 毕书尽
**Sector: Gastronomía · Food**  
**Credenciales:** Cantante y actor tailandés · Mercado chino / entretenimiento asiático

**Bio oficial (ES):**  
Cantante y actor tailandés que ha logrado gran éxito en la industria del entretenimiento chino bajo el nombre 毕书尽. Actúa como puente cultural conectando la gastronomía tailandesa con consumidores internacionales. A través de una comunicación alineada con las tendencias alimentarias globales, refuerza la confianza en los productos alimentarios tailandeses que continúan evolucionando en calidad, innovación, creatividad y sustentabilidad. La foto del sitio oficial lo muestra con frutas y productos alimentarios tailandeses sobre fondo neutro.

**Especificaciones visuales de foto:**
- Fondo: gris neutro claro `#EBEBEB`
- Ratio: 3:4 portrait · con props de productos alimentarios
- Paleta: cálida, natural, luminosa
- Sin overlay sobre el rostro
- Caption: *"Gastronomía · DITP 2026"*

---

## 7. Marcas destacadas

### Sector Fashion (extraídas del sitio oficial)

| Marca | Empresa | Descripción | Link |
|-------|---------|-------------|------|
| **RUKBATIK** | JULNUT COMPANY LIMITED | Batik contemporáneo con motivos Lanna. Telas teñidas con hierbas naturales locales. Sustentable, con identidad cultural profunda. | [rukbatik.com](http://www.rukbatik.com) |
| **RIVA by Frank Weeneggsinn** | The Best Creation Co., Ltd. | Reinterpretación del smocking victoriano para guardarropas contemporáneos. Artesanía con siluetas modernas y versátiles para uso cotidiano. | [@frankweeneggsinn](https://www.instagram.com/frankweeneggsinn) |
| **SUNTREE** | Suntree Handmade Fabric Limited Partnership | Textiles Thai Puan tejidos a mano desde Sukhothai. Gender-inclusive, siluetas limpias. Colaboración directa con comunidades artesanas locales. | [suntreestyle.com](https://www.suntreestyle.com/) |
| **mohhomphrae** | NAT CRAFT limited partnership | Índigo natural GI certificado de Phrae. Filosofía zero-waste, patchwork y bordado familiar. Folk fashion contemporáneo sustentable. | [mohhomphrae.com](http://www.mohhomphrae.com/) |

### Sector Wellness y Food — Pendiente

> ⚠️ El sitio oficial carga las secciones de Health & Wellness y Food por JavaScript al hacer scroll. No pudieron fetchearse automáticamente.  
> **Acción requerida:** revisar manualmente en https://thinkthailand.ditp.go.th/home-en scrolleando hasta esas secciones para obtener nombres de marcas, imágenes y links.

---

## 8. Assets reales — URLs oficiales DITP

Todas las imágenes son públicas del servidor DITP.  
> **Recomendación:** descargar y re-hostear en `ditp.com.ar` para evitar dependencias externas.

| Asset | URL completa | Uso sugerido |
|-------|-------------|--------------|
| Logo Think Thailand (blanco) | `https://thinkthailand.ditp.go.th/_assets/v11/85ed635ebfb14f21d8d50f38f682e7c7c6af3385.png` | Header navbar · Footer oscuro |
| Logo DITP color | `https://thinkthailand.ditp.go.th/_assets/v11/d3a4cfa253b05b981651f7a6ae4f22aa65b2f44a.png` | Sección institucional sobre claro |
| Imagen principal campaña 2026 | `https://thinkthailand.ditp.go.th/_assets/v11/9e0a5b0cb5a4a6d541a8e1b73c42a22c750380cf.png` | Hero o sección de campaña |
| Imagen grupal embajadores | `https://thinkthailand.ditp.go.th/_assets/v11/3b158cdf9339a2437b842da508ff929f154bc621.png` | Sección embajadores / hero |
| Imagen campaña secundaria | `https://thinkthailand.ditp.go.th/_assets/v11/e2aee7f9138aa99cd419bd59c2f7b2f80129ae5e.png` | Sección about / contexto DITP |
| Hero artículo lanzamiento | `https://thinkthailand.ditp.go.th/_assets/v11/40df774abe8adbaead55262e53fb419e3d6f7e23.png` | Artículo oficial / hero alternativo |
| Producto RUKBATIK | `https://thinkthailand.ditp.go.th/_assets/v11/0253e8085c22fcd21a9bf292d31a92ef6180b915.png` | Sección de marcas / Fashion |
| Producto RIVA | `https://thinkthailand.ditp.go.th/_assets/v11/8f53408f662d6f6faec1c0fb3dc0d7287de3a447.png` | Sección de marcas / Fashion |
| Producto SUNTREE | `https://thinkthailand.ditp.go.th/_assets/v11/b5d44cc24799311f574456db50feb4fefbc2cbf8.png` | Sección de marcas / Fashion |
| Producto mohhomphrae | `https://thinkthailand.ditp.go.th/_assets/v11/3c4f127632ad2134f95392d33e53083c4618a8c3.png` | Sección de marcas / Fashion |

---

## 9. Estructura de la landing

URL destino de campaña: `https://www.ditp.com.ar/next-level`

### Sección 1 — Hero: Degradado + Wordmark
- **Fondo:** degradado azul→magenta (135°)
- **Contenido:** Logo oficial + título condensed bold en español + tagline institucional
- **Media:** video de campaña o imagen principal `9e0a...png`
- **CTA principal:** botón blanco sobre azul → scroll a embajadores
- **Assets:** Logo `85ed...png` · Imagen `9e0a...png` · Video YouTube @ditpfamily

### Sección 2 — Embajadores: Grid 3 portraits
- **Fondo:** crema `#F8F5EF`
- **Contenido:** 3 cards — foto cutout sobre `#EBEBEB` + sector tag azul + nombre display + bio 2-3 líneas
- **Nota:** sección más importante visualmente. No colapsar a 1 columna en mobile.
- **Assets:** Fotos oficiales Pancake · Bie · Popor · Imagen grupal `3b15...png`

### Sección 3 — Sectores + Marcas: Propuesta concreta
- **Fondo:** blanco o alternancia blanco/crema
- **Contenido:** Moda / Wellness / Gastronomía con fotos de productos reales
- **Objetivo:** conectar lo aspiracional (embajadores) con lo tangible (productos)
- **Assets:** Fotos de productos DITP · Links a sitios de marcas reales

### Sección 4 — Sobre la campaña: Contexto DITP
- **Fondo:** crema `#F8F5EF`
- **Contenido:** Párrafo institucional (ES del texto oficial) + certificaciones de calidad
- **Certificaciones a incluir:** Thailand Trust Mark (T-Mark) · Design Excellence Award (DEmark) · Thai SELECT · PM's Export Award
- **Assets:** Logo DITP `d3a4...png` · Logos de certificaciones

### Sección 5 — CTA Final: Doble destino
- **Fondo:** degradado azul→magenta (repite el hero para coherencia visual)
- **Botón 1 (B2C):** → thinkthailand.ditp.go.th
- **Botón 2 (B2B):** → thaitrade.com
- **Regla:** máximo 2 CTAs visibles al mismo tiempo. Sin formulario de contacto en esta versión.

---

## 10. Tono de comunicación

**Regla de oro:** voz directa, afirmativa, sin hipérboles ni exotismo. Funciona igual para B2C y B2B sin cambiar de registro.

### Ejemplos

| ❌ No escribir así | ✅ Escribir así |
|-------------------|----------------|
| "Adentrate en el misterioso y exótico mundo de la cultura tailandesa, donde la sabiduría milenaria se encuentra con la modernidad." | "Tailandia eleva sus productos al escenario global. Moda, wellness y gastronomía con diseño, innovación y calidad certificada." |
| "¡Descubrí los increíbles sabores, colores y tradiciones de Tailandia en un viaje sensorial único e irrepetible!" | "Tres embajadores. Tres sectores. Una sola idea: los productos tailandeses están listos para el mundo." |

### Vocabulario

**✅ Usar:**  
Elevar · Expandir · Descubrí · Conocé · Conectar · Certificar · Innovar · Liderar · Exportar · Presentar · Calidad garantizada · Estándares internacionales · Creatividad · Identidad tailandesa

**❌ Prohibido:**  
Exótico · Misterioso · Ancestral · Milenario (como adjetivo vacío) · Sensorial · Mágico · Increíble · Único (como hipérbole) · Oriental · Exquisito · Viaje sensorial

---

## 11. Links oficiales y redes sociales

Todos extraídos del footer del sitio oficial DITP. Usar exactamente estas URLs en la landing.

| Tipo | Nombre | URL | Uso |
|------|--------|-----|-----|
| Sitio campaña · CTA principal B2C | Think Thailand: Next Level | thinkthailand.ditp.go.th/home-en | Destino principal del tráfico B2C |
| Marketplace B2B · CTA secundario | ThaiTrade.com | thaitrade.com/home | Importadores y empresarios |
| Institucional · Footer | DITP Global | ditp.go.th | Solo en footer de la landing AR |
| Facebook | DITP FAMILY | facebook.com/familyditp | Outbound en footer |
| YouTube · Video campaña | @ditpfamily | youtube.com/@ditpfamily | Videos PMax deben subirse aquí |
| Instagram | @ditpfamily | instagram.com/ditpfamily | Footer · solo outbound links |
| TikTok | @ditp.th | tiktok.com/@ditp.th | Footer · solo outbound links |

### Contacto oficial DITP (para footer)
- **Tel:** 02-507-7999
- **Dirección:** กรมส่งเสริมการค้าระหว่างประเทศ กระทรวงพาณิชย์ · 563 ถนนนนทบุรี ต.บางกระสอ อ.เมือง จ.นนทบุรี 11000
- **Copyright:** © 2025, All Rights Reserved

---

## 12. Lo que no hacer

### Diseño

- ❌ **Omitir el azul de la paleta** — Thai Blue `#1B2E8C` es tan primario como el rojo. Aparece en navbar, hero y badges en el sitio real.
- ❌ **Fondo negro sólido como base del hero** — el fondo oscuro del hero siempre es el degradado azul→magenta, nunca negro liso.
- ❌ **Serif italics como tipografía display** — Cormorant, Playfair, Garamond = luxury occidental. DITP usa condensed bold uppercase.
- ❌ **Invertir la dirección del degradado** — siempre azul arriba/izquierda → magenta abajo/derecha. No al revés.
- ❌ **Aplicar el degradado sobre secciones de texto largo** — solo en hero y CTA final.

### Fotografía

- ❌ **Imágenes de stock turísticas de Tailandia** — ningún templo, elefante, tuk-tuk, flor de loto ni mercado como decoración.
- ❌ **Overlays de color sobre caras de embajadores** — ni duotone, ni rojo, ni dorado sobre las fotos oficiales.
- ❌ **Reencuadrar agresivamente las fotos de producción** — respetar la composición original DITP.

### Copy

- ❌ **Exclamaciones o superlativos vacíos** — "¡Increíble!", "mágico", "exótico", "único e irrepetible".
- ❌ **Más de 2 CTAs visibles al mismo tiempo** — el usuario B2C/B2B mixto se paraliza ante demasiadas opciones.

### Campaña PMax

- ❌ **Final URL expansion ON** — siempre apuntar a `/next-level` con expansion OFF. Con expansion ON Google manda tráfico a otras URLs sin control.
- ❌ **Lanzar PMax sin video en YouTube** — sin video subido a @ditpfamily, Google genera uno automático de baja calidad que quema 20–30% del budget.
- ❌ **Bidding en Maximize Conversions** — usar siempre Maximize Clicks con tCPC `$0.04–0.05` para forzar inventario Display/YouTube y alcanzar las 300k impresiones.

---

*Normativas v3.0 · DITP Argentina · Think Thailand: Next Level 2026*  
*Fuente: thinkthailand.ditp.go.th · Capturas reales del sitio oficial*
