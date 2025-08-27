import { useContext, useEffect, useState } from 'react';
import Learn from '../Learn/Learn';
import Button from '../todoButton/Button';
import Style from './style.module.scss';
import { json, useActionData } from 'react-router-dom';
import { TodoBodyContent } from '../ContextApr/TodoBody';
import TodoContext from '../ContextApr/TodoApi';
const Category = [
  '',
  'science',
  'technology',
  'finance',
  'society',
  'entertainment',
  'health',
  'history',
  'news',
];

function TodoBody({ share }) {
  const [sort, setSort] = useState('');
  // const { share } = useContext(TodoBodyContent);

  // const {};
  return (
    <TodoBodyContent.Provider value={{ sort, share }}>
      <div
        className={`${Style.bodyGrid} ${share && `${Style.magTop}`}`}
        style={!share ? { marginTop: '3.5rem' } : { marginTop: '-3.5rem' }}
      >
        <SideNav sort={sort} setSort={setSort} share={share} />
        <BodyContent sort={sort} setSort={setSort} share={share} />
      </div>
    </TodoBodyContent.Provider>
  );
}

function SideNav({ sort, setSort, share }) {
  const { dispatch } = useContext(TodoContext);
  let data = useActionData();
  if (!data) {
    data = [];
  }
  const [datalength, setDataLength] = useState(data.length);
  console.log(data.length, datalength);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:5000/toLearn/${sort}`);
      if (!response.ok) {
        return json({ message: 'Not found' }, { status: 3003 });
      } else {
        const responseData = await response.json();
        dispatch({ type: 'loadData', payload: responseData });
        setDataLength((prev) => prev + 1);
        return responseData;
      }
    }
    fetchData();
  }, [sort, data?.length]);

  function handleClick(el) {
    setSort(el);
  }
  return (
    <div
      className={`${Style.side} ${share && `${Style.sideTop}`}`}
      style={share ? { marginTop: '35px', zIndex: '10' } : {}}
    >
      {Category.map((el) => (
        <div className={Style.button} onClick={() => handleClick(el)}>
          <Button type={el}> {el.length === 0 ? 'All' : el}</Button>
        </div>
      ))}
    </div>
  );
}

function BodyContent({ sort, share, setSort }) {
  const { allData, addData } = useContext(TodoContext);
  let data = useActionData();

  console.log(data);
  if (allData.length > 0) {
    data = allData;
  }
  if ((allData.length === 0 && sort) || !data) {
    data = [];
  }

  // console.log(data);
  return (
    <div className={Style.content} style={share ? { marginTop: '180px' } : {}}>
      {data.length > 0 && data.map((el) => <Learn obj={el} sort={sort} />)}

      {/* <Learn />
      <Learn />
      <Learn /> */}
    </div>
  );
}

export default TodoBody;
