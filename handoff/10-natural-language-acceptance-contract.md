# Incident Triage Dashboard Natural-Language Acceptance Contract

## 1. Contract boundary

This is a pre-development acceptance contract. It was generated from approved product requirements and prototype/design evidence. It intentionally excludes future production code, development plans, and automated tests so implementation cannot redefine product intent.

### In scope

- Deterministic incident queue, ordering, search, filters, result count, and context preservation.
- Incident details and Lead/Analyst/Closed permission boundaries.
- Owner and Status save progress, success, failure, retry, and committed-value integrity.
- Loading, loaded, Empty Source, No Results, Load Error, and reset behavior.
- Desktop, tablet, and mobile transformations.
- Keyboard operation, focus management, accessible naming, announcements, contrast, non-color cues, and reduced motion.
- Calm Control / Graphite Warmth visual hierarchy as the approved visual and responsive reference.

### Out of scope

- Authentication, user administration, and production authorization.
- Creating, deleting, closing, or editing incidents beyond assigning an owner or setting Status on an open incident as an Incident Lead.
- Authoring or editing Response Notes.
- Comments, chat, notifications, analytics, audit logs, real-time synchronization, production APIs, deployment, customizable columns, or saved views.

## 2. Source inventory

| Source | Role | Authority | Scope | Conflicts or limits |
| --- | --- | --- | --- | --- |
| `01-product-contract.md` | Requirement | Approved | Behavior, permissions, states, responsive, accessibility | Primary authority except where the recorded Version 16 acceptance decision explicitly supersedes an interaction |
| `02-figma-make-plan.md` | Prototype planning evidence | Approved | Deterministic controls and review checklist | Does not override product contract |
| `04-figma-make-wireframe-approval.md` | Prototype evidence | Approved | Verified wireframe states and representative data | Session persistence boundary is prototype-only |
| `06-figma-design-handoff.md` | Design evidence | Approved for visual/responsive use | Tokens, hierarchy, state presentation, responsive rules | Response Notes authoring is excluded; Version 16 governs the accepted Owner/Status interaction |
| `07-figma-design-approval.md` | Design approval | Approved | Visual direction and state recognition | Does not expand mutation permissions |
| `08-figma-make-hifi-handoff.md` | Prototype evidence | Approved | Version 7 behavior and responsive verification | Simulated local state only |
| `09-figma-make-hifi-approval.md` | Prototype approval | Approved | Entry condition for this contract | Confirms product contract remains authoritative |
| Figma Make Version 7 | Interactive prototype evidence | Approved | Observable states, controls, recovery, mobile behavior | Not a production implementation |
| Figma Make Version 16 | Latest prototype evidence | Accepted interaction authority by user decision (2026-08-26) | Current queue/detail interaction, Owner/Status save, states, and mobile preview | Supersedes prior interaction conflicts in this acceptance contract; Response Notes is observed as display-only |
| Figma Design file | Visual evidence | Approved | Desktop, drawer, states, responsive, tokens | Visual authority only |

## 3. Fact ledger

