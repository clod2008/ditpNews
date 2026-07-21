import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ditpIso } from "../assets";
import { paths } from "../data/cont";
import styles from "./SmartLink.module.scss";

// Constructor manual: se muestra en /smart-link cuando no viene type/code en
// la URL, para armar y copiar el link una vez que el Reel/post ya existe.
const SmartLinkBuilder = () => {
  const [type, setType] = useState("reel");
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);

  const trimmedCode = code.trim();
  const basePath = `${window.location.origin}/${paths.smartLink}`;
  const generatedLink = trimmedCode
    ? `${basePath}?type=${type}&code=${encodeURIComponent(trimmedCode)}`
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
        </fieldset>

        <input
          type='text'
          className={styles.codeInput}
          placeholder='Código del posteo (ej: DZZ2TlTRrgt)'
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        {generatedLink && (
          <div className={styles.result}>
            <code className={styles.resultLink}>{generatedLink}</code>
            <button type='button' className={styles.copyButton} onClick={handleCopy}>
              {copied ? "Copiado ✓" : "Copiar link"}
            </button>
          </div>
        )}
      </div>

      <div className={styles.example}>
        <p>Ejemplo:</p>
        <code>{basePath}?type=reel&code=DA1b2C3dEfG</code>
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
  const [showManualLink, setShowManualLink] = useState(false);

  const hasTarget = Boolean(type && code);
  const webUrl = hasTarget ? `https://www.instagram.com/${type}/${code}/` : null;

  useEffect(() => {
    if (!hasTarget) return;

    const isAndroid = /Android/i.test(navigator.userAgent);

    if (isAndroid) {
      const intentUrl = `intent://instagram.com/${type}/${code}/#Intent;package=com.instagram.android;scheme=https;S.browser_fallback_url=${encodeURIComponent(
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
  }, [hasTarget, type, code, webUrl]);

  if (!hasTarget) {
    return <SmartLinkBuilder />;
  }

  return (
    <div className={styles.smartLink}>
      <img src={ditpIso} alt="DITP" className={styles.logo} />
      <div className={styles.spinner} />
      <p className={styles.message}>Abriendo Instagram…</p>
      {showManualLink && (
        <a href={webUrl} className={styles.manualLink}>
          Tocá acá si no se abrió automáticamente
        </a>
      )}
    </div>
  );
};
