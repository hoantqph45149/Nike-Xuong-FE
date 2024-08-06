import React from "react";

const MyLoader: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  return (
    <div className={`my-loader ${isVisible ? "show" : "hide"}`}>
      {/* Có thể thêm spinner hoặc nội dung khác nếu cần */}
    </div>
  );
};

export default MyLoader;