| Fact ID | Confirmed product fact | Source | Testability |
| --- | --- | --- | --- |
| F-01 | Normal source contains exactly 20 deterministic incidents. | Product contract; Make approvals | Observable with fixture |
| F-02 | Open incidents sort before Closed, then by severity, then most-recent update. | Product contract | Observable with fixture |
| F-03 | Desktop rows expose ID, title, service, severity, status, owner, and last update. | Product contract | Observable |
| F-04 | Search is case-insensitive across ID, title, service, team, and owner. | Product contract | Observable with fixture |
| F-05 | Severity, status, and team filters combine with search using AND semantics. | Product contract | Observable |
| F-06 | Active criteria remain visible and can be cleared individually or together. | Product contract | Observable |
| F-07 | Result count immediately reflects the visible incident set. | Product contract | Observable |
| F-08 | No Results retains search/filter controls and is distinct from Empty Source. | Product contract | Observable |
| F-09 | Opening details preserves search, filters, result count, and queue context. | Product contract | Observable |
| F-10 | Closing details restores focus to the originating row or card. | Product contract | Observable |
| F-11 | Details show complete incident context, status, timestamps, team, owner, and summary. | Product contract | Observable |
| F-12 | Lead may assign/reassign the owner of an open incident. | Product contract; Figma Make Version 16 | Observable |
| F-13 | A successful Owner or Status save updates the drawer and queue row for the current session. | Product contract; Figma Make Version 16 acceptance decision | Observable |
| F-14 | Saving Owner or Status has idle, in-progress, success, and failure states; duplicate action is blocked in progress. | Product contract; Figma Make Version 16 acceptance decision | Observable |
| F-15 | Failed save keeps the drawer open, preserves the proposed Owner and/or Status, changes no committed value, explains failure, and offers Retry. | Product contract; Figma Make Version 16 acceptance decision | Observable |
| F-16 | Retry uses preserved editable proposals and commits only after success. | High-fidelity handoff Version 7; Figma Make Version 16 acceptance decision | Observable |
| F-17 | Analyst Owner and Status controls are read-only with an explanation. | Product contract; Figma Make Version 16 acceptance decision | Observable |
| F-18 | Closed incidents are read-only for both roles with an explanation. | Product contract; Figma Make Version 16 | Observable |
| F-19 | Loading is visually and programmatically identifiable and announced. | Product contract | Observable |
| F-20 | Empty Source explains that no source incidents exist. | Product contract | Observable |
| F-21 | Load Error retains the workspace and exposes Retry. | Product contract | Observable |
| F-22 | Load Retry visibly enters loading, then restores deterministic success while retaining active criteria. | Make plan and wireframe approval | Observable |
| F-23 | Reset restores Lead, Normal, Success, no criteria, no selected incident, and default queue. | Make plan and wireframe approval | Observable |
| F-24 | Desktop at 1200 px+ starts with a full-width table; selecting an incident opens the right-side detail drawer. | Figma Make Version 16 acceptance decision | Observable |
| F-25 | Tablet at 768–1199 px retains readable queue information and uses a readable drawer/overlay without horizontal page scrolling. | Product contract; Design handoff | Observable |
| F-26 | Mobile below 768 px uses cards and a full-height detail sheet while retaining required information/actions. | Product contract | Observable |
| F-27 | All interactive behavior is keyboard-operable with visible focus. | Product contract | Observable |
| F-28 | Drawer/sheet has accessible title, initial focus, keyboard close, containment when modal, and focus restoration. | Product contract; Design handoff | Observable |
| F-29 | Inputs/filters have persistent accessible names; placeholder is not the only label. | Product contract | Observable |
| F-30 | Loading, count changes, save outcomes, and errors are announced without unexpected focus movement. | Product contract | Observable |
| F-31 | Severity, status, permissions, and errors use text/non-color cues. | Product contract | Observable |
| F-32 | Meaningful text/UI targets WCAG 2.2 AA and reduced motion is respected. | Product contract | Requires accessibility evaluation |
| F-33 | The prototype uses deterministic mock data and no real backend. | Product contract | Observable/inspection |
| F-34 | Response Notes remain displayed incident context; Version 16 exposes no Response Notes authoring control. | Figma Make Version 16 | Observable absence |
| F-35 | The user accepted Version 16's default desktop behavior: full-width queue until selection, then a right-side details panel. | User decision (2026-08-26); Figma Make Version 16 | Observable |
| F-36 | An Incident Lead can choose Status as well as Owner for an open incident and save the change; the current-session drawer and queue reflect a successful save. | User decision (2026-08-26); Figma Make Version 16 | Observable |

## 4. Classified test inventory

| ID | Title | Category | Priority | Main rule or risk |
| --- | --- | --- | --- | --- |
| NLT-Q-01 | Default queue loads deterministic operational order | Primary flow | Critical | F-01–F-03 |
| NLT-Q-02 | Search matches every approved field without case sensitivity | Alternate flow | High | F-04, F-07 |
| NLT-Q-03 | Search and filters combine with AND semantics | Functional | Critical | F-05–F-07 |
| NLT-Q-04 | Criteria can be cleared individually and together | Recovery | High | F-06, F-23 |
| NLT-Q-05 | No Results preserves controls and differs from Empty Source | State/negative | High | F-08, F-20 |
| NLT-Q-06 | Detail inspection preserves queue context and focus | State/context | Critical | F-09, F-10 |
| NLT-D-01 | Lead successfully assigns an open incident owner | Primary flow | Critical | F-12, F-13 |
| NLT-D-08 | Lead successfully changes an open incident Status | Primary flow | Critical | F-13, F-36 |
| NLT-D-02 | In-progress save prevents duplicate submission | Data integrity | Critical | F-14 |
| NLT-D-03 | Failed save preserves proposals and committed values | Error recovery | Critical | F-15 |
| NLT-D-04 | Retry commits preserved proposals only after success | Error recovery | Critical | F-16 |
| NLT-D-05 | Analyst can inspect but cannot mutate Owner or Status | Permission | Critical | F-17 |
| NLT-D-06 | Closed incidents are read-only for both roles | Permission | Critical | F-18 |
| NLT-D-07 | Drawer exposes complete context with only approved edits | Functional/scope | High | F-11, F-34, F-36 |
| NLT-S-01 | Loading state is identifiable and announced | Loading/accessibility | High | F-19, F-30 |
| NLT-S-02 | Empty Source communicates a source-data condition | Empty state | High | F-20 |
| NLT-S-03 | Load Error retains workspace and recovers deterministically | Error recovery | Critical | F-21, F-22 |
| NLT-S-04 | Reset restores the complete deterministic baseline | Lifecycle | High | F-23 |
| NLT-R-01 | Desktop opens the right drawer only after incident selection | Responsive | High | F-24, F-35 |
| NLT-R-02 | Tablet preserves information without page-level horizontal scrolling | Responsive | High | F-25 |
| NLT-R-03 | Mobile queue uses complete, actionable cards | Responsive | Critical | F-26 |
| NLT-R-04 | Mobile details use an accessible full-height modal sheet | Responsive/accessibility | Critical | F-26, F-28 |
| NLT-A-01 | Keyboard completes queue-to-drawer journey | Accessibility | Critical | F-27, F-28 |
| NLT-A-02 | Controls, dynamic outcomes, and errors expose meaningful semantics | Accessibility | Critical | F-29–F-31 |
| NLT-A-03 | Focus, contrast, non-color cues, and reduced motion meet the visual contract | Accessibility/visual | High | F-31, F-32 |
| NLT-J-01 | Lead finds an urgent incident, inspects it, and assigns ownership | Cross-functional journey | Critical | F-01–F-16 |
| NLT-J-02 | Operator recovers from load and save failures without losing intent | Cross-functional journey | Critical | F-15, F-16, F-21, F-22 |
| NLT-O-01 | Product exposes no unauthorized incident mutation or backend scope | Scope/negative | High | F-33, F-34, F-36 |

