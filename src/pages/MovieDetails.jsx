import React from "react";
import { useParams } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import MovieDetailComponent from "../components/MovieDetails";
import "../style/landingPage.css";

const MovieDetailsPage = () => {
  const { id } = useParams();

  return (
    <div className="bg-dark min-vh-100">
      <NavigationBar />
      <div>
        <MovieDetailComponent movieId={id} />
      </div>
    </div>
  );
};

export default MovieDetailsPage;
