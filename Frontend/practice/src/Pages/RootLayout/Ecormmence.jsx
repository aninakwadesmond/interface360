import { useReducer } from 'react';
import { Ecom } from '../../Components/ContextApr/Ecom';
import Home from '../../Components/HomeSection/Home';
import { defer, json } from 'react-router-dom';
import LoginForm from '../../Components/Login/LoginForm';

const initialState = { allData: [], cur: '', home: false, count: 0 };
function reducer(state, action) {
  switch (action.payload) {
    case 'data':
      return { ...state, allData: action.payload };
    case 'cur':
      return { ...state, cur: action.payload };
    case 'home':
      return { ...state, home: !state.home };
    case 'count':
      return { ...state, count: state.count + 1 };
  }
}
function Ecormmence() {
  const [{ allData, home }, dispatch] = useReducer(reducer, initialState);
  return (
    <Ecom.Provider value={{ allData, home, dispatch }}>
      <Home />
    </Ecom.Provider>
  );
}

async function loaderExisting() {
  const response = await fetch(
    'https://dummyjson.com/products/?limit=16&skip=0'
  );
  if (!response.ok) {
    return json({ message: 'Error in data get' }, { status: 302 });
  } else {
    const responseData = await response.json();
    return responseData.products;
  }
}

async function loadArrival() {
  const response = await fetch(
    'https://dummyjson.com/products/?limit=16&skip=16'
  );
  if (!response.ok) {
    return json({ message: 'Error in data get' }, { status: 302 });
  } else {
    const responseData = await response.json();
    return responseData.products;
  }
}
async function Shopping() {
  const response = await fetch(
    'https://dummyjson.com/products/?limit=20&skip=50'
  );
  if (!response.ok) {
    return json({ message: 'Error in data get' }, { status: 302 });
  } else {
    const responseData = await response.json();
    return responseData.products;
  }
}

export async function loader() {
  return defer({
    old: await loaderExisting(),
    new1: loadArrival(),
    shop: Shopping(),
  });
}

export default Ecormmence;
