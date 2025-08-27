import { useContext, useEffect, useReducer, useState } from 'react';
import Button from '../todoButton/Button';
import Style from './create.module.scss';
import TodoContext from '../ContextApr/TodoApi';
import { useActionData, useSubmit } from 'react-router-dom';
function CretateInput() {
  const { text, source, category, allData, share, dispatch } =
    useContext(TodoContext);
  const [counter, setCounter] = useState(200);
  const [eNum, setENum] = useState(0);
  const [cur, setCur] = useState(0);
  const submit = useSubmit();
  const data = useActionData();

  // function handleChange(type, e) {
  //   dispatch({ type: { type }, payload: e.target.value });
  // }

  useEffect(() => {
    document.querySelector('#focus').focus();
  }, []);

  function handleSubmit() {
    if (!text || !source || !category) return;
    submit({ text, source, category }, { method: 'post' });
    dispatch({ type: 'addData', payload: data });
    console.log(allData, data);
  }
  return (
    <div className={Style.create}>
      <div className={Style.mainInput}>
        <div className={Style.text}>
          <Input
            type="text"
            name="learn"
            value={text}
            case1="text"
            counter={counter}
            setCounter={setCounter}
            cur={cur}
            setCur={setCur}
            eNum={eNum}
            setENum={setENum}
          />
        </div>
        <span>{counter}</span>
      </div>
      <div className={Style.source}>
        {/* <input type="text" placeholder="trusted source" /> */}
        {/* <Input
          type="text"
          placeholder="trusted source"
          name="source"
          value={source}
          case1="source"
        /> */}
        <input
          type="text"
          name="source"
          value={source}
          className={Style.field}
          onChange={(e) =>
            dispatch({ type: 'source', payload: e.target.value })
          }
        />
      </div>
      <div className={Style.choose}>
        <select
          name="category"
          id=""
          placeholder="Choose a category"
          className={Style.field}
          value={category}
          onChange={(e) =>
            dispatch({ type: 'category', payload: e.target.value })
          }
        >
          <option value="technology">technology</option>
          <option value="science">science</option>
          <option value="finance">finance</option>
          <option value="society">society</option>
          <option value="entertainment">entertainment</option>
          <option value="health">health</option>
          <option value="history">history</option>
          <option value="News">News</option>
        </select>
      </div>
      <div onClick={handleSubmit} className={Style.but}>
        <Button>Post</Button>
      </div>
    </div>
  );
}

function Input({
  type,
  placeholder = '',
  name,
  value,
  case1,
  counter,
  setCounter,
  eNum,
  setENum,
  cur,
  setCur,
}) {
  const { dispatch } = useContext(TodoContext);
  function handleText(e) {
    if (!counter) return;
    dispatch({ type: case1, payload: e.target.value });
    console.log(e.target.value.length);
    setCounter((prev) => (cur > eNum ? prev - 1 : prev + 1));

    // if(e.target.value.length )
    setENum((prev) => {
      return cur;
    });
    setCur((prev) => e.target.value.length);

    // console.log(eNum);
  }
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      className={Style.field}
      id="focus"
      value={value}
      onChange={(e) => handleText(e)}
    />
  );
}
export default CretateInput;
