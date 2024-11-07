import classNames from "classnames/bind";
import style from "./Shop.module.scss";
import { useContext } from "react";
import {
  ProductContext,
  ProductContextType,
} from "../../../contexts/ProductContext";
import ProductCard from "../../../components/ProductCard";
const cx = classNames.bind(style);

const Shop = () => {
  const { state } = useContext(ProductContext) as ProductContextType;
  // console.log(state);
  return (
    <div className={cx("product-list")}>
      {state.products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Shop;
