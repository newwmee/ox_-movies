import { useEffect, useState } from "react";
import "./MovieDetail.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieDetail = () => {
  const { movieid } = useParams();
  const [movieDetail, setMovieDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      try {
        const apiKey = import.meta.env.VITE_REACT_APP_TMDB_API_KEY;
        const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
        const apiUrl = `https://api.themoviedb.org/3/movie/${movieid}?api_key=${apiKey}&language=ko-KR`;
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setMovieDetail(response.data);
      } catch (error) {
        console.error("영화 상세 정보를 가져오는 중 오류 발생:", error);
        setError(
          "영화 상세 정보를 가져오는 데 실패했습니다. 잠시 후 다시 시도해주세요."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  if (error) {
    return <div>에러: {error}</div>;
  }

  return (
    <div className="movie-detail-container">
      {!movieDetail ? (
        <div>Loading...</div> // movieDetail가 없으면 로딩 표시
      ) : (
        <div className="movie-detail-item">
          {/* 왼쪽: 영화 포스터 */}
          <img
            className="movie-detail-poster"
            src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
            alt={movieDetail.title}
          />
          {/* 오른쪽: 영화 정보 */}
          <div className="movie-detail-info">
            {/* 제목 */}
            <h1 className="movie-title">{movieDetail.title}</h1>
            {/* 평점 */}
            <p className="movie-vote">
              ⭐ {movieDetail.vote_average} ({movieDetail.vote_count} votes)
            </p>
            {/* 장르 */}
            <div className="movie-genres">
              {movieDetail.genres.map((genre) => (
                <span key={genre.id} className="genre">
                  {genre.name}
                </span>
              ))}
            </div>
            {/* 줄거리 */}
            <p className="movie-overview">{movieDetail.overview}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
