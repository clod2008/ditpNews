import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ditpIso } from "../assets";
import styles from "./Sorteo.module.scss";

// Mismo patrón que SmartLink.jsx: todo el estado vive en localStorage, así
// el sorteo funciona sin conexión de punta a punta. Solo el envío a
// /api/log-premio depende de internet, y eso se reintenta solo.
const STORAGE_KEYS = {
  config: "sorteo_config",
  stock: "sorteo_stock",
  queue: "sorteo_queue",
  deviceId: "sorteo_device_id",
};

const DEFAULT_CONFIG = {
  premios: [
    { id: "premio-1", nombre: "Premio 1", cantidad: 50 },
    { id: "premio-2", nombre: "Premio 2", cantidad: 50 },
  ],
};

const ESTADOS = { LISTO: "listo", SORTEANDO: "sorteando", RESULTADO: "resultado", AGOTADO: "agotado" };

// No es información sensible (solo evita que cualquiera tropiece con el
// panel admin) — hardcodeada en vez de env var, ver TASK_sorteo_premios.md.
const ADMIN_KEY = "devtest123";

// localStorage puede fallar (modo privado estricto, storage lleno) — en ese
// caso el sorteo sigue funcionando en memoria durante la sesión, solo no
// persiste entre recargas. No rompemos el flujo por eso.
const readJSON = (key, fallback) => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const writeJSON = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ver comentario de readJSON
  }
};

const uuid = () =>
  window.crypto?.randomUUID ? window.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

// Id persistente por dispositivo (no por sesión) — se genera una sola vez y
// se reusa siempre, así todas las entregas del mismo celular/tablet quedan
// agrupadas bajo el mismo valor en el Sheet, incluso entre los 4 días del
// evento. No identifica a la persona, solo al aparato.
const getDeviceId = () => {
  const existente = readJSON(STORAGE_KEYS.deviceId, null);
  if (existente) return existente;
  const nuevo = uuid();
  writeJSON(STORAGE_KEYS.deviceId, nuevo);
  return nuevo;
};

// Igual criterio que SmartLink.jsx para platform.
const getPlataforma = () => {
  const ua = navigator.userAgent || "";
  if (/Android/i.test(ua)) return "android";
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  return "desktop";
};

const stockDesdeConfig = (config) => {
  const stock = {};
  config.premios.forEach((p) => {
    stock[p.id] = p.cantidad;
  });
  return stock;
};

// Random ponderado por stock restante: un premio con más unidades
// disponibles tiene más chance de salir. Tope duro — un id en 0 nunca sale.
const elegirPremio = (stock) => {
  const disponibles = Object.entries(stock).filter(([, cant]) => cant > 0);
  if (disponibles.length === 0) return null;
  const total = disponibles.reduce((sum, [, cant]) => sum + cant, 0);
  let r = Math.random() * total;
  for (const [id, cant] of disponibles) {
    if (r < cant) return id;
    r -= cant;
  }
  return disponibles[disponibles.length - 1][0];
};

const logPremio = async (registro) => {
  const res = await fetch("/api/log-premio", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(registro),
  });
  if (!res.ok) throw new Error(`log-premio respondió ${res.status}`);
};

