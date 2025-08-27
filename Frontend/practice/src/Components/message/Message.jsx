import Button from '../Button/Button';
import Overlay from '../overlay/Overlay';
import Style from './Message.module.scss';
import CarContext from '../ContextApr/CarContext';
import { useContext } from 'react';
import ContextMain from '../ContextApr/Context';

function Message() {
  const { setMessage } = useContext(CarContext);

  function handleMessage() {
    setMessage(false);
  }
  return (
    <div>
      <Overlay />
      <div className={Style.message}>
        <button className={Style.button} onClick={handleMessage}>
          X
        </button>
        <div className={Style.emailName}>
          <div className="div">
            <label htmlFor="">From: </label>
            <input type="email" placeholder="@email-name" />
          </div>
          <div className="to">
            <label htmlFor="">To:</label>
            <input type="email" value="aninakwa@gmail.com" />
          </div>
        </div>
        <div className={Style.textarea}>
          <textarea name="textarea " id=""></textarea>
        </div>
        <Button>Send</Button>
      </div>
    </div>
  );
}

export default Message;
