import { Routes, Route } from "react-router-dom";
import DefaultLayout from "./Layout/DefaultLayout";
import Home from "./pages/Home/Home";
import Sobre from "./pages/Sobre/Sobre";
import Equipe from "./pages/Equipe/Equipe";
import Faq from "./pages/Faq/Faq";
import Contato from "./pages/Contato/Contato";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Mapa from "./pages/Mapa/Mapa";

const App = () => {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/equipe" element={<Equipe />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/mapa" element={<Mapa />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;