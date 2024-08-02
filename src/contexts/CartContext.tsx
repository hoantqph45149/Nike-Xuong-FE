import React, { createContext, useReducer } from "react";
import cartReducer, { CartItem } from "../reduces/Cart";
import { Product } from "../interfaces/Product";
import api from "../api";

export type CartContextType = {
  state: {
    products: CartItem[];
    totalPrice: number;
  };
  dispatch: React.Dispatch<any>;
  addToCart: (product: Product, quantity: number) => void;
  getCart: () => void;
  checkout: () => void;
  removeFormCart: (productId: string) => void;
};
const initalState = {
  products: [],
  totalPrice: 0,
};
export const CartContext = createContext({} as CartContextType);

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initalState);
  const addToCart = async (product: Product, quantity: number) => {
    const res = await api.post("/cart", { product, quantity });
    dispatch({
      type: "ADD_TO_CART",
      payload: { product: res.data.product, quantity },
    });
  };
  const getCart = async () => {
    const res = await api.get("/cart");
    dispatch({ type: "SET_CART", payload: res.data });
  };

  const removeFormCart = async (productId: string) => {
    const res = await api.delete(`/cart/${productId}`);
    res.data.success &&
      dispatch({ type: "REMOVE_FORM_CART", payload: { productId } });
  };
  const checkout = async () => {
    const res = await api.post("cart/checkout");
    dispatch({ type: "CHECKOUT", payload: res.data });
  };
  return (
    <CartContext.Provider
      value={{ state, dispatch, addToCart, getCart, removeFormCart, checkout }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;
