import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { Product } from "../../interfaces/Product";
import style from "./ProductCard.module.scss";
const cx = classNames.bind(style);
type Props = {
  product: Product;
};
const ProductCard = ({ product }: Props) => {
  // console.log(product);
  return (
    <Link to={`/productdetail/${product._id}`} className={cx("card")}>
      <img
        src={product.thumbnail}
        alt={product.title}
        className={cx("product-image")}
      />
      <div className={cx("product-info")}>
        {product.title && (
          <span className={cx("status", product.title.toLowerCase())}>
            {product.title}
          </span>
        )}
        <h3 className={cx("product-name")}>{product.title}</h3>
        <p className={cx("product-category")}>{product.categoryId.name}</p>
        <p className={cx("product-color")}>{product.categoryId.name} Colour</p>
        <p className={cx("product-price")}>{product.price}đ</p>
      </div>
    </Link>
  );
};

export default ProductCard;
