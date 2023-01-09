import axios from "axios";
import {
  CartStyle,
  Card,
  EmptyStyle,
  CartWrapper,
  CardInfo,
  Checkout,
} from "../styles/CartStyles";
import { Quantity } from "../styles/ProductDetails";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
//Import State
import { useStateContext } from "../lib/context";
import getStripe from "../lib/getStripe";

export default function Cart() {
  const { cartItems, setShowCart, onAdd, onRemove, totalPrice, totalQuantities } = useStateContext();

  const handleCheckout = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('jwt');
      
      const variables = {
        data: {
          user: userId,
          totalPrice,
          totalQuantity: totalQuantities,
          stripeSessionId: sessionId,
          cartItems
        }
      };
      
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const order = await axios.post(`http://192.168.20.230:1337/api/orders`, variables, headers);
      const orderId = order.data.data.id;
  
      const stripePromise = await getStripe();
      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          userId
        },
        body: JSON.stringify({
          cartItems,
          orderId,
          userId
        }),
      });
      const data = await response.json();
      const sessionId = data.id;
      console.log('cartItems', cartItems);
      await stripePromise.redirectToCheckout({ sessionId }); 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CartWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowCart(false)}
    >
      <CartStyle
        layout
        initial={{ x: "50%" }}
        animate={{ x: 0 }}
        exit={{ x: "50%" }}
        transition={{ type: "tween" }}
        onClick={(e) => e.stopPropagation()}
      >
        {cartItems.length < 1 && (
          <EmptyStyle
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h1>You have more shopping to do 😉</h1>
            <FaShoppingCart />
          </EmptyStyle>
        )}
        {cartItems.length >= 1 &&
          cartItems.map((item) => {
            return (
              <Card
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: 0.4 } }}
                key={item.slug}
              >
                <img src={item.image.data.attributes.formats.thumbnail.url} />
                <CardInfo>
                  <h3>{item.name}</h3>
                  <h3>{item.price}$</h3>
                  <Quantity>
                    <span>Quantity</span>
                    <button onClick={() => onRemove(item ,1)}>
                      <AiFillMinusCircle />
                    </button>
                    <p>{item.quantity}</p>
                    <button onClick={() => onAdd(item, 1)}>
                      <AiFillPlusCircle />
                    </button>
                  </Quantity>
                </CardInfo>
              </Card>
            );
          })}
        <Checkout layout>
          {cartItems.length >= 1 && (
            <div>
              <h3>Subtotal ${totalPrice}</h3>
              <button onClick={handleCheckout}>Purchase</button>
            </div>
          )}
        </Checkout>
      </CartStyle>
    </CartWrapper>
  );
}
