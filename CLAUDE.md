# CubeEffectCSSOnly — Project Memory

React 19 + TypeScript + Vite 8 SPA. Six full-screen "screens" mapped to the six faces of a 3D cube; navigating rotates the cube 90° (pure CSS transforms, Apple-keynote style against a black void). GSAP is used ONLY for the navbar's sliding active-link pill — the cube rotation itself is a CSS transition.

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — `tsc -b && vite build`
- `npm run lint` — oxlint
- Not a git repository (as of 2026-07-24).

## Architecture (two-layer pattern — do not break this)

The framework lives in `src/cube-framework/` and deliberately splits rendering into:

1. **Flat layer** (`.cnav-screen` in `CubeNavigator.tsx`) — the active screen in a plain scrollable div. Always mounted, always interactive. Never has 3D transforms.
2. **3D overlay** (`CubeOverlay.tsx`) — mounted ONLY during a transition. `perspective` wrapper + `preserve-3d` cube with from/to faces (real content) + 4 background-only filler faces. Entire overlay is `pointer-events: none`; it is purely visual. Unmounts on `transitionend`, then the flat layer swaps content.

This split exists to avoid the Chromium hit-testing bug with rotated `preserve-3d` faces (see global CLAUDE.md cube rule). `overflow: hidden` on overlay faces is safe **only because those faces never take pointer events**. Never make an overlay face interactive.

### Files

- `CubeNavigator.tsx` — state machine (activeId + transition), auto-rotate interval, renders both layers. Public component.
- `transitions.ts` — pure math. All transitions are single 90° rotations. Y-ring: front→right→back→left (clockwise); `yDirection` picks shortest path, 180° ties go right. Y-faces sit at `translateZ(50vw)`, X-faces (top/bottom) at `translateZ(50vh)`. `buildTransition(fromId, toId, screens, backdrop?)` — when `backdrop` is set, every filler face is painted that color.
- `CubeOverlay.tsx` — applies start transform, forces reflow, sets end transform in a rAF (this ordering is required for the CSS transition to fire). Also implements `depthScale` zoom via the `cnav-zoom` keyframes and `--cnav-zoom` custom property.
- `CubeNavbar.tsx` — built-in navbar, auto-generated from the screens array. GSAP sliding pill (see gotcha below).
- `CubeContext.tsx` — `useCubeNavigate()` hook for programmatic navigation from screen content.
- `cube-framework.css` — structural styles (`.cnav-*` classes), pill, `cnav-zoom` keyframes.

### CubeNavigator props (all wired, none are no-ops)

- `screens: CubeScreenDef[]` — id, face, background (CSS string, used on flat layer AND cube face for a seamless match), label, icon?, render(ctx)
- `initialScreen`, `duration` (s), `perspective` (px), `showNavbar`
- `backdrop?: string` — color of the void behind the cube AND the filler faces during rotation. `'#000000'` = keynote look. Unset = classic mode (flat screen shows through gaps, fillers reuse screen gradients).
- `autoRotateMs?: number` — auto-advance interval; mid-transition ticks are safely ignored.
- `depthScale?: number` (0.7–1) — cube zooms out to this scale at 50% of the rotation and back ("keynote pull-back"). 1 = off.
- `backfaceVisible?: boolean` — face backsides during spin, default hidden.
- `transitionStyle?: 'cube' | 'slide' | 'fade'` — slide/fade use the same-document **CSS View Transitions API** (`document.startViewTransition` + `flushSync(setActiveId)`). `.cnav-screen` and `.cnav` each get their own `view-transition-name`, so only the screen animates and the navbar stays still. Direction-aware slide keyframes keyed off `data-cnav-vt` / `data-cnav-vt-dir` attributes on `<html>`; duration via `--cnav-vt-duration`. All rules sit behind `prefers-reduced-motion: no-preference`; Firefox (no API) falls back to an instant swap. The 3D overlay is never mounted in these modes.

## Current app (`src/App.tsx`)

Six dark screens: Midnight (front, slate), Ember (right, crimson), Forest (back, evergreen), Nebula (left, violet), Aurum (top, amber), Settings (bottom, teal). Five are `CenteredScreen` (title + tinted subtitle, flex-centered). Settings is `src/screens/SettingsPanel.tsx` — dark UI controlling all live parameters (perspective, speed, mid-spin zoom, void color incl. "Classic", auto-orbit, backface). Settings state lives in `App`, defaults in `DEFAULT_SETTINGS`.

Page base is black (`html, body, #root` in `src/index.css`).

## Hard-won gotchas (do not re-learn these)

- **Navbar pill vs ResizeObserver**: the active label goes bold on click → button widths change → ResizeObserver fires. An instant (`duration: 0`) reposition there KILLS the in-flight GSAP slide (looked like a snap, no animation). Fix in `CubeNavbar.tsx`: if `gsap.isTweening(pill)`, re-aim with an animated tween; only snap when idle. Keep this if refactoring.
- **Pill slides immediately, active state doesn't**: `activeScreenId` only updates when the cube lands. `pendingId` local state makes the label highlight follow the click instantly. `targetRef` keeps the RO callback from using a stale id.
- **Background colors visible during rotation** came from two places: the flat layer peeking at corners behind the overlay, and gradient-painted filler faces. Both are covered by the single `backdrop` prop.
- **Overlay re-mounts screen content**: from/to faces render a FRESH copy of the screen (component state resets in the copy). Fine for current static/centered screens; would visibly reset form input mid-spin if screens ever hold state. Flat layer keeps the real state.
- **The forced reflow** (`void el.getBoundingClientRect()`) in `CubeOverlay` before the rAF is load-bearing. Removing it breaks the transition (end state applies instantly).

## Known remaining issues (accepted for now)

- No `transitionend` fallback timeout — if the event never fires (e.g. tab hidden right at mount, rAF throttled), `isTransitioning` stays true and navigation locks. Fix: idempotent `setTimeout(onComplete, duration*1000 + 200)`.
- `.cnav-screen` scrollTop persists across screen swaps (only matters if screens become scrollable — Settings is; scroll jump possible at transition end).
- `buildTransition` uses non-null assertions; unknown screen id would crash. Guard in `handleNavigate` if ids ever become dynamic.
- Favicon: `index.html` points at `/vite.svg`, which doesn't exist in `public/` (has `favicon.svg`).

## Legacy / dead files (pre-rewrite, kept but unused)

- `src/screens/HomeScreen|FeaturesScreen|AboutScreen|ContactScreen|GalleryScreen|SettingsScreen.tsx` — old light-theme demo screens. Old SettingsScreen's controls were mostly no-ops; the new `SettingsPanel` replaced it with fully wired controls.
- `src/components/Navbar.tsx` — superseded by framework `CubeNavbar`; references CSS classes that no longer exist.
- `src/App.css` — Vite template leftovers, never imported.
- `src/types/cube.ts` — legacy types (`FaceId`, old `CubeSettings`); still imported by legacy screens only.
- `canvas-confetti` (used only by legacy ContactScreen) and its `@types` package could be dropped if legacy screens are deleted.
