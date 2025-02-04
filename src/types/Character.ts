export type Gender = 'male' | 'female' | 'n/a' | 'none';
export type Color = string;
export type URL = string;

export interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: Color;
  skin_color: Color;
  eye_color: Color;
  birth_year: string;
  gender: Gender;
  homeworld: URL;
  films: URL[];
  species: URL[];
  vehicles: URL[];
  starships: URL[];
  created: string;
  edited: string;
  url: URL;
}
