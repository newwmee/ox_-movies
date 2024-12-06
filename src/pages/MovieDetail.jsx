import React, { useState } from "react";
import movieDetailData from "./movieDetailData.json"; // movieDetailData 가져오기
import "./MovieDetail.css";
//useEffect - 네트워크요청 api불러오기
const MovieDetail = () => {
  const [movie] = useState(movieDetailData); //컴포넌트 내 상태관리
  return (
    <div className="movie-detail-container">
      {!movie ? (
        <div>Loading...</div> // 데이터가 없으면 로딩 표시
      ) : (
        <div className="movie-detail-item">
          {/* 왼쪽: 영화 포스터 */}
          <img
            className="movie-detail-poster"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          {/* 오른쪽: 영화 정보 */}
          <div className="movie-detail-info">
            {/* 제목 */}
            <h1 className="movie-title">{movie.title}</h1>
            {/* 평점 */}
            <p className="movie-vote">
              ⭐ {movie.vote_average} ({movie.vote_count} votes)
            </p>
            {/* 장르 */}
            <div className="movie-genres">
              {movie.genres.map((genre) => (
                <span key={genre.id} className="genre">
                  {genre.name}
                </span>
              ))}
            </div>
            {/* 줄거리 */}
            <p className="movie-overview">{movie.overview}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
