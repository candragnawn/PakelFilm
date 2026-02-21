import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import ModernMovieCard from "./ModernMovieCard";
import { useParams, useSearchParams } from "react-router-dom";

const List = () => {
  const [result, setResults] = useState([]);
  const [load, setLoading] = useState(false);
 
  const { type } = useParams()
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort") || "popularity.desc";

  const API_KEY = (process.env.REACT_APP_APIKEY || "").trim();
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMG_URL = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try { 
        const url = `${BASE_URL}/discover/${type}?api_key=${API_KEY}&sort_by=${sort}`
        const response = await fetch(url)
        const data = await response.json()
        setResults(data.results);
     

      } catch (error) {
        console.log("gagal mengambil data", error)
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  },[type, sort]);
  const handleSortChange = (e) => {
    ({sort: e.target.value});
  };

  return <div>
    <Container>
        <Row>
            <Col xs={6} md={4} lg={3}>
            <ModernMovieCard />
            </Col>
        </Row>
    </Container>
  </div>;
};

export default List;
