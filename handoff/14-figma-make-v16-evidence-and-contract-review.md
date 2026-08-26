# Figma Make Version 16 Evidence and Contract Review

## Scope

Version 16 of the existing Figma Make artifact was inspected and recaptured with the in-app Browser on 2026-08-26. It supersedes the prior Phase 4 screenshots as the current prototype evidence, but it does **not** automatically amend the approved product contract or acceptance contract.

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

### Approved change for evidence only

Version 16 changes the default desktop layout: the queue fills the available width until the user selects an incident, then the right-side detail panel appears. The natural-language contract must therefore record this as a Version 16 source conflict against F-24; it must not silently rewrite the product requirement.

### Unapproved behavior expansion

Version 16 shows editable **Status** and a **Response Notes** section in the Lead detail panel. The approved product contract and natural-language acceptance contract explicitly prohibit status and response-note editing. These controls are prototype drift, not accepted product scope:

- Do not add positive acceptance cases for status or response-note editing.
- Retain the negative scope assertion that neither action is available in the delivered demo.
- Require an explicit product-contract amendment and a new approval before treating those controls as a development requirement.

## Result

The screenshot set is current Version 16 evidence. The acceptance contract receives a targeted source/conflict update only; its approved mutation boundary remains unchanged.
