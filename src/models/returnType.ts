export interface Pokemon {
  height: number;
  id: number;
  name: string;
  types: {
    type: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}

export interface PokemonResults {
  name: string;
  next: string | null;
  results: {
    name: string;
    url: string;
  }[];
  pokemon?: {
    pokemon: {
      name: string;
      url: string;
    };
  }[];
}

export interface CollectionReturnType {
  data: PokemonResults | null;
  carousel: React.RefObject<HTMLDivElement> | null;
  pokemons: Pokemon[];
  nextPageUrl: string | null;
  selectedType: string | null;
  types: PokemonResults[];
  selectedPokemon: Pokemon | null;
  setSelectedType: React.Dispatch<React.SetStateAction<string | null>>;
  setPokemons: React.Dispatch<React.SetStateAction<Pokemon[]>>;
  setSelectedPokemon: React.Dispatch<React.SetStateAction<Pokemon | null>>;
  handleLeftClick: (e: React.MouseEvent) => void;
  handleRightClick: (e: React.MouseEvent) => void;
  fetchMorePokemon: (type?: string) => Promise<void>;
  handleSelectChange: (selectedValue: string) => void;
  handlePokemonSelect: (pokemon: Pokemon) => void;
  calculatePokemonWidthBack: (pokemon: Pokemon) => number;
  calculatePokemonWidthFront: (pokemon: Pokemon) => number;
}
