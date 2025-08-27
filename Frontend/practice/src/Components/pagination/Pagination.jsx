import { useContext } from 'react';
import Bottton from '../ButtonS/Bottton';
import Style from './pag.module.scss';
import Navigate from '../ContextApr/Navigate';
function Pagination() {
  return (
    <div className={Style.pagContainer}>
      <div className={Style.pagination}>
        {Array.from({ length: 3 }, (_, i) => i + 1).map((el) => (
          <Bottton>{el === 3 ? '>' : el}</Bottton>
        ))}
      </div>
    </div>
  );
}

export default Pagination;
