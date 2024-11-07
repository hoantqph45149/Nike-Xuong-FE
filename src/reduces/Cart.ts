import { Product } from "../interfaces/Product";

// Define types for cart items and state
export type CartItem = {
  product: Product;
  quantity: number;
  size: string;
};

type State = {
  products: CartItem[];
  totalAmount: number;
};

type Action =
  | {
      type: "ADD_TO_CART";
      payload: { product: Product; quantity: number; size: string };
    }
  | { type: "REMOVE_FROM_CART"; payload: { productId: string; size: string } }
  | { type: "SET_CART"; payload: { products: CartItem[]; totalAmount: number } }
  | { type: "UPDATE_CART"; payload: { product: Product; quantity: number } }
  | { type: "CHECKOUT"; payload: { products: CartItem[]; totalPrice: number } };

const calculateTotalAmount = (products: CartItem[]): number => {
  return products.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
};

// Reducer function
export const cartReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_CART":
      return {
        ...state,
        products: action.payload.products,
        totalAmount: action.payload.totalAmount,
      };

    case "ADD_TO_CART": {
      const existingProductIndex = state.products.findIndex(
        (item) =>
          item.product._id === action.payload.product._id &&
          item.size === action.payload.size
      );

      let updatedProducts;
      if (existingProductIndex !== -1) {
        updatedProducts = [...state.products];
        updatedProducts[existingProductIndex].quantity =
          action.payload.quantity;
      } else {
        updatedProducts = [
          ...state.products,
          {
            product: action.payload.product,
            quantity: action.payload.quantity,
            size: action.payload.size,
          },
        ];
      }

      return {
        ...state,
        products: updatedProducts,
        totalAmount: calculateTotalAmount(updatedProducts),
      };
    }

    case "UPDATE_CART": {
      const updatedCart = state.products.map((item) => {
        if (item.product._id === action.payload.product._id) {
          return {
            ...item,
            quantity: action.payload.quantity,
          };
        }
        return item;
      });

      return {
        ...state,
        products: updatedCart,
        totalAmount: calculateTotalAmount(updatedCart),
      };
    }

    case "REMOVE_FROM_CART": {
      const filteredProducts = state.products.filter(
        (item) =>
          item.product._id !== action.payload.productId ||
          item.size !== action.payload.size
      );

      return {
        ...state,
        products: filteredProducts,
        totalAmount: calculateTotalAmount(filteredProducts),
      };
    }

    case "CHECKOUT": {
      return {
        ...state,
        products: [],
        totalAmount: 0,
      };
    }
    default:
      return state;
  }
};
