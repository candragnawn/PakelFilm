import React, { useState, useEffect } from "react";
import { Container, Col, Row, Form, Pagination } from "react-bootstrap";
import ModernMovieCard from "./ModernMovieCard";
import { useParams, useSearchParams } from "react-router-dom";
import { MOVIE_GENRES, TV_GENRES } from "../utils/genres";

const List = () => {
  const [result, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const { type } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get("sort") || "popularity.desc";
  const genre = searchParams.get("genre") || "";
  const page = parseInt(searchParams.get("page")) || 1;

  const API_KEY = (process.env.REACT_APP_APIKEY || "").trim();
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMG_URL = "https://image.tmdb.org/t/p/w500";

  const currentType =
    type?.toLowerCase() === "tv" || type?.toLowerCase() === "tv-shows"
      ? "tv"
      : "movie";
  const genresList = currentType === "movie" ? MOVIE_GENRES : TV_GENRES;

  useEffect(() => {
    const fetchResults = async () => {
      if (!API_KEY) {
        console.error("API Key is missing!");
        return;
      }

      setLoading(true);
      try {
        const url = `${BASE_URL}/discover/${currentType}?api_key=${API_KEY}&sort_by=${sort}${genre ? `&with_genres=${genre}` : ""}&page=${page}`;
        console.log("Fetching from URL:", url);

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data results count:", data.results?.length);

        setResults(data.results || []);
        setTotalPages(Math.min(data.total_pages || 1, 500));
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
    window.scrollTo(0, 0);
  }, [currentType, sort, genre, page, API_KEY]);

  const updateParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    if (key !== "page") {
      newParams.set("page", "1");
    }
    setSearchParams(newParams);
  };

  const handlePageChange = (newPage) => {
    updateParam("page", newPage.toString());
  };

  return (
    <div id="list" className="py-5 min-vh-100 mt-5">
      <Container>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-5 gap-3">
          <div className="d-flex gap-2 w-100 w-md-auto">
            <Form.Select
              className="search-input-modern"
              style={{ width: "180px" }}
              value={genre}
              onChange={(e) => updateParam("genre", e.target.value)}
            >
              <option value="">ALL GENRES</option>
              {genresList.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name.toUpperCase()}
                </option>
              ))}
            </Form.Select>

            <Form.Select
              className="search-input-modern"
              style={{ width: "180px" }}
              value={sort}
              onChange={(e) => updateParam("sort", e.target.value)}
            >
              <option value="popularity.desc">POPULARITY</option>
              <option value="vote_average.desc">TOP RATED</option>
              <option value="primary_release_date.desc">NEWEST</option>
              <option value="revenue.desc">BOX OFFICE</option>
            </Form.Select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <Row className="g-4">
              {result && result.length > 0 ? (
                result.map((item) => (
                  <Col key={item.id} xs={6} md={4} lg={2}>
                    <ModernMovieCard
                      id={item.id}
                      title={item.title || item.name}
                      image={
                        item.poster_path
                          ? `${IMG_URL}${item.poster_path}`
                          : "https://via.placeholder.com/500x750?text=No+Poster"
                      }
                      platform={item.vote_average?.toFixed(1)}
                      // rating={item.vote_average}
                      date={(
                        item.release_date || item.first_air_date
                      )?.substring(0, 10)}
                    />
                  </Col>
                ))
              ) : (
                <div className="text-center text-white py-5 flex-grow-1 w-100">
                  <h3>No results found</h3>
                  <p>Try adjusting your filters or check your connection.</p>
                </div>
              )}
            </Row>

            {totalPages > 1 && (
              <div className="d-flex justify-content-center mt-5">
                <Pagination className="custom-pagination">
                  <Pagination.First
                    onClick={() => handlePageChange(1)}
                    disabled={page === 1}
                  />
                  <Pagination.Prev
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                  />

                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    let pageNum;
                    if (totalPages <= 5) pageNum = i + 1;
                    else if (page <= 3) pageNum = i + 1;
                    else if (page >= totalPages - 2)
                      pageNum = totalPages - 4 + i;
                    else pageNum = page - 2 + i;

                    return (
                      <Pagination.Item
                        key={pageNum}
                        active={pageNum === page}
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum}
                      </Pagination.Item>
                    );
                  })}

                  <Pagination.Next
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                  />
                  <Pagination.Last
                    onClick={() => handlePageChange(totalPages)}
                    disabled={page === totalPages}
                  />
                </Pagination>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default List;

