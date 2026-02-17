import React from "react";
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import Intro from "./components/Intro";
import Trending from "./components/Trending";
import SuperHero from "./components/Superhero";
import HeroSection from "./components/main";
import Genre from "./components/Genre";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "./style/landingPage.css";

const home = () => {
  return (
    <div>
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
    </div>
  );
};

export default home;
