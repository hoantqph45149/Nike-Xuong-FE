import React, { useRef } from "react";
import classNames from "classnames/bind";
import style from "./Sidebar.module.scss";
const cx = classNames.bind(style);

const Sidebar = () => {
  const toggleFilterOptions = (ref: any) => {
    const filterOptions = ref.current.nextElementSibling;
    if (filterOptions.style.maxHeight) {
      filterOptions.style.maxHeight = null;
    } else {
      filterOptions.style.maxHeight = filterOptions.scrollHeight + "px";
    }
  };

  const genderRef = useRef(null);
  const priceRef = useRef(null);
  const colourRef = useRef(null);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("sidebar")}>
        <div className={cx("filter-section")}>
          <h3
            className={cx("filter-title")}
            onClick={() => toggleFilterOptions(genderRef)}
            ref={genderRef}
          >
            Gender
          </h3>
          <div className={cx("filter-options")}>
            <label className={cx("custom-checkbox")}>
              <input type="checkbox" value="male" /> Male
            </label>
            <label className={cx("custom-checkbox")}>
              <input type="checkbox" value="female" /> Female
            </label>
          </div>
        </div>

        <div className={cx("filter-section")}>
          <h3
            className={cx("filter-title")}
            onClick={() => toggleFilterOptions(priceRef)}
            ref={priceRef}
          >
            Shop By Price
          </h3>
          <div className={cx("filter-options")}>
            <label className={cx("custom-checkbox")}>
              <input type="checkbox" value="under-1m" /> Under 1,000,000đ
            </label>
            <label className={cx("custom-checkbox")}>
              <input type="checkbox" value="1m-2m" /> 1,000,000đ - 2,000,000đ
            </label>
            <label className={cx("custom-checkbox")}>
              <input type="checkbox" value="2m-5m" /> 2,000,001đ - 4,999,999đ
            </label>
            <label className={cx("custom-checkbox")}>
              <input type="checkbox" value="over-5m" /> Over 5,000,000đ
            </label>
          </div>
        </div>

        <div className={cx("filter-section")}>
          <h3
            className={cx("filter-title")}
            onClick={() => toggleFilterOptions(colourRef)}
            ref={colourRef}
          >
            Colour
          </h3>
          <div className={cx("filter-options")}>
            <label className={cx("custom-checkbox")}>
              <input type="checkbox" value="purple" />
              <span
                className={cx("color-circle")}
                style={{ backgroundColor: "purple" }}
              ></span>
              Purple
            </label>
            <label className={cx("custom-checkbox")}>
              <input type="checkbox" value="black" />
              <span
                className={cx("color-circle")}
                style={{ backgroundColor: "black" }}
              ></span>
              Black
            </label>
            <label className={cx("custom-checkbox")}>
              <input type="checkbox" value="red" />
              <span
                className={cx("color-circle")}
                style={{ backgroundColor: "red" }}
              ></span>{" "}
              Red
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
