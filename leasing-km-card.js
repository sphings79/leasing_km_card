/**
 * Leasing KM Card
 * A modern Lovelace card for the Leasing KM-Rechner integration.
 * Auto-discovers all leasing_km integration instances.
 * https://github.com/sphings79/leasing_km_card
 */

const VERSION = "1.1.0b1";

// ─── Styles ───────────────────────────────────────────────────────────────────

const STYLES = `
  :host {
    --lkm-green:      #4ade80;
    --lkm-green-bg:   rgba(74,222,128,0.12);
    --lkm-red:        #f87171;
    --lkm-red-bg:     rgba(248,113,113,0.12);
    --lkm-amber:      #fbbf24;
    --lkm-amber-bg:   rgba(251,191,36,0.12);
    --lkm-blue:       #60a5fa;
    --lkm-blue-bg:    rgba(96,165,250,0.12);
    --lkm-accent:     #6366f1;
    --lkm-accent2:    rgba(99,102,241,0.15);
    --lkm-bg:         var(--card-background-color, #1e2333);
    --lkm-bg2:        rgba(255,255,255,0.04);
    --lkm-bg3:        rgba(255,255,255,0.07);
    --lkm-border:     rgba(255,255,255,0.08);
    --lkm-text:       var(--primary-text-color, #e8eaf0);
    --lkm-text2:      var(--secondary-text-color, #8b90a4);
    --lkm-text3:      rgba(139,144,164,0.5);
    --lkm-radius:     12px;
    --lkm-radius-sm:  8px;
    display: block;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .card {
    background: var(--lkm-bg);
    border-radius: var(--ha-card-border-radius, var(--lkm-radius));
    overflow: hidden;
    font-family: var(--paper-font-body1_-_font-family, 'Segoe UI', system-ui, sans-serif);
    color: var(--lkm-text);
    user-select: none;
  }

  /* ── Header ── */
  .header {
    display: flex; align-items: center; gap: 12px;
    padding: 18px 20px 14px;
    border-bottom: 1px solid var(--lkm-border);
  }
  .header-icon {
    width: 38px; height: 38px;
    background: var(--lkm-accent2);
    border: 1px solid rgba(99,102,241,0.3);
    border-radius: var(--lkm-radius-sm);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .header-icon svg { width: 20px; height: 20px; }
  .header-title { font-size: 15px; font-weight: 600; }
  .header-sub   { font-size: 12px; color: var(--lkm-text2); margin-top: 1px; }
  .header-badge {
    margin-left: auto;
    font-size: 11px; font-weight: 600;
    padding: 3px 10px;
    border-radius: 20px; border: 1px solid transparent;
    white-space: nowrap;
  }
  .badge-green { background: var(--lkm-green-bg); color: var(--lkm-green); border-color: rgba(74,222,128,0.2); }
  .badge-red   { background: var(--lkm-red-bg);   color: var(--lkm-red);   border-color: rgba(248,113,113,0.2); }
  .badge-amber { background: var(--lkm-amber-bg); color: var(--lkm-amber); border-color: rgba(251,191,36,0.2); }

  /* ── Gauge ── */
  .gauge-wrap {
    display: flex; flex-direction: column; align-items: center;
    padding: 20px 20px 0;
  }
  .gauge-svg { width: 220px; height: 130px; overflow: visible; }
  .gauge-track { fill: none; stroke: var(--lkm-bg3); stroke-width: 16; stroke-linecap: round; }
  .gauge-val   { font-size: 28px; font-weight: 700; fill: var(--lkm-text); text-anchor: middle; }
  .gauge-unit  { font-size: 9px; fill: var(--lkm-text2); text-anchor: middle; }
  .gauge-label { font-size: 10px; fill: var(--lkm-text3); }

  /* ── Progress bar ── */
  .progress-section { padding: 14px 20px; }
  .progress-row {
    display: flex; justify-content: space-between; align-items: baseline;
    margin-bottom: 6px;
  }
  .progress-label { font-size: 12px; color: var(--lkm-text2); }
  .progress-value { font-size: 12px; font-weight: 600; color: var(--lkm-text); }
  .bar-wrap {
    position: relative; height: 8px;
    background: var(--lkm-bg3); border-radius: 4px; overflow: hidden;
    margin-bottom: 10px;
  }
  .bar-soll {
    position: absolute; top: 0; left: 0; height: 100%;
    border-radius: 4px; opacity: 0.25;
    transition: width 0.6s ease, background 0.3s;
  }
  .bar-ist {
    position: absolute; top: 0; left: 0; height: 100%;
    border-radius: 4px;
    transition: width 0.6s ease, background 0.3s;
  }
  .bar-ok  { background: var(--lkm-green); }
  .bar-bad { background: var(--lkm-red); }
  .bar-sub {
    display: flex; justify-content: space-between;
    font-size: 10px; color: var(--lkm-text3);
    margin-top: -6px; margin-bottom: 10px;
  }

  /* ── Separator / Section ── */
  .sep { border: none; border-top: 1px solid var(--lkm-border); margin: 0 20px; }
  .section-label {
    font-size: 10px; font-weight: 600; color: var(--lkm-text3);
    text-transform: uppercase; letter-spacing: 0.09em;
    padding: 14px 20px 8px;
  }

  /* ── Metric grid ── */
  .metric-grid {
    display: grid; grid-template-columns: repeat(2, 1fr);
    gap: 8px; padding: 0 20px 14px;
  }
  .metric-grid.cols3 { grid-template-columns: repeat(3, 1fr); }
  .metric {
    background: var(--lkm-bg2);
    border: 1px solid var(--lkm-border);
    border-radius: var(--lkm-radius-sm);
    padding: 11px 12px;
  }
  .metric-label { font-size: 10px; color: var(--lkm-text2); margin-bottom: 4px; line-height: 1.3; }
  .metric-value { font-size: 18px; font-weight: 600; color: var(--lkm-text); line-height: 1.15; }
  .metric-value.green { color: var(--lkm-green); }
  .metric-value.red   { color: var(--lkm-red); }
  .metric-value.amber { color: var(--lkm-amber); }
  .metric-value.blue  { color: var(--lkm-blue); }
  .metric-sub   { font-size: 10px; color: var(--lkm-text3); margin-top: 2px; }

  /* ── Kosten config row ── */
  .kosten-cfg {
    display: flex; flex-wrap: wrap; gap: 6px;
    padding: 0 20px 14px;
  }
  .kosten-cfg-chip {
    font-size: 10px; color: var(--lkm-text2);
    background: var(--lkm-bg2);
    border: 1px solid var(--lkm-border);
    border-radius: 20px;
    padding: 3px 10px;
    white-space: nowrap;
  }
  .kosten-cfg-chip span { color: var(--lkm-text); font-weight: 600; }

  /* ── Status pills ── */
  .status-strip { display: flex; gap: 6px; flex-wrap: wrap; padding: 0 20px 16px; }
  .status-pill {
    display: flex; align-items: center; gap: 5px;
    font-size: 11px; font-weight: 500;
    padding: 4px 10px; border-radius: 20px; border: 1px solid transparent;
  }
  .pill-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
  .pill-green { background: var(--lkm-green-bg); color: var(--lkm-green); border-color: rgba(74,222,128,0.2); }
  .pill-green .pill-dot { background: var(--lkm-green); }
  .pill-red   { background: var(--lkm-red-bg);   color: var(--lkm-red);   border-color: rgba(248,113,113,0.2); }
  .pill-red   .pill-dot { background: var(--lkm-red); }
  .pill-amber { background: var(--lkm-amber-bg); color: var(--lkm-amber); border-color: rgba(251,191,36,0.2); }
  .pill-amber .pill-dot { background: var(--lkm-amber); }

  /* ── Footer ── */
  .footer {
    padding: 10px 20px 14px;
    font-size: 10px; color: var(--lkm-text3);
    text-align: center; border-top: 1px solid var(--lkm-border);
  }

  /* ── State messages ── */
  .state-msg {
    padding: 32px 20px; text-align: center;
    color: var(--lkm-text2); font-size: 13px; line-height: 1.6;
  }
  .state-msg .icon { font-size: 32px; display: block; margin-bottom: 8px; }

  /* ── Editor ── */
  .editor { padding: 16px; }
  .editor label {
    display: block; font-size: 12px; color: var(--secondary-text-color);
    margin-bottom: 4px; margin-top: 14px;
  }
  .editor label:first-of-type { margin-top: 0; }
  .editor input, .editor select {
    width: 100%; padding: 8px 10px;
    background: var(--secondary-background-color);
    border: 1px solid var(--divider-color);
    border-radius: 6px; color: var(--primary-text-color);
    font-size: 13px; font-family: inherit; outline: none;
  }
  .editor input:focus, .editor select:focus { border-color: var(--accent-color); }
  .editor .hint {
    font-size: 11px; color: var(--secondary-text-color);
    margin-top: 4px; opacity: 0.7;
  }
`;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmtN  = (n, dec = 0) =>
  typeof n === "number"
    ? n.toLocaleString("de-DE", { minimumFractionDigits: dec, maximumFractionDigits: dec })
    : "–";
