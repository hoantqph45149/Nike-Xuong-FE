import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import api from "../../api";
import { OrderContext, OrderType } from "../../contexts/OrderContext";
import { Orders } from "../../interfaces/Order";

const { Option } = Select;
const OrderManagement = () => {
  const [form] = Form.useForm() as any;
  const { state, updateOrder } = useContext(OrderContext) as OrderType;
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [orderDetail, setOrderDetail] = useState<any>({});
  const [pendingCancel, setPendingCancel] = useState(false);

  const getStatusOptions = (currentStatus?: Orders["status"]) => {
    switch (currentStatus) {
      case "pending":
        return [
          { value: "processing", label: "Đang xử lý" },
          { value: "cancelled", label: "Đã hủy" },
        ];
      case "processing":
        return [
          { value: "shipped", label: "Đang giao" },
          { value: "cancelled", label: "Đã hủy (cần xác nhận)" },
        ];
      case "shipped":
        return [{ value: "delivered", label: "Đã giao" }];
      default:
        return [];
    }
  };
  const handleSelectChange = (item: Orders, newStatus: Orders["status"]) => {
    if (newStatus === "cancel_pending" && item.status === "processing") {
      setPendingCancel(true);
    } else {
      handleStatusChange(item._id, newStatus);
    }
  };

  const confirmCancel = async (item: Orders) => {
    await handleStatusChange(item._id, "cancelled");
    setPendingCancel(false);
  };

  // Từ chối yêu cầu hủy đơn
  const denyCancel = () => {
    setPendingCancel(false);
  };

  const handleDetail = async (id?: string) => {
    try {
      const { data } = await api.get(`/orders/${id}`);
      setOrderDetail(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (id?: string) => {
    await handleDetail(id);
  };

  useEffect(() => {
    form.setFieldsValue(orderDetail);
  }, [orderDetail, form]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const currentOrder = state.Orders.find((order) => order._id === id);
      let updatedOrder = {} as any;
      if (currentOrder) {
        updatedOrder = {
          ...currentOrder,
          status: newStatus,
        };
      }
      updateOrder(id, updatedOrder);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredOrders = state?.Orders.filter((item) => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(lowerCaseTerm) ||
      (item.date &&
        new Date(item.date).toLocaleDateString().includes(lowerCaseTerm)) ||
      item.phone.includes(lowerCaseTerm)
    );
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Tìm kiếm đơn hàng..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="form-control m-3 w-50"
      />
      <table className="table table-bordered table-striped text-center">
        <thead>
          <tr>
            <th>Tên người nhận</th>
            <th>Ngày Đặt Hàng</th>
            <th>Trạng Thái</th>
            <th>Tổng Tiền</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders?.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>
                {item.date ? new Date(item.date).toLocaleDateString() : "N/A"}
              </td>
              <td>
                <Select<Orders["status"]>
                  defaultValue={item.status as Orders["status"]}
                  onChange={(value) =>
                    handleSelectChange(item as Orders, value)
                  }
                >
                  {getStatusOptions(item.status).map((option) => (
                    <Option
                      key={option.value}
                      value={option.value as Orders["status"]}
                    >
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </td>
              {pendingCancel ||
                (item.status === "cancel_pending" && (
                  <td>
                    <>
                      <Button
                        onClick={() => confirmCancel(item)}
                        type="primary"
                        danger
                      >
                        Xác nhận hủy
                      </Button>

                      <Button
                        onClick={denyCancel}
                        style={{ marginLeft: "8px" }}
                      >
                        Hủy xác nhận
                      </Button>
                    </>
                  </td>
                ))}
              <td>{item.totalAmount.toLocaleString()} VNĐ</td>
              <td className="d-flex justify-content-center gap-4">
                <Popconfirm
                  title="Update the task"
                  description="Are you sure to update this task?"
                  onConfirm={() => {
                    handleUpdate(item._id);
                    setOpenDrawer(true);
                  }}
                  onCancel={() => {}}
                  okText="Yes"
                  cancelText="No"
                >
                  <button title="Edit">
                    <TfiWrite />
                  </button>
                </Popconfirm>
                <button
                  onClick={() => {
                    setOpenModal(true);
                    handleDetail(item._id);
                  }}
                  title="View"
                >
                  <FaRegEye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        centered
        footer={null}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        width={1000}
      >
        <div className="container my-4">
          <h1 className="mb-4">Chi Tiết Đơn Hàng</h1>
          <div className="order-info border p-4 rounded bg-light">
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
              <strong>Trạng Thái:</strong>{" "}
              <span
                className={`badge ${
                  orderDetail.status === "delivered"
                    ? "bg-success"
                    : "bg-warning"
                }`}
              >
                {orderDetail.status}
              </span>
            </p>
            <p>
              <strong>Tổng Tiền:</strong>{" "}
              {orderDetail?.totalAmount?.toLocaleString()} VND
            </p>
          </div>

          <h2 className="mt-5">Sản Phẩm Trong Đơn Hàng</h2>
          <table className="table table-striped mt-3">
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
                      className="img-thumbnail"
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
      </Modal>
      <Drawer
        title="Update Order"
        width={720}
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
      >
        <Form
          form={form}
          layout="vertical"
          style={{
            border: "none",
            padding: 0,
            width: "100%",
            boxShadow: "none",
            background: "none",
          }}
          onFinish={(data) => {
            setOpenDrawer(false), updateOrder(orderDetail._id, data);
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please enter user name" }]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="address"
                label="Address"
                rules={[{ required: true, message: "Please enter address" }]}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="Please enter address"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Phone"
                rules={[{ required: true, message: "Please select an phone" }]}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="Please select an phone"
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="note"
                label="Note"
                rules={[{ required: true, message: "please enter note" }]}
              >
                <Input.TextArea
                  rows={2}
                  placeholder="please enter url description"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default OrderManagement;
