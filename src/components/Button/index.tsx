import React from "react";
import classNames from "classnames/bind";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

const Button = ({
  children,
  size,
  variant,
  onClick,
  href,
  backgroundColor,
  color,
  border,
}: any) => {
  const className = cx({
    button: true,
    [size]: size,
    [variant]: variant,
    [color]: color,
    [border]: border,
  });

  if (href) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