const fmtEur = (n) =>
  typeof n === "number"
    ? (n >= 0 ? "+" : "") + n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €"
    : "–";
const sign  = (n) => (n > 0 ? "+" : "");
const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);

function getState(hass, eid) {
  if (!eid || !hass.states[eid]) return null;
  const s = hass.states[eid].state;
  if (["unavailable", "unknown", ""].includes(s)) return null;
  return parseFloat(s);
}
function getBool(hass, eid) {
  if (!eid || !hass.states[eid]) return null;
  return hass.states[eid].state === "on";
}
function getAttr(hass, eid, attr) {
  if (!eid || !hass.states[eid]) return null;
  return hass.states[eid].attributes?.[attr] ?? null;
}

function discoverInstances(hass) {
  const SUFFIX = "_km_absolviert";
  return Object.keys(hass.states)
    .filter(
      (eid) =>
        eid.startsWith("sensor.") &&
        eid.endsWith(SUFFIX) &&
        hass.states[eid].attributes?.unit_of_measurement === "%"
    )
    .map((eid) => {
      const prefix = eid.slice("sensor.".length, -SUFFIX.length);
      const label  =
        hass.states[eid].attributes?.friendly_name
          ?.replace(" KM absolviert", "")
          ?.replace(" km_absolviert", "")
          ?.trim() || prefix;
      return { prefix, label };
    });
}

