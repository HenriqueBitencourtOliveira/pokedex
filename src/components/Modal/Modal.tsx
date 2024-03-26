import { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import useCollection from "../../models/useCollection";
import life from "/life.png";
import { Pokemon } from "../../models/returnType";
import { useMediaQuery } from "react-responsive";

function ModalPokemons(props: any) {
  const { className } = props;
  const { calculatePokemonWidthBack, calculatePokemonWidthFront } =
    useCollection();

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

      if (!firstPokemon) {
        setFirstPokemon(data);
      } else {
        if (!secondPokemon) {
          setSecondPokemon(data);
        }
      }
    } catch (error) {
      console.error("Error searching Pokémon:", error);
    }
  };

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const handleClearSearch = () => {
    setSearchValue("");
    setFirstPokemon(null);
    setSecondPokemon(null);
  };

  return (
    <div>
      <Button color="danger" onClick={toggleModal}>
        Simulator
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
                <p className="name_first">
                  {" "}
                  {firstPokemon.name} <img src={life} alt="" />
                </p>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/${firstPokemon.id}.gif`}
                  alt=""
                  className="pokeBack"
                  style={{
                    width: `${
                      isMobile
                        ? calculatePokemonWidthBack(firstPokemon) * 0.6
                        : calculatePokemonWidthBack(firstPokemon)
                    }px`,
                  }}
                />
              </>
            )}
            {secondPokemon && (
              <>
                <p className="name_second">
                  {" "}
                  {secondPokemon.name} <img src={life} alt="" />
                </p>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${secondPokemon.id}.gif`}
                  alt=""
                  className="pokeFront"
                  style={{
                    width: `${
                      isMobile
                        ? calculatePokemonWidthFront(secondPokemon) * 0.6
                        : calculatePokemonWidthFront(secondPokemon)
                    }px`,
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
