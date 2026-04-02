import { Outlet } from "react-router-dom";
import Header from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import CodeStream from "../components/FinalShowCase/FinalShowCase";

const DefaultLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20">
        <Outlet />
        <CodeStream />
      </main>
      <Footer />
    </div>
  );
};
export default DefaultLayout;
