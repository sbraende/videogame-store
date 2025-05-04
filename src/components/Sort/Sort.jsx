import styles from "./Sort.module.css";

const Sort = () => {
  return (
    <>
      <select className={styles.sort}>
        <option value="">Sort By</option>
        <option value="name">Name</option>
        <option value="highestPrice">Highest Price</option>
        <option value="lowestPrice">Lowest Price</option>
        <option value="year">Year of Release</option>
        <option value="rating">Rating</option>
      </select>
    </>
  );
};

export default Sort;
