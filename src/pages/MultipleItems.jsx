import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MultiItems.css";

function MultipleItems({ movies }) {
  if (!Array.isArray(movies) || movies.length === 0) {
    return <div>영화 목록을 불러오는 데 실패했습니다.</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrow: true,
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

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.id} className="slider-item">
            <div className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${
                  movie.poster_path || "default.jpg"
                }`}
                alt={movie.title}
                className="w-full h-auto"
              />
              <div className="movie-info">
                <h3 className="text-lg font-semibold">{movie.title}</h3>
                {movie.vote_average && (
                  <p className="text-sm text-gray-600">
                    ⭐ {movie.vote_average.toFixed(1)}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default MultipleItems;
