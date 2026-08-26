import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, it } from 'vitest'
import App from './App'
afterEach(cleanup)

it('preserves a failed owner proposal and commits it only after retry succeeds', async () => {
  const user = userEvent.setup(); render(<App />)
  await user.click(screen.getAllByRole('button', { name: /open incident inc-0003/i })[0])
  await user.selectOptions(screen.getAllByLabelText('Owner')[0], 'Chen Wei')
  await user.selectOptions(screen.getByLabelText('Save outcome'), 'failure')
  await user.click(screen.getAllByRole('button', { name: 'Save owner change' })[0])
  await waitFor(() => expect(screen.getAllByRole('alert')[0].textContent).toContain('Alex Morgan'))
  expect((screen.getAllByLabelText('Owner')[0] as HTMLSelectElement).value).toBe('Chen Wei')
  await user.selectOptions(screen.getByLabelText('Save outcome'), 'success')
  await user.click(screen.getAllByRole('button', { name: 'Retry owner change' })[0])
  await waitFor(() => expect(screen.getAllByText(/saved for this browser session/i).length).toBeGreaterThan(0))
})

it('explains analyst and closed read-only ownership then restores row focus on close', async () => {
  const user = userEvent.setup(); render(<App />)
  await user.selectOptions(screen.getByLabelText('Active role'), 'analyst')
  const row = screen.getAllByRole('button', { name: /open incident inc-0001/i })[0]; await user.click(row)
  expect(screen.getAllByText(/analysts can review/i).length).toBeGreaterThan(0); expect(screen.queryByLabelText('Owner')).toBeNull()
  await user.click(screen.getAllByRole('button', { name: 'Close incident details' })[0]); await waitFor(() => expect(document.activeElement).toBe(row))
  await user.click(screen.getAllByRole('button', { name: /open incident inc-0017/i })[0])
  expect(screen.getAllByText(/closed incidents are read-only/i).length).toBeGreaterThan(0)
})

it('shows each active criterion as an individually removable chip', async () => {
  const user = userEvent.setup(); render(<App />)
  await user.type(screen.getByLabelText('Search incidents'), 'payments')
  await user.click(screen.getByRole('button', { name: /severity/i })); await user.click(screen.getByLabelText('Critical'))
  await user.click(screen.getByRole('button', { name: /status/i })); await user.click(screen.getByLabelText('Monitoring'))
  await user.click(screen.getByRole('button', { name: /team/i })); await user.click(screen.getByLabelText('Payments'))
  expect(screen.getByRole('button', { name: /search: payments.*clear/i })).toBeTruthy()
  expect(screen.getByRole('button', { name: /critical.*clear/i })).toBeTruthy()
  expect(screen.getByRole('button', { name: /monitoring.*clear/i })).toBeTruthy()
  expect(screen.getAllByRole('button', { name: /payments.*clear/i }).length).toBe(2)
  await user.click(screen.getByRole('button', { name: /critical.*clear/i }))
  expect(screen.queryByRole('button', { name: /critical.*clear/i })).toBeNull()
  expect(screen.getByRole('button', { name: /monitoring.*clear/i })).toBeTruthy()
})

it('closes desktop filter menus on outside click and Escape, returning focus to the trigger', async () => {
  const user = userEvent.setup(); render(<App />)
  const severity = screen.getByRole('button', { name: /severity/i })
  await user.click(severity)
  expect(severity.getAttribute('aria-expanded')).toBe('true')
  fireEvent.mouseDown(document.body)
  await waitFor(() => expect(severity.getAttribute('aria-expanded')).toBe('false'))
  expect(document.activeElement).toBe(severity)

  await user.click(severity)
  await user.keyboard('{Escape}')
  await waitFor(() => expect(severity.getAttribute('aria-expanded')).toBe('false'))
  expect(document.activeElement).toBe(severity)
})

it('closes the mobile filter dialog on Escape and restores its trigger focus', async () => {
  const user = userEvent.setup(); render(<App />)
  const filters = screen.getByRole('button', { name: 'Filters' })
  await user.click(filters)
  expect(screen.getByRole('dialog', { name: 'Filter incidents' })).toBeTruthy()
  await user.keyboard('{Escape}')
  await waitFor(() => expect(screen.queryByRole('dialog', { name: 'Filter incidents' })).toBeNull())
  expect(document.activeElement).toBe(filters)
})
