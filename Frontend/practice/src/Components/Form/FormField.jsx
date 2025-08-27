import { Form } from 'react-router-dom';
import Overlay from '../overlay/Overlay';
import Style from './form.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faForward } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button/Button';
import { useContext, useEffect } from 'react';
import { QuizContext } from '../ContextApr/QuizContext';
import { json } from 'react-router-dom';
function FormField() {
  const {
    difficulty,
    questions,
    fetchQuestions,
    type,
    questionNumber,
    category,
    dispatch,
  } = useContext(QuizContext);
  function handleSetCategory(e) {
    dispatch({ type: 'category', payload: e });
  }
  function handleDifficulty(e) {
    dispatch({ type: 'difficulty', payload: e.target.value });
  }
  function handleSetType(e) {
    dispatch({ type: 'type', payload: e.target.value });
  }

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch(
  //       `https://opentdb.com/api.php?amount=${questionNumber}&category=${category}&difficulty=${difficulty}&type=${type}`
  //     );
  //     if (!response.ok) {
  //       if (questions.length > 0) return;
  //       dispatch({ type: 'loader', payload: false });
  //       dispatch({ type: 'ready', payload: true });
  //     } else {
  //       const responseData = await response.json();
  // dispatch({ type: 'loader', payload: false });
  // dispatch({ type: 'loadData', payload: responseData.results });
  // dispatch({ type: 'ready', payload: false });
  //     }
  //   }
  //   fetchData();
  // }, [fetchQuestions, questionNumber, type, category, difficulty]);

  useEffect(() => {
    async function fetchData() {
      if (fetchQuestions) {
        dispatch({ type: 'loader', payload: true });
      }
      // try {

      // } catch (error) {

      // }

      try {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=${questionNumber}&category=${category}&difficulty=${difficulty}&type=${type}`
        );
        console.log(response.status, response.ok);

        if (!response.ok) {
          dispatch({ type: 'ready', payload: true });
          throw new Error('Something went wrong');
        } else {
          dispatch({ type: 'ready', payload: false });
          const responseData = await response.json();
          dispatch({ type: 'loader', payload: false });
          dispatch({ type: 'loadData', payload: responseData.results });
          dispatch({ type: 'ready', payload: false });
          // dispatch({ type: 'ready', payload: false });
          // console.log(responseData.results, responseData);
        }
      } catch (error) {
        dispatch({ type: 'ready', payload: true });
        console.error(error.message);
      }
    }
    fetchData();
  }, [fetchQuestions, questionNumber, type, category, difficulty]);

  return (
    <>
      <Overlay />
      <div className={Style.formContainer}>
        <Form className={Style.formInput}>
          <NumberOfQuestions />
          <SelectCategory onSetCategory={handleSetCategory} />
          <SelectDifficulty
            difficulty={difficulty}
            setDifficulty={handleDifficulty}
          />
          <SelectType type={type} onSetType={handleSetType} />
        </Form>
        <Footer />
      </div>
    </>
  );
}

function SelectCategory({ onSetCategory }) {
  const { category } = useContext(QuizContext);
  return (
    <div className={Style.catLabel}>
      <label htmlFor="category">Select Category: </label>
      <select
        name=""
        id="category"
        className={Style.category}
        value={category}
        onChange={(e) => onSetCategory(e.target.value)}
      >
        <option value="">Any category</option>
        <option value="9">General Knowledge</option>
        <option value="10">Entertainment:books</option>
        <option value="11">Entertainment: films</option>
        <option value="12">Entertainment: Music</option>
        <option value="17">Science & Nature</option>
        <option value="18"> Science & Computers</option>
        <option value="19">Scinece & Mathematics</option>
        <option value="21">Sports</option>
        <option value="22">Geography</option>
        <option value="23">History</option>
        <option value="24">Politics</option>
        <option value="28">Vehicles</option>
        <option value="26">Celebraties</option>
      </select>
    </div>
  );
}

function SelectType({ type, onSetType }) {
  return (
    <div className={Style.typeLablel}>
      <label htmlFor="type">Select Type: </label>
      <select
        name=""
        id="type"
        className={Style.type}
        value={type}
        onChange={(e) => onSetType(e)}
      >
        <option value="">Any type</option>
        <option value="multiple">Multiples</option>
        <option value="boolean">True / False</option>
      </select>
    </div>
  );
}

function SelectDifficulty({ difficulty, setDifficulty }) {
  return (
    <div className={Style.difficultyLabel}>
      <label htmlFor="difficulty">Difficulty</label>
      <select
        name=""
        id="difficulty"
        className={Style.difficulty}
        value={difficulty}
        onChange={(e) => setDifficulty(e)}
      >
        <option value="">Any Diffulty</option>
        <option value="easy">Easy</option>
        <option value="meduim">Meduim</option>
        <option value="hard">HArd</option>
      </select>
    </div>
  );
}

function NumberOfQuestions() {
  const { dispatch, questionNumber } = useContext(QuizContext);
  function handleSetNumber(e) {
    dispatch({ type: 'questionNumber', payload: e.target.value });
  }
  return (
    <div className={Style.number}>
      <label htmlFor="number">Number of Questions: </label>
      <input
        type="number"
        name=""
        id=""
        className={Style.numberCount}
        value={questionNumber}
        onChange={(e) => handleSetNumber(e)}
      />
    </div>
  );
}

function Footer() {
  const { fetchQuestions, questionNumber, questions, dispatch } =
    useContext(QuizContext);

  // useEffect(() => {
  //   dispatch({ type: 'closeForm' });
  // }, [questions]);
  function handleSetQuestions() {
    if (!questionNumber) return;
    dispatch({ type: 'fetchQuestion' });
    dispatch({ type: 'closeForm' });
    dispatch({ type: 'loader', payload: true });
  }
  function handleBack() {
    console.log('back');
    dispatch({ type: 'back' });
  }
  return (
    <footer className={Style.footer}>
      <div className={Style.back}>
        <span className={Style.button}>Back</span>
        <span onClick={handleBack}>
          <FontAwesomeIcon icon={faBackward} />
        </span>
      </div>
      <div className={Style.next} onClick={handleSetQuestions}>
        <span className={Style.button}>Next</span>
        <span>
          <FontAwesomeIcon icon={faForward} />
        </span>
      </div>
    </footer>
  );
}
export default FormField;
