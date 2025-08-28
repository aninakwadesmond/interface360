import {
  createBrowserRouter,
  RouterProvider,
  useLoaderData,
} from 'react-router-dom';
import Home from './Components/Home/Home';
import * as RRD from 'react-router-dom';

import RootLayout from './Pages/RootLayout/RootLayout';
import Login, { action as InputForm } from './Pages/RootLayout/Login';
import CarsPage from './Pages/CarsPage';
import News from './Pages/News';
import CarLayout from './Components/CarLayout/CarLayout';
import CarDetails from './Pages/CarDetails';
import { loader as similarCar } from './Pages/CarDetails';
import { loader as CarLoader } from './Pages/CarsPage';
import { loader as Newsloader } from './Pages/News';
import Error from './Pages/Error';
import Quiz from './Pages/Quiz';
import Todo from './Pages/RootLayout/Todo';
import { action as TodoAction } from './Pages/RootLayout/Todo';
import Ecormmence from './Pages/RootLayout/Ecormmence';
import RootPath from './Components/Ecormmence/RootPath';
import Shopping from './Pages/Shopping';
import ProductsDetails from './Components/ProductsDetails/ProductsDetails';
import Eblog from './Pages/Eblog';
import AboutUS from './Pages/AboutUS';
import Contact from './Pages/Contact';
import CartPage from './Pages/RootLayout/CartPage';
// import loader;
import { loader as Eload } from './Pages/RootLayout/Ecormmence';
import { actionShop as EAction } from './Components/Ecormmence/RootPath';
import LoginForm from './Components/Login/LoginForm';

const router = createBrowserRouter([
  // {
  //   path: '/',
  //   element: <RootLayout />,
  //   children: [
  //     { index: true, element: <Home /> },
  //     // { path: 'login', element: <Login />, action: InputForm },
  //     {
  //       path: 'news',
  //       element: <News />,
  //       // loader: Newsloader
  //     },
  //     { path: 'quiz', element: <Quiz /> },
  //     { path: 'todo', element: <Todo />, action: TodoAction },
  //   ],
  // },
  // {
  //   path: '/cars',
  //   element: <CarLayout />,
  //   errorElement: <Error />,
  //   children: [
  // {
  //   index: true,
  //   element: <CarsPage />,
  //   loader: CarLoader,
  // },
  //     { path: ':details', element: <CarDetails />, loader: similarCar },
  //   ],
  // },
  {
    path: '/shop',
    element: <RootPath />,

    action: EAction,
    children: [
      {
        path: '',
        loader: Eload,
        id: 'shop-info',
        children: [
          // { index: true, element: <LoginForm />, action: actionL },
          {
            index: true,
            element: <Ecormmence />,
          },
          { path: 'shopping', element: <Shopping /> },
        ],
      },
      { path: 'shopping/:id', element: <ProductsDetails /> },
      { path: 'blog', element: <Eblog /> },
      { path: 'about', element: <AboutUS /> },
      { path: 'contact', element: <Contact /> },
      { path: 'cart', element: <CartPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
