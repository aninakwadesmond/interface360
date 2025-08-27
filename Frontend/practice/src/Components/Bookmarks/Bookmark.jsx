import Style from './Bookmark.module.scss';

// function Bookmark() {
//   return <div></div>;
// }

// export default Bookmark;

import ContextMain from '../ContextApr/Context';
// import { useContext, useState } from 'react';
import Overlay from '../overlay/Overlay';
import ChangeLink from '../ContextApr/Link';
import { useContext } from 'react';
import { BlogContext } from '../ContextApr/BlogContext';
function Bookmark({ carsSelelcted }) {
  const { dispatch } = useContext(BlogContext);
  function handleCloseBook() {
    dispatch({ type: 'openBook', payload: false });
  }

  return (
    <>
      <Overlay />
      <div className={Style.container}>
        <button className={Style.close} onClick={handleCloseBook}>
          x
        </button>
        {carsSelelcted.map((obj) => (
          <SelectedInCart obj={obj} />
        ))}

        <div className={Style.priceTag}>
          {/* <span>Total</span>
          <span className={Style.total}>
            {`$ ${[]
              .map((car) => {
                return Number(+car.price.split('$')[1].split(',').join(''));
              })
              .reduce((acc, cur) => acc + cur, 0)}`}
          </span> */}
        </div>
      </div>
    </>
  );
}

function SelectedInCart({ obj }) {
  // const { dispatch } = useContext(ContextMain);
  // const { dispatch3 } = useContext(ChangeLink);
  const { dispatch } = useContext(BlogContext);

  function handleOpenModal() {
    console.log('hello');
    dispatch({ type: 'view', payload: obj });
    dispatch({ type: 'setModal', payload: true });
    dispatch({ type: 'openBook', payload: false });
  }
  const { image: carImage, title } = obj;

  return (
    <div className={Style.content}>
      <div onClick={handleOpenModal} className={Style.contain}>
        <div className="imags">
          <img src={carImage} alt="Car of the type Selected " />
        </div>
        <div className={Style.textPricing}>
          <p>{title}</p>
          {/* <p className={Style.price}>{price}</p> */}
        </div>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          dispatch({ type: 'removeBookMArk', payload: obj });
          // dispatch3({ type: 'remove', payload: obj });
        }}
      >
        x
      </button>
    </div>
  );
}

export default Bookmark;
