import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SelectBarInterface } from "../model/interfaces";
import styles from "./SelectBar.module.css";

const SelectBar: React.FC<SelectBarInterface> = ({
  onDateSelectClickHandler,
  onItemSelectClickHandler,
  callBack,
  calendarOn,
  itemSelectOn,
  selectedItem,
  startDate,
  endDate,
  itemTitle,
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
        <p className={styles.title}>{itemTitle}</p>
        <p className={styles.value}>{selectedItem || `${itemTitle} 선택`}</p>
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
        <p className={styles.value}>
          {startDate.year > 0
            ? `${startDate.month + 1}월 ${startDate.date}일`
            : "날짜 입력"}
        </p>
      </div>
      <div
        className={`${styles.end} ${
          calendarOn === "end" ? `${styles.select_on}` : `${styles.select_off}`
        }`}
        onClick={() => onDateSelectClickHandler("end")}
      >
        <p className={styles.title}>종료일</p>
        <p className={styles.value}>
          {endDate.year > 0
            ? `${endDate.month + 1}월 ${endDate.date}일`
            : "날짜 입력"}
        </p>
      </div>
      <button className={styles.confirm_button} onClick={callBack}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
};

export default SelectBar;
