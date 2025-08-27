// import Style from './sidemenu.moodule.scss';
import Style from './sidemenu.module.scss';
import ChangeLink from '../ContextApr/Link';
import { useContext, useEffect } from 'react';
import ContextMain from '../ContextApr/Context';
import { useLoaderData } from 'react-router-dom';

const carMakes = [
  'Toyota',
  'Volkswagen',
  'Hyundai-kia',
  'Mercedes-Benz',
  'BMW',
  'Honda',
  'Ford',
  'Nissan',
  'Chevrolet',
  'Tesla',
];
const api = 'ZrQEPSkKYW5pbmFrd2FoZGVzbW9uZDNAZ21haWwuY29t';
function SideMenu({ header, color }) {
  const { sideQuery, dispatch, query, dispatch2 } = useContext(ContextMain);
  // const { color } = useLoaderData();
  console.log(color);
  useEffect(
    function () {
      async function fetchData() {
        const response = await fetch(
          `https://corsproxy.io/?${encodeURIComponent(
            `https://auto.dev/api/listings?apikey=${api}&make=${sideQuery}`
          )}`
        );
        if (!response.ok) {
          throw new Error('Not available');
        } else {
          const responseData = await response.json();
          console.log(responseData.records);
          dispatch2({ type: 'search', payload: responseData.records });
        }
      }
      fetchData();
    },
    [sideQuery]
  );

  // console.log(sideQuery);
  const { handleSetLink } = useContext(ChangeLink);
  return (
    <menu className={Style.menu}>
      <h3>{header}</h3>
      <ul value={sideQuery}>
        {carMakes.map((car) => (
          <SearchBar car={car} sideQuery={sideQuery} dispatch={dispatch} />
        ))}
      </ul>
      {/* <div className={Style.color}>
        <p>Color panel</p>
        <div className={Style.colorContainer}>
          {color.map((el) => (
            <ColorPanel colorname={el} key={el} />
          ))}
        </div>
      </div> */}
      <div className={Style.bookmark} onClick={handleSetLink}>
        <span>📑</span>
        <span>Bookmark</span>
      </div>
    </menu>
  );
}

function ColorPanel({ colorname }) {
  const { value, closest_named_hex } = colorname.name;
  const { sortColor, dispatch } = useContext(ContextMain);
  return (
    <span
      style={{ backgroundColor: closest_named_hex }}
      title={colorname}
      value={sortColor}
      onClick={(e) => {
        console.log(e);
        dispatch({ type: 'sortColor', payload: value });
      }}
    ></span>
  );
}

function SearchBar({ car }) {
  const { dispatch } = useContext(ContextMain);

  return (
    <li
      value={car}
      onClick={(e) => {
        return dispatch({ type: 'sideQuery', payload: e.target.textContent });
      }}
    >
      {car}
    </li>
  );
}

export default SideMenu;
