import Style from './more.module.scss';
function More({ $bgImg, children }) {
  return (
    <div className={Style.crazy} style={{ backgroundImage: `url(${$bgImg})` }}>
      <div className={Style.content}>{children}</div>
    </div>
  );
}

export default More;
