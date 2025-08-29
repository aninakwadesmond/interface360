import { useContext, useEffect, useState } from 'react';
import Button from '../todoButton/Button';
import Style from './learn.module.scss';
import { json, useActionData, useSubmit } from 'react-router-dom';
import TodoContext from '../ContextApr/TodoApi';
import { TodoBodyContent } from '../ContextApr/TodoBody';
import ChangeLink from '../ContextApr/Link';
function Learn({ obj, sort }) {
  const { text, category, liked, mindblowing, dislike } = obj;
  const { getId } = useContext(TodoContext);
  // console.log(getId);
  const submitt = useSubmit();
  const [check, setCheck] = useState(false);

  //edit
  // useEffect(() => {
  //   async function UpdateData() {
  //     // if (!getId.name || !getId.obj.id) return;
  //     // console.log(getId);
  //     const response = await fetch('http://localhost:3000/toLearn/edit', {
  //       method: 'PUT',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(getId),
  //     });
  //     if (!response.ok) {
  //       return json({ message: 'An Error found' }, { status: 3002 });
  //     } else {
  //       const data = await response.json();
  //       console.log(data);
  //     }
  //   }
  //   UpdateData();
  // }, []);

  return (
    <div className={Style.text}>
      <div className={Style.content}>
        <Text source="source">{text}</Text>
        <Category>{category}</Category>
      </div>
      <div className={Style.likes}>
        <Like
          emoji="🙄"
          like={liked}
          obj={obj}
          named="liked"
          check={setCheck}
        />
        <Like
          emoji="🙄"
          like={mindblowing}
          obj={obj}
          named="mindblowing"
          check={setCheck}
        />
        <Like
          emoji="🙄"
          like={dislike}
          obj={obj}
          named="dislike"
          check={setCheck}
        />
      </div>
    </div>
  );
}

function Like({ emoji, like, obj, named, check }) {
  const { sort } = useContext(TodoBodyContent);
  const submit = useSubmit();
  const { dispatch } = useContext(TodoContext);
  const [likes, setLikes] = useState('');
  const [count, setCount] = useState(0);
  const [curNumber, setcurNumber] = useState(1);
  useEffect(() => {
    async function fetchData() {
      if (count <= 0) return;
      const response = await fetch(
        'https://interface360.onrender.com/toLearn/put',
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ named, id: obj.id, curNumber }),
        }
      );
      if (!response.ok) {
        return json({ message: 'Error fetch' }, { status: 400 });
      } else {
        const responseData = await response.json();
        console.log(responseData);
        if (responseData.success) {
          const responseCall = await fetch(
            `https://interface360.onrender.com/toLearn/${sort}`
          );
          if (!response.ok) {
            return json({ message: 'A lot of data' }, { status: 304 });
          } else {
            const responseData = await responseCall.json();
            dispatch({ type: 'loadData', payload: responseData });
            // console.log(responseData);
          }

          // dispatch({ type: 'refresh' });
        }
      }
    }
    fetchData();
  }, [count]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://interface360.onrender.com/toLearn/${obj.id}/${named}`
      );
      if (!response.ok) {
        return json({ message: 'Data not updated' }, { status: 3002 });
      } else {
        const responseData = await response.json();

        const dbNumber = Object.values(responseData[0])[0];
        setcurNumber(dbNumber);

        console.log(dbNumber + 1);
        console.log(curNumber, Object.values(responseData[0])[0], count);

        console.log(responseData);
        console.log(curNumber);
      }
    }
    fetchData();
  }, [count, curNumber]);

  function handleClick(e) {
    setCount((prev) => prev + 1);
    setcurNumber((prev) => prev + 1);
    dispatch({ type: 'getId', payload: { named, id: obj.id, count } });

    // submit({ named, id: obj.id, count }, { method: 'put' });
    // check((prev) => !prev);
    // setLikes(named);
  }
  return (
    <div className={Style.like} value={likes}>
      <div onClick={(e) => handleClick(e)}>
        <span>{emoji}</span>
        <span>{like}</span>
      </div>
    </div>
  );
}

function Text({ children, source }) {
  return (
    <div className={Style.body}>
      <p>
        {children} <span>(`${source}`)</span>
      </p>
    </div>
  );
}

function Category({ children }) {
  return (
    <div>
      <p className={Style.type}>
        <Button type={children.toLowerCase()}>{children}</Button>
      </p>
    </div>
  );
}

// async function action({ request, params }) {
//   const form = await request.formData();
//   const formData = Object.fromEntries(form);
//   console.log('hello i am called');
//   console.log(formData);
// }

export default Learn;
