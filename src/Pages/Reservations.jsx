import { useState, useEffect } from "react";
import axios from "axios";
import logoSixt from "../assets/img/sixt-logo.png";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Reservations = ({ setToken }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [count, setCount] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  console.log(data);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--back-end-sixt--p2d7k4xwpzzq.code.run/backoffice/reservations`
        );

        setCount(response.data.count);
        setData(response.data.reservations);

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return IsLoading ? (
    <p>Is loading</p>
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
          <button
            onClick={() => {
              Cookies.remove("sixt-Token");
              setToken("");
              navigate("/");
            }}
          >
            DECONNEXION
          </button>
        </div>
      </header>

      <div className="reservation">
        {data.map((reservation) => {
          return (
            <section key={reservation._id}>
              <div>
                <span>
                  <h2>Numéro de réservation</h2>
                  <p> {reservation.resaNumber}</p>
                </span>
                <span>
                  <h2>Date de réservation </h2> <p>{reservation.today}</p>
                </span>
                <span>
                  <h2>Prénom</h2> <p>{reservation.firstname}</p>
                </span>
                <span>
                  <h2>Nom</h2>
                  <p>{reservation.lastname}</p>
                </span>
                <span>
                  <h2>Nombre de jour(s) reservé(s) </h2>{" "}
                  <p>{reservation.dayOfLocation}</p>
                </span>
                <span>
                  <h2> Total</h2>
                  <p>{`${reservation.total} €`}</p>
                </span>
                <button
                  onClick={() => {
                    setVisible(!visible);
                  }}
                >
                  <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
                </button>
                <button>
                  <FontAwesomeIcon icon="fa-solid fa-trash" />
                </button>
              </div>

              {visible && (
                <div>
                  <span>
                    <p>{reservation.carDetails.headlines.longSubline}</p>
                    <img
                      src={reservation.carDetails.images.small}
                      alt="smPicture"
                    />
                  </span>

                  <span>
                    <h2>Frais Inclut</h2>
                    {reservation.extraFees.map((elem, index) => {
                      return (
                        <h3 key={index}>
                          <p>{elem.title}</p>
                          <p>{`${elem.price.amount}€`}</p>
                        </h3>
                      );
                    })}
                  </span>
                  <span>
                    <h2>Options</h2>
                    {reservation.cart.map((option) => {
                      return (
                        <h3 key={option.id}>
                          <p>{option.title}</p>
                          <p>{`${option.price.amount} €`}</p>
                        </h3>
                      );
                    })}
                  </span>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </main>
  );
};
export default Reservations;
