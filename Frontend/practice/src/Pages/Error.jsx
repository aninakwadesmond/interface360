import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import Navigation from '../Components/Navgation/Navigation';
import PageError from '../Components/PageError/PageError';
import NewsNav from '../Components/newsNavigation/newsNav';

function Error() {
  const error = useRouteError();
  console.log(isRouteErrorResponse(error));

  const navigate = navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(`latitude : ${latitude}  longitude: ${longitude}`);
    },
    (error) => {
      console.error('Error getting location', error.message);
    }
  );
  console.log(navigate);

  console.log(error);
  return (
    <>
      {/* <NewsNav /> */}
      <PageError title={'An error occured'}>
        <p>Could not fetch car Information</p>
      </PageError>
    </>
  );
}

export default Error;
