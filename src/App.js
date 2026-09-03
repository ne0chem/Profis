import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Main from "./pages/Main/Main";
import About from "./pages/About/About";
import Services from "./pages/Services/Services";
import Progects from "./pages/Progects/Progects";
import Contants from "./pages/Main/Contants/Contants";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="services" element={<Services />} />
          <Route path="projects" element={<Progects />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contants />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
