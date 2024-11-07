import classNames from "classnames/bind";
import { useRef, useState } from "react";
import style from "./Sidebar.module.scss";
const cx = classNames.bind(style);

const Sidebar = () => {
  const [filters, setFilters] = useState({
    genders: [] as string[], // Mảng để lưu các giá trị gender
    colors: [] as string[], // Mảng để lưu các giá trị màu sắc
    priceRanges: [] as string[], // Mảng để lưu các giá trị khoảng giá
  });

  const toggleFilterOptions = (ref: any) => {
    const filterOptions = ref.current.nextElementSibling;
    if (filterOptions.style.maxHeight) {
      filterOptions.style.maxHeight = null;
    } else {
      filterOptions.style.maxHeight = filterOptions.scrollHeight + "px";
    }
  };

  const handleFilterChange = (
    filterType: "genders" | "colors" | "priceRanges",
    value: string,
    isChecked: boolean
  ) => {
    setFilters((prevFilters) => {
      const updatedFilter = isChecked
        ? [...prevFilters[filterType], value] // Thêm giá trị mới nếu được chọn
        : prevFilters[filterType].filter((item) => item !== value); // Bỏ giá trị nếu bị bỏ chọn

      return {
        ...prevFilters,
        [filterType]: updatedFilter,
      };
    });
    console.log(filters);
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
              <input
                type="checkbox"
                value="man"
                onChange={(e) =>
                  handleFilterChange(
                    "genders",
                    e.target.value,
                    e.target.checked
                  )
                }
              />{" "}
              Man
            </label>
            <label className={cx("custom-checkbox")}>
              <input
                type="checkbox"
                value="woman"
                onChange={(e) =>
                  handleFilterChange(
                    "genders",
                    e.target.value,
                    e.target.checked
                  )
                }
              />{" "}
              Woman
            </label>
            <label className={cx("custom-checkbox")}>
              <input
                type="checkbox"
                value="unisex"
                onChange={(e) =>
                  handleFilterChange(
                    "genders",
                    e.target.value,
                    e.target.checked
                  )
                }
              />{" "}
              Unisex
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
              <input
                type="checkbox"
                value="purple"
                onChange={(e) =>
                  handleFilterChange("colors", e.target.value, e.target.checked)
                }
              />
              <span
                className={cx("color-circle")}
                style={{ backgroundColor: "purple" }}
              ></span>
              Purple
            </label>
            <label className={cx("custom-checkbox")}>
              <input
                type="checkbox"
                value="black"
                onChange={(e) =>
                  handleFilterChange("colors", e.target.value, e.target.checked)
                }
              />
              <span
                className={cx("color-circle")}
                style={{ backgroundColor: "black" }}
              ></span>
              Black
            </label>
            <label className={cx("custom-checkbox")}>
              <input
                type="checkbox"
                value="red"
                onChange={(e) =>
                  handleFilterChange("colors", e.target.value, e.target.checked)
                }
              />
              <span
                className={cx("color-circle")}
                style={{ backgroundColor: "red" }}
              ></span>{" "}
              Red
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
              <input
                type="checkbox"
                value="0-1000000"
                onChange={(e) =>
                  handleFilterChange(
                    "priceRanges",
                    e.target.value,
                    e.target.checked
                  )
                }
              />{" "}
              Under 1,000,000đ
            </label>
            <label className={cx("custom-checkbox")}>
              <input
                type="checkbox"
                value="1000000-2000000"
                onChange={(e) =>
                  handleFilterChange(
                    "priceRanges",
                    e.target.value,
                    e.target.checked
                  )
                }
              />{" "}
              1,000,000đ - 2,000,000đ
            </label>
            <label className={cx("custom-checkbox")}>
              <input
                type="checkbox"
                value="2000000 -5000000"
                onChange={(e) =>
                  handleFilterChange(
                    "priceRanges",
                    e.target.value,
                    e.target.checked
                  )
                }
              />{" "}
              2,000,001đ - 4,999,999đ
            </label>
            <label className={cx("custom-checkbox")}>
              <input
                type="checkbox"
                value="5000000-infinity"
                onChange={(e) =>
                  handleFilterChange(
                    "priceRanges",
                    e.target.value,
                    e.target.checked
                  )
                }
              />{" "}
              Over 5,000,000đ
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
