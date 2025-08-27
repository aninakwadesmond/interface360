// import Style from '/MainContent.module.scss ';
import Style from './content.module.scss';

function MainContent({ children }) {
  return <div className={Style.main}>{children}</div>;
}

export default MainContent;
