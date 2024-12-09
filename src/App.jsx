import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import MovieCard from "./components/MovieCard";
import MovieDetail from "./pages/MovieDetail"; // MovieDetail을 별도로 가져옴
import Layout from "./components/Layout";
import { getMovieList } from "./axios"; // API 호출 함수
import "./App.css";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const movies = await getMovieList();
        setMovieList(movies);
      } catch (err) {
        console.error("영화 목록을 가져오는 중 오류 발생:", err);
        setError(
          "영화 목록을 가져오는 데 실패했습니다. 잠시 후 다시 시도해주세요."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          path="/"
          element={
            <div className="movie-list">
              {movieList.map((movie) => (
                <MovieCard key={movie.id} item={movie} />
              ))}
            </div>
          }
        />
        <Route path="/details/:movieId" element={<MovieDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
