import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Components/Header";
const Clientdetails = ({
  cart,
  total,
  today,
  carDetails,
  endDate,
  startDate,
  dayOfLocation,
  extraFees,
  debut,
}) => {
  const [civility, setCivility] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [country, setCountry] = useState("");
  const [dateOfBirthday, setDateOfBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [society, setSociety] = useState("");

  const [errorMessage, setErrormessage] = useState("");
  const navigate = useNavigate();

  return (
    <main className="container">
      <Header />
      <div className="form">
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            setErrormessage("");
            try {
              const response = await axios.post(
                "https://site--back-end-sixt--p2d7k4xwpzzq.code.run/personnaldetails",
                {
                  civility: civility,
                  society: society,
                  firstname: firstname,
                  lastname: lastname,
                  email: email,
                  street: street,
                  country: country,
                  dateOfBirthday: dateOfBirthday,
                  phone: phone,
                  zipCode: zipCode,
                  carDetails: carDetails,
                  extraFees: extraFees,
                  cart: cart,
                  endDate: endDate,
                  startDate: startDate,
                  today: today,
                  total: total,
                  dayOfLocation: dayOfLocation,
                }
              );
              if (response.data) {
                alert(`votre reservation est enregistré ref`);
                navigate("/");
              }

              console.log(response.data);
            } catch (error) {
              console.log(error.message);
              console.log(error.response.status);
              if (error.response.status === 409) {
                setErrormessage("Cette adresse email est déjà utilisée");
              } else if (error.response.data.message === "Missing parameters") {
                setErrormessage("Veuillez remplir tous les champs");
              }
            }
          }}
        >
          <div className="formulaire">
            <h2>INFORMATIONS PERSONNELLES</h2>
            <section>
              <span className="ratio">
                <label htmlFor="M">M.</label>
                <input
                  type="radio"
                  name="M"
                  value="Monsieur"
                  onChange={(e) => setCivility(e.target.value)}
                />
                <label htmlFor="Mme">Mme</label>
                <input
                  type="radio"
                  name="Mme"
                  value="Madame"
                  onChange={(e) => setCivility(e.target.value)}
                />
              </span>
              <input
                type="text"
                placeholder="Société"
                value={society}
                onChange={(e) => setSociety(e.target.value)}
              />
              <input
                type="text"
                placeholder="Prénom"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
              <input
                type="mail"
                placeholder="Adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Rue"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required
              />
              <h1>DATE DE NAISSANCE</h1>
              <input
                type="date"
                placeholder="JJ MM AAAA"
                value={dateOfBirthday}
                onChange={(e) => setDateOfBirthday(e.target.value)}
                required
              />
            </section>
            <p>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </p>
            <section>
              <input
                type="text"
                placeholder="Nom de famille"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
              <span>
                <input
                  type="text"
                  placeholder="numero de telephone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </span>

              <span>
                <input
                  type="text"
                  placeholder="Code postal "
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Ville"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
              </span>
            </section>
          </div>

          <div className="recap">
            <h2>VERIFIER ET RESERVER</h2>
            <section>
              <span>
                <span>{carDetails.headlines.description}</span>
                <span>{carDetails.headlines.shortSubline}</span>
                {/* <h3>{startDate}</h3>
                <h3>{endDate}</h3> */}
              </span>
              {/* <span>{debut}</span> */}
              <span>
                <img src={carDetails.images.small} alt="voiture" />
              </span>
              <section>
                <h3>VOTRE OFFRE INCLUT</h3>

                {extraFees.length > 0 ? (
                  <div>
                    {extraFees.map((elem, index) => {
                      return (
                        <div key={index}>
                          <p>{elem.title}</p>
                          <p>{`${elem.price.amount}€`}</p>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p>""</p>
                )}
              </section>
              <section>
                <h3>EXIGENCES POUR LES CONDUCTEUR</h3>

                <p>
                  {`Conducteur doit être agé d'au moins
              ${carDetails.carGroupInfo.driverMinAge} ans`}
                </p>
              </section>
              <section>
                <h3>PERIODE DE LOCATION</h3>
                <div>
                  {`Durée de locations
              ${dayOfLocation} jours 
              ${carDetails.prices.dayPrice.amount}`}
                </div>
                <div>
                  <p>{`€ ${total}`} </p>
                </div>
              </section>
              <section>
                <h3>PROTECTIONS ET OPTIONS</h3>
                {cart.length > 0 ? (
                  <div>
                    {cart.map((option) => {
                      return (
                        <div key={option.id}>
                          <p>{option.title}</p>
                          <p>{`${option.price.amount} €`}</p>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p>""</p>
                )}
              </section>
              <section>
                <h3>FRAIS</h3>
              </section>
              <section>{` ${total} €`}</section>
            </section>
            <button type="submit" className="orangeButton">
              RESERVER
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};
export default Clientdetails;
