import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

import imgPokemon from "/pokemon.svg";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="custom-navbar" color="primary" light expand="md">
        <NavbarBrand href="/">
          <img src={imgPokemon} alt="" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className="justify-content-end ">
          <Nav className="ml-auto p-2" navbar>
            <NavItem className="px-3">
              <NavLink>
                <Link
                  className={`h5 ${pathname === "/" ? "active" : ""}`}
                  to="/"
                >
                  Home
                </Link>
              </NavLink>
            </NavItem>
            <NavItem className="px-3">
              <NavLink>
                <Link
                  className={`h5 ${pathname === "/pokedex" ? "active" : ""}`}
                  to="/pokedex"
                >
                  Pokedex
                </Link>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
