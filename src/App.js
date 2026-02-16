import "./App.css";
import NavigationBar from "./components/NavigationBar";
import Intro from "./components/Intro";
import Trending from "./components/Trending";
import SuperHero from "./components/Superhero";
import HeroSection from "./components/main";

import "./style/landingPage.css";

function App() {
  return (
    <div className="bg-dark">
      <div className="hero-section">
        <NavigationBar />
        <Intro />
        <HeroSection />
        <div className="superhero-overlay">
          <SuperHero />
          <Trending />
        </div>
      </div>
    </div>
  );
}

export default App;
