import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CharacterList from './CharacterList';
import useSearchAllPages from '../hooks/useSearchAllPages';
import { Character } from '../../types/Character';
import useFetchPages from './hooks/useFetchPages';
import { type CharacterList as Characters } from '../../types/CharacterList';

vi.mock('./hooks/useFetchPages');
vi.mock('../hooks/useSearchAllPages');
vi.mock('./hooks/usePrefetchNextPage');


const mockNavigate = vi.fn();
vi.mock('react-router',
   async () => {
    const actual = await vi.importActual('react-router');
    return {
      ...actual,
      useNavigate: () => mockNavigate,
      useLocation: vi.fn().mockReturnValue({ state: { page: 1 } }),
    }
  }
);  

const mockData = {
  count: 82,
  next: "https://swapi.dev/api/people/?page=2",
  previous: null,
  results: [
    { 
      name: 'Luke Skywalker',
      url: 'https://swapi.dev/api/people/1/',
      height: '172',
      gender: 'male',
      homeworld: 'url1'
    }
  ]
};

const mockSearchData = [
  { 
    name: 'Luke Skywalker search result',
    url: 'https://swapi.dev/api/people/1/',
    height: '172',
    gender: 'male',
    homeworld: 'url1'
  }
]


describe('CharacterList component', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
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

  // const renderComponent = () => {
  //  return render (
  //     <QueryClientProvider client={queryClient}>
  //       <BrowserRouter>
  //         <CharacterList />
  //       </BrowserRouter>
  //     </QueryClientProvider>
  //   )
  // }

  beforeEach(() => {
    queryClient.clear();
    mockNavigate.mockClear();
    vi.mocked(useFetchPages).mockReturnValue({
      data: mockData as Characters,
      isFetching: false,
      isPending: false,
      isError: false,
      error: null,
      isPlaceholderData: false
    });
    vi.mocked(useSearchAllPages).mockReturnValue({ 
      resultCharacters: [],
      setSearchTerm: vi.fn(),
      isLoading: false,
      errorObject: null });
  });

  it('should match the snapshot', () => {
    const result = renderWithClient(<CharacterList />);
    expect(result).toMatchSnapshot();
  });

  it('should render the character list', async () => {
    const result = renderWithClient(<CharacterList />);
    await waitFor(() => {
      expect(result.getByText('Luke Skywalker')).toBeInTheDocument();
    });
    expect(result.getByText('male')).toBeInTheDocument();
  });

  it('renders search input', () => {
    renderWithClient(<CharacterList />);
    expect(screen.getByLabelText('Search character name')).toBeInTheDocument();
  });

  it('navigates to character details with correct page state', async () => {
    renderWithClient(<CharacterList />);
    
    const characterRow = await screen.findByText('Luke Skywalker');
    fireEvent.click(characterRow);
    
    expect(mockNavigate).toHaveBeenCalledWith(
      '/characters/1',
      { state: { page: 1 } }
    );
  });

  it('navigates on key press', async () => {
    renderWithClient(<CharacterList />);
    
    const characterRow = await screen.findByText('Luke Skywalker');
    fireEvent.keyDown(characterRow, { key: 'Enter' });
    
    expect(mockNavigate).toHaveBeenCalledWith(
      '/characters/1',
      { state: { page: 1 } }
    );
  });
 
  it('displays search results', async () => {
    vi.mocked(useSearchAllPages).mockReturnValue({
      resultCharacters: mockSearchData as Character[],
      setSearchTerm: vi.fn(),
      isLoading: false,
      errorObject: null
    });

    renderWithClient(<CharacterList />);
    const searchInput = screen.getByTestId('character-list-search-input');
    await userEvent.type(searchInput, 'Luke');

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker search result')).toBeInTheDocument();
    });
  });

  it('shows regular list when search is empty', async () => {
    const result = renderWithClient(<CharacterList />);
    const searchInput = screen.getByLabelText('Search character name');
    await userEvent.clear(searchInput);

    await waitFor(() => {
      expect(result.getByText(/Current Page:/i)).toBeInTheDocument();
    });
  });

  it('handles search input changes', async () => {
    const mockSetSearchTerm = vi.fn();
    vi.mocked(useSearchAllPages).mockReturnValue({
      resultCharacters: [],
      setSearchTerm: mockSetSearchTerm,
      isLoading: false,
      errorObject: null
    });

    renderWithClient(<CharacterList />);
    const searchInput = screen.getByLabelText('Search character name');
    await userEvent.type(searchInput, 'Luke');

    expect(mockSetSearchTerm).toHaveBeenCalledWith('Luke');
  });
});