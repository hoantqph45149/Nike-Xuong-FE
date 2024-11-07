import classNames from "classnames/bind";
import style from "./Footer.module.scss";

const cx = classNames.bind(style);

const Footer = () => {
  return (
    <footer className={cx("footer")}>
      <div className={cx("footer-content")}>
        <div className={cx("footer-section")}>
          <h4>Resources</h4>
          <ul>
            <li>
              <a href="#">Find A Store</a>
            </li>
            <li>
              <a href="#">Become A Member</a>
            </li>
            <li>
              <a href="#">Send Us Feedback</a>
            </li>
          </ul>
        </div>
        <div className={cx("footer-section")}>
          <h4>Help</h4>
          <ul>
            <li>
              <a href="#">Get Help</a>
            </li>
            <li>
              <a href="#">Order Status</a>
            </li>
            <li>
              <a href="#">Delivery</a>
            </li>
            <li>
              <a href="#">Returns</a>
            </li>
            <li>
              <a href="#">Payment Options</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
          </ul>
        </div>
        <div className={cx("footer-section")}>
          <h4>About Nike</h4>
          <ul>
            <li>
              <a href="#">About Nike</a>
            </li>
            <li>
              <a href="#">News</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">Investors</a>
            </li>
            <li>
              <a href="#">Sustainability</a>
            </li>
          </ul>
        </div>
      </div>
      <div className={cx("footer-bottom")}>
        <p>&copy; 2024 Nike, Inc. All rights reserved.</p>
        <ul className={cx("footer-links")}>
          <li>
            <a href="#">Guides</a>
          </li>
          <li>
            <a href="#">Terms of Sale</a>
          </li>
          <li>
            <a href="#">Terms of Use</a>
          </li>
          <li>
            <a href="#">Nike Privacy Policy</a>
          </li>
        </ul>
        <div className={cx("footer-country")}>
          <a href="#">Vietnam</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
