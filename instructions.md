# Agent Instructions — Alestra Rails UI

General instructions for AI agents performing code edits on this project.

---

## Project Overview

`alestra-rails-ui` is a Ruby gem providing UI components for Rails applications. Key directories:

- `app/assets/stylesheets/alestra_rails_ui/` — CSS: tokens, components, print
- `app/javascript/controllers/alestra/` — Stimulus controllers
- `app/views/layouts/alestra_rails_ui/` — ERB layouts
- `lib/alestra_rails_ui/` — Ruby engine/version
- `lib/generators/` — Rails install generator
- `examples/components_snippets.html.erb` — copy-paste HTML usage examples
- `docs/` — authoring guide and designer handoff

---

## Before Making Changes

1. Read `COMPONENT_GUIDE.md` — component conventions and BEM patterns
2. Read `README.md` — public API and usage
3. Read `app/assets/stylesheets/alestra_rails_ui/tokens.css` — all design tokens
4. Read `app/assets/stylesheets/alestra_rails_ui/components.css` — existing components
5. Understand the full scope before touching any file

---

## Code Edit Rules

### General
- Edit existing files. Create new files only when the task explicitly requires it.
- Match style, indentation, and naming conventions of surrounding code.
- Do not refactor beyond the task scope.
- No comments unless the WHY is non-obvious.
- No error handling for scenarios that cannot happen.

### Ruby
- Rails conventions: `snake_case` methods, `PascalCase` classes
- Keep methods small and focused
- No monkey-patching outside designated initializer files

### CSS
- **Edit individual source files** in `app/assets/stylesheets/alestra_rails_ui/components/`
- Each file owns one component group (see CSS Folder Structure below)
- After editing source files, rebuild: `bin/rails alestra_rails_ui:build_css`
- New tokens go in `app/assets/stylesheets/alestra_rails_ui/tokens.css`
- Use BEM naming with `alestra-` prefix (see Naming Conventions below)
- Reference design tokens — never hardcode colors, radii, or shadows
- No Tailwind, no utility frameworks, no external CSS dependencies

### JavaScript
- All JS is Stimulus controllers in `app/javascript/controllers/alestra/`
- Namespace all controllers as `alestra--[name]` to avoid host app collisions
- No new npm dependencies without explicit instruction
- Vanilla JS only

### Templates (ERB)
- Logic belongs in helpers or component classes, not views
- Maintain accessibility attributes (`aria-*`, `role`, `tabindex`)

---

## CSS Folder Structure

```
app/assets/stylesheets/alestra_rails_ui/
├── tokens.css                  ← design tokens (colors, radii, shadows)
├── components.css              ← COMPILED OUTPUT — do not edit directly
├── print.css                   ← print media styles
└── components/                 ← SOURCE — edit these files
    ├── base.css                  page-title, card, avatar
    ├── buttons.css               btn-primary, btn-secondary, size/icon modifiers
    ├── badges.css                badge + all state variants
    ├── alerts.css                alert + variants
    ├── forms.css                 form-group, label, input, input variants, wrapper
    ├── checkbox.css              checkbox, selection-sm
    ├── switch.css                switch toggle
    ├── radio.css                 radio button
    ├── dropdown.css              dropdown trigger, menu, items
    ├── shell.css                 classic header shell, devise shell, utilities
    ├── portal.css                portal shell, sidebar, topbar, portal-main
    ├── navigation.css            section-title, breadcrumb, tabs, quick-links, pagination, filter
    ├── data.css                  indicator, plan-card, product-card
    ├── table.css                 accordion table + history/payments variants
    ├── modal.css                 modal + size/confirm/success variants + icon header
    ├── spinner.css               loading spinner + overlay
    ├── tooltip.css               tooltip + 4 directions
    └── notification.css          notification toast, banner
```

After editing any source file, rebuild the compiled output:
```bash
bin/rails alestra_rails_ui:build_css
```

---

## Naming Conventions (BEM + alestra- prefix)

| Pattern | Syntax | Example |
|---------|--------|---------|
| Block | `.alestra-[component]` | `.alestra-nav` |
| Element | `.alestra-[component]__[element]` | `.alestra-nav__item` |
| Modifier | `.alestra-[component]--[variant]` | `.alestra-btn--small` |
| State | `.alestra-[component]--[state]` | `.alestra-badge--success` |

Rules:
- Lowercase + hyphens only
- `__` separates elements, `--` separates modifiers
- States: `success`, `warning`, `error`, `info`, `active`, `disabled`

