import { useContext, useEffect, useState } from 'react';
import Footer from '../FooterPage/Footer';
import Join from '../join/Join';
import Products from '../Products/products';
import Style from './detail.module.scss';
import { json } from 'react-router-dom';
import ShopCard from '../ECard/ShopCard';
import Shop from '../ContextApr/Shop';
import Shop2 from '../ECard2/Shop2';

function ProductsDetails() {
  const [related, setSimilar] = useState([]);
  const { Select, category, dispatchShop } = useContext(Shop);

  useEffect(() => {
    async function fetchData() {
      console.log('start....', category);
      const response = await fetch(
        `https://dummyjson.com/products/category/${category}?limit=4&skip=0`
      );
      if (!response.ok) {
        console.log('hello error');
        return json({ method: 'Error, data not fetched' }, { status: 3002 });
      } else {
        console.log('hello');
        const responseData = await response.json();
        setSimilar(responseData.products);
      }
    }
    fetchData();
  }, [category]);

  function handleSelect(e) {
    dispatchShop({ type: 'loadData', payload: e });

    dispatchShop({ type: 'category', payload: e.category });
    // dispatchShop({ type: 'loa' });
  }

  return (
    <>
      <Details />
      {/* <Products products={similar}>
        <h1>Features Products</h1>
      </Products> */}
      {/* <Heading /> */}
      {related.length > 0 && (
        <Products products={related} all={true}>
          <h1>Similar Products</h1>
        </Products>
        // <div className={Style.similar}>
        //   {related.map((relate, index) => (
        //     <div onClick={() => handleSelect(relate)}>
        //       <ShopCard allData={related[index]} />
        //     </div>
        //   ))}
        // </div>
      )}

      <Join />
      <Footer />
    </>
  );
}

function Heading() {
  return <h1 className={Style.head}>Similar Products</h1>;
}
function Details() {
  const { Select } = useContext(Shop);
  console.log(Select);
  const {
    thumbnail: image,
    category,
    price,
    title,
    images,
    description,
  } = Select;

  const [activeImage, setActiveImage] = useState(image);
  function handleImage(e) {
    // console.log(e, e.target, e.target.currentSrc);
    setActiveImage(e.target.currentSrc);
  }
  useEffect(() => {
    setActiveImage(image);
  }, [Select]);
  return (
    <div className={Style.gallery}>
      <div className={Style.images}>
        <div className={Style.main}>
          <img src={activeImage} />
        </div>
        <div className={Style.smallImages}>
          <div>
            <img src={image} />
          </div>

          {images.map(
            (image, index) =>
              index < 3 && (
                <div>
                  <img
                    src={image}
                    alt="carImage"
                    onClick={(e) => handleImage(e)}
                  />
                </div>
              )
          )}

          {/* <div>
            <img src="../../../public/images/bh-2.jpg" alt="carImage" />
          </div>
          <div>
            <img src="../../../public/images/bh-2.jpg" alt="carImage" />
          </div> */}
        </div>
      </div>
      <div className={Style.galleryInfo}>
        <div className={Style.items}>
          <p>{category}</p>
          <p className={Style.name}>{title}</p>
          <p className={Style.price}>${price}</p>
        </div>
        <div className={Style.select}>
          <select name="" id="">
            <option value="sm">Small</option>
            <option value="m">Meduim</option>
            <option value="l">Large</option>
            <option value="xl">Extra Large</option>
            <option value="xxl">3X Extra Larger</option>
          </select>
        </div>
        <div className={Style.input}>
          <input type="number" name="" id="" placeholder="Quantity" />
          <button type="submit">Add to Cart</button>
        </div>
        <div className={Style.content}>
          <h2>Products Details</h2>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductsDetails;
