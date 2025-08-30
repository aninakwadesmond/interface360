import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Button/Button';
import Style from './Quiz.module.scss';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons/faArrowAltCircleRight';
import { useContext } from 'react';
import { QuizContext } from '../ContextApr/QuizContext';
// import { json } from 'react-router-dom';

function Welcome() {
  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch('https://opentdb.com/api.php?amount=10');

  //     if (!response.ok) {
  //       return json({ message: 'Cannot load data' }, { status: 200 });
  //     } else {
  //       const responseData = await response.json();
  //       dispatch({ type: 'loadData', payload: responseData.results });
  //       console.log(responseData.results, responseData);
  //     }
  //   }
  //   fetchData();
  // }, []);
  const { dispatch } = useContext(QuizContext);

  function handleOpen() {
    dispatch({ type: 'openClose', payload: true });
  }
  return (
    <div className={Style.container}>
      <div className={Style.welcome}>
        <video
          src="./images/back.mp4"
          autoPlay
          muted
          loop
          playsInline
          className={Style.background}
        />
        <h2>Learn by answering</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut similique
          nostrum temporibus corporis officiis, cupiditate eos vel ab
        </p>
        <div className={Style.button} onClick={handleOpen}>
          <Button>
            <span>
              <span> Next</span>
              <span>
                {' '}
                <FontAwesomeIcon icon={faArrowAltCircleRight} />
              </span>
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
