import "./App.css";

import { BrowserRouter, Routes, Route, Link, Router } from "react-router-dom";
import Home from "./pages/PageHome.jsx";

import "./style/landingPage.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