## 5. Detailed natural-language cases

### NLT-Q-01: Default queue loads deterministic operational order

- Category: Primary flow
- Priority: Critical — all later journeys depend on a predictable queue.
- User goal: Start triage from the same complete, correctly prioritized incident set.
- Source facts: F-01, F-02, F-03

#### Preconditions

- Active role is Incident Lead.
- Data source is Normal and no criteria or incident selection is active.

#### Test data

- Approved deterministic 20-incident fixture.

#### Steps and expected results

1. Open or reset the dashboard.
   - Expected: The queue reports exactly 20 incidents.
2. Review ordering across open and Closed incidents.
   - Expected: Every open incident precedes every Closed incident; incidents are then ordered by severity and most-recent update.
3. Review a representative desktop row.
   - Expected: ID, title, service, severity, status, owner, and last update are visible.

#### Final result

The queue establishes the approved deterministic operational baseline.

#### Cleanup

- None required.

### NLT-Q-02: Search matches every approved field without case sensitivity

- Category: Alternate flow
- Priority: High — operators must locate incidents from different known attributes.
- User goal: Find incidents using any approved searchable field.
- Source facts: F-04, F-07

#### Preconditions

- Normal 20-incident queue is loaded with no filters.

#### Test data

- Representative existing values for incident ID, title, service, team, and owner from the deterministic fixture.

#### Steps and expected results

1. Search separately with a representative value from each approved field.
   - Expected: Each query returns only incidents containing that value in ID, title, service, team, or owner.
2. Repeat one alphabetic query with different letter casing.
   - Expected: The same incidents are returned.
3. Observe the result count after each query.
   - Expected: It immediately matches the visible set.

#### Final result

Search is case-insensitive and covers exactly the five approved fields.

#### Cleanup

- Clear the search query.

### NLT-Q-03: Search and filters combine with AND semantics

- Category: Functional
- Priority: Critical — incorrect combination can hide or over-report urgent incidents.
- User goal: Narrow the queue predictably with multiple criteria.
- Source facts: F-05, F-06, F-07

#### Preconditions

- Normal queue is loaded.

#### Test data

- Criteria that produce a non-empty intersection across search, severity, status, and team.

#### Steps and expected results

1. Enter the search criterion.
   - Expected: Results and count update immediately.
2. Add severity, status, and team filters one at a time.
   - Expected: Every visible incident satisfies all active criteria; the count narrows after each applicable criterion.
3. Review active criteria.
   - Expected: Every search/filter criterion remains visible.

#### Final result

Search and all filters use AND semantics with a truthful result count.

#### Cleanup

- Clear all criteria.

### NLT-Q-04: Criteria can be cleared individually and together

- Category: Recovery
- Priority: High — operators must be able to recover from over-filtering.
- User goal: Remove unwanted criteria without reconstructing the queue.
- Source facts: F-06, F-23

#### Preconditions

- Search, severity, status, and team criteria are active.

#### Steps and expected results

1. Clear one active criterion.
   - Expected: Only that criterion disappears; remaining criteria continue to apply and the count updates.
2. Activate Clear all.
   - Expected: Search and every filter are removed.
3. Review the queue.
   - Expected: The deterministic default 20-item order is restored.

#### Final result

Individual and global clear actions recover the intended queue state.

#### Cleanup

- None required.

### NLT-Q-05: No Results preserves controls and differs from Empty Source

