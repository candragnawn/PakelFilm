import "./App.css";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "./style/landingPage.css";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-dark">
        <div className="hero-section">
          <NavigationBar />
          <Intro />
          <HeroSection />

          <div className="content-overlay">
            <div className="Genre-container d-flex justify-content-center">
              <Genre />
            </div>
            <SuperHero />
            <Trending />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
