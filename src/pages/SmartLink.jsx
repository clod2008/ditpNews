import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import QRCode from "qrcode";
import { ditpIso } from "../assets";
import { paths } from "../data/cont";
import styles from "./SmartLink.module.scss";

// Datos de ejemplo por tipo, para el placeholder del campo y el bloque de
// ayuda "¿de dónde saco esto?" — se actualizan según el radio elegido.
const IG_TYPE_INFO = {
  reel: {
    label: "Reel",
    fieldLabel: "el código",
    placeholder: "Código del posteo (ej: DZZ2TlTRrgt)",
    urlSample: "https://www.instagram.com/reel/DA1b2C3dEfG/",
    valueSample: "DA1b2C3dEfG",
  },
  p: {
    label: "Post",
    fieldLabel: "el código",
    placeholder: "Código del posteo (ej: DZZ2TlTRrgt)",
    urlSample: "https://www.instagram.com/p/CxYz9AbCdEf/",
    valueSample: "CxYz9AbCdEf",
  },
  profile: {
    label: "Perfil",
    fieldLabel: "el usuario",
    placeholder: "Usuario de Instagram (ej: ditp.thailand)",
    urlSample: "https://www.instagram.com/ditp.thailand/",
    valueSample: "ditp.thailand",
  },
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
    setSelectedCode("");

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
  }, [range]);

  const selectedEntry = selectedCode
    ? stats?.byCode.find((c) => `${c.type}:${c.code}` === selectedCode)
    : null;
  const displayTotal = selectedEntry ? selectedEntry.total : stats?.total;
  const displayUnique = selectedEntry ? selectedEntry.uniqueTotal : stats?.uniqueTotal;

  return (
    <div className={styles.statsBlock}>
      <h2 className={styles.statsTitle}>Escaneos</h2>

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
        {loading && <p className={styles.statsHint}>Cargando…</p>}
        {error && !loading && (
          <p className={styles.statsHint}>No se pudieron cargar los datos.</p>
        )}
      </div>

      {stats && !loading && !error && (
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
  const trimmedCode = code.trim().replace(/^@/, "");
  const basePath = `${window.location.origin}/${paths.smartLink}`;
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
    link.download = `smart-link-${type}-${trimmedCode}-${qrColor}.svg`;
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
    link.download = `smart-link-${type}-${trimmedCode}-${qrColor}.png`;
    link.click();
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
      <h1 className={styles.builderTitle}>Constructor de Smart Link a Instagram</h1>
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
        </fieldset>

        <input
          type='text'
          className={styles.codeInput}
          placeholder={info.placeholder}
          aria-label={`Ingresá ${info.fieldLabel}`}
          value={code}
          onChange={(e) => setCode(e.target.value)}
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
        <p>¿De dónde saco {info.fieldLabel}?</p>
        <code>{info.urlSample}</code>
        <p className={styles.exampleNote}>
          Es la parte <strong>{info.valueSample}</strong> de esa URL.
        </p>
        <p>Link {info.label.toLowerCase()} de ejemplo:</p>
        <code>
          {basePath}?type={type}&code={info.valueSample}
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
  // "profile" no lleva segmento de tipo en la URL de Instagram (instagram.com/usuario/),
  // a diferencia de reel/post (instagram.com/reel|p/codigo/).
  const igPath = type === "profile" ? `${code}/` : `${type}/${code}/`;
  const webUrl = hasTarget ? `https://www.instagram.com/${igPath}` : null;

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

    if (isAndroid) {
      const intentUrl = `intent://instagram.com/${igPath}#Intent;package=com.instagram.android;scheme=https;S.browser_fallback_url=${encodeURIComponent(
        webUrl
      )};end`;
      window.location.href = intentUrl;
    } else {
      // iOS y el resto: Universal Links de Apple abren la app si está instalada,
      // o el navegador si no — no hace falta intent scheme.
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
  }, [hasTarget, stay, type, code, igPath, webUrl]);

  if (!hasTarget) {
    return isAdmin ? <SmartLinkBuilder /> : <NoTargetMessage />;
  }

  return (
    <div className={styles.smartLink}>
      <img src={ditpIso} alt="DITP" className={styles.logo} />
      {!stay && <div className={styles.spinner} />}
      <p className={styles.message}>
        {stay ? "Modo test — no redirige solo." : "Abriendo Instagram…"}
      </p>
      {stay && <code className={styles.targetUrl}>{webUrl}</code>}
      {(showManualLink || stay) && (
        <a href={webUrl} className={styles.manualLink}>
          {stay ? "Ir a Instagram" : "Tocá acá si no se abrió automáticamente"}
        </a>
      )}
    </div>
  );
};
