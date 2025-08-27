import Style from './call.module.scss';
function CallAction({ top, height, children }) {
  return (
    <div className={Style.call}>
      <div className={Style.content}>
        <p className={Style.c1}>Repair Service</p>
        <p className={Style.c2}>
          Up to <span>70% Off </span>- All t-shirts and Accessories
        </p>
        <button>Explore More</button>
      </div>
    </div>
  );
}

export default CallAction;
