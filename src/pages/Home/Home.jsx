import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <section className={styles.hero}>
      <header className={styles.heroContent}>
        <h1 className={styles.heroTitle}>Game Horizon</h1>
        <p className={styles.heroSubtitle}>
          Game Horizon - Where Every Adventrue Begins - Your portal to Infinite
          Gaming Worlds. Play beyond Limits.
        </p>
        <Link
          to={"/games"}
          className={styles.ctaButton}
          aria-label="Explore available games"
        >
          Explore Games
        </Link>
      </header>
    </section>
  );
};

export default Home;
