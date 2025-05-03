import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsHamburgerMenuOpen((prev) => !prev);
  };
  return (
    <nav className={styles.navbar}>
      <div className={styles.firstRow}>
        <div className={styles.logo}>
          <img src="/icons/playstation-controller.svg" alt="main logo" />
        </div>
        <div className={styles.cartHamburgerMenu}>
          <button className={styles.profileButton}>
            <FontAwesomeIcon icon={faUser} className={styles.profileIcon} />
          </button>
          <button className={styles.cartButton}>
            <FontAwesomeIcon icon={faCartPlus} className={styles.cartIcon} />
          </button>
          <button className={styles.hamburgerButton} onClick={handleMenuToggle}>
            <FontAwesomeIcon
              icon={faBars}
              className={styles.hamburgerMenuIcon}
            />
          </button>
        </div>
      </div>
      <div className={`${styles.secondRow} `}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/games">Games</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
