import Details from '../Components/Details/Details';
import CartItems from '../Components/ChartItems/CartItems';
import ContextMain from '../Components/ContextApr/Context';
import CarContext from '../Components/ContextApr/CarContext';
import { useContext, useState } from 'react';
import Contact from '../Components/getUS/Contact';
import Message from '../Components/message/Message';
import { json } from 'react-router-dom';

function CarDetails() {
  const { cart, SelectedItem, dispatch, carObj } = useContext(ContextMain);
  const [buy, setBuy] = useState(false);
  const [message, setMessage] = useState(false);

  return (
    <CarContext.Provider
      value={{ buy, setBuy, message, setMessage, SelectedItem, dispatch }}
    >
      {message && <Message />}
      {buy && <Contact />}
      {cart && <CartItems carsSelelcted={SelectedItem} />}
      <Details />
    </CarContext.Provider>
  );
}

export default CarDetails;
const api = 'ZrQEPSkKYW5pbmFrd2FoZGVzbW9uZDNAZ21haWwuY29t';

export async function loader({ request, params }) {
  const carMake = params.details;
  const response = await fetch(
    `https://corsproxy.io/?${encodeURIComponent(
      `https://auto.dev/api/listings?apikey=${api}&make=${carMake}&`
    )}`
  );

  if (!response.ok) {
    return json({ message: 'could not fetch Data' }, { status: 300 });
  } else {
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  }
}
