import { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  
} from "reactstrap";
import useCollection, { Pokemon } from "../../models/useCollection";
import life from "/life.png"


function ModalPokemons(props: any) {
  const { className } = props;
  const {
    generatePokemonImageUrlGif,
    generatePokemonImageUrlGifBack,
    calculatePokemonWidthBack,
    calculatePokemonWidthFront,
  } = useCollection();

  const [modalOpen, setModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [firstPokemon, setFirstPokemon] = useState<Pokemon | null>(null);
  const [secondPokemon, setSecondPokemon] = useState<Pokemon | null>(null);

  const toggleModal = () => setModalOpen(!modalOpen);

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

      // Se o primeiro Pokémon ainda não foi definido, defina-o
      if (!firstPokemon) {
        setFirstPokemon(data);
      } else {
        // Se o segundo Pokémon ainda não foi definido, defina-o
        if (!secondPokemon) {
          setSecondPokemon(data);
        }
      }
    } catch (error) {
      console.error("Error searching Pokémon:", error);
      // Tratar erro aqui
    }
  };

  const handleClearSearch = () => {
    setSearchValue("");
    setFirstPokemon(null);
    setSecondPokemon(null);
  };

  return (
    <div>
      <Button color="danger" onClick={toggleModal}>
        Open Comparison
      </Button>

      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        className={`${className} modalCustom`}
        size="xl"
      >
        <ModalHeader className="custom-header" toggle={toggleModal}>
          Search for a Pokémon
        </ModalHeader>
        <ModalBody className="custom-body">
          <div className="body-search">
            <input
              type="text"
              value={searchValue}
              onChange={handleSearchInputChange}
            />
            <Button color="primary" onClick={handleSearchSubmit}>
              Search
            </Button>
          </div>

          <div className="battle">
            {firstPokemon && (
              <>
               <p className="name_first"> {firstPokemon.name} <img src={life} alt="" /></p>
                <img
                  src={generatePokemonImageUrlGifBack(firstPokemon.id)}
                  alt=""
                  className="pokeBack"
                  style={{
                    width: `${calculatePokemonWidthBack(firstPokemon)}`,
                  }}
                />

              </>
            )}
            {secondPokemon && (
              <>
               <p className="name_second"> {secondPokemon.name} <img src={life} alt="" /></p>
                <img
                  src={generatePokemonImageUrlGif(secondPokemon.id)}
                  alt=""
                  className="pokeFront"
                  style={{
                    width: `${calculatePokemonWidthFront(secondPokemon)}`,
                  }}
                />
              </>
            )}
          </div>
        </ModalBody>
        <ModalFooter className="custom-footer">
          <Button color="secondary" onClick={handleClearSearch}>
            Clear
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalPokemons;
