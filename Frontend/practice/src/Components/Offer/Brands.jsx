import { Children } from 'react';
import Style from './brand.module.scss';

function Brands({ image, children }) {
  return (
    <div className={Style.brand}>
      <div className={Style.overlay}></div>
      <div className={Style.image}>
        <img src={image} alt="" />
      </div>
      <div className={Style.text}>{children}</div>
    </div>
  );
}

export default Brands;
