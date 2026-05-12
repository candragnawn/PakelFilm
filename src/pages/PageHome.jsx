import React from "react";
import NavigationBar from "../components/NavigationBar";
import Trending from "../components/Trending";
import HeroSection from "../components/main";
import Genre from "../components/Genre";
import Popular from "../components/PopularCard";
import TopRated from "../components/TopRated";
import Nowplaying from "../components/NowPlaying";
import SearchResults from "../components/SearchResults";
import "../style/landingPage.css";

import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  return (
    <div className="main-layout">
      <div className="hero-section">
        <NavigationBar />
        {query ? (
          <SearchResults query={query} />
        ) : (
          <>
            <HeroSection />
            <div className="content-overlay">
              <div className="Genre-container d-flex justify-content-center">
                <Genre />
              </div>
              <Trending />
              <Popular />
              <TopRated />
              <Nowplaying />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
