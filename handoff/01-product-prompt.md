# Product contract: Incident Triage Dashboard

## Users and outcome

Operations Analysts triage a dense incident queue. Leads have the same visibility and can additionally assign an owner. The goal is to shorten acknowledgement time without hiding high-severity work.

## Required behavior

- Search by incident ID, title, or service and filter by severity.
- Open a detail drawer from any visible row.
- Only Leads can assign owners, and Closed incidents are always read-only.
- Make loading, empty, backend-error, and retry states observable.
- Preserve usable table and drawer behavior on narrow screens.

## Out of scope

No real incident mutation, authentication, paging, or notifications are included in this tutorial demo.
