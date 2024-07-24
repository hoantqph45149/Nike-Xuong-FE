import { useContext } from "react";
import { Link } from "react-router-dom";
import { CategoryContext, CategoryType } from "../../contexts/CategoryContext";

const Category = () => {
  const { state, removeCategory } = useContext(CategoryContext) as CategoryType;
  return (
    <div>
      <Link to="/admin/category-add" className="btn btn-primary mb-3">
        Thêm loại sản phẩm
      </Link>
      <table className="table table-bordered table-striped text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>name</th>
            <th>slug</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {state.categories.map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.name}</td>
              <td>{item.slug}</td>
              <td>{item.description}</td>
              <td>
                <Link
                  to={`/admin/category-edit/${item._id}`}
                  className="btn btn-warning"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => removeCategory(item._id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Category;
