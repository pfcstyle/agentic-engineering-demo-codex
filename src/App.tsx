import { useCallback, useMemo, useState } from 'react'
import { incidents } from './data'
import { emptyCriteria, filterIncidents } from './helpers'
import { severities, statuses, teams, type Criteria, type Incident, type Severity } from './types'
import './styles.css'

type SourceMode = 'normal' | 'empty'
const toggle = <T,>(list: T[], value: T) => list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
const label = (value: string) => value === 'Closed' ? '✓ Closed' : value === 'New' ? '• New' : value === 'Identified' ? '⌕ Identified' : value === 'Investigating' ? '◌ Investigating' : value === 'Mitigated' ? '✓ Mitigated' : value
const severityLabel = (value: Severity) => `${value === 'Critical' ? '!' : value === 'High' ? '▲' : value === 'Medium' ? '◆' : '○'} ${value}`

function FilterGroup<T extends string>({ name, choices, selected, onChange }: { name: string; choices: readonly T[]; selected: T[]; onChange: (next: T[]) => void }) {
  return <fieldset className="filter-group"><legend>{name}</legend><div className="filter-options">{choices.map((choice) => <label key={choice}><input type="checkbox" checked={selected.includes(choice)} onChange={() => onChange(toggle(selected, choice))} /> {choice}</label>)}</div></fieldset>
}

function CriteriaChips({ criteria, clear }: { criteria: Criteria; clear: (group: keyof Criteria, value?: string) => void }) {
  const chips = [criteria.search && ['search', criteria.search], ...criteria.severity.map((x) => ['severity', x]), ...criteria.status.map((x) => ['status', x]), ...criteria.team.map((x) => ['team', x])] as [keyof Criteria, string][]
  if (!chips.length) return null
  return <div className="criteria" aria-label="Active criteria"><span>Active criteria:</span>{chips.map(([group, value]) => <button className="chip" key={`${group}-${value}`} onClick={() => clear(group, value)}>{group === 'search' ? `Search: ${value}` : value} <span aria-hidden="true">×</span><span className="sr-only">, clear</span></button>)}<button className="clear-all" onClick={() => clear('search')}>Clear all</button></div>
}

function QueueItem({ incident, onActivate }: { incident: Incident; onActivate: (incident: Incident, origin: HTMLButtonElement) => void }) {
  return <button className="queue-row" onClick={(event) => onActivate(incident, event.currentTarget)} aria-label={`Open incident ${incident.id}: ${incident.title}`}><span className="id">{incident.id}</span><span className="title"><strong>{incident.title}</strong><small>{incident.team}</small></span><span>{incident.service}</span><span className={`severity severity-${incident.severity.toLowerCase()}`}>{severityLabel(incident.severity)}</span><span className="status">{label(incident.status)}</span><span className="owner">{incident.owner}</span><time dateTime={incident.updatedAt}>{new Intl.DateTimeFormat('en', { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }).format(new Date(incident.updatedAt))}</time></button>
}

export type IncidentActivationHandler = (incident: Incident, origin: HTMLButtonElement) => void

export default function App({ onIncidentActivate }: { onIncidentActivate?: IncidentActivationHandler }) {
  const [criteria, setCriteria] = useState<Criteria>(emptyCriteria)
  const [source, setSource] = useState<SourceMode>('normal')
  const visible = useMemo(() => source === 'normal' ? filterIncidents(incidents, criteria) : [], [criteria, source])
  const update = <K extends keyof Criteria>(key: K, value: Criteria[K]) => setCriteria((current) => ({ ...current, [key]: value }))
  const clear = (group: keyof Criteria, value?: string) => {
    if (!value) return setCriteria(emptyCriteria())
    if (group === 'search') return update('search', '')
    if (group === 'severity') return update('severity', criteria.severity.filter((item) => item !== value))
    if (group === 'status') return update('status', criteria.status.filter((item) => item !== value))
    return update('team', criteria.team.filter((item) => item !== value))
  }
  const activate = useCallback<IncidentActivationHandler>((incident, origin) => onIncidentActivate?.(incident, origin), [onIncidentActivate])
  return <main>
    <header><div><p className="eyebrow">OPERATIONS / ACTIVE QUEUE</p><h1>Incident triage</h1></div><label className="source-control">Queue source<select value={source} onChange={(event) => setSource(event.target.value as SourceMode)}><option value="normal">Normal source</option><option value="empty">Empty source</option></select></label></header>
    <section className="controls" aria-label="Queue controls"><label className="search"><span>Search incidents</span><input value={criteria.search} onChange={(event) => update('search', event.target.value)} placeholder="ID, title, service, team, or owner" /></label><div className="filters"><FilterGroup name="Severity" choices={severities} selected={criteria.severity} onChange={(next) => update('severity', next)} /><FilterGroup name="Status" choices={statuses} selected={criteria.status} onChange={(next) => update('status', next)} /><FilterGroup name="Team" choices={teams} selected={criteria.team} onChange={(next) => update('team', next)} /></div><CriteriaChips criteria={criteria} clear={clear} /></section>
    <section className="queue" aria-labelledby="queue-heading"><div className="queue-heading"><div><p className="eyebrow">INCIDENT QUEUE</p><h2 id="queue-heading">Current work</h2></div><output aria-live="polite" aria-atomic="true">{source === 'empty' ? '0 incidents — empty source' : `${visible.length} of ${incidents.length} incidents`}</output></div>
      {source === 'empty' ? <div className="state" role="status"><h3>Empty source</h3><p>No source incidents are available. Choose Normal source to restore the deterministic queue.</p></div> : visible.length === 0 ? <div className="state" role="status"><h3>No results</h3><p>No incidents match the active criteria. Clear a criterion to broaden the queue.</p><button onClick={() => setCriteria(emptyCriteria())}>Clear all criteria</button></div> : <><div className="table-head" aria-hidden="true"><span>Incident</span><span>Service</span><span>Severity</span><span>Status</span><span>Owner</span><span>Updated</span></div><div className="rows">{visible.map((incident) => <QueueItem key={incident.id} incident={incident} onActivate={activate} />)}</div></>}</section>
  </main>
}
