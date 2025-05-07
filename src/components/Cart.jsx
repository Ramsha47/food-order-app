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

  // Handler for increasing item quantity
  const handleIncrease = (item) => {
    dispatch(addItem(item));
  };

  // Handler for decreasing item quantity
  const handleDecrease = (id) => {
    dispatch(removeItem(id));
  };

  if (!isCartOpen) return null;

  return (
    <Modal 
    className="cart" 
    open={isCartOpen}
    onClose={isCartOpen ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartItems.length === 0 ? (
          <li>Your cart is empty</li>
        ) : (
          cartItems.map((item) => (
            <CartItem
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              onIncrease={() => handleIncrease(item)} // Dispatch addItem
              onDecrease={() => handleDecrease(item.id)} // Dispatch removeItem
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
          <Button  onClick={handleGoToCheckout}>
            Go to Checkout
          </Button>
        )}
      </p>
    </Modal>
  );
}