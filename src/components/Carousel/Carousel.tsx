import React from "react";
import arrowRight from "/arrowRight.svg";
import arrowLeft from "/arrowLeft.svg";
import useColletion, { Pokemon } from "../../models/useCollection";

interface CarouselProps {
  onSelect: (pokemon: Pokemon) => void;
}

const Carousel: React.FC<CarouselProps> = ({ onSelect }) => {
  const {
    carousel,
    handleLeftClick,
    handleRightClick,
    generatePokemonImageUrl,
    fetchMorePokemon,
    pokemons,
  } = useColletion();

  const handlePokemonClick = (pokemon: Pokemon) => {
    onSelect(pokemon);
  };

  return (
    <div className="container">
      <div className="carousel" ref={carousel}>
        {pokemons?.map((pokemon, index) => (
          <div
            className="poke"
            key={`${index} - ${pokemon.id}`}
            onClick={() => {
              handlePokemonClick(pokemon);
            }}
          >
            <div className="img_poke">
              <img
                src={generatePokemonImageUrl(pokemon.id)}
                alt={`Imagem de ${pokemon.name}`}
              />
            </div>
            <div className="info_poke">
              <span className="name_poke">
                {pokemon.id} - {pokemon.name}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="buttons">
        <div className="buttons left">
          <button onClick={handleLeftClick}>
            <img src={arrowLeft} alt="" />
          </button>
        </div>

        <div className="buttons right">
          <button onClick={handleRightClick}>
            <img src={arrowRight} alt="" />
          </button>
        </div>
      </div>
      <div className="Btn_more">
        <button onClick={fetchMorePokemon} className="more">
          More pokemons
        </button>
      </div>
    </div>
  );
};

export default Carousel;
