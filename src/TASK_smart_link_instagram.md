# Tarea: ruta "Smart Link" a Instagram (campaña Thai Mali Rice 2026)

## Contexto

DITP va a imprimir un QR (campaña **Thai Mali Rice 2026**) que tiene que llevar al celular directo a un Reel o post de Instagram — si el usuario tiene la app instalada, que abra la app; si no, que lo muestre en el navegador. El posteo real **todavía no existe** (Claudio lo va a crear más adelante), así que el sistema tiene que permitir asignar/cambiar el contenido de destino sin tocar código ni redeployar.

Este repo (`ditpNews`) es el sitio `ditp.com.ar` — Create React App + `react-router-dom` v6, deploy en Vercel (`vercel.json`: `framework: create-react-app`). Ya tiene precedente de embeber Instagram acá (`src/components/CampaignModal/IgReelEmbed.jsx`, usa `react-social-media-embed`) — pero eso es para *mostrar* un reel embebido dentro de una página, no lo que necesitamos acá (una redirección tipo "deep link con fallback").

## Pieza externa que ya existe y ya se probó

Ya se armó y probó (en un entorno de test, con un post real de otra cuenta como demo) la lógica de redirección en vanilla JS. Vive hoy como HTML standalone en el vault de Apsis:
`Clientes/DITP - TTC-BA/Campaña Thai Mali Rice 2026/smart-link-instagram-template.html`

Lógica validada (confirmado que `window.location.href` termina en la URL correcta de Instagram):
- Lee `type` (`reel` o `p`) y `code` (shortcode de Instagram) de la query string.
- **Android:** navega a un `intent://` explícito con `package=com.instagram.android` y `browser_fallback_url` — si la app no está instalada, Chrome cae solo al link web, sin JS extra.
- **iOS y el resto:** navega directo a `https://www.instagram.com/{type}/{code}/` — Universal Links de Apple ya abren la app si está instalada, o el navegador si no.
- Red de seguridad: si a los 2.5s la página sigue visible (nada se abrió), fuerza el fallback web y muestra un link tocable manual.
- Si no hay `code` en la query string, muestra "todavía no hay posteo asignado" en vez de redirigir a cualquier lado.

**La tarea acá es portar esa misma lógica a un componente de React dentro de este repo**, no reinventarla — el archivo de arriba es la fuente de verdad del comportamiento.

## Por qué es paramétrico (no hardcodeado)

El destino (`type` + `code`) se define en la **query string de la URL**, no en el código. Eso permite que el "dónde está definido el post a usar" viva en un solo lugar externo y editable sin redeploy: la columna B del Google Sheet que ya usa el shortener `qrg` (ver más abajo). Cuando el Reel/post real se publique, alcanza con editar esa celda del Sheet — el componente de React no cambia.

## Qué hacer en este repo

1. **Nueva ruta**, sugerida `/smart-link` (o el nombre que prefiera el equipo — no hay convención estricta, las rutas existentes en `src/data/cont.js` → objeto `paths` son bastante libres: `bm2024`, `bbm2025`, `festival-muay-thai-2024`, etc.).
   - Agregar la entrada en `paths` (`src/data/cont.js`).
   - Agregar el `<Route>` correspondiente en `src/App.jsx` (junto a las demás, antes del catch-all `/*`).

2. **Nuevo componente de página**, ej. `src/pages/SmartLink.jsx`:
   - Leer `type` y `code` con `useSearchParams()` de `react-router-dom` (ya es dependencia del proyecto).
   - Portar la lógica de `intent://` (Android) / link directo (iOS y resto) / timeout de seguridad, tal como está en el HTML de referencia.
   - Pantalla de carga a pantalla completa: fondo azul DITP, isotipo, spinner, texto "Abriendo Instagram…".
   - **Ojo con el color:** `src/scss/color.scss` de este repo solo tiene la paleta de "Muay Thai Fest 2024" (`$blueStrong-hex: #01095a`, etc.) — **no es el azul oficial de DITP**. El azul correcto es `#0A459B` (DITP Blue, confirmado contra el manual de marca de 94 páginas del cliente — ver `Brand_Guidelines.md` en el vault). No reusar por accidente el azul de Muay Thai.
   - El logo ya existe importado en este repo: `ditpIsoLogo` / `ditpIso` en `src/assets/index.js` (`svg/ditpIsoLogo.svg`, `svg/ditpIso.svg`) — usar ese en vez de traer uno nuevo.
   - **Decisión pendiente de diseño:** `App.jsx` envuelve todas las rutas con `<NavBar>` arriba y `<FooterPage>` abajo de forma incondicional. Para esta ruta lo ideal es una pantalla completa sin navbar/footer (es una redirección de un segundo, no una página de contenido) — evaluar si conviene sacar esta ruta de ese wrapper o si se acepta que el navbar quede visible un instante. No es bloqueante, pero repórtalo como decisión tomada cuando se implemente.
   - Si `code` no viene en la URL: mostrar un estado simple ("todavía no hay un posteo asignado a este link"), no redirigir a nada ni romper.

3. **No tocar el repo `qrg`** (`https://github.com/clod2008/qrg`) — es el shortener que ya administra todos los códigos QR (Node/Express + Google Sheets, redirect 302 puro). Claudio está trabajando otras cosas ahí y pidió no modificarlo sin autorización. No hace falta: la única conexión necesaria es que, cuando esta ruta esté deployada, la columna B del Sheet de `qrg` para el código de esta campaña apunte a:
   ```
   https://www.ditp.com.ar/smart-link?type=reel&code=CODIGO_DEL_REEL
   ```
   (o `type=p` si termina siendo un post de feed en vez de un reel). Ese valor se actualiza en el Sheet el día que el contenido esté publicado — `qrg` ya relee los mapeos en cada request, sin redeploy de ningún lado.

## Cómo probarlo sin depender de `qrg` ni de un post real

Andá directo a `/smart-link?type=p&code=ABC123` con un shortcode público cualquiera y confirmá que `window.location` termina en `https://www.instagram.com/p/ABC123/`. Así se validó la versión HTML de referencia.

## Fuera de alcance por ahora

- Tracking/analytics de escaneos (Claudio lo mencionó como fase 2, no lo pidió todavía).
- Cualquier cambio en `qrg`.
