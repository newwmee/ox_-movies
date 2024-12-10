import React, { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import "./Navbar.css";

const Navbar = ({ onSearch, searchResults }) => {
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
  const debouncedSearchQuery = useDebounce(searchQuery, 500); // 디바운싱된 검색어 값

  // 검색어 변경 처리
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // 검색어 상태 업데이트
  };

  // 엔터 키를 누를 때 검색 실행
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && debouncedSearchQuery) {
      onSearch(debouncedSearchQuery); // 검색 실행
    }
  };

  // 초기 렌더링 후 결과 리스트가 있으면 검색어 유지
  useEffect(() => {
    // debouncedSearchQuery가 변경되었을 때는 자동으로 검색하지 않도록 함
    if (!debouncedSearchQuery) return; // 검색어가 없으면 실행하지 않음
  }, [debouncedSearchQuery]); // 검색어가 변경될 때마다 실행

  return (
    <header>
      <nav className="navbar">
        <div className="nav-logo" onClick={() => (window.location.href = "/")}>
          OZMOVIE
        </div>
        <div className="nav-search">
          <input
            type="text"
            placeholder="영화를 검색하세요..."
            value={searchQuery}
            onChange={handleSearchChange} // 검색어 입력 시 상태 업데이트
            onKeyDown={handleKeyDown} // 엔터 키로 검색 실행
          />
          <div
            className={`navbar__results ${
              searchResults.length > 0 ? "active" : ""
            }`}
          >
            {searchResults.map((movie) => (
              <div key={movie.id} className="navbar__result-item">
                {movie.title}
              </div>
            ))}
          </div>
        </div>
        <div className="nav-button">
          <button>로그인</button>
          <button>회원가입</button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
