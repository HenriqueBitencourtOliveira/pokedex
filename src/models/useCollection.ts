import { useState, useEffect, useRef } from "react";
import { CollectionReturnType, Pokemon, PokemonResults } from "./returnType";
import { PokemonFactory } from "./PokemonFactory";

export default function useCollection(): CollectionReturnType {
  const [data, setData] = useState<PokemonResults | null>(null);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const carousel = useRef<HTMLDivElement | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [types, setTypes] = useState<PokemonResults[]>([]);

  useEffect(() => {
    async function typesPokemon() {
      const response = await fetch(`https://pokeapi.co/api/v2/type/`);
      const typesData = await response.json();
      const pokemonTypes = typesData.results.slice(0, 18);
      setTypes(pokemonTypes);
    }

    typesPokemon();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        let url = "https://pokeapi.co/api/v2/pokemon/";
        if (selectedType) {
          url = `https://pokeapi.co/api/v2/type/${selectedType}`;
        }
        const response = await fetch(url);
        const pokemonData: PokemonResults = await response.json();
        setData(pokemonData);
        setNextPageUrl(pokemonData.next);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      }
    }

    fetchData();
  }, [selectedType]);

  useEffect(() => {
    setPokemons([]);
    if (data) {
      async function fetchPokemonDetails() {
        const pokemonDetailsPromises = (data?.results || []).map(
          async (pokemon) => {
            const response = await fetch(pokemon.url);
            const pokemonDetails: Pokemon = await response.json();
            return PokemonFactory.create(pokemonDetails);
          }
        );

        const pokemonDetails = await Promise.all(pokemonDetailsPromises);
        setPokemons(pokemonDetails);
      }

      fetchPokemonDetails();
    }
  }, [data]);

  async function fetchMorePokemon(type?: string) {
    try {
      let url = nextPageUrl;
      if (type) {
        url = `https://pokeapi.co/api/v2/type/${type}`;
      }
      // Busca os dados
      if (url) {
        const response = await fetch(url);
        const additionalPokemonData: PokemonResults = await response.json();
        // Filtra os resultados
        const results =
          additionalPokemonData.results ||
          additionalPokemonData.pokemon?.map((p) => p.pokemon);
        if (results) {
          // Verifica se os Pokémons já existem na lista atual
          const existingPokemonNames = new Set(
            pokemons.map((pokemon) => pokemon.name)
          );
          const additionalPokemonSlice: Pokemon[] = await Promise.all(
            results
              .filter((pokemon) => !existingPokemonNames.has(pokemon.name))
              .slice(0, 20)
              .map(async (pokemon) => {
                // Busca os detalhes do Pokémon
                const detailsResponse = await fetch(pokemon.url);
                const detailsData = await detailsResponse.json();
                // Retorna o Pokémon no formato desejado
                return PokemonFactory.create(detailsData);
              })
          );
          // Atualiza o estado
          setPokemons((prevPokemons) => [
            ...prevPokemons,
            ...additionalPokemonSlice,
          ]);
          setNextPageUrl(additionalPokemonData.next); // Atualiza a URL para a próxima página
        } else {
          console.error("Results are undefined in additionalPokemonData");
        }
      }
    } catch (error) {
      console.error("Error fetching more Pokemon:", error);
    }
  }

  const handleSelectChange = async (selectedValue: string) => {
    setSelectedType(selectedValue);

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/type/${selectedValue}`
      );
      const data = await response.json();

      const pokemonDetailsPromises = (data?.pokemon || []).map(
        async (pokemon: any) => {
          const response = await fetch(pokemon.pokemon.url);
          const pokemonDetails = await response.json();
          return PokemonFactory.create(pokemonDetails);
        }
      );

      const pokemonDetails = await Promise.all(pokemonDetailsPromises);
      
      
      setPokemons(pokemonDetails.slice(0, 20));
      
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    }
  };
  
  console.log(pokemons);
  
  


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

  const handlePokemonSelect = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };

  function calculatePokemonWidthBack(pokemon: Pokemon): number {
    // Verifica se a altura do Pokémon é maior que 9
    if (pokemon.height <= 8) {
      return 140;
    } else if (pokemon.height <= 20) {
      return 290;
    } else if (pokemon.height <= 25) {
      return 320;
    } else {
      return 390;
    }
  }

  function calculatePokemonWidthFront(pokemon: Pokemon): number {
    // Verifica se a altura do Pokémon é maior que 9
    if (pokemon.height <= 8) {
      return 100;
    } else if (pokemon.height <= 20) {
      return 170;
    } else {
      return 140;
    }
  }
  
  return {
    nextPageUrl,
    data,
    carousel,
    pokemons,
    selectedPokemon,
    selectedType,
    types,
    setSelectedType,
    setSelectedPokemon,
    setPokemons,
    handleSelectChange,
    handleLeftClick,
    handleRightClick,
    fetchMorePokemon,
    handlePokemonSelect,
    calculatePokemonWidthBack,
    calculatePokemonWidthFront,
  };
}
