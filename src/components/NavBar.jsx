import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { useDebounce } from "../hooks/useDebounce";

const Navbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태

  // debouncedSearchQuery -> debouncing 된 검색어 값
  const debouncedSearchQuery = useDebounce(searchQuery, 500); // 500ms 후에 값 업데이트 ->

  // 입력된 검색어가 바뀌면 상태 업데이트
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // 검색어를 상태에 반영
  };

  // debounced 값이 변경되면 onSearch 함수 호출
  useEffect(() => {
    if (debouncedSearchQuery) {
      if (typeof onSearch === "function") {
        onSearch(debouncedSearchQuery); // 디바운싱된 검색어로 API 호출
      } else {
        console.error("onSearch is not a function");
      }
    }
  }, [debouncedSearchQuery, onSearch]); // debouncedSearchQuery가 변경될 때마다 onSearch 호출

  return (
    <header>
      <nav className="navbar">
        <div className="nav-logo" onClick={() => "location.href='/'"}>
          OZMOVIE
        </div>
        <div className="nav-search">
          {/* 검색창 추가 */}
          <input
            type="text"
            placeholder="영화를 검색하세요..."
            value={searchQuery}
            onChange={handleSearchChange} // 검색어 입력 시 상태 업데이트
          />
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