// ─── Gauge arc helper ─────────────────────────────────────────────────────────

function arcPath(cx, cy, r, startDeg, endDeg) {
  const rad = (d) => (d * Math.PI) / 180;
  const x1 = cx + r * Math.cos(rad(startDeg));
  const y1 = cy + r * Math.sin(rad(startDeg));
  const x2 = cx + r * Math.cos(rad(endDeg));
  const y2 = cy + r * Math.sin(rad(endDeg));
  return `M ${x1} ${y1} A ${r} ${r} 0 ${endDeg - startDeg > 180 ? 1 : 0} 1 ${x2} ${y2}`;
}

const ARC_START = 180;
const ARC_END   = 360;
const ARC_RANGE = 180;

// ─── Card class ───────────────────────────────────────────────────────────────

class LeasingKmCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = {};
  }

  static getConfigElement() {
    return document.createElement("leasing-km-card-editor");
  }

  static getStubConfig(hass) {
    if (hass) {
      const instances = discoverInstances(hass);
      if (instances.length > 0) return { entity_prefix: instances[0].prefix };
    }
    return { entity_prefix: "" };
  }

  setConfig(config) {
    this._config = config;
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  _s(key) { return `sensor.${this._config.entity_prefix}_${key}`; }
  _b(key) { return `binary_sensor.${this._config.entity_prefix}_${key}`; }

  _renderContent(root, style) {
    const hass = this._hass;

    if (!this._config.entity_prefix) {
      const instances = discoverInstances(hass);
      root.innerHTML = "";
      root.appendChild(style);
      const el = document.createElement("div");
      if (instances.length === 0) {
        el.innerHTML = `<ha-card><div class="card"><div class="state-msg">
          <span class="icon">🔌</span>
          Keine Leasing KM-Instanz gefunden.<br>
          Bitte zuerst die <b>Leasing KM-Rechner</b> Integration einrichten.
        </div></div></ha-card>`;
      } else {
        this._config = { ...this._config, entity_prefix: instances[0].prefix };
        this._render();
        return;
      }
      root.appendChild(el);
      return;
    }

    // ── Read entity values ───────────────────────────────────────────────────
    const istDay    = getState(hass, this._s("tagesleistung_ist"));
    const sollDay   = getState(hass, this._s("tagesleistung_soll"));
    const sollHeute = getState(hass, this._s("soll_km_heute"));
    const diffHeute = getState(hass, this._s("differenz_heute"));
    const sollMon   = getState(hass, this._s("soll_km_monatsende"));
    const diffMon   = getState(hass, this._s("differenz_monatsende"));
    const verblJahr = getState(hass, this._s("verbleibend_bis_jahresende"));
    const verblEnd  = getState(hass, this._s("verbleibend_bis_laufzeitende"));
    const nochErl   = getState(hass, this._s("noch_erlaubt"));
    const jahresSoll= getState(hass, this._s("jahres_soll"));
    const progJahr  = getState(hass, this._s("prognose_jahresende"));
    const progEnd   = getState(hass, this._s("prognose_laufzeitende"));
    const kmPct     = getState(hass, this._s("km_absolviert"));
    const laufPct   = getState(hass, this._s("laufzeit_absolviert"));

    // ── Neu: Kosten ──────────────────────────────────────────────────────────
    const abwEnd      = getState(hass, this._s("abweichung_laufzeitende"));
    const kostenProg  = getState(hass, this._s("kosten_prognose"));
    const kostenAktiv = getAttr(hass, this._s("kosten_prognose"), "kosten_aktiv") === true;

    // Config-Attribute (aus kosten_prognose Sensor-Attributen)
    const kEid         = this._s("kosten_prognose");
    const mehrCent     = getAttr(hass, kEid, "mehr_cent");
    const minderCent   = getAttr(hass, kEid, "minder_cent");
    const tolMehrKm    = getAttr(hass, kEid, "toleranz_mehr_km");
    const tolMinderKm  = getAttr(hass, kEid, "toleranz_minder_km");
    const minderGrenze = getAttr(hass, kEid, "minder_grenze_km");
    const tolUeber     = getBool(hass, this._b("toleranz_ueberschritten"));

    const isOverSoll = getBool(hass, this._b("ueber_soll"));
    const jahresOver = getBool(hass, this._b("jahres_km_ueberschritten"));
    const endeOver   = getBool(hass, this._b("laufzeit_km_ueberschritten"));

    const vertragsende = getAttr(hass, this._s("differenz_heute"), "vertragsende") || null;
    const elapsedDays  = getAttr(hass, this._s("differenz_heute"), "elapsed_days");
    const totalDays    = getAttr(hass, this._s("differenz_heute"), "total_days");

    if (kmPct === null && laufPct === null && sollHeute === null) {
      const instances = discoverInstances(hass);
      root.innerHTML = "";
      root.appendChild(style);
      const el = document.createElement("div");
      el.innerHTML = `<ha-card><div class="card"><div class="state-msg">
        <span class="icon">🔌</span>
        Prefix <code style="font-size:11px">${this._config.entity_prefix}</code> nicht gefunden.<br><br>
        ${instances.length > 0
          ? `Gefundene Instanzen:<br>${instances.map(i =>
              `<code style="font-size:11px">${i.prefix}</code>`).join("<br>")}<br><br>Bitte Karte neu konfigurieren.`
          : "Keine Leasing KM-Instanz in Home Assistant gefunden."}
      </div></div></ha-card>`;
      root.appendChild(el);
      return;
    }

    // ── Gauge ────────────────────────────────────────────────────────────────
    const istP  = clamp(kmPct   ?? 0, 0, 100);
    const sollP = clamp(laufPct ?? 0, 0, 100);
    const over  = isOverSoll ?? (diffHeute !== null ? diffHeute > 0 : false);

    const gaugeColor = over ? "var(--lkm-red)" : "var(--lkm-green)";
    const needleDeg  = ARC_START + (istP / 100) * ARC_RANGE;
    const needleRad  = (needleDeg * Math.PI) / 180;
    const nx = 110 + 72 * Math.cos(needleRad);
    const ny = 110 + 72 * Math.sin(needleRad);
    const arcFillEnd  = ARC_START + (istP  / 100) * ARC_RANGE;
    const arcSollEnd  = ARC_START + (sollP / 100) * ARC_RANGE;
    const arcFillPath = arcPath(110, 110, 90, ARC_START, arcFillEnd);
    const arcTrackPath= arcPath(110, 110, 90, ARC_START, ARC_END);
    const sollRad = (arcSollEnd * Math.PI) / 180;
    const sm1x = 110 + 83 * Math.cos(sollRad), sm1y = 110 + 83 * Math.sin(sollRad);
    const sm2x = 110 + 97 * Math.cos(sollRad), sm2y = 110 + 97 * Math.sin(sollRad);

    // ── Badge ────────────────────────────────────────────────────────────────
    const title      = this._config.title ||
      (hass.states[this._s("km_absolviert")]?.attributes?.friendly_name
        ?.replace(" KM absolviert", "") || "Leasing KM");
    const badgeClass = endeOver ? "badge-red" : over ? "badge-amber" : "badge-green";
    const badgeText  = endeOver ? "⚠ Limit gefährdet" : over ? "▲ Über Soll" : "✓ Im Rahmen";
    const vtEnd      = vertragsende ? new Date(vertragsende).toLocaleDateString("de-DE") : "–";

    // ── Kosten-Sektion ───────────────────────────────────────────────────────
    const kostenColor = kostenProg === null ? ""
      : kostenProg > 0 ? "red" : kostenProg < 0 ? "green" : "";
    const kostenLabel = kostenProg === null ? "–"
      : kostenProg > 0 ? "Nachzahlung erwartet"
      : kostenProg < 0 ? "Erstattung erwartet"
      : "Innerhalb Toleranz";

    const abwColor = abwEnd === null ? ""
      : abwEnd > 0 ? "red" : abwEnd < 0 ? "blue" : "";
    const abwLabel = abwEnd === null ? "–"
      : abwEnd > 0 ? "Mehrkilometer" : abwEnd < 0 ? "Minderkilometer" : "Exakt Soll";

    // Config-Chips (nur wenn Werte vorhanden)
    const cfgChips = [
      mehrCent   != null ? `Mehr: <span>${fmtN(mehrCent, 1)} ct/km</span>` : null,
      minderCent != null ? `Minder: <span>${fmtN(minderCent, 1)} ct/km</span>` : null,
      tolMehrKm  != null && tolMehrKm > 0 ? `Tol.+: <span>${fmtN(tolMehrKm)} km</span>` : null,
      tolMinderKm != null && tolMinderKm > 0 ? `Tol.−: <span>${fmtN(tolMinderKm)} km</span>` : null,
      minderGrenze != null && minderGrenze > 0 ? `Grenze: <span>${fmtN(minderGrenze)} km</span>` : null,
    ].filter(Boolean).map(c => `<span class="kosten-cfg-chip">${c}</span>`).join("");

    const kostenSection = kostenAktiv ? `
      <hr class="sep">
      <div class="section-label">Kostenberechnung</div>
      <div class="metric-grid">
        <div class="metric">
          <div class="metric-label">Prognose Abweichung</div>
          <div class="metric-value ${abwColor}">${abwEnd !== null ? sign(abwEnd) + fmtN(abwEnd) : "–"} km</div>
          <div class="metric-sub">${abwLabel}</div>
        </div>
        <div class="metric">
          <div class="metric-label">Prognose Kosten / Erstattung</div>
          <div class="metric-value ${kostenColor}">${kostenProg !== null ? fmtEur(kostenProg) : "–"}</div>
          <div class="metric-sub">${kostenLabel}</div>
        </div>
      </div>
      ${cfgChips ? `<div class="kosten-cfg">${cfgChips}</div>` : ""}
    ` : "";

    const tolPill = kostenAktiv ? `
      <span class="status-pill ${tolUeber ? "pill-amber" : "pill-green"}">
        <span class="pill-dot"></span>Toleranz ${tolUeber ? "überschritten" : "eingehalten"}
      </span>
    ` : "";

    const html = `
      <ha-card>
        <div class="card">

          <div class="header">
            <div class="header-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <div>
              <div class="header-title">${title}</div>
              <div class="header-sub">Vertragsende ${vtEnd}</div>
            </div>
            <span class="header-badge ${badgeClass}">${badgeText}</span>
          </div>

          <div class="gauge-wrap">
            <svg class="gauge-svg" viewBox="0 40 220 100">
              <path class="gauge-track" d="${arcTrackPath}"/>
              <path d="${arcFillPath}" fill="none" stroke="${gaugeColor}" stroke-width="16" stroke-linecap="round"/>
              <line x1="${sm1x}" y1="${sm1y}" x2="${sm2x}" y2="${sm2y}"
                stroke="rgba(255,255,255,0.5)" stroke-width="3" stroke-linecap="round"/>
              <text x="22"  y="122" class="gauge-label" text-anchor="middle">0%</text>
              <text x="198" y="122" class="gauge-label" text-anchor="end">100%</text>
              <line x1="110" y1="110" x2="${nx}" y2="${ny}"
                stroke="rgba(255,255,255,0.9)" stroke-width="2.5" stroke-linecap="round"/>
              <circle cx="110" cy="110" r="8" fill="var(--lkm-accent)"/>
              <circle cx="110" cy="110" r="3.5" fill="white"/>
              <text x="110" y="100" class="gauge-val">${fmtN(istP, 1)} %</text>
              <text x="110" y="112" class="gauge-unit">KM absolviert · Soll: ${fmtN(sollP, 1)} %</text>
            </svg>
          </div>

          <div class="progress-section">
            <div class="progress-row">
              <span class="progress-label">KM-Fortschritt</span>
              <span class="progress-value">${fmtN(istP, 1)} % von 100 %</span>
            </div>
            <div class="bar-wrap">
              <div class="bar-soll ${over ? "bar-bad" : "bar-ok"}" style="width:${sollP}%"></div>
              <div class="bar-ist  ${over ? "bar-bad" : "bar-ok"}" style="width:${istP}%"></div>
            </div>
            <div class="bar-sub">
              <span>Soll: ${fmtN(sollP, 1)} % (Laufzeit: ${fmtN(laufPct, 1)} %)</span>
              <span>${elapsedDays !== null ? `${elapsedDays} / ${totalDays} Tage` : ""}</span>
            </div>
          </div>

          <hr class="sep">
          <div class="section-label">Soll-Ist-Vergleich</div>
          <div class="metric-grid">
            <div class="metric">
              <div class="metric-label">Differenz heute</div>
              <div class="metric-value ${over ? "red" : "green"}">${diffHeute !== null ? sign(diffHeute) + fmtN(diffHeute) : "–"} km</div>
              <div class="metric-sub">Soll: ${fmtN(sollHeute)} km</div>
            </div>
            <div class="metric">
              <div class="metric-label">Differenz Monatsende</div>
              <div class="metric-value ${(diffMon ?? 0) > 0 ? "red" : "green"}">${diffMon !== null ? sign(diffMon) + fmtN(diffMon) : "–"} km</div>
              <div class="metric-sub">Soll: ${fmtN(sollMon)} km</div>
            </div>
            <div class="metric">
              <div class="metric-label">Ist km/Tag</div>
              <div class="metric-value">${fmtN(istDay, 1)} km</div>
              <div class="metric-sub">Soll: ${fmtN(sollDay, 1)} km/Tag</div>
            </div>
            <div class="metric">
              <div class="metric-label">Noch erlaubt</div>
              <div class="metric-value ${(nochErl ?? 9999) < 5000 ? "amber" : ""}">${fmtN(nochErl)} km</div>
              <div class="metric-sub">bis Vertragsende</div>
            </div>
          </div>

          <hr class="sep">
          <div class="section-label">Prognose</div>
          <div class="metric-grid cols3">
            <div class="metric">
              <div class="metric-label">Jahresende</div>
              <div class="metric-value ${jahresOver ? "red" : "green"}">${fmtN(progJahr)} km</div>
              <div class="metric-sub">${jahresOver ? "▲ über Limit" : "✓ im Rahmen"}</div>
            </div>
            <div class="metric">
              <div class="metric-label">Laufzeitende</div>
              <div class="metric-value ${endeOver ? "red" : "green"}">${fmtN(progEnd)} km</div>
              <div class="metric-sub">${endeOver ? "▲ über Limit" : "✓ im Rahmen"}</div>
            </div>
            <div class="metric">
              <div class="metric-label">Soll / Jahr</div>
              <div class="metric-value">${fmtN(jahresSoll)} km</div>
              <div class="metric-sub">Jahresbudget</div>
            </div>
          </div>

          <hr class="sep">
          <div class="section-label">Verbleibend (Soll-Basis)</div>
          <div class="metric-grid">
            <div class="metric">
              <div class="metric-label">Bis Jahresende</div>
              <div class="metric-value">${fmtN(verblJahr)} km</div>
              <div class="metric-sub">31.12.${new Date().getFullYear()}</div>
            </div>
            <div class="metric">
              <div class="metric-label">Bis Laufzeitende</div>
              <div class="metric-value">${fmtN(verblEnd)} km</div>
              <div class="metric-sub">${vtEnd}</div>
            </div>
          </div>

          ${kostenSection}

          <div class="status-strip">
            <span class="status-pill ${over ? "pill-red" : "pill-green"}">
              <span class="pill-dot"></span>${over ? "Über Tages-Soll" : "Unter Tages-Soll"}
            </span>
            <span class="status-pill ${jahresOver ? "pill-red" : "pill-green"}">
              <span class="pill-dot"></span>Jahres-KM ${jahresOver ? "gefährdet" : "sicher"}
            </span>
            <span class="status-pill ${endeOver ? "pill-red" : "pill-green"}">
              <span class="pill-dot"></span>Limit ${endeOver ? "wird überschritten" : "eingehalten"}
            </span>
            ${tolPill}
          </div>

          <div class="footer">
            Leasing KM Card v${VERSION} · ${new Date().toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })} Uhr
          </div>

        </div>
      </ha-card>
    `;

    root.innerHTML = "";
    root.appendChild(style);
    const el = document.createElement("div");
    el.innerHTML = html;
    root.appendChild(el);
  }

  _render() {
    const root = this.shadowRoot;
    if (!root) return;

    const style = document.createElement("style");
    style.textContent = STYLES;

    if (!this._hass) {
      root.innerHTML = "";
      root.appendChild(style);
      const el = document.createElement("div");
      el.innerHTML = `<ha-card><div class="card"><div class="state-msg"><span class="icon">🚗</span>Lade …</div></div></ha-card>`;
      root.appendChild(el);
      return;
    }

    this._renderContent(root, style);
  }

  getCardSize() { return 12; }
}

