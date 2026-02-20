import React from "react";

const ModernMovieCard = ({
  image,
  title,
  platform,
  rating,
  date,
  type,
  isActive,
}) => {
  return (
    <div className={`modern-card ${isActive ? "active" : ""}`}>
      {platform && <div className="platform-badge">{platform}</div>}
      <img src={image} alt={title} className="modern-card-image" />
      <div className="modern-card-overlay ">
        <h3 className="modern-card-title">{title}</h3>
        <h3 className="modern-card-title">{rating}</h3>
        <h4 className="modern-card-date">{date}</h4>
        <h4 className="modern-card-date">{type}</h4>
      </div>
    </div>
  );
};

export default ModernMovieCard;
