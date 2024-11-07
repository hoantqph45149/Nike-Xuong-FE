import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import { FaEye } from "react-icons/fa";

import style from "./ListOrder.module.scss";
import api from "../../../../api";
import { useNavigate } from "react-router-dom";
import { Orders } from "../../../../interfaces/Order";
import { OrderContext, OrderType } from "../../../../contexts/OrderContext";

const cx = classNames.bind(style);

const ListOrder = () => {
  const { state, updateOrder } = useContext(OrderContext) as OrderType;
  const nav = useNavigate();
  const orders = state?.OrdersByUser;

  return (
    <div className={cx("order-management")}>
      <h1>Quản Lý Đơn Hàng</h1>
      <table className={cx("order-table")}>
        <thead>
          <tr>
            <th>Mã Đơn Hàng</th>
            <th>Ngày Đặt Hàng</th>
            <th>Trạng Thái</th>
            <th>Tổng Tiền</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>
                {order.date ? new Date(order.date).toLocaleDateString() : "N/A"}
              </td>
              <td>
                <span
                  className={cx("status", {
                    delivered: order.status === "delivered",
                    processing: order.status === "processing",
                  })}
                >
                  {order.status}
                </span>
              </td>
              <td>{order.totalAmount.toLocaleString()} VND</td>
              <td className="d-flex flex-column gap-3">
                {order.status === "pending" && (
                  <button
                    onClick={() =>
                      updateOrder(order._id, { ...order, status: "cancelled" })
                    }
                    className="btn btn-danger"
                  >
                    Hủy đơn
                  </button>
                )}
                {order.status === "processing" && (
                  <button
                    onClick={() =>
                      updateOrder(order._id, {
                        ...order,
                        status: "cancel_pending",
                      })
                    }
                    className="btn btn-danger"
                  >
                    Hủy đơn
                  </button>
                )}
                {order.status === "cancel_pending" && (
                  <button className="btn btn-danger">Đang chờ xử lý ...</button>
                )}
                {order.status === "cancelled" ? (
                  <button className="btn btn-danger">Đã hủy</button>
                ) : (
                  <button
                    onClick={() => nav(`/orderdetail/${order._id}`)}
                    className="btn btn-primary"
                  >
                    <FaEye /> Xem Chi Tiết
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListOrder;
