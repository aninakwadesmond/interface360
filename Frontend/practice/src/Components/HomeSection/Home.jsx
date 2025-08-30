import {
  Await,
  Link,
  useLoaderData,
  useRouteLoaderData,
} from 'react-router-dom';
import CallAction from '../CallAction/CallAction';
import Features from '../FeaturesShop/Features';
import Footer from '../FooterPage/Footer';
import Join from '../join/Join';
import More from '../More/More';
import Brands from '../Offer/Brands';
import Products from '../Products/products';
import Style from './home.module.scss';
import { Suspense } from 'react';

function Home() {
  const { old, new1 } = useRouteLoaderData('shop-info');

  return (
    <>
      <HeroSection />
      <Features />
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading....</p>}>
        <Await resolve={old}>
          {(old) => (
            <Products products={old}>
              <h1>Features Products</h1>
            </Products>
          )}
        </Await>
      </Suspense>
      {/* <Products>
        <h1>Features Products</h1>
      </Products> */}
      <CallAction />
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading....</p>}>
        <Await resolve={new1}>
          {(new1) => (
            <Products products={new1}>
              <h1>New Arrival</h1>
            </Products>
          )}
        </Await>
      </Suspense>
      {/* <Products>
        <h1>New Arrival</h1>
      </Products> */}
      <div className={Style.more}>
        <More $bgImg={'./images/bh-1.jpg'}>
          <p>crazy deals</p>
          <p className={Style.textMain}>buy 1 get 1 free</p>
          <p>The best classic dress is on sale at lorem</p>
          <button>learn more</button>
        </More>
        <More $bgImg={'./images/sh-1.avif'}>
          <p>Spring summer</p>
          <p className={Style.textMain}>Upcoming Season</p>
          <p>The best classic dress is on sale at lorem</p>
          <button>Collection</button>
        </More>
      </div>
      <div className={Style.gridBrands}>
        <Brands image={'./images/bh-1.jpg'}>
          <h2>Seasonal Sale</h2>
          <p>Lorem ipsum dolor sit amet consectetur</p>
        </Brands>
        <Brands image={'./images/bh-1.jpg'}>
          <h2>New footware collection</h2>
          <p>Lorem ipsum dolor sit amet consectetur</p>
        </Brands>
        <Brands image={'./images/sh-3.avif'}>
          <h2>T-SHIRTS</h2>
          <p>Lorem ipsum dolor sit amet consectetur</p>
        </Brands>
      </div>
      <div>
        <Join />
        <Footer />
      </div>
    </>
  );
}

function HeroSection() {
  return (
    <div className={Style.hero}>
      <div className={Style.content}>
        <div className={Style.aboutContent}>
          <p>Trade in offer </p>
          <p className={Style.header}>Super value deals</p>
          <p className={`${Style.header} ${Style.green}`}>On all Products </p>
        </div>
        <div className={Style.action}>
          <p>Save more with coupons and up to 70%</p>
          <Link to="/shop/shopping">
            <button>Shop now</button>
          </Link>
        </div>
      </div>
      <div className={Style.image}></div>
    </div>
  );
}

// function Features() {
//   return (
//     <div className={Style.size}>
//       <div className={Style.cardContainer}>
//         {Array.from({ length: 6 }, (_, i) => i + 1).map((el) => (
//           <Card />
//         ))}
//       </div>
//     </div>
//   );
// }

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

export default Home;
