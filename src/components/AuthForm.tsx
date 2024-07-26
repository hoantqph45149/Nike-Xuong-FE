import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../contexts/AuthContext";
import { User } from "../interfaces/User";
import { loginSchema, registerSchema } from "../utils/validation";

type Props = {
  isLogin?: boolean;
};

const AuthForm = ({ isLogin }: Props) => {
  const { login: loginContext } = useAuth();
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<User>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
  });
  const onSubmit = async (data: User) => {
    try {
      if (isLogin) {
        const res = await api.post(`/auth/login`, data);
        // console.log(res.data.accessToken, res.data.data.user);
        loginContext(res.data.accessToken, res.data.data.user);
      } else {
        const res = await api.post(`/auth/register`, {
          username: data.username,
          email: data.email,
          password: data.password,
        });
        alert(`Register successfully ${res.data.message}`);
        nav("/login");
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-center">{isLogin ? "Login" : "Register"}</h1>
        {!isLogin && (
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              User name
            </label>
            <input
              type="username"
              className="form-control"
              id="username"
              {...register("username")}
            />
            {errors.username && (
              <span className="text-danger">{errors.username.message}</span>
            )}
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-danger">{errors.email.message}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            {...register("password")}
          />
          {errors.password && (
            <span className="text-danger">{errors.password.message}</span>
          )}
        </div>
        {!isLogin && (
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Confirm Password
            </label>
            <input
              type="text"
              className="form-control"
              id="confirmPass"
              {...register("confirmPass")}
            />
            {errors.confirmPass && (
              <span className="text-danger">{errors.confirmPass.message}</span>
            )}
          </div>
        )}
        <button className="btn btn-success w-100">
          {isLogin ? "Login" : "Register"}
        </button>
        {isLogin ? (
          <Link to={"/register"}>Register</Link>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </form>
    </>
  );
};

export default AuthForm;
