import React, { useContext } from "react";
import style from "./Checkout.module.scss";
import classNames from "classnames/bind";
import Button from "../../components/Button";
import { CartContext, CartContextType } from "../../contexts/CartContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckoutSchema } from "../../utils/validation";
import { CheckoutType } from "../../interfaces/Checkout";

const cx = classNames.bind(style);
const Checkout = () => {
  const { state, checkout } = useContext(CartContext) as CartContextType;
  //   console.log(state);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CheckoutType>({
    resolver: zodResolver(CheckoutSchema),
  });
  const onDataCheckout = (data: CheckoutType) => {
    console.log(data);
    checkout(data);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("row")}>
        <div className={cx("col-7")}>
          <h4 className={cx("fw-medium")}>How do you want to pay?</h4>
          <div className={cx("content")}>
            <form
              className={cx("form")}
              onSubmit={handleSubmit(onDataCheckout)}
            >
              <div className={cx("payment-methods")}>
                <ul>
                  <li>
                    <input
                      type="radio"
                      id="stripe"
                      value="Stripe"
                      {...register("payment")}
                    />
                    <label htmlFor="stripe">Stripe</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      id="paypal"
                      {...register("payment")}
                      value="paypal"
                    />
                    <label htmlFor="paypal">Paypal</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      id="vnpay"
                      {...register("payment")}
                      value="vnpay"
                    />
                    <label htmlFor="vnpay">VN Pay</label>
                  </li>
                  <li>
                    <input type="radio" id="momo" name="payment" value="momo" />
                    <label htmlFor="momo">Momo</label>
                  </li>
                </ul>
                {errors.payment && (
                  <p className={cx("text-danger")}>{errors.payment.message}</p>
                )}
              </div>

              <h4>Enter your name and address:</h4>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your name"
                  {...register("name")}
                />
                {errors.name && (
                  <p className={cx("text-danger")}>{errors.name.message}</p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="Enter your address"
                  {...register("address")}
                />
                {errors.address && (
                  <p className={cx("text-danger")}>{errors.address.message}</p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  placeholder="Enter your phone"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className={cx("text-danger")}>{errors.phone.message}</p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="note" className="form-label">
                  Note
                </label>
                <textarea
                  className="form-control"
                  id="note"
                  placeholder="Enter your note"
                  {...register("note")}
                />
                {errors.note && (
                  <p className={cx("text-danger")}>{errors.note.message}</p>
                )}
              </div>
              <div className={cx("buton-continue")}>
                <Button size={"fullWidth"} color={"colorBlack"}>
                  Continue
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className={cx("col-5")}>
          <h4 className={cx("fw-medium")}>Summary</h4>
          <div className={cx("summary")}>
            <div className={cx("summary-item")}>
              <p>Subtotal</p>
              <p> {state.totalAmount} $</p>
            </div>
            <div className={cx("summary-item")}>
              <p>Estimated Delivery & Handling</p>
              <p>Free</p>
            </div>
          </div>
          <div className={cx("total")}>
            <p>Total</p>
            <p> {state.totalAmount} $</p>
          </div>
          <div className={cx("product-cart")}>
            <h4 className={cx("fw-medium")}> Products </h4>
            {state.products.map((p, i) => (
              <div key={i} className={cx("product")}>
                <img src={p.product.thumbnail} alt="" />
                <div className={cx("product-info")}>
                  <p>{p.product.title}</p>
                  <span>{p.product.categoryId?.name}</span>
                  <span>Size:{p.size}</span>
                  <span>Quantity:{p.quantity}</span>
                  <span>Price:{p.product.price} $</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
