import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { ProductProvider } from "./contexts/ProductContext.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { CategoryPovider } from "./contexts/CategoryContext.tsx";
import CartProvider from "./contexts/CartContext.tsx";
import ToastManager from "./components/ToastManager/index.tsx";
import { OrderProvider } from "./contexts/OrderContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastManager />
      <OrderProvider>
        <CartProvider>
          <CategoryPovider>
            <AuthProvider>
              <ProductProvider>
                <App />
              </ProductProvider>
            </AuthProvider>
          </CategoryPovider>
        </CartProvider>
      </OrderProvider>
    </BrowserRouter>
  </React.StrictMode>
);
