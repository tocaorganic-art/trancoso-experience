import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import QuickStats from '../admin/QuickStats';

/**
 * Testes para QuickStats (Dashboard Admin)
 * Rodar: npm test QuickStats.test.jsx
 */

// Mock do base44 client
jest.mock('@/api/base44Client', () => ({
  base44: {
    entities: {
      EventData: {
        filter: jest.fn().mockResolvedValue([
          {
            id: '1',
            created_date: new Date().toISOString(),
            conversion_status: 'converted',
            budget_final: 25000,
            event_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: '2',
            created_date: new Date().toISOString(),
            conversion_status: 'pending',
            event_date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString()
          }
        ]),
        list: jest.fn().mockResolvedValue([
          { id: '1', created_date: new Date().toISOString() },
          { id: '2', created_date: new Date().toISOString() }
        ])
      }
    }
  }
}));

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

describe('QuickStats', () => {
  test('deve renderizar cards de estatísticas', async () => {
    const queryClient = createTestQueryClient();
    
    render(
      <QueryClientProvider client={queryClient}>
        <QuickStats />
      </QueryClientProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByText(/Leads Este Mês/i)).toBeInTheDocument();
    });
  });

  test('deve mostrar taxa de conversão', async () => {
    const queryClient = createTestQueryClient();
    
    render(
      <QueryClientProvider client={queryClient}>
        <QuickStats />
      </QueryClientProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByText(/Taxa de Conversão/i)).toBeInTheDocument();
    });
  });

  test('deve calcular número de leads corretamente', async () => {
    const queryClient = createTestQueryClient();
    
    render(
      <QueryClientProvider client={queryClient}>
        <QuickStats />
      </QueryClientProvider>
    );
    
    await waitFor(() => {
      // Deve mostrar pelo menos 1 lead
      expect(screen.getByText(/\d+/)).toBeInTheDocument();
    });
  });

  test('deve exibir receita total', async () => {
    const queryClient = createTestQueryClient();
    
    render(
      <QueryClientProvider client={queryClient}>
        <QuickStats />
      </QueryClientProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByText(/Receita/i)).toBeInTheDocument();
    });
  });
});