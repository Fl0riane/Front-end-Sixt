const offerCard = ({
  car,
  setVisible,
  visible,
  setCarDetails,
  dayOfLocation,

  setTotal,
}) => {
  const dayPrice = Number(car.prices.dayPrice.amount).toFixed(2);
  const totalPrice = Number(dayOfLocation * dayPrice).toFixed(2);
  const newTot = Number(totalPrice);

  return (
    <div
      key={car.id}
      onClick={() => {
        setVisible(!visible);
        setCarDetails(car);
        setTotal(newTot);
      }}
    >
      <h2>{car.headlines.description}</h2>
      <p>{car.headlines.shortSubline}</p>
      <p>{car.headlines.mileageInfo}</p>
      <div>
        <img src={car.images.small} alt="smPicture" />
      </div>
      <p> € {dayPrice}</p>
      <p> € {totalPrice} </p>
    </div>
  );
};
export default offerCard;
