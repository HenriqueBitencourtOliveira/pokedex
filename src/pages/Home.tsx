import { Link } from "react-router-dom";
import banner from "/banner.png";
export default function Home() {
  return (
    <div className="home_items">
      <div className="text_home">
        <h2>
          <strong>Encontre</strong> todos os seus <strong>pokémons</strong>{" "}
          favoritos.
        </h2>

        <p>
          Você pode conhecer vários tipos de Pokémons e seus pontos fortes.
        </p>

        <Link to="/pokedex">
          <button>Ver pokémons</button>
        </Link>
      </div>
      <div className="banner_img">
        <img src={banner} alt="" />
      </div>
    </div>
  );
}
