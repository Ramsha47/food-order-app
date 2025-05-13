import Modal from "./UI/Modal";
import { useSelector ,useDispatch} from "react-redux";
import { currencyFormatter } from "../util/formatting";
import { hideCheckout } from "../store/userProgressSlice";
import Button from "./UI/Button";
import Input from "./UI/Input";
import useHttp from "../hooks/useHttp";

export default function Checkout(){
    const requestConfig={
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
    }
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const isCheckoutOpen = useSelector((state) => state.userProgress?.progress === 'checkout') || false;

    const {data, isLoading: isSending , error , sendRequest}=useHttp
    (
        "http://localhost:3000/ordersss", requestConfig

    )


    const cartTotal = cartItems.reduce((totalPrice, item) => totalPrice + item.quantity * Number(item.price), 0);

    const handleCloseCheckout = () => {
        dispatch(hideCheckout());
      };

    const handleSubmit = (event)=>{
      event.preventDefault()
      const fd = new FormData(event.target)
      const customerData = Object.fromEntries(fd.entries()) //{email: value}

      sendRequest(JJSON.Stringify({
        order:{
            items:cartItems,
            customer:customerData
        }
      }))
     
    }

    let actions = (
        <>
          <Button type="button" textOnly onClick={handleCloseCheckout}>Close</Button>
          <Button >Submit Order</Button>
        </>
    )

    if(isSending){
        actions = <span>
             Sending order data ....
        </span>
    }
    
    return (
        <Modal open={isCheckoutOpen} onClose={handleCloseCheckout}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount:{currencyFormatter.format(cartTotal)}</p>
                <Input  label="Full-name" type="text" id="name"/>
                <Input  label="Email Address" type="email" id="email"/>
                <Input  label="Street" type="text" id="street"/>
                <div className="control-row">
                   <Input label="Postal Code" type="text" id="postal-code" />
                   <Input label="City" type="text" id="city"/>
                </div>
                {error && <Error title= "failed to submit order" message={error} />}
                <p className="modal-actions">
                     {actions}
                </p>
            </form>
        </Modal>
    )
}


// FORM HANDLING
/* 
   We actually can use two approahes to handle the form data submission 
   1. manually using onsubmit 
   2. using formactions provided by react
*/