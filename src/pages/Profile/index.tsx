import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext, AuthContextType } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const { user } = useContext(AuthContext) as AuthContextType;
  // console.log(user);
  return (
    <div>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-4 ">
            <div className="card text-center position-relative">
              <div className="card-body ">
                <img
                  src={user?.avatar}
                  className="rounded-circle img-thumbnail mb-3"
                  alt="User Avatar"
                  width="150"
                  height="150"
                />
                <Link
                  to={`/edit-avatar/${user?._id}`}
                  title="Edit Avatar"
                  className="top-50 end-40 position-absolute"
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Link>
                <h5 className="card-title">Tên người dùng: {user?.username}</h5>
                <p className="card-text">Email: {user?.email}</p>
                <Link to={`/edit-profile`} className="btn btn-dark">
                  Chỉnh sửa hồ sơ
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <h5>Thông tin cá nhân</h5>
              </div>
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Tên người dùng
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={user?.username || ""}
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={user?.email || ""}
                      disabled
                    />
                  </div>
                  <button type="submit" className="btn btn-dark">
                    Đổi mật khẩu
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
