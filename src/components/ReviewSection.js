import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const ReviewSection = ({ movieId, mediaType }) => {
  const { user, getReviews, addReview, deleteReview } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(7);
  const [comment, setComment] = useState("");
  const [success, setSuccess] = useState("");
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    loadReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId, mediaType]);

  const loadReviews = () => {
    const data = getReviews(movieId, mediaType);
    setReviews(data);

    // If user already reviewed, pre-fill the form
    if (user) {
      const existing = data.find((r) => r.userId === user.id);
      if (existing) {
        setRating(existing.rating);
        setComment(existing.comment);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    addReview(parseInt(movieId), mediaType, rating, comment.trim());
    setSuccess("Review berhasil disimpan!");
    loadReviews();

    setTimeout(() => setSuccess(""), 3000);
  };

  const handleDelete = (reviewId) => {
    deleteReview(parseInt(movieId), mediaType, reviewId);
    loadReviews();
    setComment("");
    setRating(7);
  };

  const userHasReview = user && reviews.some((r) => r.userId === user.id);

  const renderStars = (value, interactive = false) => {
    const stars = [];
    for (let i = 1; i <= 10; i++) {
      stars.push(
        <span
          key={i}
          className={`review-star ${i <= (interactive ? hoverRating || value : value) ? "active" : ""}`}
          onClick={interactive ? () => setRating(i) : undefined}
          onMouseEnter={interactive ? () => setHoverRating(i) : undefined}
          onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
          style={interactive ? { cursor: "pointer" } : {}}
        >
          ★
        </span>,
      );
    }
    return <div className="d-flex gap-1">{stars}</div>;
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="review-section mt-5">
      <h4 className="text-white mb-4">REVIEWS</h4>

      {/* Review Form */}
      {user ? (
        <div className="review-form-card mb-4">
          <h6 className="text-white mb-3">
            {userHasReview ? "Edit Review Kamu" : "Tulis Review"}
          </h6>

          {success && (
            <Alert variant="success" className="py-2">
              {success}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="text-secondary small mb-2 d-block">
                Rating: {rating}/10
              </label>
              {renderStars(rating, true)}
            </div>

            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Bagikan pendapatmu tentang film ini..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="review-textarea"
              />
            </Form.Group>

            <Button type="submit" className="review-submit-btn">
              {userHasReview ? "UPDATE REVIEW" : "KIRIM REVIEW"}
            </Button>
          </Form>
        </div>
      ) : (
        <div className="review-login-prompt mb-4">
          <p className="text-secondary mb-0">
            <a href="/login" className="auth-link">
              Masuk
            </a>{" "}
            untuk menulis review
          </p>
        </div>
      )}

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="reviews-list">
          {reviews.map((review) => (
            <div key={review.id} className="review-item">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <div className="review-avatar">
                      {review.userName?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <span className="review-author">{review.userName}</span>
                      <span className="review-date">
                        {formatDate(review.createdAt)}
                      </span>
                    </div>
                  </div>
                  <div className="mb-2">{renderStars(review.rating)}</div>
                  <p className="review-comment">{review.comment}</p>
                </div>
                {user && user.id === review.userId && (
                  <Button
                    variant="link"
                    className="text-danger p-0"
                    onClick={() => handleDelete(review.id)}
                    title="Hapus review"
                  >
                    ✕
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-secondary text-center py-4">
          <p>Belum ada review. Jadilah yang pertama!</p>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