- Category: State and negative behavior
- Priority: High — users must know whether data is absent or criteria are too narrow.
- User goal: Understand and recover from a zero-result filter combination.
- Source facts: F-08, F-20

#### Preconditions

- Normal source is loaded.

#### Steps and expected results

1. Apply a supported criterion combination with no matches.
   - Expected: A dedicated No Results state appears while search/filter controls and active criteria remain available.
2. Clear one or all criteria.
   - Expected: Matching incidents return without changing the data source.
3. Switch the data source to Empty with no criteria.
   - Expected: Empty Source uses a different explanation that describes missing source incidents rather than active criteria.

#### Final result

No Results and Empty Source are visibly and semantically distinct and each offers an appropriate recovery path.

#### Cleanup

- Reset to defaults.

### NLT-Q-06: Detail inspection preserves queue context and focus

- Category: State and context
- Priority: Critical — inspection must not disrupt active triage work.
- User goal: Inspect an incident and return to the same queue context.
- Source facts: F-09, F-10

#### Preconditions

- A non-default search/filter combination is active and a matching incident is visible.

#### Steps and expected results

1. Activate the incident row or card.
   - Expected: Details open for that incident; search, filters, count, and queue context remain unchanged.
2. Close details with the visible close action.
   - Expected: Details close and focus returns to the originating row or card.
3. Repeat and close with the supported keyboard close action.
   - Expected: The same context and focus restoration occur.

#### Final result

Opening and closing details preserves both data context and keyboard location.

#### Cleanup

- Clear criteria.

### NLT-D-01: Lead successfully assigns an open incident owner

- Category: Primary flow
- Priority: Critical — ownership assignment is the primary mutation.
- User goal: Commit an owner for an open incident.
- Source facts: F-12, F-13

#### Preconditions

- Role is Incident Lead; save outcome is Success.
- An open incident is selected.

#### Steps and expected results

1. Choose a different owner.
   - Expected: The proposal is visible and Save becomes available.
2. Activate Save.
   - Expected: An in-progress state appears, followed by visible and announced success.
3. Review the drawer and queue row.
   - Expected: Both show the newly committed owner for the current session.

#### Final result

An authorized Lead can commit a new owner consistently in details and queue.

#### Cleanup

- Reset the demo or restore the original owner.

### NLT-D-02: In-progress save prevents duplicate submission

- Category: Data integrity
- Priority: Critical — duplicate mutation attempts can corrupt state.
- User goal: Submit one authorized Owner or Status change even when the operation is still pending.
- Source facts: F-14

#### Preconditions

- Role is Incident Lead; an open incident has an unsaved Owner or Status proposal.

#### Steps and expected results

1. Activate Save.
   - Expected: Saving is visibly in progress and announced.
2. Attempt to activate the save action again before completion.
   - Expected: The repeated action is unavailable or ignored and only one outcome occurs.

#### Final result

Pending state prevents duplicate save requests.

#### Cleanup

- Wait for completion and reset.

### NLT-D-03: Failed save preserves proposals and committed values

- Category: Error recovery
- Priority: Critical — a failure must not create a false committed Owner or Status.
- User goal: Retain the intended edit while clearly preserving committed data.
- Source facts: F-15

#### Preconditions

- Role is Incident Lead; save outcome is Failure.
- An open incident with known committed Owner and Status values is selected.

#### Steps and expected results

1. Select a different proposed Owner and/or Status and save.
   - Expected: The drawer stays open; a clear failure alert appears and Retry is available.
2. Review the editable fields.
   - Expected: Every proposed Owner/Status value remains selected.
3. Review the corresponding queue row.
   - Expected: The committed Owner and Status have not changed.

#### Final result

A failed save preserves user intent without corrupting committed queue data.

#### Cleanup

- Reset or continue with NLT-D-04.

### NLT-D-04: Retry commits preserved proposals only after success

- Category: Error recovery
- Priority: Critical — the recovery path was historically fragile in the prototype.
- User goal: Retry the same intended Owner and/or Status update and commit it after recovery.
- Source facts: F-16

#### Preconditions

- NLT-D-03 failure state is displayed with a preserved proposal.

#### Steps and expected results

1. Change the simulated save outcome to Success without changing the proposed values.
   - Expected: Failure state and proposed Owner/Status remain present until Retry.
2. Activate Retry.
   - Expected: Saving is shown, followed by visible and announced success.
3. Review the queue row and drawer.
   - Expected: Both now show the preserved proposed values as committed.

#### Final result

Retry reuses the preserved proposal and commits exactly once after success.

#### Cleanup

- Reset to defaults.

### NLT-D-05: Analyst can inspect but cannot mutate Owner or Status

- Category: Permission
- Priority: Critical — role boundaries must prevent unauthorized mutation.
- User goal: Inspect the same incident context as an Analyst without gaining edit capability.
- Source facts: F-17

