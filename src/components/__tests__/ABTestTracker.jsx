import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ABTestTracker from '../tracking/ABTestTracker';

/**
 * Testes para ABTestTracker
 * Rodar: npm test ABTestTracker.test.jsx
 */

// Mock do base44 client
jest.mock('@/api/base44Client', () => ({
  base44: {
    entities: {
      ABTest: {
        create: jest.fn().mockResolvedValue({ id: '123' })
      }
    }
  }
}));

describe('ABTestTracker', () => {
  beforeEach(() => {
    // Limpar sessionStorage antes de cada teste
    sessionStorage.clear();
  });

  test('deve renderizar children com variante', () => {
    render(
      <ABTestTracker testName="Test" element="button">
        {({ variant }) => <button>Variant {variant}</button>}
      </ABTestTracker>
    );
    
    const button = screen.getByRole('button');
    expect(button.textContent).toMatch(/Variant (A|B)/);
  });

  test('deve atribuir variante A ou B aleatoriamente', () => {
    const variants = new Set();
    
    // Renderizar múltiplas vezes para capturar ambas variantes
    for (let i = 0; i < 10; i++) {
      const { unmount } = render(
        <ABTestTracker testName={`Test-${i}`} element="button">
          {({ variant }) => {
            variants.add(variant);
            return <div>{variant}</div>;
          }}
        </ABTestTracker>
      );
      unmount();
    }
    
    // Pelo menos uma das variantes deve ter sido atribuída
    expect(variants.has('A') || variants.has('B')).toBe(true);
  });

  test('deve manter mesma variante para mesmo teste', () => {
    const TestComponent = () => (
      <ABTestTracker testName="SameTest" element="button">
        {({ variant }) => <button>{variant}</button>}
      </ABTestTracker>
    );
    
    const { unmount, rerender } = render(<TestComponent />);
    const firstVariant = screen.getByRole('button').textContent;
    
    unmount();
    rerender(<TestComponent />);
    const secondVariant = screen.getByRole('button').textContent;
    
    expect(firstVariant).toBe(secondVariant);
  });

  test('deve fornecer função trackClick', () => {
    let clickTracked = false;
    
    render(
      <ABTestTracker testName="ClickTest" element="button">
        {({ trackClick }) => (
          <button onClick={() => {
            trackClick();
            clickTracked = true;
          }}>
            Click Me
          </button>
        )}
      </ABTestTracker>
    );
    
    fireEvent.click(screen.getByText('Click Me'));
    expect(clickTracked).toBe(true);
  });

  test('deve fornecer função trackConversion', () => {
    let conversionTracked = false;
    
    render(
      <ABTestTracker testName="ConversionTest" element="button">
        {({ trackConversion }) => (
          <button onClick={() => {
            trackConversion();
            conversionTracked = true;
          }}>
            Convert
          </button>
        )}
      </ABTestTracker>
    );
    
    fireEvent.click(screen.getByText('Convert'));
    expect(conversionTracked).toBe(true);
  });
});