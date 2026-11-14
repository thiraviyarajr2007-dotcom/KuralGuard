---
name: Civic Shield Guard
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#44474e'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#75777f'
  outline-variant: '#c5c6cf'
  surface-tint: '#4d5f81'
  primary: '#000a20'
  on-primary: '#ffffff'
  primary-container: '#0d2140'
  on-primary-container: '#7789ae'
  inverse-primary: '#b5c7ee'
  secondary: '#00677d'
  on-secondary: '#ffffff'
  secondary-container: '#50d9fe'
  on-secondary-container: '#005c70'
  tertiary: '#140800'
  on-tertiary: '#ffffff'
  tertiary-container: '#331d00'
  on-tertiary-container: '#bf7a00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e2ff'
  primary-fixed-dim: '#b5c7ee'
  on-primary-fixed: '#061b3a'
  on-primary-fixed-variant: '#354768'
  secondary-fixed: '#b3ebff'
  secondary-fixed-dim: '#4cd6fb'
  on-secondary-fixed: '#001f27'
  on-secondary-fixed-variant: '#004e5f'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 3.5rem
    fontWeight: '800'
    lineHeight: 4.25rem
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: 2.75rem
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.75rem
    fontWeight: '700'
    lineHeight: 2.25rem
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.5rem
    fontWeight: '700'
    lineHeight: 2rem
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.5rem
  body-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.75rem
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.5rem
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.25rem
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: 1.25rem
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.75rem
    fontWeight: '700'
    lineHeight: 1rem
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.6875rem
    fontWeight: '700'
    lineHeight: 0.875rem
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style
The design system establishes a high-trust, empowering, and action-oriented civic-tech atmosphere tailored for student communities and young adults. It bridges institutional reliability with modern digital vibrancy, transforming anxiety-inducing local safety reports into calm, structured, and pragmatic next steps. 

### Visual Archetype & Aesthetics
Drawing heavily from modern civic minimalism with soft neo-structural card layouts:
- **Trust & Vigilance:** Deep navy tones build grounding authority, preventing the platform from feeling like a volatile social feed.
- **Optimism & Clarity:** Vibrant cyan and emerald-teal elements signal technical capability, resolution, and safe passage.
- **Functional Urgency:** Warm amber and clear crimson triage hazard levels without inducing panic.
- **Friendly Precision:** Large corner radii, legible geometric sans-serif typography, generous touch targets, and tactile surface separation foster safety and accessibility across mobile and desktop.

## Colors
The color architecture delivers high-contrast readability and intuitive safety triage. Surfaces remain crisp, clean, and glare-free.

### Color Tiers & Roles
- **Primary Navy (`#0D2140` / `#0A192F`):** Used for primary navigation headers, dominant buttons, key headings, and anchoring interface cards. Evokes structural authority and trust.
- **Vibrant Cyan/Teal (`#00B4D8` / `#06D6A0`):** Used for interactive triggers, verification badges, live signals, and confirmed safety actions. Indicates safe status and platform intelligence.
- **Alert Amber (`#F59E0B`):** Reserved for moderate advisories, pending verifications, and cautious community notices.
- **Critical Crimson (`#EF4444` / `#F43F5E`):** Reserved for immediate incident briefs, high-risk flags, emergency action calls, and SOS triggers.
- **Surfaces & Neutral Grays:**
  - Base canvas: `#F8FAFC` (soft slate white to reduce harsh contrast).
  - Surface cards: `#FFFFFF` with structural borders in `#E2E8F0`.
  - Body text: `#1E293B` ensuring strict WCAG AAA contrast against white surfaces.
  - Subdued metadata: `#64748B`.

## Typography
The system balances the geometric energy of Plus Jakarta Sans for titles, calls to action, and indicators with the functional readability of Inter for incident narrations and resolution guidelines.

- Headings use tight letter tracking (`-0.02em`) to command attention without feeling aggressive.
- Labels and status tags utilize bold weights with slight positive letter spacing to remain instantly scannable during urgent navigation.
- Body text utilizes open apertures and balanced line heights to ensure students reading incident briefs in low light or on moving transit face zero cognitive friction.

## Layout & Spacing
A fluid 12-column responsive layout anchors the desktop brief dashboard, shifting seamlessly into an uncluttered 4-column feed on mobile devices.

### Layout Mechanics
- **Max Content Constraint:** Main briefing interfaces lock to a max width of `1200px` for optimal scanning.
- **Section Rhythm:** Canvas margin defaults to `2rem` on desktop and scales down to `1rem` on mobile screens to preserve viewable area.
- **Card Gutter & Separation:** Component cards maintain consistent `1.5rem` gutters on desktop, collapsing to `1rem` on mobile. Nested content maintains strict multiples of `0.25rem` (4px base unit).

