import { useQuery, keepPreviousData } from "@tanstack/react-query";
import fetchSwapi from "../../../services/api/fetchSwapi";
import { CharacterList } from "../../../types/CharacterList";

interface HookReturn {
  isFetching: boolean;
  isPlaceholderData: boolean;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
  data: CharacterList | undefined;
}


const useFetchPages = ( page: number): HookReturn => {

  const { isFetching, isPlaceholderData, isPending, isError, error, data } = useQuery<CharacterList>({
    queryKey: ['characterList', page],
    queryFn: () => fetchSwapi(`people/?page=${page}`),
    staleTime: 5000,
    placeholderData: keepPreviousData,
  })

    return {
      isFetching,
      isPlaceholderData,
      isPending,
      isError,
      error,
      data,
    }
}

export default useFetchPages;