import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { getAuthContex } from "../../context/authContex.jsx";
import { Link, NavLink } from "react-router-dom";
import Button from "../Button/Button.jsx";

const Navbar = () => {
  const { user } = getAuthContex();

  return (
    <nav className={styles.navbar}>
      {/* First row */}
      <div className={styles.firstRow}>
        <div className={styles.logo}>
          <img
            src="/icons/playstation-controller.svg"
            alt="Playstation-controller logo"
          />
        </div>
        {/* --- */}
        <div className={styles.cartHamburgerMenu}>
          {user ? (
            <Button className={styles.signOutButton}>Sign Out</Button>
          ) : (
            <Link className={styles.signInLink} to="/sign-in">
              Sign In
            </Link>
          )}
          {user && (
            <Link className={styles.profileButton} to="/profile">
              {user.imageUrl ? (
                <img src={user.imageUrl} alt="User profile picture" />
              ) : (
                <FontAwesomeIcon icon={faUser} className={styles.profileIcon} />
              )}
            </Link>
          )}
          <Link className={styles.cartButton}>
            {" "}
            <FontAwesomeIcon icon={faCartPlus} className={styles.cartIcon} />
          </Link>

          <Button className={styles.hamburgerButton}>
            <FontAwesomeIcon
              icon={faBars}
              className={styles.hamburgerMenuIcon}
            />
          </Button>
        </div>
      </div>
      {/* ----- */}
      <div className={styles.secondRow}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/games"
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
        >
          Games
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
        >
          Contact
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
