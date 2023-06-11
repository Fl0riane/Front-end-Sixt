import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logoSixt from "../assets/img/sixt-logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const BackOffice = ({ setToken, token }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrormessage] = useState("");
  const [password, setPassword] = useState("");

  return token ? (
    <Navigate to="/backoffice/reservations" />
  ) : (
    <main className="container">
      <header>
        <div>
          <img
            src={logoSixt}
            alt="logo sixt"
            className="logo"
            style={{ boxSizing: "border-box" }}
          />
        </div>
        <div>
          <Link to="/backoffice">
            <FontAwesomeIcon
              icon="fa-solid fa-globe"
              size="xl"
              style={{ color: "#000000" }}
            />
            BACKOFFICE
          </Link>
        </div>
      </header>
      <div className="password form">
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            setErrormessage("");

            try {
              const response = await axios.post(
                "https://site--back-end-sixt--p2d7k4xwpzzq.code.run/backoffice",
                {
                  password: password,
                }
              );
              if (response.data) {
                Cookies.set("sixt-Token", response.data.token);
                setToken(response.data.token);
                console.log(token);
                alert("vous etes connecté");
                console.log(response.data);
              }

              navigate("/backoffice/reservations");
            } catch (error) {
              setErrormessage("Accès non autorisé");
            }
          }}
        >
          <input
            type="password"
            placeholder="Entrer le mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button type="submit" className="whiteButton">
            SOUMETTRE
          </button>
        </form>
        <div>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
      </div>
    </main>
  );
};
export default BackOffice;
