# Incident Triage Dashboard Product Contract

## Product objective

Give an incident operations team a fast, dependable way to find urgent incidents, understand their current context, and assign ownership without leaving the queue. The prototype uses deterministic local data and does not connect to a production incident system.

## Primary users

### Incident Lead

- Reviews the queue across teams and severity levels.
- Opens any incident to inspect its operational context.
- Assigns or reassigns an owner while an incident is open.
- Cannot modify a closed incident.

### Incident Analyst

- Reviews and filters the same operational queue.
- Opens any incident to inspect its context and current owner.
- Cannot assign or reassign ownership.
- Cannot modify a closed incident.

The active role must always be visible. Permission differences must be expressed through labels, disabled or absent controls, and explanatory text rather than color alone.

## Incident model

Each incident has:

- A stable incident identifier.
- A concise title and service name.
- Severity: `Critical`, `High`, `Medium`, or `Low`.
- Status: `Investigating`, `Identified`, `Monitoring`, or `Closed`.
- Owning team and optional individual owner.
- Created time and most recent update time.
- A short operational summary.

The initial queue is deterministic. Reloading the prototype restores the same incidents and sort order, except for ownership changes intentionally persisted during the current browser session.

## Queue behavior

- Default ordering places open incidents before closed incidents, then sorts by severity and most recent update.
- Each row exposes incident ID, title, service, severity, status, owner, and last update at desktop width.
- The result count reflects the currently visible set.
- Selecting a row opens its details without losing the active filters, search query, result count, or scroll context.
- Closing the details returns focus to the row that opened it.

## Search and filters

- Free-text search matches incident ID, title, service, team, and owner without case sensitivity.
- Filters are available for severity, status, and team.
- Search and filters combine using AND semantics.
- Active criteria remain visible and can be cleared individually or all at once.
- Results update immediately after a criterion changes.
- Clearing all criteria restores the deterministic default queue and ordering.
- A filter combination with no matches shows a dedicated no-results state without replacing the controls.

## Incident details and ownership

- The detail drawer presents the complete incident context, status, timestamps, team, and current owner.
- An Incident Lead can choose an owner for an open incident and save the change.
- Saving has distinct idle, in-progress, success, and failure states.
- A successful save updates both the drawer and the corresponding queue row for the current session.
- A failed save keeps the drawer open, preserves the proposed selection, explains that no change was applied, and offers retry.
- An Incident Analyst sees ownership as read-only with a concise permission explanation.
- Closed incidents are read-only for both roles with a clear closed-state explanation.

## Required product states

The prototype must make every state reproducible through visible controls or deterministic mock conditions:

- Initial loading.
- Loaded queue with results.
- Empty queue when the data source contains no incidents.
- No results caused by search or filters.
- Queue load failure with retry.
- Detail drawer open and closed.
- Lead ownership edit.
- Analyst read-only ownership.
- Closed incident read-only state.
- Ownership save in progress.
- Ownership save success.
- Ownership save failure with retry.

The empty queue and no-results states are different: the former describes the source data; the latter describes the user's active criteria.

## Responsive behavior

### Desktop: 1200 px and wider

- Show the full queue table and a right-side detail drawer.
- Keep search, filters, role, and result count in the primary workspace.

### Tablet: 768–1199 px

- Preserve the queue as a compact table or structured list.
- Allow secondary metadata to wrap or move beneath the incident title.
- The drawer may widen or become an overlay without hiding its close control.

### Mobile: below 768 px

- Replace table rows with vertically stacked incident cards.
- Keep incident ID, title, severity, status, owner, and recency visible.
- Present details as a full-height sheet or page-like overlay.
- Keep search and filters reachable without horizontal scrolling.

No required information or permitted action may disappear solely because the viewport narrows.

## Accessibility contract

- All interactive behavior is operable by keyboard.
- Focus indicators are visible and meet contrast requirements.
- Rows or cards have an accessible name that identifies the incident and purpose of activation.
- The drawer has an accessible title, initial focus, a keyboard close action, and focus restoration.
- Inputs and filters have persistent labels; placeholder text is not the only label.
- Loading, result-count changes, save outcomes, and errors are announced without unexpectedly moving focus.
- Severity, status, permissions, and errors are never communicated by color alone.
- Text and meaningful UI elements target WCAG 2.2 AA contrast.
- Reduced-motion preferences are respected for drawer and feedback transitions.

## Failure and recovery rules

- Queue load failure replaces the results area, retains the surrounding workspace, and exposes Retry.
- Retry visibly returns to loading before resolving to deterministic success.
- Save failure never changes the queue's committed owner.
- Repeated actions are disabled while their request is in progress.
- Error messages explain what failed and what the user can do next without exposing technical stack details.

## Out of scope

- Authentication, user administration, and production authorization services.
- Creating, deleting, closing, or otherwise editing incident records.
- Timeline comments, chat, notifications, analytics, and audit-log interfaces.
- Real-time synchronization between browser sessions.
- Production API integration, persistence, observability, and deployment.
- Customizable columns or user-saved views.

## Acceptance boundary

The product is ready for implementation when the approved prototype demonstrates every required state, role boundary, responsive transformation, and recovery path above without relying on undocumented gestures or hidden developer controls.
