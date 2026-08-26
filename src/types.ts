export const severities = ['Critical', 'High', 'Medium', 'Low'] as const
export const statuses = ['Identified', 'Investigating', 'Monitoring', 'Closed'] as const
export const teams = ['Payments', 'Platform', 'Identity', 'Data', 'Commerce'] as const

export type Severity = (typeof severities)[number]
export type Status = (typeof statuses)[number]
export type Team = (typeof teams)[number]
export type Incident = { id: string; title: string; summary: string; service: string; team: Team; severity: Severity; status: Status; owner?: string; createdAt: string; updatedAt: string }
export type Criteria = { search: string; severity: Severity[]; status: Status[]; team: Team[] }
