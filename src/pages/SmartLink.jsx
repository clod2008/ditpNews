import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import QRCode from "qrcode";
import { ditpIso } from "../assets";
import { paths } from "../data/cont";
import styles from "./SmartLink.module.scss";

// Datos de ejemplo por tipo, para el placeholder del campo y el bloque de
// ayuda "¿de dónde saco esto?" — se actualizan según el radio elegido.
// Dejó de ser solo Instagram (se sumó "url" para links externos), pero el
// nombre IG_TYPE_INFO se mantiene por historia — no vale la pena el churn.
const IG_TYPE_INFO = {
  reel: {
    label: "Reel",
    fieldLabel: "el código",
    placeholder: "Pegá el link del Reel o solo el código",
    urlSample: "https://www.instagram.com/reel/DA1b2C3dEfG/",
    valueSample: "DA1b2C3dEfG",
  },
  p: {
    label: "Post",
    fieldLabel: "el código",
    placeholder: "Pegá el link del posteo o solo el código",
    urlSample: "https://www.instagram.com/p/CxYz9AbCdEf/",
    valueSample: "CxYz9AbCdEf",
  },
  profile: {
    label: "Perfil",
    fieldLabel: "el usuario",
    placeholder: "Pegá el link del perfil o el usuario",
    urlSample: "https://www.instagram.com/ditp.thailand/",
    valueSample: "ditp.thailand",
  },
  url: {
    label: "Link externo",
    fieldLabel: "la URL",
    placeholder: "Pegá la URL completa (https://...)",
    urlSample: "https://www.ditp.com.ar/promo-especial",
    valueSample: "https://www.ditp.com.ar/promo-especial",
  },
};

// Segmentos de instagram.com que NO son un usuario de perfil — evita que
// "instagram.com/explore/..." se interprete como el perfil "explore".
const IG_NON_PROFILE_PATHS = new Set([
  "p",
  "reel",
  "reels",
  "tv",
  "stories",
  "explore",
  "accounts",
  "direct",
  "about",
  "legal",
]);

// Deja pegar el link completo de Instagram (con o sin https://, con o sin
// query string tipo ?img_index=1) en vez de tener que ir a buscar el código
// a mano — engorroso sobre todo desde el celular. Si lo que se pegó no es
// una URL de instagram.com, devuelve null y el campo se trata como código
///usuario suelto (comportamiento de siempre).
const parseInstagramInput = (raw) => {
  const trimmed = raw.trim();
  if (!/instagram\.com/i.test(trimmed)) return null;

  let pathname;
  try {
    const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    pathname = new URL(withProtocol).pathname;
  } catch {
    return null;
  }

  const [first, second] = pathname.split("/").filter(Boolean);
  if (!first) return null;

  if ((first === "p" || first === "reel") && second) {
    return { type: first, code: second };
  }
  if (!IG_NON_PROFILE_PATHS.has(first)) {
    return { type: "profile", code: first };
  }
  return null;
};

// Para type "url": si pegaron el dominio sin protocolo (ej. "ditp.com.ar/promo")
// le suma https:// solo — evita links rotos por un olvido común al pegar rápido.
const normalizeExternalUrl = (raw) => {
  const trimmed = raw.trim();
  if (!trimmed) return "";
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
};

// Opciones de color del código del QR — el fondo siempre va transparente
// (alpha 00), independientemente del color elegido.
const QR_COLORS = {
  black: { label: "Negro", swatch: "#000000", dark: "#000000ff" },
  white: { label: "Blanco", swatch: "#ffffff", dark: "#ffffffff" },
  blue: { label: "Azul DITP", swatch: "#0A459B", dark: "#0A459Bff" },
};
const QR_TRANSPARENT_BG = "#ffffff00";

