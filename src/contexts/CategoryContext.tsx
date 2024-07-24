import { createContext, useEffect, useReducer } from "react";
import { Category } from "../interfaces/Category";
import { categoryReducer } from "./../reduces/Category";
import api from "../api";
import { useNavigate } from "react-router-dom";

export type CategoryType = {
  state: { categories: Category[] };
  dispatch: React.Dispatch<any>;
  removeCategory: (id: string | undefined) => void;
  handleCategory: (data: Category) => void;
};

export const CategoryContext = createContext({} as CategoryType);

export const CategoryPovider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const nav = useNavigate();
  const [state, dispatch] = useReducer(categoryReducer, { categories: [] });
  useEffect(() => {
    (async () => {
      const res = await api.get("/category");
      dispatch({ type: "SET_CATEGORIES", payload: res.data.data });
    })();
  }, []);
  const removeCategory = (id?: string) => {
    (async () => {
      try {
        await api.delete(`/category/${id}`);
        dispatch({ type: "REMOVE_CATEGORY", payload: id });
      } catch (error) {
        console.log(error);
      }
    })();
  };
  const handleCategory = (data: Category) => {
    (async () => {
      try {
        if (data._id) {
          const res = await api.patch(`/category/${data._id}`, data);
          dispatch({ type: "UPDATE_CATEGORY", payload: res.data.data });
          nav("/admin/categories");
        } else {
          const res = await api.post("/category", data);
          dispatch({ type: "CREATE_CATEGORY", payload: res.data.data });
          nav("/admin/categories");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  };
  return (
    <CategoryContext.Provider
      value={{ state, dispatch, removeCategory, handleCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