// ─── Editor ───────────────────────────────────────────────────────────────────

class LeasingKmCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = {};
  }

  setConfig(config) {
    this._config = config;
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  _render() {
    const root   = this.shadowRoot;
    const hass   = this._hass;
    const style  = document.createElement("style");
    style.textContent = STYLES;
    root.innerHTML = "";
    root.appendChild(style);

    const instances = hass ? discoverInstances(hass) : [];
    const current   = this._config.entity_prefix || "";

    const optionsHtml = instances.length > 0
      ? instances.map(i =>
          `<option value="${i.prefix}" ${i.prefix === current ? "selected" : ""}>${i.label} (${i.prefix})</option>`
        ).join("")
      : `<option value="${current}">${current || "– keine Instanz gefunden –"}</option>`;

    const el = document.createElement("div");
    el.innerHTML = `
      <div class="editor">
        <label>Leasing-Instanz</label>
        <select id="entity_prefix">${optionsHtml}</select>
        <div class="hint">Automatisch erkannte Leasing KM-Rechner Instanzen</div>

        <label>Titel (optional)</label>
        <input id="title" type="text" placeholder="Wird automatisch befüllt" value="${this._config.title || ""}">
      </div>
    `;
    root.appendChild(el);

    const fire = () => {
      const val = root.getElementById("entity_prefix").value;
      const ttl = root.getElementById("title").value;
      this.dispatchEvent(new CustomEvent("config-changed", {
        detail: { config: { ...this._config, entity_prefix: val, title: ttl || undefined } },
        bubbles: true, composed: true,
      }));
    };

    root.getElementById("entity_prefix").addEventListener("change", fire);
    root.getElementById("title").addEventListener("input", fire);
  }
}

// ─── Register ─────────────────────────────────────────────────────────────────

customElements.define("leasing-km-card", LeasingKmCard);
customElements.define("leasing-km-card-editor", LeasingKmCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type:        "leasing-km-card",
  name:        "Leasing KM Card",
  description: "Modernes Dashboard für die Leasing KM-Rechner Integration – mit automatischer Instanz-Erkennung",
  preview:     true,
  documentationURL: "https://github.com/sphings79/leasing_km_card",
});

console.info(
  `%c LEASING-KM-CARD %c v${VERSION} `,
  "background:#6366f1;color:#fff;font-weight:700;padding:2px 6px;border-radius:3px 0 0 3px",
  "background:#1e2333;color:#6366f1;font-weight:700;padding:2px 6px;border-radius:0 3px 3px 0",
);
