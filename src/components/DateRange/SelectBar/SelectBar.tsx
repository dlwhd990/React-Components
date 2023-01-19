import styles from "./SelectBar.module.css";

interface SelectBarInterface {
  onDateSelectClickHandler: (query: string) => void;
  onItemSelectClickHandler: () => void;
  calendarOn: string;
  itemSelectOn: boolean;
  selectedItem: string;
}

const SelectBar: React.FC<SelectBarInterface> = ({
  onDateSelectClickHandler,
  onItemSelectClickHandler,
  calendarOn,
  itemSelectOn,
  selectedItem,
}) => {
  return (
    <div
      className={`${styles.select_bar} ${
        calendarOn !== "" || itemSelectOn
          ? `${styles.calendar_on}`
          : `${styles.calendar_off}`
      }`}
    >
      <div
        className={`${styles.item_select} ${
          itemSelectOn ? `${styles.select_on}` : `${styles.select_off}`
        }`}
        onClick={onItemSelectClickHandler}
      >
        <p className={styles.title}>지역</p>
        <p className={styles.value}>{selectedItem || "지역 선택"}</p>
      </div>
      <div
        className={`${styles.start} ${
          calendarOn === "start"
            ? `${styles.select_on}`
            : `${styles.select_off}`
        }`}
        onClick={() => onDateSelectClickHandler("start")}
      >
        <p className={styles.title}>시작일</p>
        <p className={styles.value}>날짜 입력</p>
      </div>
      <div
        className={`${styles.end} ${
          calendarOn === "end" ? `${styles.select_on}` : `${styles.select_off}`
        }`}
        onClick={() => onDateSelectClickHandler("end")}
      >
        <p className={styles.title}>종료일</p>
        <p className={styles.value}>날짜 입력</p>
      </div>
      <button className={styles.confirm_button}></button>
    </div>
  );
};

export default SelectBar;
