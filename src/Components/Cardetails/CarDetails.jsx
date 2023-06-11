import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./carDetails.css";
import { Link } from "react-router-dom";
const CarDetails = ({
  setVisible,
  visible,
  carDetails,
  total,

  setCarId,
}) => {
  let backGroundImg = carDetails.images.medium;
  const title = carDetails.headlines.longSubline;
  const titleToUpperCase = title.toUpperCase();

  const selectCarId = carDetails.id;
  return (
    <div className="modal-root">
      <div className="modal">
        <button
          style={{ color: "white", textAlign: "end", marginBottom: "10px" }}
          onClick={() => {
            setVisible(!visible);
          }}
        >
          <FontAwesomeIcon
            icon="fa-solid fa-xmark"
            size="xl"
            style={{ color: "#fafafa" }}
          />
        </button>
        <div>
          <section
            className="leftPart"
            style={{
              backgroundImage: `url(${backGroundImg})`,
              backgroundRepeat: "no-repeat",
            }}
          >
            <h2>{carDetails.headlines.longSubline}</h2>
            <div>
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
          <section className="rightPart">
            <div>
              <h2>TOTAL</h2>
              <h1> € {total}</h1>
            </div>

            <Link to="offerconfig">
              <button
                onClick={() => {
                  setVisible(!visible);
                  setCarId(selectCarId);
                }}
                className="orangeButton"
              >
                SELECTIONNER
              </button>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};
export default CarDetails;
