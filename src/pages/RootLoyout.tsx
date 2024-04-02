import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/Navbar/Navbar";

export default function RootLayout() {
  const { pathname } = useLocation();

  return (
    <div
      className={`background_home ${
        pathname === "/pokedex" ? "background_pokedex" : ""
      }`}
    >
      <NavBar />

      <main>
        <Outlet />
      </main>
    </div>
  );
}
