import React, { useState, useEffect } from "react";
import movieListData from "../data/movieListData.json";

const MovieCard = () => {
  const baseUrl = "https://image.tmdb.org/t/p/w500"; // 이미지 URL 베이스
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // movieListData.json에서 results를 상태에 저장
    setMovies(movieListData.results);
  }, []);

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-card">
          <img
            src={`${baseUrl}${movie.poster_path}`}
            alt={movie.title}
            className="movie-card__image"
          />
          <div className="movie-card__details">
            <h3 className="movie-card__title">{movie.title}</h3>
            <p className="movie-card__rating">Rating: {movie.vote_average}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieCard;
