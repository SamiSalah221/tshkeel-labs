# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `npm run dev` (Vite with HMR, localhost:5173)
- **Build:** `npm run build` (Vite production build, outputs to `dist/`)
- **Lint:** `npm run lint` (ESLint flat config)
- **Preview production build:** `npm run preview`

No test framework is configured.

## Tech Stack

- React 19 (JSX, no TypeScript)
- Vite 7 with `@vitejs/plugin-react`
- Tailwind CSS v4 (via `@tailwindcss/vite` plugin, theme defined in `src/index.css` `@theme` block)
- Three.js with `@react-three/fiber` and `@react-three/drei` for 3D rendering
- GSAP for scroll-linked animations
- ESLint flat config (`eslint.config.js`) with react-hooks and react-refresh plugins

## Architecture

Single-page landing site for a 3D printing business (Muslim Prints). The entire page lives inside an R3F `<Canvas>` using `<ScrollControls>` from drei — both the 3D scene and the HTML content scroll together within the canvas.

### Scroll System

`App.jsx` renders a `<Canvas>` with `<ScrollControls>` wrapping two `<Scroll>` layers:
1. **3D layer** (`<Scroll>`) — contains `Scene` (lighting + floating background geometries)
2. **HTML layer** (`<Scroll html>`) — contains all page sections (Hero, About, Products, Contact, Footer) in normal document flow inside a measured `<div ref={contentRef}>`

The `pages` prop on `<ScrollControls>` is dynamically measured from the HTML content height via `ResizeObserver`. Never use hardcoded page allocations — `pages` must always be derived from actual content height.

`ScrollBridge` connects drei's scroll system to a React context (`ScrollContext`) so the `Navbar` can trigger GSAP-animated scrolls. It finds targets via `querySelector('[data-section="X"]')` and scrolls to `element.offsetTop`.

### 3D Components (`src/components/three/`)

- **Scene** — composes Lighting + FloatingModels (no hero-specific 3D model)
- **FloatingModels** — checkerboard grid of semi-transparent 3D models (GLB via `useGLTF`, STL via `STLLoader`) as background decoration, spanning the full scroll height. When a theme has models in its `glbModels` array, ALL grid positions use real models (no primitive fallbacks)
- **ModelLoader** — loads GLB/GLTF (via `useGLTF`), STL (via `STLLoader`), or renders placeholder geometries when `modelPath` is null
- **ProductModel** — scroll-linked 3D product display (exists but currently unused)
- **Lighting** — multi-directional lights plus drei `Environment` preset ("sunset")

### Configuration (`src/config/`)

- **products.js** — product catalog arrays per theme (islamic/nerdy/flags). Each product has `modelPath`, `modelType`, `placeholderGeometry`, `color`, `scale`, `image` (optional photo path), and pricing fields
- **siteConfig.js** — business info, WhatsApp number (`16024035878`), prayer times ICS URL, `heroPages` and `aboutPages` for section min-heights

### Prayer Times (`src/hooks/usePrayerTimes.js`)

- Primary source: ICS calendar feed from `prayerwebcal.dsultan.com` (via CORS proxy chain: allorigins → corsproxy.io → direct)
- Fallback: AlAdhan API
- Timezone: America/Phoenix
- Displays Hijri date + next prayer time in the navbar
- Refreshes every 30 minutes

---

## Critical Layout Rules

### No Absolute Positioning for Page Sections
- NEVER use `position: absolute` with hardcoded `top` values for page sections (Hero, About, Products, Contact, Footer).
- All content sections MUST be in normal document flow (`position: static` or `position: relative`).
- Sections stack naturally using standard block layout. Spacing between sections is handled ONLY with padding (e.g., `style={{ padding: '64px 80px 32px' }}`), never with absolute offsets.
- The only element allowed to be `position: absolute` is the background/decorative layer (e.g., `islamic-bg`, 3D canvas background).

### No Vertical Centering on Full-Height Sections
- Do NOT use `flex items-center justify-center` on section wrappers that take up variable height. This causes content to float in the middle with huge empty gaps above and below.
- Section content should align to the top with appropriate top padding.

### Tailwind Responsive Classes Inside R3F HTML Overlay
- Tailwind responsive breakpoint classes (e.g., `md:px-20`, `lg:grid-cols-3`) may NOT compute correctly inside the R3F `<Scroll html>` overlay layer.
- When Tailwind responsive classes don't apply, use inline styles as a fallback: `style={{ padding: '0 80px' }}`.
- Center content with inline `style={{ maxWidth: '...', margin: '0 auto' }}` rather than relying solely on Tailwind's `mx-auto` inside the canvas.
- Always verify computed styles match the intended Tailwind classes when working inside the canvas overlay.

