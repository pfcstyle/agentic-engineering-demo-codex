import { useMemo, useState } from 'react'
import { incidents, severities, sortIncidents, statuses, teams } from './incidents'
import type { Incident, IncidentStatus, Severity, Team } from './incidents'

type Source = 'normal' | 'empty'
type Filters = { severity: Severity[]; status: IncidentStatus[]; team: Team[] }
type FilterKey = keyof Filters

const emptyFilters: Filters = { severity: [], status: [], team: [] }
const severitySymbols: Record<Severity, string> = { Critical: '◆', High: '▲', Medium: '●', Low: '◇' }
const statusSymbols: Record<IncidentStatus, string> = { Investigating: '◉', Identified: '◎', Monitoring: '↗', Closed: '✓' }

function matchesSearch(incident: Incident, query: string) {
  const normalized = query.trim().toLocaleLowerCase()
  if (!normalized) return true
  return [incident.id, incident.title, incident.service, incident.team, incident.owner ?? 'Unassigned']
    .some((value) => value.toLocaleLowerCase().includes(normalized))
}

function matchesFilters(incident: Incident, filters: Filters) {
  return (
    (filters.severity.length === 0 || filters.severity.includes(incident.severity)) &&
    (filters.status.length === 0 || filters.status.includes(incident.status)) &&
    (filters.team.length === 0 || filters.team.includes(incident.team))
  )
}

function formatUpdate(value: string) {
  return new Intl.DateTimeFormat('en', {
    month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZone: 'UTC', timeZoneName: 'short',
  }).format(new Date(value))
}

interface FilterGroupProps<T extends string> {
  label: string
  values: readonly T[]
  selected: readonly T[]
  onToggle: (value: T) => void
}

function FilterGroup<T extends string>({ label, values, selected, onToggle }: FilterGroupProps<T>) {
  return (
    <fieldset className="filter-group">
      <legend>{label}</legend>
      <div className="filter-options">
        {values.map((value) => (
          <label className="check-option" key={value}>
            <input type="checkbox" checked={selected.includes(value)} onChange={() => onToggle(value)} />
            <span>{value}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

function App() {
  const [source, setSource] = useState<Source>('normal')
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<Filters>(emptyFilters)

  const visibleIncidents = useMemo(
    () => {
      const sourceIncidents = source === 'normal' ? incidents : []
      return sortIncidents(sourceIncidents.filter((incident) => matchesSearch(incident, query) && matchesFilters(incident, filters)))
    },
    [source, query, filters],
  )
  const hasCriteria = query.trim().length > 0 || Object.values(filters).some((values) => values.length > 0)

  function toggleFilter<K extends FilterKey>(group: K, value: Filters[K][number]) {
    setFilters((current) => {
      const selected = current[group] as Array<Filters[K][number]>
      return { ...current, [group]: selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value] }
    })
  }

  function clearCriterion(group: FilterKey, value: string) {
    setFilters((current) => ({ ...current, [group]: current[group].filter((item) => item !== value) }))
  }

  function clearAll() {
    setQuery('')
    setFilters(emptyFilters)
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Operations workspace</p>
          <h1>Incident triage</h1>
        </div>
        <div className="role-indicator" aria-label="Active role: Incident Lead">
          <span aria-hidden="true">●</span> Incident Lead
        </div>
      </header>

      <main>
        <section className="controls" aria-labelledby="queue-controls-title">
          <div className="controls-heading">
            <div>
              <p className="eyebrow">Live queue</p>
              <h2 id="queue-controls-title">Find incidents</h2>
            </div>
            <label className="source-control">
              <span>Demo data source</span>
              <select value={source} onChange={(event) => setSource(event.target.value as Source)}>
                <option value="normal">Normal — 20 incidents</option>
                <option value="empty">Empty — no source incidents</option>
              </select>
            </label>
          </div>

          <label className="search-control">
            <span>Search incidents</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="ID, title, service, team, or owner"
            />
          </label>

          <div className="filters">
            <FilterGroup label="Severity" values={severities} selected={filters.severity} onToggle={(value) => toggleFilter('severity', value)} />
            <FilterGroup label="Status" values={statuses} selected={filters.status} onToggle={(value) => toggleFilter('status', value)} />
            <FilterGroup label="Team" values={teams} selected={filters.team} onToggle={(value) => toggleFilter('team', value)} />
          </div>

          {hasCriteria && (
            <div className="criteria" aria-label="Active criteria">
              <span className="criteria-label">Active</span>
              {query.trim() && (
                <button className="criterion-chip" type="button" onClick={() => setQuery('')} aria-label={`Clear search: ${query.trim()}`}>
                  Search: {query.trim()} <span aria-hidden="true">×</span>
                </button>
              )}
              {(Object.entries(filters) as [FilterKey, string[]][]).flatMap(([group, values]) => values.map((value) => (
                <button className="criterion-chip" type="button" key={`${group}-${value}`} onClick={() => clearCriterion(group, value)} aria-label={`Clear ${group}: ${value}`}>
                  {value} <span aria-hidden="true">×</span>
                </button>
              )))}
              <button className="clear-all" type="button" onClick={clearAll}>Clear all</button>
            </div>
          )}
        </section>

        <section className="queue" aria-labelledby="queue-title">
          <div className="queue-heading">
            <h2 id="queue-title">Incident queue</h2>
            <p className="result-count" role="status" aria-live="polite" aria-atomic="true">
              {visibleIncidents.length} {visibleIncidents.length === 1 ? 'incident' : 'incidents'}
            </p>
          </div>

          {source === 'empty' ? (
            <div className="empty-state" data-state="empty-source">
              <span className="state-icon" aria-hidden="true">□</span>
              <h3>No source incidents</h3>
              <p>The selected data source contains no incidents. Choose the Normal demo source to restore the deterministic queue.</p>
            </div>
          ) : visibleIncidents.length === 0 ? (
            <div className="empty-state" data-state="no-results">
              <span className="state-icon" aria-hidden="true">⌕</span>
              <h3>No matching incidents</h3>
              <p>No incidents match the active search and filters. Remove a criterion or clear all to broaden the queue.</p>
              <button type="button" onClick={clearAll}>Clear all criteria</button>
            </div>
          ) : (
            <div className="table-scroll">
              <table>
                <caption className="sr-only">Incident queue ordered by open status, severity, and most recent update</caption>
                <thead>
                  <tr><th scope="col">Incident</th><th scope="col">Service</th><th scope="col">Severity</th><th scope="col">Status</th><th scope="col">Owner</th><th scope="col">Last update</th></tr>
                </thead>
                <tbody>
                  {visibleIncidents.map((incident) => (
                    <tr key={incident.id}>
                      <th scope="row"><span className="incident-id">{incident.id}</span><span className="incident-title">{incident.title}</span></th>
                      <td><span>{incident.service}</span><small>{incident.team}</small></td>
                      <td><span className={`badge severity-${incident.severity.toLowerCase()}`}><span aria-hidden="true">{severitySymbols[incident.severity]}</span> {incident.severity}</span></td>
                      <td><span className="status"><span aria-hidden="true">{statusSymbols[incident.status]}</span> {incident.status}</span></td>
                      <td>{incident.owner ?? 'Unassigned'}</td>
                      <td><time dateTime={incident.updatedAt}>{formatUpdate(incident.updatedAt)}</time></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
