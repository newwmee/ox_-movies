import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom"; // BrowserRouter 제거
import Navbar from "./components/NavBar";
import MovieCard from "./components/MovieCard";
import MovieDetail from "./pages/MovieDetail";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { getMovieList, searchMovies } from "./axios";
import { useSupabaseAuth } from "./hooks/useSupabaseAuth";
import "./App.css";

function App() {
  const { user } = useSupabaseAuth();
  const [movieList, setMovieList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSearch = async (searchTerm) => {
    if (searchTerm !== "") {
      setIsLoading(true);
      setError(null);
      try {
        const movies = await searchMovies(searchTerm);
        setSearchResults(movies);
      } catch (err) {
        setError("영화 목록을 가져오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    } else {
      setSearchResults([]);
    }
  };

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

  useEffect(() => {
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
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <Layout onSearch={handleSearch} searchResults={searchResults} />
          }
        >
          <Route
            index
            element={
              <div className="movie-list">
                {(searchResults.length > 0 ? searchResults : movieList).map(
                  (movie) => (
                    <MovieCard key={movie.id} item={movie} />
                  )
                )}
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
