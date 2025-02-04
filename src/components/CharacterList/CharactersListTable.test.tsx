import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CharactersListTable from './CharactersListTable';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const mockCharacters = [
  {
    name: 'Luke Skywalker',
    url: 'https://swapi.dev/api/people/1/',
    height: '172',
    gender: 'male' as const,
    homeworld: 'https://swapi.dev/api/planets/1/',
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
];

describe('CharactersListTable', () => {
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
  
  const defaultProps = {
    characters: mockCharacters,
    onCharacterNavigation: vi.fn(),
    onKeyDownNavigation: vi.fn()
  };

  it('matches snapshot', () => {
    const { container } = renderWithClient(<CharactersListTable {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('renders table with character data', () => {
    renderWithClient(<CharactersListTable {...defaultProps} />);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
  });

  it('calls navigation callback on row click', () => {
    renderWithClient(<CharactersListTable {...defaultProps} />);
    const row = screen.getByText('Luke Skywalker').closest('tr');
    fireEvent.click(row!);
    expect(defaultProps.onCharacterNavigation).toHaveBeenCalledWith('1');
  });

  it('calls keyboard navigation on Enter press', () => {
    renderWithClient(<CharactersListTable {...defaultProps} />);
    const row = screen.getByText('Luke Skywalker').closest('tr');
    fireEvent.keyDown(row!, { key: 'Enter' });
    expect(defaultProps.onKeyDownNavigation).toHaveBeenCalledWith(
      expect.any(Object),
      '1'
    );
  });

  it('calls keyboard navigation on Space press', () => {
    renderWithClient(<CharactersListTable {...defaultProps} />);
    const row = screen.getByText('Luke Skywalker').closest('tr');
    fireEvent.keyDown(row!, { key: ' ' });
    expect(defaultProps.onKeyDownNavigation).toHaveBeenCalledWith(
      expect.any(Object),
      '1'
    );
  });

  it('renders table with correct headers', () => {
    renderWithClient(<CharactersListTable {...defaultProps} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Gender')).toBeInTheDocument();
    expect(screen.getByText('Home Planet')).toBeInTheDocument();
  });

  it('maintains accessibility attributes', () => {
    renderWithClient(<CharactersListTable {...defaultProps} />);
    expect(screen.getByRole('table')).toHaveAttribute(
      'aria-label',
      'Characters list table'
    );
    expect(screen.getByText('Luke Skywalker').closest('tr')).toHaveAttribute(
      'tabIndex',
      '0'
    );
  });
});