---

## Design Tokens Reference

All tokens defined in `tokens.css`. Always use these — never hardcode values.

**Colors:**
- Primary: `--alestra-indigo-{50,100,500,600,700,900}`
- Accent: `--alestra-purple-{600,700}`, `--alestra-cyan-500`
- Neutrals: `--alestra-gray-{50,100,200,300,500,600,700,900}`
- Semantic: `--alestra-{success,warning,error}-{bg,border,text}`

**App tokens:**
- `--alestra-color-primary` → indigo-600
- `--alestra-color-primary-hover` → indigo-700
- `--alestra-color-heading` → indigo-900
- `--alestra-color-body-bg` → gray-50
- `--alestra-color-text` → gray-900
- `--alestra-color-muted` → gray-600
- `--alestra-radius-lg` → 0.75rem
- `--alestra-radius-xl` → 0.875rem
- `--alestra-shadow-sm` → subtle drop shadow

---

## Figma Source of Truth

**File:** `https://www.figma.com/design/MEh0gSE0aGv040mT3ZdV8k/Alestra-Portal--Copy-`
**Single page:** `Components Library & Interactive prototype` (id `0:1`)

**Sections and screen counts:**
| Section | Figma ID | Screens |
|---------|----------|---------|
| Components (library) | `146:20266` | 82 component sets |
| Gestión de líneas y servicios | `146:20268` | 49 screens |
| Consumo y reportes | `392:14413` | 2 screens |
| Ayuda | `559:32954` | 7 screens |
| Login | `146:29354` | 2 screens |
| Dashboard home | `146:29355` | 2 screens |
| Pantallas adicionales | `725:27925` | 2 screens |
| Configuración de cuenta | `146:29862` | 8 screens |

All screens are 1440×900 desktop viewport.

---

## Portal Layout Structure

The portal uses a **two-column layout**: fixed sidebar + scrollable main content.

```
┌─────────────────────────────────────────────────────┐
│  SIDEBAR (fixed, ~240px)  │  MAIN CONTENT (flex: 1) │
│                           │                         │
│  [Logo]                   │  [Page title]           │
│                           │  [Content area]         │
│  [Nav item - active]      │                         │
│  [Nav item]               │                         │
│  [Nav item]               │                         │
│  ...                      │                         │
│                           │                         │
│  [User avatar + name]     │                         │
└─────────────────────────────────────────────────────┘
```

---

## Component Inventory — What to Build

Derived from the Figma Components section (`146:20266`). Grouped by priority.

### Priority 1 — Layout & Shell

| Component | CSS Class | Figma ID | Notes |
|-----------|-----------|----------|-------|
| App shell (sidebar layout) | `.alestra-portal-shell` | — | Replace `.alestra-shell` for portal; sidebar + main |
| Sidebar | `.alestra-sidebar` | `725:21609` | Fixed, 240px, indigo-900 bg |
| Sidebar nav item | `.alestra-sidebar__item` | `17:1376` | Icon + label, active state |
| Sidebar user avatar | `.alestra-sidebar__user` | — | Gradient avatar + name + role |
| Top header bar | `.alestra-topbar` | — | Logo area, search, notifications |

### Priority 2 — Navigation & Wayfinding

| Component | CSS Class | Figma ID | Notes |
|-----------|-----------|----------|-------|
| Breadcrumb | `.alestra-breadcrumb` | — | `/ Gestión / Bloqueo` style |
| Section title | `.alestra-section-title` | `725:29232` | Large heading + optional subtitle |
| Quick links cards | `.alestra-quick-links` | `18:541` | Grid of icon + label action cards |
| Tabs | `.alestra-tabs` | `885:32052` | Horizontal tab bar with active underline |
| Pagination | `.alestra-pagination` | `27:14510` | Numbered pages + prev/next |
| Filtering system | `.alestra-filter` | `128:9251` | Filter bar: search + dropdowns + chips |

### Priority 3 — Data Display

| Component | CSS Class | Figma ID | Notes |
|-----------|-----------|----------|-------|
| Stat indicator card | `.alestra-indicator` | `114:2619` | KPI: metric + label + optional trend |
| Plan card | `.alestra-plan-card` | `114:3972` | Current plan details + CTA |
| Product card | `.alestra-product-card` | `117:964` | Product tile: icon + name + price + action |
| Table (gestión) | `.alestra-table` | `26:14370` | Accordion rows: line + status + actions |
| Table (historial) | `.alestra-table--history` | `129:16199` | Change log rows with date + description |
| Table (pagos) | `.alestra-table--payments` | `359:12364` | Payment rows: date + amount + status |
| Badge (extended) | `.alestra-badge--*` | `114:2927` | Extend existing: add `--active`, `--inactive`, `--pending` |

