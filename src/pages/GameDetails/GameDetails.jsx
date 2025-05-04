import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import styles from "./GameDetails.module.css";
import { database } from "../../../firebaseConfig";

const GameDetails = () => {
  const { id } = useParams(); // Extract the game ID from URL
  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const gameRef = doc(database, "games", id);
        const gameSnap = await getDoc(gameRef);

        if (gameSnap.exists()) {
          setGame(gameSnap.data());
        } else {
          console.error("Game not found!");
        }
      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    };

    fetchGameDetails();
  }, [id]);
  const availablePlatforms = game?.platforms
    ? Object.keys(game.platforms).filter(
        (platform) => game?.platforms[platform]
      )
    : [];
  return (
    <div className={styles.wrapper}>
      <div className={styles.gameDetailsContainer}>
        <div className={styles.gameDescriptionContainer}>
          <h1 className={styles.gameTitle}>{game?.title}</h1>
          <p>
            <strong>Genre:</strong> {game?.genre}
          </p>
          <p>
            <strong>Release Year:</strong> {game?.releaseYear}
          </p>
          <p>
            <strong>Producer:</strong> {game?.releasedBy}
          </p>
          <p>
            <strong>Rating:</strong> {game?.rating} ★
          </p>
          <p>
            <strong>Price:</strong> ${game?.price}
          </p>
          <p>
            <strong>Available platforms::</strong>
            {availablePlatforms?.join(",")}
          </p>
          <p>
            <strong>Overview :</strong>
            {game?.overview}
          </p>
          <button className={styles.addToCartBtn}>Add to Cart</button>
        </div>
        <div className={styles.gameImageContainer}>
          <img
            src={game?.imageUrl}
            alt={game?.title}
            className={styles.gameImage}
          />
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