#### Preconditions

- Active role is Incident Analyst and an open incident is selected.

#### Steps and expected results

1. Review the incident details.
   - Expected: Current owner and incident context are visible.
2. Inspect the Owner and Status areas.
   - Expected: No Owner/Status mutation or save action is available; a concise Lead-role permission explanation is visible.
3. Use keyboard navigation through the drawer/sheet.
   - Expected: No hidden editable Owner or Status control becomes reachable.

#### Final result

Analysts retain inspection access but cannot assign/reassign Owner or change Status.

#### Cleanup

- Reset role to Incident Lead.

### NLT-D-06: Closed incidents are read-only for both roles

- Category: Permission
- Priority: Critical — Closed state overrides role authorization.
- User goal: Inspect a Closed incident without accidentally editing it.
- Source facts: F-18

#### Preconditions

- A Closed incident exists in the deterministic queue.

#### Steps and expected results

1. As Incident Lead, open the Closed incident.
   - Expected: Context, Owner, and Status are visible; mutation controls are unavailable and a Closed read-only explanation is visible.
2. Switch to Incident Analyst while the same incident is selected.
   - Expected: The incident remains read-only with no mutation action.

#### Final result

Closed incidents cannot be modified by either role.

#### Cleanup

- Reset to defaults.

### NLT-D-07: Drawer exposes complete context with only approved edits

- Category: Functional and scope
- Priority: High — design artifacts must not accidentally expand the accepted interaction scope.
- User goal: Understand an incident and distinguish approved edits from display-only context.
- Source facts: F-11, F-34, F-36

#### Preconditions

- Any incident is selected.

#### Steps and expected results

1. Review details.
   - Expected: ID/title, severity, status, service, team, created/updated timestamps, owner, and operational summary are available.
2. Review available mutation controls as an authorized Lead on an open incident.
   - Expected: Owner and Status are editable and use the shared Save action; Response Notes is display-only with no authoring control.

#### Final result

Details provide complete context with only the approved Owner/Status mutation scope.

#### Cleanup

- Close details.

### NLT-D-08: Lead successfully changes an open incident Status

- Category: Primary flow
- Priority: Critical — Version 16 makes Status an approved triage decision for an open incident.
- User goal: Commit a changed Status without losing the queue context.
- Source facts: F-13, F-36

#### Preconditions

- Role is Incident Lead; save outcome is Success.
- An open incident is selected and its current Status is known.

#### Steps and expected results

1. Choose a different Status in the Select incident status control.
   - Expected: The proposal is visible and Save Changes becomes available.
2. Activate Save Changes.
   - Expected: An in-progress state appears, followed by visible and announced success.
3. Review the drawer and queue row.
   - Expected: Both show the newly committed Status for the current session.

#### Final result

An authorized Lead can commit a Status change consistently in details and queue.

#### Cleanup

- Reset the demo or restore the original Status.

### NLT-S-01: Loading state is identifiable and announced

- Category: Loading and accessibility
- Priority: High — operators need confidence that data retrieval is progressing.
- User goal: Recognize a pending load without losing workspace orientation.
- Source facts: F-19, F-30

#### Preconditions

- A deterministic action can trigger initial or retry loading.

#### Steps and expected results

1. Trigger loading.
   - Expected: The results region visibly indicates loading and exposes programmatic busy/loading state.
2. Observe focus and announcement behavior.
   - Expected: Loading is announced without unexpectedly moving focus.
3. Wait for the defined completion state.
   - Expected: Loading resolves to the configured loaded, empty, or error result.

#### Final result

Loading is visually and programmatically understandable without disrupting focus.

#### Cleanup

- Reset if required.

### NLT-S-02: Empty Source communicates a source-data condition

- Category: Empty state
- Priority: High — users must not misdiagnose empty source as filter failure.
- User goal: Understand that the selected source contains no incidents.
- Source facts: F-20

#### Preconditions

- Data source is Empty and no criteria are active.

#### Steps and expected results

1. Allow the source to resolve.
   - Expected: An Empty Source explanation appears in the results area and the count reflects zero incidents.
2. Review surrounding controls.
   - Expected: Role, search, filters, and demo recovery controls remain reachable.

#### Final result

The dashboard clearly communicates an empty source without presenting filtered No Results language.

#### Cleanup

- Reset to Normal.

### NLT-S-03: Load Error retains workspace and recovers deterministically

- Category: Error recovery
- Priority: Critical — the queue must recover without losing operator intent.
- User goal: Retry a failed queue load and continue with the same criteria.
- Source facts: F-21, F-22

#### Preconditions

- Search or filters are active; data source can be set to Load Error.

#### Steps and expected results

