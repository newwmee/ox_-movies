import React from "react";
import "./Navvar.css/";
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">OZMOVIE</div>
      <div className="navbar-button">
        <button>로그인</button>
        <button>회원가입</button>
      </div>
    </nav>
  );
};
export default Navbar;
