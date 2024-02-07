import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
import { Product } from "../../types/products";

const SmallProduct = ({ product }: { product: Product }) => {
  return (
    <div className="w-[20rem] ml-[2rem] p-3">
      <div className="relative">
        <img
          src={product.image?.url}
          alt={product.image?.public_id}
          className="h-[18rem] w-[20rem] rounded"
        />
        <HeartIcon key={product._id} product={product} />
      </div>

      <div className="p-4">
        {/* <Link to={`/product/${product._id}`}> */}
        <Link to={``}>
          <h2 className="flex justify-between items-center">
            <div>{product.name}</div>
            <span className="bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
              ${product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default SmallProduct;