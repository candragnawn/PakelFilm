import "./App.css";

import { BrowserRouter, Routes, Route, Link, Router } from "react-router-dom";
import Home from "./pages/PageHome.jsx";
import "./style/landingPage.css";
import MovieDetails from "./pages/MovieDetails.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/id" element={<MovieDetails />} />
      </Routes> 
    </BrowserRouter>
  );
}

export default App;
