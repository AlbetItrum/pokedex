interface PokemonPaginationItem {
  name: string;
  url: string;
}

export interface PokemonsPagination {
  count: number;
  next: string;
  previous: string;
  pageSize: number;
  current: number;
  results: PokemonPaginationItem[];
}

interface Stat {
  name: string;
  url: string;
}

interface StatsItem {
  base_stat: number;
  effort: number;
  stat: Stat;
}

interface Sprites {
  front_default: string;
}

export interface Pokemon {
  name: string;
  id: number;
  stats: StatsItem[];
  sprites: Sprites;
  types: { type: { name: string } }[];
}

interface Type {
  name: string;
}

export interface PokemonsState {
  pagination: PokemonsPagination | { current: number; pageSize: number };
  pokemons: Pokemon[] | [];
  isLoading: boolean;
  types: Type[] | [];
}
