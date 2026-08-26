# Figma Make Version 16 Evidence and Contract Review

## Scope

Version 16 of the existing Figma Make artifact was inspected and recaptured with the in-app Browser on 2026-08-26. It supersedes the prior Phase 4 screenshots as the current prototype evidence. By the recorded user decision on the same date, it is the authority for the current natural-language acceptance interactions. This decision does **not** authorize an implementation change in this update.

## Captured Version 16 states

- Default desktop queue with no detail panel selected.
- Lead detail, Analyst read-only, and Closed read-only.
- Loading, Empty Source, No Results, Load Error, and Save Failure.
- Mobile queue cards and the mobile detail sheet using the Make device preview.

The related files use the `phase-04-v16-*` naming convention in the shared tutorial asset directory.

## Confirmed continuity

- The prototype still exposes a deterministic 20-incident queue, search, severity/status/team filtering, role controls, source controls, and save outcome controls.
- It still demonstrates loading, empty, error, no-result, permission, closed, failed-save, and mobile states.
- The mobile detail sheet retains Back and Close actions.

## Contract review

### Accepted Version 16 interaction decisions

Version 16 changes the default desktop layout: the queue fills the available width until the user selects an incident, then the right-side detail panel appears. The user has accepted this behavior for the natural-language acceptance contract.

For an open incident, Version 16 exposes both Owner and Status controls to an Incident Lead and commits their changes through the shared Save Changes flow. The acceptance contract now treats this as approved interaction scope. Analyst and Closed states remain read-only.

### Response Notes boundary

Version 16 shows a **Response Notes** section in the Lead detail panel, but no authoring control was observed. It remains display-only incident context and is not an accepted editing capability.

### Product-contract boundary

The historical product contract remains the source for every rule not explicitly superseded above. It is not rewritten in this evidence update. The natural-language acceptance contract records the narrow, user-approved Version 16 interaction decision and must be used as the behavior source for a later implementation correction.

## Result

The screenshot set is current Version 16 evidence. The natural-language acceptance contract is updated for default desktop drawer timing and Lead-only Owner/Status editing. Development code, styles, and Stage 6 implementation artifacts are intentionally unchanged.
