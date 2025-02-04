import { useQueryClient } from "@tanstack/react-query";
import fetchSwapi from "../../../services/api/fetchSwapi";
import { useEffect } from "react";
import { CharacterList } from "../../../types/CharacterList";


const usePrefetchNextPage = (data: CharacterList | undefined, isPlaceholderData: boolean, page: number): void => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isPlaceholderData && data?.next) {
      queryClient.prefetchQuery({
        queryKey: ['characterList', page + 1],
        queryFn: () => fetchSwapi(`people/?page=${page + 1}`),
        staleTime: 5000
      })
    }
  }, [data, isPlaceholderData, page, queryClient])
}

export default usePrefetchNextPage;