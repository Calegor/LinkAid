import { Outlet } from "react-router-dom";
import Header from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const DefaultLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default DefaultLayout;
