import { ProductStyles } from "../styles/ProductStyle";
import Link from "next/link";

export default function Product({ product }) {
  //Extract from props
  const { name, price, image, slug } = product.attributes;
  return (
    <ProductStyles>
      <Link href={`/product/${slug}`}>
        <div>
          <img src={image.data.attributes.formats.thumbnail.url} alt={name} />
        </div>
      </Link>
      <h2>{name} </h2>
      <h3>${price}</h3>
    </ProductStyles>
  );
}