// Panel escondido detrás de ?admin=CLAVE (mismo esquema que /smart-link):
// define tipos de premio + cantidad, repone stock al arrancar cada día de
// evento, y muestra cuánto quedó sin sincronizar todavía.
const SorteoAdmin = ({
  config,
  onGuardarConfig,
  stock,
  onReiniciarDia,
  queue,
  onSincronizar,
  sincronizando,
  onPurgarTodo,
}) => {
  const [borrador, setBorrador] = useState(config.premios);
  const pendientes = queue.filter((r) => !r.synced).length;

  const actualizarPremio = (id, campo, valor) => {
    setBorrador((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [campo]: campo === "cantidad" ? Math.max(0, Number(valor) || 0) : valor } : p))
    );
  };

  const agregarPremio = () => {
    setBorrador((prev) => [...prev, { id: uuid(), nombre: `Premio ${prev.length + 1}`, cantidad: 0 }]);
  };

  const quitarPremio = (id) => {
    setBorrador((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className={styles.admin}>
      <img src={ditpIso} alt="DITP" className={styles.adminLogo} />
      <h1 className={styles.adminTitle}>Admin — Sorteo de premios</h1>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Tipos de premio</h2>
        {borrador.map((p) => (
          <div key={p.id} className={styles.premioRow}>
            <input
              className={styles.premioNombre}
              value={p.nombre}
              onChange={(e) => actualizarPremio(p.id, "nombre", e.target.value)}
              placeholder="Nombre del premio"
              aria-label="Nombre del premio"
            />
            <input
              className={styles.premioCantidad}
              type="number"
              min="0"
              inputMode="numeric"
              value={p.cantidad}
              onChange={(e) => actualizarPremio(p.id, "cantidad", e.target.value)}
              aria-label="Cantidad"
            />
            <button
              type="button"
              className={styles.quitarButton}
              onClick={() => quitarPremio(p.id)}
              disabled={borrador.length <= 1}
              aria-label="Quitar premio"
            >
              ✕
            </button>
          </div>
        ))}
        <button type="button" className={styles.secondaryButton} onClick={agregarPremio}>
          + Agregar tipo de premio
        </button>
        <button type="button" className={styles.primaryButton} onClick={() => onGuardarConfig(borrador)}>
          Guardar configuración
        </button>
      </section>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Stock de hoy</h2>
        {config.premios.map((p) => (
          <div key={p.id} className={styles.stockRow}>
            <span>{p.nombre}</span>
            <span className={styles.stockValue}>
              {stock[p.id] ?? 0} / {p.cantidad}
            </span>
          </div>
        ))}
        <button type="button" className={styles.primaryButton} onClick={onReiniciarDia}>
          Reiniciar día (repone stock)
        </button>
        <p className={styles.cardHint}>Usar una vez, al arrancar cada jornada del evento.</p>
      </section>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Sincronización</h2>
        <p className={styles.syncLine}>{queue.length} premios entregados registrados en este dispositivo.</p>
        <p className={styles.syncLine}>
          {pendientes > 0 ? `${pendientes} todavía sin subir al Sheet.` : "Todo sincronizado."}
        </p>
        <button type="button" className={styles.secondaryButton} onClick={onSincronizar} disabled={sincronizando}>
          {sincronizando ? "Sincronizando…" : "Sincronizar datos"}
        </button>
      </section>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Zona de peligro</h2>
        <p className={styles.cardHint}>
          Borra configuración, stock e historial completo de este dispositivo. No se puede deshacer.
        </p>
        <button type="button" className={styles.dangerButton} onClick={onPurgarTodo}>
          Borrar todo
        </button>
      </section>
    </div>
  );
};

// Pantalla que ve el usuario final tocando el botón — ver TASK_sorteo_premios.md.
const SorteoDraw = ({ config, stock, onResultado }) => {
  const [estado, setEstado] = useState(ESTADOS.LISTO);
  const [ganador, setGanador] = useState(null);
  const timeoutRef = useRef(null);

  const hayStock = Object.values(stock).some((c) => c > 0);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const sortear = () => {
    if (!hayStock) return;
    setEstado(ESTADOS.SORTEANDO);
    setGanador(null);

    timeoutRef.current = setTimeout(() => {
      const premioId = elegirPremio(stock);
      if (!premioId) {
        setEstado(ESTADOS.AGOTADO);
        return;
      }
      const premio = config.premios.find((p) => p.id === premioId);
      onResultado(premioId, premio);
      setGanador(premio);
      setEstado(ESTADOS.RESULTADO);
    }, 1600);
  };

  const jugarDeNuevo = () => {
    setGanador(null);
    setEstado(hayStock ? ESTADOS.LISTO : ESTADOS.AGOTADO);
  };

  return (
    <div className={styles.draw}>
      <img src={ditpIso} alt="DITP" className={styles.drawLogo} />

      {estado === ESTADOS.LISTO && (
        <>
          <p className={styles.drawHint}>Tocá el botón para sortear tu premio</p>
          <button type="button" className={styles.drawButton} onClick={sortear} disabled={!hayStock}>
            Sortear
          </button>
        </>
      )}

      {estado === ESTADOS.SORTEANDO && (
        <>
          <div className={styles.spinner} />
          <p className={styles.drawMessage}>Sorteando…</p>
        </>
      )}

      {estado === ESTADOS.RESULTADO && ganador && (
        <>
          <p className={styles.drawResultLabel}>¡Ganaste!</p>
          <p className={styles.drawResultPrize}>{ganador.nombre}</p>
          <button type="button" className={styles.drawButton} onClick={jugarDeNuevo}>
            Siguiente
          </button>
        </>
      )}

      {estado === ESTADOS.AGOTADO && <p className={styles.drawMessage}>Los premios de hoy ya se agotaron.</p>}
    </div>
  );
};

export const Sorteo = () => {
  const [searchParams] = useSearchParams();
  const isAdmin = searchParams.get("admin") === ADMIN_KEY;

  const [config, setConfig] = useState(() => readJSON(STORAGE_KEYS.config, DEFAULT_CONFIG));
  const [stock, setStock] = useState(() => readJSON(STORAGE_KEYS.stock, null) || stockDesdeConfig(config));
  const [queue, setQueue] = useState(() => readJSON(STORAGE_KEYS.queue, []));

  const handleGuardarConfig = (premios) => {
    const nuevaConfig = { premios };
    setConfig(nuevaConfig);
    writeJSON(STORAGE_KEYS.config, nuevaConfig);
  };

  const handleReiniciarDia = () => {
    const nuevoStock = stockDesdeConfig(config);
    setStock(nuevoStock);
    writeJSON(STORAGE_KEYS.stock, nuevoStock);
  };

  // Distinto de "Reiniciar día": esto borra TODO (config, stock e historial),
  // no solo repone el stock. Confirmación nativa con aviso extra si hay
  // premios sin sincronizar — se pierden para siempre si se borra ahora.
  const handlePurgarTodo = () => {
    const pendientesActuales = readJSON(STORAGE_KEYS.queue, []).filter((r) => !r.synced).length;
    const advertencia =
      pendientesActuales > 0
        ? `Hay ${pendientesActuales} premios sin sincronizar todavía — si borrás ahora se pierden para siempre. `
        : "";
    const confirmado = window.confirm(
      `${advertencia}Esto borra la configuración, el stock y el historial completo de este dispositivo. No se puede deshacer. ¿Continuar?`
    );
    if (!confirmado) return;

    try {
      window.localStorage.removeItem(STORAGE_KEYS.config);
      window.localStorage.removeItem(STORAGE_KEYS.stock);
      window.localStorage.removeItem(STORAGE_KEYS.queue);
    } catch {
      // localStorage no disponible — no rompe, igual se limpia el estado en memoria abajo
    }

    setConfig(DEFAULT_CONFIG);
    setStock(stockDesdeConfig(DEFAULT_CONFIG));
    setQueue([]);
  };

  const handleResultado = (premioId, premio) => {
    const restante = stock[premioId] - 1;
    const nuevoStock = { ...stock, [premioId]: restante };
    const registro = {
      id: uuid(),
      premioId,
      premioNombre: premio?.nombre || premioId,
      stockRestante: restante,
      dispositivoId: getDeviceId(),
      plataforma: getPlataforma(),
      timestamp: new Date().toISOString(),
      synced: false,
    };
    const nuevaCola = [...queue, registro];

    setStock(nuevoStock);
    setQueue(nuevaCola);
    writeJSON(STORAGE_KEYS.stock, nuevoStock);
    writeJSON(STORAGE_KEYS.queue, nuevaCola);
  };

  // Vacía la cola pendiente contra /api/log-premio: al montar (por si ya hay
  // conexión) y cada vez que el navegador vuelve a estar online. Se corta al
  // primer fallo de un registro — se reintenta entero en el próximo trigger,
  // no hace falta reintento por-item acá.
  const sincronizandoRef = useRef(false);
  const [sincronizando, setSincronizando] = useState(false);
  const trySync = useCallback(async () => {
    if (sincronizandoRef.current) return;
    sincronizandoRef.current = true;
    setSincronizando(true);
    try {
      const colaActual = readJSON(STORAGE_KEYS.queue, []);
      const actualizada = [...colaActual];
      let huboCambios = false;

      for (let i = 0; i < actualizada.length; i++) {
        if (actualizada[i].synced) continue;
        try {
          await logPremio(actualizada[i]);
          actualizada[i] = { ...actualizada[i], synced: true };
          huboCambios = true;
        } catch {
          break;
        }
      }

      if (huboCambios) {
        writeJSON(STORAGE_KEYS.queue, actualizada);
        setQueue(actualizada);
      }
    } finally {
      sincronizandoRef.current = false;
      setSincronizando(false);
    }
  }, []);

  useEffect(() => {
    trySync();
    window.addEventListener("online", trySync);
    return () => window.removeEventListener("online", trySync);
  }, [trySync]);

  // El evento "storage" solo dispara en OTRAS pestañas/ventanas del mismo
  // origen, nunca en la que hizo el cambio — esa ya se actualiza sola por su
  // propio setState. Sirve para admin abierto en una laptop mientras el
  // sorteo corre en la tablet: el stock/cola se refleja solo, sin recargar.
  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === STORAGE_KEYS.stock) {
        const nuevo = readJSON(STORAGE_KEYS.stock, null);
        if (nuevo) setStock(nuevo);
      } else if (event.key === STORAGE_KEYS.queue) {
        setQueue(readJSON(STORAGE_KEYS.queue, []));
      } else if (event.key === STORAGE_KEYS.config) {
        setConfig(readJSON(STORAGE_KEYS.config, DEFAULT_CONFIG));
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  if (isAdmin) {
    return (
      <SorteoAdmin
        config={config}
        onGuardarConfig={handleGuardarConfig}
        stock={stock}
        onReiniciarDia={handleReiniciarDia}
        queue={queue}
        onSincronizar={trySync}
        sincronizando={sincronizando}
        onPurgarTodo={handlePurgarTodo}
      />
    );
  }

  return <SorteoDraw config={config} stock={stock} onResultado={handleResultado} />;
};
