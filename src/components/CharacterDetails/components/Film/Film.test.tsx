import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Film from './Film';
import useFetchQuery from '../../hooks/useFetchQuery';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

vi.mock('../../hooks/useFetchQuery');
// vi.mock('../../../LoadingDots/LoadingDots', () => ({
//   default: () => <div data-testid="loading-dots">Loading...</div>
// }));

const mockFilmData = {
  title: 'A New Hope',
  episode_id: 4,
  director: 'George Lucas',
  producer: 'Gary Kurtz, Rick McCallum',
  release_date: '1977-05-25',
  opening_crawl: 'It is a period of civil war...',
  url: 'https://swapi.dev/api/films/1/',
  characters: [],
  planets: [],
  starships: [],
  vehicles: [],
  species: [],
  created: '',
  edited: ''
};

const mockFilmUrl = 'https://swapi.dev/api/films/1/';

describe('Film component', () => {
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
      data: mockFilmData
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
    const { asFragment } = renderWithClient(<Film filmUrl={mockFilmUrl} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders film details', () => {
    renderWithClient(<Film filmUrl={mockFilmUrl} />);
    expect(screen.getByText('A New Hope')).toBeInTheDocument();
    expect(screen.getByText('Episode 4')).toBeInTheDocument();
    expect(useFetchQuery).toHaveBeenCalledWith('film', 'films/1/', '1');
  });

  it('renders loading dots', () => {
    vi.mocked(useFetchQuery).mockReturnValue({
      isPending: true,
      isError: false,
      isFetching: false,
      isPlaceholderData: false,
      error: null,
      data: undefined
    });

    renderWithClient(<Film filmUrl={mockFilmUrl} />);
    expect(screen.getByTestId('loading-dots')).toBeInTheDocument();
  });

  it('returns null if no data is available', () => {
    vi.mocked(useFetchQuery).mockReturnValue({
      isPending: false,
      isError: false,
      isFetching: false,
      isPlaceholderData: false,
      error: null,
      data: undefined
    });

    renderWithClient(<Film filmUrl={mockFilmUrl} />);
    expect(screen.queryByText('A New Hope')).not.toBeInTheDocument();
    expect(screen.queryByText('Episode 4')).not.toBeInTheDocument();
  });

  it('renders error message', async () => {
    vi.mocked(useFetchQuery).mockReturnValue({
      isPending: false,
      isError: true,
      isFetching: false,
      isPlaceholderData: false,
      error: new Error('Error loading film'),
      data: undefined
    });

    renderWithClient(<Film filmUrl={mockFilmUrl} />);
    expect(await screen.findByText(/Failed to load films/i)).toBeInTheDocument();
  });
});