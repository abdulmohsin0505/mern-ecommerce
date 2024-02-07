// import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PayloadType, CartItem } from "../../../types/products";

type cartState = {
  cartItems: CartItem[];
  //   itemsPrice: number;
  //   shippingPrice: number;
  //   taxPrice: number;
  //   totalPrice: number;
};

const initialState: cartState = {
  cartItems: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")!)
    : [],
  //   itemsPrice: 0,
  //   shippingPrice: 0,
  //   taxPrice: 0,
  //   totalPrice: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<PayloadType>) => {
      // NOTE: we don't need user, rating, numReviews or reviews
      // in the cart
      const { rating, numReviews, reviews, ...item } = action.payload;

      const existItem = state.cartItems.find((x: any) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x: any) =>
          x._id === existItem._id ? item : x
        );
      } else {
        // state.cartItems.push({ ...item });
        state.cartItems = [...state.cartItems, item];
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
      // return updateCart(state, item);
    },
    removeFromCart: (state, action: PayloadAction<any>) => {
      const filteredItems = state.cartItems.filter(
        (x: CartItem) => x._id !== action.payload
      );
      state.cartItems = filteredItems;
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
      //   return updateCart(state);
    },

    // saveShippingAddress: (state, action : PayloadAction) => {
    //   state.shippingAddress = action.payload;
    //   localStorage.setItem("cart", JSON.stringify(state));
    // },

    // clearCartItems: (state) => {
    //   state.cartItems = [];
    //   localStorage.setItem("cart", JSON.stringify(state));
    // },
    // NOTE: here we need to reset state for when a user logs out so the next
    // user doesn't inherit the previous users cart and shipping
    // resetCart: (state) => (state = initialState),
  },
});

export const {
  addToCart,
  removeFromCart,
  // saveShippingAddress,
  // savePaymentMethod,
  //   clearCartItems,
  //   resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
