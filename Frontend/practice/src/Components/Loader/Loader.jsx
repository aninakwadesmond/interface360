import { useEffect, useState } from 'react';
import Overlay from '../overlay/Overlay';
import Style from './loader.module.scss';

const style = ['', '', ''];
function Loader() {
  const [current, setCurrent] = useState(-1);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrent((prev) => (prev < style.length ? prev + 1 : 0));
    }, 500);
    return function () {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <div className={Style.loadingContainer}>
      <Overlay />
      <div className={Style.loading}>
        <p>Loading </p>
        <div className={Style.load}>
          {style.map((el, index) => (
            <span className={index === current ? Style.active : ''}></span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Loader;
