export const severities = ['Critical', 'High', 'Medium', 'Low'] as const
export const statuses = ['Investigating', 'Identified', 'Monitoring', 'Closed'] as const
export const teams = ['Core Platform', 'Payments', 'Identity', 'Data', 'Customer Experience'] as const

export type Severity = (typeof severities)[number]
export type IncidentStatus = (typeof statuses)[number]
export type Team = (typeof teams)[number]

export interface Incident {
  id: string
  title: string
  service: string
  severity: Severity
  status: IncidentStatus
  team: Team
  owner: string | null
  createdAt: string
  updatedAt: string
  summary: string
}

// The order here is intentionally arbitrary. `sortIncidents` establishes the
// deterministic operational order so tests catch accidental sorting changes.
export const incidents: readonly Incident[] = [
  { id: 'INC-0001', title: 'Checkout authorization failures', service: 'Payments API', severity: 'Critical', status: 'Investigating', team: 'Payments', owner: 'Amina Okafor', createdAt: '2026-08-25T07:40:00Z', updatedAt: '2026-08-25T09:42:00Z', summary: 'Card authorizations are failing for a subset of checkout traffic.' },
  { id: 'INC-0002', title: 'Regional login latency', service: 'Identity Gateway', severity: 'High', status: 'Investigating', team: 'Identity', owner: 'Luis Ortega', createdAt: '2026-08-25T06:15:00Z', updatedAt: '2026-08-25T09:34:00Z', summary: 'Sign-in latency is elevated in the west region.' },
  { id: 'INC-0003', title: 'Settlement reconciliation delayed', service: 'Payments Ledger', severity: 'Critical', status: 'Monitoring', team: 'Payments', owner: 'Priya Shah', createdAt: '2026-08-25T04:52:00Z', updatedAt: '2026-08-25T09:27:00Z', summary: 'Settlement events are processing behind the expected schedule.' },
  { id: 'INC-0004', title: 'Search indexing backlog', service: 'Catalog Search', severity: 'Medium', status: 'Identified', team: 'Customer Experience', owner: 'Noah Williams', createdAt: '2026-08-24T22:31:00Z', updatedAt: '2026-08-25T09:18:00Z', summary: 'New catalog entries are delayed in customer search results.' },
  { id: 'INC-0005', title: 'Event stream consumer lag', service: 'Event Pipeline', severity: 'High', status: 'Monitoring', team: 'Data', owner: 'Mei Lin', createdAt: '2026-08-25T03:24:00Z', updatedAt: '2026-08-25T09:12:00Z', summary: 'A consumer group is recovering from an event-processing backlog.' },
  { id: 'INC-0006', title: 'Container scheduling failures', service: 'Runtime Orchestrator', severity: 'Critical', status: 'Investigating', team: 'Core Platform', owner: 'Chen Wei', createdAt: '2026-08-25T08:05:00Z', updatedAt: '2026-08-25T09:08:00Z', summary: 'New workloads are intermittently unable to schedule.' },
  { id: 'INC-0007', title: 'Invoice PDF generation slow', service: 'Billing Documents', severity: 'Medium', status: 'Monitoring', team: 'Payments', owner: 'Sofia Rossi', createdAt: '2026-08-24T20:42:00Z', updatedAt: '2026-08-25T08:56:00Z', summary: 'Invoice document generation exceeds the latency objective.' },
  { id: 'INC-0008', title: 'Profile image uploads failing', service: 'Media Service', severity: 'Low', status: 'Identified', team: 'Customer Experience', owner: 'Jordan Lee', createdAt: '2026-08-25T01:19:00Z', updatedAt: '2026-08-25T08:43:00Z', summary: 'Some profile image uploads fail during processing.' },
  { id: 'INC-0009', title: 'Token refresh errors', service: 'Session Service', severity: 'Critical', status: 'Monitoring', team: 'Identity', owner: 'Luis Ortega', createdAt: '2026-08-24T23:50:00Z', updatedAt: '2026-08-25T08:38:00Z', summary: 'Refresh requests intermittently return invalid-session errors.' },
  { id: 'INC-0010', title: 'Analytics export timeout', service: 'Reporting API', severity: 'Medium', status: 'Investigating', team: 'Data', owner: null, createdAt: '2026-08-25T02:18:00Z', updatedAt: '2026-08-25T08:25:00Z', summary: 'Large exports are exceeding the request timeout.' },
  { id: 'INC-0011', title: 'Webhook delivery retries elevated', service: 'Integration Hub', severity: 'High', status: 'Identified', team: 'Core Platform', owner: 'Amina Okafor', createdAt: '2026-08-24T19:13:00Z', updatedAt: '2026-08-25T08:11:00Z', summary: 'Partner webhooks require more retry attempts than normal.' },
  { id: 'INC-0012', title: 'Refund queue processing stalled', service: 'Payments Operations', severity: 'Critical', status: 'Investigating', team: 'Payments', owner: 'Priya Shah', createdAt: '2026-08-25T05:47:00Z', updatedAt: '2026-08-25T08:02:00Z', summary: 'Automated refund requests are waiting for processing.' },
  { id: 'INC-0013', title: 'Feature flag evaluation latency', service: 'Configuration Service', severity: 'Low', status: 'Monitoring', team: 'Core Platform', owner: 'Chen Wei', createdAt: '2026-08-24T18:05:00Z', updatedAt: '2026-08-25T07:49:00Z', summary: 'Flag evaluations are slower than the service objective.' },
  { id: 'INC-0014', title: 'Customer timeline gaps', service: 'Activity Feed', severity: 'Medium', status: 'Identified', team: 'Customer Experience', owner: 'Noah Williams', createdAt: '2026-08-24T17:28:00Z', updatedAt: '2026-08-25T07:35:00Z', summary: 'Recent account activities are missing from some timelines.' },
  { id: 'INC-0015', title: 'Warehouse replica lag', service: 'Data Warehouse', severity: 'High', status: 'Monitoring', team: 'Data', owner: 'Mei Lin', createdAt: '2026-08-24T21:02:00Z', updatedAt: '2026-08-25T07:21:00Z', summary: 'A read replica is behind the primary warehouse.' },
  { id: 'INC-0016', title: 'MFA enrollment unavailable', service: 'Identity Settings', severity: 'Medium', status: 'Investigating', team: 'Identity', owner: 'Jordan Lee', createdAt: '2026-08-25T00:31:00Z', updatedAt: '2026-08-25T07:09:00Z', summary: 'New multifactor enrollment cannot complete for some users.' },
  { id: 'INC-0017', title: 'Edge cache miss spike', service: 'Content Delivery', severity: 'Low', status: 'Monitoring', team: 'Core Platform', owner: 'Sofia Rossi', createdAt: '2026-08-24T16:43:00Z', updatedAt: '2026-08-25T06:56:00Z', summary: 'Cache misses are elevated but origin capacity remains healthy.' },
  { id: 'INC-0018', title: 'Recommendation freshness degraded', service: 'Recommendations', severity: 'High', status: 'Investigating', team: 'Data', owner: null, createdAt: '2026-08-24T15:50:00Z', updatedAt: '2026-08-25T06:42:00Z', summary: 'Recommendation models are receiving stale feature data.' },
  { id: 'INC-0019', title: 'Legacy API certificate renewed', service: 'Partner Gateway', severity: 'Medium', status: 'Closed', team: 'Core Platform', owner: 'Chen Wei', createdAt: '2026-08-23T12:12:00Z', updatedAt: '2026-08-25T05:30:00Z', summary: 'The partner certificate was replaced and traffic is stable.' },
  { id: 'INC-0020', title: 'Email verification delivery restored', service: 'Messaging', severity: 'Low', status: 'Closed', team: 'Identity', owner: 'Luis Ortega', createdAt: '2026-08-22T09:08:00Z', updatedAt: '2026-08-24T23:20:00Z', summary: 'Verification email delivery has returned to normal.' },
]

const severityRank: Record<Severity, number> = { Critical: 0, High: 1, Medium: 2, Low: 3 }

export function sortIncidents(items: readonly Incident[]): Incident[] {
  return [...items].sort((a, b) => {
    const openOrder = Number(a.status === 'Closed') - Number(b.status === 'Closed')
    if (openOrder !== 0) return openOrder
    const severityOrder = severityRank[a.severity] - severityRank[b.severity]
    if (severityOrder !== 0) return severityOrder
    const updateOrder = Date.parse(b.updatedAt) - Date.parse(a.updatedAt)
    if (updateOrder !== 0) return updateOrder
    return a.id.localeCompare(b.id)
  })
}
