import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/PageHome.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
// import Movie from "./pages/Movie.jsx";
// import TV from "./pages/TV.jsx";
import "./App.css";
import "./style/landingPage.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/discover/:type/:genreId" element={<MovieDetails />} />
      </Routes> 
    </BrowserRouter>
  );
}

export default App;
