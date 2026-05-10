import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Semua field harus diisi!");
      setLoading(false);
      return;
    }

    const result = login(email, password);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-backdrop"></div>
      <Container className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2 className="auth-title">Masuk</h2>
            <p className="auth-subtitle">
              Masuk ke akun PakelFilms kamu
            </p>
          </div>

          {error && (
            <Alert variant="danger" className="auth-alert">
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label className="auth-label">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="auth-label">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
              />
            </Form.Group>

            <Button
              type="submit"
              className="auth-btn w-100"
              disabled={loading}
            >
              {loading ? "Memproses..." : "MASUK"}
            </Button>
          </Form>

          <div className="auth-footer">
            <p>
              Belum punya akun?{" "}
              <Link to="/register" className="auth-link">
                Daftar sekarang
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