### Dynamic Page Measurement
- The `pages` prop on `<ScrollControls>` must always be dynamically measured from content height via `ResizeObserver` on the content wrapper div.
- Never add hardcoded page allocation values (like `productsPages`, `contactPages`, `footerPages`) — these were removed after causing massive dead zones.

---

## 3D Elements Rules

### Keep 3D — This is a 3D Printing Business
- The site MUST maintain its 3D visual identity. Never remove all 3D elements.
- The floating ambient 3D shapes scattered across all sections are a core design feature. Keep them.
- The interactive "View in 3D" modal for each product is a key feature. Keep it.

### Floating 3D Shapes (Ambient Decoration)
- Small geometric shapes (spheres, cubes, torus knots, pyramids, icosahedrons, etc.) float in the background across ALL sections.
- They must be small and decorative — they should NEVER overlap or obscure text, cards, or interactive elements.
- They render on the shared R3F canvas behind the HTML content overlay.
- Defined in `src/components/three/FloatingModels.jsx` — checkerboard grid, fixed Z=-3, opacity 0.35, gentle bobbing + slow rotation.
- **Background models are theme-specific.** Each theme (islamic/nerdy/flags) has its own `glbModels` array in `src/config/themes.js` under `scene.glbModels`. The array accepts both `.glb` and `.stl` paths — the component auto-detects the extension and uses `FloatingGLBModel` or `FloatingSTLModel` accordingly. When the theme has models, ALL grid positions use real 3D models (cycled through the array). Themes with empty `glbModels` arrays fall back to primitive geometries.

### Hero Section 3D
- The hero uses scattered floating 3D shapes around the central text card — NOT one large model covering the text.
- The text card must be fully readable with no 3D model overlap whatsoever.
- A dedicated hero 3D model was removed after 3 rounds of overlap issues. Do not re-add one.

### Product 3D Models
- Product cards in the grid do NOT show inline 3D models. They are clean info cards.
- Each product has a "View in 3D" button that opens `ProductViewerModal` — a separate `<Canvas>` with `OrbitControls` (drag to rotate, scroll to zoom, right-click to pan).
- Products with `modelPath: null` use placeholder primitives. When a real `.glb`/`.gltf`/`.stl` model is added, set `modelPath` to its path (e.g., `/models/islamic/fanoos.glb`) in the product entry in `src/config/products.js`.
- **Product images:** Each product can have an optional `image` field pointing to a photo in `public/images/products/{islamic,nerdy,fidgets,flags}/`. When `image` is set, `ProductCard` shows the photo; otherwise it falls back to the SVG illustration from `ProductIllustration.jsx`.
- **Model folder structure:** `public/models/{islamic,nerdy,flags}/` — each theme has its own subfolder. Never place models in the root `public/models/` directory.
- 3D model assets go in `public/models/{islamic,nerdy,flags}/` as `.glb`, `.gltf`, `.obj`, or `.stl` (configured as Vite asset includes in `vite.config.js`).

### Adding New 3D Models (Agent Teams Workflow)

**When the user says they added a new 3D model, use the agent teams feature.** Spawn two agents in parallel:

**Agent 1 — Product Card + Illustration:**
1. Find the new model file in `public/models/{section}/` and any matching photo in `public/images/products/{section}/`
2. Rename the model file to a clean hyphenated name if it has spaces/special characters (e.g., `madina keychain.glb` → `madina-keychain.glb`)
3. Add a product entry to `src/config/products.js` in the correct section array with the next available id, appropriate name/description/price/category, `modelPath`, `modelType`, `image` (if photo exists), and other standard fields
4. Add an SVG illustration function to `src/components/sections/ProductIllustration.jsx` and register it in the `ILLUSTRATIONS` map

**Agent 2 — Background Grid:**
1. Add the model path (using the clean hyphenated filename) to the `scene.glbModels` array in the matching theme in `src/config/themes.js`

**After both agents complete:** Run `npm run build` to verify.

**Important:** The new product must stay within its theme subsection (islamic/nerdy/flags). Never mix models across themes.

### No Stray 3D Annotation Labels
- Do NOT use R3F `<Html>` annotation elements attached to 3D world-space coordinates for product names. These leak outside their intended area and appear as tiny floating labels at wrong scroll positions.
- Product names belong ONLY in the HTML info cards, not as 3D scene annotations.

