// DefaultLayout.js

import classNames from "classnames/bind";
import { Outlet } from "react-router-dom";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import style from "./LayoutSiderbar.module.scss";

const cx = classNames.bind(style);

const LayoutSidebar = () => {
  return (
    <div>
      <Header />
      <div className={cx("container")}>
        <div className={cx("sidebar")}>
          <Sidebar />
        </div>
        <div className={cx("content")}>
          {" "}
          <Outlet />{" "}
        </div>
      </div>
    </div>
  );
};

export default LayoutSidebar;
