import { describe, expect, it } from 'vitest'
import { incidents } from './data'
import { emptyCriteria, filterIncidents, sortIncidents } from './helpers'

describe('incident queue helpers', () => {
  it('ships the deterministic 20-incident fixture and proof queries', () => {
    expect(incidents).toHaveLength(20)
    expect(filterIncidents(incidents, { ...emptyCriteria(), search: 'payments' })).toHaveLength(4)
    expect(filterIncidents(incidents, { ...emptyCriteria(), severity: ['Critical'] })).toHaveLength(5)
    expect(filterIncidents(incidents, { ...emptyCriteria(), severity: ['Critical'], status: ['Identified'] })).toEqual([])
  })

  it('searches all approved fields without case sensitivity', () => {
    for (const query of ['inc-0001', 'authorization latency', 'payments api', 'payments', 'maya ortiz']) {
      expect(filterIncidents(incidents, { ...emptyCriteria(), search: query })).not.toEqual([])
    }
    expect(filterIncidents(incidents, { ...emptyCriteria(), search: 'MAYA ORTIZ' }).map((item) => item.id))
      .toEqual(filterIncidents(incidents, { ...emptyCriteria(), search: 'maya ortiz' }).map((item) => item.id))
  })

  it('uses OR within a filter group and AND between groups', () => {
    const result = filterIncidents(incidents, { search: 'payments', severity: ['Critical', 'High'], status: ['Monitoring'], team: ['Payments'] })
    expect(result.map((item) => item.id)).toEqual(['INC-0002', 'INC-0003'])
  })

  it('sorts open work before closed, then severity, updated time, and incident id', () => {
    const sorted = sortIncidents(incidents)
    expect(sorted.slice(0, 5).map((item) => item.id)).toEqual(['INC-0001', 'INC-0002', 'INC-0003', 'INC-0004', 'INC-0005'])
    expect(sorted.slice(-4).every((item) => item.status === 'Closed')).toBe(true)
  })
})
