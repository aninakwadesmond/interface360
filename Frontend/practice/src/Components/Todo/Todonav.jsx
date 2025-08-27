import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Style from './todo.module.scss';
import Button from '../todoButton/Button';
import { useContext } from 'react';
import TodoContext from '../ContextApr/TodoApi';

function Todonav() {
  const { dispatch, share } = useContext(TodoContext);
  function handleShare() {
    dispatch({ type: 'share', payload: !share });
  }
  return (
    <div className={Style.header}>
      <div className={Style.head}>
        <span>
          <FontAwesomeIcon icon={faComment} />
        </span>
        <span>Today I learned</span>
      </div>
      <div className={Style.share} onClick={handleShare}>
        <Button>{share ? 'Close' : 'Share'}</Button>
      </div>
    </div>
  );
}

export default Todonav;
