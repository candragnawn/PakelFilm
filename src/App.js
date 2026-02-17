import "./App.css";
import NavigationBar from "./components/NavigationBar";
import Intro from "./components/Intro";
import Trending from "./components/Trending";
import SuperHero from "./components/Superhero";
import HeroSection from "./components/main";
import Genre from "./components/Genre";

import "./style/landingPage.css";

function App() {
  return (
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
  );
}

export default App;
