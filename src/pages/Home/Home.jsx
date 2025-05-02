import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>Game Horizon</h1>
        <p className={styles.heroSubtitle}>
          Game Horizon—Where Every Adventure Begins. Your Portal to Infinite
          Gaming Worlds. Play Beyond Limits.
        </p>
        <Link to="/games" className={styles.ctaButton}>
          Explore Games
        </Link>
      </div>
    </section>
  );
};

export default Home;
