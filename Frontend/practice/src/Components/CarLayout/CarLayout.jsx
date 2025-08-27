import { Outlet } from 'react-router-dom';
import Navigation from '../Navgation/Navigation';
import { useState, useReducer } from 'react';
import ContextMain from '../ContextApr/Context';

const initialState = {
  SelectedItem: [],
  query: '',
  sideQuery: 'name',
  sort: '',
  sortColor: '',
  carObj: {},
};
function reducer(state, action) {
  switch (action.type) {
    case 'addItem':
      return {
        ...state,
        SelectedItem: [...state.SelectedItem, action.payload].filter(
          (obj, index, self) => index === self.findIndex((o) => o.id === obj.id)
        ),
      };
    case 'remove':
      return {
        ...state,
        SelectedItem: [...state.SelectedItem].filter(
          (car) => car.id !== action.payload.id
        ),
      };
    case 'resetCar':
      return { ...state, carObj: action.payload };
    case 'query':
      return { ...state, query: action.payload };

    case 'sideQuery':
      return { ...state, sideQuery: action.payload };
    case 'sort':
      return { ...state, sort: action.payload };
    case 'sortColor':
      return { ...state, sortColor: action.payload };
    case 'carObj':
      return { ...state, carObj: action.payload };
  }
}
const initialState2 = {
  searchType: [],
  checkSearch: false,
};

function reducer2(state, action) {
  switch (action.type) {
    case 'search':
      return { ...state, checkSearch: true, searchType: action.payload };
  }
}
function CarLayout() {
  const [
    { SelectedItem, query, sideQuery, sort, sortColor, carObj },
    dispatch,
  ] = useReducer(reducer, initialState);
  const [{ searchType, checkSearch }, dispatch2] = useReducer(
    reducer2,
    initialState2
  );
  const [cart, setCart] = useState(false);
  const [cardItems, setCartItems] = useState(0);
  const [image, setImage] = useState('');
  const [openModal, setOpenModal] = useState(false);
  function handleItemIncrease() {
    setCartItems((prev) => prev + 1);
  }

  function handleSetImage(image) {
    setImage(image);
  }
  return (
    <ContextMain.Provider
      value={{
        cart,
        setCart,
        cardItems,
        handleItemIncrease,
        image,
        handleSetImage,
        SelectedItem,
        dispatch,
        dispatch2,
        openModal,
        setOpenModal,
        query,
        sideQuery,
        sort,
        sortColor,
        searchType,
        checkSearch,
        carObj,
      }}
    >
      <Navigation />
      <Outlet />
    </ContextMain.Provider>
  );
}

export default CarLayout;
