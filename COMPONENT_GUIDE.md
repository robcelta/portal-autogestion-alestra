# Alestra Component Authoring Guide

A comprehensive guide to creating new UI components for the Alestra design system.

## Overview

Alestra is a **CSS-only design system** delivered as a Rails Engine gem. It provides reusable UI components built on design tokens (CSS custom properties) without any external UI framework.

**Key characteristics:**
- Pure CSS with no Tailwind, Bootstrap, or component library dependencies
- BEM-like naming convention with `alestra-` prefix
- Design tokens defined as CSS custom properties
- Components organized in a single file for consistency

---

## Design Tokens

Tokens are the foundational design decisions (colors, spacing, radii) that components reference via CSS variables.

### Color Palette

```css
/* Primary — Indigo */
--alestra-indigo-50: #eef2ff;
--alestra-indigo-100: #e0e7ff;
--alestra-indigo-500: #6366f1;
--alestra-indigo-600: #4f46e5;
--alestra-indigo-700: #4338ca;
--alestra-indigo-900: #312e81;

/* Accent — Purple */
--alestra-purple-600: #9333ea;
--alestra-purple-700: #7e22ce;

/* Accent — Cyan */
--alestra-cyan-500: #06b6d4;

/* Neutrals */
--alestra-gray-50: #f9fafb;
--alestra-gray-100: #f3f4f6;
--alestra-gray-200: #e5e7eb;
--alestra-gray-300: #d1d5db;
--alestra-gray-500: #6b7280;
--alestra-gray-600: #4b5563;
--alestra-gray-700: #374151;
--alestra-gray-900: #111827;
```

### Semantic Colors

```css
/* Success */
--alestra-success-bg: #ecfdf5;
--alestra-success-border: #a7f3d0;
--alestra-success-text: #065f46;

/* Warning */
--alestra-warning-bg: #fffbeb;
--alestra-warning-border: #fcd34d;
--alestra-warning-text: #92400e;

/* Error */
--alestra-error-bg: #fef2f2;
--alestra-error-border: #fecaca;
--alestra-error-text: #991b1b;
```

### Application Tokens

```css
--alestra-color-primary: var(--alestra-indigo-600);
--alestra-color-primary-hover: var(--alestra-indigo-700);
--alestra-color-heading: var(--alestra-indigo-900);
--alestra-color-body-bg: var(--alestra-gray-50);
--alestra-color-text: var(--alestra-gray-900);
--alestra-color-muted: var(--alestra-gray-600);
--alestra-radius-lg: 0.75rem;
--alestra-radius-xl: 0.875rem;
--alestra-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
```

### Token Location

**File:** `app/assets/stylesheets/alestra_rails_ui/tokens.css`

---

## Component Naming Convention

All components follow BEM-like naming with an `alestra-` prefix:

| Pattern | Syntax | Example |
|---------|--------|---------|
| Block | `.alestra-[component]` | `.alestra-card` |
| Element | `.alestra-[component]__[element]` | `.alestra-card__header` |
| Modifier | `.alestra-[component]--[variant]` | `.alestra-card--compact` |
| State | `.alestra-[component]--[state]` | `.alestra-alert--success` |

**Rules:**
- Use lowercase letters and hyphens only
- Elements are separated by double underscore `__`
- Modifiers are separated by double hyphen `--`
- State modifiers (success, error, warning) use `--[state]` pattern

---

## Component Patterns

### 1. Card

**Base component:**
```css
.alestra-card {
  background: #fff;
  border-radius: var(--alestra-radius-xl);
  box-shadow: var(--alestra-shadow-sm);
  padding: 2rem;
}
```

**HTML:**
```html
<div class="alestra-card">
  Card content goes here.
</div>
```

**With border-left modifier:**
```css
.alestra-card--border-left {
  border-left: 4px solid var(--alestra-indigo-500);
}
```

```html
<div class="alestra-card alestra-card--border-left">
  Card with colored left border.
</div>
```

---

### 2. Buttons

**Primary button:**
```css
.alestra-btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
  background-color: var(--alestra-color-primary);
  border: none;
  border-radius: var(--alestra-radius-lg);
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.15s ease;
}
.alestra-btn-primary:hover {
  background-color: var(--alestra-color-primary-hover);
  color: #fff;
}
.alestra-btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

```html
<a href="#" class="alestra-btn-primary">Primary Action</a>
<a href="#" class="alestra-btn-primary" disabled>Disabled</a>
```

**Secondary button:**
```css
.alestra-btn-secondary {
  display: inline-flex;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--alestra-gray-700);
  background: #fff;
  border: 1px solid var(--alestra-gray-300);
  border-radius: var(--alestra-radius-lg);
  cursor: pointer;
  text-decoration: none;
}
.alestra-btn-secondary:hover {
  background: var(--alestra-gray-50);
}
```

```html
<a href="#" class="alestra-btn-secondary">Secondary Action</a>
```

---

### 3. Badges

**Base badge:**
```css
.alestra-badge {
  display: inline-block;
  padding: 0.125rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 9999px;
}
```

**State modifiers:**
```css
.alestra-badge--info {
  background: var(--alestra-indigo-100);
  color: var(--alestra-indigo-900);
}
.alestra-badge--success {
  background: var(--alestra-success-bg);
  color: var(--alestra-success-text);
}
.alestra-badge--warning {
  background: var(--alestra-warning-bg);
  color: var(--alestra-warning-text);
}
```

```html
<span class="alestra-badge alestra-badge--info">Info</span>
<span class="alestra-badge alestra-badge--success">Success</span>
<span class="alestra-badge alestra-badge--warning">Warning</span>
```

---

### 4. Alerts

**Base alert:**
```css
.alestra-alert {
  padding: 1rem;
  border-radius: var(--alestra-radius-lg);
  font-size: 0.875rem;
}
```

**State modifiers:**
```css
.alestra-alert--error {
  background: var(--alestra-error-bg);
  border: 1px solid var(--alestra-error-border);
  color: var(--alestra-error-text);
}
.alestra-alert--success {
  background: var(--alestra-success-bg);
  border: 1px solid var(--alestra-success-border);
  color: var(--alestra-success-text);
}
```

```html
<div class="alestra-alert alestra-alert--success">
  Operation completed successfully.
