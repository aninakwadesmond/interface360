import { Form } from 'react-router-dom';
import Style from './join.module.scss';

function Join() {
  return (
    <div className={Style.join}>
      <div className={Style.content}>
        <h1>Lorem ipsum dolor sit amet, </h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
      </div>
      <div className={Style.form}>
        <Form>
          <input type="text" />
          <button type="submit">Sign Up</button>
        </Form>
      </div>
    </div>
  );
}

export default Join;
