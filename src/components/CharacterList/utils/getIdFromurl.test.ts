import { describe, expect, it } from "vitest";
import getIdFromUrl from "./getIdFromUrl";

describe('getIdFromUrl', () => {
  it('should extract id from url', () => {
    const url = 'https://swapi.dev/api/people/1/';
    const id = getIdFromUrl(url);
    expect(id).toBe('1');
  });

  it('should extract id from url with trailing slash', () => {
    const url = 'https://swapi.dev/api/people/1';
    const id = getIdFromUrl(url);
    expect(id).toBe('1');
  });

  it('should extract id from url with multiple digits', () => {
    const url = 'https://swapi.dev/api/people/12';
    const id = getIdFromUrl(url);
    expect(id).toBe('12');
  });

  it('should handle empty url', () => {
    const url = '';
    const id = getIdFromUrl(url);
    expect(id).toBe(undefined);
  });
});