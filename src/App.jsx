import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import MovieCard from "./components/MovieCard";
import MovieDetail from "./pages/MovieDetail";
import movieListData from "./data/movieListData.json";
import Layout from "./components/Layout";

function App() {
  const [movieList] = useState(movieListData.results);
  return (
    <>
      <header>
        <Layout />
      </header>
      <main>
        <Routes>
          {/* MovieCard를 여러 개 렌더링 */}
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
        </Routes>
      </main>
    </>
  );
}

export default App;
