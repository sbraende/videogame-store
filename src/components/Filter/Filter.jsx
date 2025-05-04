import styles from "./Filter.module.css";

const Filter = () => {
  return (
    <>
      <select className={styles.filter}>
        <option value="">Filter By</option>
        <option value="onSale">On Sale</option>
        <option value="PC">PC</option>
        <option value="PlayStation">PlayStation</option>
        <option value="Xbox">Xbox</option>
      </select>
    </>
  );
};

export default Filter;
