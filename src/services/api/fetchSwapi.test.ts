import { afterEach, describe, expect, it, vi } from "vitest";
import fetchSwapi from "../../services/api/fetchSwapi";
import axios from "axios";

vi.mock('axios');

describe("fetchSwapi",  () => {
  const baseUrl = 'https://swapi.dev/api/';
  const mockResponse = {
    data: {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77'
    }
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch data from swapi', async () => {
    vi.mocked(axios.get).mockResolvedValue(mockResponse);

    await fetchSwapi('people/1/');

    expect(axios.get).toHaveBeenCalledWith(`${baseUrl}people/1/`);
  });

  it('should return data from swapi', async () => {
    vi.mocked(axios.get).mockResolvedValue(mockResponse);

    const data = await fetchSwapi('people/1/');

    expect(data).toEqual(mockResponse.data);
  });

  it('should throw error if request fails', async () => {
    const error = new Error('Request failed');
    vi.mocked(axios.get).mockRejectedValue(error);

    await expect(fetchSwapi('people/1/')).rejects.toThrow('Request failed');
  });

  it('should contruct correct url', async () => {
    vi.mocked(axios.get).mockResolvedValue(mockResponse);

    await fetchSwapi('planets/3/');

    expect(axios.get).toHaveBeenCalledWith(`${baseUrl}planets/3/`);
  });

});
