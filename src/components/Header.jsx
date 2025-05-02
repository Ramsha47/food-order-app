import { useSelector } from 'react-redux';
import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';

export default function Header() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalNumberOfItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="restaurant" />
        <h1>FoodShop</h1>
      </div>
      <nav>
        <Button textOnly>Cart ({totalNumberOfItems})</Button>
      </nav>
    </header>
  );
}