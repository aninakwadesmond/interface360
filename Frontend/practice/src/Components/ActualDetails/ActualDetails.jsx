import Style from './ActualDetails.module.scss';
import { useContext, useEffect, useState } from 'react';

// import { createContext } from 'react';
import StarRating from '../StarRating/StarRating';
import ContextMain2 from '../ContextApr/Context';
import ContextMain from '../ContextApr/Context';
import Button from '../Button/Button';
import CarContext from '../ContextApr/CarContext';

// //fontawesome
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleChevronLeft,
  faCircleChevronRight,
  faCoffee,
  faContactBook,
} from '@fortawesome/free-solid-svg-icons';

function ActualDetails({ setOpen }) {
  let { handleItemIncrease, handleSetImage, image, carObj } =
    useContext(ContextMain);

  useEffect(() => {
    setOpen((prev) => !prev);
    image = '';
  }, [carObj]);

  const [move, setMove] = useState(false);
  const [start, setStart] = useState(0);

  const [currentImage, setCurrentImage] = useState('');
  // const [image, setImage] = useState('../../../public/images/car10.jpg');
  useEffect(() => {}, []);
  const [rating, setRating] = useState(false);
  const { dispatch } = useContext(CarContext);
  function handleMoveImage() {
    setMove(true);
    setStart((prev) => prev >= -500 && prev - 100);
  }
  function handleMoveImageForward() {
    setMove(true);
    setStart((prev) => prev && prev + 100);
  }

  function handleSetSelected() {
    dispatch({
      type: 'addItem',
      payload: carObj,
    });

    handleItemIncrease();
  }
  const { primaryPhotoUrl: carImage, photoUrls: gallary } = carObj;

  return (
    <ContextMain2.Provider value={{ rating, setRating }}>
      <main className={Style.detailed}>
        <div className={Style.image}>
          <img src={image ? image : carImage} alt="selected car Image" />
        </div>
        <div className={Style.imagesContainer}>
          {gallary.map((image) => (
            <Image
              move={move}
              start={start}
              image={image}
              handleSetImage={handleSetImage}
            />
          ))}
          <FontAwesomeIcon
            icon={faCircleChevronRight}
            className={Style.imageMove}
            onClick={handleMoveImage}
          />
          <FontAwesomeIcon
            icon={faCircleChevronLeft}
            className={Style.imageMoveLeft}
            onClick={handleMoveImageForward}
          />
          {/* <FontAwesomeIcon icon={}
            className={Style.imageMove}
            src="../../../public/images/car7.jpg"
            alt=""
            onClick={handleMoveImageForward}
          /> */}
          {/* <img
            className={Style.imageMoveLeft}
            src="../../../public/images/car7.jpg"
            alt=""
            onClick={handleMoveImage}
          /> */}
        </div>
        <div className={Style.starCount}>
          <StarRating />
          {rating && (
            <Button classname={Style.addChart}>
              <span onClick={handleSetSelected}>Add to chart +</span>
            </Button>
            // <div className={Style.addChart}>
            //   Add to chart <span>+</span>
            // </div>
          )}
        </div>
      </main>
    </ContextMain2.Provider>
  );
}

function Image({ move, start, image, handleSetImage }) {
  // const { image, handleSetImage } = useContext(ContextMain);
  // console.log(number);
  return (
    <img
      style={move ? { transform: `translateX(${start}%)` } : {}}
      src={image}
      alt=""
      onClick={(e) => {
        handleSetImage(e.target.attributes[1].value);
      }}
    />
  );
}

export default ActualDetails;
