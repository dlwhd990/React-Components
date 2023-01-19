import React from "react";
import "./App.css";
import DateRange from "./components/DateRange/DateRange";

function App() {
  const itemList = [
    "서울",
    "경기",
    "인천",
    "강원",
    "대전",
    "대구",
    "광주",
    "부산",
    "충남",
    "충북",
    "경남",
    "경북",
    "전남",
    "전북",
    "제주",
  ];
  return (
    <div className="App">
      <DateRange itemList={itemList} />
    </div>
  );
}

export default App;
