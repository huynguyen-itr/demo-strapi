import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { useQuery } from 'urql';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { useStateContext } from '../../lib/context';
import { ORDER_DETAILS_QUERY } from '../../lib/query';
import {
  CardInfo,
} from '../../styles/CartStyles';

export default function OrderDetails() {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const { id } = router.query;
    const token = localStorage.getItem('jwt');
    if (!id || !token || !router.isReady) {
      return;
    }

    setIsLoading(true);

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/order/order-details/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(result => {
      console.log(result);
      setIsLoading(false);
      setOrderDetails(result.data.data);
    }).catch(error => {
      console.log(error);
    });
  }, [router.isReady]);

  return (
    <div>
      <h1>My Order Details</h1>
      {orderDetails.length < 1 && (
        <h1>You not have any order details</h1>
      )}
      {orderDetails.length >= 1
        && orderDetails.map(orderDetail => (
          <div key={orderDetail.id} style={{ float: 'left', paddingLeft: '2rem' }}>
            <img src={orderDetail.attributes.product.data.attributes.image.data.attributes.formats.thumbnail.url} />
            <CardInfo>
              <h3>
                ID:
                {orderDetail.id}
              </h3>
              <h2>{orderDetail.attributes.product.data.attributes.name}</h2>
              <hr />
              <h5>
                Quantity:
                {orderDetail.attributes.quantity}
              </h5>
              <h5>
                Price: $
                {orderDetail.attributes.product.data.attributes.price}
              </h5>
              <h5>
                Total: $
                {orderDetail.attributes.product.data.attributes.price * orderDetail.attributes.quantity}
              </h5>
            </CardInfo>
          </div>
        ))}
    </div>
  );
}
