import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModuleHeader from '@/components/common/ModuleHeader';

/**
 * 🧪 YemekZen Core Components Unit Tests
 * 
 * Bu test suite temel component'lerin doğru çalıştığını kontrol eder
 */

describe('ModuleHeader Component', () => {
  const defaultProps = {
    title: 'Test Module',
    subtitle: 'Test module description',
    icon: '🍽️'
  };

  test('✅ ModuleHeader doğru render ediliyor', () => {
    const { container } = render(<ModuleHeader {...defaultProps} />);
    
    // Container'da title ve subtitle var mı kontrol et
    expect(container.textContent).toContain('Test Module');
    expect(container.textContent).toContain('Test module description');
  });

  test('✅ ModuleHeader children ile çalışıyor', () => {
    render(
      <ModuleHeader {...defaultProps}>
        <button>Test Button</button>
      </ModuleHeader>
    );
    
    expect(screen.getByRole('button', { name: 'Test Button' })).toBeInTheDocument();
  });

  test('✅ ModuleHeader subtitle olmadan çalışıyor', () => {
    const { subtitle, ...propsWithoutSubtitle } = defaultProps;
    
    const { container } = render(<ModuleHeader {...propsWithoutSubtitle} />);
    
    // Container'da title var ama subtitle yok
    expect(container.textContent).toContain('Test Module');
    expect(container.textContent).not.toContain('Test module description');
  });

  test('✅ ModuleHeader icon olmadan çalışıyor', () => {
    const { icon, ...propsWithoutIcon } = defaultProps;
    
    const { container } = render(<ModuleHeader {...propsWithoutIcon} />);
    
    // Container'da title var ama icon yok
    expect(container.textContent).toContain('Test Module');
    expect(container.textContent).not.toContain('🍽️');
  });
}); 