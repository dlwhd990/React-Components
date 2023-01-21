import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Carousel from "./components/Carousel/Carousel";
import DateRange from "./components/DateRange/DateRange";
import { ResultInterface } from "./components/DateRange/model/interfaces";
import MainPage from "./components/MainPage/MainPage";

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

  const dateRangeCallBack = (result: ResultInterface) => {
    console.log("콜백함수로 선택 결과 데이터 사용 가능 (추상화)");
    console.log(result);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/daterange"
          element={
            <DateRange
              itemList={itemList}
              itemTitle="렌터카"
              callBack={dateRangeCallBack}
            />
          }
        />
        <Route path="carousel" element={<Carousel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
