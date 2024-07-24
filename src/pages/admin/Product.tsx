import { useContext } from "react";
import {
  ProductContext,
  ProductContextType,
} from "../../contexts/ProductContext";
import { Link } from "react-router-dom";
import { CategoryContext, CategoryType } from "../../contexts/CategoryContext";

const Product = () => {
  const { state: stateProducts, removeProduct } = useContext(
    ProductContext
  ) as ProductContextType;
  const { state: stateCategories } = useContext(
    CategoryContext
  ) as CategoryType;
  console.log(stateCategories);
  return (
    <div>
      <Link to="/admin/product-add" className="btn btn-primary mb-3">
        Thêm sản phẩm
      </Link>
      <table className="table table-bordered table-striped text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {stateProducts.products.map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td>
                {stateCategories.categories.find(
                  (category) => category._id === item.categoryId
                )?.name || "Unknown"}
              </td>
              <td>{item.description}</td>
              <td>
                <Link
                  to={`/admin/product-edit/${item._id}`}
                  className="btn btn-warning"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => removeProduct(item._id)}
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

export default Product;