### Priority 4 — Form Controls

| Component | CSS Class | Figma ID | Notes |
|-----------|-----------|----------|-------|
| Checkbox | `.alestra-checkbox` | `25:13446` | With label, checked/unchecked/disabled |
| Switch toggle | `.alestra-switch` | `25:13551` | On/off toggle with label |
| Radio button | `.alestra-radio` | `25:13636` | Radio group with label |
| Dropdown (select) | `.alestra-dropdown` | `27:14542` | Custom styled select + dropdown list |
| Dropdown item | `.alestra-dropdown__item` | `27:14600` | Option row inside dropdown |
| Search input | `.alestra-input--search` | `27:14638` | Input with leading search icon |
| Password input | `.alestra-input--password` | `40:3581` | Input with show/hide toggle |
| Email input | `.alestra-input--email` | `40:3618` | Input with email icon |
| Small selection control | `.alestra-selection-sm` | `114:3884` | Compact checkbox/radio variant |

### Priority 5 — Feedback & Overlays

| Component | CSS Class | Figma ID | Notes |
|-----------|-----------|----------|-------|
| Pop-up / modal | `.alestra-modal` | `129:18334` | Size: `--sm`, `--lg`, `--full`. Semantic: `--confirm`, `--success`. Icon header: `__icon` + `--success/warning/info/error` |
| Loading spinner | `.alestra-spinner` | `129:12287` | Full-page and inline variants |
| Tooltip | `.alestra-tooltip` | — | Arrow tooltip, 4 directions |
| Notification toast | `.alestra-notification` | `178:10496` | Top-right toast: icon + message + dismiss |
| Notification CTA | `.alestra-notification--cta` | `177:18335` | Toast with action button |
| Floating banner | `.alestra-banner` | `725:29799` | Full-width info/warning banner |

### Priority 6 — Buttons (extend existing)

| Component | CSS Class | Figma ID | Notes |
|-----------|-----------|----------|-------|
| Button small | `.alestra-btn--small` | `26:14221` | Modifier on existing `.alestra-btn-primary/secondary` |
| Button large | `.alestra-btn--large` | `40:3799` | Modifier on existing `.alestra-btn-primary/secondary` |
| Button icon-only | `.alestra-btn--icon` | — | Square button with single icon, no label |
| Button with icon | `.alestra-btn--with-icon` | — | Label + leading or trailing icon |

---

## Implementation Plan

Build in this order. Each phase is self-contained.

### Phase 1 — Portal Shell Layout
**Goal:** Replace `.alestra-shell` with the two-column portal layout.

Files to edit:
- `app/assets/stylesheets/alestra_rails_ui/components.css` — add `.alestra-portal-shell`, `.alestra-sidebar`, `.alestra-sidebar__item`, `.alestra-sidebar__user`, `.alestra-topbar`
- `app/views/layouts/alestra_rails_ui/application.html.erb` — add `portal` layout variant
- `examples/components_snippets.html.erb` — add portal shell example

Key specs:
- Shell: `display: flex; flex-direction: row; min-height: 100vh`
- Sidebar: `width: 240px; flex-shrink: 0; background: var(--alestra-indigo-900); color: #fff`
- Sidebar nav item: `display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem`
- Active nav item: `background: rgba(255,255,255,0.1); border-radius: var(--alestra-radius-lg)`
- Main content: `flex: 1; overflow-y: auto; padding: 2rem`
- Topbar: `height: 64px; border-bottom: 1px solid var(--alestra-gray-200); background: #fff`

Stimulus: add `alestra--sidebar` controller for mobile toggle (collapse/expand).

### Phase 2 — Navigation Components
**Goal:** Section title, breadcrumb, tabs, quick links, pagination, filter bar.

Files to edit:
- `app/assets/stylesheets/alestra_rails_ui/components.css`
- `examples/components_snippets.html.erb`

