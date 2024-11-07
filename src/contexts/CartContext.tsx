import React, { createContext, useEffect, useReducer } from "react";
import api from "../api";
import { notifyError, notifySuccess } from "../components/ToastManager/index";
import { CartItem, cartReducer } from "../reduces/Cart";
import MyLoader from "./../components/MyLoader/index";
import { CheckoutType } from "../interfaces/Checkout";

export type CartContextType = {
  state: {
    products: CartItem[];
    totalAmount: number;
  };
  dispatch: React.Dispatch<any>;
  addToCart: (productId: string, quantity: number, size: string) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateCart: (
    productId: string,
    quantity: number,
    size: string,
    oldSize: string
  ) => void;
  checkout: (data: CheckoutType) => void;
};

const initialState = {
  products: [],
  totalAmount: 0,
};

export const CartContext = createContext({} as CartContextType);

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/cart");
        dispatch({
          type: "SET_CART",
          payload: {
            products: res.data.products,
            totalAmount: res.data.totalAmount,
          },
        });
      } catch (error) {
        // console.error("Error fetching cart data:", error);
      }
    })();
  }, []);

  const addToCart = async (
    productId: string,
    quantity: number,
    size: string
  ) => {
    console.log(productId, quantity, size);
    try {
      const res = await api.post("/cart", { productId, quantity, size });

      console.log(res.data);
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          product: res.data.product,
          quantity: res.data.quantity,
          size: res.data.size,
        },
      });
      notifySuccess("Add to cart successfully");
    } catch (error) {
      notifyError("Error adding product to cart");
    }
  };
  const updateCart = async (
    productId: string,
    quantity: number,
    size: string,
    oldSize: string
  ) => {
    try {
      const res = await api.post("/cart/update", {
        productId,
        quantity,
        size,
        oldSize,
      });
      dispatch({
        type: "UPDATE_CART",
        payload: {
          product: res.data.product,
          quantity: res.data.quantity,
        },
      });
      MyLoader({ isVisible: false });
    } catch (error) {
      notifyError("Error adding product to cart");
    }
  };

  const removeFromCart = async (productId: string, size: string) => {
    try {
      await api.post(`/cart/remove`, { productId, size });
      dispatch({ type: "REMOVE_FROM_CART", payload: { productId, size } });
      notifySuccess("Successfully removed from cart");
    } catch (error) {
      notifyError("Error removing product from cart");
    }
  };

  const checkout = async (data: CheckoutType) => {
    try {
      console.log(data);
      const res = await api.post("/cart/checkout", data);
      console.log(res.data.url);
      // window.location.href = res.data.url;
      dispatch({ type: "CHECKOUT", payload: res.data });
      // notifySuccess("Successfully checked out");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        addToCart,
        removeFromCart,
        checkout,
        updateCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
