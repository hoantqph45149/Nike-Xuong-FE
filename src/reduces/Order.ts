import { Orders } from "../interfaces/Order";

interface OrderState {
  Orders: Orders[];
  OrdersByUser: Orders[];
  OrdersSearch: Orders[];
}

interface Action {
  type: string;
  payload?: any;
}

export const OrderReducer = (state: OrderState, action: Action): OrderState => {
  switch (action.type) {
    case "SET_ORDERS":
      return {
        ...state,
        Orders: action.payload,
      };
    case "REMOVE_ORDER":
      return {
        ...state,
        Orders: state.Orders.filter(
          (item: Orders) => item._id !== action.payload
        ),
      };
    case "SET_ORDERS_BY_USER":
      return {
        ...state,
        OrdersByUser: action.payload,
      };
    case "UPDATE_ORDER":
      return {
        ...state,
        Orders: state.Orders.map((item: Orders) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };
    case "SET_ORDERS_SEARCH":
      return {
        ...state,
        OrdersSearch: action.payload,
      };
    default:
      return state;
  }
};