Key specs:
- Section title: `font-size: 1.5rem; font-weight: 700; color: var(--alestra-color-heading)`
- Breadcrumb: `display: flex; gap: 0.5rem; font-size: 0.875rem; color: var(--alestra-color-muted)` — separator `/`
- Tabs: `border-bottom: 2px solid var(--alestra-gray-200)` — active tab: `border-bottom: 2px solid var(--alestra-indigo-600); color: var(--alestra-indigo-600)`
- Quick links: CSS grid, 3–4 columns, card per link with icon (48px) + label below
- Pagination: flex row, each page number is a button, active gets indigo-600 bg + white text

Stimulus: `alestra--tabs` controller for active tab switching.

### Phase 3 — Data Display Components
**Goal:** Stat cards, plan/product cards, accordion tables, extended badges.

Files to edit:
- `app/assets/stylesheets/alestra_rails_ui/components.css`
- `app/assets/stylesheets/alestra_rails_ui/tokens.css` (add badge tokens if needed)
- `examples/components_snippets.html.erb`

Key specs — Stat indicator card:
- `background: #fff; border-radius: var(--alestra-radius-xl); padding: 1.5rem`
- Metric: `font-size: 2rem; font-weight: 700; color: var(--alestra-indigo-900)`
- Label: `font-size: 0.875rem; color: var(--alestra-color-muted)`
- Optional trend badge in top-right corner

Key specs — Accordion table (`.alestra-table`):
- Each row: `display: flex; align-items: center; border-bottom: 1px solid var(--alestra-gray-200)`
- Expand toggle: chevron icon, `data-controller="alestra--accordion"`
- Status column uses `.alestra-badge` variants
- Action column: icon buttons (edit, block, delete)

Stimulus: `alestra--accordion` controller for expand/collapse rows.

### Phase 4 — Form Controls
**Goal:** Checkbox, switch, radio, dropdown, input variants.

Files to edit:
- `app/assets/stylesheets/alestra_rails_ui/components.css`
- `app/javascript/controllers/alestra/` (new controller if needed for dropdown)
- `examples/components_snippets.html.erb`

Key specs — Checkbox:
- Hide native `<input type="checkbox">`; render custom box via `::before`
- Checked: `background: var(--alestra-indigo-600); border-color: var(--alestra-indigo-600)`
- Label: `.alestra-label` pattern

Key specs — Switch:
- Track: `width: 44px; height: 24px; border-radius: 9999px`
- Off: `background: var(--alestra-gray-300)` | On: `background: var(--alestra-indigo-600)`
- Thumb: white circle, transitions with CSS `transition: transform 0.2s`

Key specs — Dropdown:
- Trigger button mimics `.alestra-input` appearance + trailing chevron icon
- Dropdown list: `position: absolute; z-index: 50; background: #fff; border: 1px solid var(--alestra-gray-200); border-radius: var(--alestra-radius-lg); box-shadow: var(--alestra-shadow-sm)`
- Stimulus `alestra--dropdown` controller for open/close + keyboard nav

### Phase 5 — Feedback & Overlays
**Goal:** Modal, spinner, tooltip, notification toasts.

Files to edit:
- `app/assets/stylesheets/alestra_rails_ui/components.css`
- `app/javascript/controllers/alestra/` — `modal_controller.js`, `tooltip_controller.js`
- `examples/components_snippets.html.erb`

Key specs — Modal:
- Backdrop: `position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 100`
- Dialog: `background: #fff; border-radius: var(--alestra-radius-xl); padding: 2rem; max-width: 640px; width: 90%`
- Modifiers: `--sm` (400px), `--lg` (800px), `--full` (fullscreen)
- Stimulus `alestra--modal` controller: open/close, trap focus, ESC key dismiss

Key specs — Loading spinner:
- SVG circle animation
- Sizes: `--sm` (20px), default (40px), `--lg` (64px)
- Full-page variant: overlay + centered spinner

Key specs — Notification toast:
- `position: fixed; top: 1rem; right: 1rem; z-index: 200`
- Auto-dismiss after 5s (configurable via `data-timeout`)
- Variants: `--info`, `--success`, `--warning`, `--error`

### Phase 6 — Button Extensions
**Goal:** Add size modifiers and icon variants to existing buttons.

Files to edit:
- `app/assets/stylesheets/alestra_rails_ui/components.css` — add modifiers only

Key specs:
- `.alestra-btn--small`: `padding: 0.25rem 0.75rem; font-size: 0.875rem`
- `.alestra-btn--large`: `padding: 0.75rem 1.5rem; font-size: 1.125rem`
- `.alestra-btn--icon`: `padding: 0.5rem; width: 2.5rem; height: 2.5rem` (square)
- `.alestra-btn--with-icon`: add `gap: 0.5rem` to existing inline-flex

