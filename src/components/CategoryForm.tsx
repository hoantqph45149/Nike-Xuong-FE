import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import api from "../api";
import { CategoryContext, CategoryType } from "../contexts/CategoryContext";
import { Category } from "../interfaces/Category";
import { categorySchema } from "../utils/validation";

const CategoryForm = () => {
  const { handleCategory } = useContext(CategoryContext) as CategoryType;
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Category>({
    resolver: zodResolver(categorySchema),
  });
  if (id) {
    useEffect(() => {
      (async () => {
        const { data } = await api.get(`/category/${id}`);
        reset(data.data);
      })();
    }, []);
  }
  return (
    <>
      <form
        onSubmit={handleSubmit((data) => handleCategory({ ...data, _id: id }))}
      >
        <h1 className="text-center">
          {id ? "Update Product" : "Create Product"}
        </h1>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            {...register("name")}
          />
          {errors.name && (
            <span className="text-danger">{errors.name.message}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            {...register("description")}
          />
        </div>
        <div className="mb-3">
          <button className="btn btn-primary w-100">
            {id ? "Edit product" : "Add product"}
          </button>
        </div>
      </form>
    </>
  );
};

export default CategoryForm;
