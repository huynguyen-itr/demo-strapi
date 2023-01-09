import {
  CardInfo,
} from "../../styles/CartStyles";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { ORDERS_QUERY } from "../../lib/query";
import { useQuery } from "urql";
import { useRouter } from "next/router";
import { useStateContext } from "../../lib/context";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import moment from "moment";

export default function ProductDetails() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    setToken(localStorage.getItem('jwt'));
    setUserId(localStorage.getItem('userId'));
  }, []);

  useEffect(() => {
    if (!token || !userId) {
      return;
    }
    
    axios.get('http://localhost:1337/api/orders', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(result => {
      console.log(result);
      setOrders(result.data.data);
    }).catch(error => {
      console.log(error);
    })

  }, [token, userId]);

  return (
    <div>
      <h1>My Orders</h1>
      {orders.length < 1 && (
        <h1>You not have any orders</h1>
      )}
      {orders.length >= 1 &&
        orders.map((order) => {
          const orderLocalTime = new Date(order.attributes.createdAt);
          const localTime = moment(orderLocalTime).format('LLL');
          return (
            <div key={order.id}>
              <hr></hr>
              <CardInfo style={{cursor: 'pointer'}} onClick={() => router.push(`/order/${order.id}`)}>
                <h3>Order date: {localTime}</h3>
                <h3>Total price: {order.attributes.totalPrice}$</h3>
                <h3>Total quantity: {order.attributes.totalQuantity}</h3>
              </CardInfo>
            </div>
          );
          })}
    </div>
  );
}
