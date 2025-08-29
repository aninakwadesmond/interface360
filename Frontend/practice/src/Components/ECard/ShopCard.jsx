import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StarRating from '../StarRating/StarRating';
import {
  faBasketShopping,
  faRankingStar,
  faShoppingCart,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import Style from './shopping.module.scss';
import { json, Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Ecom } from '../ContextApr/Ecom';
import Shop from '../ContextApr/Shop';
import Search from '../Links/Search';

function ShopCard({ allData }) {
  // const { allData } = useContext(Ecom);

  // const { dispatch } = useContext(Shop);

  const { category, price, title, thumbnail: image } = allData;
  const [search2, setSearch] = useState('');

  function handleCart(e) {
    e.preventDefault();
    setSearch({
      category,
      price,
      title,
      image,
    });
  }

  useEffect(() => {
    async function fetchData() {
      if (!search2) return;
      const response = await fetch(
        'https://interface360.onrender.com/shop/cart',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ category, price, title, image }),
        }
      );
      if (!response.ok)
        return json({ message: 'Error message ' }, { status: 404 });
      else {
        return;
        //nore
      }
    }
    fetchData();
  }, [search2]);
  return (
    <Link to="/shop/shopping/1">
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
    </Link>
  );
}

export default ShopCard;
