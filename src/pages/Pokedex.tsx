// Em Pokedex.tsx
import { useEffect, useState } from "react";
import { Button, Progress } from "reactstrap";
import useCollection from "../models/useCollection";
import ModalPokemons from "../components/Modal/Modal";
import { DropdownSelect } from "../components/Dropdown/DropdownSelect";
import PokemonCarousel from "../components/Carousel/Carousel";

export default function Pokedex() {
  const {
    pokemons,
    handlePokemonSelect,
    handleSelectChange,
    selectedPokemon,
    setSelectedPokemon,
    fetchMorePokemon,
    selectedType,
  } = useCollection();

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (pokemons.length > 0) {
      setSelectedPokemon(pokemons[0]);
    }
  }, [pokemons]);

  const handleSearchInputChange = (event: any) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchValue.toLowerCase()}/`
      );
      if (!response.ok) {
        throw new Error("Pokémon not found");
      }
      const data = await response.json();
      setSelectedPokemon(data);
    } catch (error) {
      console.error("Error searching Pokémon:", error);
      // Tratar erro aqui
    }
  };

  return (
    <>
      <section className="pokemons">
        <div className="topComparison">
          <h2>
            {selectedPokemon &&
              selectedPokemon.types.map((type, index) => (
                <span className="typePoke" key={index}>
                  {
                    <>
                      <h2>{type.type.name}</h2>
                      <img
                        src={`/${type.type.name}.svg`}
                        alt={type.type.name}
                        style={{ width: "20px", height: "20px" }}
                      />
                    </>
                  }
                </span>
              ))}
          </h2>
          <div className="search">
            <div className="search_">
              <ModalPokemons />
              <DropdownSelect onSelectChange={handleSelectChange} />
            </div>

            <input
              type="text"
              value={searchValue}
              onChange={handleSearchInputChange}
              placeholder="Nome ou Número"
            />
            <Button color="primary" onClick={handleSearchSubmit}>
              Buscar
            </Button>
          </div>
        </div>

        <hr />
        <div className="pekomons_description">
          {selectedPokemon && (
            <>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${selectedPokemon.id}.gif`}
                alt=""
              />
              <div className="content_pokemon">
                <h1>{selectedPokemon.name}</h1>
                <div className="progress_pokemon">
                  {selectedPokemon.stats.map((stat, index) => (
                    <div
                      key={`${index} - ${selectedPokemon.id}`}
                      className="progressP"
                    >
                      <p>{`${stat.stat.name}: ${stat.base_stat.toFixed(2)}`}</p>
                      <Progress className="progress" value={stat.base_stat} />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="carrossel_pokemons">
          <PokemonCarousel
            pokemons={pokemons}
            onSelect={handlePokemonSelect}
            fetchMorePokemon={fetchMorePokemon}
            selectedType={selectedType}
          />
        </div>
      </section>
    </>
  );
}
