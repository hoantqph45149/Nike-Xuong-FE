import classNames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import api from "../../api";
import Button from "../../components/Button";
import { CartContext, CartContextType } from "../../contexts/CartContext";
import { Product } from "../../interfaces/Product";
import style from "./ProductDetail.module.scss";
const cx = classNames.bind(style);

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [size, setSize] = useState<string>("");
  const [sizeError, setSizeError] = useState<boolean>(false);
  const { addToCart } = useContext(CartContext) as CartContextType;
  // console.log(size);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    })();
  }, [id]);

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(event.target.value);
    setSizeError(false);
  };

  const handleAddToCart = () => {
    if (!size) {
      setSizeError(true);
      return;
    }
    if (product) {
      addToCart(String(product._id), quantity, size);
    }
  };

  return (
    <div className={cx("container mb-5 mt-5", "product-detail")}>
      <div className={cx("row")}>
        <div className={cx("col-7", "product-image")}>
          {product?.thumbnail ? (
            <img src={product.thumbnail} alt={product.title} />
          ) : (
            <p>Loading image...</p>
          )}
        </div>
        <div className={cx("col-5", "product-info")}>
          <h2>{product?.title || "Loading..."}</h2>
          <p className="mt-1">{product?.categoryId?.name || "Loading..."}</p>
          <p className="mt-5">
            {product?.price ? `${product.price} $` : "Loading..."}
          </p>
          <div className={cx("size-picker", { "border-red": sizeError })}>
            <h2>Kích cỡ</h2>
            <ul>
              {product?.sizes?.map((s) => (
                <li key={s._id}>
                  <input
                    onChange={handleSizeChange}
                    type="radio"
                    id={`size_${s.size}`}
                    name="size"
                    value={s.size}
                    checked={size === s.size}
                  />
                  <label htmlFor={`size_${s.size}`}>{s.size}</label>
                </li>
              ))}
            </ul>
            {sizeError && (
              <p className={cx("error-message")}>Vui lòng chọn kích cỡ</p>
            )}
          </div>
          <div className={cx("product-button")}>
            <Button
              onClick={handleAddToCart}
              size={"fullWidth"}
              color={"colorBlack"}
            >
              Thêm vào giỏ
            </Button>
            <Button
              size={"fullWidth"}
              color={"colorWhite"}
              border={"borderBlack"}
            >
              Yêu thích
            </Button>
          </div>
          <div className={cx("product-description")}>
            <p>{product?.description || "Loading description..."}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
