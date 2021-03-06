import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import "./navbar.css";

export default function Navbar() {
  const { user } = useAppSelector((state) => state.session);
  const { pathname } = useLocation();
  return (
    <nav className="navbar">
      <Link
        to="/"
        className={`navbar__buttons ${
          pathname === "/" ? "navbar__button__active" : ""
        }`}
      >
        <i className="fas fa-home navbar__buttons__icons"></i>
        <div className="navbar__buttons__text">Home</div>
      </Link>
      <Link
        to="/explore"
        className={`navbar__buttons ${
          pathname === "/explore" ? "navbar__button__active" : ""
        }`}
      >
        <i className="fas fa-hashtag navbar__buttons__icons"></i>
        <div className="navbar__buttons__text">Explore</div>
      </Link>
      {user && (
        <Link
          to="/profile"
          className={`navbar__buttons ${
            pathname === "/profile" ? "navbar__button__active" : ""
          }`}
        >
          <i className="fas fa-user navbar__buttons__icons"></i>
          <div className="navbar__buttons__text">Profile</div>
        </Link>
      )}
    </nav>
  );
}
