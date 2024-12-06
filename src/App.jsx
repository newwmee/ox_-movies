import React from "react";
import MovieCard from "./components/MovieCard";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <h1>Movie List</h1>
      <MovieCard /> {/* MovieCard 컴포넌트를 호출 */}
    </div>
  );
};

export default App;
