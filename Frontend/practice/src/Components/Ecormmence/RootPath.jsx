import { json, Outlet, useActionData } from 'react-router-dom';
import Nav from '../ENav/Nav';
import { useReducer } from 'react';
import Shop from '../ContextApr/Shop';
import LoginForm from '../Login/LoginForm';
import LoginState from '../LoginState/LoginState';

const initialState = {
  Select: [],
  category: '',
  cart: [],
  show: false,
  confirm: false,
  message: '',
  color: '',
  Error: '',
};
function reducer(state, action) {
  switch (action.type) {
    case 'loadData':
      return {
        ...state,
        Select: action.payload,
        cart: action.payload,

        // [...state.cart, action.payload].filter(
        //   (obj, index, self) => index === self.findIndex((o) => o.id === obj.id)
        // ),
      };
    case 'category':
      return { ...state, category: action.payload };
    case 'updatePrice':
      return {
        ...state,
        cart: action.payload,
      };
    case 'home':
      return { ...state, show: !state.show };
    case 'confirm':
      return { ...state, confirm: action.payload };
    case 'message':
      return { ...state, message: action.payload };
    case 'color':
      return { ...state, color: action.payload };
    case 'err':
      return { ...state, Error: action.payload };
  }
}
function RootPath() {
  const [{ Select, category, cart, show, message, Error }, dispatchShop] =
    useReducer(reducer, initialState);
  const ErrorMessage = useActionData();
  console.log(ErrorMessage?.message);
  return (
    <Shop.Provider
      value={{ Select, category, show, cart, Error, dispatchShop }}
    >
      {Error && !show ? <LoginState /> : ''}
      {!show && <LoginForm />}
      {show && (
        <>
          <Nav />
          <Outlet />
        </>
      )}
    </Shop.Provider>
  );
}

export async function actionShop({ request, params }) {
  console.log('helldo');
  console.log(request.method);
  const data = await request.formData();
  const dataForm = Object.fromEntries(data);

  const method = request.method;

  console.log(method);

  const response = await fetch('https://interface360.onrender.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataForm),
  });
  if (!response.ok) {
    // dispatchShop({ type: 'color', payload: 'red' });
    return;
  }

  const responseData = await response.json();
  // dispatchShop({ type: 'color', payload: 'grren' });
  console.log(responseData);
  return responseData;
}

export default RootPath;
