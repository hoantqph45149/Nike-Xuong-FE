import { Product } from "../interfaces/Product";

export type CartItem = {
  product: Product;
  quantity: number;
};
type State = {
  products: CartItem[];
  totalPrice: number;
};

type Acction =
  | {
      type: "ADD_TO_CART";
      payload: { product: Product; quantity: number };
    }
  | {
      type: "REMOVE_FORM_CART";
      payload: { productId: string };
    }
  | {
      type: "SET_CART";
      payload: {
        products: CartItem[];
        totalPrice: number;
      };
    }
  | {
      type: "CHECKOUT";
      payload: {
        products: CartItem[];
        totalPrice: number;
      };
    };

const cartReducer = (state: State, acction: Acction) => {
  switch (acction.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        products: [
          ...state.products,
          {
            product: acction.payload.product,
            quantity: acction.payload.quantity,
          },
        ],
      };
    case "REMOVE_FORM_CART":
      return {
        ...state,
        products: state.products.filter(
          (item) => item.product._id !== acction.payload.productId
        ),
      };

    case "SET_CART":
      return {
        ...state,
        products: acction.payload.products,
        totalPrice: acction.payload.totalPrice,
      };
    default:
      return state;
  }
};
export default cartReducer;
