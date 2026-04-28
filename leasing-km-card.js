/**
 * Leasing KM Card
 * A modern Lovelace card for the Leasing KM-Rechner integration.
 * https://github.com/sphings79/leasing-km-card
 */

const VERSION = "1.0.0";

// ─── Styles ───────────────────────────────────────────────────────────────────

const STYLES = `
  :host {
    --lkm-green:      #4ade80;
    --lkm-green-bg:   rgba(74,222,128,0.12);
    --lkm-red:        #f87171;
    --lkm-red-bg:     rgba(248,113,113,0.12);
    --lkm-amber:      #fbbf24;
    --lkm-amber-bg:   rgba(251,191,36,0.12);
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
    display: flex;
    align-items: center;
    gap: 12px;
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
  .header-sub { font-size: 12px; color: var(--lkm-text2); margin-top: 1px; }
  .header-badge {
    margin-left: auto;
    font-size: 11px; font-weight: 600;
    padding: 3px 10px;
    border-radius: 20px;
    border: 1px solid transparent;
    white-space: nowrap;
  }
  .badge-green { background: var(--lkm-green-bg); color: var(--lkm-green); border-color: rgba(74,222,128,0.2); }
  .badge-red   { background: var(--lkm-red-bg);   color: var(--lkm-red);   border-color: rgba(248,113,113,0.2); }
  .badge-amber { background: var(--lkm-amber-bg); color: var(--lkm-amber); border-color: rgba(251,191,36,0.2); }

  /* ── Gauge ── */
  .gauge-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 20px 0;
  }
  .gauge-svg { width: 220px; height: 130px; overflow: visible; }
  .gauge-track { fill: none; stroke: var(--lkm-bg3); stroke-width: 16; stroke-linecap: round; }
  .gauge-green { fill: none; stroke: var(--lkm-green); stroke-width: 16; stroke-linecap: round; transition: stroke-dashoffset 0.7s ease; }
  .gauge-red   { fill: none; stroke: var(--lkm-red);   stroke-width: 16; stroke-linecap: round; transition: stroke-dashoffset 0.7s ease; }
  .gauge-needle { stroke: var(--lkm-text); stroke-width: 3; stroke-linecap: round; transition: transform 0.7s ease; transform-origin: 110px 110px; }
  .gauge-center { fill: var(--lkm-accent); }
  .gauge-center-dot { fill: white; }
  .gauge-val { font-size: 28px; font-weight: 700; fill: var(--lkm-text); text-anchor: middle; }
  .gauge-unit { font-size: 12px; fill: var(--lkm-text2); text-anchor: middle; }
  .gauge-label-l { font-size: 10px; fill: var(--lkm-text3); text-anchor: middle; }
  .gauge-label-r { font-size: 10px; fill: var(--lkm-text3); text-anchor: middle; }

  /* ── Progress bar ── */
  .progress-section {
    padding: 14px 20px;
  }
  .progress-row {
    display: flex; justify-content: space-between; align-items: baseline;
    margin-bottom: 6px;
  }
  .progress-label { font-size: 12px; color: var(--lkm-text2); }
  .progress-value { font-size: 12px; font-weight: 600; color: var(--lkm-text); }
  .bar-wrap {
    position: relative; height: 8px;
    background: var(--lkm-bg3);
    border-radius: 4px; overflow: hidden;
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

  /* ── Separator ── */
  .sep {
    border: none;
    border-top: 1px solid var(--lkm-border);
    margin: 0 20px;
  }

  /* ── Section label ── */
  .section-label {
    font-size: 10px; font-weight: 600;
    color: var(--lkm-text3);
    text-transform: uppercase; letter-spacing: 0.09em;
    padding: 14px 20px 8px;
  }

  /* ── Metric grid ── */
  .metric-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    padding: 0 20px 14px;
  }
  .metric-grid.cols3 { grid-template-columns: repeat(3, 1fr); }
  .metric {
    background: var(--lkm-bg2);
    border: 1px solid var(--lkm-border);
    border-radius: var(--lkm-radius-sm);
    padding: 11px 12px;
  }
  .metric-label {
    font-size: 10px; color: var(--lkm-text2);
    margin-bottom: 4px; line-height: 1.3;
  }
  .metric-value {
    font-size: 18px; font-weight: 600;
    color: var(--lkm-text); line-height: 1.15;
  }
  .metric-value.green { color: var(--lkm-green); }
  .metric-value.red   { color: var(--lkm-red); }
  .metric-value.amber { color: var(--lkm-amber); }
  .metric-sub { font-size: 10px; color: var(--lkm-text3); margin-top: 2px; }

  /* ── Status strip ── */
  .status-strip {
    display: flex; gap: 6px; flex-wrap: wrap;
    padding: 0 20px 16px;
  }
  .status-pill {
    display: flex; align-items: center; gap: 5px;
    font-size: 11px; font-weight: 500;
    padding: 4px 10px;
    border-radius: 20px; border: 1px solid transparent;
  }
  .pill-dot {
    width: 6px; height: 6px;
    border-radius: 50%; flex-shrink: 0;
  }
  .pill-green { background: var(--lkm-green-bg); color: var(--lkm-green); border-color: rgba(74,222,128,0.2); }
  .pill-green .pill-dot { background: var(--lkm-green); }
  .pill-red   { background: var(--lkm-red-bg);   color: var(--lkm-red);   border-color: rgba(248,113,113,0.2); }
  .pill-red   .pill-dot { background: var(--lkm-red); }
  .pill-neutral { background: var(--lkm-bg2);    color: var(--lkm-text2); border-color: var(--lkm-border); }

  /* ── Footer ── */
  .footer {
    padding: 10px 20px 14px;
    font-size: 10px; color: var(--lkm-text3);
    text-align: center;
    border-top: 1px solid var(--lkm-border);
  }

  /* ── Error / loading ── */
  .state-msg {
    padding: 32px 20px;
    text-align: center;
    color: var(--lkm-text2);
    font-size: 13px;
    line-height: 1.6;
  }
  .state-msg .icon { font-size: 32px; display: block; margin-bottom: 8px; }

  /* ── Editor ── */
  .editor { padding: 16px; }
  .editor label {
    display: block;
    font-size: 12px; color: var(--secondary-text-color);
    margin-bottom: 4px; margin-top: 14px;
  }
  .editor label:first-of-type { margin-top: 0; }
  .editor input, .editor select {
    width: 100%; padding: 8px 10px;
    background: var(--secondary-background-color);
    border: 1px solid var(--divider-color);
    border-radius: 6px;
    color: var(--primary-text-color);
    font-size: 13px;
    font-family: inherit;
    outline: none;
  }
  .editor input:focus, .editor select:focus {
    border-color: var(--accent-color);
  }
`;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmtN   = (n, dec = 0) => (typeof n === "number" ? n.toLocaleString("de-DE", { minimumFractionDigits: dec, maximumFractionDigits: dec }) : "–");
const sign   = (n) => (n > 0 ? "+" : "");
const clamp  = (v, lo, hi) => Math.min(Math.max(v, lo), hi);

