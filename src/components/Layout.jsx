import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";

const Layout = ({ onSearch, searchResults }) => {
  return (
    <>
      <Navbar onSearch={onSearch} searchResults={searchResults} />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
