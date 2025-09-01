import { useContext, useEffect, useReducer } from 'react';
import CallAction from '../CallAction/CallAction';
import ShopCard from '../ECard/ShopCard';
import Style from './product.module.scss';
import { Ecom } from '../ContextApr/Ecom';
import { json, useLoaderData } from 'react-router-dom';
import Navigate from '../ContextApr/Navigate';
import Shop from '../ContextApr/Shop';
import Pagination from '../pagination/Pagination';

const initialState = { search: '', container: [], skip: 0 };
function reducer(state, action) {
  switch (action.type) {
    case 'search':
      return { ...state, search: action.payload };
    case 'contain':
      return { ...state, container: action.payload };
    case 'skip':
      return {
        ...state,
        skip: action.payload == 0 ? 0 : state.skip + 10,
      };
  }
}
function Products({ children, many = 8, products, all = false }) {
  console.log('hello running');
  const [{ search, container, skip }, dispatch2] = useReducer(
    reducer,
    initialState
  );
  // const

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://dummyjson.com/products/${
          search ? `category/${search}` : ''
        }?limit=20&skip=${skip}`
      );
      if (!response.ok) {
        return json({ message: 'Not found' }, { status: 404 });
      } else {
        const responseData = await response.json();
        console.log('searchfjfff', responseData.products);
        dispatch2({ type: 'contain', payload: responseData.products });
      }
      //
    }
    fetchData();
  }, [search, skip]);

  //   allData = data;
  // }

  // useEffect(() => {
  //   async function fetchData() {
  //     console.log(cur);
  //     const response = await fetch(
  //       `https://dummyjson.com/products/${
  //         cur ? `category/${cur}` : ''
  //       }?limit=10&skip=0`
  //     );
  //     if (!response.ok) {
  //       return json({ message: 'System Error' }, { status: 304 });
  //     } else {
  //       const responseData = await response.json();
  //       console.log(responseData);
  //       dispatch({ type: 'data', payload: responseData });
  //     }
  //   }
  //   fetchData();
  // }, [cur]);

  console.log(products);
  const { dispatchShop } = useContext(Shop);
  function handleSelect(e) {
    dispatchShop({ type: 'loadData', payload: e });

    dispatchShop({ type: 'category', payload: e.category });
    // dispatchShop({ type: 'loa' });
  }
  return (
    <Navigate.Provider value={{ search, dispatch2, skip }}>
      {children ? <Heading>{children}</Heading> : ''}
      {!all && (
        <>
          <FeaturesLink />
        </>
      )}
      <>
        <div className={Style.card}>
          {
            // products
            // container.length === 0
            //   ?
            // products?
            // :
            ((container.length > 0 && products?.length > container.length) ||
            container[0]?.id > products[0]?.id
              ? container
              : products
            ).map((el) => (
              <div onClick={() => handleSelect(el)}>
                <ShopCard allData={el} />
              </div>
            ))
          }
          {/*  */}
        </div>
        <Pagination />
      </>
    </Navigate.Provider>
  );
}

function Heading({ children }) {
  return (
    <div className={Style.heading}>
      <div className={Style.header}>
        {children}
        <p>Summer Collection New Modern Design</p>
      </div>
    </div>
  );
}

function FeaturesLink() {
  // const { dispatch } = useContext(Ecom);
  const { dispatch2 } = useContext(Navigate);

  function handleSetState(state) {
    // dispatch({ type: 'cur', payload: state });
    dispatch2({ type: 'search', payload: state });
    dispatch2({ type: 'skip', payload: 0 });
  }

  // function hnadleSearch(e) {
  //   dispatch({ type: 'search', payload: e });
  // }
  const items = [
    'tops',
    'mens-shoes',
    'mens-watches',
    'womens-dresses',
    'womens-shoes',
    'smartphones',
    'laptops',
    'groceries',
    'beauty',
    'furniture',
  ];
  return (
    <div className={Style.mainContainer}>
      <div className={Style.items}>
        {items.map((el) => (
          <p value={el} onClick={() => handleSetState(el)}>
            {el}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Products;
