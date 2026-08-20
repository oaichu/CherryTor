# DESIGN SPECIFICATION — CHERRYTOR

## 1. Visual Contract & Design Tokens
All UI and rendering must strictly consume tokens defined in `design/tokens-v1.json`.

* **Base Surface (Terminal Dark - Default)**:
  - Canvas: `#0B0F0C` (Neutral Deep Black-Green)
  - Surface: `#111712` (Container / Header / Card Background)
  - Elevated Surface: `#162018` (Filter Chips, Selected States, Dialog Header)
  - Hover Surface: `#1D2920` (Row / Button Hover)
* **Terminal Light Surface**:
  - Canvas: `#EEF5EF`
  - Surface: `#E0ECE2`
  - Elevated: `#D3E2D6`
* **Borders & Outlines**:
  - Default: `1px solid #314337`
  - Subtle: `1px solid #1D2920`
  - Accent / Focus: `1px solid #57FF8A` with active glow `0 0 0 2px rgba(87, 255, 138, 0.25)`
* **Accents & Semantics**:
  - `Terminal Green`: `#57FF8A` (Primary accent, brand active, download signals, high health)
  - `Cherry Red`: `#FF5C72` (Brand cherry highlight, danger, error, low swarm)
  - `Cyber Cyan`: `#61D6FF` (Magnet polarity caps, info badges, protocol details)
  - `Warning Amber`: `#FFD166` (Moderate swarm, latency degradation warning)
* **CRT Layering**:
  - Scanline shader with configurable opacity (`0.035` default, `0` when disabled or reduced-motion).

## 2. Typography
* **Logo & Command Headings**: `"Press Start 2P", monospace` (Used strictly for branding, headings, and short badges).
* **Data Rows, Metadata & Prose**: `"IBM Plex Mono", "JetBrains Mono", Consolas, monospace` (Optimized for scanability, tabular numbers, and long title readability).

## 3. Interaction & Accessibility Invariants
* **Safe Text Rendering**: All user-supplied and provider-supplied strings (titles, categories, source names) must be inserted strictly via `textContent` or text node instantiation. Zero `innerHTML` sinks permitted.
* **Density Modes**: Support `comfortable` (12px row padding) and `compact` (8px row padding) without altering component markup.
* **Keyboard Navigation**: Global `/` focuses search bar, `Escape` dismisses modals, full `:focus-visible` ring coverage.
