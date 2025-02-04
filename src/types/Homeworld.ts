import { URL } from "./Character";

export interface Homeworld {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: URL[];
  created: string;
  edited: string;
  url: URL;
}