function getState(hass, entityId) {
  if (!entityId || !hass.states[entityId]) return null;
  const s = hass.states[entityId].state;
  if (["unavailable", "unknown", ""].includes(s)) return null;
  return parseFloat(s);
}

function getBool(hass, entityId) {
  if (!entityId || !hass.states[entityId]) return null;
  return hass.states[entityId].state === "on";
}

function getAttr(hass, entityId, attr) {
  if (!entityId || !hass.states[entityId]) return null;
  return hass.states[entityId].attributes?.[attr] ?? null;
}

// ─── Gauge arc helper ─────────────────────────────────────────────────────────

/**
 * Generates a semicircular arc SVG path.
 * cx=110, cy=110, r=90 → arc from 180° to 0° (left to right across top)
 */
function arcPath(cx, cy, r, startDeg, endDeg) {
  const toRad = (d) => (d * Math.PI) / 180;
  const x1 = cx + r * Math.cos(toRad(startDeg));
  const y1 = cy + r * Math.sin(toRad(startDeg));
  const x2 = cx + r * Math.cos(toRad(endDeg));
  const y2 = cy + r * Math.sin(toRad(endDeg));
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
}

// Arc spans from 180° to 360° (semicircle)
const ARC_START = 180;
const ARC_END   = 360;
const ARC_RANGE = ARC_END - ARC_START; // 180°

