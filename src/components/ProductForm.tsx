import React, { useContext, useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../api";
import { ProductContext, ProductContextType } from "../contexts/ProductContext";
import { Product } from "../interfaces/Product";
import { productSchema } from "../utils/validation";
import ImageUpload from "./ImageUpload";

const ProductForm = () => {
  type Size = {
    _id?: string;
    size: string;
    quantity: number;
  };

  const [thumbnail, setThumbnail] = useState<string>("");
  const [categories, setCategories] = useState<any[]>([]);
  const { handleProduct } = useContext(ProductContext) as ProductContextType;
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm<Product>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      sizes: [{ size: "", quantity: 0 }],
      colors: [{ color: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sizes",
  });
  const {
    fields: colorFields,
    append: appendColor,
    remove: removeColor,
  } = useFieldArray({
    control,
    name: "colors",
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
        try {
          const { data } = await api.get(`/products/${id}`);

          reset({
            ...data.data,
            sizes: data.data.sizes || [],
          });
          setValue("categoryId", data.data.categoryId);
          setThumbnail(data.data.thumbnail);

          remove();

          if (data.data.sizes) {
            data.data.sizes.forEach((size: Size) => {
              append(size);
            });
          }

          if (data.data.colors) {
            data.data.colors.forEach((color: string) => {
              appendColor({ color });
            });
          }
        } catch (error) {
          console.error("Lỗi khi lấy sản phẩm:", error);
        }
      })();
    }
  }, [id, reset, setValue, append, remove]);

  const onSubmit = async (data: Product) => {
    console.log(data);
    try {
      handleProduct({ ...data, thumbnail, _id: id });
      reset();
    } catch (error) {
      console.error("Lỗi khi lưu sản phẩm:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            <option value="">Chọn loại sản phẩm</option>
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
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          <select className="form-select" id="gender" {...register("gender")}>
            <option value="">---Chọn giới tính---</option>
            <option value="Man">Man</option>
            <option value="Woman">Woman</option>
            <option value="unisex">Unisex</option>
          </select>
          {errors.gender && (
            <span className="text-danger">{errors.gender.message}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="color" className="form-label">
            Color
          </label>
          {colorFields.map((field, index) => (
            <div className="mb-3 d-flex gap-2" key={field.id}>
              <input
                type="text"
                id="color"
                className="form-control"
                {...register(`colors.${index}.color`, { required: true })}
                defaultValue={field.color}
              />
              <button
                type="button"
                className="btn btn-danger "
                onClick={() => removeColor(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => appendColor({ color: "" })}
          >
            Add color
          </button>
        </div>
        <div className="mb-3">
          <label>Sizes</label>
          {fields.map((field, index) => (
            <div className="mb-3 d-flex gap-2" key={field.id}>
              <input
                className="form-control"
                step={0.01}
                type="text"
                placeholder="Size"
                {...register(`sizes.${index}.size`, { required: true })}
                defaultValue={field.size}
              />
              <input
                className="form-control"
                type="number"
                placeholder="Quantity"
                {...register(`sizes.${index}.quantity`, {
                  required: true,
                  valueAsNumber: true,
                })}
                defaultValue={field.quantity}
              />
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => remove(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => append({ size: "", quantity: 0 })}
          >
            Add Size
          </button>
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