1. Trigger Load Error.
   - Expected: The results area is replaced by a clear error and Retry while the surrounding workspace and active criteria remain visible.
2. Activate Retry.
   - Expected: The results area visibly enters loading and repeated Retry is unavailable in progress.
3. Wait for completion.
   - Expected: The deterministic Normal source returns and the retained criteria are applied to the restored queue.

#### Final result

Load recovery restores deterministic data without discarding active triage intent.

#### Cleanup

- Clear criteria or reset.

### NLT-S-04: Reset restores the complete deterministic baseline

- Category: Lifecycle
- Priority: High — tutorial and test workflows require reproducible setup.
- User goal: Return every demo dimension to a known baseline.
- Source facts: F-23

#### Preconditions

- Analyst role, non-Normal source or failure outcome, active criteria, and an open detail are present.

#### Steps and expected results

1. Activate Reset to defaults.
   - Expected: Role becomes Incident Lead, data source Normal, save outcome Success, all criteria clear, and details close.
2. Review the queue.
   - Expected: The default 20-item deterministic order is restored.

#### Final result

Reset produces a reproducible baseline for subsequent cases.

#### Cleanup

- None required.

### NLT-R-01: Desktop opens the right drawer only after incident selection

- Category: Responsive
- Priority: High — desktop is the primary operations workspace.
- User goal: Start with a broad queue scan, then inspect an incident without losing queue context.
- Source facts: F-24, F-35

#### Preconditions

- Viewport is at least 1200 px wide.

#### Steps and expected results

1. Load the default queue.
   - Expected: The queue occupies the available desktop workspace; full table columns, search, filters, role, and count are visible without page-level horizontal scrolling; no detail panel is shown.
2. Open an incident.
   - Expected: Details appear in a right-side drawer while the queue remains visible.
3. Close the drawer.
   - Expected: The detail panel is removed and the queue again occupies the available workspace; focus returns to the originating row.

#### Final result

Desktop preserves dense scanning and side-by-side inspection.

#### Cleanup

- Close details.

### NLT-R-02: Tablet preserves information without page-level horizontal scrolling

- Category: Responsive
- Priority: High — tablet must not silently remove required context.
- User goal: Complete the triage journey at 768–1199 px.
- Source facts: F-25

#### Preconditions

- Viewport is within the supported tablet range.

#### Steps and expected results

1. Review queue, search, filters, role, and count.
   - Expected: They remain reachable; secondary metadata may wrap or move but required information remains available without horizontal page scrolling.
2. Open details.
   - Expected: The drawer or overlay remains readable and its close action is visible.

#### Final result

Tablet preserves required information and actions through the approved transformation.

#### Cleanup

- Close details.

### NLT-R-03: Mobile queue uses complete, actionable cards

- Category: Responsive
- Priority: Critical — mobile changes the primary queue structure.
- User goal: Identify and open the correct incident from a narrow viewport.
- Source facts: F-26

#### Preconditions

- Viewport is below 768 px.

#### Steps and expected results

1. Load the normal queue.
   - Expected: Table rows are replaced by vertically stacked incident cards.
2. Review representative cards.
   - Expected: ID, title, severity, status, owner, and recency remain visible; cards have meaningful activation names.
3. Review search and filters.
   - Expected: They remain reachable without horizontal scrolling and use mobile-appropriate controls.

#### Final result

Mobile cards preserve the information and action needed to choose an incident.

#### Cleanup

- None required.

### NLT-R-04: Mobile details use an accessible full-height modal sheet

- Category: Responsive and accessibility
- Priority: Critical — mobile detail behavior affects navigation and focus.
- User goal: Inspect and, when authorized, change Owner or Status in a mobile detail surface.
- Source facts: F-26, F-28

#### Preconditions

- Mobile queue is visible; role is Incident Lead.

#### Steps and expected results

1. Activate an open incident card.
   - Expected: A full-height, titled modal detail sheet opens and initial focus moves inside it.
2. Navigate through the sheet.
   - Expected: Required context and authorized Owner/Status controls are reachable; focus remains contained while modal.
3. Close with the sticky close/back action or keyboard close action.
   - Expected: The sheet closes and focus returns to the originating card.

#### Final result

The mobile sheet supports complete inspection, authorized action, and predictable focus recovery.

#### Cleanup

- None required.

### NLT-A-01: Keyboard completes queue-to-drawer journey

- Category: Accessibility
- Priority: Critical — the primary workflow must not require a pointer.
- User goal: Find, inspect, and close an incident using only the keyboard.
- Source facts: F-27, F-28

#### Preconditions

- Default queue is loaded and no pointer interaction is used.

#### Steps and expected results

1. Navigate through role, search, filters, and queue controls.
   - Expected: Focus follows visual order and is always visible.
2. Activate an incident with the keyboard.
   - Expected: Details open with meaningful initial focus.
