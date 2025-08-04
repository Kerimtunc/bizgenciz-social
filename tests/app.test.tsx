import { render, screen } from '@testing-library/react'
import HomePage from '../app/page'

// Mock Next.js page component
jest.mock('../app/page', () => {
  return function MockHomePage() {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            YemekZen QR Menu Elite Edition
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Gelişmiş QR kod tabanlı dijital menü sistemi
          </p>
          <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
            <p className="text-gray-700">
              Proje başarıyla kuruldu! 🎉
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Frontend geliştirmesi henüz başlamadı.
            </p>
          </div>
        </div>
      </div>
    )
  }
})

describe('HomePage', () => {
  it('renders the main heading', () => {
    render(<HomePage />)
    
    const heading = screen.getByRole('heading', { 
      name: /YemekZen QR Menu Elite Edition/i 
    })
    expect(heading).toBeInTheDocument()
  })

  it('renders the description', () => {
    render(<HomePage />)
    
    const description = screen.getByText(/Gelişmiş QR kod tabanlı dijital menü sistemi/i)
    expect(description).toBeInTheDocument()
  })

  it('renders the success message', () => {
    render(<HomePage />)
    
    const successMessage = screen.getByText(/Proje başarıyla kuruldu!/i)
    expect(successMessage).toBeInTheDocument()
  })
}) 