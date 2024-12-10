import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";

const Layout = ({ onSearch, searchResults = [] }) => (
  <>
    <Navbar onSearch={onSearch} searchResults={searchResults} />
    <main>
      <Outlet />
    </main>
  </>
);
export default Layout;
