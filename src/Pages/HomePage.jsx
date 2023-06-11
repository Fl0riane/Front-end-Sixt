import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logoSixt from "../assets/img/sixt-logo.png";
import heroImg from "../assets/img/heroImg.jpeg";

import SearchBar from "../Components/SearchBar";

const Home = ({
  countries,
  setCountries,
  countryTitle,
  startDate,
  startTime,
  endTime,
  endDate,
  onChangeHandler,
  onSuggestHandler,
  onChangeStartDate,
  onChangeEndDate,
  pickUpId,
  setStartDate,
  setStartTime,
  setEndDate,
  setEndTime,
  setCountryTitle,
  data,
  setData,
  setPickUpId,
  total,
  setTotal,
  duration,
  setDuration,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--back-end-sixt--p2d7k4xwpzzq.code.run/"
        );
        console.log(response);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p> is Loading</p>
  ) : (
    <div className="container">
      <header>
        <div>
          <img
            src={logoSixt}
            alt="logo sixt"
            className="logo"
            style={{ boxSizing: "border-box" }}
          />
          <button>RENT</button>
          <button>SHARE </button> <button>RIDE</button>
          <button>SIXT +</button>
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
        pickUpId={pickUpId}
        setPickUpId={setPickUpId}
        data={data}
        setData={setData}
        duration={duration}
        setDuration={setDuration}
        total={total}
        setTotal={setTotal}
      />

      <div className="hero">
        <img src={heroImg} alt="" />
      </div>
    </div>
  );
};
export default Home;
