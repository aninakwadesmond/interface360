// import TodoMain from '../../Components/TodoApp/TodoMain';
import { useReducer } from 'react';
import Main from '../../Components/TodoContainer/Main';
import TodoContext from '../../Components/ContextApr/TodoApi';
import { json } from 'react-router-dom';

const initialState = {
  text: '',
  source: '',
  category: '',
  allData: [],
  addData: [],
  getId: {},
  refresh: false,
  share: false,
};
function reducer(state, action) {
  switch (action.type) {
    case 'text':
      return { ...state, text: action.payload };
    case 'source':
      return { ...state, source: action.payload };
    case 'category':
      return { ...state, category: action.payload };
    case 'loadData':
      return { ...state, allData: action.payload };
    case 'getId':
      return { ...state, getId: action.payload };
    case 'refresh':
      return { ...state, refresh: !state.payload };
    case 'share':
      return { ...state, share: action.payload };
    case 'addData':
      return {
        ...state,
        addData: [...state.allData, action.payload],
      };
  }
}
function Todo() {
  const [
    { text, source, category, allData, getId, refresh, addData, share },
    dispatch,
  ] = useReducer(reducer, initialState);
  return (
    <TodoContext.Provider
      value={{
        text,
        source,
        category,
        allData,
        getId,
        refresh,
        addData,
        share,
        dispatch,
      }}
    >
      <Main />
    </TodoContext.Provider>
  );
}

export async function action({
  request,

  params,
}) {
  // console.log(request.method);
  // console.log(request, params);
  const text = await request.formData();
  const data = Object.fromEntries(text);
  console.log(data);
  //local =>
  //  http://localhost:5000/toLearn
  const dat = `https://interface360-backends.onrender.com/toLearn
   ${request.method == 'PUT' ? `` : ''}`;
  console.log(dat);
  const response = await fetch(
    dat,

    {
      method: request.method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) return json({ message: 'data not found' }, { status: 300 });
  else {
    // if (request.method === 'PUT') return;
    const responseData = await response.json();
    return responseData;
  }
}

export default Todo;
