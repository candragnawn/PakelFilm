import React, { memo } from "react";
import { Link } from "react-router-dom";

const ModernMovieCard = memo(({
  id,
  image,
  title,
  platform,
  rating,
  date,
  isActive,
}) => {
  return (
    <Link to={`/movie/${id}`} style={{ textDecoration: "none" }}>
      <div className={`modern-card ${isActive ? "active" : ""}`}>
        {platform && <div className="platform-badge">{platform}</div>}
        <img src={image} alt={title} className="modern-card-image" loading="lazy" />
        <div className="modern-card-overlay ">
          <h3 className="modern-card-title">{title}</h3>
          <h3 className="modern-card-title">{rating}</h3>
          <h4 className="modern-card-date">{date}</h4>
        </div>
      </div>
    </Link>
  );
});

export default ModernMovieCard;
