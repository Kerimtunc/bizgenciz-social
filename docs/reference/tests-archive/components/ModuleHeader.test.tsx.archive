import { render, screen } from '@testing-library/react'
import ModuleHeader from '../../components/common/ModuleHeader'

describe('ModuleHeader', () => {
  const defaultProps = {
    title: 'Test Module',
    subtitle: 'Test module description',
    icon: '🍽️'
  }

  it('renders the title', () => {
    const { container } = render(<ModuleHeader {...defaultProps} />)
    
    // Container'da title metni var mı kontrol et
    expect(container.textContent).toContain('Test Module')
  })

  it('renders the subtitle when provided', () => {
    render(<ModuleHeader {...defaultProps} />)
    
    const subtitle = screen.getByText('Test module description')
    expect(subtitle).toBeInTheDocument()
  })

  it('renders the icon when provided', () => {
    const { container } = render(<ModuleHeader {...defaultProps} />)
    
    // Container'da hem title hem icon var mı kontrol et
    expect(container.textContent).toContain('Test Module')
    expect(container.textContent).toContain('🍽️')
  })

  it('does not render subtitle when not provided', () => {
    render(<ModuleHeader title="Test Module" icon="🍽️" />)
    
    const subtitle = screen.queryByText('Test module description')
    expect(subtitle).not.toBeInTheDocument()
  })

  it('renders children when provided', () => {
    render(
      <ModuleHeader {...defaultProps}>
        <button>Test Button</button>
      </ModuleHeader>
    )
    
    const button = screen.getByRole('button', { name: 'Test Button' })
    expect(button).toBeInTheDocument()
  })

  it('renders without icon when not provided', () => {
    const { container } = render(<ModuleHeader title="Test Module" subtitle="Test description" />)
    
    // Container'da title var ama icon yok
    expect(container.textContent).toContain('Test Module')
    expect(container.textContent).not.toContain('🍽️')
  })
}) 