import { Routes, Route } from "react-router-dom";
import DefaultLayout from "./Layout/DefaultLayout";
import Home from "./pages/Home/Home";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;