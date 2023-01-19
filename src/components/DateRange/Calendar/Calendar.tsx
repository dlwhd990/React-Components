import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { CalendarInterface, DateInterface } from "../model/interfaces";
import styles from "./Calendar.module.css";

const dayCountList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const Calendar: React.FC<CalendarInterface> = ({
  settingStartDate,
  settingEndDate,
  calendarOn,
  startDate,
  endDate,
}) => {
  const [showDate, setShowDate] = useState<DateInterface>({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });

  const [dayList, setDayList] = useState<DateInterface[]>([]);
  const [nextDayList, setNextDayList] = useState<DateInterface[]>([]);

  const makeDayList: (year: number, month: number) => DateInterface[] = (
    year,
    month
  ) => {
    const targetDate = new Date(year, month, 1);
    const result: DateInterface[] = [];

    for (let i = 0; i < targetDate.getDay(); i++) {
      result.push({ year: -i, month: -i, date: -i });
    }
    for (let i = 0; i < dayCountList[month]; i++) {
      result.push({ year, month, date: i + 1 });
    }
    if (
      month === 1 &&
      ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)
    ) {
      result.push({ year, month, date: 29 });
    }
    return result;
  };

  const changeShowDate = (direction: boolean) => {
    //direction: true면 이전, false면 다음
    if (direction) {
      if (showDate.month === 0) {
        setShowDate((state) => {
          return { year: state.year - 1, month: 11 };
        });
      } else {
        setShowDate((state) => {
          return { year: state.year, month: state.month - 1 };
        });
      }
    }

    if (!direction) {
      if (showDate.month === 11) {
        setShowDate((state) => {
          return { year: state.year + 1, month: 0 };
        });
      } else {
        setShowDate((state) => {
          return { year: state.year, month: state.month + 1 };
        });
      }
    }
  };

  const selectDateHandler = (date: DateInterface) => {
    if (date.year <= 0) return;
    if (calendarOn === "start") {
      if (
        endDate.year > 0 &&
        new Date(endDate.year, endDate.month, endDate.date).getTime() <
          new Date(date.year, date.month, date.date).getTime()
      ) {
        settingEndDate(date);
      } else {
        settingStartDate(date);
      }
    }
    if (calendarOn === "end") {
      if (
        startDate.year > 0 &&
        new Date(startDate.year, startDate.month, startDate.date).getTime() >
          new Date(date.year, date.month, date.date).getTime()
      ) {
        settingStartDate(date);
      } else {
        settingEndDate(date);
      }
    }
  };

  const makeDateClassName = (thisDate: DateInterface) => {
    const sYear = startDate.year;
    const sMonth = startDate.month;
    const sDate = startDate.date;
    const eYear = endDate.year;
    const eMonth = endDate.month;
    const eDate = endDate.date;
    const tYear = thisDate.year;
    const tMonth = thisDate.month;
    const tDate = thisDate.date;
    if (
      tYear > 0 &&
      sYear > 0 &&
      tYear === sYear &&
      tMonth === sMonth &&
      tDate === sDate
    ) {
      return `${styles.selected} ${styles.start}`;
    }
    if (
      tYear > 0 &&
      eYear > 0 &&
      tYear === eYear &&
      tMonth === eMonth &&
      tDate === eDate
    ) {
      return `${styles.selected} ${styles.end}`;
    }
    if (tYear > 0 && sYear > 0 && eYear > 0) {
      const thisTime = new Date(tYear, tMonth, tDate).getTime();
      const startTime = new Date(sYear, sMonth, sDate).getTime();
      const endTime = new Date(eYear, eMonth, eDate).getTime();
      if (thisTime > startTime && thisTime < endTime) {
        return `${styles.included}`;
      }
    }
    return `${styles.not_selected}`;
  };

  const makeCalendar = (partList: DateInterface[]) => {
    return (
      <tr className={styles.date_row}>
        {partList.map((date) => {
          return (
            <td
              className={makeDateClassName(date)}
              key={date.month.toString() + date.date?.toString()}
              onClick={() => selectDateHandler(date)}
            >
              <div className={styles.date_box}>
                {date.year <= 0 ? " " : date.date}
              </div>
            </td>
          );
        })}
      </tr>
    );
  };

  useEffect(() => {
    setDayList(makeDayList(showDate.year, showDate.month));
    if (showDate.month === 11) {
      setNextDayList(makeDayList(showDate.year + 1, 0));
    } else {
      setNextDayList(makeDayList(showDate.year, showDate.month + 1));
    }
  }, [showDate]);

  return (
    <div className={styles.calendar}>
      <FontAwesomeIcon
        icon={faAngleLeft}
        className={styles.left}
        onClick={() => changeShowDate(true)}
      />
      <FontAwesomeIcon
        icon={faAngleRight}
        className={styles.right}
        onClick={() => changeShowDate(false)}
      />
      <div className={styles.container}>
        <h2>{`${showDate.year}년 ${showDate.month + 1}월`}</h2>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.yoil}>
              <td>일</td>
              <td>월</td>
              <td>화</td>
              <td>수</td>
              <td>목</td>
              <td>금</td>
              <td>토</td>
            </tr>
            {makeCalendar(dayList.slice(0, 7))}
            {makeCalendar(dayList.slice(7, 14))}
            {makeCalendar(dayList.slice(14, 21))}
            {makeCalendar(dayList.slice(21, 28))}
            {makeCalendar(dayList.slice(28, 35))}
            {makeCalendar(dayList.slice(35, 42))}
          </tbody>
        </table>
      </div>
      <div className={styles.container}>
        <h2>
          {showDate.month === 11
            ? `${showDate.year + 1}년 1월`
            : `${showDate.year}년 ${showDate.month + 2}월`}
        </h2>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.yoil}>
              <td>일</td>
              <td>월</td>
              <td>화</td>
              <td>수</td>
              <td>목</td>
              <td>금</td>
              <td>토</td>
            </tr>
            {makeCalendar(nextDayList.slice(0, 7))}
            {makeCalendar(nextDayList.slice(7, 14))}
            {makeCalendar(nextDayList.slice(14, 21))}
            {makeCalendar(nextDayList.slice(21, 28))}
            {makeCalendar(nextDayList.slice(28, 35))}
            {makeCalendar(nextDayList.slice(35, 42))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendar;
