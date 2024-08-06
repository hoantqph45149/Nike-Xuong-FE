// ToastManager.tsx
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastManager: React.FC = () => {
  return <ToastContainer />;
};

// Các hàm tiện ích để hiển thị thông báo
export const notify = (message: string) => {
  toast(message);
};

export const notifySuccess = (message: string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
  });
};

export const notifyError = (message: string) => {
  toast.error(message, {
    position: "top-right",
    autoClose: false,
  });
};

export const notifyWarning = (message: string) => {
  toast.warn(message, {
    position: "top-right",
    autoClose: 5000,
  });
};

export const notifyInfo = (message: string) => {
  toast.info(message, {
    position: "top-right",
    autoClose: 5000,
  });
};

export default ToastManager;
