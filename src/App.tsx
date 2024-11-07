import { Route, Routes } from "react-router-dom";
import LayoutClient from "./components/layouts/LayoutClient/index";
import Home from "./pages/client/Home/index";
import Profile from "./pages/client/Profile/index";
import UpdateProfile from "./pages/client/UpdateProfile";
import ForgotPassword from "./pages/client/ForgotPassword";
import ProductDetail from "./pages/client/ProductDetail/index";
import LayoutSidebar from "./components/layouts/LayoutSidebar/index";
import Shop from "./pages/client/Shop/index";
import AuthForm from "./components/AuthForm";
import LayoutAdmin from "./components/layouts/LayoutAdmin/index";
import Dashboard from "./pages/admin/Dashboard";
import Product from "./pages/admin/Product";
import ProductForm from "./components/ProductForm";
import Category from "./pages/admin/Category";
import CategoryForm from "./components/CategoryForm";
import NotFound from "./pages/client/NotFound";
import UpdateAvata from "./pages/client/UpdateAvata";
import CartProduct from "./pages/client/CartProduct";
import Checkout from "./pages/client/Checkout";
import ListOrder from "./pages/client/Order/ListOrder";
import OrderDetails from "./pages/client/Order/OrderDetail";
import OrderManagement from "./pages/admin/OrderManegement";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutClient />}>
          <Route index element={<Home />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/edit-profile" element={<UpdateProfile />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/productdetail/:id" element={<ProductDetail />} />

          <Route path="/edit-avatar/:id" element={<UpdateAvata />} />

          <Route path="/cart-product" element={<CartProduct />} />

          <Route path="/checkout" element={<Checkout />} />

          <Route path="/order" element={<ListOrder />} />

          <Route path="/orderdetail/:id" element={<OrderDetails />} />
        </Route>

        <Route path="/" element={<LayoutSidebar />}>
          <Route path="/shop" element={<Shop />} />
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

          <Route path="/admin/order" element={<OrderManagement />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
