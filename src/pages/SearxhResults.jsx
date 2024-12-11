import React from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

const SearchResults = ({ results }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  return (
    <div className="search-results-container">
      <h2>"{query}" 검색 결과</h2>
      <div className="movie-grid">
        {results.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;