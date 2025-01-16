import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetail, getSimilarMovies } from "../axios"; // getSimilarMovies 추가
import "./MovieDetail.css";
import MultipleItems from "./MultipleItems";

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movieDetail, setMovieDetail] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]); // 비슷한 영화 상태
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // 두 API를 동시에 호출
        const [detail, similar] = await Promise.all([
          getMovieDetail(movieId),
          getSimilarMovies(movieId),
        ]);
        console.log("Fetched similar movies:", similar.results);
        setMovieDetail(detail);
        setSimilarMovies(similar.results); // 비슷한 영화 리스트 업데이트
      } catch (err) {
        console.error("데이터를 가져오는 중 오류 발생:", err);
        setError("데이터를 가져오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  useEffect(() => {
    console.log(similarMovies); // 상태 업데이트 후 similarMovies 로그
  }, [similarMovies]); // similarMovies가 변경될 때마다 실행

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
      {similarMovies.length > 0 ? (
        <div className="similar-movies-section mt-8">
          <h2 className="text-2xl font-bold mb-4">비슷한 영화</h2>
          <MultipleItems movies={similarMovies} />
        </div>
      ) : (
        <div>비슷한 영화가 없습니다.</div>
      )}
    </div>
  );
};

export default MovieDetail;
