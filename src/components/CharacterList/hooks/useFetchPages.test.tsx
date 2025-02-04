import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import useFetchPages from './useFetchPages';
import fetchSwapi from '../../../services/api/fetchSwapi';

vi.mock('../../../services/api/fetchSwapi');

const mockData = {
  count: 82,
  next: "https://swapi.dev/api/people/?page=2",
  previous: null,
  results: [
    { 
      name: 'Luke Skywalker',
      url: 'https://swapi.dev/api/people/1/',
      height: '172',
      gender: 'male',
      homeworld: 'url1'
    }
  ]
};

describe('useFetchPages', () => { 
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          gcTime: Infinity
        }
      }
    });
    vi.mocked(fetchSwapi).mockResolvedValue(mockData);
  });

 const wrapper = ({ children }: { children: React.ReactNode}) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  it('should fetch data from the API', async () => {
    const { result } = renderHook(() => useFetchPages(1), { wrapper });

    await waitFor(() => {
      expect(result.current.isFetching).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.isError).toBe(false);
    expect(fetchSwapi).toHaveBeenCalledWith('people/?page=1');
  });

  it('should return an error if the API call fails', async () => {
    vi.mocked(fetchSwapi).mockRejectedValue(new Error('API call failed'));

    const { result } = renderHook(() => useFetchPages(1), { wrapper });

    await waitFor(() => {
      expect(result.current.isFetching).toBe(false);
    });

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toEqual(new Error('API call failed'));
  });

  it('should keep previous data when fetching new data', async () => {
    const { result, rerender } = renderHook((page) => useFetchPages(page), { wrapper, initialProps: 1 });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
    });

    rerender(2);

    expect(result.current.isPlaceholderData).toBe(true);
    expect(result.current.data).toEqual(mockData);
  });
 })