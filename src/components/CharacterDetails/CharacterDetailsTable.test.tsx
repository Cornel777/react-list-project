import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import CharacterDetailsTable from './CharacterDetailsTable';

vi.mock('./components/Homeworld/Homeworld', () => ({
  default: () => <div data-testid="mock-homeworld">Tatooine</div>
}));

const mockCharacter = {
  name: 'Luke Skywalker',
  hair_color: 'blond',
  eye_color: 'blue',
  gender: 'male' as const,
  homeworld: 'https://swapi.dev/api/planets/1/',
  height: '172',
  mass: '77',
  birth_year: '19BBY',
  films: [],
  species: [],
  vehicles: [],
  starships: [],
  created: '',
  edited: '',
  skin_color: '',
  url: ''
};

describe('CharacterDetailsTable', () => {

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('matches the snapshot', () => {
    const { asFragment } = render(<CharacterDetailsTable data={mockCharacter} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders all character traits', () => {
    render(<CharacterDetailsTable data={mockCharacter} />);
    
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(5);

    const traits = ['Hair colour', 'Eye colour', 'Gender', 'Homeworld'];
    traits.forEach(trait => {
      expect(screen.getByText(trait)).toBeInTheDocument();
    });
  });

  it('displays the correct character data', () => {
    render(<CharacterDetailsTable data={mockCharacter} />);
    
    const table = screen.getByRole('table');
    const rows = within(table).getAllByRole('row');

    expect(within(rows[1]).getByText('blond')).toBeInTheDocument();
    expect(within(rows[2]).getByText('blue')).toBeInTheDocument();
    expect(within(rows[3]).getByText('male')).toBeInTheDocument();
    expect(within(rows[4]).getByText('Tatooine')).toBeInTheDocument();
  });

  it('renders the Homeworld component', () => {
    render(<CharacterDetailsTable data={mockCharacter} />);
    const homeworld = screen.getByTestId('mock-homeworld');
    expect(homeworld).toHaveTextContent('Tatooine');
  });

  it('renders table headers', () => {
    render(<CharacterDetailsTable data={mockCharacter} />);
    const table = screen.getByRole('table');
    const headers = within(table).getAllByRole('columnheader');

    expect(headers).toHaveLength(2);
    expect(headers[0]).toHaveTextContent('Character trait');
    expect(headers[1]).toHaveTextContent('Value');
  });

  });