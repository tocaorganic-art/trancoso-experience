import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FloatingChatWidget from '../chatbot/FloatingChatWidget';

/**
 * Testes para FloatingChatWidget
 * Rodar: npm test ChatWidget.test.jsx
 */

// Mock do base44 client
jest.mock('@/api/base44Client', () => ({
  base44: {
    integrations: {
      Core: {
        InvokeLLM: jest.fn().mockResolvedValue({
          data: 'Olá! Como posso ajudar você hoje?'
        })
      }
    }
  }
}));

describe('FloatingChatWidget', () => {
  test('deve renderizar botão do chatbot', () => {
    render(<FloatingChatWidget />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  test('deve abrir chat ao clicar no botão', () => {
    render(<FloatingChatWidget />);
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    
    expect(screen.getByText(/Como posso ajudar/i)).toBeInTheDocument();
  });

  test('deve fechar chat ao clicar novamente', () => {
    render(<FloatingChatWidget />);
    const button = screen.getByRole('button');
    
    // Abrir
    fireEvent.click(button);
    expect(screen.getByText(/Como posso ajudar/i)).toBeInTheDocument();
    
    // Fechar
    fireEvent.click(button);
    expect(screen.queryByText(/Como posso ajudar/i)).not.toBeInTheDocument();
  });

  test('deve exibir perguntas rápidas', () => {
    render(<FloatingChatWidget />);
    fireEvent.click(screen.getByRole('button'));
    
    expect(screen.getByText(/Quanto custa/i)).toBeInTheDocument();
    expect(screen.getByText(/Onde vocês atuam/i)).toBeInTheDocument();
  });

  test('deve responder FAQ sobre preço', () => {
    render(<FloatingChatWidget />);
    fireEvent.click(screen.getByRole('button'));
    
    const priceButton = screen.getByText(/Quanto custa/i);
    fireEvent.click(priceButton);
    
    expect(screen.getByText(/valores variam/i)).toBeInTheDocument();
  });

  test('deve permitir digitar mensagem', () => {
    render(<FloatingChatWidget />);
    fireEvent.click(screen.getByRole('button'));
    
    const input = screen.getByPlaceholderText(/Digite sua mensagem/i);
    fireEvent.change(input, { target: { value: 'Olá' } });
    
    expect(input.value).toBe('Olá');
  });

  test('deve limpar input após enviar mensagem', async () => {
    render(<FloatingChatWidget />);
    fireEvent.click(screen.getByRole('button'));
    
    const input = screen.getByPlaceholderText(/Digite sua mensagem/i);
    fireEvent.change(input, { target: { value: 'Teste' } });
    
    const form = input.closest('form');
    fireEvent.submit(form);
    
    await waitFor(() => {
      expect(input.value).toBe('');
    });
  });
});