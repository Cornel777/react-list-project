import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import fetchSwapi from "../../services/api/fetchSwapi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";
import useSearchAllPages from "./useSearchAllPages";
import { waitFor } from "@testing-library/react";

vi.mock('../../services/api/fetchSwapi');

const mockApiResponse = {
  count: 3,
  next: null,
  previous: null,
  results: [
    { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' },
    { name: 'Darth Vader', url: 'https://swapi.dev/api/people/4/' },
    { name: 'Leia Organa', url: 'https://swapi.dev/api/people/5/' }
  ]
};

describe("useSearchAllPages", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
    
    vi.mocked(fetchSwapi).mockResolvedValue(mockApiResponse);
  });

  afterEach(() => {
    vi.clearAllMocks();
    queryClient.clear();
  });

  const createWrapper = () => {
    return ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
  

  it("should return a list of characters that match the search term", async () => {
    const { result } = renderHook(() => useSearchAllPages('Luke'), { wrapper: createWrapper() });

    await vi.waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(fetchSwapi).toHaveBeenCalledWith('people/?page=1');
    await waitFor(() => expect(result.current.resultCharacters).toEqual([mockApiResponse.results[0]]));
  });   

  it("should return an empty list if no characters match the search term", async () => {
    const { result } = renderHook(() => useSearchAllPages('Yoda'), { wrapper: createWrapper() });

    await vi.waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.resultCharacters).toEqual([]);
  });
});