3. Navigate interactive details and close them with the keyboard.
   - Expected: Every permitted action is operable and focus returns to the origin.

#### Final result

The complete inspection journey is keyboard-operable with visible, predictable focus.

#### Cleanup

- None required.

### NLT-A-02: Controls, dynamic outcomes, and errors expose meaningful semantics

- Category: Accessibility
- Priority: Critical — state changes must be perceivable without visual inference.
- User goal: Understand and operate the dashboard through accessible names and announcements.
- Source facts: F-29, F-30, F-31

#### Preconditions

- A semantic accessibility inspection method is available.

#### Steps and expected results

1. Inspect search, filters, rows/cards, drawer/sheet, Owner and Status fields, Save, Retry, and close actions.
   - Expected: Each exposes a persistent, meaningful accessible name and correct state.
2. Trigger a count change, loading, save success, save failure, and load error.
   - Expected: Each outcome is announced without unexpected focus movement.
3. Inspect severity, status, permissions, and errors.
   - Expected: Each includes text or another non-color cue.

#### Final result

Interactive controls and dynamic outcomes are understandable without relying on placeholder text or color alone.

#### Cleanup

- Reset to defaults.

### NLT-A-03: Focus, contrast, non-color cues, and reduced motion meet the visual contract

- Category: Accessibility and visual acceptance
- Priority: High — the chosen visual direction must remain usable during long shifts.
- User goal: Use the dashboard with readable hierarchy and supported accessibility preferences.
- Source facts: F-31, F-32

#### Preconditions

- Desktop and mobile approved states are available; reduced-motion preference can be enabled.

#### Steps and expected results

1. Evaluate text, meaningful UI, focus indicators, selected states, errors, severity, and status against WCAG 2.2 AA requirements.
   - Expected: Required contrast is met and state differences do not depend on hue alone.
2. Navigate representative controls.
   - Expected: A visible focus indicator is present against every relevant surface.
3. Enable reduced motion and open/close drawers or sheets and trigger feedback.
   - Expected: Motion is removed or reduced without hiding state changes or completion feedback.

#### Final result

The approved Graphite Warmth system preserves contrast, state recognition, focus visibility, and reduced-motion usability.

#### Cleanup

- Restore the environment preference if required.

### NLT-J-01: Lead finds an urgent incident, inspects it, and assigns ownership

- Category: Cross-functional journey
- Priority: Critical — release sanity for the primary user goal.
- User goal: Move from a full queue to a committed owner without losing operational context.
- Source facts: F-01–F-16

#### Preconditions

- Default Normal queue; role Incident Lead; save outcome Success.

#### Steps and expected results

1. Use search and filters to locate a Critical or High open incident.
   - Expected: The visible set and count match all criteria.
2. Open the incident.
   - Expected: Complete context appears while the queue criteria remain intact.
3. Choose and save a new owner.
   - Expected: Pending and success states appear; drawer and queue show the committed owner.
4. Close details.
   - Expected: Focus and filtered context return to the originating incident.

#### Final result

An Incident Lead can complete the primary triage-to-ownership journey with context preserved.

#### Cleanup

- Reset to defaults.

### NLT-J-02: Operator recovers from load and save failures without losing intent

- Category: Cross-functional journey
- Priority: Critical — release sanity for recovery and data integrity.
- User goal: Recover from independent data-load and owner-save failures.
- Source facts: F-15, F-16, F-21, F-22

#### Preconditions

- Deterministic demo controls are available.

#### Steps and expected results

1. Apply criteria, trigger Load Error, and retry.
   - Expected: Loading precedes restored Normal data and the criteria remain applied.
2. Open an authorized incident, propose an Owner and/or Status update, and trigger Save Failure.
   - Expected: Proposals and intent remain; committed queue data does not change; alert and Retry are visible.
3. Change only the outcome to Success and retry.
   - Expected: The preserved proposal is committed and announced.

#### Final result

Both recovery paths preserve user intent and prevent false committed state.

#### Cleanup

- Reset to defaults.

### NLT-O-01: Product exposes no unauthorized incident mutation or backend scope

- Category: Scope and negative behavior
- Priority: High — implementation must remain a focused deterministic demo.
- User goal: Use only the approved triage, Owner-assignment, and Status-update capabilities.
- Source facts: F-33, F-34, F-36

#### Preconditions

- Review all primary pages, role states, detail states, and demo controls.

#### Steps and expected results

1. Inspect available incident actions.
   - Expected: Apart from Lead-only Owner and Status edits on open incidents, there are no create, delete, close, Response Notes authoring, comment, chat, notification, analytics, authentication, or saved-view actions.
2. Exercise loading and saving.
   - Expected: Behavior is reproducible from deterministic mock controls and requires no production service or credential.

#### Final result

The product stays within its approved deterministic demonstration boundary.

