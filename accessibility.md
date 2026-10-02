# Accessibility (Practical WCAG 2.2 AA)

Use this whenever building or reviewing real UI. Target is WCAG 2.2 Level AA, the bar most products and all UK/EU public-sector services are held to. Accessibility is not a separate audience: captions help people in noisy rooms, big targets help people on the move, clear focus helps keyboard power users. Designing to this floor makes the product better for everyone.

The order below is roughly "biggest impact, least effort" first.

## 1. Semantic HTML first — before any ARIA

Native elements come with behaviour, focus, and screen-reader semantics for free. Reach for them before reinventing anything.
- Use `<button>` for actions, `<a href>` for navigation. A clickable `<div>` is not keyboard-operable and is invisible to assistive tech.
- Use real headings (`<h1>`–`<h6>`) in a logical order; don't skip levels for size. Use `<label>`, `<fieldset>`/`<legend>`, `<nav>`, `<main>`, `<ul>`, `<table>` with headers, etc.
- **The first rule of ARIA is: don't use ARIA if a native element does the job.** Bad ARIA is worse than none. Only add roles/attributes for genuinely custom widgets, and then implement the full expected keyboard behaviour.

## 2. Keyboard operability

Everything must work with the keyboard alone — no mouse.
- Every interactive element is reachable and operable by Tab / Shift+Tab / Enter / Space / arrow keys as appropriate.
- Tab order follows reading order. Don't use positive `tabindex` to hack order; fix the DOM order instead.
- No keyboard traps — focus can always move on.
- Custom widgets (menus, tabs, comboboxes, modals) implement their expected keys (Esc closes a dialog, arrows move within a menu) and move focus sensibly (into a dialog on open, back to the trigger on close).
- WCAG 2.2 adds: any action available by dragging must also be doable with a single pointer tap/click (2.5.7 Dragging Movements).

## 3. Visible focus

- Focus must be clearly visible on every focusable element. Never `outline: none` without a strong replacement.
- The focus indicator needs enough contrast and size to be obvious (WCAG 2.2: Focus Appearance, 2.4.11).
- WCAG 2.2: the focused element must not be hidden behind sticky headers, cookie bars, or other overlays (Focus Not Obscured, 2.4.11/2.4.12). Watch sticky elements.

## 4. Colour and contrast

- **Body / normal text:** at least **4.5:1** against its background.
- **Large text** (≥ 24px, or ≥ 18.66px / ~14pt bold): at least **3:1**.
- **Non-text** — UI component boundaries, icons that carry meaning, focus indicators, chart elements you must distinguish: at least **3:1** (1.4.11).
- **Never use colour alone** to convey meaning. A red field also needs an error message; a green/red status also needs text or an icon. Roughly 1 in 12 men has colour-vision deficiency.
- Don't disable zoom; text must reflow and stay usable at 200% zoom (and at a 320px-wide viewport without horizontal scrolling).

## 5. Target size and spacing

- WCAG 2.2 AA minimum target size is **24×24 CSS px** (2.5.8), with exceptions for inline links and spacing. **44×44 px is the recommended, comfortable size** for primary touch targets — aim for that on anything important.
- Don't crowd small targets together; give adjacent controls enough spacing to avoid mis-taps.

## 6. Forms and labels

- Every input has a programmatically associated, persistently visible `<label>`. Placeholder text is not a label.
- Group related controls (e.g. a set of radios, a multi-part date) in `<fieldset>` with a `<legend>`.
- Use the right `type` and `autocomplete` attributes so browsers and assistive tech can help (2.5.x / 1.3.5 Identify Input Purpose).
- Errors are associated with their field (`aria-describedby`), announced, and listed in a summary that links to each field. (Detail in `forms-and-validation.md`.)
- WCAG 2.2: don't make people re-enter info they already gave earlier in a process when it can be auto-populated or selectable (3.3.7 Redundant Entry), and don't rely on memory-based or puzzle authentication without an accessible alternative (3.3.8 Accessible Authentication).

## 7. Motion and animation

- Respect `prefers-reduced-motion`: drop or reduce non-essential animation, parallax, and auto-movement for users who request it.
- No content that flashes more than three times per second (seizure risk, 2.3.1).
- Anything that auto-plays, moves, or auto-updates for more than ~5s must be pausable/stoppable (2.2.2).

## 8. Images, media, and non-text content

- Meaningful images have descriptive `alt` text; purely decorative images have empty `alt=""` so they're skipped.
- Icon-only buttons need an accessible name (visible text, `aria-label`, or visually-hidden text).
- Video needs captions; audio needs a transcript.

## 9. Structure, language, and status messages

- One `<h1>` describing the page; logical heading outline; landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`).
- Set the page `lang`. Give every page a unique, descriptive `<title>`.
- Use `aria-live` regions (polite) so dynamically inserted messages — "Item added", "3 results" — are announced without moving focus (4.1.3 Status Messages).

## Quick test checklist

Run these before calling UI accessible:
1. **Unplug the mouse.** Tab through the whole task. Can you complete it? Is focus always visible and never trapped or hidden?
2. **Zoom to 200%** (and try a ~320px width). Does content reflow and stay usable without horizontal scroll?
3. **Check contrast** on text, icons, and focus rings with a contrast checker.
4. **Turn on a screen reader** (VoiceOver, NVDA) and listen to one screen: are controls named, headings logical, errors announced?
5. **Grayscale the screen.** Is any meaning lost when colour is removed?
6. **Run an automated checker** (axe, Lighthouse) — it catches maybe a third of issues, so it's a floor, not the finish line.
