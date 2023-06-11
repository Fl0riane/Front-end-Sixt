import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
/*------------import Pages-------------*/
import HomePage from "./Pages/HomePage";
import OffersPage from "./Pages/OffersPage";
import ConfigPage from "./Pages/Config/ConfigPage";
import PersonalDetailsPage from "./Pages/PersonalDetailsPage";
import BackOfficePage from "./Pages/BackOfficePage";
import Reservations from "./Pages/Reservations";
/*------------import Components------------*/
import CarDetails from "./Components/Cardetails/CarDetails";

/*----------------import Librairie--------*/

import {
  faMagnifyingGlass,
  faStar,
  faStarHalfStroke,
  faLocationDot,
  faClock,
  faPhone,
  faLink,
  faCamera,
  faAngleLeft,
  faAngleRight,
  faGlobe,
  faXmark,
  faCheck,
  faTrash,
  faChevronDown,
  faHeart as faSolidHeart,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faMagnifyingGlass,
  faStar,
  faStarHalfStroke,
  faSolidHeart,
  faLocationDot,
  faClock,
  faPhone,
  faLink,
  faCamera,
  faAngleLeft,
  faAngleRight,
  faGlobe,
  faXmark,
  faCheck,
  faTrash,
  faChevronDown
);

function App({ children }) {
  const [token, setToken] = useState(Cookies.get("sixt-Token") || null);

  const [countries, setCountries] = useState([]);
  const [countryTitle, setCountryTitle] = useState("");
  const [pickUpId, setPickUpId] = useState([]);
  const [data, setData] = useState([]);

  const onSuggestHandler = (elem) => {
    setCountryTitle(elem.title);
    setPickUpId(elem.id);
    setCountries([]);
  };
  const onChangeHandler = (event) => {
    setCountryTitle(event.target.value);
  };
  const today = dayjs();
  const [startDate, setStartDate] = useState(dayjs({ today }));
  const [endDate, setEndDate] = useState(dayjs({ today }));
  const OnReset = () => {
    setData(data);
  };
  const [selectType, setSelectType] = useState([]);
  const [visible, setVisible] = useState(false);

  const [carDetails, setCarDetails] = useState([]);
  const [carId, setCarId] = useState("");
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState([]);
  const [extraFees, setExtraFees] = useState([]);
  const [additionalCharges, setAdditionalCharges] = useState([]);

  const debut = new Date(startDate);
  const fin = new Date(endDate);

  const dayOfLocation = Math.ceil(
    (fin.getTime() - debut.getTime()) / 3600000 / 24
  );

  const setUser = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token);
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };

  return (
    <Router>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {children}
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                data={data}
                setData={setData}
                countries={countries}
                setCountries={setCountries}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                countryTitle={countryTitle}
                setCountryTitle={setCountryTitle}
                onChangeHandler={onChangeHandler}
                onSuggestHandler={onSuggestHandler}
                pickUpId={pickUpId}
                setPickUpId={setPickUpId}
                OnReset={OnReset}
                setSelectType={setSelectType}
                selectType={selectType}
              />
            }
          />
          <Route
            path="/offerlist"
            element={
              <OffersPage
                countries={countries}
                setCountries={setCountries}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                countryTitle={countryTitle}
                setCountryTitle={setCountryTitle}
                onChangeHandler={onChangeHandler}
                onSuggestHandler={onSuggestHandler}
                pickUpId={pickUpId}
                setPickUpId={setPickUpId}
                data={data}
                setData={setData}
                setSelectType={setSelectType}
                selectType={selectType}
                setVisible={setVisible}
                visible={visible}
                setCarDetails={setCarDetails}
                setTotal={setTotal}
                dayOfLocation={dayOfLocation}
                carId={carId}
                setCarId={setCarId}
              />
            }
          />
          <Route
            path="/offerconfig"
            element={
              <ConfigPage
                countries={countries}
                setCountries={setCountries}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                countryTitle={countryTitle}
                setCountryTitle={setCountryTitle}
                onChangeHandler={onChangeHandler}
                onSuggestHandler={onSuggestHandler}
                dayOfLocation={dayOfLocation}
                total={total}
                setTotal={setTotal}
                pickUpId={pickUpId}
                setPickUpId={setPickUpId}
                carDetails={carDetails}
                carId={carId}
                setCarId={setCarId}
                cart={cart}
                setCart={setCart}
                setExtraFees={setExtraFees}
                setAdditionalCharges={setAdditionalCharges}
              />
            }
          />
          <Route
            path="/personnaldetails"
            element={
              <PersonalDetailsPage
                endDate={endDate}
                startDate={startDate}
                today={today}
                cart={cart}
                carDetails={carDetails}
                dayOfLocation={dayOfLocation}
                extraFees={extraFees}
                additionalCharges={additionalCharges}
                total={total}
                debut={debut}
                fin={fin}
              />
            }
          />

          <Route
            path="/backoffice"
            element={<BackOfficePage token={token} setToken={setToken} />}
          />

          <Route
            path="/backoffice/reservations"
            element={<Reservations token={token} setToken={setToken} />}
          />
        </Routes>
        {visible && (
          <CarDetails
            setCarDetails={setCarDetails}
            carDetails={carDetails}
            setVisible={setVisible}
            visible={visible}
            total={total}
            setTotal={setTotal}
            dayOfLocation={dayOfLocation}
            pickUpId={pickUpId}
            setPickUpId={setPickUpId}
            carId={carId}
            setCarId={setCarId}
          />
        )}
      </LocalizationProvider>
    </Router>
  );
}

export default App;
