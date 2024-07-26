import classNames from "classnames/bind";
import { useEffect, useRef } from "react";
import style from "./SlideShow.module.scss";

const cx = classNames.bind(style);

const Slideshow = () => {
  const slidesRef: any = useRef(null);
  const indexRef = useRef(0);

  useEffect(() => {
    const slides = slidesRef.current;
    const width = slides ? slides.firstElementChild.clientWidth : 0;
    // console.log(slides, width);
    const interval = setInterval(() => {
      if (indexRef.current === 3) {
        indexRef.current = 0;
      }
      slides.style.transform = `translateX(-${indexRef.current * width}px)`;
      indexRef.current++;
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cx("slide-container")}>
      <div className={cx("slides")} ref={slidesRef}>
        <div className={cx("slide")}>
          <h3>Move, Shop, Customise & Celebrate With Us.</h3>
          <p>
            No matter what you feel like doing today, It's better as a Member.
          </p>
          <a href="#">Join Us</a>
        </div>
        <div className={cx("slide")}>
          <h3>Move, Shop, Customise & Celebrate With Us.</h3>
          <p>New Styles on Sale: Up to 40% Off</p>
          <a href="#">Shop All Our New Markdowns</a>
        </div>
        <div className={cx("slide")}>
          <h3>Free Delivery</h3>
          <p>Applies to orders of 5.000.000₫ or more</p>
          <a href="#">View details</a>
        </div>
      </div>
    </div>
  );
};

export default Slideshow;
