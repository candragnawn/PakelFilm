import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/PageHome.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import ListPage from "./pages/ListPage.jsx";

import "./App.css";
import "./style/landingPage.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        {/* <Route path="/discover/:type/:genreId" element={<ListPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
