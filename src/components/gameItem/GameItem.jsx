import styles from "./GameItem.module.css";
import { Link } from "react-router-dom"; // Assuming you're using React Router

const GameItem = ({ game }) => {
  return (
    <div className={styles.gameCard}>
      <div className={styles.imageContainer}>
        <img src={game.imageUrl} alt={game.name} className={styles.gameImage} />
      </div>
      <h2 className={styles.gameTitle}>{game.title}</h2>
      <p className={styles.gameGenre}>
        <b>Genre: </b>
        {game.genre}
      </p>
      <p className={styles.gameYear}>
        <b>Released: </b>
        {game.releaseYear}
      </p>
      <p className={styles.gameRating}>
        <b>Rating: </b>
        {game.rating} ★
      </p>
      <p className={styles.gamePrice}>
        <b>Price: </b>${game.price}
      </p>

      {/* Link to specific game page */}
      <Link to={`/game/:${game.id}`} className={styles.gameLink}>
        View Details
      </Link>

      {/* Add to cart button */}
      <button className={styles.addToCartBtn}>Add to Cart</button>
    </div>
  );
};

export default GameItem;
