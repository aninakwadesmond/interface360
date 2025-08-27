import { useContext, useReducer } from 'react';
import Cart from '../../Components/Cart/Cart';
import CartContent from '../../Components/ContextApr/Cart';
import CarContext from '../../Components/ContextApr/CarContext';

const initialState = { sumTotal: 0 };
function reducer(state, action) {
  switch (action.type) {
    case 'sum':
      return { ...state, sumTotal: state.sumTotal + action.payload };
  }
}
function CartPage() {
  const [{ sumTotal }, dispatchCart] = useReducer(reducer, initialState);
  return (
    <CartContent.Provider value={{ dispatchCart, sumTotal }}>
      <Cart />
    </CartContent.Provider>
  );
}

export default CartPage;
