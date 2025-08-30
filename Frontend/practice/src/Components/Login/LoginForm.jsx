import {
  Form,
  json,
  Link,
  useActionData,
  useNavigation,
  useSubmit,
} from 'react-router-dom';
import Style from './login.module.scss';
import { useEffect, useReducer, useState } from 'react';
import { Login, Login as LoginData } from '../ContextApr/login';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faBackward,
  faBullseye,
  faEyeDropper,
  faEyeLowVision,
  faEyeSlash,
  faStepBackward,
  faStreetView,
} from '@fortawesome/free-solid-svg-icons';
import { Ecom } from '../ContextApr/Ecom';
import Shop from '../ContextApr/Shop';

const initialState = { view: false, login: '', send: false };

function reducer(state, action) {
  switch (action.type) {
    case 'view':
      return { ...state, view: action.payload };
    case 'login':
      return { ...state, login: action.payload };
    case 'send':
      return { ...state, send: !state.send };
  }
}
function LoginForm() {
  const [{ view, login, send }, dispatch3] = useReducer(reducer, initialState);
  const { dispatchShop } = useContext(Shop);
  const [detail, setDetails] = useState({
    username: '',
    password: '',
  });

  const navigation = useNavigation();
  const actionData = useActionData();
  const submit = useSubmit();

  const submitting = navigation.state === 'submitting';
  const submitted = navigation.state === 'idle' && actionData?.success;

  useEffect(() => {
    if (!detail.username || !detail.password) return;
    async function fetchData() {
      const response = await fetch(
        `https://interface360.onrender.com/shop/${detail.username}/${detail.password}`
      );
      if (!response.ok) dispatchShop({ type: 'err', payload: 'Poor network' });
      else {
        const responseData = await response.json();
        console.log(responseData, responseData.message);
        if (!responseData.status) {
          dispatchShop({ type: 'err', payload: responseData });
          console.log(responseData.message);
          return;
        }
        console.log('hello', responseData);
        // if (responseData.data.length < 1) {
        //   dispatchShop({ type: 'message', payload: 'Unregistered account' });
        //   dispatchShop({ type: 'confirm', payload: true });
        //   setTimeout(() => {
        //     dispatchShop({ type: 'confirm', payload: false });
        //     return;
        //   }, 2000);
        // }
        dispatchShop({ type: 'err', payload: responseData });
        setTimeout(() => {
          dispatchShop({ type: 'home' });
        }, 3000);

        console.log(responseData);
      }
    }
    fetchData();
  }, [send]);
  return (
    <LoginData.Provider
      value={{
        view,
        dispatch3,
        submitting,
        submitted,
        login,
        detail,
        setDetails,
        submit,
        send,
      }}
    >
      <div className={Style.overlay}></div>
      {!login && <FormWay />}
      {login && <FormContainer />}
    </LoginData.Provider>
  );
}

function FormWay() {
  const { dispatch3 } = useContext(LoginData);
  function handleLogin() {
    dispatch3({ type: 'login', payload: 'login' });
  }
  function handleSignUp() {
    dispatch3({ type: 'login', payload: 'signup' });
  }
  return (
    <div className={Style.form}>
      <div className={`${Style.image} ${Style.width}`}>
        <img src="./images/car15.jpg" alt="Car as logo" />
      </div>
      <div className={Style.log}>
        <button onClick={handleLogin}>Sign up</button>
        <button onClick={handleSignUp}>Login</button>
      </div>
    </div>
  );
}

function FormContainer() {
  const { submitted, submitting, login, dispatch3, detail, submit } =
    useContext(LoginData);
  // const { dispatch, home } = useContext(Ecom);
  const result = useActionData();
  if (result) {
    var { success } = result;
  }
  const { dispatchShop } = useContext(Shop);

  useEffect(() => {
    if (!result) return;
    if (!result.success) return;
    dispatchShop({ type: 'home' });
  }, [success]);
  const [data, setData] = useState(result);

  const getMessage = useActionData();
  function handleBack() {
    dispatch3({ type: 'login', payload: '' });
    dispatchShop({ type: 'err', payload: '' });
  }

  function handleSubmit() {
    // console.log(dispatch, home);

    if (login === 'signup') {
      dispatch3({ type: 'send' });
    }
    if (login === 'login') {
      dispatchShop({ type: 'err', payload: getMessage?.message });
    }

    submit({ detail }, { method: 'get' });
    // dispatch({ type: 'count' });
  }
  return (
    <Form method={login === 'login' ? 'post' : 'get'} className={Style.form}>
      <div className={Style.image}>
        <img
          src="./images/car15.jpg"
          alt="Car as logo"
          // onClick={dispatch({ type: 'home' })}
        />
      </div>
      <div className={Style.formContent}>
        <FormInput username={'username'} type={'text'}>
          Username
        </FormInput>
        {login === 'login' ? (
          <FormInput username={'email'} type={'email'}>
            Email
          </FormInput>
        ) : (
          ''
        )}

        <FormInput username={'password'} type={'password'}>
          PassWord
        </FormInput>
      </div>
      <a className={Style.login}>
        {/* <Link */}
        {/* // to="/cars" > */}
        <p>
          <FontAwesomeIcon icon={faArrowLeft} onClick={handleBack} />
        </p>
        <a>
          <button
            type={login === 'login' ? 'submit' : ''}
            onClick={handleSubmit}
          >
            {submitting && `Submitting`}
            {submitted && 'Loaded'}
            {!submitted && !submitted && 'Login'}
          </button>
        </a>

        {/* </Link> */}
      </a>
    </Form>
  );
}

function FormInput({ children, username, type }) {
  const { view, dispatch3, detail, setDetails } = useContext(LoginData);

  function handleView() {
    dispatch3({ type: 'view', payload: !view });
  }

  function handleReset(e) {
    const { name, value } = e.target;
    // setDetails((detail) => detail, { name: value });
    setDetails({ ...detail, [name]: value });
  }
  return (
    <p>
      <label htmlFor="">{children}:</label>
      {type === 'password' ? (
        <div className={Style.password}>
          <input
            type={view ? 'text' : type}
            name={username}
            title={username}
            className={Style.input}
            value={detail[username]}
            onChange={(e) => handleReset(e)}
          />
          <div className={Style.viewpassword} onClick={handleView}>
            {!view ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEyeDropper} />
            )}
          </div>
        </div>
      ) : (
        <input
          type={type}
          name={username}
          title={username}
          value={detail[username]}
          onChange={(e) => handleReset(e)}
        />
      )}
    </p>
  );
}

export default LoginForm;
