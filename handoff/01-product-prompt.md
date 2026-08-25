# Incident Triage Dashboard Product Contract

## Product objective

Build a high-density incident triage workspace for a 24×7 operations team. The interface must help analysts find active incidents quickly, understand severity and ownership, inspect operational context, and recover from transient backend failures without losing their current investigation.

## Users and permissions

### Lead

- Can view every incident.
- Can use all filters and search.
- Can open the incident detail drawer.
- Can assign or change an owner for an open incident.
- Cannot change the owner of a closed incident.

### Analyst

- Can view every incident.
- Can use all filters and search.
- Can open the incident detail drawer.
- Cannot assign or change an owner.
- Sees the owner control as unavailable with a clear permission explanation.

## Primary user goal

Identify the most urgent unowned or actively degrading incident, inspect its context, and—when authorized—assign a responsible owner without leaving the queue.

## Desktop information architecture

1. Product header with environment label, current role, and queue health summary.
2. Compact filter bar with severity, status, ownership, and free-text search.
3. Results summary showing visible and total incident counts.
4. Dense incident table ordered by operational urgency.
5. Right-side detail drawer that preserves the queue behind it.
6. Inline state region for loading, empty results, backend error, and retry feedback.

## Incident data model

Each incident exposes:

- stable incident ID
- title and short service description
- severity: Critical, High, Medium, or Low
- status: Investigating, Identified, Monitoring, or Closed
- affected service
- environment
- created and last-updated timestamps
- owner or Unassigned
- customer-impact summary
- latest operational note

## Queue behavior

- Default ordering places Critical before High, Medium, and Low; ties use the most recent update.
- Severity and status filters support multiple selections.
- Ownership filter supports All, Assigned, and Unassigned.
- Search matches incident ID, title, service, environment, and owner without case sensitivity.
- Active filters combine with AND semantics across groups and OR semantics inside a multi-select group.
- Clearing filters restores the full queue and default ordering.
- The visible-results count updates whenever search or filters change.
- Selecting a row opens its detail drawer without navigating away from the queue.
- Closing the drawer preserves the current filters, search text, and scroll position.

## Ownership rules

- A Lead can assign an owner from the detail drawer when the incident is not Closed.
- Saving shows progress, prevents duplicate submission, and confirms the persisted owner.
- The updated owner appears in both the drawer and the queue row.
- An Analyst cannot activate the owner control or submit an assignment.
- Closed incidents remain read-only for every role.

## Required product states

### Loading

- Initial queue load shows a table-shaped skeleton rather than an empty table.
- Existing results remain visible during a background refresh when possible.

### Empty queue

- When the service returns no incidents, explain that the queue currently has no incidents.
- Do not show a retry action unless a request failed.

### No filter results

- When filters or search match nothing, explain that no incidents match the current criteria.
- Provide a clear action to reset filters.

### Backend error

- Replace the unavailable results region with an error message that distinguishes failure from an empty queue.
- Provide a Retry action.
- Preserve the current filters and search text.

### Retry

- Retry repeats the failed request once per activation.
- The button shows progress and cannot be activated repeatedly while a request is pending.
- A successful retry restores results without clearing the user's context.

## Responsive behavior

- Desktop uses a fixed header, compact filter row, dense table, and side drawer.
- At tablet widths, lower-priority columns collapse while incident ID, title, severity, status, and owner remain visible.
- On mobile, incidents become stacked queue cards and the detail drawer becomes a full-height overlay.
- Filters remain reachable through a compact filter control and active-filter summary.
- No critical action depends on hover.

## Accessibility contract

- Every interactive control has an accessible name.
- Keyboard users can operate search, filters, rows, drawer controls, owner selection, save, retry, and reset.
- Focus moves into the drawer when it opens and returns to the selected incident when it closes.
- Severity and status are communicated by text as well as color.
- Loading, save, error, and retry outcomes are announced through an appropriate live region.
- Text and essential controls meet WCAG AA contrast expectations.

## Out of scope

- Creating, deleting, or closing incidents.
- Editing severity, status, service, or operational notes.
- Authentication and user administration.
- Real-time multi-user collaboration.
- Production APIs, notifications, paging integrations, and audit export.
- Charts, topology maps, and historical analytics.

## Acceptance boundary

The product stage is approved when the prototype can demonstrate queue discovery, combined filtering, search, persistent drawer context, Lead assignment, Analyst prohibition, closed read-only behavior, loading, both empty states, backend failure, retry recovery, and responsive layouts without introducing out-of-scope editing capabilities.

