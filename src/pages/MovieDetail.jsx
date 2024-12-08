import React, { useEffect, useState } from "react";
import "./MovieDetail.css";
import { useParams } from "react-router-dom";
//useEffect - 네트워크요청 api불러오기
const MovieDetail = () => {
  const { movieId } = useParams(); // URL에서 movieId를 추출
  const [movie, setMovie] = useState(null); // 영화 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

  // useEffect를 사용하여 컴포넌트가 렌더링될 때 API 요청을 보냄
  useEffect(() => {
    console.log("API Key:", process.env.REACT_APP_TMDB_API_KEY);
    const fetchMovieDetails = async () => {
      const apiKey = process.env.REACT_APP_TMDB_API_KEYY; // .env 파일에서 API 키를 가져옴
      const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setMovie(data); // 받은 데이터를 상태에 저장
        setLoading(false); // 로딩 상태 변경
      } catch (error) {
        console.error("영화 상세 정보를 가져오는 중 오류 발생:", error);
        setError(
          "영화 상세 정보를 가져오는 데 실패했습니다. 잠시 후 다시 시도해주세요."
        );
        setLoading(false); // 로딩 상태 변경
      }
    };

    fetchMovieDetails(); // API 호출
  }, [movieId]); // movieId가 변경될 때마다 호출

  // 로딩 중일 때 "Loading..." 메시지 표시
  if (loading) return <div>Loading...</div>;

  // 영화 데이터가 없으면 "No movie found" 메시지 표시
  if (!movie) return <div>No movie found</div>;

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
