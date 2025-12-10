import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import PlazoFijoPage from "./pages/PlazoFijoPage";
import ViviendaPage from "./pages/ViviendaPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plazofijo" element={<PlazoFijoPage />} />
        <Route path="/vivienda" element={<ViviendaPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
