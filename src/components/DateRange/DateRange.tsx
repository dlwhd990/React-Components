import { useState } from "react";
import Calendar from "./Calendar/Calendar";
import styles from "./DateRange.module.css";
import ItemSelectList from "./ItemSelectList/ItemSelectList";
import {
  DateInterface,
  DateRangeInterface,
  ResultInterface,
} from "./model/interfaces";
import SelectBar from "./SelectBar/SelectBar";

const defaultDate = {
  year: -1,
  month: -1,
  date: -1,
  day: -1,
};

const DateRange: React.FC<DateRangeInterface> = ({ itemList, callBack }) => {
  // 시작일, 마감일 중 어떤 것을 선택 중인지 (어떤 것에 의해 캘린더가 열렸는지)
  const [calendarOn, setCalendarOn] = useState("");
  const [itemSelectOn, setItemSelectOn] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [startDate, setStartDate] = useState<DateInterface>(defaultDate);
  const [endDate, setEndDate] = useState<DateInterface>(defaultDate);

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

  const settingStartDate = (date: DateInterface) => {
    setStartDate(date);
    setCalendarOn("end");
  };

  const settingEndDate = (date: DateInterface) => {
    setEndDate(date);
    if (startDate.year <= 0) setCalendarOn("start");
  };

  const showSelectedDateRange = () => {
    if (selectedItem === "" || startDate.year <= 0 || endDate.year <= 0) {
      alert("모든 조건을 입력해주세요");
      return;
    }
    const result: ResultInterface = {
      item: selectedItem,
      start: startDate,
      end: endDate,
    };
    callBack(result);
  };

  return (
    <div className={styles.date_range}>
      <SelectBar
        calendarOn={calendarOn}
        itemSelectOn={itemSelectOn}
        onDateSelectClickHandler={onDateSelectClickHandler}
        onItemSelectClickHandler={onItemSelectClickHandler}
        selectedItem={selectedItem}
        startDate={startDate}
        endDate={endDate}
        callBack={showSelectedDateRange}
      />
      {calendarOn && (
        <Calendar
          calendarOn={calendarOn}
          settingStartDate={settingStartDate}
          settingEndDate={settingEndDate}
          startDate={startDate}
          endDate={endDate}
        />
      )}
      {itemSelectOn && (
        <ItemSelectList itemList={itemList} selectItem={selectItem} />
      )}
    </div>
  );
};

export default DateRange;
