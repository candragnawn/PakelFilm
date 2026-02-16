import React from 'react';

const ModernMovieCard = ({ image, title, platform, isActive }) => {
  return (
    <div className={`modern-card ${isActive ? 'active' : ''}`}>
      {platform && <div className="platform-badge">{platform}</div>}
      <img src={image} alt={title} className="modern-card-image" />
      <div className="modern-card-overlay">
        <h3 className="modern-card-title">{title}</h3>
      </div>
    </div>
  );
};

export default ModernMovieCard;
