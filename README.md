# PakelFilms - Modern Movie & TV Exploration Platform

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.x-7952B3?logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A premium, performance-optimized movie discovery application built with React and TMDB API. This project demonstrates high-quality UI design, efficient state management, and optimized data fetching strategies.

---

## 🚀 Key Features

- **Dynamic Content Discovery**: Explore trending, upcoming, and popular movies and TV shows.
- **Advanced Filtering**: Filter content by categories (Movie/TV) and genres with real-time updates.
- **Deep Search**: Fast and responsive search functionality across the entire TMDB database.
- **Responsive Premium UI**: Custom-styled Bootstrap components for a sleek, dark-themed cinematic experience.
- **Efficient Navigation**: Seamless routing with `react-router-dom` and persistent active states.

## 🛠️ Technical Highlights

Focusing on performance and scalability, this project implements several advanced patterns:

### ⚡ Optimized Data Caching
To reduce API latency and avoid redundant network requests, I implemented a custom **InMemory Cache Manager** (`MovieCache`).
- **TTL (Time To Live)**: Cache entries automatically expire after 1 hour to ensure data freshness.
- **Memory Efficiency**: Uses a `Map` structure for O(1) retrieval and automatic cleanup of stale data.

### 🔍 Advanced URL-Driven State
Filtering and pagination are synchronized with the URL search parameters. This allows for:
- **Direct Linking**: Users can share specific filtered results via URL.
- **Browser History Support**: Full integration with back/forward buttons for intuitive navigation.

### 🎭 Component Design Pattern
- **Atomic Components**: Reusable UI elements like `ModernMovieCard` to ensure consistency.
- **Lazy Loading Strategy**: Optimized image loading to improve initial render performance.

## 💻 Tech Stack

- **Frontend**: React 18
- **Styling**: Vanilla CSS, React Bootstrap (Customized)
- **Networking**: Axios / Fetch API
- **Routing**: React Router 7
- **Database/API**: TMDB (The Movie Database)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/candragnawn/PakelFilm.git
   cd PakelFilm
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_APIKEY=your_tmdb_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

## 📂 Project Structure

```text
src/
├── components/     # High-impact reusable UI components
├── pages/          # Page-level containers (Home, Details, List)
├── utils/          # Logic utilities (Caching, Genres mapping)
├── assets/         # Static visual resources
└── App.js          # Main application routing logic
```

---

## 🤝 Connect with Me

- LinkedIn: https://www.linkedin.com/in/your-profile



