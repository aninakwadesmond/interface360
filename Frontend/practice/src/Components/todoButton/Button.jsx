import Style from './b.module.scss';
function Button({ children, type }) {
  // const Category = [
  //   '',
  //   'science',
  //   'technology',
  //   'finance',
  //   'society',
  //   'entertainment',
  //   'health',
  //   'history',
  //   'news',
  // ];
  console.log(type);
  let brand;
  switch (type) {
    case '':
      brand = '';
      break;
    case 'science':
      brand = 'green';
      break;
    case 'technology':
      brand = 'blue';
      break;
    case 'finance':
      brand = 'orangered';
      break;
    case 'society':
      brand = 'yellow';
      break;
    case 'entertainment':
      brand = 'pink';
      break;
    case 'health':
      brand = 'lightgreen';
      break;
    case 'history':
      brand = 'orange';
      break;
    case 'news':
      brand = 'violet';
      break;
  }

  return (
    <button className={Style.button} style={{ background: brand }}>
      {children}
    </button>
  );
}

export default Button;
