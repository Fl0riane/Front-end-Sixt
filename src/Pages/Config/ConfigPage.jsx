import "./configPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../../Components/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import Header from "../../Components/Header";
const ConfigPage = ({
  countries,
  setCountries,
  startDate,
  setStartDate,
  startTime,
  setStartTime,
  endDate,
  setEndDate,
  endTime,
  setEndTime,
  countryTitle,
  setCountryTitle,
  onChangeHandler,
  onSuggestHandler,
  onChangeStartDate,
  onChangeEndDate,
  carDetails,
  carId,
  dayOfLocation,
  setPickUpId,
  setTotal,
  total,
  cart,
  setCart,
  setExtraFees,
  setAdditionalCharges,
}) => {
  const [IsLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  console.log("log in config", carId);
  const offerId = carDetails.id;
  console.log(data);

  const handleAddCartOption = (addOption, priceInput, unit) => {
    const cartCopy = [...cart];
    const presentOption = cartCopy.find((option) => option.id === addOption.id);
    if (presentOption) {
      const tab = cartCopy.filter((option) => option.id !== addOption.id);
      setCart(tab);
      let totalPrice = 0;
      let optionPrice = priceInput * dayOfLocation;

      if (unit === "jour") {
        totalPrice = total - optionPrice;
        setTotal(totalPrice);
      } else {
        totalPrice = total - priceInput;
        setTotal(totalPrice);
      }
    } else {
      cartCopy.push(addOption);
      let totalPrice = 0;
      let optionPrice = priceInput * dayOfLocation;

      if (unit === "jour") {
        totalPrice = total + optionPrice;
        setTotal(totalPrice);
      } else {
        totalPrice = total + priceInput;
        setTotal(totalPrice);
      }

      setCart(cartCopy);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://site--back-end-sixt--p2d7k4xwpzzq.code.run/offerconfig",
          {
            offerId: offerId,
          }
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [offerId]);
  return IsLoading ? (
    <p>Is Loading</p>
  ) : (
    <main className="container">
      <Header />
      <SearchBar
        countries={countries}
        setCountries={setCountries}
        startDate={startDate}
        setStartDate={setStartDate}
        startTime={startTime}
        setStartTime={setStartTime}
        endDate={endDate}
        setEndDate={setEndDate}
        endTime={endTime}
        setEndTime={setEndTime}
        countryTitle={countryTitle}
        setCountryTitle={setCountryTitle}
        onChangeHandler={onChangeHandler}
        onSuggestHandler={onSuggestHandler}
        onChangeStartDate={onChangeStartDate}
        onChangeEndDate={onChangeEndDate}
        setPickUpId={setPickUpId}
        data={data}
        setData={setData}
      />
      <div>
        <section>
          <div className="imgBloc">
            {data.splashImages.map((url, index) => {
              return <img key={index} src={url} alt="img" />;
            })}
          </div>

          <div style={{ backgroundColor: "black", color: "white" }}>
            <h2>{carDetails.headlines.longSubline}</h2>
            <span>{carDetails.carGroupInfo.maxPassengers} sièges</span>
            <span>{carDetails.carGroupInfo.doors} portes</span>
            {carDetails.carGroupInfo.automatic === true ? (
              <span>Automatic</span>
            ) : (
              <span>Manuel</span>
            )}
            {carDetails.carGroupInfo.airCondition === true ? (
              <span>Climatisation</span>
            ) : (
              ""
            )}
            <span>{carDetails.carGroupInfo.driverMinAge} ans</span>
          </div>
        </section>

        <section className="buttomPart">
          <span>
            <div>
              <h2> CHOISISSEZ VOTRE PROTECTION ET VOS OPTIONS</h2>
              <h3>VOTRE OFFRE INCLUT</h3>
              <div>
                {data.includedCharges.map((elem, index) => {
                  return (
                    <div key={index}>
                      <FontAwesomeIcon
                        icon="fa-solid fa-check"
                        style={{ color: "#000205" }}
                      />
                      {elem.title}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="optionsBloc">
              <h2>CHOISISSEZ VOS OPTIONS</h2>
              <section className="options">
                {data.additionalCharges.map((elem) => {
                  return (
                    <div
                      key={elem.id}
                      className="optionCard"
                      onClick={() => {
                        handleAddCartOption(
                          elem,
                          elem.price.amount,
                          elem.price.unit
                        );
                      }}
                    >
                      <h2>{elem.title}</h2>
                      <p>{elem.description}</p>
                      <span>{elem.price.amount} €</span>
                      <span>/ {elem.price.unit}</span>
                      <h3>{elem.price.taxInfo}</h3>
                    </div>
                  );
                })}
              </section>
            </div>
          </span>
          <span>
            <div className="cart">
              {cart.length === 0 ? (
                <p>Vous n'avez pas sectionné d'option</p>
              ) : (
                <div>
                  {cart.map((option) => {
                    return (
                      <div key={option.id}>
                        <span>{option.title}</span>
                        <span>{option.price.amount} €</span>
                      </div>
                    );
                  })}
                </div>
              )}
              <h3>TOTAL</h3>
              <h1> {total}€ </h1>
              <div></div>
              <Link to="/personnaldetails">
                <button
                  onClick={() => {
                    setExtraFees(data.extraFees);
                  }}
                  className="whiteButton"
                >
                  CONTINUER
                </button>
              </Link>
            </div>
          </span>
        </section>
      </div>

      {data.length === 0 && (
        <div>
          <p>Votre cession à expirée veuillez recommencer </p>
          <Link to="/">retour à l'accueil</Link>
        </div>
      )}
    </main>
  );
};

export default ConfigPage;
