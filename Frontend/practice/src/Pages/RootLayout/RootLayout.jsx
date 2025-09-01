import { Outlet } from 'react-router-dom';
import Header from '../../Components/Header/header';
function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default RootLayout;
