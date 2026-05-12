import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/PageHome.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import ListPage from "./pages/ListPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

import "./App.css";
import "./style/landingPage.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/tv/:id" element={<MovieDetails />} />
          <Route path="/:type" element={<ListPage />} />
          <Route path="/discover/:type/:genreId" element={<ListPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
