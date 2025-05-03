import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuthContext } from "../../context/authContext";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseConfig";

const Navbar = () => {
  // Get user authentication state
  const { user } = getAuthContext();
  // For redirecting user
  const navigate = useNavigate();
  // sign users out
  const handleSignOut = () => {
    try {
      signOut(auth);
      navigate("/games");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.firstRow}>
        <div className={styles.logo}>
          <img src="/icons/playstation-controller.svg" alt="main logo" />
        </div>

        <div className={styles.cartHamburgerMenu}>
          {user ? (
            <button className={styles.signOutButton} onClick={handleSignOut}>
              Sign Out
            </button>
          ) : (
            <NavLink to="/sign-in" className={styles.signInLink}>
              Sign In
            </NavLink>
          )}
          {user && (
            <NavLink to="/profile" className={styles.profileButton}>
              {user.photoURL ? (
                // If user has an uploaded profile image, display it
                <img
                  src={user.photoURL}
                  alt="User Profile"
                  className={styles.profileImage}
                />
              ) : (
                // Otherwise, default to showing the FontAwesome profile icon
                <FontAwesomeIcon icon={faUser} className={styles.profileIcon} />
              )}
            </NavLink>
          )}
          <button className={styles.cartButton}>
            <FontAwesomeIcon icon={faCartPlus} className={styles.cartIcon} />
          </button>
          <button className={styles.hamburgerButton}>
            <FontAwesomeIcon
              icon={faBars}
              className={styles.hamburgerMenuIcon}
            />
          </button>
        </div>
      </div>
      <div className={`${styles.secondRow} `}>
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
