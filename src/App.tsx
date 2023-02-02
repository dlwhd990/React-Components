import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Carousel from "./components/Carousel/Carousel";
import DateRange from "./components/DateRange/DateRange";
import { ResultInterface } from "./components/DateRange/model/interfaces";
import InfinityScroll from "./components/InfinityScroll/InfinityScroll";
import MainPage from "./components/MainPage/MainPage";
import imageList from "./imageList";
import InfinityTemp from "./model/infinityTemp";

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
  const [itemPage, setItemPage] = useState(1);

  const [infList, setInfList] = useState<InfinityTemp[]>([]);

  const dateRangeCallBack = (result: ResultInterface) => {
    console.log("콜백함수로 선택 결과 데이터 사용 가능 (추상화)");
    console.log(result);
  };

  useEffect(() => {
    const loadFirstData = async () => {
      const newList: InfinityTemp[] = [];
      const response = await fetch(
        `https://acnhapi.com/v1/villagers/${itemPage}`
      );
      const body = await response.json();
      for (let i = 0; i < 5; i++) {
        newList.push(body);
      }
      setInfList((state) => state.concat(newList));
    };

    loadFirstData();
  }, [itemPage]);

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
        <Route
          path="carousel"
          element={
            <Carousel
              imageList={imageList}
              imageWidth={400}
              imageMargin={1}
              imageHeight={200}
              arrowPosition={0}
              arrowSize={14}
              arrowButtonSize={30}
              showDot={true}
              arrowShowType="none"
              sideWidth={200}
              translateX={0}
            />
          }
        />
        <Route
          path="/infinityscroll"
          element={
            <InfinityScroll
              callback={() => {
                setItemPage((state) => state + 1);
              }}
            >
              {infList.map((item) => (
                <div key={item.id} className="villager_item">
                  <img src={item.icon_uri} alt="villager_icon" />
                  <div className="villager_data">
                    <p>{`${item.name["name-KRko"]} | ${item.gender}`}</p>
                    <p>{item["birthday-string"]}</p>
                    <p>{item.personality}</p>
                  </div>
                </div>
              ))}
            </InfinityScroll>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// carouselWidth={"100%"}
// imageWidth={375}
// imageMargin={1}
// imageHeight={180}
// sideWidth={200}
// translateX={175}
// arrowShowType="hover"
// arrowSize={17}
// arrowButtonSize={40}
// dotSize={10}
// autoPlay={true}
// autoPlayDelay={2000}
