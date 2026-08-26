# Stage 6 Make V7 Parity Correction

## Why this correction exists

The earlier Stage 6 delivery passed its local tests but treated Figma Make Version 7 primarily as a visual reference. It did not make the Make interaction model a component-by-component implementation and test gate. That left material differences in filtering, queue presentation, responsive detail behavior, source loading, and asynchronous saving.

This corrective change uses the product contract for behavior, Make Version 7 source for interaction, Approved Design contexts for Graphite Warmth visual and responsive rules, and the natural-language acceptance contract for verification.

## Implemented Make-to-code mapping

| Make V7 behavior | Code evidence | Verification |
| --- | --- | --- |
| Desktop Severity, Status, and Team dropdown filters; mobile filter sheet | `src/App.tsx` `DropFilter`, `Choices`, and mobile dialog | Unit and Playwright filter interactions |
| Semantic desktop/tablet queue and separate mobile cards | `Queue` renders a `table` plus distinct `.mobile-cards` | Desktop, tablet, and mobile browser assertions |
| Persistent XL right sidebar, tablet overlay, mobile detail sheet | `Detail` plus responsive rules in `src/styles.css` | Browser breakpoint coverage |
| All source modes pass through loading; retry preserves criteria | `sourceChange` | Unit and browser loading/retry coverage |
| Current Save Outcome governs an in-flight save | `outcomeRef.current` in `save` | Failure-to-success retry regression |

## Responsive contract confirmed

- Desktop (`>=1200px`): a 420px contextual sidebar remains present before selection.
- Tablet (`768–1199px`): the semantic table retains Incident, Severity, Status, and Updated; Service and Owner are hidden, and selected details use an overlay.
- Mobile (`<768px`): cards replace the table; Filters opens a dialog; details use a full-height sheet with Back and Close actions.

## Accessibility and interaction checks

- Desktop filter menus close on outside click or Escape and return focus to their trigger.
- The mobile Filters dialog closes on Escape and returns focus to Filters.
- Mobile detail controls preserve a keyboard focus trap and restore focus to the originating queue item.
- Analyst and Closed contexts remain read-only; only an Incident Lead may change an open incident owner.

## Validation

Independent review passed after two correction loops: first for filter dismissal/focus restoration, then for tablet semantic-table column visibility.

- `pnpm test` — 9 tests passed
- `pnpm lint` — passed
- `pnpm build` — passed
- `pnpm test:browser` — 5 tests passed

The corrective pull request targets `develop`. Earlier Stage 6 evidence remains historical; this document is the authoritative record for the Make V7 interaction parity fix.
