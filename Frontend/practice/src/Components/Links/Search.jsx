import { useContext } from 'react';
import { Ecom } from '../ContextApr/Ecom';
import Style from './s.module.scss';

function Search() {
  // const { dispatch } = useContext(Ecom);

  // function handleSetState(state) {
  //   dispatch({ type: 'cur', payload: state });
  // }
  const items = [
    'tops',
    'mens-shoes',
    'mens-watches',
    'mens-shoes',
    'womens-dresses',
    'womans-shoes',
    'smartphones',
    'laptops',
    'groceries',
    'skincare',
  ];
  return (
    <div className={Style.mainContainer}>
      <div className={Style.items}>
        {items.map((el) => (
          <p value={el}>{el}</p>
        ))}
      </div>
    </div>
  );
}

export default Search;
