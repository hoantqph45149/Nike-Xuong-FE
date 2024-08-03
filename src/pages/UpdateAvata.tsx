import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import ImageUpload from "../components/ImageUpload";

const UpdateAvata = () => {
  const nav = useNavigate();
  const [avatar, setAvatar] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const onImageUpload = (url: string) => {
    setAvatar(url);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/auth/me`);
        setAvatar(data.user.avatar || "");
        setLoading(false);
      } catch (error) {
        setError("Failed to load user data");
        setLoading(false);
      }
    })();
  }, []);

  const onData = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await api.patch(`/auth/update-me`, { avatar: avatar });
      alert("Bạn đã thay đổi Avatar thành công !");
      nav("/profile");
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
    <form>
      {avatar && (
        <div className="mb-3 text-center">
          <img
            src={avatar}
            className="rounded-circle"
            alt="User Avatar"
            width="150"
            height="150"
          />
        </div>
      )}
      <ImageUpload onUploadedSuccess={onImageUpload} />
      <div className="mb-3">
        <button
          onClick={onData}
          type="submit"
          className="btn btn-primary w-100"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default UpdateAvata;
