import Style from './Details.module.scss';
import SideMenu from '../SideMenu/SideMenu';
import CarMenu from '../CarMenu/CarMenu';
import ActualDetails from '../ActualDetails/ActualDetails';
import AboutCar from '../AboutCar/AboutCar';
// import {FontAwesome}

// import { faComment, faMenu } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Overlay from '../overlay/Overlay';
function Details() {
  const [open, setOpen] = useState(true);

  // useEffect()
  function handleChange() {
    setOpen((prev) => !prev);
  }
  return (
    <div className={Style.details}>
      {!open && <Overlay />}
      {}
      <div className={Style.menu} onClick={handleChange}>
        {/* <FontAwesomeIcon icon={faMenu} /> */}
        {open ? (
          <img src="./images/menu.png" alt="" />
        ) : (
          <img src="./images/close-window.png" alt="" />
        )}
      </div>
      <div className={Style.brands} style={!open ? { display: 'block' } : {}}>
        <CarMenu />
      </div>
      <div className={Style.carDetails}>
        <ActualDetails setOpen={setOpen} />
      </div>
      <div className={Style.InfoCars}>
        <AboutCar />
      </div>
    </div>
  );
}

export default Details;
