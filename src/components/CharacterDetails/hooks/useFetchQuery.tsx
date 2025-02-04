import { useQuery, keepPreviousData } from "@tanstack/react-query";
import fetchSwapi from "../../../services/api/fetchSwapi";

export interface HookReturn<T> {
  isFetching: boolean;
  isPlaceholderData: boolean;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
  data: T | undefined;
}


const useFetchQuery = <T, >(queryKey: string, path: string, id: string | undefined): HookReturn<T> => {

  const { isFetching, isPlaceholderData, isPending, isError, error, data } = useQuery<T>({
    queryKey: [queryKey, id],
    queryFn: () => fetchSwapi(path),
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

export default useFetchQuery;