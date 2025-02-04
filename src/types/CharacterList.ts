import { Character } from "./Character";
import { URL } from "./Character";

export interface CharacterList {
  count: number;
  next: URL | null;
  previous: URL | null;
  results: Character[];
}