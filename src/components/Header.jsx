import { useSelector, useDispatch } from 'react-redux';
import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';
import { showCart } from '../store/userProgressSlice';

export default function Header() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalNumberOfItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleOpenCart = () => {
    dispatch(showCart());
  };

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="restaurant" />
        <h1>FoodShop</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleOpenCart}>
          Cart ({totalNumberOfItems})
        </Button>
      </nav>
    </header>
  );
}