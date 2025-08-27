import { useContext } from 'react';
import CretateInput from '../createNote/CretateInput';
import Todonav from '../Todo/Todonav';
import TodoBody from '../TodoBody/TodoBody';
import Style from './style.module.scss';
import TodoContext from '../ContextApr/TodoApi';
function TodoMain() {
  const { text, share } = useContext(TodoContext);
  return (
    <div className={Style.main}>
      <div className={Style.nav}>
        <Todonav />
        {share && <CretateInput />}
      </div>
      <TodoBody share={share} />
    </div>
  );
}

export default TodoMain;
