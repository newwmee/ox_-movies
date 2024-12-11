import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";
import defaultProfile from "../assets/default-profile.png";
import "./NavBar.css";

const NavBar = ({ onSearch }) => {
  const navigate = useNavigate();
  const { user, logout } = useSupabaseAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // 로고 클릭 핸들러
  const handleLogoClick = (e) => {
    e.preventDefault();
    navigate("/");
    window.location.reload();
  };

  // 검색 핸들러
  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  // 로그아웃 핸들러
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo" onClick={handleLogoClick}>
        OZMOVIE
      </Link>
      <div className="nav-search">
        <form onSubmit={handleSearch}>
          {" "}
          {/* handleSubmit을 handleSearch로 변경 */}
          <input
            type="text"
            placeholder="영화 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>
      <div className="nav-auth">
        {user ? (
          <div className="profile-container">
            <div
              className="profile-thumbnail"
              onClick={() => setShowDropdown(!showDropdown)}
              onMouseEnter={() => setShowDropdown(true)}
            >
              <img src={defaultProfile} alt="프로필" />
            </div>
            {showDropdown && (
              <div
                className="profile-dropdown"
                onMouseLeave={() => setShowDropdown(false)}
              >
                <button onClick={() => navigate("/mypage")}>마이 페이지</button>
                <button onClick={handleLogout}>로그아웃</button>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-buttons">
            <button className="login-btn" onClick={() => navigate("/login")}>
              로그인
            </button>
            <button className="signup-btn" onClick={() => navigate("/signup")}>
              회원가입
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
