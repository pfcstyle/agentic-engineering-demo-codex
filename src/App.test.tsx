import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

function rows() {
  return screen.getAllByRole('row').slice(1)
}

describe('incident queue', () => {
  it('renders the deterministic 20-item operational order and required fields', () => {
    render(<App />)
    expect(screen.getByRole('status')).toHaveTextContent('20 incidents')
    expect(rows()).toHaveLength(20)
    expect(rows().map((row) => within(row).getByText(/INC-/).textContent)).toEqual([
      'INC-0001', 'INC-0003', 'INC-0006', 'INC-0009', 'INC-0012',
      'INC-0002', 'INC-0005', 'INC-0011', 'INC-0015', 'INC-0018',
      'INC-0004', 'INC-0007', 'INC-0010', 'INC-0014', 'INC-0016',
      'INC-0008', 'INC-0013', 'INC-0017', 'INC-0019', 'INC-0020',
    ])
    expect(rows()[0]).toHaveTextContent('Checkout authorization failures')
    expect(rows()[0]).toHaveTextContent('Payments API')
    expect(rows()[0]).toHaveTextContent('Critical')
    expect(rows()[0]).toHaveTextContent('Investigating')
    expect(rows()[0]).toHaveTextContent('Amina Okafor')
  })

  it.each([
    ['incident ID', 'inc-0003', ['INC-0003']],
    ['title', 'SETTLEMENT', ['INC-0003']],
    ['service', 'ledger', ['INC-0003']],
    ['team', 'payments', ['INC-0001', 'INC-0003', 'INC-0012', 'INC-0007']],
    ['owner', 'PRIYA SHAH', ['INC-0003', 'INC-0012']],
  ])('searches case-insensitively by %s', async (_field, query, expectedIds) => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByRole('searchbox', { name: 'Search incidents' }), query)
    expect(rows().map((row) => within(row).getByText(/INC-/).textContent)).toEqual(expectedIds)
    expect(screen.getByRole('status')).toHaveTextContent(`${expectedIds.length} ${expectedIds.length === 1 ? 'incident' : 'incidents'}`)
  })

  it('combines selections within a group using OR and groups using AND', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('checkbox', { name: 'Critical' }))
    expect(screen.getByRole('status')).toHaveTextContent('5 incidents')
    await user.click(screen.getByRole('checkbox', { name: 'High' }))
    expect(screen.getByRole('status')).toHaveTextContent('10 incidents')
    await user.click(screen.getByRole('checkbox', { name: 'Investigating' }))
    expect(screen.getByRole('status')).toHaveTextContent('5 incidents')
    await user.click(screen.getByRole('checkbox', { name: 'Payments' }))
    expect(screen.getByRole('status')).toHaveTextContent('2 incidents')
    for (const row of rows()) {
      expect(row).toHaveTextContent(/Critical|High/)
      expect(row).toHaveTextContent('Investigating')
      expect(row).toHaveTextContent('Payments')
    }
  })

  it('keeps criteria visible, clears one criterion, then restores defaults with Clear all', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByRole('searchbox', { name: 'Search incidents' }), 'payments')
    await user.click(screen.getByRole('checkbox', { name: 'Critical' }))
    const criteria = screen.getByLabelText('Active criteria')
    expect(within(criteria).getByRole('button', { name: 'Clear search: payments' })).toBeVisible()
    expect(within(criteria).getByRole('button', { name: 'Clear severity: Critical' })).toBeVisible()
    await user.click(within(criteria).getByRole('button', { name: 'Clear severity: Critical' }))
    expect(screen.getByRole('checkbox', { name: 'Critical' })).not.toBeChecked()
    expect(screen.getByRole('searchbox')).toHaveValue('payments')
    expect(screen.getByRole('status')).toHaveTextContent('4 incidents')
    await user.click(screen.getByRole('button', { name: 'Clear all' }))
    expect(screen.getByRole('searchbox')).toHaveValue('')
    expect(screen.getByRole('status')).toHaveTextContent('20 incidents')
    expect(rows()[0]).toHaveTextContent('INC-0001')
  })

  it('distinguishes No Results from Empty Source and preserves controls', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('checkbox', { name: 'Critical' }))
    await user.click(screen.getByRole('checkbox', { name: 'Identified' }))
    expect(screen.getByText('No matching incidents')).toBeVisible()
    expect(screen.getByText('No matching incidents').closest('[data-state]')).toHaveAttribute('data-state', 'no-results')
    expect(screen.getByRole('searchbox')).toBeVisible()
    expect(screen.getByLabelText('Active criteria')).toBeVisible()
    await user.selectOptions(screen.getByRole('combobox', { name: 'Demo data source' }), 'empty')
    expect(screen.getByText('No source incidents')).toBeVisible()
    expect(screen.getByText('No source incidents').closest('[data-state]')).toHaveAttribute('data-state', 'empty-source')
    expect(screen.queryByText('No matching incidents')).not.toBeInTheDocument()
  })

  it('supports keyboard operation and retains focus after live result updates', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.tab()
    expect(screen.getByRole('combobox', { name: 'Demo data source' })).toHaveFocus()
    await user.tab()
    const search = screen.getByRole('searchbox', { name: 'Search incidents' })
    expect(search).toHaveFocus()
    await user.keyboard('identity')
    expect(search).toHaveFocus()
    expect(screen.getByRole('status')).toHaveTextContent('4 incidents')
    await user.tab()
    expect(screen.getByRole('checkbox', { name: 'Critical' })).toHaveFocus()
    await user.keyboard(' ')
    expect(screen.getByRole('checkbox', { name: 'Critical' })).toBeChecked()
  })
})
