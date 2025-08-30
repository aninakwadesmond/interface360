import Style from './f.module.scss';

function Features() {
  return (
    <div className={Style.size}>
      <div className={Style.cardContainer}>
        {Array.from({ length: 6 }, (_, i) => i + 1).map((el) => (
          <Card />
        ))}
      </div>
    </div>
  );
}
function Card() {
  return (
    <div className={Style.feature}>
      <div className={Style.card}>
        <img src="./images/car10.jpg" alt="" />
      </div>
      <div className={Style.title}>
        <p>lorem</p>
      </div>
    </div>
  );
}

export default Features;
