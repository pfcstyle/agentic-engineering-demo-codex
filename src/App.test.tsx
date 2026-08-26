import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, it } from 'vitest'
import App from './App'
afterEach(cleanup)

it('preserves a failed owner proposal and commits it only after retry succeeds', async () => {
  const user = userEvent.setup(); render(<App />)
  await user.click(screen.getByRole('button', { name: /open incident inc-0003/i }))
  await user.selectOptions(screen.getByLabelText('Owner'), 'Chen Wei')
  await user.selectOptions(screen.getByLabelText('Save outcome'), 'failure')
  await user.click(screen.getByRole('button', { name: 'Save owner change' }))
  expect((await screen.findByRole('alert')).textContent).toContain('Alex Morgan')
  expect((screen.getByLabelText('Owner') as HTMLSelectElement).value).toBe('Chen Wei')
  await user.selectOptions(screen.getByLabelText('Save outcome'), 'success')
  await user.click(screen.getByRole('button', { name: 'Retry owner change' }))
  expect(await screen.findByText(/saved for this browser session/i)).toBeTruthy()
})

it('explains analyst and closed read-only ownership then restores row focus on close', async () => {
  const user = userEvent.setup(); render(<App />)
  await user.selectOptions(screen.getByLabelText('Active role'), 'analyst')
  const row = screen.getByRole('button', { name: /open incident inc-0001/i }); await user.click(row)
  expect(screen.getByText(/analysts can review/i)).toBeTruthy(); expect(screen.queryByLabelText('Owner')).toBeNull()
  await user.click(screen.getByRole('button', { name: 'Close incident details' })); await waitFor(() => expect(document.activeElement).toBe(row))
  await user.click(screen.getByRole('button', { name: /open incident inc-0017/i }))
  expect(screen.getByText(/closed incidents are read-only/i)).toBeTruthy()
})

it('shows each active criterion as an individually removable chip', async () => {
  const user = userEvent.setup(); render(<App />)
  await user.type(screen.getByLabelText('Search incidents'), 'payments')
  await user.click(screen.getByLabelText('Critical')); await user.click(screen.getByLabelText('Monitoring')); await user.click(screen.getByLabelText('Payments'))
  expect(screen.getByRole('button', { name: /search: payments.*clear/i })).toBeTruthy()
  expect(screen.getByRole('button', { name: /critical.*clear/i })).toBeTruthy()
  expect(screen.getByRole('button', { name: /monitoring.*clear/i })).toBeTruthy()
  expect(screen.getAllByRole('button', { name: /payments.*clear/i }).length).toBe(2)
  await user.click(screen.getByRole('button', { name: /critical.*clear/i }))
  expect(screen.queryByRole('button', { name: /critical.*clear/i })).toBeNull()
  expect(screen.getByRole('button', { name: /monitoring.*clear/i })).toBeTruthy()
})
