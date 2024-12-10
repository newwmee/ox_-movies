import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar"; // Navbar 컴포넌트 import
import MovieCard from "./components/MovieCard"; // MovieCard 컴포넌트 import
import MovieDetail from "./pages/MovieDetail"; // MovieDetail 컴포넌트 import
import Layout from "./components/Layout"; // Layout 컴포넌트 import
import { getMovieList, searchMovies } from "./axios"; // API 호출 함수들 import
import "./App.css"; // 스타일 import
function App() {
  const [movieList, setMovieList] = useState([]); // 전체 영화 목록 상태
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  // 검색어를 전달받고 검색을 실행하는 함수
  const handleSearch = async (searchTerm) => {
    if (searchTerm !== "") {
      setIsLoading(true); // 로딩 상태 true로 설정
      setError(null); // 에러 초기화
      try {
        // 검색 API 호출
        const movies = await searchMovies(searchTerm);
        setSearchResults(movies); // 검색된 영화 리스트로 상태 업데이트
      } catch (err) {
        setError("영화 목록을 가져오는 데 실패했습니다.");
      } finally {
        setIsLoading(false); // 로딩 상태 false로 설정
      }
    } else {
      setSearchResults([]); // 검색어가 비어 있으면 검색 결과 초기화
    }
  };

  // 영화 목록을 가져오는 함수
  const fetchMovies = async () => {
    setIsLoading(true); // 로딩 상태 true로 설정
    try {
      // 영화 목록 API 호출
      const movies = await getMovieList();
      setMovieList(movies); // 전체 영화 목록 상태 업데이트
    } catch (err) {
      console.error("영화 목록을 가져오는 중 오류 발생:", err);
      setError(
        "영화 목록을 가져오는 데 실패했습니다. 잠시 후 다시 시도해주세요."
      );
    } finally {
      setIsLoading(false); // 로딩 상태 false로 설정
    }
  };

  // 컴포넌트가 마운트될 때 인기 영화 목록을 가져오는 useEffect
  useEffect(() => {
    fetchMovies(); // 초기 영화 목록을 가져옴
  }, []); // 의존성 배열이 빈 배열이므로, 컴포넌트가 처음 렌더링될 때만 호출됨

  // 로딩 상태일 때 로딩 메시지 표시
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  // 에러 상태가 있을 때 에러 메시지 표시
  if (error) {
    return <div>{error}</div>;
  }

  // 화면에 표시되는 부분
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Layout onSearch={handleSearch} searchResults={searchResults} />
          }
        >
          <Route
            index
            element={
              <div className="movie-list">
                {/* 검색 결과가 있을 때 검색 결과 표시, 없으면 전체 영화 목록 표시 */}
                {(searchResults.length > 0 ? searchResults : movieList).map(
                  (movie) => (
                    <MovieCard key={movie.id} item={movie} /> // 영화 카드 컴포넌트 렌더링
                  )
                )}
              </div>
            }
          />
          <Route path="/details/:movieId" element={<MovieDetail />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
