import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Style from './nav.module.scss';
import {
  faClose,
  faMoneyBillTrendUp,
  faNavicon,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <div className={Style.nav}>
      <div className={Style.logo}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? Style.active1 : undefined)}
        >
          <p>
            <img src="../../../public/images/car2.jpg" alt="" />
          </p>
        </NavLink>
      </div>
      <div className={Style.navPage}>
        <Navigation open={open} />
        <MenuIcon setOpen={setOpen} open={open} />
      </div>
    </div>
  );
}

function Navigation({ open }) {
  return (
    <div
      className={Style.menuItems}
      style={
        open ? { display: 'flex', transform: 'translateX(0%)', right: 0 } : {}
      }
    >
      <div className="">
        <NavLink
          to=""
          className={({ isActive }) => (isActive ? Style.active : '')}
          end
        >
          Home
        </NavLink>
      </div>
      <div className="">
        <NavLink
          to="shopping"
          className={({ isActive }) => (isActive ? Style.active : '')}
        >
          shop
        </NavLink>
      </div>
      <div className="">
        <NavLink
          to="blog"
          className={({ isActive }) => (isActive ? Style.active : '')}
        >
          Blog
        </NavLink>
      </div>
      <div className="">
        <NavLink
          to="about"
          className={({ isActive }) => (isActive ? Style.active : '')}
        >
          About
        </NavLink>
      </div>
      <div className="">
        <NavLink
          to="contact"
          className={({ isActive }) => (isActive ? Style.active : '')}
        >
          Contact
        </NavLink>
      </div>
      <div className={Style.cart}>
        <NavLink
          to="cart"
          className={({ isActive }) => (isActive ? Style.active : '')}
        >
          <p>
            <FontAwesomeIcon icon={faShoppingCart} />
          </p>
        </NavLink>
      </div>
    </div>
  );
}

function MenuIcon({ setOpen, open }) {
  function handleOpen() {
    setOpen((prev) => !prev);
  }
  return (
    <div className={Style.menu} onClick={handleOpen}>
      {!open ? (
        <FontAwesomeIcon icon={faNavicon} />
      ) : (
        <FontAwesomeIcon icon={faClose} />
      )}
    </div>
  );
}
export default Nav;
