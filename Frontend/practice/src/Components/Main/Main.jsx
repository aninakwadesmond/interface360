import Style from './Main.module.scss';

function Main({ children }) {
  return <div className={Style.mainLayout}>{children}</div>;
}

export default Main;
