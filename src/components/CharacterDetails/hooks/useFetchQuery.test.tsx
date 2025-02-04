import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import useFetchQuery from './useFetchQuery';
import fetchSwapi from '../../../services/api/fetchSwapi';
import React from 'react';

vi.mock('../../../services/api/fetchSwapi');

interface TestData {
  name: string;
  id: number;
}

describe('useFetchQuery', () => {
  let queryClient: QueryClient;
  const mockData: TestData = { name: 'Luke Skywalker', id: 1 };

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

  it('fetch data from the API', async () => {
    const { result } = renderHook(() => useFetchQuery<TestData>('test', 'people/1', '1'), { wrapper });

    await waitFor(() => {
      expect(result.current.isFetching).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.isError).toBe(false);
    expect(fetchSwapi).toHaveBeenCalledWith('people/1');
  });

  it('handles loading state', async () => {
    const { result} = renderHook(() => useFetchQuery<TestData>('test', 'people/1', '1'), { wrapper });

    expect(result.current.isPending).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it('handles error state', async () => {
    const error = new Error('Failed to fetch');
    vi.mocked(fetchSwapi).mockRejectedValueOnce(error);

    const { result } = renderHook(
      () => useFetchQuery<TestData>('test', 'people/1', '1'),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(error);
  });

  it('maintains placeholder data while fetching', async () => {
    const { result, rerender } = renderHook(
      ({ id }) => useFetchQuery<TestData>('people', `people/${id}`, id),
      { wrapper, initialProps: { id: '1' } }
    );

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
    });

    rerender({ id: '2' });

    expect(result.current.isPlaceholderData).toBe(true);
    expect(result.current.data).toEqual(mockData);
  });
});