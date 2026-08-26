import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'
import App from './App'

it('keeps labelled controls and announces search, no-results, and empty-source states', async () => {
  const user = userEvent.setup()
  render(<App />)
  const search = screen.getByLabelText('Search incidents')
  expect(search).toBeTruthy()
  expect(screen.getByText('20 of 20 incidents')).toBeTruthy()
  await user.type(search, 'payments')
  expect(screen.getByText('4 of 20 incidents')).toBeTruthy()
  expect(screen.getByRole('button', { name: /search: payments.*clear/i })).toBeTruthy()
  await user.type(search, 'zzz')
  expect(screen.getByText('No results')).toBeTruthy()
  await user.selectOptions(screen.getByLabelText('Queue source'), 'empty')
  expect(screen.getByRole('heading', { name: 'Empty source' })).toBeTruthy()
})

it('passes the activated incident and its invoking button to the integration callback', async () => {
  const user = userEvent.setup()
  const onIncidentActivate = vi.fn()
  render(<App onIncidentActivate={onIncidentActivate} />)
  await user.click(screen.getByRole('button', { name: /open incident inc-0001/i }))
  expect(onIncidentActivate).toHaveBeenCalledWith(expect.objectContaining({ id: 'INC-0001' }), expect.any(HTMLButtonElement))
})
