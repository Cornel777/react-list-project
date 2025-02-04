import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CharacterDetails from './CharacterDetails';
import useFetchQuery, { HookReturn } from './hooks/useFetchQuery';
import useFavorites from '../hooks/useFavorites';
import { Character } from '../../types/Character';

vi.mock('./hooks/useFetchQuery');
vi.mock('../hooks/useFavorites');

const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: vi.fn().mockReturnValue({ state: { page: 1 } }),
    useParams: vi.fn().mockReturnValue({ characterId: '1' })
  };
});

describe('CharacterDetails', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  });

  beforeEach(() => {
    queryClient.clear();
    vi.mocked(useFetchQuery).mockReturnValue({
      isPending: false,
      isError: false,
      isFetching: false,
      isPlaceholderData: false,
      error: null,
      data: {
        name: 'Luke Skywalker',
        url: 'https://swapi.dev/api/people/1/',
        height: '172',
        gender: 'male',
        homeworld: 'url1',
        films: [],
        species: [],
        vehicles: [],
        starships: [],
        created: '',
        edited: '',
        birth_year: '',
        eye_color: '',
        hair_color: '',
        skin_color: '',
        mass: ''
      }
    });

    vi.mocked(useFavorites).mockReturnValue({
      isFavorite: vi.fn().mockReturnValue(false),
      toggleFavorite: vi.fn(),
      favorites: []
    });
    mockNavigate.mockClear();
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

  it('matches snapshot', () => {
    const { container } = renderWithClient(<CharacterDetails />);
    expect(container).toMatchSnapshot();
  });

  it('shows loading state', () => {
    vi.mocked(useFetchQuery).mockReturnValueOnce({
      isPending: true,
      isError: false,
      error: null,
      data: undefined
    } as HookReturn<Character>);

    renderWithClient(<CharacterDetails />);
    expect(screen.getByTestId('three-loading-dots')).toBeInTheDocument();
  });

  it('shows error state', async () => {
    vi.mocked(useFetchQuery).mockReturnValueOnce({
      isPending: false,
      isError: true,
      error: new Error('Error loading character'),
      data: undefined,
      isFetching: false,
      isPlaceholderData: false
    });

    renderWithClient(<CharacterDetails />);
    expect(await screen.findByText(/Failed to load data for character/i)).toBeInTheDocument();
  });

  it('renders heading names', async () => {
    const result = renderWithClient(<CharacterDetails />);
    expect((await result.getByRole('heading', {name: /Luke Skywalker/i }))).toBeInTheDocument();
    expect((await result.getByRole('heading', {name: /Films/i }))).toBeInTheDocument();
    expect((await result.getByRole('heading', {name: /Starships/i }))).toBeInTheDocument();
  });

  it('navigates back correctly', async () => {
    renderWithClient(<CharacterDetails />);
    const backButton = await screen.findByTestId('character-back-button');
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith('/characters', {
      replace: true,
      state: { page: 1 },
    });
  });

  it('toggles favorite on button click', async () => {
    const mockToggle = vi.fn();
    vi.mocked(useFavorites).mockReturnValueOnce({
      isFavorite: vi.fn(() => false),
      toggleFavorite: mockToggle,
      favorites: []
    });

    renderWithClient(<CharacterDetails />);
    const favButton = await screen.findByRole('button', { name: /favorite/i });
    fireEvent.click(favButton);

    expect(mockToggle).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Luke Skywalker'
      })
    );
  });
});