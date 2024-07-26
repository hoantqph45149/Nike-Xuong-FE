import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import NotFound from "../../../pages/NotFound";
import classNames from "classnames/bind";
import style from "./LayoutAdmin.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(style);

const LayoutAdmin = () => {
  const { user } = useAuth();
  // console.log(user);
  if (!user || user.role !== "admin") {
    return <NotFound />;
  }
  return (
    <>
      <div className={cx("row")}>
        <div className={cx("col-2 p-0")}>
          <div className={cx("sidebar")}>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/hosts">Quản lý host</Link>
              </li>
              <li>
                <Link to="/users">Xem thống kê</Link>
              </li>
              <li>
                <Link to="/admin">Dashboard</Link>
              </li>
              <li>
                <Link to="/admin/users">User</Link>
              </li>
              <li>
                <Link to="/admin/products">Products</Link>
              </li>
              <li>
                <Link to="/admin/categories">Categories</Link>
              </li>
              <li>
                <Link to="/admin/brands">Brands</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={cx("col-10 p-0")}>
          <header
            className={cx(
              "d-flex align-items-center justify-content-between p-4",
              "header"
            )}
          >
            <div className={cx("search", "d-flex align-items-center")}>
              <input type="text" placeholder="Search" />
              <span>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </span>
            </div>
            <div className={cx("setting", "h-100")}>
              <ul className={cx("d-flex align-items-center h-100")}>
                <li>Đăng xuất</li>
                <li>
                  {" "}
                  <FontAwesomeIcon icon={faGear} />
                </li>
              </ul>
            </div>
          </header>
          <div className={cx("main", "h-100")}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutAdmin;
