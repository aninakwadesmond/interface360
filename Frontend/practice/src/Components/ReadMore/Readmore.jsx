import { useContext } from 'react';
import Button from '../Button/Button';
import Overlay from '../overlay/Overlay';
import Style from './Readmore.module.scss';
import { BlogContext } from '../ContextApr/BlogContext';

function Readmore() {
  return (
    <div className={Style.details}>
      <Overlay />
      <ViewCard />
    </div>
  );
}

function ViewCard() {
  const { view, dispatch } = useContext(BlogContext);
  const { image, title, description, url, source, publishedAt: date } = view;

  function handleCloseModal() {
    dispatch({ type: 'setModal', payload: false });
  }
  return (
    <div className={Style.modal}>
      <button className={Style.close} onClick={handleCloseModal}>
        X
      </button>
      <div className={Style.modalImage}>
        <img src={image} alt="carImages" />
      </div>
      <div className={Style.modalText}>
        <h2>{title}</h2>
        <div className="">
          <p>Source: {source.name}</p>
          <p>Date: {date.split('T')[0]}</p>
        </div>
        <p>{description}</p>
        <div className={Style.button}>
          <button>
            <a href={url} target="_blank">
              Read More
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}
export default Readmore;
