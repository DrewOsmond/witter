import { Link, useLocation } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <div className="navbar">
      <Link
        to="/"
        className={`navbar__buttons ${
          pathname === "/" ? "navbar__button__active" : ""
        }`}
      >
        Home
      </Link>
      <Link
        to="/explore"
        className={`navbar__buttons ${
          pathname === "/explore" ? "navbar__button__active" : ""
        }`}
      >
        Explore
      </Link>

      <Link
        to="/profile"
        className={`navbar__buttons ${
          pathname === "/profile" ? "navbar__button__active" : ""
        }`}
      >
        Profile
      </Link>
    </div>
  );
}
