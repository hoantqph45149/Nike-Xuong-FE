import React from "react";
import style from "./PromoBox.module.scss";
import classNames from "classnames/bind";
import Button from "../Button";

const cx = classNames.bind(style);

const PromoBox = ({
  imageSrc,
  title,
  description,
  buttonLabel,
  buttonLink,
  children,
}: any) => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("promo-box")}>
        <div className={cx("promo-box-content")}>{children}</div>
        <div className={cx("promo-box-image")}>
          <img src={imageSrc} alt={title} />
        </div>
        <div className={cx("promo-box-text")}>
          <h2>{title}</h2>
          <p>{description}</p>
          <Button href={buttonLink} color={"colorBlack"}>
            {buttonLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PromoBox;