// Rangos de fecha para el panel de estadísticas — presets en vez de un
// calendario, más rápido de usar con el pulgar en celular.
const DATE_RANGES = {
  today: { label: "Hoy", days: 0 },
  "7d": { label: "7 días", days: 7 },
  "30d": { label: "30 días", days: 30 },
  all: { label: "Todo", days: null },
};

// Ícono de refrescar (feather-icons "refresh-cw", inline para no sumar una
// dependencia solo por un ícono) — gira mientras stats está cargando.
const RefreshIcon = ({ spinning }) => (
  <svg
    className={`${styles.statsRefreshIcon} ${
      spinning ? styles.statsRefreshIconSpinning : ""
    }`}
    viewBox='0 0 24 24'
    width='18'
    height='18'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
  >
    <polyline points='23 4 23 10 17 10' />
    <polyline points='1 20 1 14 7 14' />
    <path d='M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15' />
  </svg>
);

// Panel de estadísticas: pega contra /api/scan-stats (misma protección que
// el constructor, ?admin=CLAVE) y muestra el total de escaneos reales
// (evento "scan", "fallback" no cuenta) agrupados por tipo.
const ScanStats = () => {
  const [range, setRange] = useState("7d");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // "" = agregado de todos los códigos. Se resetea al cambiar de rango,
  // porque un código puede no tener escaneos en el rango nuevo.
  const [selectedCode, setSelectedCode] = useState("");
  // Se incrementa al tocar el botón de refrescar — no cambia nada del
  // request en sí, solo re-dispara el fetch de abajo sin recargar la página.
  const [refreshTick, setRefreshTick] = useState(0);

  // Aparte del fetch: el código seleccionado solo se resetea al cambiar de
  // rango (puede no tener escaneos en el rango nuevo), no en cada refresh.
  useEffect(() => {
    setSelectedCode("");
  }, [range]);

  useEffect(() => {
    const adminKey = process.env.REACT_APP_SMART_LINK_ADMIN_KEY;
    if (!adminKey) return;

    const params = new URLSearchParams({ admin: adminKey });
    const { days } = DATE_RANGES[range];
    if (days !== null) {
      const from = new Date();
      from.setDate(from.getDate() - days);
      from.setHours(0, 0, 0, 0);
      params.set("from", from.toISOString());
    }

    let cancelled = false;
    setLoading(true);
    setError(false);

    fetch(`/api/scan-stats?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (data.ok) setStats(data);
        else setError(true);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [range, refreshTick]);

  const selectedEntry = selectedCode
    ? stats?.byCode.find((c) => `${c.type}:${c.code}` === selectedCode)
    : null;
  const displayTotal = selectedEntry ? selectedEntry.total : stats?.total;
  const displayUnique = selectedEntry ? selectedEntry.uniqueTotal : stats?.uniqueTotal;

  return (
    <div className={styles.statsBlock}>
      <div className={styles.statsHeader}>
        <h2 className={styles.statsTitle}>Escaneos</h2>
        <button
          type='button'
          className={styles.statsRefreshButton}
          onClick={() => setRefreshTick((t) => t + 1)}
          disabled={loading}
          aria-label='Actualizar estadísticas'
        >
          <RefreshIcon spinning={loading} />
        </button>
      </div>

      <div className={styles.statsRangeGroup}>
        {Object.entries(DATE_RANGES).map(([key, { label }]) => (
          <button
            key={key}
            type='button'
            className={`${styles.statsRangeOption} ${
              range === key ? styles.statsRangeOptionActive : ""
            }`}
            onClick={() => setRange(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div aria-live='polite'>
        {loading && !stats && <p className={styles.statsHint}>Cargando…</p>}
        {error && !stats && (
          <p className={styles.statsHint}>No se pudieron cargar los datos.</p>
        )}
        {error && stats && (
          <p className={styles.statsHint}>
            No se pudo actualizar — mostrando los últimos datos.
          </p>
        )}
      </div>

      {stats && (
        <>
          {stats.byCode.length > 0 && (
            <select
              className={styles.statsCodeSelect}
              value={selectedCode}
              onChange={(e) => setSelectedCode(e.target.value)}
            >
              <option value=''>Todos los códigos ({stats.byCode.length})</option>
              {stats.byCode.map((c) => (
                <option key={`${c.type}:${c.code}`} value={`${c.type}:${c.code}`}>
                  {IG_TYPE_INFO[c.type]?.label || c.type} · {c.code} — {c.total}{" "}
                  {c.total === 1 ? "escaneo" : "escaneos"}
                </option>
              ))}
            </select>
          )}

          <div className={styles.statsHeadlineRow}>
            <div className={styles.statsHeadline}>
              <span className={styles.statsTotal}>{displayTotal}</span>
              <span className={styles.statsTotalLabel}>Escaneos totales</span>
            </div>
            <div className={styles.statsHeadline}>
              <span className={styles.statsTotal}>{displayUnique}</span>
              <span className={styles.statsTotalLabel}>Usuarios únicos</span>
            </div>
          </div>

          {selectedEntry ? (
            selectedEntry.destination && (
              <code className={styles.statsSelectedDestination}>
                {selectedEntry.destination}
              </code>
            )
          ) : (
            <div className={styles.statsGrid}>
              <div className={styles.statsCard}>
                <span className={styles.statsCardValue}>{stats.byType.p}</span>
                <span className={styles.statsCardLabel}>Posts</span>
              </div>
              <div className={styles.statsCard}>
                <span className={styles.statsCardValue}>{stats.byType.reel}</span>
                <span className={styles.statsCardLabel}>Reels</span>
              </div>
              <div className={styles.statsCard}>
                <span className={styles.statsCardValue}>{stats.byType.profile}</span>
                <span className={styles.statsCardLabel}>Perfiles</span>
              </div>
              <div className={styles.statsCard}>
                <span className={styles.statsCardValue}>{stats.byType.url}</span>
                <span className={styles.statsCardLabel}>Links externos</span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Constructor manual: se muestra en /smart-link cuando no viene type/code en
// la URL, para armar y copiar el link una vez que el Reel/post/perfil ya existe.
const SmartLinkBuilder = () => {
  const [type, setType] = useState("reel");
  const [code, setCode] = useState("");
  const [stayMode, setStayMode] = useState(false);
  const [qrColor, setQrColor] = useState("black");
  const [copied, setCopied] = useState(false);
  const [qrSvg, setQrSvg] = useState("");

  const info = IG_TYPE_INFO[type];
  const trimmedCode =
    type === "url" ? normalizeExternalUrl(code) : code.trim().replace(/^@/, "");
  const basePath = `${window.location.origin}/${paths.smartLink}`;
  // Para el nombre de archivo del QR: una URL completa tiene barras y puntos
  // que no sirven como nombre de archivo, así que se recorta a algo legible.
  const fileSlug =
    type === "url"
      ? trimmedCode.replace(/^https?:\/\//i, "").replace(/[^a-zA-Z0-9]+/g, "-").slice(0, 40)
      : trimmedCode;
  // El QR siempre codifica el link REAL (sin &stay=1), sea cual sea el modo
  // elegido arriba — no tiene sentido imprimir un QR que no redirige.
  const qrLink = trimmedCode
    ? `${basePath}?type=${type}&code=${encodeURIComponent(trimmedCode)}`
    : "";
  const generatedLink = trimmedCode ? `${qrLink}${stayMode ? "&stay=1" : ""}` : "";

  useEffect(() => {
    if (!qrLink) {
      setQrSvg("");
      return;
    }
    let cancelled = false;
    QRCode.toString(qrLink, {
      type: "svg",
      margin: 1,
      color: { dark: QR_COLORS[qrColor].dark, light: QR_TRANSPARENT_BG },
    })
      .then((svg) => {
        if (!cancelled) setQrSvg(svg);
      })
      .catch(() => {
        if (!cancelled) setQrSvg("");
      });
    return () => {
      cancelled = true;
    };
  }, [qrLink, qrColor]);

  const handleDownloadSvg = () => {
    if (!qrSvg) return;
    const blob = new Blob([qrSvg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `smart-link-${type}-${fileSlug}-${qrColor}.svg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPng = async () => {
    if (!qrLink) return;
    const dataUrl = await QRCode.toDataURL(qrLink, {
      type: "image/png",
      margin: 1,
      width: 1024,
      color: { dark: QR_COLORS[qrColor].dark, light: QR_TRANSPARENT_BG },
    });
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `smart-link-${type}-${fileSlug}-${qrColor}.png`;
    link.click();
  };

  const handleCodeChange = (e) => {
    const value = e.target.value;
    // Para "Link externo" no tiene sentido auto-detectar tipo de Instagram
    // — lo que se pega ahí ES el destino, tal cual.
    if (type === "url") {
      setCode(value);
      return;
    }
    const parsed = parseInstagramInput(value);
    if (parsed) {
      setType(parsed.type);
      setCode(parsed.code);
    } else {
      setCode(value);
    }
  };

  const handleCopy = async () => {
    if (!generatedLink) return;
    await navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.builder}>
      <img src={ditpIso} alt="DITP" className={styles.builderLogo} />
      <h1 className={styles.builderTitle}>Constructor de Smart Link</h1>
      <ScanStats />

      <div className={styles.card}>
        <fieldset className={styles.radioGroup}>
          <label
            className={`${styles.radioOption} ${
              type === "reel" ? styles.radioOptionActive : ""
            }`}
          >
            <input
              type='radio'
              name='type'
              value='reel'
              checked={type === "reel"}
              onChange={() => setType("reel")}
            />
            Reel
          </label>
          <label
            className={`${styles.radioOption} ${
              type === "p" ? styles.radioOptionActive : ""
            }`}
          >
            <input
              type='radio'
              name='type'
              value='p'
              checked={type === "p"}
              onChange={() => setType("p")}
            />
            Post
          </label>
          <label
            className={`${styles.radioOption} ${
              type === "profile" ? styles.radioOptionActive : ""
            }`}
          >
            <input
              type='radio'
              name='type'
              value='profile'
              checked={type === "profile"}
              onChange={() => setType("profile")}
            />
            Perfil
          </label>
          <label
            className={`${styles.radioOption} ${
              type === "url" ? styles.radioOptionActive : ""
            }`}
          >
            <input
              type='radio'
              name='type'
              value='url'
              checked={type === "url"}
              onChange={() => {
                setType("url");
                setCode("");
              }}
            />
            Link externo
          </label>
        </fieldset>

        <input
          type='text'
          className={styles.codeInput}
          placeholder={info.placeholder}
          aria-label={`Pegá el link o ingresá ${info.fieldLabel}`}
          value={code}
          onChange={handleCodeChange}
        />

        <fieldset className={styles.modeGroup}>
          <label
            className={`${styles.modeOption} ${
              !stayMode ? styles.modeOptionActive : ""
            }`}
          >
            <input
              type='radio'
              name='mode'
              value='real'
              checked={!stayMode}
              onChange={() => setStayMode(false)}
            />
            Real — redirige solo
          </label>
          <label
            className={`${styles.modeOption} ${
              stayMode ? styles.modeOptionActive : ""
            }`}
          >
            <input
              type='radio'
              name='mode'
              value='test'
              checked={stayMode}
              onChange={() => setStayMode(true)}
            />
            Test — no redirige
          </label>
        </fieldset>

        {generatedLink && (
          <div className={styles.result}>
            <span
              className={`${styles.modeBadge} ${
                stayMode ? styles.modeBadgeTest : styles.modeBadgeReal
              }`}
            >
              {stayMode ? "Modo test" : "Modo real"}
            </span>
            <code className={styles.resultLink}>{generatedLink}</code>
            <button type='button' className={styles.copyButton} onClick={handleCopy}>
              {copied ? "Copiado ✓" : "Copiar link"}
            </button>
          </div>
        )}

        {qrSvg && (
          <div className={styles.qrBlock}>
            <p className={styles.qrHint}>
              El QR siempre apunta al link real (sin modo test), listo para imprimir.
              Fondo transparente siempre.
            </p>

            <div className={styles.qrColorGroup}>
              {Object.entries(QR_COLORS).map(([key, { label, swatch }]) => (
                <label
                  key={key}
                  className={`${styles.qrColorOption} ${
                    qrColor === key ? styles.qrColorOptionActive : ""
                  }`}
                >
                  <input
                    type='radio'
                    name='qrColor'
                    value={key}
                    checked={qrColor === key}
                    onChange={() => setQrColor(key)}
                  />
                  <span
                    className={styles.qrColorSwatch}
                    style={{ backgroundColor: swatch }}
                  />
                  {label}
                </label>
              ))}
            </div>

            <div
              className={styles.qrPreview}
              style={{ backgroundColor: qrColor === "white" ? "#000000" : "#ffffff" }}
              dangerouslySetInnerHTML={{ __html: qrSvg }}
            />
            <div className={styles.qrButtons}>
              <button type='button' className={styles.copyButton} onClick={handleDownloadPng}>
                Descargar QR (PNG)
              </button>
              <button
                type='button'
                className={styles.copyButtonSecondary}
                onClick={handleDownloadSvg}
              >
                Descargar QR (SVG)
              </button>
            </div>
          </div>
        )}
      </div>

      <div className={styles.example}>
        {type === "url" ? (
          <p className={styles.exampleNote}>
            Pegá cualquier URL — no tiene que ser de Instagram. El escaneo se
            cuenta igual que con un Reel, Post o Perfil.
          </p>
        ) : (
          <>
            <p>Pegá el link tal cual, por ejemplo:</p>
            <code>{info.urlSample}</code>
            <p className={styles.exampleNote}>
              El código se detecta solo — o escribilo directo (
              <strong>{info.valueSample}</strong>) si ya lo tenés.
            </p>
          </>
        )}
        <p>Link {info.label.toLowerCase()} de ejemplo:</p>
        <code>
          {basePath}?type={type}&code={encodeURIComponent(info.valueSample)}
        </code>
      </div>
    </div>
  );
};

// Registro de escaneos: pega contra /api/log-scan (función serverless propia,
// ver api/log-scan.js), que a su vez escribe en un Google Sheet autenticado
// con un service account — esa función solo acepta requests con origen
// ditp.com.ar, así que esto no va a registrar nada en local ni en previews.
// sendBeacon no bloquea ni demora la redirección — es la API pensada para
// disparar datos justo antes de navegar fuera de la página.
const logScan = (payload) => {
  if (typeof navigator.sendBeacon !== "function") return;
  navigator.sendBeacon(
    "/api/log-scan",
    new Blob([JSON.stringify(payload)], { type: "application/json" })
  );
};

// "Usuario único" = primera vez que ESTE navegador escanea ESTE código en
// particular — la marca es por type+code, no global, así que el mismo
// dispositivo escaneando dos QR distintos cuenta como único en cada uno.
// Devuelve null si localStorage no está disponible (modo privado estricto,
// storage lleno, etc.) — en ese caso no se manda el dato, no se rompe nada.
const isFirstScanForCode = (type, code) => {
  try {
    const key = `smartlink_seen_${type}_${code}`;
    if (window.localStorage.getItem(key)) return false;
    window.localStorage.setItem(key, "1");
    return true;
  } catch {
    return null;
  }
};

// Se muestra cuando no hay type/code Y tampoco el ?admin= correcto — no da
// ninguna pista de que existe un constructor escondido detrás de esa clave.
const NoTargetMessage = () => (
  <div className={styles.smartLink}>
    <img src={ditpIso} alt="DITP" className={styles.logo} />
    <p className={styles.message}>Todavía no hay un posteo asignado a este link.</p>
  </div>
);

// Puerta de entrada tipo "smart link": redirige a la app de Instagram si está
// instalada (Android via intent://, iOS/resto via Universal Link), con fallback
// web automático. type/code vienen por query string (?type=reel|p&code=...) para
// que el destino se pueda reasignar desde el Sheet de qrg sin redeploy.
export const SmartLink = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const code = searchParams.get("code");
  // Modo test: ?stay=1 frena la redirección automática para poder mirar la
  // pantalla y disparar el link a mano cuando quieras.
  const stay = searchParams.get("stay") === "1";
  // Constructor escondido detrás de ?admin=CLAVE — sin la clave correcta se
  // ve el mismo mensaje genérico de siempre, no un "acceso denegado" que
  // delate que hay algo protegido acá.
  const adminKey = process.env.REACT_APP_SMART_LINK_ADMIN_KEY;
  const isAdmin = Boolean(adminKey) && searchParams.get("admin") === adminKey;
  const [showManualLink, setShowManualLink] = useState(false);

  const hasTarget = Boolean(type && code);
  const isExternal = type === "url";
  // "profile" no lleva segmento de tipo en la URL de Instagram (instagram.com/usuario/),
  // a diferencia de reel/post (instagram.com/reel|p/codigo/). Para "url" el
  // destino es directamente lo que vino en ?code= (ya viene decodificado por
  // useSearchParams), no se arma nada con instagram.com.
  const igPath = type === "profile" ? `${code}/` : `${type}/${code}/`;
  const webUrl = !hasTarget ? null : isExternal ? code : `https://www.instagram.com/${igPath}`;

  useEffect(() => {
    if (!hasTarget || stay) return;

    const isAndroid = /Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const platform = isAndroid ? "android" : isIOS ? "ios" : "desktop";

    logScan({
      event: "scan",
      type,
      code,
      platform,
      referrer: document.referrer || "",
      destination: webUrl,
      firstScan: isFirstScanForCode(type, code),
    });

    if (!isExternal && isAndroid) {
      const intentUrl = `intent://instagram.com/${igPath}#Intent;package=com.instagram.android;scheme=https;S.browser_fallback_url=${encodeURIComponent(
        webUrl
      )};end`;
      window.location.href = intentUrl;
    } else {
      // Link externo (cualquier plataforma), o iOS/resto para Instagram:
      // Universal Links de Apple abren la app si está instalada, o el
      // navegador si no — no hace falta intent scheme en ningún caso acá.
      window.location.href = webUrl;
    }

    const safetyNet = setTimeout(() => {
      if (document.visibilityState === "visible") {
        setShowManualLink(true);
        logScan({ event: "fallback", type, code, platform, destination: webUrl });
        window.location.href = webUrl;
      }
    }, 2500);

    return () => clearTimeout(safetyNet);
  }, [hasTarget, stay, type, code, igPath, webUrl, isExternal]);

  if (!hasTarget) {
    return isAdmin ? <SmartLinkBuilder /> : <NoTargetMessage />;
  }

  return (
    <div className={styles.smartLink}>
      <img src={ditpIso} alt="DITP" className={styles.logo} />
      {!stay && <div className={styles.spinner} />}
      <p className={styles.message}>
        {stay
          ? "Modo test — no redirige solo."
          : isExternal
          ? "Redirigiendo…"
          : "Abriendo Instagram…"}
      </p>
      {stay && <code className={styles.targetUrl}>{webUrl}</code>}
      {(showManualLink || stay) && (
        <a href={webUrl} className={styles.manualLink}>
          {stay
            ? isExternal
              ? "Ir al link"
              : "Ir a Instagram"
            : "Tocá acá si no se abrió automáticamente"}
        </a>
      )}
    </div>
  );
};
