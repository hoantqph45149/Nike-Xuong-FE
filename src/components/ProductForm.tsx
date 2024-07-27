import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import api from "../api";
import { ProductContext, ProductContextType } from "../contexts/ProductContext";
import { Product } from "../interfaces/Product";
import { productSchema } from "../utils/validation";

import ImageUpload from "./ImageUpload";

const ProductForm = () => {
  const [thumbnail, setThumbnail] = useState<string>("");
  const [categories, setCategories] = useState([]);
  const { handleProduct } = useContext(ProductContext) as ProductContextType;
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<Product>({
    resolver: zodResolver(productSchema),
  });

  const handleImageUploadSuccess = (url: string) => {
    setThumbnail(url);
  };

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/category");
      setCategories(data.data);
    })();
  }, []);

  useEffect(() => {
    if (id) {
      (async () => {
        const { data } = await api.get(`/products/${id}`);
        reset(data.data);
        setValue("categoryId", data.data.categoryId); // Set the default value for categoryId
        setThumbnail(data.data.thumbnail); // Optionally set the thumbnail if needed
      })();
    }
  }, [id, reset, setValue]);

  return (
    <>
      <form
        onSubmit={handleSubmit((data) =>
          handleProduct({ ...data, thumbnail, _id: id })
        )}
      >
        <h1 className="text-center">
          {id ? "Update Product" : "Create Product"}
        </h1>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            {...register("title")}
          />
          {errors.title && (
            <span className="text-danger">{errors.title.message}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <span className="text-danger">{errors.price.message}</span>
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
          <label htmlFor="categoryId" className="form-label">
            Category
          </label>
          <select className="form-select" {...register("categoryId")}>
            <option value="">chọn loại sản phẩm</option>
            {categories.map((category: any) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <span className="text-danger">{errors.categoryId.message}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="thumbnail" className="form-label">
            Thumbnail
          </label>
          <br />
          <img src={thumbnail} alt="" width="100" />
          <ImageUpload onUploadedSuccess={handleImageUploadSuccess} />
          {errors.thumbnail && (
            <span className="text-danger">{errors.thumbnail.message}</span>
          )}
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

export default ProductForm;
