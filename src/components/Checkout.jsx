import Modal from "./UI/Modal";
import { useSelector ,useDispatch} from "react-redux";
import { currencyFormatter } from "../util/formatting";
import { hideCart , showCheckout } from "../store/userProgressSlice";
import Input from "./UI/Input";

export default function Checkout(){
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const isCartOpen = useSelector((state) => state.userProgress?.progress === 'checkout') || false;
    const cartTotal = cartItems.reduce((totalPrice, item) => totalPrice + item.quantity * Number(item.price), 0);

    const handleCloseCart = () => {
        dispatch(hideCart());
      };
    
    const handleGoToCheckout = () => {
        dispatch(showCheckout());
    };


    return (
        <Modal open={isCartOpen}>
            <form>
                <h2>Checkout</h2>
                <p>Total Amount:{currencyFormatter.format(cartTotal)}</p>
                <Input  label="Full-name" type="text" id="full-name"/>
                <Input  label="Email Address" type="email" id="email"/>
                <Input  label="Street" type="text" id="street"/>
                <div className="control-row">
                   <Input label="Postal Code" type="text" id="postal-code" />
                   <Input label="City" type="text" id="city"/>
                </div>
                <p className="modal-actions">
                    <Button type="button" textOnly onClick={handleCloseCart}>Close</Button>
                    <Button >Submit Order</Button>
                </p>
            </form>
        </Modal>
    )
}