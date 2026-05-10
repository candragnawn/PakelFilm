import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const FavoriteButton = ({ movieId, mediaType, title, posterPath }) => {
  const { user, isFavorite, toggleFavorite } = useAuth();
  const [fav, setFav] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (user) {
      setFav(isFavorite(parseInt(movieId), mediaType));
    }
  }, [user, movieId, mediaType, isFavorite]);

  const handleClick = () => {
    if (!user) {
      window.location.href = "/login";
      return;
    }

    toggleFavorite(parseInt(movieId), mediaType, title, posterPath);
    setFav(!fav);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 400);
  };

  return (
    <button
      className={`favorite-btn ${fav ? "active" : ""} ${animating ? "animating" : ""}`}
      onClick={handleClick}
      title={fav ? "Hapus dari Favorit" : "Tambah ke Favorit"}
    >
      <span className="favorite-icon">{fav ? "♥" : "♡"}</span>
      <span className="favorite-text">
        {fav ? "FAVORIT" : "TAMBAH KE FAVORIT"}
      </span>
    </button>
  );
};

export default FavoriteButton;
