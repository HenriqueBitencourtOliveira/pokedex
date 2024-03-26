import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";
import useColletion from "../../models/useCollection";
import { Pokemon } from "../../models/returnType";
import { useMediaQuery } from "react-responsive";

interface CarouselProps {
  pokemons: Pokemon[];
  onSelect: (pokemon: Pokemon) => void;
  fetchMorePokemon: (type?: string) => void;
  selectedType: string | null; // Adicione esta propriedade se ainda não estiver presente
}

const PokemonCarousel: React.FC<CarouselProps> = ({
  pokemons,
  onSelect,
  fetchMorePokemon,
  selectedType,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  // Detecta o tamanho da tela
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isSmall = useMediaQuery({ maxWidth: 1339 });

  // Define o número de pokemons por slide com base no tamanho da tela
  const itemsPerSlide = isMobile ? 2 : 5 && isSmall ? 3 : 5;

  const next = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === groupedPokemons.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === 0 ? groupedPokemons.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const handlePokemonClick = (pokemon: Pokemon) => {
    onSelect(pokemon);
  };

  const goToIndex = (newIndex: number) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  // Agrupa os pokemons em grupos de acordo com o número de pokemons por slide
  const groupedPokemons: Pokemon[][] = [];

  for (let i = 0; i < pokemons.length; i += itemsPerSlide) {
    const sliceStart = i;
    const sliceEnd = Math.min(i + itemsPerSlide, pokemons.length);
    const pokemonsInGroup = pokemons.slice(sliceStart, sliceEnd);
    groupedPokemons.push(pokemonsInGroup);
  }

  const slides = groupedPokemons.map((group, index) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={index}
      >
        <div className="carousel">
          {group.map((pokemon, idx) => (
            <div
              className="poke"
              key={idx}
              onClick={() => handlePokemonClick(pokemon)}
            >
              <div className="img_poke">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
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
        <CarouselCaption captionText="" captionHeader="" />
      </CarouselItem>
    );
  });

  return (
    <div className="container">
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
        interval={false}
      >
        <CarouselIndicators
          items={groupedPokemons.map((_group, index) => ({
            key: `indicator-${index}`,
            id: index,
            onClick: () => goToIndex(index),
          }))}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />

        {slides}

        <div className="custom-carousel-controls">
          <CarouselControl
            className="custom-carousel-control-prev"
            direction="prev"
            directionText="Previous"
            onClickHandler={previous}
          />
          <CarouselControl
            className="custom-carousel-control-next"
            direction="next"
            directionText="Next"
            onClickHandler={next}
          />
        </div>
      </Carousel>
      <div className="Btn_more">
        <button
          onClick={() => fetchMorePokemon(selectedType || undefined)}
          className="more"
        >
          More pokemons
        </button>
      </div>
    </div>
  );
};

export default PokemonCarousel;
