import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useContext, useEffect } from "react";
import style from "./ScrollProduct.module.scss";
import {
  ProductContext,
  ProductContextType,
} from "../../contexts/ProductContext";

const cx = classNames.bind(style);

const ScrollProduct = ({ href }: any) => {
  const { state } = useContext(ProductContext) as ProductContextType;
  useEffect(() => {
    const prevButton: any = document.getElementById("prev");
    const nextButton: any = document.getElementById("next");
    const productContainer: any = document.getElementById("productContainer");
    const product: any = document.getElementById("product");

    const handlePrevClick = () => {
      productContainer.scrollBy({
        left: -productContainer.clientWidth / 3,
        behavior: "smooth",
      });
    };

    const handleNextClick = () => {
      console.log(product.clientWidth);
      productContainer.scrollBy({
        left: product.clientWidth,
        behavior: "smooth",
      });
    };

    const handleScroll = () => {
      prevButton.disabled = productContainer.scrollLeft === 0;
      console.log(
        productContainer.scrollLeft,
        productContainer.clientWidth,
        productContainer.scrollWidth
      );
      nextButton.disabled =
        productContainer.scrollLeft + productContainer.clientWidth >=
        productContainer.scrollWidth;
    };

    prevButton.addEventListener("click", handlePrevClick);
    nextButton.addEventListener("click", handleNextClick);
    productContainer.addEventListener("scroll", handleScroll);

    prevButton.disabled = true;

    return () => {
      prevButton.removeEventListener("click", handlePrevClick);
      nextButton.removeEventListener("click", handleNextClick);
      productContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={cx("container")}>
      <div className={cx("title")}>
        <h2>Scroll Product</h2>
      </div>
      <div className={cx("buttons")}>
        <button className={cx("button")} id="prev">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button className={cx("button")} id="next">
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      <div className={cx("product-container")} id="productContainer">
        {Array.from({ length: 10 }, (_, i) => (
          <div id="product" className={cx("product")} key={i}>
            <img
              src={`https://picsum.photos/1000/1000?random=${i}`}
              alt={`Product ${i + 1}`}
            />
            <h3>Product {i + 1}</h3>
            {href ? (
              <a href={`#product${i + 1}`}>Description of Product {i + 1}</a>
            ) : (
              <p>Description of Product {i + 1}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollProduct;
