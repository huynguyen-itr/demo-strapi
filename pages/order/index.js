import {
  CardInfo,
} from "../../styles/CartStyles";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { ORDERS_QUERY } from "../../lib/query";
import { useQuery } from "urql";
import { useRouter } from "next/router";
import { useStateContext } from "../../lib/context";
import toast from "react-hot-toast";
import { useEffect } from "react";
import moment from "moment";

export default function ProductDetails() {
  const router = useRouter();
  const [results] = useQuery({
    query: ORDERS_QUERY,
    // variables: { slug: query.slug },
  });
  const { data, fetching, error } = results;
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const orders = data.orders.data;

  return (
    <div>
      {orders.length < 1 && (
        <h1>You not have any orders</h1>
      )}
      {orders.length >= 1 &&
        orders.map((order) => {
          const orderLocalTime = new Date(order.attributes.createdAt);
          const localTime = moment(orderLocalTime).format('LLL');
          return (
            <div>
              {/* <img src={item.image.data.attributes.formats.thumbnail.url} /> */}
              <CardInfo style={{cursor: 'pointer', }} onClick={() => router.push(`/order/${order.id}`)}>
                <h3>Order date: {localTime}</h3>
                <h3>Total price: {order.attributes.total_price}$</h3>
                <h3>Total quantity: {order.attributes.total_quantity}</h3>
              </CardInfo>
            </div>
          );
          })}
    </div>
  );
}
