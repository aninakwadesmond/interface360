import Style from './PageError.module.scss';
function PageError({ children, title }) {
  return (
    <div className={Style.error}>
      <div className={Style.message}>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default PageError;
