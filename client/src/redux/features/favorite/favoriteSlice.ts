import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../../types/products";

type stateType = {
  favorites: Product[];
};

const initialState: stateType = {
  favorites: [],
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Product>) => {
      if (
        !state.favorites.find((product) => product._id === action.payload._id)
      ) {
        state.favorites.push(action.payload);
        // localStorage.setItem("favorites", JSON.stringify(state.favorites));
      }
    },
    removeFromFavorites: (state, action: PayloadAction<Product>) => {
      // Remove the product with the matching ID
      state.favorites = state.favorites.filter(
        (product) => product._id !== action.payload._id
      );
      // localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    // setFavorites: (state, action) => {
    //   // Set the favorites from localStorage
    //   return action.payload;
    // },
  },
});

export const { addToFavorites, removeFromFavorites } = favoriteSlice.actions;
export const selectFavoriteProduct = (state: any) => state.favorites;
export default favoriteSlice.reducer;
