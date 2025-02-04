import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook, act } from '@testing-library/react';
import useFavorites, { STORAGE_KEY } from './useFavorites';
import { Character } from "../../types/Character";


const mockCharacter = {
  name: 'Luke Skywalker',
  url: 'https://swapi.dev/api/people/1/',
  height: '172',
  gender: 'male',
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
} as Character;

describe("useFavorites", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with empty favorites if localStorage is empty', () => {
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).toEqual([]);
  });

  it('should initialize favorites from local storage', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([mockCharacter]));
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).toEqual([mockCharacter]);
  });

  it('should return false if character is not in favorites', () => {
    const { result } = renderHook(() => useFavorites());
    expect(result.current.isFavorite(mockCharacter)).toBe(false);
  });

  it("should add a character to the favorites list", () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggleFavorite(mockCharacter);
    });
    expect(result.current.favorites).toEqual([mockCharacter]);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!).length).toBe(1);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toEqual([mockCharacter]);
  });

  it("should remove a character from the favorites list", () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([mockCharacter]));
    const {result } = renderHook(() => useFavorites());
    act(() => {
      result.current.toggleFavorite(mockCharacter);
    });

    expect(result.current.favorites).toEqual([]);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!).length).toBe(0);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toEqual([]);
  });

  it("should return true if character is in favorites", () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([mockCharacter]));
    const { result } = renderHook(() => useFavorites());
    expect(result.current.isFavorite(mockCharacter)).toBe(true);
    expect(result.current.isFavorite({ ...mockCharacter, url: 'https://swapi.dev/api/people/2/' })).toBe(false);
  });

  it('should handle errors when fetching favorites from local storage', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementationOnce(() => {
      throw new Error('Error fetching from local storage');
    });

    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).toEqual([]);
  });
});