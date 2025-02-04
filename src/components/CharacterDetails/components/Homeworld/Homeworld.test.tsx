import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Homeworld from './Homeworld';
import useFetchQuery from '../../hooks/useFetchQuery';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

vi.mock('../../hooks/useFetchQuery');

const mockHomeworldData = {
  name: 'Tatooine',
  rotation_period: '23',
  orbital_period: '304',
  diameter: '10465',
  climate: 'arid',
  gravity: '1 standard',
  terrain: 'desert',
  surface_water: '1',
  population: '200000',
  url: 'https://swapi.dev/api/planets/1/'
};

describe('Homeworld', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  });

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useFetchQuery).mockReturnValue({
      isPending: false,
      isError: false,
      isFetching: false,
      isPlaceholderData: false,
      error: null,
      data: mockHomeworldData
    });
  });

  function renderWithClient(ui: React.ReactElement) {
    const testQueryClient = queryClient;
    const { rerender, ...result } = render(
        <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
    )
    return {
        ...result,
        rerender: (rerenderUi: React.ReactElement) =>
            rerender(
                <QueryClientProvider client={testQueryClient}>{rerenderUi}</QueryClientProvider>
            ),
    }
  }

  it('matches the snapshot', () => {
    const { asFragment } = renderWithClient(<Homeworld homeworldUrl="https://swapi.dev/api/planets/1/" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders homeworld details', () => {
    renderWithClient(<Homeworld homeworldUrl="https://swapi.dev/api/planets/1/" />);
    expect(screen.getByText('Tatooine')).toBeInTheDocument();
    expect(useFetchQuery).toHaveBeenCalledWith('homeworld', 'planets/1/', '1');
  });
});