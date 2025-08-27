import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StarRating from '../StarRating/StarRating';
import {
  faBasketShopping,
  faRankingStar,
  faShoppingCart,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import Style from './s.module.scss';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Ecom } from '../ContextApr/Ecom';
import Shop from '../ContextApr/Shop';

function Shop2({ allData }) {
  // const { allData } = useContext(Ecom);

  // const { dispatch } = useContext(Shop);

  let { category, price, title, thumbnail: image } = allData;

  function handleCart(e) {
    e.preventDefault();
  }
  return (
    <div className={Style.cart}>
      <div className={Style.image}>
        <img src={image} />
      </div>
      <div className={Style.text}>
        <span>{category}</span>
        <p className={Style.name}>{title} </p>
        {/* <StarRating /> */}
        <p className={Style.rating}>
          {Array.from({ length: 5 }, (_, index) => index).map((el) => (
            <FontAwesomeIcon icon={faStar} />
          ))}
        </p>
        <p>${price}</p>
      </div>
      <p className={Style.bookmark} onClick={(e) => handleCart(e)}>
        <FontAwesomeIcon icon={faShoppingCart} />
      </p>
    </div>
  );
}

export default Shop2;
