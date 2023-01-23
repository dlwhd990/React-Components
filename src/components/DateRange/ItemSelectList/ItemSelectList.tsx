import styles from "./ItemSelectList.module.css";

interface ItemSelectListInterface {
  itemList: string[];
  selectItem: (item: string) => void;
}

const ItemSelectList: React.FC<ItemSelectListInterface> = ({
  itemList,
  selectItem,
}) => {
  return (
    <ul className={styles.list}>
      {itemList.map((item) => (
        <li key={item} className={styles.item} onClick={() => selectItem(item)}>
          {item}
        </li>
      ))}
    </ul>
  );
};

export default ItemSelectList;
