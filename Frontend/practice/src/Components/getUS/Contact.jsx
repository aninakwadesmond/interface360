import Style from './Contact.module.scss';
import Button from '../Button/Button';
import Overlay from '../overlay/Overlay';
import { useContext } from 'react';
import CarContext from '../ContextApr/CarContext';
import ContextMain from '../ContextApr/Context';

function Contact() {
  const { setBuy } = useContext(CarContext);
  function handleClose() {
    setBuy(false);
  }
  const { carObj } = useContext(ContextMain);
  const {
    primaryPhotoUrl: carImage,
    photoUrls: gallary,
    model,
    make,
    price,
    // createdAt: releaseDate,
    // displayColor,
  } = carObj;
  return (
    <>
      <Overlay />
      <div className={Style.deal}>
        <button className={Style.button} onClick={handleClose}>
          X
        </button>
        <div className={Style.describeImage}>
          <div className={Style.image}>
            <img src={carImage} alt="Ready to buy car" />
          </div>
          <div>
            <h3>{`${make} - ${model}`}</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
              facere deleniti aut beatae sit adipisci, sunt optio libero
              pariatur veniam nostrum fugit reiciendis. Fugit iste inventore sed
              aliquid eum? Ex.
            </p>
          </div>
        </div>
        <div className={Style.payingMethod}>
          <div className="paying">Payment Method</div>
          <div className={Style.payContent}>
            <select name="" id="">
              <option>Mtn Mobile money</option>
              <option>Telecel</option>
              <option>Airtel Tigo</option>
            </select>
            <div className={Style.accountNumber}>
              <input type="number" placeholder="accountNumber" />
            </div>
          </div>
        </div>
        <div className={Style.quantity}>
          <input type="number" placeholder="number of cars " />
          <p>{price}</p>
        </div>
        <Button>Buy now</Button>
        {/* <button className={Style.botton}>Buy now</button> */}
      </div>
    </>
  );
}

export default Contact;
