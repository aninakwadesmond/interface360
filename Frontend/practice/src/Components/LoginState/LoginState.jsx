import { useActionData } from 'react-router-dom';
import Style from './log.module.scss';
import { useContext } from 'react';
import Shop from '../ContextApr/Shop';

function LoginState({ children }) {
  const data = useActionData();
  const { Error } = useContext(Shop);
  console.log(Error);
  return (
    <div
      className={Style.state}
      style={
        data?.success || Error.status
          ? { backgroundColor: 'green', opacity: '0.7' }
          : { backgroundColor: 'red', opacity: '0.7' }
      }
    >
      <div className={Style.contain}>
        {!Error.message ? Error : Error.message}
      </div>
    </div>
  );
}

export default LoginState;
