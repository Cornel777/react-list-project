import { Character } from "../../types/Character";
import fetchSwapi from "../../services/api/fetchSwapi";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import debounce from 'lodash/debounce';

const PAGE_SIZE = 10;

interface HookReturn {
  resultCharacters: Character[] | undefined;
  isLoading: boolean;
  errorObject: Error | null;
  setSearchTerm: (name: string) => void;
}

const fetchAllCharacters = async (): Promise<Character[]> => {
  const firstPageForCount = await fetchSwapi('people/?page=1');
  const totalPages = Math.ceil(firstPageForCount.count / PAGE_SIZE);

  const requests = [];
  let page = 1;
  while ( page <= totalPages ) {
    requests.push(fetchSwapi(`people/?page=${page}`));
    page++;
  }

  const allResponses = await Promise.all(requests);
  return allResponses.flatMap((pageResponse) => pageResponse.results);
};

const useSearchAllPages = (searchTerm: string): HookReturn => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  const debouncedSearch = debounce((searchTerm: string) => setDebouncedSearchTerm(searchTerm), 300);
    

  const {data: allCharactersList, isLoading, error} = useQuery<Character[], Error>({
    queryKey: ['allCharacters', 'all'],
    queryFn: fetchAllCharacters,
    staleTime: 10 * 60 * 1000, // 5 minutes
    gcTime: 60 * 60 * 1000, // 30 minutes
  });
  const filterredSearchResults =  (debouncedSearchTerm.trim() === '') 
  ? [] 
  : allCharactersList?.filter((character) => {
    return character.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) 
  });
  
  console.log('HOOOK', filterredSearchResults);

  return {
    resultCharacters: filterredSearchResults,
    isLoading,
    errorObject: error,
    setSearchTerm: debouncedSearch,
  }
  };

export default useSearchAllPages;