// ─── Card class ───────────────────────────────────────────────────────────────

class LeasingKmCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = {};
  }

  // ── HACS / HA registration ────────────────────────────────────────────────

  static getConfigElement() {
    return document.createElement("leasing-km-card-editor");
  }

  static getStubConfig() {
    return { entity_prefix: "leasing" };
  }

  // ── Config ────────────────────────────────────────────────────────────────

  setConfig(config) {
    if (!config.entity_prefix) {
      throw new Error("Bitte entity_prefix angeben (z. B. 'leasing' für sensor.leasing_…)");
    }
    this._config = config;
    this._render();
  }

  // ── HA state update ───────────────────────────────────────────────────────

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  // ── Entity id builder ─────────────────────────────────────────────────────

  _s(key)  { return `sensor.${this._config.entity_prefix}_${key}`; }
  _b(key)  { return `binary_sensor.${this._config.entity_prefix}_${key}`; }

  // ── Render ────────────────────────────────────────────────────────────────

  _render() {
    const root = this.shadowRoot;
    if (!root) return;

    const style = document.createElement("style");
    style.textContent = STYLES;

    const title    = this._config.title || "Leasing KM";
    const hass     = this._hass;

    if (!hass) {
      root.innerHTML = "";
      root.appendChild(style);
      const __el = document.createElement("div"); __el.innerHTML = `
        <ha-card>
          <div class="card">
            <div class="state-msg"><span class="icon">🚗</span>Lade …</div>
          </div>
        </ha-card>`;
    root.appendChild(__el);
      return;
    }

    // ── Read entities ────────────────────────────────────────────────────────
    const p = this._config.entity_prefix;

    const kmAkt      = getState(hass, this._s("tagesleistung_ist"))  // we use attrs from diff sensor
      // fallback: read from attributes of diff sensor
      ;
    const istDay     = getState(hass, this._s("tagesleistung_ist"));
    const sollDay    = getState(hass, this._s("tagesleistung_soll"));
    const sollHeute  = getState(hass, this._s("soll_km_heute"));
    const diffHeute  = getState(hass, this._s("differenz_heute"));
    const sollMon    = getState(hass, this._s("soll_km_monatsende"));
    const diffMon    = getState(hass, this._s("differenz_monatsende"));
    const verblJahr  = getState(hass, this._s("verbleibend_bis_jahresende"));
    const verblEnd   = getState(hass, this._s("verbleibend_bis_laufzeitende"));
    const nochErl    = getState(hass, this._s("noch_erlaubt_gesamt"));
    const jahresSoll = getState(hass, this._s("km_limit_pro_jahr"));
    const progJahr   = getState(hass, this._s("prognose_jahresende"));
    const progEnd    = getState(hass, this._s("prognose_laufzeitende"));
    const kmPct      = getState(hass, this._s("km_absolviert"));
    const laufPct    = getState(hass, this._s("laufzeit_absolviert"));

    const isOverSoll = getBool(hass, this._b("ueber_soll"));
    const jahresOver = getBool(hass, this._b("jahres_km_prognose_ueberschritten"));
    const endeOver   = getBool(hass, this._b("laufzeit_km_prognose_ueberschritten"));

    // extra attrs
    const vertragsende  = getAttr(hass, this._s("differenz_heute"), "vertragsende") || "–";
    const elapsedDays   = getAttr(hass, this._s("differenz_heute"), "elapsed_days");
    const totalDays     = getAttr(hass, this._s("differenz_heute"), "total_days");

    // Check if integration data is available at all
    if (kmPct === null && laufPct === null && sollHeute === null) {
      root.innerHTML = "";
      root.appendChild(style);
      const __el = document.createElement("div"); __el.innerHTML = `
        <ha-card>
          <div class="card">
            <div class="state-msg">
              <span class="icon">🔌</span>
              Keine Daten gefunden.<br>
              Bitte <b>entity_prefix</b> prüfen:<br>
              <code style="font-size:11px;opacity:.7">sensor.<b>${p}</b>_km_absolviert</code>
            </div>
          </div>
        </ha-card>`;
    root.appendChild(__el);
      return;
    }

    // ── Gauge values ─────────────────────────────────────────────────────────
    const istP  = clamp(kmPct   ?? 0, 0, 100);
    const sollP = clamp(laufPct ?? 0, 0, 100);
    const over  = isOverSoll ?? (diffHeute !== null ? diffHeute > 0 : false);
    const gaugeColor = over ? "var(--lkm-red)" : "var(--lkm-green)";

    // Needle angle: maps 0–100% to 180°–360°
    const needleDeg = ARC_START + (istP / 100) * ARC_RANGE;
    // Needle endpoint (r=72)
    const needleRad = (needleDeg * Math.PI) / 180;
    const nx = 110 + 72 * Math.cos(needleRad);
    const ny = 110 + 72 * Math.sin(needleRad);

    // Arc path for gauge fill (green/red) — istP %
    const arcFillEnd = ARC_START + (istP / 100) * ARC_RANGE;
    const arcFillPath = arcPath(110, 110, 90, ARC_START, arcFillEnd);
    const arcTrackPath = arcPath(110, 110, 90, ARC_START, ARC_END);

    // Soll marker position
    const sollDeg = ARC_START + (sollP / 100) * ARC_RANGE;
    const sollRad = (sollDeg * Math.PI) / 180;
    const sm1x = 110 + 83 * Math.cos(sollRad);
    const sm1y = 110 + 83 * Math.sin(sollRad);
    const sm2x = 110 + 97 * Math.cos(sollRad);
    const sm2y = 110 + 97 * Math.sin(sollRad);

    // ── Badge ────────────────────────────────────────────────────────────────
    const badgeClass = endeOver ? "badge-red" : over ? "badge-amber" : "badge-green";
    const badgeText  = endeOver ? "⚠ Limit gefährdet" : over ? "▲ Über Soll" : "✓ Im Rahmen";

    // ── HTML ─────────────────────────────────────────────────────────────────
    const html = `
      <ha-card>
        <div class="card">

          <!-- Header -->
          <div class="header">
            <div class="header-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <div>
              <div class="header-title">${title}</div>
              <div class="header-sub">Vertragsende ${vertragsende !== "–" ? new Date(vertragsende).toLocaleDateString("de-DE") : "–"}</div>
            </div>
            <span class="header-badge ${badgeClass}">${badgeText}</span>
          </div>

          <!-- Gauge -->
          <div class="gauge-wrap">
            <svg class="gauge-svg" viewBox="0 40 220 100">

              <!-- Track -->
              <path class="gauge-track" d="${arcTrackPath}"/>

              <!-- Fill arc -->
              <path d="${arcFillPath}" fill="none" stroke="${gaugeColor}" stroke-width="16" stroke-linecap="round"
                style="transition: stroke-dashoffset 0.7s ease;"/>

              <!-- Soll marker -->
              <line x1="${sm1x}" y1="${sm1y}" x2="${sm2x}" y2="${sm2y}"
                stroke="rgba(255,255,255,0.5)" stroke-width="3" stroke-linecap="round"/>

              <!-- Labels -->
              <text x="22" y="122" class="gauge-label-l">0 km</text>
              <text x="198" y="122" class="gauge-label-r" text-anchor="end">100 %</text>

              <!-- Needle -->
              <line x1="110" y1="110" x2="${nx}" y2="${ny}"
                stroke="rgba(255,255,255,0.9)" stroke-width="2.5" stroke-linecap="round"/>

              <!-- Center -->
              <circle cx="110" cy="110" r="8" class="gauge-center"/>
              <circle cx="110" cy="110" r="3.5" class="gauge-center-dot"/>

              <!-- Value text -->
              <text x="110" y="100" class="gauge-val">${fmtN(istP, 1)} %</text>
              <text x="110" y="112" class="gauge-unit" style="font-size:9px;fill:var(--lkm-text2)">KM absolviert · Soll: ${fmtN(sollP, 1)} %</text>
            </svg>
          </div>

          <!-- Progress bars -->
          <div class="progress-section">
            <!-- KM progress -->
            <div class="progress-row">
              <span class="progress-label">KM-Fortschritt</span>
              <span class="progress-value">${fmtN(istP, 1)} %</span>
            </div>
            <div class="bar-wrap">
              <div class="bar-soll ${over ? "bar-bad" : "bar-ok"}" style="width:${sollP}%"></div>
              <div class="bar-ist  ${over ? "bar-bad" : "bar-ok"}" style="width:${istP}%"></div>
            </div>
            <div class="bar-sub">
              <span>Soll: ${fmtN(sollP, 1)} % (${fmtN(laufPct, 1)} % Laufzeit)</span>
              <span>${elapsedDays !== null ? `${elapsedDays} / ${totalDays} Tage` : ""}</span>
            </div>
          </div>

          <hr class="sep">

          <!-- Soll-Ist -->
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
              <div class="metric-value ${(nochErl ?? 1) < 5000 ? "amber" : ""}">${fmtN(nochErl)} km</div>
              <div class="metric-sub">bis Vertragsende</div>
            </div>
          </div>

          <hr class="sep">

          <!-- Prognose -->
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
              <div class="metric-label">Soll/Jahr</div>
              <div class="metric-value">${fmtN(jahresSoll)} km</div>
              <div class="metric-sub">Jahresbudget</div>
            </div>
          </div>

          <hr class="sep">

          <!-- Restkilometer -->
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
              <div class="metric-sub">${vertragsende !== "–" ? new Date(vertragsende).toLocaleDateString("de-DE") : "–"}</div>
            </div>
          </div>

          <!-- Status pills -->
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
          </div>

          <!-- Footer -->
          <div class="footer">
            Leasing KM-Rechner v${VERSION} · Aktualisiert: ${new Date().toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}
          </div>

        </div>
      </ha-card>
    `;

    root.innerHTML = "";
    root.appendChild(style);
    const __el = document.createElement("div"); __el.innerHTML = html; root.appendChild(__el);
  }

  // ── Card size hint ────────────────────────────────────────────────────────

  getCardSize() { return 10; }
}

