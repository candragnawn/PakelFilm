import React, { useState, useEffect } from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import ModernMovieCard from "../components/ModernMovieCard";
import "../style/landingPage.css";

const ProfilePage = () => {
  const { user, getFavorites, getUserReviews, updateUser } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newName, setNewName] = useState(user?.name || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const IMG_URL = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    setFavorites(getFavorites());
    setReviews(getUserReviews());
    setNewName(user.name);
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

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setMessage("");

    if (!newName.trim()) {
      setMessage("Nama tidak boleh kosong!");
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      setMessage("Password baru dan konfirmasi tidak cocok!");
      return;
    }

    const result = updateUser(newName.trim(), newPassword || null, currentPassword);

    if (result.success) {
      setMessage("Profil berhasil diperbarui!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      setMessage(result.message);
    }
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
            <Nav.Item>
              <Nav.Link eventKey="settings" className="profile-tab-link">
                ⚙ Pengaturan Akun
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

          {/* Settings Tab */}
          <Tab.Pane eventKey="settings">
            <div className="settings-form" style={{ maxWidth: "500px", margin: "0 auto" }}>
              <h4 className="text-white mb-4">Pengaturan Akun</h4>
              {message && (
                <div className={`alert ${message.includes("berhasil") ? "alert-success" : "alert-danger"} mb-3`}>
                  {message}
                </div>
              )}
              <form onSubmit={handleUpdateProfile}>
                <div className="mb-3">
                  <label htmlFor="newName" className="form-label text-white">
                    Nama Akun Baru
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="newName"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Masukkan nama baru"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="currentPassword" className="form-label text-white">
                    Password Lama (diperlukan untuk perubahan)
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Masukkan password lama"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label text-white">
                    Password Baru (opsional)
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Masukkan password baru"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label text-white">
                    Konfirmasi Password Baru
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Konfirmasi password baru"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Simpan Perubahan
                </button>
              </form>
            </div>
          </Tab.Pane>

        </Tab.Container>
      </Container>
    </div>
  );
};

export default ProfilePage;
