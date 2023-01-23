import styles from "./ItemSelectList.module.css";

interface ItemSelectListInterface {
  itemList: string[];
  itemSelectOn: boolean;
  selectItem: (item: string) => void;
}

const ItemSelectList: React.FC<ItemSelectListInterface> = ({
  itemList,
  itemSelectOn,
  selectItem,
}) => {
  return (
    <ul
      className={`${styles.list} ${
        itemSelectOn ? `${styles.on}` : `${styles.off}`
      }`}
    >
      {itemList.map((item) => (
        <li key={item} className={styles.item} onClick={() => selectItem(item)}>
          {item}
        </li>
      ))}
    </ul>
  );
};

export default ItemSelectList;
