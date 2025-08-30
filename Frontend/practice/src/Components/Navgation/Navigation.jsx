// import { useContext } from 'react';
import Style from './Navigation.module.scss';

import { Link, useParams } from 'react-router-dom';
import { useContext } from 'react';
import ContextMain from '../ContextApr/Context';
// import {FontAwesomeIcon}
function Navigation() {
  const params = useParams();
  const { query, dispatch, handleSetImage } = useContext(ContextMain);

  console.log(params, 'hello');

  return (
    <header className={Style.Navigation}>
      <div className={Style.logo}>
        <img src="./images/car7.jpg" alt="" />
        <Link to=".." relative="path" onClick={() => handleSetImage('')}>
          {/* <FontAwesomeIcon icon={faArrowLeft} /> */}
        </Link>
      </div>
      {!params?.details && (
        <div className={Style.input}>
          <input
            type="text"
            name=""
            id=""
            placeholder="Search..."
            value={query}
            onChange={(e) =>
              dispatch({ type: 'query', payload: e.target.value })
            }
          />
        </div>
      )}
      <div className={Style.sort}>
        {params.details ? <Carts /> : <SelectOption />}
      </div>
    </header>
  );
}

function SelectOption() {
  const { sort, dispatch } = useContext(ContextMain);
  return (
    <div className={Style.select}>
      <select
        name=""
        id=""
        value={sort}
        onChange={(e) => dispatch({ type: 'sort', payload: e.target.value })}
      >
        <option value="1.new">new</option>
        <option value="2.used">used</option>
        <option value="3.price:asc">Most Expensive</option>
        <option value="4.price:desc">Least Expensive</option>
        <option value="5.year:asc">Oldest</option>
        <option value="6.year:desc">Newest</option>
      </select>
    </div>
  );
}
function Carts() {
  const params = useParams();
  const { setCart, SelectedItem, setOpenModal } = useContext(ContextMain);
  return (
    <div
      onClick={() => setCart((prev) => !prev)}
      className={params.details && Style.cart}
    >
      <img src="./images/car1.jpg" alt="" />
      <span className={Style.itemsInChart} onClick={() => setOpenModal(false)}>
        {SelectedItem.length}
      </span>
    </div>
    // <div className={Style.cart}>
    //   <div className={Style.image}>
    //     <img src="./images/car2.jpg" alt="" />
    //     hello
    //   </div>
    // </div>
  );
}

export default Navigation;
