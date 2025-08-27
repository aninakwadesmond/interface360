import Overlay from '../overlay/Overlay';
import Style from './failed.module.scss';

function Failed() {
  return (
    <div className={Style.Error}>
      <Overlay />
      <div className={Style.fail}>
        <p>Failed to fetch data 🔌</p>
      </div>
    </div>
  );
}

export default Failed;