#### Cleanup

- None required.

## 6. Coverage matrix

| Case ID | Facts | Role | State | Environment | Category | Priority |
| --- | --- | --- | --- | --- | --- | --- |
| NLT-Q-01 | F-01–F-03 | Both | Loaded | Desktop | Primary flow | Critical |
| NLT-Q-02 | F-04, F-07 | Both | Loaded | Responsive | Search | High |
| NLT-Q-03 | F-05–F-07 | Both | Loaded | Responsive | Filters | Critical |
| NLT-Q-04 | F-06, F-23 | Both | Filtered | Responsive | Recovery | High |
| NLT-Q-05 | F-08, F-20 | Both | No Results/Empty | Responsive | State | High |
| NLT-Q-06 | F-09, F-10 | Both | Detail open/closed | Desktop/mobile | Context/focus | Critical |
| NLT-D-01 | F-12, F-13 | Lead | Save success | Desktop/mobile | Mutation | Critical |
| NLT-D-08 | F-13, F-36 | Lead | Save success | Desktop/mobile | Mutation | Critical |
| NLT-D-02 | F-14 | Lead | Saving | Desktop/mobile | Integrity | Critical |
| NLT-D-03 | F-15 | Lead | Save failure | Desktop/mobile | Recovery | Critical |
| NLT-D-04 | F-16 | Lead | Retry success | Desktop/mobile | Recovery | Critical |
| NLT-D-05 | F-17 | Analyst | Read-only | Desktop/mobile | Permission | Critical |
| NLT-D-06 | F-18 | Both | Closed | Desktop/mobile | Permission | Critical |
| NLT-D-07 | F-11, F-34, F-36 | Both | Detail | Responsive | Scope | High |
| NLT-S-01 | F-19, F-30 | Both | Loading | Responsive | Accessibility | High |
| NLT-S-02 | F-20 | Both | Empty | Responsive | State | High |
| NLT-S-03 | F-21, F-22 | Both | Load error/retry | Responsive | Recovery | Critical |
| NLT-S-04 | F-23 | Both | Reset | Responsive | Lifecycle | High |
| NLT-R-01 | F-24, F-35 | Both | Loaded/detail | Desktop | Responsive | High |
| NLT-R-02 | F-25 | Both | Loaded/detail | Tablet | Responsive | High |
| NLT-R-03 | F-26 | Both | Loaded | Mobile | Responsive | Critical |
| NLT-R-04 | F-26, F-28 | Lead | Detail | Mobile | Responsive/a11y | Critical |
| NLT-A-01 | F-27, F-28 | Both | Journey | Responsive | Keyboard | Critical |
| NLT-A-02 | F-29–F-31 | Both | Dynamic states | Responsive | Semantics | Critical |
| NLT-A-03 | F-31, F-32 | Both | Visual states | Desktop/mobile | Visual/a11y | High |
| NLT-J-01 | F-01–F-16 | Lead | Primary journey | Desktop/mobile | Sanity | Critical |
| NLT-J-02 | F-15, F-16, F-21, F-22 | Lead | Recovery journey | Desktop/mobile | Sanity | Critical |
| NLT-O-01 | F-33, F-34, F-36 | Both | All | All | Scope | High |

## 7. Coverage summary

- Confirmed facts covered: 36 of 36, including the recorded Version 16 interaction decision.
- Detailed cases: 28.
- Intentional overlaps: NLT-J-01 overlaps queue and successful ownership cases for release sanity; NLT-J-02 overlaps focused load/save recovery cases for cross-functional confidence.
- Deferred dimensions: localization is deferred because no supported locales or translated product copy are defined; browser compatibility is deferred because no supported browser matrix is defined; production persistence and integrations are out of scope.

## 8. Gaps, conflicts, assumptions, and approval decisions

- Version 16 acceptance decision (2026-08-26): this contract adopts the collapsed-by-default desktop drawer and Lead-only Owner/Status editing for open incidents. This decision governs acceptance interactions only; implementation is intentionally unchanged in this update.
- Response Notes boundary: Version 16 exposes Response Notes as display-only context. No authoring control was observed, so Response Notes editing remains out of scope.
- Persistence boundary: acceptance requires drawer and queue consistency for the current session. Cross-session and production persistence are explicitly out of scope. Reload persistence remains a product-owner clarification and is not used as an implementation gate in this phase.
- Tablet form: the contract allows either a compact table or structured list and either a widened drawer or overlay. Acceptance is based on information/action preservation, not one exact structure.
- WCAG evaluation: contrast and reduced-motion cases require dedicated tooling or browser evidence during development/E2E; prototype approval is supporting evidence, not the final production result.
- Approval recommendation: use this suite as the current behavior contract for the next implementation-correction plan and retain the fact/case IDs in each Issue's Acceptance Criteria.
