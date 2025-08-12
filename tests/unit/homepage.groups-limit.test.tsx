import { render, screen } from '@testing-library/react'
import HomePage from '../../app/page'

// jsdom localStorage mock
beforeEach(() => {
  const store: Record<string, string> = {}
  const localStorageMock = {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = String(value)
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      Object.keys(store).forEach((k) => delete store[k])
    },
  }
  Object.defineProperty(window, 'localStorage', { value: localStorageMock })
})

describe('HomePage group limit banner', () => {
  it('shows limit banner when joinedCount >= 3', async () => {
    window.localStorage.setItem('maku_joined_groups_count', '3')

    render(<HomePage />)

    expect(await screen.findByText(/3'ten fazla gruba katıldınız|3 7en fazla gruba katıldınız/i)).toBeInTheDocument()
  })

  it('renders tabs for Popüler Gruplar and Kampüs Rehberleri', () => {
    render(<HomePage />)

    expect(screen.getByText(/Popüler Gruplar/i)).toBeInTheDocument()
    expect(screen.getByText(/Kampüs Rehberleri/i)).toBeInTheDocument()
  })
})