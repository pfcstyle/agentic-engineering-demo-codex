import type { Criteria, Incident } from './types'

export const emptyCriteria = (): Criteria => ({ search: '', severity: [], status: [], team: [] })
const severityRank = { Critical: 0, High: 1, Medium: 2, Low: 3 }

export function sortIncidents(items: readonly Incident[]): Incident[] {
  return [...items].sort((a, b) => {
    const open = Number(a.status === 'Closed') - Number(b.status === 'Closed')
    if (open) return open
    const severity = severityRank[a.severity] - severityRank[b.severity]
    if (severity) return severity
    const updated = b.updatedAt.localeCompare(a.updatedAt)
    return updated || a.id.localeCompare(b.id)
  })
}

export function filterIncidents(items: readonly Incident[], criteria: Criteria): Incident[] {
  const needle = criteria.search.trim().toLowerCase()
  return sortIncidents(items).filter((incident) => {
    const fields = [incident.id, incident.title, incident.service, incident.team, incident.owner].join(' ').toLowerCase()
    return (!needle || fields.includes(needle))
      && (!criteria.severity.length || criteria.severity.includes(incident.severity))
      && (!criteria.status.length || criteria.status.includes(incident.status))
      && (!criteria.team.length || criteria.team.includes(incident.team))
  })
}
