import { useNavigate } from "react-router-dom";
import "./MovieCard.css";

const MovieCard = ({ item }) => {
  // props에서 item을 구조 분해
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/details/${item.id}`);
  };
  return (
    <div className="movie-card-main" onClick={handleCardClick}>
      <img
        className="movie-poster-main"
        src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
        alt={item.title} // alt 속성에 제목
      />
      <p className="movie-title-main">{item.title}</p>
      <p className="movie-rating-main">⭐{item.vote_average}</p>
    </div>
  );
};

export default MovieCard;
