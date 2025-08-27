import { useReducer } from 'react';
import Home from '../Components/Home/Home';
import Welcome from '../Components/Quiz/Questions';
import { QuizContext } from '../Components/ContextApr/QuizContext';
import MainQuestion from '../Components/MainQuestions.jsx/MainQuestion';
import FormField from '../Components/Form/FormField';
import Loader from '../Components/Loader/Loader';
import Failed from '../Components/Failed/Failed';
// import Questions from '../Components/Quiz/Questions';

const initialState = {
  open: false,
  questions: [],
  next: 0,
  fake: [],
  userChoice: '',
  correctAnswer: '',
  score: 0,
  check: false,
  form: true,
  questionNumber: 10,
  category: '',
  type: '',
  difficulty: '',
  fetchQuestions: false,
  loader: false,
  ready: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'openClose':
      return { ...state, open: action.payload };
    case 'loadData':
      return { ...state, questions: action.payload };
    case 'next':
      return {
        ...state,
        next:
          state.questions.length - 1 === state.next
            ? state.next
            : state.next + 1,
      };
    case 'fake':
      return { ...state, fake: action.payload };
    case 'userChoice':
      return { ...state, userChoice: action.payload };
    case 'correctAnswer':
      return { ...state, correctAnswer: action.payload };
    case 'score':
      return { ...state, score: state.score + 10 };
    case 'check':
      return { ...state, check: action.payload };
    case 'questionNumber':
      return {
        ...state,
        questionNumber: action.payload > 0 ? action.payload : 1,
      };
    case 'category':
      return { ...state, category: action.payload };
    case 'type':
      return { ...state, type: action.payload };
    case 'difficulty':
      return { ...state, difficulty: action.payload };
    case 'fetchQuestion':
      return {
        ...state,
        fetchQuestions: !state.fetchQuestions,
        // state.questionNumber > 0 ? action.payload : !state.fetchQuestions,
      };
    case 'closeForm':
      return { ...state, form: false };

    case 'loader':
      return { ...state, loader: action.payload };
    case 'ready':
      return { ...state, ready: action.payload };
    case 'back':
      return { ...state, open: false };
  }
}

function Quiz() {
  const [
    {
      open,
      next,
      fake,
      questions,
      userChoice,
      correctAnswer,
      score,
      check,
      form,
      questionNumber,
      category,
      type,
      difficulty,
      fetchQuestions,
      loader,
      ready,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  return (
    <QuizContext.Provider
      value={{
        open,
        dispatch,
        next,
        fake,
        questions,
        userChoice,
        correctAnswer,
        check,
        score,
        form,
        questionNumber,
        category,
        type,
        difficulty,
        fetchQuestions,
        loader,
        ready,
      }}
    >
      {!open && <Welcome />}

      {open && form && <FormField />}
      {open && fetchQuestions && questions.length > 0 && <MainQuestion />}
      {loader && questions.length === 0 && <Loader />}
      {open && ready && !form && <Failed />}
    </QuizContext.Provider>
  );
}

export default Quiz;
