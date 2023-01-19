const nowDate = new Date();
const [now, setNow] = useState({
  year: nowDate.getFullYear(),
  month: nowDate.getMonth(),
  date: nowDate.getDate(),
  day: nowDate.getDay(),
});
const [dayList, setDayList] = useState<string[]>([]);
const [nextDayList, setNextDayList] = useState<string[]>([]);

const { year, month, date, day } = now;

const makeDayList: (
  year: number,
  month: number,
  date: number,
  day: number
) => string[] = (year, month, date, day) => {
  const dayList: string[] = [];
  const dayDist = (date - 1) % 7;
  const firstDay = day - dayDist > 0 ? day - dayDist : 7 + (day - dayDist);
  for (let i = 0; i < firstDay; i++) {
    dayList.push(" ");
  }
  for (let i = 0; i < dayCountList[month]; i++) {
    dayList.push((i + 1).toString());
  }
  if (
    month === 1 &&
    ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)
  ) {
    dayList.push("29");
  }
  return dayList;
};

const makeCalendar = (partList: string[]) => {
  return (
    <tr>
      {partList.map((day, idx) => {
        return <td key={idx}>{day}</td>;
      })}
    </tr>
  );
};

// const dayList = makeDayList(year, month, date, day);
// let nextMonthDayList = makeDayList(year,month,date,day);

useEffect(() => {
  setDayList(makeDayList(year, month, date, day));
  if (month === 11) {
    setNextDayList(makeDayList(year + 1, 0, date, day));
  }
  if (month !== 11) {
  }
}, [year, month, date, day]);
