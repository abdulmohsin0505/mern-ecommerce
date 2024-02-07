import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/features/favorite/favoriteSlice";

import { Product } from "../../types/products";

const HeartIcon = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: any) => state.favorites.favorites);
  console.log(favorites);
  const isFavorite = favorites?.find((p: any) => p?._id === product?._id);

  return (
    <div className="absolute top-2 right-5 cursor-pointer">
      {isFavorite ? (
        <div onClick={() => dispatch(removeFromFavorites(product))}>
          <FaHeart className="text-pink-500" />
        </div>
      ) : (
        <div onClick={() => dispatch(addToFavorites(product))}>
          <FaRegHeart className="text-white" />
        </div>
      )}
    </div>
  );
};

export default HeartIcon;
