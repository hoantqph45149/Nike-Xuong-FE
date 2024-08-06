import {
  faFacebook,
  faSquareInstagram,
} from "@fortawesome/free-brands-svg-icons";
import {
  faBagShopping,
  faEnvelope,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import images from "../../assets/images";
import style from "./Header.module.scss";
import { useContext } from "react";
import { AuthContext, AuthContextType } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { ligatures } from "@fortawesome/free-brands-svg-icons/fa42Group";

const cx = classNames.bind(style);
const Header = () => {
  const { user, logout } = useContext(AuthContext) as AuthContextType;
  return (
    <header>
      <div className={cx("header")}>
        <div className={cx("header-top")}>
          <div className={cx("contact")}>
            <span className={cx("facebook-icon")} title="Facebook">
              <FontAwesomeIcon icon={faFacebook} />
            </span>
            <span className={cx("instagram-icon")} title="Instagram">
              <FontAwesomeIcon icon={faSquareInstagram} />
            </span>
            <span className={cx("email-icon")} title="Email">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
          </div>
          <div className={cx("support")}>
            <ul>
              <li>
                <a href="/find">Find a Store</a>
              </li>
              <li>
                <a href="/help">Help</a>
              </li>
              {user ? (
                <>
                  <li>
                    <span>Welcome, {user?.email}</span>
                  </li>
                  <li>
                    <a href="#" onClick={logout}>
                      Logout
                    </a>
                  </li>
                  {user.role === "admin" ? (
                    <li>
                      <Link to="/admin">Admin</Link>
                    </li>
                  ) : (
                    <li>
                      <Link to="/profile">Profile</Link>
                    </li>
                  )}
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className={cx("header-bottom")}>
        <div className={cx("nav")}>
          <div className={cx("logo")}>
            <a href="/">
              <img src={images.logo} alt="Logo" />
            </a>
          </div>
          <div className={cx("menu")}>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/shop">Shop</a>
              </li>
              <li>
                <a href="/women">Women</a>
              </li>
              <li>
                <a href="/kids">Kids</a>
              </li>
              <li>
                <a href="/sale">Sale</a>
              </li>
            </ul>
          </div>
          <div className={cx("search")}>
            <div className={cx("search-input")}>
              <input type="text" placeholder="Search" />{" "}
              <div className={cx("search-icon")}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </div>
            </div>
            <div className={cx("cart")}>
              <Link to="/cart-product">
                <FontAwesomeIcon icon={faBagShopping} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
