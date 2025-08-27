import { Link } from 'react-router-dom';
import Style from './Home.module.scss';
import { useEffect } from 'react';

function Home() {
  useEffect(() => {
    document.title = 'Drive|home';
    return function () {
      document.title = 'Drive|';
    };
  }, []);
  return (
    <header className={Style.header}>
      {/* <div className="background">
        <img src="../../public/images/car1.jpg" alt="car Image" />
      </div> */}
      <video autoPlay muted loop playsInline className={Style.video}>
        <source src="../../../public/images/backcover.mp4" type="video/mp4" />
      </video>

      <div className={Style.title}>
        {/* <div></div> */}
        <h2>
          <span>You drive save .</span> <span> You save tommorrow</span>{' '}
        </h2>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
          incidunt veniam, eaque at consectetur culpa iure accusantium odio illo
          dolores laborum commodi, cupiditate perferendis voluptatum voluptas
          magni minus facere. Quibusdam. Est provident nulla totam recusandae id
          ipsa, repudiandae veniam et quia molestias iste iusto quod repellat,
          {/* sapiente ut quam illum itaque natus! Ipsum enim libero harum
          asperiores magni repudiandae tempora. Quae enim totam laborum corrupti */}
          {/* maiores accusantium nostrum culpa consequuntur laboriosam omnis
          dolore, in consectetur eligendi, commodi qui, numquam dolorem
          cupiditate error? Blanditiis libero officia eos quisquam iste, veniam
          vero. */}
        </p>
        <Link to="/cars">Get a car</Link>
      </div>

      <div className={Style.imageMove}>
        <img src="../../../public/images/car10.jpg" alt="" />
      </div>
      <div className={Style.imageMoveUp}>
        <img src="../../../public/images/car10.jpg" alt="" />
      </div>
    </header>
  );
}

export default Home;