</div>
<div class="alestra-alert alestra-alert--error">
  Something went wrong. Please try again.
</div>
```

---

### 5. Form Elements

**Form group:**
```css
.alestra-form-group {
  margin-bottom: 1rem;
}
```

**Label:**
```css
.alestra-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--alestra-gray-900);
  margin-bottom: 0.25rem;
}
```

**Input:**
```css
.alestra-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--alestra-gray-300);
  border-radius: var(--alestra-radius-lg);
  font-size: 1rem;
}
.alestra-input:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
  border-color: var(--alestra-indigo-500);
  box-shadow: 0 0 0 3px rgb(99 102 241 / 0.25);
}
```

```html
<div class="alestra-form-group">
  <label class="alestra-label">Email</label>
  <input type="email" class="alestra-input" placeholder="you@example.com">
</div>
```

---

### 6. Avatar

**Gradient avatar:**
```css
.alestra-avatar-gradient {
  background: linear-gradient(to bottom right, var(--alestra-purple-600), var(--alestra-cyan-500));
  color: #fff;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
}
```

```html
<div class="alestra-avatar-gradient" style="width: 40px; height: 40px;">
  JD
</div>
```

---

### 7. Shell Layout

**Shell:**
```css
.alestra-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.alestra-shell__header {
  flex-shrink: 0;
  border-bottom: 1px solid var(--alestra-gray-200);
  background: #fff;
  padding: 1rem 1.5rem;
}
.alestra-shell__header-inner {
  max-width: 80rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
}
.alestra-shell__main {
  flex: 1;
  max-width: 80rem;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1rem;
}
.alestra-shell__footer {
  flex-shrink: 0;
  margin-top: auto;
  border-top: 1px solid var(--alestra-gray-200);
  padding: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: var(--alestra-color-muted);
}
```

**Utility classes:**
```css
.alestra-flex { display: flex; }
.alestra-items-center { align-items: center; }
.alestra-gap-3 { gap: 0.75rem; }
.alestra-mb-4 { margin-bottom: 1rem; }
```

---

## Creating New Components

### Step-by-Step Process

1. **Define the component structure**
   - Identify Block, Element, and Modifier patterns
   - Sketch out states (default, hover, focus, disabled, error)

2. **Check existing tokens**
   - Can you use existing colors from `tokens.css`?
   - Do you need new tokens? (Add to `tokens.css` if necessary)

3. **Add CSS to components.css**
   - Follow BEM naming with `alestra-` prefix
   - Use CSS variables for all colors, radii, shadows
   - Include all interactive states

4. **Add HTML example**
   - Document base component and modifiers in `examples/components_snippets.html.erb`

5. **Test in context**
   - Verify it works within `alestra-shell` layout
   - Check mobile responsiveness

### Checklist

Before considering a component complete:

- [ ] Name follows `alestra-*` BEM convention
- [ ] CSS uses existing tokens (add new ones only if necessary)
- [ ] All interactive states covered: default, hover, focus, disabled
- [ ] HTML example exists in `examples/components_snippets.html.erb`
- [ ] Component CSS is in `app/assets/stylesheets/alestra_rails_ui/components.css`
- [ ] Works within current layouts without conflicts

---

## File Reference

| File | Purpose |
|------|---------|
| `app/assets/stylesheets/alestra_rails_ui/tokens.css` | Design token definitions (colors, radii, shadows) |
| `app/assets/stylesheets/alestra_rails_ui/components.css` | All component CSS definitions |
| `examples/components_snippets.html.erb` | Copy-paste HTML examples |
| `app/views/layouts/alestra_rails_ui/application.html.erb` | Main layout template |

---

## Common Patterns Summary

**Background:** `#fff` or semantic tokens
**Border:** `1px solid var(--alestra-gray-200)`
**Border radius:** `var(--alestra-radius-lg)` or `var(--alestra-radius-xl)`
**Shadow:** `var(--alestra-shadow-sm)`
**Focus ring:** `box-shadow: 0 0 0 3px rgb(99 102 241 / 0.25);`
**Font sizes:** `0.75rem`, `0.875rem`, `1rem`, `2.25rem`
**Spacing:** `0.125rem`, `0.25rem`, `0.5rem`, `0.75rem`, `1rem`, `1.5rem`, `2rem`
