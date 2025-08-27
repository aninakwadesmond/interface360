import { useContext } from 'react';
import Navigate from '../ContextApr/Navigate';
import Style from './button.module.scss';
function Bottton({ children }) {
  const { dispatch2 } = useContext(Navigate);
  function handleSkip() {
    dispatch2({ type: 'skip' });
  }
  return (
    <button className={Style.bottom} onClick={handleSkip}>
      {children}
    </button>
  );
}

export default Bottton;