---

## Per-Page Component Checklist

Use these when implementing specific portal pages.

### Login Page (Figma `146:28382`)
- [ ] `.alestra-devise-shell` (exists) — verify gradient bg
- [ ] `.alestra-card` centered, max-width 440px
- [ ] Logo above card
- [ ] `.alestra-input--email` and `.alestra-input--password`
- [ ] `.alestra-btn-primary` full-width
- [ ] `.alestra-alert--error` for login errors

### Dashboard Home (Figma `189:6374`)
- [ ] Portal shell with sidebar
- [ ] Section title + greeting
- [ ] Row of `.alestra-indicator` stat cards (3–4 cols)
- [ ] `.alestra-quick-links` grid
- [ ] `.alestra-notification` if pending alerts

### Gestión de Líneas — Página Inicial (Figma `113:1978`)
- [ ] Portal shell
- [ ] Section title + breadcrumb
- [ ] `.alestra-filter` bar (search + dropdown filters)
- [ ] `.alestra-table` accordion (line rows with status badge + action buttons)
- [ ] `.alestra-pagination`
- [ ] `.alestra-modal` for confirm actions (block, delete)

### Consumo y Reportes (Figma `392:14414`)
- [ ] Portal shell
- [ ] Section title
- [ ] Row of `.alestra-indicator` KPI cards
- [ ] `.alestra-tabs` for period selection
- [ ] Data chart area (agent should not implement charts — mark as slot)
- [ ] `.alestra-table--history` for per-line consumption

### Configuración de Cuenta (Figma `146:30291`)
- [ ] Portal shell
- [ ] Section title
- [ ] Settings form groups: `.alestra-form-group`, `.alestra-label`, `.alestra-input`
- [ ] `.alestra-switch` toggles for notification preferences
- [ ] `.alestra-btn-primary` for save, `.alestra-btn-secondary` for cancel
- [ ] `.alestra-alert--success` on saved state

---

## Making a Change

1. Read the relevant files before editing
2. Make the smallest change that satisfies the task
3. After adding a CSS component, add a matching HTML example to `examples/components_snippets.html.erb`
4. Verify no existing components are broken
5. Do not commit unless explicitly asked

---

## Out of Scope (do not do unless instructed)

- Changing gem version or dependencies
- Modifying CI/CD configuration
- Implementing data charts (placeholder slots only)
- Adding icon SVG sets (reference external icon system)
- Pushing to remote
- Writing documentation files

---

## Design Fidelity Audit — Figma vs Code

Source: `https://www.figma.com/design/MEh0gSE0aGv040mT3ZdV8k/Alestra-Portal--Copy-`
Audited: 2026-05-14 against all component CSS files and portal layout.

Issues ordered by visual impact. Fix in order listed.

---

### CRITICAL — Major visual breaks

#### 1. Font: Work Sans not loaded

**Figma:** Every text node uses **Work Sans** — weights: 300 (Light), 400 (Regular), 600 (SemiBold), 700 (Bold).  
**Code:** `tokens.css` body sets `ui-sans-serif, system-ui, -apple-system…` — no Work Sans.  

**Fix:** Add Google Fonts import to `portal.html.erb` and `devise.html.erb` `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;600;700&display=swap" rel="stylesheet">
```
Then update `tokens.css` body font-family:
```css
font-family: 'Work Sans', ui-sans-serif, system-ui, sans-serif;
```

---

#### 2. Missing token: `#10069f` (Azul Visionario)

**Figma:** `#10069f` is the primary brand blue — used for page headings, table headers, sidebar user name, consumo card title, badge text. It is NOT the same as any existing token (`--alestra-indigo-900: #312e81` is darker/purpler, `--alestra-indigo-600: #4f46e5` is brighter).  
**Code:** No token exists for this value. Several portal.css rules hardcode it directly.

**Fix:** Add to `tokens.css`:
```css
--alestra-blue-brand: #10069f;
```
Then replace all hardcoded `#10069f` in portal.css, navigation.css, table.css etc. with `var(--alestra-blue-brand)`. Update `--alestra-color-heading` to use it:
```css
--alestra-color-heading: var(--alestra-blue-brand);
```

---

#### 3. Section title: 24px → 44px, Bold → SemiBold

