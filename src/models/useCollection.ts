import { useState, useEffect, useRef } from "react";


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
  next: string;
  results: {
    name: string;
    url: string;
  }[];
}

interface CollectionReturnType {
  data: PokemonResults | null;
  carousel: React.RefObject<HTMLDivElement> | null;
  pokemons: Pokemon[];
  nextPageUrl: string | null;
  selectedPokemon: Pokemon | null;
  setSelectedPokemon: React.Dispatch<React.SetStateAction<Pokemon | null>>;
  handleLeftClick: (e: React.MouseEvent) => void;
  handleRightClick: (e: React.MouseEvent) => void;
  generatePokemonImageUrl: (id: number) => string;
  generatePokemonImageUrlGif: (id: number) => string;
  generatePokemonImageUrlGifBack: (id: number) => string;
  fetchMorePokemon: () => Promise<void>;
  handlePokemonSelect: (pokemon: Pokemon) => void;
  calculatePokemonWidthBack: (pokemon: Pokemon) => string;
  calculatePokemonWidthFront: (pokemon: Pokemon) => string;

}
export default function useCollection(): CollectionReturnType {
  const [data, setData] = useState<PokemonResults | null>(null);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const carousel = useRef<HTMLDivElement | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
        const pokemonData: PokemonResults = await response.json();
        setData(pokemonData);
        setNextPageUrl(pokemonData.next);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      }
    }

    

    fetchData();
  }, []); // Execute apenas uma vez no montar do componente

  useEffect(() => {
    if (data) {
      async function fetchPokemonDetails() {
        const pokemonDetailsPromises = (data?.results || []).map(
          async (pokemon) => {
            const response = await fetch(pokemon.url);
            const pokemonDetails: Pokemon = await response.json();
            return pokemonDetails;
          }
        );

        const pokemonDetails = await Promise.all(pokemonDetailsPromises);
        setPokemons(pokemonDetails);
      }

      fetchPokemonDetails();
    }
  }, [data]);


  async function fetchMorePokemon() {
    try {
      if (nextPageUrl) {
        const response = await fetch(nextPageUrl);
        const additionalPokemonData: PokemonResults = await response.json();
        
        const additionalPokemonSlice: Pokemon[] = await Promise.all(
          additionalPokemonData.results.slice(0, 12).map(async (pokemon) => {
            const detailsResponse = await fetch(pokemon.url);
            const detailsData = await detailsResponse.json();
  
            return {
              height:detailsData.height,
              id: detailsData.id,
              name: detailsData.name,
              types: detailsData.types,
              stats: detailsData.stats,
              // Adicione outras propriedades, se necessário
            };
          })
        );
  
        setPokemons((prevPokemons) => [...prevPokemons, ...additionalPokemonSlice]);
        setNextPageUrl(additionalPokemonData.next);
      }
    } catch (error) {
      console.error('Error fetching more Pokemon:', error);
    }
  }



  const handleLeftClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (carousel.current) {
      carousel.current.scrollLeft -= carousel.current.offsetWidth;
    }
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (carousel.current) {
      carousel.current.scrollLeft += carousel.current.offsetWidth;
    }
  };

  const generatePokemonImageUrl = (id: number) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  };

  const generatePokemonImageUrlGif = (id: number) =>{
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`
  }

  const generatePokemonImageUrlGifBack = (id: number) =>{
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/${id}.gif`
  }



  const handlePokemonSelect = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };

  function calculatePokemonWidthBack(pokemon: Pokemon): string {
    // Verifica se a altura do Pokémon é maior que 9
    if (pokemon.height <= 8) {
      return '130px';
    } else if (pokemon.height <= 20) {
      return '290px';
    } else if (pokemon.height <= 25) {
      return '320px';
    } else {
      return '390px';
    }

  }

  function calculatePokemonWidthFront(pokemon: Pokemon): string {
    // Verifica se a altura do Pokémon é maior que 9
    if (pokemon.height <= 8) {
      return '130px';
    } else if (pokemon.height <= 20) {
      return '170px';
    } else {
      return '140px';
    }

  }

  console.log(pokemons);
  return {
    nextPageUrl,
    data,
    carousel,
    pokemons,
    selectedPokemon,
    setSelectedPokemon,
    handleLeftClick,
    handleRightClick,
    generatePokemonImageUrl,
    generatePokemonImageUrlGif,
    generatePokemonImageUrlGifBack,
    fetchMorePokemon,
    handlePokemonSelect,
    calculatePokemonWidthBack,
    calculatePokemonWidthFront,

  };
}
