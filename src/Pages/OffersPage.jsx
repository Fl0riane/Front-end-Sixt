import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Select from "../Components/Select";
import SearchBar from "../Components/SearchBar";
import OfferCard from "../Components/OfferCard";
import Header from "../Components/Header";
const OffersPage = ({
  pickUpId,
  startDate,
  endDate,
  countries,
  setCountries,
  startTime,
  setStartTime,
  setStartDate,
  setEndDate,
  endTime,
  setEndTime,
  countryTitle,
  setCountryTitle,
  onChangeHandler,
  onSuggestHandler,
  onChangeStartDate,
  onChangeEndDate,
  setPickUpId,
  setSelectType,
  selectType,
  setVisible,
  visible,
  setCarDetails,
  setTotal,
  total,
  dayOfLocation,
  setCarId,
}) => {
  const [IsLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--back-end-sixt--p2d7k4xwpzzq.code.run/rentaloffers?pickupStation=${pickUpId}&returnStation=${pickUpId}&pickupDate=${startDate}&returnDate=${endDate}`
        );

        setCount(response.data.length);
        setData(response.data);
        setCountries([]);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [pickUpId, endDate, startDate, setCountries]);

  return IsLoading ? (
    <p>Is loading</p>
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
        pickUpId={pickUpId}
        setPickUpId={setPickUpId}
        data={data}
        setData={setData}
        setactive={setActive}
        active={active}
        total={total}
      />

      <div className="offerPage">
        <section className="filter">
          <h1>{count} OFFRES</h1>

          <Select
            selectType={selectType}
            setSelectType={setSelectType}
            setCount={setCount}
            data={data}
          />
        </section>
        <section className="offer">
          {selectType.length > 0
            ? data
                .filter((car) => {
                  return selectType.includes(car.carGroupInfo.bodyStyle);
                })
                .map((car) => {
                  return (
                    <OfferCard
                      key={car.id}
                      car={car}
                      setVisible={setVisible}
                      visible={visible}
                      setCarDetails={setCarDetails}
                      dayOfLocation={dayOfLocation}
                      total={total}
                      setTotal={setTotal}
                      setCarId={setCarId}
                    />
                  );
                })
            : data.map((car) => {
                return (
                  <OfferCard
                    key={car.id}
                    car={car}
                    setVisible={setVisible}
                    visible={visible}
                    setCarDetails={setCarDetails}
                    dayOfLocation={dayOfLocation}
                    setTotal={setTotal}
                    total={total}
                    setCarId={setCarId}
                  />
                );
              })}
        </section>
      </div>
    </main>
  );
};
export default OffersPage;