// ─── Editor element ───────────────────────────────────────────────────────────

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
  }

  _render() {
    const root = this.shadowRoot;
    const style = document.createElement("style");
    style.textContent = STYLES;
    root.innerHTML = "";
    root.appendChild(style);
    const __el = document.createElement("div"); __el.innerHTML = `
      <div class="editor">
        <label>Titel</label>
        <input id="title" type="text" placeholder="Leasing KM" value="${this._config.title || ""}">

        <label>Entity Prefix <span style="opacity:.6">(Pflicht)</span></label>
        <input id="entity_prefix" type="text"
          placeholder="z. B. leasing → sensor.leasing_km_absolviert"
          value="${this._config.entity_prefix || ""}">
      </div>
    `;
    root.appendChild(__el);

    const fire = () => {
      const ev = new CustomEvent("config-changed", {
        detail: {
          config: {
            ...this._config,
            title:         root.getElementById("title").value || undefined,
            entity_prefix: root.getElementById("entity_prefix").value,
          },
        },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(ev);
    };

    root.getElementById("title").addEventListener("input", fire);
    root.getElementById("entity_prefix").addEventListener("input", fire);
  }
}

// ─── Register elements ────────────────────────────────────────────────────────

customElements.define("leasing-km-card", LeasingKmCard);
customElements.define("leasing-km-card-editor", LeasingKmCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type:        "leasing-km-card",
  name:        "Leasing KM Card",
  description: "Modernes Dashboard für die Leasing KM-Rechner Integration",
  preview:     true,
  documentationURL: "https://github.com/sphings79/leasing-km-card",
});

console.info(
  `%c LEASING-KM-CARD %c v${VERSION} `,
  "background:#6366f1;color:#fff;font-weight:700;padding:2px 6px;border-radius:3px 0 0 3px",
  "background:#1e2333;color:#6366f1;font-weight:700;padding:2px 6px;border-radius:0 3px 3px 0",
);
