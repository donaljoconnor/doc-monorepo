import { render, screen, act, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FeedbackButton } from './FeedbackButton'

describe('FeedbackButton', () => {
  it('renders the feedback button', () => {
    render(<FeedbackButton />)
    expect(screen.getByRole('button', { name: /give feedback/i })).toBeInTheDocument()
  })

  it('opens the dialog when clicked', async () => {
    const user = userEvent.setup()
    render(<FeedbackButton />)
    await user.click(screen.getByRole('button', { name: /give feedback/i }))
    expect(screen.getByRole('dialog', { name: /feedback/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
  })

  it('closes the dialog when the close button is clicked', async () => {
    const user = userEvent.setup()
    render(<FeedbackButton />)
    await user.click(screen.getByRole('button', { name: /give feedback/i }))
    await user.click(screen.getByRole('button', { name: /close feedback/i }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('disables submit when textarea is empty', async () => {
    const user = userEvent.setup()
    render(<FeedbackButton />)
    await user.click(screen.getByRole('button', { name: /give feedback/i }))
    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled()
  })

  it('enables submit when textarea has text', async () => {
    const user = userEvent.setup()
    render(<FeedbackButton />)
    await user.click(screen.getByRole('button', { name: /give feedback/i }))
    await user.type(screen.getByRole('textbox', { name: /feedback text/i }), 'Great product!')
    expect(screen.getByRole('button', { name: /submit/i })).toBeEnabled()
  })

  it('shows confirmation message after submitting', async () => {
    const user = userEvent.setup()
    render(<FeedbackButton />)
    await user.click(screen.getByRole('button', { name: /give feedback/i }))
    await user.type(screen.getByRole('textbox', { name: /feedback text/i }), 'Looks good!')
    await user.click(screen.getByRole('button', { name: /submit/i }))
    expect(screen.getByText(/thanks for your feedback/i)).toBeInTheDocument()
  })

  it('closes dialog and resets after confirmation timeout', async () => {
    vi.useFakeTimers()
    render(<FeedbackButton />)
    act(() => { fireEvent.click(screen.getByRole('button', { name: /give feedback/i })) })
    act(() => { fireEvent.change(screen.getByRole('textbox', { name: /feedback text/i }), { target: { value: 'Nice!' } }) })
    act(() => { fireEvent.submit(screen.getByRole('button', { name: /submit/i }).closest('form')!) })
    expect(screen.getByText(/thanks for your feedback/i)).toBeInTheDocument()
    await act(async () => { vi.advanceTimersByTime(1500) })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    vi.useRealTimers()
  })
})
