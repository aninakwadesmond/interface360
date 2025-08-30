import { useContext, useEffect } from 'react';
import TodoMain from '../TodoApp/TodoMain';
import Style from './Main.module.scss';
import { json } from 'react-router-dom';
import TodoContext from '../ContextApr/TodoApi';
function Main() {
  const { refresh, dispatch } = useContext(TodoContext);
  console.log(refresh);

  useEffect(() => {
    async function fetchData() {
      // 'http://localhost:5000/toLearn'
      const response = await fetch(
        `https://interface360-backends.onrender.com/toLearn`
      );
      if (!response.ok) {
        return json({ message: 'Data not found' }, { status: 301 });
      } else {
        const responseData = await response.json();
        dispatch({ type: 'loadData', payload: responseData });
        dispatch({ type: 'refresh' });
        console.log('again 2');
        // console.log(responseData);good
      }
    }
    fetchData();
  }, [refresh]);

  return (
    <div className={Style.main}>
      <TodoMain />
    </div>
  );
}

export default Main;
