import {
  faCloud,
  faLocation,
  faSearch,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Style from './Weather.module.scss';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons/faLocationDot';
import { useEffect, useState } from 'react';
import { faCloudRain } from '@fortawesome/free-solid-svg-icons/faCloudRain';

const API_KEY = '065d5e0835b42b2b93cbf41401f158a4';
const weatherapi =
  'https://api.openweathermap.org/data/2.5/weather?q=Kumasi&appid=';

let condition;

function Weather() {
  const [data, setData] = useState();
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState(false);
  const [location, setLocation] = useState('');
  const [degree, setDegree] = useState('');
  const [cloud, setCloud] = useState('');
  const [condition2, setCondition] = useState('');

  switch (cloud) {
    case 'Clouds':
      condition = <img src="../../../public/images/cloudy.png" alt="" />;
      break;
    case 'Clear':
      condition = <img src="../../../public/images/sunny.png" alt="" />;
      break;
    default:
      condition = <img src="../../../public/images/thunder.png" alt="" />;
  }
  useEffect(() => {
    async function fetchData() {
      if (query.length < 3) return;
      if (!search) return;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`
      );
      if (!response.ok) {
        console.log('object');
      } else {
        const responseData = await response.json();
        setData(responseData);
        console.log(responseData);
        // setData(false);
      }
    }
    fetchData();
  }, [data, query]);

  function Searching() {
    // handleSearch();
    setSearch(true);
    setLocation(data.name);
    setDegree(Math.floor(Number(data.main.temp) - 273.15));
    setCloud(data.weather.map((el) => el.main)[0]);
    setQuery('');
  }
  function handleSearch() {
    // Search();
    // setQuery('');
    Searching();
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      // handleSearch();
      // setSearch(true);
      // setLocation(data.name);
      // setDegree(Math.floor(Number(data.main.temp) - 273.15));
      // setCloud(data.weather.map((el) => el.main)[0]);
      // setQuery('');
      Searching();
    }
  }

  return (
    <div className={Style.weather}>
      <div className={Style.location}>
        <FontAwesomeIcon icon={faLocationDot} />
        <span>{location ? location : 'Sunyani'}</span>
      </div>
      <div className={Style.search}>
        <input
          type="text"
          placeholder="Enter your lcation"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <span onClick={handleSearch} style={{ cursor: 'pointer' }}>
          <FontAwesomeIcon icon={faSearch} />
        </span>
      </div>
      <div className={Style.condition}>
        {cloud && degree && location ? (
          <span className={Style.condi}>{condition}</span>
        ) : (
          <FontAwesomeIcon icon={faCloud} />
        )}
        {/* <FontAwesomeIcon icon={faCloud} /> */}
        <p>{cloud ? cloud : 'Clouds'}</p>
        <span>
          {degree ? degree : '30'}
          &deg;
        </span>
      </div>
    </div>
  );
}

export default Weather;