**Figma** (`725:29232`): `font-size: 44px`, `font-weight: 600` (SemiBold), `color: #10069f`.  
**Subtitle** (`I725:29558;725:29228`): `font-size: 18px`, `font-weight: 300` (Light), `color: #000`.  
**Code** (`navigation.css`): `.alestra-section-title` is `1.5rem (24px)`, `font-weight: 700`.  
`.alestra-section-title__subtitle` is `0.875rem (14px)`.

**Fix** in `components/navigation.css`:
```css
.alestra-section-title {
  font-size: 2.75rem;       /* 44px */
  font-weight: 600;         /* SemiBold */
  color: var(--alestra-blue-brand);
  line-height: 1;
}
.alestra-section-title__subtitle {
  font-size: 1.125rem;      /* 18px */
  font-weight: 300;         /* Light */
  color: #000;
  margin-top: 0.5rem;
  line-height: 1.4;
}
```
Also add a CTA slot variant (used in Dashboard "Resumen" heading):
```css
.alestra-section-title__cta {
  margin-top: 0.5rem;
}
```

---

#### 4. Button primary color: indigo → purple (`#ac4fc6`)

**Figma:** All primary action buttons in the portal use `#ac4fc6` (Violeta Movilidad), `border-radius: 6px`, padding `12px`, `font-size: 16px`, `font-weight: 600`, height ~`34.5px`.  
**Code:** `.alestra-btn-primary` uses `--alestra-color-primary` (indigo-600 `#4f46e5`), `border-radius: 0.75rem (12px)`.

**Fix:**  
Add token to `tokens.css`:
```css
--alestra-color-cta: #ac4fc6;
--alestra-color-cta-hover: #9333ea;  /* purple-600 */
```
Update `components/buttons.css`:
```css
.alestra-btn-primary {
  background-color: var(--alestra-color-cta);
  border-radius: 6px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  min-height: 34.5px;
}
.alestra-btn-primary:hover {
  background-color: var(--alestra-color-cta-hover);
}
```
> Note: `--alestra-color-primary` (indigo) can remain for non-CTA use (links, focus rings, active states). The portal's "action" buttons are purple.

---

### HIGH — Visible on casual inspection

#### 5. Sidebar width: 280px → 382px

**Figma** (`725:21608`): Sidebar container is `382px` wide with `44px` horizontal padding, giving `294px` of inner content space. Nav items are `291px` wide (full inner width).  
**Code:** `.alestra-sidebar` is `280px` with `padding: 2.5rem 1.75rem` (28px horizontal).

**Fix** in `components/portal.css`:
```css
.alestra-sidebar {
  width: 382px;
  padding: 2.5rem 2.75rem;   /* 44px horizontal = 2.75rem */
}
```

---

#### 6. Sidebar profile image: 120px → 193px with cyan ring

**Figma:** Profile image is ~`193px` wide × `192px` tall, circular crop, with a `#00b8ff` (Celeste Digital) border ring around it.  
**Code:** `.alestra-sidebar__profile-img` has `max-width: 120px`, no ring.

**Fix** in `components/portal.css`:
```css
.alestra-sidebar__profile-img {
  max-width: 193px;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 3px solid #00b8ff;
  object-fit: cover;
}
```

---

#### 7. Nav item border-radius: 12px → 8px

**Figma** active nav item: `border-radius: 8px`.  
**Code:** `var(--alestra-radius-lg) = 0.75rem = 12px`.

**Fix** in `components/portal.css`:
```css
.alestra-sidebar__item {
  border-radius: 8px;   /* override token — Figma spec is 8px */
}
```

---

#### 8. Table row: 14px → 16px, default weight → Light (300)

**Figma** table rows: `font-size: 16px`, `font-weight: 300` (Work Sans Light), `color: #000`.  
**Code:** `.alestra-table__cell` is `0.875rem (14px)`, default weight.

**Fix** in `components/table.css`:
```css
.alestra-table__cell {
  font-size: 1rem;       /* 16px */
  font-weight: 300;      /* Light */
  color: #000;
}
```

---

#### 9. Table header: no global dark-blue bg

**Figma** table header row: `background: #10069f`, `border-radius` on top corners only, height `60px`, white bold text `16px`.  
**Code:** `.alestra-table__header` has no background — only `border-bottom`. The `alestra-dashboard-table-header` override in portal.css exists but is dashboard-specific.

