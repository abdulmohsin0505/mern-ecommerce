import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorite/favoriteSlice";
import Product from "../../components/products/Product";
import { Product as ProductType } from "../../types/products";

const Favorites = () => {
  const favorites = useSelector((state: any) => state.favorites.favorites);
  console.log(favorites);

  return (
    <div className="ml-[10rem]">
      <h1 className="text-lg font-bold ml-[3rem] mt-[3rem]">
        FAVORITE PRODUCTS
      </h1>

      {favorites !== 0 && (
        <div className="flex flex-wrap">
          {favorites.map((product: ProductType) => (
            <Product key={product?._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
