import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import MovieCard from "./components/MovieCard";
import MovieDetail from "./pages/MovieDetail";
import movieListData from "./data/movieListData.json";
import Layout from "./components/Layout";
import "./App.css";

function App() {
  const [movieList] = useState(movieListData.results);
  return (
    <>
      <Routes>
        {/* MovieCard를 여러 개 렌더링 */}
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
          {/* MovieDetail 페이지 설정 */}
          <Route path="/details" element={<MovieDetail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
