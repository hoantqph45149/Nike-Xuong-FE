import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import api from "../api";
import { useEffect, useState } from "react";

const ForgotPassword = () => {
  const [countdown, setCountdown] = useState<number | null>(null);
  interface FormData {
    email: string;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onEmail = async (data: FormData) => {
    try {
      setCountdown(20);
      await api.post("/auth/forgot-password", data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) =>
          prevCountdown !== null ? prevCountdown - 1 : null
        );
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);
  return (
    <form onSubmit={handleSubmit(onEmail)}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Enter your email"
          {...register("email")}
        />
        {errors.email && (
          <span className="text-danger">{errors.email.message}</span>
        )}
      </div>

      <div className="mb-3">
        {" "}
        {countdown !== null && (
          <p>
            Password mới sẽ được gửi vào email của bạn trong{" "}
            <span className="text-danger">{countdown}</span>{" "}
            <span className="text-danger"></span> giây
          </p>
        )}
      </div>

      <div className="mb-3">
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </div>
      <Link to="/login" className="text-decoration-underline text-primary">
        Login
      </Link>
    </form>
  );
};

export default ForgotPassword;
