// DefaultLayout.js
import React from "react";

import classNames from "classnames/bind";
import style from "./LayoutSiderbar.module.scss";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import { Outlet } from "react-router-dom";

const cx = classNames.bind(style);

const LayoutSidebar = () => {
  return (
    <div>
      <Header />
      <div className={cx("container")}>
        <Sidebar />
        <div className={cx("content")}>
          {" "}
          <Outlet />{" "}
        </div>
      </div>
    </div>
  );
};

export default LayoutSidebar;
