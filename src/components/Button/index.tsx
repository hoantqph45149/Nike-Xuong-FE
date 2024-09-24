import classNames from "classnames/bind";
import styles from "./Button.module.scss";
import { Link } from "react-router-dom";

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
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