---

## Navigation

- Fixed nav bar at the top with: logo (left), Islamic date + next prayer time (center, desktop only), nav links (right: Home, About, Products, Contact).
- The Islamic date (Hijri calendar) and next prayer time MUST be displayed in the nav bar. This is a unique brand feature — do not remove it.
- Nav links smooth-scroll to their respective sections via `ScrollContext` → `ScrollBridge`.
- Every section must have a `data-section="name"` attribute (hero, about, products, contact).
- Scroll targets use `element.offsetTop` with GSAP animation — accounts for the fixed nav bar height so the section heading appears below the nav, not hidden behind it.
- Mobile: hamburger menu with prayer times shown in the dropdown.

---

## Product Cards

- 8 products in a 2-column responsive grid (`grid-cols-1 md:grid-cols-2`), centered with `style={{ maxWidth: '64rem', margin: '0 auto' }}`.
- Each card shows: product name (gold heading), description, price (gold, bold), "View in 3D" button, and "Order Now" button.
- ALL products must have BOTH buttons. Never leave one product with a different button set than the others.
- "Order Now" opens WhatsApp (`wa.me/16024035878`) with a pre-filled message including the specific product name and price.
- "View in 3D" opens the 3D viewer modal.
- Card background: semi-transparent white with backdrop blur (`bg-white/85 backdrop-blur-md`).
- Description text should be at least `rgb(51, 65, 85)` or darker for readability.
- "View in 3D" button should be visually prominent — at least 14px, with a border or underline style so it reads as a clickable action.

---

## Contact Section

- Contact form with Name, Email, Message fields and a "Send Message" button.
- Below the form: "Prefer to chat directly?" with a WhatsApp link.
- The form needs a proper submission handler (currently configured for Formspree — TODO: replace `FORM_ID` in `ContactSection.jsx` with actual Formspree form ID).
- Show a confirmation message on successful submission.
- Do NOT leave the form as `method="get"` with no action.

---

## Footer

- Three columns: brand info (left), Quick Links (center), Connect with WhatsApp/Instagram icons and email (right).
- Copyright line at the bottom with current year.
- Dark background (`bg-bg-dark/95`) with backdrop blur.

---

## Color Palette

Defined in `src/index.css` `@theme` block — "Dome of the Rock" inspired palette:
- **Primary dark** (nav/footer): deep navy blue (`--color-primary: #102E50`)
- **Background**: medium steel blue (`--color-bg: #4A90C8`) with Islamic geometric pattern overlay
- **Accent**: gold (`--color-accent: #C9A84C`) for headings, prices, and decorative elements
- **Cards**: white at ~85% opacity with backdrop blur (`--color-bg-card: #FFFFFF`)
- **Body text**: dark slate (`--color-text: #1E293B`) for descriptions on light backgrounds
- **Text on dark backgrounds**: light slate (`--color-text-on-dark: #94A3B8`) for nav/footer
- **WhatsApp**: green (`--color-whatsapp: #25d366`)

---

## Common Mistakes to Avoid

1. Do NOT use absolute positioning for content sections — this was the #1 recurring bug across multiple fix rounds.
2. Do NOT place a large 3D model in the hero that covers the text card.
3. Do NOT attach HTML annotation labels to 3D scene objects for product names.
4. Do NOT remove the Islamic date/prayer time from the nav bar.
5. Do NOT leave the contact form without a submission handler.
6. Do NOT make one product card different from the others (inconsistent buttons, missing fields, etc.).
7. Do NOT call `ReactDOMClient.createRoot()` twice on the same container — `main.jsx` uses `window.__APP_ROOT` to reuse the root across HMR reloads.
8. Do NOT rely on Tailwind responsive classes inside the R3F `<Scroll html>` overlay without verifying they compute correctly — use inline styles as fallback.
9. Do NOT add hardcoded page allocation values to siteConfig — let `ResizeObserver` measure content dynamically.
10. Do NOT use fraction-based scroll calculations — use `data-section` attributes and `element.offsetTop` for navigation.
11. Do NOT add a global `* { margin: 0; padding: 0; }` CSS reset — Tailwind 4 generates utilities inside `@layer` which has LOWER specificity than un-layered rules. A bare `*` reset overrides every Tailwind padding/margin class (`p-8`, `mb-4`, `gap-8`, etc.), making all spacing zero. Tailwind's built-in preflight already handles resets correctly.
