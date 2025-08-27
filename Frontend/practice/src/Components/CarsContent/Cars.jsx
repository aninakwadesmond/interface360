import { Link, useLoaderData } from 'react-router-dom';
import Style from './cars.module.scss';
import StarRating from '../StarRating/StarRating';
import { useContext, useEffect, useReducer, useState } from 'react';
import CartItems from '../ChartItems/CartItems';
import ChangeLink from '../ContextApr/Link';
import ContextMain from '../ContextApr/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
const car2 = [
  { id: 1, carImage: '../../../public/images/car10.jpg' },
  { id: 2, carImage: '../../../public/images/car10.jpg' },
  { id: 3, carImage: '../../../public/images/car10.jpg' },
];
const sortContent = {
  new: '',
  used: '',
  most: '',
  least: '',
  old: '',
  newest: '',
};

const api = 'ZrQEPSkKYW5pbmFrd2FoZGVzbW9uZDNAZ21haWwuY29t';
// const initialState = {
//   searchType: [],
//   checkSearch: false,
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case 'search':
//       return { ...state, checkSearch: true, searchType: action.payload };
//   }
// }

function Cars({ data }) {
  const { query, searchType, checkSearch, sort, dispatch2 } =
    useContext(ContextMain);

  const cars = data;
  console.log(cars);

  useEffect(
    // https://auto.dev/api/listings?apikey=ZrQEPSkKYW5pbmFrd2FoZGVzbW9uZDNAZ21haWwuY29t&price_max=60000&year_min=2016&make=Audi&city=Los%20Angeles&state=CA&location=Los%20Angeles,%20CA&latitude=34.0522342&longitude=-118.2436849&radius=50&mileage=45000&driveline[]=AWD&condition[]=used&condition[]=certified%20pre-owned&exterior_color[]=black&page=1
    function () {
      async function fetchData() {
        if (query.length >= 3 || sort) {
          let number = +sort.split('.')[0];
          let sortText = sort.split('.')[1];
          console.log(number, sortText);
          const response = await fetch(
            `https://corsproxy.io/?${encodeURIComponent(
              // `https://auto.dev/api/listings?apikey=${api}&make=${query}`
              `https://auto.dev/api/listings?apikey=${api}&sort_filter=${
                number > 2 ? `${sortText}` : ''
              }&price_max=60000&year_min=2016&make=${query}&condition[]=${
                number === 1 || number === 2 ? `${sortText}` : 'new'
              }`
            )}`
          );
          if (!response.ok) {
            throw new Error('Not available');
          } else {
            const responseData = await response.json();
            dispatch2({ type: 'search', payload: responseData.records });
          }
        }
      }
      fetchData();
    },
    [query, sort]
  );

  const { openModal } = useContext(ContextMain);
  const { link, Bookmark } = useContext(ChangeLink);

  return (
    <>
      {/* {link && <CartItems carsSelelcted={Bookmark} />} */}
      <div className={Style.test}>
        <div className={Style.grid}>
          {checkSearch
            ? searchType.map((car) => (
                <Card car={car} />
                // <Link to={`/cars/${car.make}`}>
                //   <Card car={car} />
                // </Link>
              ))
            : cars.map((car) => (
                <Card car={car} />
                // <Link to={`/cars/${car.make}`}>
                //   <Card car={car} />
                // </Link>
              ))}
          {/* car2.map((el)=> (
        <Link to="/cars/car-2">
          <Card car={el} />
        </Link>
        )) */}
          {/* {!openModal
          ? car2.map((el) => <Card car={el} />)
          : car2.map((el) => (
              <Link to="/cars/car-2">
                <Card car={el} />
              </Link>
            ))} */}
          {/* <Link to="/cars/car-2">
          <Card />
        </Link> */}
          {/* <Card />
        <Card /> */}
        </div>
      </div>
    </>
  );
}

function Card({ car }) {
  const {
    primaryPhotoUrl: carImage,
    model,
    make,
    price,
    createdAt: releaseDate,
    displayColor,
    photoUrls: galary,
  } = car;
  const { dispatch3 } = useContext(ChangeLink);
  const { dispatch } = useContext(ContextMain);

  // const [bookmark, setBookmark] = useState(false);
  return (
    <>
      <Link to={`/cars/${car.make}`}>
        <div
          className={`${Style.card} card`}
          onClick={() => dispatch({ type: 'carObj', payload: car })}
        >
          <div className="image">
            <img src={carImage || galary[0]} alt="carImage" />
          </div>
          <div className={Style.pricing}>
            <div className={Style.carModel}>
              <h5>{`${make}-${model}`}</h5>
              <p>{make}</p>
            </div>
            <div className={Style.priceRate}>
              <span className={Style.price}>{`${price} USD`}</span>{' '}
              <StarRating noGap={0} />
            </div>
            <div className={Style.releaseDate}>
              <span>
                Release Date: <span>{releaseDate.split('T')[0]}</span>
              </span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch3({ type: 'addbook', payload: car });
                }}
              >
                <FontAwesomeIcon icon={faBookmark} />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
export default Cars;
