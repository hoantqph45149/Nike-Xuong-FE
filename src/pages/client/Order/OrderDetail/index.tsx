import classNames from "classnames/bind";
import style from "./OrderDetail.module.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../../api";

const cx = classNames.bind(style);

const OrderDetail = () => {
  const { id } = useParams();
  const [orderDetail, setOrderDetail] = useState<any>({});

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/orders/${id}`);
        console.log(data);
        setOrderDetail(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  return (
    <div className={cx("order-details")}>
      <h1>Chi Tiết Đơn Hàng</h1>
      <div className={cx("order-info")}>
        <p>
          <strong>Mã Đơn Hàng:</strong> {orderDetail._id}
        </p>
        <p>
          <strong>Tên Người Đặt:</strong> {orderDetail.name || "N/A"}
        </p>
        <p>
          <strong>Địa Chỉ:</strong> {orderDetail.address || "N/A"}
        </p>
        <p>
          <strong>Số Điện Thoại:</strong> {orderDetail.phone || "N/A"}
        </p>
        <p>
          <strong>Ngày Đặt Hàng:</strong>{" "}
          {orderDetail.date
            ? new Date(orderDetail.date).toLocaleDateString()
            : "N/A"}
        </p>
        <p>
          <strong>Trạng Thái:</strong>
          <span
            className={cx("status", {
              delivered: orderDetail.status === "delivered",
              processing: orderDetail.status === "processing",
            })}
          >
            {orderDetail.status}
          </span>
        </p>
        <p>
          <strong>Tổng Tiền:</strong> {orderDetail.totalAmount} VND
        </p>
      </div>

      <h2>Sản Phẩm Trong Đơn Hàng</h2>
      <table className={cx("items-table")}>
        <thead>
          <tr>
            <th>Ảnh sản phẩm</th>
            <th>Tên Sản Phẩm</th>
            <th>Kích cỡ</th>
            <th>Số Lượng</th>
            <th>Giá</th>
          </tr>
        </thead>
        <tbody>
          {orderDetail?.products?.map((item: any) => (
            <tr key={item._id}>
              <td>
                <img
                  width={100}
                  src={item?.product?.thumbnail}
                  alt={item?.product?.title}
                />
              </td>
              <td>{item?.product?.title}</td>
              <td>{item.size}</td>
              <td>{item.quantity}</td>
              <td>{item?.product?.price.toLocaleString()} VND</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetail;
