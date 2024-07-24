import { Outlet } from "react-router-dom";
import Footer from "../Footer/index";
import Header from "./../Header/index";

const LayoutClient = () => {
  return (
    <div>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default LayoutClient;
