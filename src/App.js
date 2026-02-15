import "./App.css";
import NavigationBar from "./components/NavigationBar";
import Intro from "./components/Intro";
import Trending from "./components/Trending";
import SuperHero from "./components/Superhero";
import HeroSection from "./components/main";

import "./style/landingPage.css";

function App() {
  return (
    <div>
      <div className="hero-section">
        <NavigationBar />
        <Intro />
        <HeroSection />
      </div>

      <div className="trending">
        <Trending />
      </div>

      <div className="superhero">
        <SuperHero />
      </div>
    </div>
  );
}

export default App;
