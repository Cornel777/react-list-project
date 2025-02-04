import { URL } from './Character';

export interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: URL[];
  planets: URL[];
  starships: URL[];
  vehicles: URL[];
  species: URL[];
  created: Date;
  edited: Date;
  url: URL;
}