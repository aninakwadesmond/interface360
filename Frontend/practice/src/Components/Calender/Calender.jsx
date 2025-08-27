import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Style from './Calender.module.scss';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useReducer } from 'react';

const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const initialValue = {
  dayOfMonth: new Date().getDate(),
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  counter: new Date().getMonth() + 1,
};

function reducer(state, action) {
  switch (action.type) {
    case 'nextMonth':
      return {
        ...state,
        month: state.month <= 10 ? state.month + 1 : 0,
        counter: state.counter > 11 ? 0 : state.counter + 1,
        year: state.month === 0 ? Number(state.year + 1) : state.year,
      };
    case 'prevMonth':
      return {
        ...state,
        month: state.month > 0 ? state.month - 1 : 11,
        counter: state.counter - 1,
        year: state.month <= 0 ? Number(state.year) - 1 : state.year,
      };
  }
}
function Calender() {
  const [{ dayOfMonth, month, year, counter }, dispatch] = useReducer(
    reducer,
    initialValue
  );
  const spaceCheck = new Date(year, month, 1).getDay();
  const date = new Date();
  console.log(date.getDate(), date.getMonth(), month, year);

  console.log(new Date(year, month).getDay(), date, spaceCheck);
  // const date = new Date();
  // let year = date.getFullYear();
  // let month = date.getMonth();
  // let dayOfMonth = date.getDate();

  // function handleNextMonth() {}
  function handlePrevMonth() {}

  function handleNextMonth() {
    dispatch({ type: 'prevMonth' });
    // if (month < -1) {
    //   month = 11;
    // }
  }
  return (
    <div div className={Style.calenderContainer}>
      <div className={Style.headline}>
        <p>{`${months[month]} ${dayOfMonth},${year}`}</p>
        <p className={Style.arrow}>
          <FontAwesomeIcon icon={faArrowLeft} onClick={handleNextMonth} />
          <FontAwesomeIcon
            icon={faArrowRight}
            onClick={() => dispatch({ type: 'nextMonth' })}
          />
        </p>
      </div>
      <div className={Style.calender}>
        {days.map((day) => (
          <div>{day}</div>
        ))}
      </div>
      <div className={Style.calender}>
        {spaceCheck
          ? Array.from({ length: spaceCheck }, (_, i) => i + 1).map((el) => (
              <div></div>
            ))
          : ''}
        {Array.from(
          { length: new Date(year, month + 1, 0).getDate() },
          (_, index) => index + 1
        ).map((el) => (
          //  console.log(date.getDate(), date.getMonth(), month, year);
          <div
            className={
              el === date.getDate() &&
              date.getMonth() === month &&
              date.getFullYear() === year
                ? Style.active
                : ''
            }
          >
            {el}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calender;
