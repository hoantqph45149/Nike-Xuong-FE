import { Category } from "../interfaces/Category";

type State = {
  categories: Category[];
};
type Acction = {
  type: string;
  payload: any;
};
export const categoryReducer = (state: State, acction: Acction) => {
  switch (acction.type) {
    case "SET_CATEGORIES":
      return {
        ...state,
        categories: acction.payload,
      };
    case "CREATE_CATEGORY":
      return {
        ...state,
        categories: [...state.categories, acction.payload],
      };
    case "UPDATE_CATEGORY":
      return {
        ...state,
        categories: state.categories.map((item) =>
          item._id === acction.payload._id ? acction.payload : item
        ),
      };
    case "REMOVE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter(
          (item) => item._id !== acction.payload
        ),
      };
    default:
      return state;
  }
};
