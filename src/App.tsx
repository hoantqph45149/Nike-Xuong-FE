import { Route, Routes } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import CategoryForm from "./components/CategoryForm";
import LayoutAdmin from "./components/layouts/LayoutAdmin";
import LayoutClient from "./components/layouts/LayoutClient";
import ProductForm from "./components/ProductForm";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/admin/Dashboard";
import Product from "./pages/admin/Product";
import Category from "./pages/admin/Category";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutClient />}>
          <Route index element={<Home />} />
        </Route>

        <Route path="/login" element={<AuthForm isLogin />} />
        <Route path="/register" element={<AuthForm />} />

        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<Dashboard />} />

          <Route path="/admin/products" element={<Product />} />
          <Route path="/admin/product-add" element={<ProductForm />} />
          <Route path="/admin/product-edit/:id" element={<ProductForm />} />

          <Route path="/admin/categories" element={<Category />} />
          <Route path="/admin/category-add" element={<CategoryForm />} />
          <Route path="/admin/category-edit/:id" element={<CategoryForm />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
