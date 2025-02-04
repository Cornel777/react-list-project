import { renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import usePrefetchNextPage from './usePrefetchNextPage';
import fetchSwapi from '../../../services/api/fetchSwapi';

vi.mock('../../../services/api/fetchSwapi');

const mockData = {
  count: 82,
  next: "https://swapi.dev/api/people/?page=2",
  previous: null,
  results: []
};

describe('usePrefetchNextPage', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false }
      }
    });
    vi.mocked(fetchSwapi).mockResolvedValue(mockData);
  });

  const wrapper = ({ children }: { children: React.ReactNode}) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  it('should prefetch next page when conditions are met', async () => {
    const prefetchSpy = vi.spyOn(queryClient, 'prefetchQuery');
    
    renderHook(() => usePrefetchNextPage(mockData, false, 1), { wrapper });

    expect(prefetchSpy).toHaveBeenCalledWith({
      queryKey: ['characterList', 2],
      queryFn: expect.any(Function),
      staleTime: 5000
    });
  });

  it('should not prefetch when using placeholder data', async () => {
    const prefetchSpy = vi.spyOn(queryClient, 'prefetchQuery');
    
    renderHook(() => usePrefetchNextPage(mockData, true, 1), { wrapper });
    
    expect(prefetchSpy).not.toHaveBeenCalled();
  });

  it('should not prefetch when no next page exists', () => {
    const prefetchSpy = vi.spyOn(queryClient, 'prefetchQuery');
    const dataWithoutNext = { ...mockData, next: null };
    
    renderHook(() => usePrefetchNextPage(dataWithoutNext, false, 1), { wrapper });
    
    expect(prefetchSpy).not.toHaveBeenCalled();
  });

  it('should not prefetch when data is undefined', () => {
    const prefetchSpy = vi.spyOn(queryClient, 'prefetchQuery');
    
    renderHook(() => usePrefetchNextPage(undefined, false, 1), { wrapper });
    
    expect(prefetchSpy).not.toHaveBeenCalled();
  });

});