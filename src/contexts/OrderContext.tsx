// OrderProvider.tsx
import { useNavigate } from "react-router-dom";
import api from "../api";
import { Orders } from "../interfaces/Order";
import React, { createContext, useEffect, useReducer } from "react";
import { OrderReducer } from "../reduces/Order";

export type OrderType = {
  state: { Orders: Orders[]; OrdersByUser: Orders[]; OrdersSearch: Orders[] };
  dispatch: React.Dispatch<any>;
  updateOrder: (id: string, data: Orders) => void;
  searchOrder: (q: string) => void;
  getOrdersByUser: () => void;
};

export const OrderContext = createContext<OrderType>({} as OrderType);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(OrderReducer, {
    Orders: [],
    OrdersByUser: [],
    OrdersSearch: [],
  });

  const nav = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders");
        dispatch({ type: "SET_ORDERS", payload: data });
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrders();
    getOrdersByUser();
  }, []);

  const updateOrder = async (id: string, data: Orders) => {
    try {
      const res = await api.patch(`/orders/${id}`, data);
      dispatch({ type: "UPDATE_ORDER", payload: res.data });
    } catch (error) {
      console.error(error);
    }
  };
  const searchOrder = async (q: string) => {
    try {
      const res = await api.get(`/search/order?q=${q}`);
      dispatch({ type: "SET_ORDERS_SEARCH", payload: res.data });
      nav("/admin/orders");
    } catch (error) {
      console.error(error);
    }
  };

  const getOrdersByUser = async () => {
    try {
      const res = await api.get(`/orders/user`);
      dispatch({ type: "SET_ORDERS_BY_USER", payload: res.data });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        state,
        dispatch,
        updateOrder,
        searchOrder,
        getOrdersByUser,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
