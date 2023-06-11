import { Link } from "react-router-dom";

import logoSixt from "../assets/img/sixt-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Header = () => {
  return (
    <header className="hea">
      <span>
        <img
          src={logoSixt}
          alt="logo sixt"
          className="logo"
          style={{ boxSizing: "border-box" }}
        />
      </span>
      <span>
        <span>
          <p>1</p> <h2>SELECTION DES VEHICULES</h2>
        </span>
        <span>
          <p>2</p>
          <h2>PROTECTION ET OPTIONS</h2>
        </span>
        <span>
          <p>3</p>CONDUCTEUR
        </span>
      </span>
      <span>
        <Link to="/backoffice">
          <FontAwesomeIcon
            icon="fa-solid fa-globe"
            size="xl"
            style={{ color: "#000000" }}
          />
          BACKOFFICE
        </Link>
      </span>
    </header>
  );
};

export default Header;
