# Moodify AI — Design System (Google Stitch Format)

This document serves as the source of truth for the styling, design system, and component architecture of the **Moodify AI** web application.

---

## 1. Color Palette

```
  Primary Accent:   Retro Neon Coral   -->   #ff5e3a to #ff2a6d
  Secondary Accent: Cyber Purple       -->   #8a2be2 to #4b0082
  Background Dark:  Pure Cyber Ink     -->   #0f0f11 to #1c1c21
  Glass Cards:      Translucent Slate  -->   rgba(255, 255, 255, 0.03) with 12px blur
  Borders:          Low-opacity Silver -->   rgba(255, 255, 255, 0.06)
```

| Token Name | Value / HEX | Purpose |
| :--- | :--- | :--- |
| `--bg-dark-radial` | `radial-gradient(circle at 50% 50%, #1c1c22 0%, #0e0e10 100%)` | Main application background |
| `--accent-gradient`| `linear-gradient(135deg, #ff5e3a 0%, #ff2a6d 100%)` | Primary buttons, active tabs, glowing accents |
| `--purple-gradient`| `linear-gradient(135deg, #8a2be2 0%, #4a00e0 100%)` | AI scanner status glow, scanner overlays |
| `--card-bg` | `rgba(255, 255, 255, 0.02)` | Glassmorphic panel and song card background |
| `--border-color` | `rgba(255, 255, 255, 0.05)` | Subtle boundaries, borders |
| `--text-primary` | `#ffffff` | Primary readable text |
| `--text-secondary` | `rgba(255, 255, 255, 0.6)` | Secondary labels, descriptions |
| `--text-muted` | `rgba(255, 255, 255, 0.35)` | Timestamps, counters, icons |

---

## 2. Typography

*   **Header Typeface**: `Outfit`, Sans-Serif (Weights: `600`, `700`, `800`)
*   **Body Typeface**: `Inter`, Sans-Serif (Weights: `400`, `500`)
*   **Font Sizes**:
    *   Display Header (`h1`): `2.4rem` (bold, tracking: `-0.02em`)
    *   Section Header (`h2`): `1.8rem` (bold, tracking: `-0.01em`)
    *   Card Title (`h3`): `1.0rem` (semibold)
    *   Body Text: `0.92rem` (regular)
    *   Caption Text: `0.75rem` (medium, uppercase, letter-spacing: `1.5px`)

---

## 3. UI Component Specifications

### 3.1 Sidebar (Left)
*   **Width**: `280px` fixed.
*   **Background**: Glassmorphic dark overlay (`rgba(14, 14, 16, 0.75)`, blur: `20px`).
*   **Items**:
    *   Hover state: Scale up by `1.02` with slight white glow (`rgba(255, 255, 255, 0.05)`).
    *   Active state: `linear-gradient` with thin border `rgba(255, 94, 58, 0.25)`.
    *   Integrated logout button at the bottom.

### 3.2 Main Panel
*   **Padding**: `2rem 3.5rem` to feel roomy and premium.
*   **Header**: Flat search bar with inline SVG icon + right-aligned user profile badge.

### 3.3 Song Library Grid
*   **Layout**: CSS Grid (`repeat(auto-fill, minmax(170px, 1fr))`, gap: `1.5rem`).
*   **Card Design**:
    *   Rounded corners: `16px`.
    *   Aspect ratio: `1:1` cover wrapper with hidden play overlay.
    *   Hover effect: lift up (`transform: translateY(-6px)`), drop shadow expansion, and smooth zoom of the poster.
    *   Active playing state: Glow border (`rgba(255, 94, 58, 0.4)`), titles highlight, and a dynamic bouncing equalizer overlay.

### 3.4 AI webcam Scanner
*   **Aspect Ratio**: `4:3` container with a mirrored video feed.
*   **Scan Overlay**: A neon pink horizontal bar animating vertically with a drop shadow filter glow.
*   **Markers**: Neon coral corner borders (`3px` thickness) framing the face detection zone.

---

## 4. UI/UX Motion Guidelines

*   **Standard Transition**: `0.25s cubic-bezier(0.4, 0, 0.2, 1)` for all scale and color properties.
*   **Equalizer Bar Animation**: Bouncing scale keys (`animation: bounce 0.8s alternate infinite`).
*   **Scanline Speed**: `3s` linear loop.
