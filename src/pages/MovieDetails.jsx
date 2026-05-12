import React from "react";
import { useParams, useLocation } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import MovieDetailComponent from "../components/MovieDetails";
import "../style/landingPage.css";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const mediaType = location.pathname.startsWith("/tv") ? "tv" : "movie";

  return (
    <div className="bg-dark min-vh-100">
      <NavigationBar />
      <div>
        <MovieDetailComponent movieId={id} mediaType={mediaType} />
      </div>
    </div>
  );
};

export default MovieDetailsPage;