**Fix** — make the dark header the default `.alestra-table__header` style in `components/table.css`:
```css
.alestra-table__header {
  background: var(--alestra-blue-brand);
  color: #fff;
  border-radius: var(--alestra-radius-xl) var(--alestra-radius-xl) 0 0;
  font-size: 1rem;
  font-weight: 700;
  text-transform: none;
  letter-spacing: 0;
  height: 60px;
}
.alestra-table__header .alestra-table__cell {
  color: #fff;
}
```
Remove the duplicate `alestra-dashboard-table-header` rule from `components/portal.css`.

---

#### 10. Badge "Activo" (active green): wrong color values

**Figma** badge "Activo": `background: #e4faf1`, `color: #315b51`, `height: 28px`, `border-radius: 100px`, `padding: 4px 15px`.  
**Code:** `--alestra-success-bg: #ecfdf5` (slightly off), `--alestra-success-text: #065f46` (darker). `.alestra-badge` has no height.

**Fix** — Add specific tokens in `tokens.css`:
```css
--alestra-badge-active-bg: #e4faf1;
--alestra-badge-active-text: #315b51;
```
Update `components/badges.css`:
```css
.alestra-badge {
  height: 28px;
  padding: 0.25rem 0.9375rem;   /* 4px 15px */
  font-size: 1rem;               /* 16px — Figma badge text is 16px */
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.alestra-badge--active {
  background: var(--alestra-badge-active-bg);
  color: var(--alestra-badge-active-text);
}
```

---

### MEDIUM — Noticeable on side-by-side comparison

#### 11. Portal content top padding: 32px → 40px

**Figma** (`189:6392`): content area has `padding-top: 40px`, `padding-bottom: 64px`.  
**Code:** `.alestra-portal-content { padding: 2rem }` = `32px` all sides.

**Fix** in `components/portal.css`:
```css
.alestra-portal-content {
  padding: 2.5rem 2rem 4rem;   /* 40px top, 32px sides, 64px bottom */
}
```

---

#### 12. Sidebar profile structure: greeting is outside nav

**Figma** sidebar (`725:21420`): structure is `Logo → Profile (image + greeting + name) → Nav items`. The greeting ("Bienvenido") and user name are grouped with the image, not inside the nav.  
**Code** (`portal.html.erb`): layout renders profile block correctly but the profile area has no image slot in the default template — only text greeting/name. The `sidebar_profile` content_for block must provide the full image+name structure.

**Fix** — update the default sidebar profile in `portal.html.erb` to include an image slot:
```erb
<div class="alestra-sidebar__profile">
  <% if content_for?(:sidebar_profile_img) %>
    <%= yield :sidebar_profile_img %>
  <% end %>
  <div class="alestra-sidebar__profile-greeting">Bienvenido</div>
  <div class="alestra-sidebar__profile-name"><%= yield :sidebar_user_name %></div>
</div>
```

---

#### 13. Search input border-radius: 12px → 3px

**Figma** search input (`27:14637`): `border-radius: 3px`, `border: 0.75px solid #9ea8b1` (gris-ratón), white bg, `padding: 12px`.  
**Code** `.alestra-filter__search-input`: `border-radius: var(--alestra-radius-lg) = 12px`, `border: 1px solid var(--alestra-gray-300)`.

**Fix** in `components/navigation.css`:
```css
.alestra-filter__search-input {
  border-radius: 3px;
  border: 0.75px solid var(--alestra-gray-500);
  padding: 0.75rem;
}
```

---

#### 14. Small button height spec

**Figma** `Botón Pequeño` (`26:14221`): height `34.5px`, `border-radius: 6px`, SemiBold 16px, `padding: 12px`.  
**Code:** `.alestra-btn--small` only sets `padding: 0.25rem 0.75rem; font-size: 0.875rem` — no height or radius override.

**Fix** in `components/buttons.css`:
```css
.alestra-btn--small {
  min-height: 34.5px;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;          /* 16px per Figma */
  font-weight: 600;
  border-radius: 6px;
}
```

---

#### 15. Missing token: `--alestra-line-grey` (#e7e7f0)

**Figma:** Uses `#e7e7f0` (Light Grey) for table row borders and card borders. Not in `tokens.css`.  
**Code:** Portal.css hardcodes `#e7e7f0` in multiple places.

**Fix** — add to `tokens.css`:
```css
--alestra-line-grey: #e7e7f0;
```
Replace all hardcoded `#e7e7f0` with `var(--alestra-line-grey)`.

---

#### 16. Missing token: `#9ea8b1` (Gris Ratón)

**Figma:** Border color for search input and muted UI elements.  
**Code:** `--alestra-gray-500: #6b7280` is used for similar roles but wrong value.

