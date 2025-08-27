import Style from './Overlay.module.scss';
function Overlay() {
  return (
    <div className={Style.overlay} onClick={(e) => e.preventDefault()}></div>
  );
}

export default Overlay;
