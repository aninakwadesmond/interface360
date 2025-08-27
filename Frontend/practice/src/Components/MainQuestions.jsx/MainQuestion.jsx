import { height } from '@fortawesome/free-solid-svg-icons/faBookmark';
import Style from './questions.module.scss';
import { useContext, useEffect, useState } from 'react';
import Overlay from '../overlay/Overlay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCancel,
  faCircleArrowLeft,
  faClose,
} from '@fortawesome/free-solid-svg-icons';
import { QuizContext } from '../ContextApr/QuizContext';
import { json } from 'react-router-dom';

function MainQuestion() {
  const {
    questions,
    next,
    questionNumber,
    category,
    difficulty,
    type,
    dispatch,
  } = useContext(QuizContext);

  // useEffect(() => {
  //   async function fetchData() {
  //     dispatch({ type: 'loader', payload: true });
  //     console.log('object');
  //     const response = await fetch(
  //       `https://opentdb.com/api.php?amount=${questionNumber}&category=${category}&difficulty=${difficulty}&type=${type}`
  //     );

  //     if (!response.ok) {
  //       // return json({ message: 'Cannot load data' }, { status: 200 });
  //       dispatch({ type: 'ready', payload: true });
  //     } else {
  //       const responseData = await response.json();
  //       dispatch({ type: 'loadData', payload: responseData.results });
  //       dispatch({ type: 'loader', payload: false });
  //       // console.log(responseData.results, responseData);
  //     }
  //   }
  //   fetchData();
  // }, []);
  const [counter, setCounter] = useState(10 * questionNumber);
  useEffect(() => {
    // dispatch({ type: 'closeForm' });
    // const timeSet =
    //   +questionNumber * (difficulty === 'hard' && 5) ||
    //   (difficulty === 'meduim' && 7) ||
    //   (difficulty === 'easy' && 10) ||
    //   (difficulty === '' && 9);
    // console.log(timeSet, questionNumber, difficulty);
    // setCounter(timeSet);
  }, []);

  const [timer, setTime] = useState(counter);
  useEffect(() => {
    const timerId = setInterval(() => {
      setTime((timer) => (timer > 0 ? timer - 1 : 0));
    }, 1000);

    return function () {
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    dispatch({ type: 'ready', payload: false });
  }, []);
  return (
    <div className={Style.parent}>
      <Header timer={timer} />
      <Body />
      <Footer timer={timer} setTime={setTime} />
    </div>
  );
}

function Header({ timer }) {
  const { questions, score, next } = useContext(QuizContext);
  const percentage = Math.ceil(((next + 1) / questions.length) * 100);
  // console.log(percentage);
  return (
    <>
      {!timer && <Overlay />}
      {!timer && <GameOver />}
      <div className={Style.header}>
        <div className={Style.score}>
          <span>Score : </span>
          {`${score} / ${questions.length * 10}`}
        </div>
        <div className={Style.progress}>
          <div className={Style.progressInfo}>
            <div className={Style.progressbar}>
              <div
                className={Style.progressIn}
                style={{ width: `${percentage}%`, height: '100%' }}
              ></div>
            </div>
            <span>{`${percentage}%`}</span>
          </div>
          <p className={Style.number}>
            <span>Number : </span>
            {`${next + 1} / ${questions.length}`}
          </p>
        </div>
      </div>
    </>
  );
}

function Body() {
  const { questions, next, check, userChoice, dispatch } =
    useContext(QuizContext);
  const [alternatives, setAlternatives] = useState([]);
  const {
    question,
    correct_answer: answer,
    incorrect_answers: incorrects,
  } = questions[next];

  function handleUserSelect(select) {
    dispatch({ type: 'userChoice', payload: select });
  }

  useEffect(() => {
    const options = [...incorrects, answer];
    dispatch({ type: 'correctAnswer', payload: answer });
    dispatch({ type: 'userChoice', payload: '' });

    function shufflData(options) {
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); //0, 1, 2
        [options[i], options[j]] = [options[j], options[i]];
      }
      setAlternatives(options);
    }
    shufflData(options);
  }, [next]);

  function checkAnswer(option) {
    if (!check) return;
    if (option === answer) {
      return Style.correct;
    } else {
      return Style.wrong;
    }
  }

  // console.log(check);
  return (
    // {questions[next]}
    <div className={Style.body}>
      <h2 className={Style.main}>{question}</h2>
      <ul className={Style.alternatives}>
        {alternatives.map((alt) => (
          <li
            onClick={() => handleUserSelect(alt)}
            className={`${
              !check ? '' : alt === answer ? Style.correct : Style.wrong
            } ${userChoice === alt && Style.opacity}`}
          >
            {alt}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Footer({ timer, setTime }) {
  const { dispatch, userChoice, correctAnswer, next, questions } =
    useContext(QuizContext);

  // console.log(next, questions.length - 1);

  function handleNext() {
    if (!userChoice) return;
    dispatch({ type: 'check', payload: true });
    setTimeout(() => {
      dispatch({ type: 'next' });
      if (userChoice === correctAnswer) {
        dispatch({ type: 'score' });
        dispatch({ type: 'userChoice', payload: '' });
      }
      if (next == questions.length - 1) {
        setTime(0);
      }
      dispatch({ type: 'check', payload: false });
    }, 2000);
  }
  const minute = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <div className={Style.footer}>
      <div className={Style.timer}>{`${
        minute < 10 ? `0${minute}` : `${minute}`
      }: ${seconds < 10 ? `0${seconds}` : `${seconds}`}`}</div>
      <button className={Style.button} onClick={handleNext}>
        {next === questions.length - 1 ? 'Finish' : 'Next'}
      </button>
    </div>
  );
}

function GameOver() {
  const { score, dispatch } = useContext(QuizContext);
  function handleClose() {
    dispatch({ type: 'openClose', payload: false });
  }
  return (
    <div className={Style.over}>
      <div className={Style.gameOver}>
        <button className={Style.close} onClick={handleClose}>
          {/* <FontAwesomeIcon icon={faClose} />{' '} */}
          <img src="../../../public/images/Cancel.png" alt="" />
        </button>
        <div className={Style.scoreBoard}>
          <p className={Style.gradientText}>You are a beginner</p>
          <p>{`${score}%`}</p>
          <p>🤣</p>
        </div>
        <button className={Style.button} onClick={handleClose}>
          Restart <FontAwesomeIcon icon={faCircleArrowLeft} />
        </button>
      </div>
    </div>
  );
}

export default MainQuestion;
