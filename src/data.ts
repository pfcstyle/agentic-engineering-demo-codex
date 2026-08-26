import type { Incident } from './types'

const raw: Omit<Incident, 'createdAt' | 'summary'>[] = [
  { id: 'INC-0001', title: 'Card authorization latency', service: 'Payments API', team: 'Payments', severity: 'Critical', status: 'Investigating', owner: 'Maya Ortiz', updatedAt: '2026-08-26T09:48:00Z' },
  { id: 'INC-0002', title: 'Checkout webhook retries', service: 'Payments Events', team: 'Payments', severity: 'Critical', status: 'Monitoring', owner: 'Chen Wei', updatedAt: '2026-08-26T09:36:00Z' },
  { id: 'INC-0003', title: 'Settlement reconciliation delay', service: 'Payments Ledger', team: 'Payments', severity: 'Critical', status: 'Monitoring', owner: 'Alex Morgan', updatedAt: '2026-08-26T09:22:00Z' },
  { id: 'INC-0004', title: 'Refund queue backlog', service: 'Payments Refunds', team: 'Payments', severity: 'Critical', status: 'Investigating', owner: 'Nora Singh', updatedAt: '2026-08-26T09:05:00Z' },
  { id: 'INC-0005', title: 'Identity token validation', service: 'Auth Gateway', team: 'Identity', severity: 'Critical', status: 'Monitoring', owner: 'Sam Lee', updatedAt: '2026-08-26T08:57:00Z' },
  { id: 'INC-0006', title: 'Worker pool saturation', service: 'Runtime Platform', team: 'Platform', severity: 'High', status: 'Investigating', owner: 'Maya Ortiz', updatedAt: '2026-08-26T09:55:00Z' },
  { id: 'INC-0007', title: 'Search indexing lag', service: 'Discovery Index', team: 'Data', severity: 'High', status: 'Identified', owner: 'Drew Park', updatedAt: '2026-08-26T09:42:00Z' },
  { id: 'INC-0008', title: 'Cart reservation failures', service: 'Cart Service', team: 'Commerce', severity: 'High', status: 'Monitoring', owner: 'Chen Wei', updatedAt: '2026-08-26T09:17:00Z' },
  { id: 'INC-0009', title: 'Audit export timeout', service: 'Data Export', team: 'Data', severity: 'High', status: 'Monitoring', owner: 'Nora Singh', updatedAt: '2026-08-26T08:48:00Z' },
  { id: 'INC-0010', title: 'Mobile session expiry', service: 'Identity Session', team: 'Identity', severity: 'Medium', status: 'Investigating', owner: 'Sam Lee', updatedAt: '2026-08-26T09:51:00Z' },
  { id: 'INC-0011', title: 'Product feed freshness', service: 'Catalog Feed', team: 'Commerce', severity: 'Medium', status: 'Identified', owner: 'Drew Park', updatedAt: '2026-08-26T09:12:00Z' },
  { id: 'INC-0012', title: 'Log delivery delay', service: 'Observability', team: 'Platform', severity: 'Medium', status: 'Monitoring', owner: 'Alex Morgan', updatedAt: '2026-08-26T08:42:00Z' },
  { id: 'INC-0013', title: 'Profile sync conflict', service: 'Identity Profile', team: 'Identity', severity: 'Medium', status: 'Monitoring', owner: 'Maya Ortiz', updatedAt: '2026-08-26T08:31:00Z' },
  { id: 'INC-0014', title: 'Warehouse import warning', service: 'Data Pipeline', team: 'Data', severity: 'Low', status: 'Identified', owner: 'Chen Wei', updatedAt: '2026-08-26T09:01:00Z' },
  { id: 'INC-0015', title: 'Theme asset cache miss', service: 'Storefront', team: 'Commerce', severity: 'Low', status: 'Monitoring', owner: 'Nora Singh', updatedAt: '2026-08-26T08:18:00Z' },
  { id: 'INC-0016', title: 'Certificate rotation notice', service: 'Edge Platform', team: 'Platform', severity: 'Low', status: 'Monitoring', owner: 'Drew Park', updatedAt: '2026-08-26T07:58:00Z' },
  { id: 'INC-0017', title: 'Legacy settlement report', service: 'Finance Reports', team: 'Commerce', severity: 'High', status: 'Closed', owner: 'Sam Lee', updatedAt: '2026-08-26T10:01:00Z' },
  { id: 'INC-0018', title: 'Search incident cleanup', service: 'Discovery Index', team: 'Data', severity: 'Medium', status: 'Closed', owner: 'Alex Morgan', updatedAt: '2026-08-26T10:03:00Z' },
  { id: 'INC-0019', title: 'Account migration follow-up', service: 'Identity Profile', team: 'Identity', severity: 'Low', status: 'Closed', owner: 'Maya Ortiz', updatedAt: '2026-08-26T10:04:00Z' },
  { id: 'INC-0020', title: 'Cart cache recovery', service: 'Cart Service', team: 'Commerce', severity: 'Low', status: 'Closed', owner: 'Chen Wei', updatedAt: '2026-08-26T10:05:00Z' },
]
export const incidents: readonly Incident[] = raw.map((incident) => ({ ...incident, createdAt: '2026-08-26T07:00:00Z', summary: `${incident.title}. Operations team is investigating the impact.` }))
