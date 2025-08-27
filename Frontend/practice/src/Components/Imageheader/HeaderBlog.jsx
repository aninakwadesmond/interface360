import { Await, Link, useRouteLoaderData } from 'react-router-dom';
import ShopCard from '../ECard/ShopCard';
import Footer from '../FooterPage/Footer';
import Join from '../join/Join';
import Style from './header.module.scss';
import BlogHeading from '../BlogHead/BlogHeading';
import Bottton from '../ButtonS/Bottton';
import Pagination from '../pagination/Pagination';
import { Suspense, useContext } from 'react';
import Search from '../Links/Search';
import Shop from '../ContextApr/Shop';
import Products from '../Products/products';

function HeaderBlog() {
  const { shop } = useRouteLoaderData('shop-info');

  const { dispatchShop } = useContext(Shop);

  function handleSelect(e) {
    dispatchShop({ type: 'loadData', payload: e });
    console.log(e);
    dispatchShop({ type: 'category', payload: e.category });
    // dispatchShop({ type: 'loa' });
  }

  return (
    <>
      <BlogHeading bg={'../../../public/images/gr-7.avif'}>
        <h2>#Stay Home</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing </p>
      </BlogHeading>
      {/* <Search /> */}
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={shop}>
          {(shop) => (
            <Products products={shop}></Products>
            // // <div className={Style.card}>
            // //   {shop.map((el) => (
            // //     <div onClick={() => handleSelect(el)}>
            //       {/* <ShopCard allData={el} /> */}

            //         {/* <h1>Features Products</h1> */}

            //     {/* </div>
            //   ))}
            // </div> */}
          )}
        </Await>
      </Suspense>
      {/* <div className={Style.card}>
        {Array.from({ length: 16 }, (_, index) => index).map((el) => (
          <Link to="/shop/shopping/2">
            <ShopCard />
          </Link>
        ))}
      </div> */}
      {/* <Pagination /> */}
      <Join />
      <Footer />
      {/* </Pagina> */}
    </>
  );
}

// function Button({ children }) {
//   return <button className={Style.bottom}>{children}</button>;
// }
export default HeaderBlog;
