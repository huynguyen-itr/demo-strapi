import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { useQuery } from 'urql';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useStateContext } from '../../lib/context';
import { GET_PRODUCT_QUERY } from '../../lib/query';
import {
  DetailsStyle,
  ProductInfo,
  Quantity,
  Buy,
} from '../../styles/ProductDetails';

export default function ProductDetails() {
  const { increaseQty, decreaseQty, qty, onAdd, setQty } = useStateContext();

  const resetQuantity = () => {
    setQty(1);
  };
  useEffect(() => {
    resetQuantity();
  }, []);

  const { query } = useRouter();
  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug: query.slug },
  });
  const { data, fetching, error } = results;
  if (fetching) return <p>Loading...</p>;
  if (error) {
    return (
      <p>
        Oh no...
        {' '}
        {error.message}
      </p>
    );
  }
  const { name, description, image, price } = data.products.data[0].attributes;

  const notify = () => {
    toast.success(`${name} added to your cart.`, {
      duration: 1500,
    });
  };

  return (
    <DetailsStyle>
      <img src={image.data.attributes.formats.thumbnail.url} alt={name} />
      <ProductInfo>
        <h2>{name}</h2>
        <h3>
          $
          {price}
        </h3>
        <p>{description}</p>
        <Quantity>
          <span>Quantity</span>
          <button onClick={decreaseQty}>
            <AiFillMinusCircle />
          </button>
          <p>{qty}</p>
          <button>
            <AiFillPlusCircle onClick={increaseQty} />
          </button>
        </Quantity>
        <Buy
          onClick={() => {
            onAdd({ ...data.products.data[0].attributes, id: data.products.data[0].id }, qty);
            notify();
          }}
        >
          Add To Cart
        </Buy>
      </ProductInfo>
    </DetailsStyle>
  );
}
