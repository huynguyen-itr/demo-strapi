import {
  CardInfo,
} from "../../styles/CartStyles";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { ORDER_DETAILS_QUERY } from "../../lib/query";
import { useQuery } from "urql";
import { useRouter } from "next/router";
import { useStateContext } from "../../lib/context";
import toast from "react-hot-toast";
import { useEffect } from "react";
import moment from "moment";

export default function ProductDetails() {
  const router = useRouter();
  const [results] = useQuery({
    query: ORDER_DETAILS_QUERY,
    // variables: { slug: query.slug },
  });
  const { data, fetching, error } = results;
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const orderDetails = data.orderDetails.data;
console.log(orderDetails[0])
  return (
    <div>
      {orderDetails.length < 1 && (
        <h1>You not have any order details</h1>
      )}
      {orderDetails.length >= 1 &&
        orderDetails.map((orderDetail) => {
          return (
            <div>
              <img src={orderDetail.attributes.product.data.attributes.image.data.attributes.formats.thumbnail.url} />
              <CardInfo>
                <h3>ID: {orderDetail.id}</h3>
                <h3>Title: {orderDetail.attributes.product.data.attributes.title}</h3>
                <h3>Quantity: {orderDetail.attributes.quantity}</h3>
                <h3>Price: ${orderDetail.attributes.product.data.attributes.price}</h3>
                <h3>Paid: ${orderDetail.attributes.product.data.attributes.price * orderDetail.attributes.quantity}</h3>
              </CardInfo>
            </div>
          );
          })}
    </div>
  );
}
