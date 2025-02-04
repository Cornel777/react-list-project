import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import useFetchQuery from '../../hooks/useFetchQuery';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Starship from './Starship';

vi.mock('../../hooks/useFetchQuery');

const mockStarshipData = {
  name: 'X-wing',
  model: 'T-65 X-wing',
  manufacturer: 'Incom Corporation',
  url: 'https://swapi.dev/api/starships/12/',
  passengers: '0',
  cargo_capacity: '110',
  consumables: '1 week',
  cost_in_credits: '149999',
  crew: '1',
  hyperdrive_rating: '1.0',
  length: '12.5',
  max_atmosphering_speed: '1050',
  starship_class: 'Starfighter'
};

describe('Starship', () => {
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
      data: mockStarshipData
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
    const { asFragment } = renderWithClient(<Starship starshipUrl='https://swapi.dev/api/starships/12/' />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders homeworld details', () => {
    renderWithClient(<Starship starshipUrl='https://swapi.dev/api/starships/12/' />)
    expect(screen.getByText('X-wing')).toBeInTheDocument();
    expect(useFetchQuery).toHaveBeenCalledWith('starship', 'starships/12/', '12');
  });
});