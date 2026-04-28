# 🚗 Leasing KM Card – Lovelace Custom Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![HA Version](https://img.shields.io/badge/Home%20Assistant-2026.4%2B-blue)](https://www.home-assistant.io/)

Modernes Lovelace-Dashboard für die [Leasing KM-Rechner Integration](https://github.com/sphings79/km_leasing_check_ha).  
Zeigt Soll-Ist-Vergleich, Prognosen, Restkilometer, Statusanzeigen und – wenn aktiviert – die Kostenberechnung in einer kompakten, responsiven Karte.

---

## ✨ Features

- **Halbkreis-Gauge** mit Nadel und Soll-Markierung
- **Fortschrittsbalken** (Ist vs. Soll, farblich je nach Status)
- **Status-Badges** (Über Soll / Im Rahmen / Limit gefährdet)
- **Metriken-Grid** für alle Sensor-Werte
- **Prognose-Kacheln** für Jahres- und Laufzeitende
- **Kostenberechnung** – Sektion mit Prognose Abweichung, Kosten/Erstattung und konfigurierten Vertragsparametern (optional, nur wenn in der Integration aktiviert)
- **Status-Pills** für alle Binärsensoren inkl. Toleranzgrenze
- Automatisches **Dark / Light Theme** (nutzt HA CSS-Variablen)
- Visueller **Card-Editor** in der UI (kein YAML-Tippen nötig)

---

## 📋 Voraussetzungen

| Anforderung | Details |
|---|---|
| Home Assistant | 2026.4 oder neuer |
| Leasing KM-Rechner Integration | v1.1.0b2 oder neuer – [→ GitHub](https://github.com/sphings79/km_leasing_check_ha) |

---

## 🚀 Installation

### Option A – HACS (empfohlen)

1. HACS öffnen → **Frontend** → Drei-Punkte-Menü → **Benutzerdefinierte Repositories**
2. URL dieses Repos eintragen, Kategorie **Lovelace** wählen → **Hinzufügen**
3. „Leasing KM Card" suchen und installieren
4. Browser-Cache leeren (Strg + Shift + R)

### Option B – Manuell

1. `leasing-km-card.js` in `config/www/` kopieren
2. In HA: **Einstellungen → Dashboards → Ressourcen → + Ressource hinzufügen**
3. URL: `/local/leasing-km-card.js` · Typ: **JavaScript-Modul**
4. Browser-Cache leeren

---

## ⚙️ Konfiguration

### Minimale Konfiguration (YAML)

```yaml
type: custom:leasing-km-card
entity_prefix: leasing
```

### Vollständige Konfiguration

```yaml
type: custom:leasing-km-card
entity_prefix: leasing
title: Mein Leasing-Auto
```

### Parameter

| Parameter | Pflicht | Standard | Beschreibung |
|---|---|---|---|
| `entity_prefix` | ✅ | – | Präfix der Entitäten (z. B. `leasing` → `sensor.leasing_km_absolviert`) |
| `title` | ❌ | Auto | Titel in der Karten-Kopfzeile |

---

## 🔍 Entity Prefix ermitteln

Der `entity_prefix` entspricht dem ersten Teil des Entitätsnamens nach `sensor.` bis zum ersten Unterstrich-Block.

**Beispiel:** Wenn deine Entitäten so heißen:
```
sensor.leasing_km_absolviert
sensor.leasing_differenz_heute
binary_sensor.leasing_ueber_soll
```
→ dann ist der Prefix `leasing`.

Bei mehreren Fahrzeugen (z. B. `sensor.vw_golf_km_absolviert`) entsprechend `vw_golf` eintragen.

---

## 📊 Angezeigte Werte

| Bereich | Wert |
|---|---|
| Gauge | KM absolviert % mit Soll-Markierung und Nadel |
| Fortschrittsbalken | Ist- vs. Soll-Fortschritt (grün/rot) |
| Soll-Ist | Differenz heute, Differenz Monatsende, km/Tag Ist & Soll, Noch erlaubt |
| Prognose | Jahresende, Laufzeitende, Jahresbudget |
| Restkilometer | Bis Jahresende, Bis Laufzeitende |
| Kostenberechnung ¹ | Prognose Abweichung (km), Prognose Kosten/Erstattung (€), Vertragsparameter |
| Status-Pills | Über Soll · Jahres-KM gefährdet · Limit überschritten · Toleranz überschritten ¹ |

¹ Nur sichtbar wenn die Kostenberechnung in der Leasing KM-Rechner Integration aktiviert ist.

---

## 💶 Kostenberechnung

Die Kostenberechnung-Sektion erscheint automatisch sobald sie in der Integration aktiviert wurde. Sie zeigt:

- **Prognose Abweichung** – voraussichtliche Mehr- (+) oder Minderkilometer (−) am Vertragsende
- **Prognose Kosten/Erstattung** – errechnete Nachzahlung (+) oder Erstattung (−) in €
- **Vertragsparameter** als Chips: Nachbelastungssatz Mehr-km, Erstattungssatz Minder-km, Toleranzgrenzen, Max. Erstattungsgrenze

---

## 🔧 Mehrere Fahrzeuge

Für jedes Fahrzeug einfach eine eigene Karte mit dem jeweiligen `entity_prefix` anlegen:

```yaml
type: custom:leasing-km-card
entity_prefix: vw_golf
title: VW Golf

---

type: custom:leasing-km-card
entity_prefix: bmw_3er
title: BMW 3er
```

---

## 📝 Changelog

### 1.1.0b1
- Neue Sektion „Kostenberechnung" (wird automatisch angezeigt wenn in der Integration aktiviert)
- Prognose Abweichung Laufzeitende in km (farblich: rot = Mehr, blau = Minder)
- Prognose Kosten/Erstattung in € (farblich: rot = Nachzahlung, grün = Erstattung)
- Vertragsparameter als Chips: Mehr-/Minder-Satz, Toleranzgrenzen, Erstattungsgrenze
- Neuer Status-Pill „Toleranz überschritten" (amber/grün)
- `fmtEur()` Hilfsfunktion für €-Formatierung mit Vorzeichen

### 1.0.0
- Erstveröffentlichung
- Halbkreis-Gauge mit Ist-Nadel und Soll-Markierung
- Fortschrittsbalken mit Ist/Soll-Layering
- Vollständiger Metriken-Überblick in 4 Abschnitten
- Status-Badges und Pills für alle 3 Binärsensoren
- Visueller Card-Editor
- Dark/Light Theme über HA CSS-Variablen

---

## 📄 Lizenz

MIT License
