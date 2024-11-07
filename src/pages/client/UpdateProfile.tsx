import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../api";
import { AuthContext, AuthContextType } from "../../contexts/AuthContext";
import { User } from "../../interfaces/User";
import { profileSchema } from "../../utils/validation";

const UpdateProfile = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { logout } = useContext(AuthContext) as AuthContextType;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<User>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/auth/me`);
        reset(data.user);
        setLoading(false);
      } catch (error) {
        setError("Failed to load user data");
        setLoading(false);
      }
    })();
  }, [reset]);

  const onData = async (data: User) => {
    try {
      await api.patch(`/auth/update-me`, data);
      alert("Bạn đã thay đổi thông tin thành công vui lòng đăng nhập lại!");
      logout();
    } catch (error) {
      console.log(error);
      alert("Failed to update profile. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <form onSubmit={handleSubmit(onData)}>
      <h1>Update Profile</h1>
      <p>Update your profile information</p>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          id="username"
          placeholder="Enter your username"
          {...register("username")}
        />
        {errors.username && (
          <p className="text-danger">{errors.username.message}</p>
        )}
      </div>
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
        {errors.email && <p className="text-danger">{errors.email.message}</p>}
      </div>
      <div className="mb-3">
        <button type="submit" className="btn btn-primary w-100">
          Update
        </button>
      </div>
    </form>
  );
};

export default UpdateProfile;
