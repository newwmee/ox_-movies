import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar"; // Navbar 추가
import MovieCard from "./components/MovieCard";
import MovieDetail from "./pages/MovieDetail";
import Layout from "./components/Layout"; // Layout 추가
import { getMovieList, searchMovies } from "./axios"; // API 호출 함수
import "./App.css";

function App() {
  const [movieList, setMovieList] = useState([]); // 영화 목록 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  // 검색어를 전달받고 API 호출
  const handleSearch = async (query) => {
    setIsLoading(true);
    setError(null);
    try {
      const movies = await searchMovies(query);
      setMovieList(movies);
    } catch (err) {
      setError("영화 목록을 가져오는 데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 컴포넌트가 마운트될 때 인기 영화 목록을 가져오는 useEffect
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
    <div className="App">
      <Navbar onSearch={handleSearch} /> {/* Navbar에 onSearch 전달 */}
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
    </div>
  );
}

export default App;
