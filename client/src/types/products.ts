export interface Category {
  _id: string;
  name: string;
  __v: number;
}
export interface Image {
  public_id: string;
  url: string;
}
export interface NewProduct {
  name: string;
  brand: string;
  quantity: number;
  description: string;
  price: number;
  countInStock: number;
}
export interface createNewProduct {
  name: string;
  brand: string;
  quantity: number;
  description: string;
  price: number;
  countInStock: number;
  image: File;
  category: string;
}
export interface Product {
  _id: string;
  name: string;
  image: Image;
  brand: string;
  quantity: number;
  category: Category;
  description: string;
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
  reviews: any[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
export interface getProductsRes {
  products: Product[];
  page: number;
  pages: number;
  hasMore: boolean;
}

export interface review {
  name: string;
  rating: number;
  comment: string;
  user?: { _id: string; username: string };
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}

// export interface CartItems {
//   cartItems: CartItem[];
//   itemsPrice: number;
//   shippingPrice: number;
//   taxPrice: number;
//   totalPrice: number;
// }
export interface PayloadType {
  _id: string;
  name: string;
  image: Image;
  brand: string;
  quantity: number;
  category: Category;
  description: string;
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
  reviews: any[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  qty: number;
}
export type CartItem = {
  _id: string;
  name: string;
  image: Image;
  brand: string;
  quantity: number;
  category: Category;
  description: string;
  price: number;
  countInStock: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  qty: number;
};
