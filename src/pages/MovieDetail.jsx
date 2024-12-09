import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetail } from "../axios"; // API 호출 함수
import "./MovieDetail.css";

const MovieDetail = () => {
  const { movieId } = useParams(); // URL 파라미터에서 movieId 추출
  const [movieDetail, setMovieDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      setIsLoading(true);
      try {
        const detail = await getMovieDetail(movieId);
        setMovieDetail(detail);
      } catch (err) {
        console.error("영화 상세 정보를 가져오는 중 오류 발생:", err);
        setError("영화 상세 정보를 가져오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [movieId]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="movie-detail-container">
      {movieDetail && (
        <div className="movie-detail-item">
          <img
            className="movie-detail-poster"
            src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
            alt={movieDetail.title}
          />
          <div className="movie-detail-info">
            <h1 className="movie-title">{movieDetail.title}</h1>
            <p className="movie-vote">
              ⭐ {movieDetail.vote_average} ({movieDetail.vote_count} votes)
            </p>
            <div className="movie-genres">
              {movieDetail.genres.map((genre) => (
                <span key={genre.id} className="genre">
                  {genre.name}
                </span>
              ))}
            </div>
            <p className="movie-overview">{movieDetail.overview}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
