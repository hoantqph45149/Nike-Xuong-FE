import { createContext, useEffect, useReducer } from "react";
import { Product } from "../interfaces/Product";
import ProductReducer from "./../reduces/Product";
import { useNavigate } from "react-router-dom";
import api from "../api";

export type ProductContextType = {
  state: { products: Product[] };
  dispatch: React.Dispatch<any>;
  removeProduct: (id: string | undefined) => void;
  handleProduct: (data: Product) => void;
  searchProduct: (q: string) => void;
};
export const ProductContext = createContext({} as ProductContextType);

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(ProductReducer, { products: [] });
  const nav = useNavigate();
  useEffect(() => {
    (async () => {
      const { data } = await api.get("/products");
      console.log(data);
      dispatch({ type: "SET_PRODUCTS", payload: data.data });
    })();
  }, []);
  const removeProduct = (id?: string) => {
    (async () => {
      try {
        await api.delete(`/products/${id}`);
        dispatch({ type: "REMOVE_PRODUCT", payload: id });
        nav("/admin/products");
      } catch (error) {
        console.error(error);
      }
    })();
  };

  const handleProduct = (data: Product) => {
    (async () => {
      try {
        if (data._id) {
          const res = await api.patch(`/products/${data._id}`, data);
          dispatch({ type: "UPDATE_PRODUCT", payload: res.data.data });
          nav("/admin/products");
        } else {
          const res = await api.post("/products", data);
          dispatch({ type: "CREATE_PRODUCT", payload: res.data.data });
          nav("/admin/products");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  };
  const searchProduct = async (q: string) => {
    try {
      const res = await api.get(`/search/product?q=${q}`);
      dispatch({ type: "SET_PRODUCTS", payload: res.data.data });
      nav("/shop");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ProductContext.Provider
      value={{ state, dispatch, removeProduct, handleProduct, searchProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};
