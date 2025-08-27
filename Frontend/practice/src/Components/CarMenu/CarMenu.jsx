import { useLoaderData } from 'react-router-dom';
import Style from './CarMenu.module.scss';
import ContextMain from '../ContextApr/Context';
import { useContext } from 'react';

function CarMenu() {
  const { records } = useLoaderData();
  const { dispatch } = useContext(ContextMain);

  return (
    <menu className={Style.similarCar}>
      <div className={Style.carSearch}>
        <h3>{records.map((car) => car.make)[0]}</h3>
      </div>
      {records.map((car, index) => (
        <RelatedCars car={car} key={index} dispatch={dispatch} />
      ))}
    </menu>
  );
}

function RelatedCars({ car, dispatch }) {
  const {
    primaryPhotoUrl: carImage,
    model,
    make,
    price,
    createdAt: releaseDate,
    displayColor,
  } = car;
  return (
    <div
      className={Style.similarCard}
      onClick={() => dispatch({ type: 'resetCar', payload: car })}
    >
      <div className="similarCar">
        <div className="carImage">
          <img src={carImage} alt="carImage" />
        </div>
        <p className={Style.carMenu}>{`${make}-${model}`}</p>
      </div>
    </div>
  );
}

export default CarMenu;