## Elevation & Depth
Depth is articulated via crisp structural outlines and soft ambient shadows. Rather than dark, muddied drop shadows, the design uses tinted, highly diffused navy shadows that feel native to the palette.

### Elevation Hierarchy
- **Level 0 (Base Canvas):** Background tone `#F8FAFC`, flat, without shadows.
- **Level 1 (Default Cards & Tiles):** Pure white background (`#FFFFFF`), solid border `1px solid #E2E8F0`, ambient shadow `0 2px 8px -2px rgba(13, 33, 64, 0.04)`.
- **Level 2 (Interactive Hover & Brief Cards):** Pure white background (`#FFFFFF`), border `1px solid #CBD5E1`, shadow `0 10px 24px -4px rgba(13, 33, 64, 0.08)`.
- **Level 3 (Modals, Overlays & Urgent Drawers):** Elevates above the canvas with a directional ambient drop shadow `0 20px 32px -8px rgba(10, 25, 47, 0.16)` and backdrop blur `backdrop-filter: blur(8px)`.
- **Level 4 (Sticky Safety Action Bar):** Float pinned to bottom viewport on mobile with `0 -4px 16px 0 rgba(13, 33, 64, 0.06)`.

## Shapes
The shape language uses approachable, rounded contours that make civic reporting feel non-bureaucratic, welcoming, and intuitive.

- **Primary Cards & Brief Containers:** Standardize on `rounded-2xl` (1rem to 1.25rem radius), reinforcing a tactile, contemporary feel.
- **Buttons, Badges & Input Fields:** Utilize `rounded-xl` (0.75rem radius) for natural ergonomics and comfortable finger interaction.
- **Status Pills, Risk Indicators & Avatars:** Fully rounded pill curves (`9999px`) to delineate status tokens from rectangular content wrappers.

## Components

### Buttons
- **Primary Action (Trust Navy):** Solid `#0D2140` fill, white label in Plus Jakarta Sans SemiBold. Hover transforms to `#0A192F` with gentle y-translation (-1px).
- **Secondary / Actionable (Vibrant Cyan):** Solid `#00B4D8` fill, dark navy text `#0A192F`, providing strong focal guidance for key resolutions ("Take Next Step").
- **Alert / SOS Action:** Fill `#EF4444`, white text, designed for instant recognition with high contrast against the light canvas.
- **Subtle Outline:** Border `1.5px solid #E2E8F0`, transparent background, dark slate text. Hover adds `#F1F5F9` background.

### Risk & Status Chips
- **Low Risk / Safe:** Background `#ECFDF5`, text `#047857`, border `1px solid #A7F3D0` with leading dot indicator `#06D6A0`.
- **Advisory / Caution:** Background `#FFFBEB`, text `#B45309`, border `1px solid #FDE68A` with leading dot indicator `#F59E0B`.
- **Critical / High Alert:** Background `#FEF2F2`, text `#B91C1C`, border `1px solid #FECACA` with leading dot indicator `#EF4444`.
- All chips are styled with pill shape (`rounded-full`), `px-3 py-1`, and `label-md` typography.

### Incident Brief Cards
- Structured layout with a left accent border denoting incident severity (4px thick: Cyan for verified safe/info, Amber for precaution, Coral for active concern).
- Elevated on white background with `rounded-2xl`, containing header row (Timestamp + Badge), Brief Narrative in `body-md`, and an anchored "Recommended Next Step" actionable container with an arrow icon.

### Form Inputs & Selectors
- Background `#FFFFFF`, border `1.5px solid #E2E8F0`, `rounded-xl`, padding `0.75rem 1rem`.
- Focus state activates an outline ring: `border-color: #00B4D8` with `box-shadow: 0 0 0 3px rgba(0, 180, 216, 0.2)`.
- Placeholder text in `#94A3B8`.

### Checkboxes & Toggle Controls
- Box size `20px x 20px`, `rounded-md`, border `2px solid #CBD5E1`.
- Checked state fills `#0D2140` with an authentic white checkmark icon.

### Safety Brief "Next Step" Stepper
- Sequential step guide indicating who to notify (e.g., Campus Security, Resident Advisor, Municipal Light Dept).
- Numbered circular badges (`#00B4D8` fill or outlined `#E2E8F0`), connected by a 2px vertical guide rail in `#E2E8F0`.