import { Product } from "../interfaces/Product";

type State = {
  products: Product[];
};
type Acction = {
  type: string;
  payload: any;
};
const ProductReducer = (state: State, acction: Acction) => {
  switch (acction.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: acction.payload,
      };
    case "CREATE_PRODUCT":
      return {
        ...state,
        products: [...state.products, acction.payload],
      };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((item) =>
          item._id === acction.payload._id ? acction.payload : item
        ),
      };
    case "REMOVE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((item) => item._id !== acction.payload),
      };
    default:
      return state;
  }
};
export default ProductReducer;
