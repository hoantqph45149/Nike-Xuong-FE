import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import style from "./ProductDetail.module.scss";
import Button from "../../components/Button";
import { Product } from "../../interfaces/Product";

const cx = classNames.bind(style);
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>({} as Product);
  const sizes = [
    {
      id: 1,
      size: "37",
    },
    {
      id: 2,
      size: "38",
    },
    {
      id: 3,
      size: "39",
    },
    {
      id: 4,
      size: "40",
    },
    {
      id: 5,
      size: "41",
    },
    {
      id: 6,
      size: "42",
    },
    {
      id: 7,
      size: "43",
    },
    {
      id: 8,
      size: "44",
    },
  ];
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        console.log(data);
        setProduct(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);
  // console.log(product);
  return (
    <div className={cx("container", "product-detail")}>
      <div className={cx("row")}>
        <div className={cx("col-7", "product-image")}>
          <img src={product.thumbnail} alt="" />
        </div>
        <div className={cx("col-5", "product-info")}>
          <h2>{product.title}</h2>
          <p className="mt-1">{product.categoryId?.name}</p>
          <p className="mt-5">{product.price} $</p>
          <div className={cx("size-picker")}>
            <h2>Kích cỡ</h2>
            <ul>
              {sizes.map((size) => (
                <li key={size.id}>
                  <input
                    type="radio"
                    id={`size_${size.id}`}
                    name="size"
                    value={size.id}
                  />
                  <label htmlFor={`size_${size.id}`}>{size.size}</label>
                </li>
              ))}
            </ul>
          </div>
          <div className={cx("prodcut-button")}>
            <Button size={"fullWidth"} color={"colorBlack"}>
              {" "}
              Add to cart{" "}
            </Button>
            <Button
              size={"fullWidth"}
              color={"colorWhite"}
              border={"borderBlack"}
            >
              {" "}
              Favourite{" "}
            </Button>
          </div>
          <div className={cx("product-description")}>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
