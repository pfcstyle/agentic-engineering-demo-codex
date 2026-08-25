# Figma Make Planning Handoff

## Instruction to Figma Make

Act as a Product Engineer preparing an executable UX plan for the Incident Triage Dashboard. Use `01-product-prompt.md` as the behavior contract. Stay in Plan mode until every item below is accounted for; do not build during the first response.

## Required plan output

1. Describe the desktop, tablet, and mobile page structures.
2. Define the queue, filter bar, results summary, detail drawer, and ownership interaction model.
3. Map every role and permission rule to a visible control state.
4. Define mock incident data sufficient to demonstrate every severity, status, ownership condition, and both roles.
5. Define deterministic demonstrations for initial loading, background refresh, empty queue, no filter results, backend error, retry in progress, retry success, save in progress, and save success.
6. Explain how filters, search, selected incident, and scroll context persist across drawer and retry interactions.
7. Identify the responsive transformations at desktop, tablet, and mobile breakpoints.
8. Include accessibility behavior for naming, keyboard flow, focus restoration, live announcements, and non-color status cues.
9. List all explicitly excluded capabilities so the generated prototype does not expand scope.
10. End with a Product Engineer approval checklist.

## Build instruction after approval

After the plan is approved, build a functional wireframe with deterministic mock controls for every required state. Favor information hierarchy and complete behavior coverage over final visual styling. Keep the structure editable for later transfer into Figma Design.

## Product Engineer review checklist

- [ ] Queue ordering and result counts are visible.
- [ ] Combined filters and case-insensitive search work together.
- [ ] Drawer open and close preserve queue context.
- [ ] Lead assignment persists in both drawer and table.
- [ ] Analyst assignment is prohibited visibly and functionally.
- [ ] Closed incidents are read-only for every role.
- [ ] Loading, empty queue, no results, backend error, retry, and save states are independently demonstrable.
- [ ] Desktop, tablet, and mobile layouts preserve critical information and actions.
- [ ] Keyboard, focus, accessible naming, live-region, and non-color requirements are represented.
- [ ] No out-of-scope incident editing or production integration is introduced.

