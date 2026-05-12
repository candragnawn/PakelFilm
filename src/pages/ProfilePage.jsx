import React, { useState, useEffect } from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import ModernMovieCard from "../components/ModernMovieCard";
import "../style/landingPage.css";

const ProfilePage = () => {
  const { user, getFavorites, getUserReviews } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [reviews, setReviews] = useState([]);

  const IMG_URL = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    setFavorites(getFavorites());
    setReviews(getUserReviews());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!user) return null;

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const renderStars = (value) => {
    const stars = [];
    for (let i = 1; i <= 10; i++) {
      stars.push(
        <span
          key={i}
          className={`review-star ${i <= value ? "active" : ""}`}
          style={{ fontSize: "0.8rem" }}
        >
          ★
        </span>,
      );
    }
    return <span className="d-inline-flex gap-0">{stars}</span>;
  };

  return (
    <div className="main-layout" style={{ minHeight: "100vh", backgroundColor: "#000" }}>
      <NavigationBar />
      <Container style={{ paddingTop: "120px", paddingBottom: "60px" }}>
        {/* Profile Header */}
        <div className="profile-header mb-5">
          <div className="d-flex align-items-center gap-4">
            <div className="profile-avatar-large">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-white mb-1">{user.name}</h2>
              <p className="text-secondary mb-1">{user.email}</p>
              <p className="text-secondary mb-0" style={{ fontSize: "0.85rem" }}>
                Bergabung sejak {formatDate(user.createdAt)}
              </p>
            </div>
          </div>

          <div className="profile-stats mt-4">
            <div className="stat-item">
              <span className="stat-number">{favorites.length}</span>
              <span className="stat-label">Favorit</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{reviews.length}</span>
              <span className="stat-label">Review</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tab.Container defaultActiveKey="favorites">
          <Nav variant="tabs" className="profile-tabs mb-4">
            <Nav.Item>
              <Nav.Link eventKey="favorites" className="profile-tab-link">
                ♥ Favorit ({favorites.length})
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="reviews" className="profile-tab-link">
                ★ Review ({reviews.length})
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            {/* Favorites Tab */}
            <Tab.Pane eventKey="favorites">
              {favorites.length > 0 ? (
                <Row className="g-4">
                  {favorites.map((fav, index) => (
                    <Col key={index} xs={6} md={4} lg={2}>
                      <ModernMovieCard
                        id={fav.movieId}
                        title={fav.title}
                        image={
                          fav.posterPath
                            ? `${IMG_URL}${fav.posterPath}`
                            : "https://via.placeholder.com/500x750?text=No+Poster"
                        }
                        mediaType={fav.mediaType}
                      />
                    </Col>
                  ))}
                </Row>
              ) : (
                <div className="text-center text-secondary py-5">
                  <p className="lead">Belum ada film favorit</p>
                  <p>
                    Tambahkan film ke favorit dari halaman detail film.
                  </p>
                </div>
              )}
            </Tab.Pane>

            {/* Reviews Tab */}
            <Tab.Pane eventKey="reviews">
              {reviews.length > 0 ? (
                <div className="reviews-list">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="review-item clickable"
                      onClick={() =>
                        navigate(`/${review.mediaType}/${review.movieId}`)
                      }
                    >
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <span className="review-movie-title">
                            {review.mediaType === "tv" ? "📺" : "🎬"}{" "}
                            ID: {review.movieId}
                          </span>
                          <div className="mb-1">{renderStars(review.rating)}</div>
                          <p className="review-comment mb-1">
                            {review.comment}
                          </p>
                          <span className="review-date">
                            {formatDate(review.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-secondary py-5">
                  <p className="lead">Belum ada review</p>
                  <p>
                    Tulis review dari halaman detail film.
                  </p>
                </div>
              )}
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
    </div>
  );
};

export default ProfilePage;
