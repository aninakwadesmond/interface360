import Style from './Button.module.scss';
function Button({ children, className }) {
  return <div className={`${Style.addChart} ${className}`}>{children}</div>;
}

export default Button;
