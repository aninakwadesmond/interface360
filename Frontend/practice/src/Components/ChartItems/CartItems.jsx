import Style from './CartItems.module.scss';
import ContextMain from '../ContextApr/Context';
import { useContext, useState } from 'react';
import Overlay from '../overlay/Overlay';
import ChangeLink from '../ContextApr/Link';
function CartItems({ carsSelelcted }) {
  // const [openModal, setOpenModal] = useState(false);
  const { setCart, SelectedItem, openModal, setOpenModal, carObj, dispatch } =
    useContext(ContextMain);
  // const { dispatch3 } = useContext(ChangeLink);

  // function handleRemoveItem() {
  //   dispatch3({ tpe: 'remove', payload:  });
  // }
  // const { handleClose } = useContext(ChangeLink);
  // console.log(handleClose);
  function handleCloseModal(e) {
    e.preventDefault();
    setCart(false);
    setOpenModal(true);
    // handleClose();
  }

  return (
    <>
      {!openModal && (
        <>
          <Overlay />
          <div className={Style.container}>
            <button className={Style.close} onClick={handleCloseModal}>
              x
            </button>
            {carsSelelcted.map((obj) => (
              <SelectedInCart
                obj={obj}
                dispatch={dispatch}
                // dispatch3={dispatch3}
              />
            ))}

            <div className={Style.priceTag}>
              <span>Total</span>
              <span className={Style.total}>
                {`$ ${SelectedItem.map((car) => {
                  return Number(+car.price.split('$')[1].split(',').join(''));
                }).reduce((acc, cur) => acc + cur, 0)}`}
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function SelectedInCart({ obj, dispatch }) {
  // const { dispatch } = useContext(ContextMain);
  // const { dispatch3 } = useContext(ChangeLink);
  const {
    primaryPhotoUrl: carImage,

    model,
    make,
    price,
    // createdAt: releaseDate,
    // displayColor,
  } = obj;

  return (
    <div className={Style.content}>
      <div className="imags">
        <img src={carImage} alt="Car of the type Selected " />
      </div>
      <div className={Style.textPricing}>
        <p>{`${make}-${model}`}</p>
        <p className={Style.price}>{price}</p>
      </div>
      <button
        onClick={() => {
          dispatch({ type: 'remove', payload: obj });
          // dispatch3({ type: 'remove', payload: obj });
        }}
      >
        x
      </button>
    </div>
  );
}

export default CartItems;
