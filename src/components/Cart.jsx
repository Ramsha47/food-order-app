import { useSelector, useDispatch } from 'react-redux';
import Modal from './UI/Modal';
import { currencyFormatter } from '../util/formatting';
import Button from './UI/Button';
import { hideCart, showCheckout } from '../store/userProgressSlice';
import CartItem from './CartItem';
import { addItem, removeItem } from '../store/cartSlice';

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const isCartOpen = useSelector((state) => state.userProgress?.progress === 'cart') || false;
  const cartTotal = cartItems.reduce((totalPrice, item) => totalPrice + item.quantity * Number(item.price), 0);

  const handleCloseCart = () => {
    dispatch(hideCart());
  };

  const handleGoToCheckout = () => {
    dispatch(showCheckout());
  };

  if (!isCartOpen) return null;

  return (
    <Modal className="cart" open={isCartOpen} >
      <h2>Your Cart</h2>
      <ul>
        {cartItems.length === 0 ? (
          <li>Your cart is empty</li>
        ) : (
          cartItems.map((item) => (
            // <li key={item.id}>
            //   {item.name} - {item.quantity}
            // </li>  // because now we have seprate comp
            <CartItem 
            key={item.id} 
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={cartItems.addItem(item)}
            onDecrease={cartItems.removeItem(item.id)}
            />
          ))
        )}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {cartItems.length > 0 && (
          <Button textOnly onClick={handleGoToCheckout}>
            Go to Checkout
          </Button>
        )}
      </p>
    </Modal>
  );
}