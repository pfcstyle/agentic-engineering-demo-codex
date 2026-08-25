# Figma Design Handoff

## Artifacts

- Figma Make: [Incident Triage Dashboard — Codex Tutorial 2026](https://www.figma.com/make/sAFKHp6CfaBmlwkS2wCoGL/Incident-Triage-Dashboard-%E2%80%94-Codex-Tutorial-2026)
- Figma Design: [Incident Triage Dashboard — Design Exploration 2026](https://www.figma.com/design/wCzellboT0u78Re925AcEt/Incident-Triage-Dashboard-%E2%80%94-Design-Exploration-2026)
- Design method: Figma Design Agent through the in-app Browser
- Reviewed: 2026-08-25

Codex supplied the approved contract, editable wireframe context, research synthesis, comparison criteria, and correction prompts. The Figma Design Agent generated and iterated every visual-design frame. Figma MCP was not used to draw or modify the design.

## File structure

### 01 Make Wireframe Reference

The original Make layers remain editable and visually unchanged. Desktop frames use a three-column grid; mobile frames are grouped below them.

1. Desktop — Default Queue
2. Desktop — Search and Filters
3. Desktop — No Results
4. Desktop — Lead Editable Drawer
5. Desktop — Analyst Read-only
6. Desktop — Closed Read-only
7. Desktop — Loading
8. Desktop — Empty Source
9. Desktop — Load Error and Retry
10. Desktop — Save Failure and Retry
11. Mobile — Queue Cards
12. Mobile — Detail Sheet

`Supplemental — Mobile No Results` remains as an additional reference and is not counted among the twelve required frames.

### 02 Visual Directions

The Agent used the same representative desktop queue for all directions.

| Direction | Density | 24×7 comfort | Accessibility | Maintenance | Total |
| --- | ---: | ---: | ---: | ---: | ---: |
| Operational Light | 3 | 3 | 5 | 4 | 15 |
| Midnight Command | 5 | 4 | 3 | 3 | 15 |
| Calm Control | 4 | 5 | 4 | 4 | 17 |

Calm Control was selected. Its mid-tone surfaces reduce glare while retaining operational density. The Agent corrected secondary-text contrast and separated the recommendation label from role controls before production frames were approved.

### 03 Approved Design

- `Approved — Desktop Default Queue`
- `Approved — Lead Editable Drawer`

The queue makes severity, status, incident title, owner, and recency the primary scan path. Severity uses distinct vector shapes and stepped sizes; status uses a label plus glyph. A 2 px offset focus ring is visible. The Lead drawer preserves queue context and provides editable Owner, Status, and Response Notes with Save and Cancel actions.

### 04 States & Responsive

- State — Search and Filters
- State — No Results
- State — Analyst Read-only
- State — Closed Read-only
- State — Loading
- State — Empty Source
- State — Load Error and Retry
- State — Save Failure and Retry
- Mobile — Queue Cards
- Mobile — Detail Sheet
- Responsive Rules — Desktop Tablet Mobile

The responsive rule is table plus right drawer on desktop, reduced columns plus overlay drawer on tablet, and cards plus a full-screen sheet on mobile. Primary content does not require horizontal page scrolling.

### 05 Handoff Notes

- Handoff — Foundations & Tokens
- Handoff — Components & States
- Handoff — Permissions & Interaction
- Handoff — Responsive & Accessibility
- Handoff — Immutable Product Contract

## Foundations

The approved theme is `Graphite Warmth`.

| Token | Value | Use |
| --- | --- | --- |
| `surface/base` | `#2B2E36` | Application background |
| `surface/card` | `#33363F` | Queue rows, cards, and drawer background |
| `surface/elevated` | `#3F4350` | Popovers, filter menus, and raised panels |
| `text/primary` | `#E8E4DF` | Titles and primary labels |
| `text/secondary` | `#A8A3A0` | Metadata and timestamps |
| `text/disabled` | `#706B68` | Disabled or unavailable labels |
| `interactive/focus` | `#89B4E8` | 2 px offset focus outline |
| `interactive/destructive` | `#D9725B` | Error banners and failure recovery |

- Use one humanist sans-serif family.
- Use weight and value, rather than decorative type, to establish hierarchy.
- Default desktop queue rows are approximately 44 px high.
- Mobile interactive targets are at least 44 × 44 px.
- Keep borders and elevation restrained; do not convert status into decorative badges without semantic value.

## Component and state rules

- Search has a persistent label or accessible name and combines with severity, status, and team filters using AND semantics.
- Active filters have a visible selected treatment and expose `Clear all` when any criterion is active.
- Severity and status always include text and a non-color cue.
- Loading preserves layout stability and exposes programmatic busy state.
- Empty Source and filtered No Results use different explanations and actions.
- Load Error retains workspace context and makes Retry the primary recovery action.
- Save Failure retains proposed edits, displays an inline alert, and offers Retry without changing the committed queue value.

## Permissions and interaction

- Incident Lead may edit Owner, Status, and Response Notes only for open incidents.
- Incident Analyst sees the same context but all mutation controls are read-only with an explanation.
- Closed incidents are read-only for both roles and explicitly state that closed incidents cannot be edited.
- Closing a drawer or mobile detail sheet restores focus to the originating row or card.
- Loading, result-count changes, save outcomes, and errors are announced without moving focus unexpectedly.

## Responsive and accessibility rules

- Desktop: full table, persistent search and filters, right-side drawer.
- Tablet: reduce secondary columns, allow metadata wrapping, use an overlay drawer.
- Mobile: stack incident cards, retain primary incident metadata, use a full-screen detail sheet with a sticky header and back control.
- Keyboard order follows visual order and every interactive element has visible focus.
- Text and meaningful UI target WCAG 2.2 AA contrast.
- Honor reduced-motion preferences for drawer, sheet, loading, and feedback transitions.

## Immutable product contract

- Use deterministic mock data; do not introduce a real backend.
- Do not change Lead, Analyst, or Closed permissions.
- Do not change search/filter semantics, recovery behavior, or responsive information priority.
- Do not add incident creation, analytics, notification centers, collaboration, authentication, or production integrations.
