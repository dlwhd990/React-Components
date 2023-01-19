import { useState } from "react";
import Calendar from "./Calendar/Calendar";
import styles from "./DateRange.module.css";
import ItemSelectList from "./ItemSelectList/ItemSelectList";
import SelectBar from "./SelectBar/SelectBar";

interface DateRangeInterface {
  itemList: string[];
}

const DateRange: React.FC<DateRangeInterface> = ({ itemList }) => {
  // 시작일, 마감일 중 어떤 것을 선택 중인지 (어떤 것에 의해 캘린더가 열렸는지)
  const [calendarOn, setCalendarOn] = useState("");
  const [itemSelectOn, setItemSelectOn] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const onDateSelectClickHandler = (query: string) => {
    // 동일한 date select 두번 연속 눌리면 캘린더가 사라지도록
    setItemSelectOn(false);
    if (calendarOn === query) {
      setCalendarOn("");
    } else {
      setCalendarOn(query);
    }
  };

  const onItemSelectClickHandler = () => {
    if (!itemSelectOn) setCalendarOn("");
    setItemSelectOn((state) => !state);
  };

  const selectItem = (item: string) => {
    setSelectedItem(item);
    setItemSelectOn(false);
  };

  return (
    <div className={styles.date_range}>
      <SelectBar
        calendarOn={calendarOn}
        itemSelectOn={itemSelectOn}
        onDateSelectClickHandler={onDateSelectClickHandler}
        onItemSelectClickHandler={onItemSelectClickHandler}
        selectedItem={selectedItem}
      />
      {calendarOn && <Calendar />}
      {itemSelectOn && (
        <ItemSelectList itemList={itemList} selectItem={selectItem} />
      )}
    </div>
  );
};

export default DateRange;
