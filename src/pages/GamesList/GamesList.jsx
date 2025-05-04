import GameItem from "../../components/gameItem/GameItem";
import useFetchGames from "../../hooks/useFetchGames";
import styles from "./GamesList.module.css";

const GamesList = () => {
  const games = useFetchGames();
  console.log(games);

  return (
    <div className={styles.gamesWrapper}>
      {/* Sort & Filter Section */}
      <div className={styles.sortFilterContainer}>
        <div className={styles.sortContainer}>
          <select>
            <option value="">Sort By</option>
            <option value="name">Name</option>
            <option value="highestPrice">Highest Price</option>
            <option value="lowestPrice">Lowest Price</option>
            <option value="year">Year of Release</option>
            <option value="rating">Rating</option>
          </select>
        </div>
        {/* ------------------ */}
        <div className={styles.filterContainer}>
          <select>
            <option value="">Filter By</option>
            <option value="onSale">On Sale</option>
            <option value="PC">PC</option>
            <option value="PlayStation">PlayStation</option>
            <option value="Xbox">Xbox</option>
          </select>
        </div>
      </div>
      {/* Games List Section */}
      <div className={styles.gamesContainer}>
        {games.map((game) => (
          <GameItem key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default GamesList;
