import Style from './AboutCar.module.scss';
import CarContext from '../ContextApr/CarContext';
import { useContext } from 'react';
import ContextMain from '../ContextApr/Context';
function AboutCar() {
  const { setBuy, setMessage } = useContext(CarContext);
  const { carObj } = useContext(ContextMain);

  function handleOpen() {
    setBuy(true);
  }
  function handleMessage() {
    setMessage(true);
  }
  const {
    primaryPhotoUrl: carImage,
    photoUrls: gallary,
    model,
    make,
    price,
    year,
    // createdAt: releaseDate,
    // displayColor,
  } = carObj;
  return (
    <main>
      <div className={Style.carContent}>
        <div className={Style.carName}>
          <h2>{`${make}-${model}`}</h2>
          <p>{make}</p>
          <span>year: </span>
          <p>{year}</p>
        </div>
        <div className={Style.carPrice}>
          <p>{price}</p>
        </div>

        <div className={Style.operations}>
          <button title="buy" onClick={handleOpen}>
            buy now
          </button>
          {/* <button title="contact">Contact Seller</button> */}
          <button title="message" onClick={handleMessage}>
            message us
          </button>
        </div>
      </div>
    </main>
  );
}

export default AboutCar;
