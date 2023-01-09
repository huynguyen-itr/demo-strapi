import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from 'react';
import shiba from "../public/shiba-success.png";
const { motion } = require("framer-motion");
// STRIPE_SECRET_KEY
const stripe = require("stripe")(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);

export async function getServerSideProps(params) {
  const order = await stripe.checkout.sessions.retrieve(
    params.query.session_id,
    {
      expand: ["line_items"],
    }
  );
// console.log('order', order);

  return { props: { order } };
}

export default function Success({ order }) {
  const route = useRouter();
  
  // useEffect(() => {
  //   if (typeof window === 'undefined') {
  //     return;
  //   }
    
  //   if (order.status !== 'complete') {
  //     return;
  //   }
    
  //   const userId = localStorage.getItem('userId');
  //   const token = localStorage.getItem('jwt');
    
  //   const variables = {
  //     data: {
  //       user: userId,
  //       totalPrice: order.amount_total / 100,
  //       totalQuantity: order.line_items.data.reduce((partialSum, item) => partialSum + item.quantity, 0)
  //     }
  //   };
    
  //   const headers = {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };

  //   axios.post('http://192.168.20.230:1337/api/orders', variables, headers)
  //   .then(function (response) {
  //     console.log('response', response);
  //     for (const item of order.line_items.data) {
  //       console.log('item', item);
  //       axios.post('http://192.168.20.230:1337/api/order-details', {
  //         data: {
  //           orderId: response.data.data.id,
  //           productId: response.data.data.id,
  //           quantity: item.quantity,
  //         }
  //       }, headers)
  //     }
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

  // }, []);

  return (
    <Wrapper>
      <Card
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.75 } }}
        initial={{ opacity: 0, scale: 0.75 }}
      >
        <h1>Thank you for your order!</h1>
        <h2>A confirmation email has been sent to</h2>
        <h2>{order.customer_details.email}</h2>
        <InfoWrapper>
          <Address>
            <h3>Adress</h3>
            {Object.entries(order.customer_details.address).map(
              ([key, val]) => (
                <p key={key}>
                  {key} : {val}
                </p>
              )
            )}
          </Address>
          <OrderInfo>
            <h3>Products</h3>
            {order.line_items.data.map((item) => (
              <div key={item.id}>
                <p>Product: {item.description}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price.unit_amount / 100}</p>
              </div>
            ))}
          </OrderInfo>
        </InfoWrapper>
        <button onClick={() => route.push("/")}>Continue Shopping</button>
        <Image src={shiba} alt="success" />
      </Card>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 5rem 15rem;
`;

const Card = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border-radius: 2rem;
  padding: 3rem 3rem;

  h1 {
    color: var(--primary);
    margin-bottom: 1rem;
  }
  h2 {
    color: var(--secondary);
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  button {
    background: var(--primary);
    color: white;
    font-weight: 500;
    font-size: 1.2rem;
    padding: 1rem 2rem;
    margin-top: 2rem;
    cursor: pointer;
  }
`;
const Address = styled.div`
  font-size: 1rem;
  width: 100%;
`;
const OrderInfo = styled.div`
  font-size: 1rem;
  width: 100%;
  div {
    padding-bottom: 1rem;
  }
`;
const InfoWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
`;
