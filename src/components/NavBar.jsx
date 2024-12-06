import React from "react";
import "./Navbar.css/";
const Navbar = () => {
  return (
    <header>
      <nav className="navbar">
        <div className="nav-logo">OZMOVIE</div>
        <div className="nav-button">
          <button>로그인</button>
          <button>회원가입</button>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
