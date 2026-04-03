import { Outlet } from "react-router-dom";
import Header from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const DefaultLayout = () => {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="pt-20 overflow-x-clip">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default DefaultLayout;
