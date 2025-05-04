import Filter from "../../components/Filter/Filter";
import GameItem from "../../components/gameItem/GameItem";
import Sort from "../../components/Sort/Sort";
import useFetchGames from "../../hooks/useFetchGames";
import styles from "./GamesList.module.css";

const GamesList = () => {
  const games = useFetchGames();
  console.log(games);

  return (
    <div className={styles.gamesWrapper}>
      {/* Sort & Filter Section */}
      <div className={styles.sortFilterContainer}>
        <Sort />

        {/* ------------------ */}

        <Filter />
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
