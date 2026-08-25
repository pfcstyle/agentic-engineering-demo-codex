# Figma Make Wireframe Approval

## Decision

Approved for design inspiration and visual design.

## Artifact

- Figma Make: [Incident Triage Dashboard — Codex Tutorial 2026](https://www.figma.com/make/sAFKHp6CfaBmlwkS2wCoGL/Incident-Triage-Dashboard-%E2%80%94-Codex-Tutorial-2026)
- Reviewed: 2026-08-25
- Source contract: [Incident Triage Dashboard Product Contract](01-product-contract.md)
- Planning handoff: [Figma Make Planning Handoff](02-figma-make-plan.md)

## Plan review

The Figma Make plan explicitly maps the approved contract to:

- Component structure and deterministic mock data.
- Open-first, severity, and recency ordering.
- Search and AND-based severity, status, and team filters.
- Incident Lead, Incident Analyst, and Closed permission boundaries.
- Drawer focus entry, focus containment, Escape handling, and focus restoration.
- Ownership save progress, success, failure, and retry.
- Loading, empty source, filtered no-results, load error, and deterministic recovery.
- Desktop, tablet, and mobile transformations.
- Keyboard, screen-reader, contrast, non-color, and reduced-motion requirements.

The first plan draft allowed a load-error Retry to fail repeatedly. Review corrected that rule before Build: Retry now shows loading and then restores the normal deterministic data source.

## Runtime verification

The built wireframe was exercised in the Figma Make preview rather than approved from static output alone.

| Area | Verified behavior |
| --- | --- |
| Default queue | 20 deterministic incidents; open incidents precede Closed incidents; severity ordering is preserved. |
| Search | Searching `payments` returns 4 of 20 incidents. |
| Filters | Critical returns 5 of 20; Critical plus Identified produces the dedicated filtered no-results state. |
| Empty source | Shows the empty-queue message, distinct from filtered no-results. |
| Load recovery | Load error exposes Retry; Retry enters an `aria-busy` loading state and restores the normal 20-item source while preserving active criteria. |
| Lead ownership | An open incident exposes owner selection and Save; success updates the queue row. |
| Save failure | Failure keeps the proposed owner, exposes Retry, and leaves the committed queue owner unchanged. |
| Analyst permission | Ownership selection is removed and an explicit Lead-role explanation is shown. |
| Closed permission | Ownership is read-only with the explicit `Closed incidents are read-only.` explanation. |
| Mobile | At 390 × 844, the table becomes incident cards and details open as an `aria-modal="true"` dialog with a close control and owner field. |
| Reset | Restores Lead, Normal data, Success outcome, no search or filters, no selected incident, and the full queue. |

## Known prototype boundary

- The wireframe uses local deterministic data and simulated delays only.
- Ownership changes persist for the current preview session, not across independent sessions.
- Production authentication, APIs, persistence, and deployment remain out of scope.

## Next stage

Research relevant operations-dashboard references, record source attribution and borrowing constraints, then create the editable Figma Design exploration with three visual directions and a documented selection.
