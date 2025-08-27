import { useContext, useEffect, useState } from 'react';
import Style from './StarRating.module.scss';
import { createContext } from 'react';
import ContextMain from '../ContextApr/Context';
const Context = createContext();
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faStar } from '@fortawesome/free-solid-svg-icons';

function StarRating({ noGap = 2 }) {
  const [hover, setHover] = useState(0);
  // const [rating, setRating] = useState(false);
  const { rating, setRating } = useContext(ContextMain);
  return (
    <Context.Provider value={{ setHover, hover, rating, setRating }}>
      <div className={`${Style.starRating} `}>
        <div className={`${Style.starContainer} ${!noGap ? Style.noGap : ''}`}>
          {Array.from({ length: 5 }, (_, i) => i + 1).map((index) => (
            <Star key={index} number={index} />
          ))}{' '}
        </div>
        <span className={`${rating && Style.rateNumber} ${Style.padRight}`}>
          {hover}
        </span>
      </div>
    </Context.Provider>
  );
}

function Star({ number }) {
  const [starHover, setStarHover] = useState(false);

  const { setHover, hover, rating, setRating } = useContext(Context);
  useEffect(
    function () {
      if (!rating) {
        if (hover >= number) {
          setStarHover(true);
        } else {
          setStarHover(false);
        }
      }
    },
    [hover, number, rating]
  );
  function setHoverImage() {
    {
      !rating && (setStarHover((prev) => !prev), setHover(number));
    }
  }
  function handleRating() {
    setRating((prev) => !prev);
    console.log(number);
  }
  return (
    <div onClick={handleRating}>
      <div onMouseOver={setHoverImage} className={Style.starColor}>
        {starHover ? (
          <span className={Style.yellow}>
            <img src="../../../public/images/star.png" alt="" />
          </span>
        ) : (
          <FontAwesomeIcon icon={faStar} />
        )}
      </div>
    </div>
  );
}
export default StarRating;
