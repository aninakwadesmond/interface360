import Navigation from '../Components/Navgation/Navigation';
import SideMenu from '../Components/SideMenu/SideMenu';
import Cars from '../Components/CarsContent/Cars';
import MainContent from '../Components/MainContent/MainContent';
import ChangeLink from '../Components/ContextApr/Link';
import { useState, useReducer, useContext, useEffect } from 'react';
import ContextMain from '../Components/ContextApr/Context';
import { useLoaderData, Await, defer } from 'react-router-dom';
import { Suspense } from 'react';
import CartItems from '../Components/ChartItems/CartItems';
import { json } from 'react-router-dom';

const api = 'ZrQEPSkKYW5pbmFrd2FoZGVzbW9uZDNAZ21haWwuY29t';

const initialState = {
  Bookmark: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'addbook':
      return {
        ...state,
        Bookmark: [...state.Bookmark, action.payload].filter(
          (obj, index, self) => index === self.findIndex((o) => o.id === obj.id)
        ),
      };
    case 'remove':
      return {
        ...state,
        Bookmark: [...state.Bookmark].filter(
          (book) => book.id !== action.payload.id
        ),
      };
  }
}

function CarsPage() {
  const { data, color } = useLoaderData();
  console.log(data, color);
  // console.log(data);
  const { setOpenModal, openModal } = useContext(ContextMain);
  console.log(setOpenModal, openModal);
  const [link, setLink] = useState(false);
  const [{ Bookmark }, dispatch3] = useReducer(reducer, initialState);
  function handleSetLink() {
    setLink(true);
    setOpenModal(false);
  }
  function handleClose() {
    setLink(false);
  }
  return (
    <ChangeLink.Provider
      value={{ link, handleSetLink, handleClose, dispatch3, Bookmark }}
    >
      {/* <div
        style={{
          width: '100%',
          height: '80px',
          backgroundColor: 'red',
          display: 'block',
        }}
      ></div> */}

      <MainContent>
        {link && <CartItems carsSelelcted={Bookmark} />}
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
          <Await resolve={color}>
            {(colorData) => <SideMenu header="Categories" color={colorData} />}
          </Await>
        </Suspense>
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
          <Await resolve={data}>{(carData) => <Cars data={carData} />}</Await>
        </Suspense>
      </MainContent>
    </ChangeLink.Provider>
  );
}
export default CarsPage;

// export async function loader() {
//   const response = await fetch(
//     'https://auto.dev/api/listings?apikey=ZrQEPSkKYW5pbmFrd2FoZGVzbW9uZDNAZ21haWwuY29t'
//   );

//   if (!response.ok) {
//     throw new Response(JSON.stringify({ message: 'No available data' }), {
//       status: 500,
//     });
//   } else {
//     return response;
//   }
// }

export async function loaderCar() {
  const response = await fetch(
    // `https://corsproxy.io/?${encodeURIComponent(
    //   `https://auto.dev/api/listings?apikey=${api}&price_max=60000&year_min=2016&make=Audi&condition[]=used&exterior_color[]=black`
    // )}`
    `https://corsproxy.io/?${encodeURIComponent(
      `https://auto.dev/api/listings?apikey=${api}`
    )}`
  );

  if (!response.ok) {
    // throw new Response(JSON.stringify({ message: 'No available data' }), {
    //   status: 500,
    // });
    throw json({ message: 'Error message' }, { status: 232 });
  } else {
    const responseData = await response.json();
    return responseData.records;
  }
}

export async function colorLoader() {
  const response = await fetch(
    'https://www.thecolorapi.com/scheme?rgb=rgb(0,71,13)&mode=analogic&count=30'
  );
  if (!response.ok) {
    // throw new Response(JSON.stringify({ message: 'Could not fetch color' }), {
    //   status: 300,
    // });
    throw json({ message: 'Could not fetch colorData' }, { status: 303 });
  } else {
    const responseData = await response.json();
    return responseData.colors;
  }
}

export async function loader() {
  return defer({
    data: loaderCar(),
    color: await colorLoader(),
  });
  // return defer({
  //   data: loaderCar(),
  //   color: colorLoader(),
  // });
}
