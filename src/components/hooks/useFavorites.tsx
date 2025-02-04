import {useState} from 'react'
import { Character } from '../../types/Character';


export const STORAGE_KEY = 'SW_favorites';

interface HookReturn {
  favorites: Character[];
  toggleFavorite: (character: Character) => void;
  isFavorite: (character: Character) => boolean;
}

export const useFavorites = (): HookReturn => {
  const [favorites, setFavorites] = useState<Character[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error encoutered while fetching favorites list' , error);
      return [];
    }
});

  const toggleFavorite = (character: Character) => {
    try {
      setFavorites((prevFavorites) => {
        const isStored = prevFavorites.some((favorite) => favorite.url === character.url);

        let newFavorites: Character[];
        if (isStored) {
          newFavorites = prevFavorites.filter((favorite) => favorite.url !== character.url);
        } else {
          newFavorites =  [...prevFavorites, character];
        }
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
        return newFavorites;
      })
    } catch (error) {
      console.error('Error encountered while toggling favorite', error);
    }
  }

  const isFavorite = ( character: Character) => {
    return favorites.some((favorite) => favorite.url === character.url);
  }
  return { favorites, toggleFavorite, isFavorite };
}

export default useFavorites;