**Fix** — add to `tokens.css`:
```css
--alestra-gray-mouse: #9ea8b1;
```

---

#### 17. `.alestra-section-title` missing CTA slot

**Figma** section title component can have an optional CTA button below the subtitle (e.g., "Ver todas mis líneas" on Dashboard VIP section). The code has no `.alestra-section-title__cta` class.

**Fix** — add to `components/navigation.css` (already noted in item 3 fix):
```css
.alestra-section-title__cta {
  margin-top: 0.75rem;
}
```
HTML pattern:
```html
<div class="alestra-section-title">
  <h1 class="alestra-section-title__heading">Resumen de líneas</h1>
  <p class="alestra-section-title__subtitle">Subtitle text</p>
  <div class="alestra-section-title__cta">
    <a class="alestra-btn-primary alestra-btn--small" href="...">Ver todas mis líneas</a>
  </div>
</div>
```

---

### MINOR — Pixel-level / polish

#### 18. `.alestra-portal-content` needs left-offset awareness

**Figma:** The main content column starts at ~382px from the left (sidebar width) with no explicit left padding; it uses the flex column layout naturally. The content width in Figma is `956px`.  
**Code:** `.alestra-portal-main` is `flex: 1` which is correct; no change needed. But content area should not have excess side padding — `padding: 2.5rem 2rem` is fine; just don't add extra left padding.

---

#### 19. Sidebar `gap` between sections

**Figma** sidebar inner column (`725:21420`): `gap: 30px` between logo, profile thumbnail, and nav.  
**Code:** `.alestra-sidebar { gap: 1.875rem }` = `30px` ✓ matches.

---

#### 20. Missing component: Portal Footer (`829:24339`)

**Figma** shows a full-width dark-blue (`#10069f`) footer section at the bottom of every portal page with: Alestra Móvil logo, Instagram/LinkedIn/Facebook icons, navigation links (Menú column), legal links (Legales column), and copyright line. This component is **not implemented** at all.

**Fix:** Add `.alestra-portal-footer` component to `components/portal.css` and a matching partial `app/views/alestra_rails_ui/shared/_portal_footer.html.erb`. Key specs:
- Background: `var(--alestra-blue-brand)` 
- Color: `#fff`
- Padding: `72px 56px`
- Two-column layout: nav links + legal links
- Social media icons: 72×72px circle buttons with `border: 1px solid #e7e7f0`
- Copyright: `Work Sans Regular, 20px`

---

### Summary Checklist

| # | File(s) | Change | Priority |
|---|---------|--------|----------|
| 1 | `portal.html.erb`, `devise.html.erb`, `tokens.css` | Import + use Work Sans font | P0 |
| 2 | `tokens.css`, all CSS files | Add `--alestra-blue-brand: #10069f` token | P0 |
| 3 | `navigation.css` | Section title: 44px, SemiBold, blue-brand + subtitle 18px Light | P0 |
| 4 | `tokens.css`, `buttons.css` | Add `--alestra-color-cta: #ac4fc6`, update btn-primary | P0 |
| 5 | `portal.css` | Sidebar width 382px, padding 44px horizontal | P1 |
| 6 | `portal.css` | Profile image 193px + `#00b8ff` border ring | P1 |
| 7 | `portal.css` | Nav item border-radius 8px | P1 |
| 8 | `table.css` | Table cell: 16px, weight 300, color #000 | P1 |
| 9 | `table.css`, `portal.css` | Table header dark blue bg + white text (global default) | P1 |
| 10 | `tokens.css`, `badges.css` | Badge active colors + height 28px + font 16px | P1 |
| 11 | `portal.css` | Portal content padding 40px top, 64px bottom | P2 |
| 12 | `portal.html.erb` | Add image slot to default sidebar profile block | P2 |
| 13 | `navigation.css` | Search input border-radius 3px, border 0.75px | P2 |
| 14 | `buttons.css` | Small button: height 34.5px, 16px, SemiBold, radius 6px | P2 |
| 15 | `tokens.css`, `portal.css`, `table.css` | Add `--alestra-line-grey: #e7e7f0` | P2 |
| 16 | `tokens.css` | Add `--alestra-gray-mouse: #9ea8b1` | P2 |
| 17 | `navigation.css` | Add `.alestra-section-title__cta` slot | P2 |
| 18 | — | Portal content left offset — no change needed | — |
| 19 | — | Sidebar gap 30px — already correct | — |
| 20 | `portal.css`, new partial | Implement portal footer component | P3 |
