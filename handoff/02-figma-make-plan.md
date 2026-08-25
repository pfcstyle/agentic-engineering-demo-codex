# Figma Make Planning Handoff

## Purpose

Use the approved [product contract](01-product-contract.md) to create a deterministic, interactive wireframe in Figma Make. Work in Plan mode first. Do not begin Build until the plan explicitly maps every required behavior and state to a visible control or mock-data condition.

## Product prompt

Create a responsive Incident Triage Dashboard for Incident Leads and Incident Analysts. The primary journey is to find an urgent incident, inspect its context, and assign an owner when authorized. Use deterministic mock data only. Preserve search, filters, result count, and queue context when details open and close.

The experience must include:

- A visible active-role control for Incident Lead and Incident Analyst.
- Search across incident ID, title, service, team, and owner.
- Severity, status, and team filters with visible active criteria and clear actions.
- Default queue ordering: open before closed, then severity, then most recent update.
- A detail drawer on desktop and a full-height detail treatment on mobile.
- Lead-only ownership editing for open incidents.
- Read-only ownership for Analysts and for every closed incident.
- Distinct loading, empty queue, no-results, load error, retry, saving, save success, and save failure states.
- Desktop, tablet, and mobile layouts that retain required incident information.
- Keyboard access, focus handling, accessible labels, live status announcements, non-color cues, and reduced-motion support.

Do not add authentication, incident creation or editing, analytics, collaboration, notifications, production integrations, or other features outside the contract.

## Required Plan output

Before building, the Figma Make response must describe:

1. The page and component structure.
2. The deterministic incident dataset and default sort.
3. Search and filter state, including no-results behavior.
4. Role switching and permission enforcement.
5. Drawer opening, closing, focus, and context preservation.
6. Ownership save success and failure simulation.
7. Loading, empty-source, load-error, and retry simulation.
8. Desktop, tablet, and mobile transformations.
9. Keyboard, screen-reader, contrast, and reduced-motion behavior.

Any missing item must be resolved in Plan mode before Build.

## Deterministic prototype controls

The built prototype must expose an unobtrusive demo-state control so reviewers can reproduce states without editing code:

- Data source: Normal, Empty, or Load error.
- Save outcome: Success or Failure.
- Active role: Incident Lead or Incident Analyst.

Retry from a load error must transition through loading and then return to Normal. Reset restores the default role, data, filters, search query, selected incident, and save outcome.

## Wireframe review checklist

### Core journey

- A reviewer can locate a Critical or High open incident using search or filters.
- Opening details preserves queue context.
- A Lead can change ownership and see the committed value in both drawer and queue.

### Permission boundaries

- An Analyst cannot edit ownership.
- Neither role can edit ownership for a Closed incident.
- The interface explains each read-only state.

### State coverage

- Loading is visually and programmatically identifiable.
- Empty source and filtered no-results are distinct.
- Load failure provides Retry.
- Save progress prevents duplicate submission.
- Save success is confirmed without moving focus unexpectedly.
- Save failure preserves the proposed owner and supports retry.

### Responsive behavior

- Desktop exposes the complete operational table.
- Tablet remains readable without horizontal page scrolling.
- Mobile uses cards and a full-height detail treatment.
- Search, filters, role, result count, and critical incident information remain reachable at every target width.

### Accessibility

- Every control has a persistent accessible name.
- Keyboard order follows visual order.
- Drawer focus entry, containment, close, and restoration are defined.
- Status and severity do not depend on color alone.
- Dynamic results and operation outcomes have appropriate announcements.
- Motion is reduced when the operating system requests it.

## Approval evidence

When review succeeds, record the Make file URL, review date, reviewed states, unresolved limitations, and approval decision in a new handoff document. That approval is the entry condition for visual design.
