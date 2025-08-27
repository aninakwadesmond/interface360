import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../todoButton/Button';
import Style from './card.module.scss';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import Features from '../FeaturesShop/Features';
import Footer from '../FooterPage/Footer';
import { use, useContext, useEffect, useState } from 'react';
import Shop from '../ContextApr/Shop';
import CartContent from '../ContextApr/Cart';
import { json } from 'react-router-dom';
// import Features

const headings = ['remove', 'image', 'product', 'price', 'quality', 'subtotal'];

function CartTable() {
  const { cart, dispatchShop } = useContext(Shop);
  console.log(cart);
  const [run, setRun] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:5000/shop/get');
      if (!response.ok) return json({ message: 'Error in fetch Data' });
      else {
        const responseData = await response.json();
        setRun((prev) => !prev);
        console.log('get', responseData);
        dispatchShop({ type: 'loadData', payload: responseData });
      }
    }
    fetchData();
  }, [close]);
  return (
    <>
      <div className={Style.container}>
        <div className={Style.content}>
          {headings.map((el) => (
            <Title>{el}</Title>
          ))}
          {cart.length > 0 &&
            cart.map((el) => (
              <ItemContainer item={el} run={run} setRun={setRun} />
            ))}

          {/* <ItemContainer />
          <ItemContainer />
          <ItemContainer /> */}
        </div>
      </div>
      <div className={Style.payment}>
        <Coupon />
        <CartTotal />
      </div>
      <Footer />
    </>
  );
}

function ItemContainer({ item, run, setRun }) {
  const [count, setCount] = useState(1);
  const { image, title, price } = item;
  const [curItem, setCurItem] = useState(item);
  const [total2, setTotal] = useState(price);
  const { cart, dispatchShop } = useContext(Shop);
  const { dispatchCart, sumTotol } = useContext(CartContent);
  const update = cart;
  console.log(item);
  const currentPrice = cart.map(
    (obj, index, self) =>
      obj.id === curItem.id && obj.category === curItem.category
        ? { ...obj, newPrice: obj.price * count }
        : { ...obj, newPrice: 0 }
    // { ...obj, price2: (price * count).toFixed(2) }
  );
  const [close, setClose] = useState(false);
  console.log(currentPrice);

  // console.log(cart, item);
  // const
  function handleChange(e) {
    if (e.target.value < 1) return;
    setCount(e.target.value);
    // console.log(item);
    console.log(curItem);

    // dispatchShop({ type: 'updatePrice': });
  }

  useEffect(() => {
    setTotal((price * count).toFixed(2));
    // console.log(currentPrice);
  }, [count]);

  useEffect(() => {
    if (!close) return;
    async function fetchData() {
      const response = await fetch(`http://localhost:5000/shop/${curItem.id}`, {
        method: 'delete',
      });
      if (!response.ok) return json({ message: 'Cannot remove data' });
      else {
        const responseData = await response.json();
        const response2 = await fetch('http://localhost:5000/shop/get');
        if (!response.ok) return json({ message: 'Error in fetch Data' });
        else {
          const responseData2 = await response2.json();
          setRun((prev) => !prev);
          console.log(responseData2);
          dispatchShop({ type: 'loadData', payload: responseData2 });
        }
      }
    }
    fetchData();
  }, [close, run]);

  useEffect(() => {
    console.log(price, (price * count).toFixed(2));
    dispatchCart({ type: 'sum', payload: (price * count).toFixed(2) });
  }, [count]);

  function total(price, count) {
    return (price * count).toFixed(2);
  }

  function handleClose() {
    setClose(true);
    setRun(true);
  }
  return (
    <>
      <EachItem>
        <button className={Style.close} onClick={handleClose}>
          <FontAwesomeIcon icon={faClose} />
        </button>
      </EachItem>
      <EachItem>
        <div className={Style.cartImage}>
          <img src={image} alt="imageContent" />
        </div>
      </EachItem>
      <EachItem>{title}</EachItem>
      <EachItem>{price}</EachItem>
      <EachItem>
        <div className={Style.quantity}>
          <input
            type="number"
            name=""
            id=""
            value={count}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </EachItem>
      <EachItem>${total(price, count)}</EachItem>
    </>
  );
}
function Title({ children }) {
  return <div className={Style.text}>{children}</div>;
}
function EachItem({ children }) {
  return <div className={Style.item}>{children}</div>;
}

function Coupon() {
  return (
    <div className={Style.coupon}>
      <h1>Apply Coupon</h1>
      <div>
        <input type="text" placeholder="Enter your Coupon" />
        <button className={Style.apply}>Apply</button>
      </div>
    </div>
  );
}

function CartTotal() {
  return (
    <div className={Style.total}>
      <h2>Cart Total</h2>
      <div className={Style.container}>
        <p>
          <span>Card Subtotal</span> <span>$335</span>
        </p>
        <p>
          <span>Shipping </span> <span>Free</span>
        </p>
        <p className={Style.cost}>
          <span> Total</span> <span>$335</span>
        </p>
      </div>
      <button>Proceed to checkout</button>
    </div>
  );
}
export default CartTable;
