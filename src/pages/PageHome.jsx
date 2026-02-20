import React from "react";
import "../App.css";
import NavigationBar from "../components/NavigationBar";
import { useSearchParams } from "react-router-dom";
import Trending from "../components/Trending";
import SuperHero from "../components/Superhero";
import HeroSection from "../components/main";
import Genre from "../components/Genre";

import "../style/landingPage.css";
import Popular from "../components/PopularCard";
import TopRated from "../components/TopRated";
import Nowplaying from "../components/NowPlaying";

const Home = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q")
  return (
    <div>
      <div className="main-layout">
        <div className="hero-section">
          <NavigationBar />
          <HeroSection />

          <div className="content-overlay">
            <div className="Genre-container d-flex justify-content-center">
              <Genre />
            </div>
            {/* <SuperHero /> */}
            <Trending />
            <Popular />
            <TopRated />
            <Nowplaying />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
