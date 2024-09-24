import { faHeart, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { CartContext, CartContextType } from "../../contexts/CartContext";
import style from "./CartProduct.module.scss";
const cx = classNames.bind(style);

const CartProduct = () => {
  const { state, removeFromCart, updateCart } = useContext(
    CartContext
  ) as CartContextType;
  // console.log(state);
  const updateQuantity = (
    id: string,
    quantity: number,
    size: string,
    oldSize: string
  ) => {
    updateCart(id, quantity, size, oldSize);
    window.location.reload();
  };

  const optionQuantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <>
      <div className={cx("wraper")}>
        <div className={cx("container")}>
          <div className={cx("row")}>
            <div className={cx("col-8")}>
              <h4 className={cx("fw-medium")}>Bag</h4>
              <div className={cx("product-list")}>
                {state.products.map((p, i) => (
                  <div key={i} className={cx("product")}>
                    <div className={cx("product-right")}>
                      <Link to={`/productdetail/${p.product._id}`}>
                        <div className={cx("image")}>
                          <img src={p.product.thumbnail} alt="" />
                        </div>
                      </Link>
                      <div className={cx("info")}>
                        <h5>{p.product.title}</h5>
                        <p>{p.product.description}</p>
                        <p>{p.product?.categoryId?.name}</p>
                        <div className={cx("select")}>
                          <div className={cx("size")}>
                            <p>Size</p>
                            <select
                              value={p.size}
                              onChange={(e) => {
                                updateQuantity(
                                  String(p.product._id),
                                  Number(p.quantity),
                                  String(e.target.value),
                                  String(p.size)
                                );
                              }}
                            >
                              {p.product.sizes?.map((s) => (
                                <option key={s._id} value={s.size}>
                                  {s.size}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className={cx("quantity")}>
                            <p>Quantity</p>
                            <select
                              value={p.quantity}
                              onChange={(e) =>
                                updateQuantity(
                                  String(p.product._id),
                                  Number(e.target.value),
                                  String(p.size),
                                  String(p.size)
                                )
                              }
                            >
                              {optionQuantity.map((q) => (
                                <option key={q} value={q}>
                                  {q}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className={cx("remove-favorite")}>
                          <Link to="/favorite">
                            <FontAwesomeIcon title="Favorite" icon={faHeart} />
                          </Link>
                          <Link
                            onClick={() =>
                              removeFromCart(String(p.product._id), p.size)
                            }
                            to="#"
                          >
                            <FontAwesomeIcon
                              title="xóa sản phẩm"
                              icon={faTrashCan}
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className={cx("price")}>
                      <h5>{p.product.price} $</h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={cx("col-4")}>
              <h4 className={cx("fw-medium")}>Summary</h4>
              <div className={cx("summary")}>
                <div className={cx("summary-item")}>
                  <p>Subtotal</p>
                  <p>{state.totalAmount} $</p>
                </div>
                <div className={cx("summary-item")}>
                  <p>Estimated Delivery & Handling</p>
                  <p>Free</p>
                </div>
              </div>
              <div className={cx("total")}>
                <p>Total</p>
                <p>{state.totalAmount} $</p>
              </div>
              <div className={cx("checkout")}>
                <Button
                  href="/checkout"
                  size={"fullWidth"}
                  color={"colorBlack"}
                >
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartProduct;
