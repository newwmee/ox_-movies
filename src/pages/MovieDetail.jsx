import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetail, getSimilarMovies } from "../axios"; // getSimilarMovies 추가
import "./MovieDetail.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movieDetail, setMovieDetail] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]); // 추가된 부분
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // 두 API를 동시에 호출
        const [detail, similar] = await Promise.all([
          getMovieDetail(movieId),
          getSimilarMovies(movieId),
        ]);
        setMovieDetail(detail);
        setSimilarMovies(similar.results);
      } catch (err) {
        console.error("데이터를 가져오는 중 오류 발생:", err);
        setError("데이터를 가져오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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
      {similarMovies.length > 0 && (
        <div className="similar-movies-section mt-8">
          <h2 className="text-2xl font-bold mb-4">비슷한 영화</h2>
          <Slider {...settings}>
            {similarMovies.map((movie) => (
              <div key={movie.id} className="px-2">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{movie.title}</h3>
                    <p className="text-sm text-gray-600">
                      ⭐ {movie.vote_average.toFixed(1)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
