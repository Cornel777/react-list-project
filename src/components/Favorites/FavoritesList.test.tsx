import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from '@testing-library/react';
import useFavorites from '../hooks/useFavorites';
import { Character } from "../../types/Character";
import FavoritesList from "./FavoritesList";

vi.mock('../hooks/useFavorites');
vi.mock("../CharacterDetails/components/Homeworld/Homeworld");

const mockCharacter = {
  name: 'Luke Skywalker',
  height: '172',
  gender: 'male',
  homeworld: 'https://swapi.dev/api/planets/1/',
  url: 'https://swapi.dev/api/people/1/',
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
} as Character;

describe('FavoritesList', () => {
  beforeEach(() => {
    vi.mocked(useFavorites).mockReturnValue({
      favorites: [mockCharacter],
      toggleFavorite: vi.fn(),
      isFavorite: vi.fn()
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should render the list of favorites', () => {
    const {container} = render(<FavoritesList />);
    expect(container).toMatchSnapshot();
  });

  it('renders the list of favorites', () => {
    render(<FavoritesList />);
    const name = screen.getByText('Luke Skywalker');
    expect(name).toBeInTheDocument();
    expect(screen.getByText('172')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
  });

  it('toggles favorite on click', () => {
    render(<FavoritesList />);
    const removeButton = screen.getByLabelText('remove from favorites button');
    fireEvent.click(removeButton);
    expect(useFavorites().toggleFavorite).toHaveBeenCalledWith(mockCharacter);
  });

  it('toggles favorite on keydown', () => {
    render(<FavoritesList />);
    const removeButton = screen.getByLabelText('remove from favorites button');
    fireEvent.keyDown(removeButton, { key: 'Enter', code: 'Enter' });
    expect(useFavorites().toggleFavorite).toHaveBeenCalledWith(mockCharacter);
  });

});