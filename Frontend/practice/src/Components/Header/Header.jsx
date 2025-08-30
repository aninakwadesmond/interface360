import { NavLink, Link } from 'react-router-dom';
import Style from './Header.module.scss';
import Failed from '../Failed/Failed';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faNavicon } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import Overlay from '../overlay/Overlay';
import { BlogContext } from '../ContextApr/BlogContext';

function Header() {
  const [openNav, setOpenNav] = useState(false);
  // const { openBook } = useContext(BlogContext);

  function handleToggleModal() {
    setOpenNav((prev) => !prev);
  }
  return (
    <>
      {/* {openNav && <Overlay />} */}

      <header className={Style.header}>
        <nav>
          <div className="logo">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? Style.active1 : undefined
              }
            >
              <div className="image">
                <img src="./images/car4.jpg" alt="car- image-logo" />
              </div>

              <h3>DriveSafe</h3>
            </NavLink>
          </div>
          {openNav && <Overlay />}
          {/* {openBook && <Overlay />} */}
          <ul
            className={Style.navigationItem}
            style={
              openNav
                ? { transform: 'translateX(0vw)', transition: 'all 0.3s' }
                : {}
            }
          >
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? Style.active1 : undefined
                }
                to="news"
                end
              >
                News
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? Style.active1 : undefined
                }
                to="shop"
                end
              >
                Shop
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="main"
                className={({ isActive }) =>
                  isActive ? Style.active1 : undefined
                }
              >
                Main
              </NavLink>
            </li>
            <li>
              <NavLink
                to="home"
                className={({ isActive }) =>
                  isActive ? Style.active1 : undefined
                }
              >
                Home
              </NavLink>
            </li> */}
            <li>
              <NavLink
                to="quiz"
                className={({ isActive }) =>
                  isActive ? Style.active1 : undefined
                }
              >
                Quiz
              </NavLink>
            </li>
            <li>
              <NavLink
                to="todo"
                className={({ isActive }) =>
                  isActive ? Style.active1 : undefined
                }
              >
                Todo
              </NavLink>
            </li>
          </ul>
          <div className={Style.menuIcon} onClick={handleToggleModal}>
            {openNav ? (
              <FontAwesomeIcon icon={faClose} />
            ) : (
              <FontAwesomeIcon icon={faNavicon} />
            )}
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
