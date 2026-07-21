import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
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

// Constructor manual: se muestra en /smart-link cuando no viene type/code en
// la URL, para armar y copiar el link una vez que el Reel/post/perfil ya existe.
const SmartLinkBuilder = () => {
  const [type, setType] = useState("reel");
  const [code, setCode] = useState("");
  const [stayMode, setStayMode] = useState(false);
  const [copied, setCopied] = useState(false);

  const info = IG_TYPE_INFO[type];
  const trimmedCode = code.trim().replace(/^@/, "");
  const basePath = `${window.location.origin}/${paths.smartLink}`;
  const generatedLink = trimmedCode
    ? `${basePath}?type=${type}&code=${encodeURIComponent(trimmedCode)}${
        stayMode ? "&stay=1" : ""
      }`
    : "";

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
      <p className={styles.builderHint}>
        Todavía no hay un posteo asignado a este link. Armá uno nuevo:
      </p>

      <div className={styles.card}>
        <fieldset className={styles.radioGroup}>
          <label className={styles.radioOption}>
            <input
              type='radio'
              name='type'
              value='reel'
              checked={type === "reel"}
              onChange={() => setType("reel")}
            />
            Reel
          </label>
          <label className={styles.radioOption}>
            <input
              type='radio'
              name='type'
              value='p'
              checked={type === "p"}
              onChange={() => setType("p")}
            />
            Post
          </label>
          <label className={styles.radioOption}>
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
  const [showManualLink, setShowManualLink] = useState(false);

  const hasTarget = Boolean(type && code);
  // "profile" no lleva segmento de tipo en la URL de Instagram (instagram.com/usuario/),
  // a diferencia de reel/post (instagram.com/reel|p/codigo/).
  const igPath = type === "profile" ? `${code}/` : `${type}/${code}/`;
  const webUrl = hasTarget ? `https://www.instagram.com/${igPath}` : null;

  useEffect(() => {
    if (!hasTarget || stay) return;

    const isAndroid = /Android/i.test(navigator.userAgent);

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
        window.location.href = webUrl;
      }
    }, 2500);

    return () => clearTimeout(safetyNet);
  }, [hasTarget, stay, igPath, webUrl]);

  if (!hasTarget) {
    return <SmartLinkBuilder />;
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
