import { DatePicker } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import dayjs from "dayjs";

const SearchBar = ({
  startDate,
  endDate,
  countries,
  onChangeHandler,
  // onChangeStartDate,
  // onChangeEndDate,
  // setCountrytitle,
  countryTitle,
  onSuggestHandler,
  setCountries,
  // endTime,
  // starTime,
  setStartDate,
  setEndDate,
  id,
  total,
  setTotal,
}) => {
  const today = dayjs();
  const heightAM = dayjs().set("hour", 8).startOf("hour");
  const sixPM = dayjs().set("hour", 18).startOf("hour");

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--back-end-sixt--p2d7k4xwpzzq.code.run/locations?q=${countryTitle.replace(
            " ",
            "%20"
          )}`
        );
        setCountries(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [countryTitle, setCountries]);

  return isLoading ? (
    <p> is Loading</p>
  ) : (
    <main>
      <section className="researchBar">
        <span className="research">
          <label htmlFor="country">Retrait et Retour</label>
          <div>
            <FontAwesomeIcon
              icon="fa-solid fa-magnifying-glass"
              rotation={90}
              size="xs"
              style={{ color: "white" }}
            />

            <input
              name="country"
              type="text"
              required
              minLength="4"
              value={countryTitle}
              onChange={onChangeHandler}
            />
          </div>
        </span>
        <div className="time">
          <p>Date de Départ</p>
          <span>
            <DatePicker
              views={["year", "month", "day"]}
              monthsShown={3}
              // value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              disablePast
            />

            <TimePicker
              views={["hours", "minutes"]}
              format="hh:mm"
              ampm={false}
              timeSteps={{ minutes: 30 }}
              minTime={heightAM}
              maxTime={sixPM}
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}

              // onChange={onChangeStartDate}
            ></TimePicker>
          </span>
        </div>
        <div className="time">
          <p>Date de Départ</p>
          <span>
            <DatePicker
              views={["year", "month", "day"]}
              onChange={(newValue) => setEndDate(newValue)}
              disablePast
            />
            <TimePicker
              views={["hours", "minutes"]}
              ampm={false}
              timeSteps={{ minutes: 30 }}
              // defaultValue={sixPM}
              minTime={heightAM}
              maxTime={sixPM}
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
            ></TimePicker>
          </span>
        </div>

        {countryTitle !== "" && endDate > startDate ? (
          <button
            className="orangeButton"
            onClick={() => {
              // setCountrytitle(countryTitle);
              // setStartDate(startDate);
              // setEndDate(endDate);
              setCountries([]);
              // setTotal(total);
              // setActive(!active);
            }}
          >
            <Link to="/offerlist">VOIR LES OFFRES</Link>
          </button>
        ) : (
          <button className="orangeButton" style={{ opacity: "60%" }}>
            VOIR LES OFFRES
          </button>
        )}
      </section>

      {countries.length > 0 ? (
        <section className="backdrop">
          <section className="modalSearch">
            {countries &&
              countries.map((country) => {
                return (
                  <div
                    key={country.id}
                    onClick={() => onSuggestHandler(country)}
                  >
                    {country.title}
                  </div>
                );
              })}
          </section>
        </section>
      ) : (
        ""
      )}
    </main>
  );
};
export default SearchBar;
