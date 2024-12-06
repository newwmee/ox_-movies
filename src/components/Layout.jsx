import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = () => (
  <>
    <NavBar />
    <main>
      <Outlet />
    </main>
  </>
);
export default Layout;
