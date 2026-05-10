import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const DB_KEYS = {
  USERS: "pakelfilm_users",
  CURRENT_USER: "pakelfilm_currentUser",
  FAVORITES: "pakelfilm_favorites",
  REVIEWS: "pakelfilm_reviews",
};

// Helper to read/write localStorage
const db = {
  get: (key) => JSON.parse(localStorage.getItem(key) || "null"),
  set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load current user on mount
  useEffect(() => {
    const savedUser = db.get(DB_KEYS.CURRENT_USER);
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  // Register
  const register = (name, email, password) => {
    const users = db.get(DB_KEYS.USERS) || [];

    if (users.find((u) => u.email === email)) {
      return { success: false, message: "Email sudah terdaftar!" };
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role: "user",
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    db.set(DB_KEYS.USERS, users);

    // Auto login after register
    const { password: _, ...safeUser } = newUser;
    setUser(safeUser);
    db.set(DB_KEYS.CURRENT_USER, safeUser);

    return { success: true, message: "Registrasi berhasil!" };
  };

  // Login
  const login = (email, password) => {
    const users = db.get(DB_KEYS.USERS) || [];
    const found = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!found) {
      return { success: false, message: "Email atau password salah!" };
    }

    const { password: _, ...safeUser } = found;
    setUser(safeUser);
    db.set(DB_KEYS.CURRENT_USER, safeUser);

    return { success: true, message: "Login berhasil!" };
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem(DB_KEYS.CURRENT_USER);
  };

  // Favorites
  const getFavorites = () => {
    if (!user) return [];
    const allFavs = db.get(DB_KEYS.FAVORITES) || {};
    return allFavs[user.id] || [];
  };

  const toggleFavorite = (movieId, mediaType, title, posterPath) => {
    if (!user) return false;

    const allFavs = db.get(DB_KEYS.FAVORITES) || {};
    const userFavs = allFavs[user.id] || [];

    const existingIndex = userFavs.findIndex(
      (f) => f.movieId === movieId && f.mediaType === mediaType,
    );

    if (existingIndex >= 0) {
      userFavs.splice(existingIndex, 1);
    } else {
      userFavs.push({
        movieId,
        mediaType,
        title,
        posterPath,
        addedAt: new Date().toISOString(),
      });
    }

    allFavs[user.id] = userFavs;
    db.set(DB_KEYS.FAVORITES, allFavs);
    return true;
  };

  const isFavorite = (movieId, mediaType) => {
    const favs = getFavorites();
    return favs.some(
      (f) => f.movieId === movieId && f.mediaType === mediaType,
    );
  };

  // Reviews
  const getReviews = (movieId, mediaType) => {
    const allReviews = db.get(DB_KEYS.REVIEWS) || {};
    const key = `${mediaType}_${movieId}`;
    return allReviews[key] || [];
  };

  const addReview = (movieId, mediaType, rating, comment) => {
    if (!user) return false;

    const allReviews = db.get(DB_KEYS.REVIEWS) || {};
    const key = `${mediaType}_${movieId}`;
    const reviews = allReviews[key] || [];

    // Check if user already reviewed
    const existingIndex = reviews.findIndex((r) => r.userId === user.id);
    if (existingIndex >= 0) {
      reviews[existingIndex] = {
        ...reviews[existingIndex],
        rating,
        comment,
        updatedAt: new Date().toISOString(),
      };
    } else {
      reviews.push({
        id: Date.now(),
        userId: user.id,
        userName: user.name,
        movieId,
        mediaType,
        rating,
        comment,
        createdAt: new Date().toISOString(),
      });
    }

    allReviews[key] = reviews;
    db.set(DB_KEYS.REVIEWS, allReviews);
    return true;
  };

  const deleteReview = (movieId, mediaType, reviewId) => {
    if (!user) return false;

    const allReviews = db.get(DB_KEYS.REVIEWS) || {};
    const key = `${mediaType}_${movieId}`;
    const reviews = allReviews[key] || [];

    allReviews[key] = reviews.filter(
      (r) => !(r.id === reviewId && r.userId === user.id),
    );
    db.set(DB_KEYS.REVIEWS, allReviews);
    return true;
  };

  const getUserReviews = () => {
    if (!user) return [];
    const allReviews = db.get(DB_KEYS.REVIEWS) || {};
    const userReviews = [];

    Object.values(allReviews).forEach((reviews) => {
      reviews.forEach((r) => {
        if (r.userId === user.id) {
          userReviews.push(r);
        }
      });
    });

    return userReviews.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        getFavorites,
        toggleFavorite,
        isFavorite,
        getReviews,
        addReview,
        deleteReview,
        getUserReviews,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
