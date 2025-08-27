import BlogHeading from '../BlogHead/BlogHeading';
import CartTable from '../CartGrid/CartTable';
import LoginForm from '../Login/LoginForm';

function Cart() {
  return (
    <div>
      <BlogHeading bg={'../../../public/images/gr-5.avif'}>
        <h2>#cart</h2>
        <p>Add your coupon code and save up to 70%</p>
      </BlogHeading>
      <CartTable />
    </div>
  );
}

export default Cart;
