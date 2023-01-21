import { useState } from "react";
import styles from "./Carousel.module.css";

let imageList = [
  {
    id: 0,
    src: "https://i.ytimg.com/vi/cfNeAKdhHd0/maxresdefault.jpg",
  },
  {
    id: 1,
    src: "https://res.cloudinary.com/dkcii4rqf/image/upload/v1674026982/cardstudy4_g3row0.jpg",
  },
  {
    id: 2,
    src: "https://res.cloudinary.com/dkcii4rqf/image/upload/v1673965375/js_iqzx1r.png",
  },
];

imageList = imageList
  .slice(imageList.length - 2)
  .concat(imageList)
  .concat(imageList.slice(0, 2));

// 양 옆에 조그맣게 보일 사이즈(width) + 메인 사이즈(width+height) + 카드 간격 (margin)
// + 이동 속도(duration) + 자동 재생 여부 (+ 간격 시간)
const Carousel = () => {
  const [idx, setIdx] = useState(2);
  const [transitionOn, setTransitionOn] = useState(true);

  const moveWithoutTransition = (position: number) => {
    setTimeout(() => {
      setTransitionOn(false);
      setIdx(position);
    }, 400);
    setTimeout(() => {
      setTransitionOn(true);
    }, 450);
  };

  const nextHandler = () => {
    if (idx === imageList.length - 3) {
      setIdx(imageList.length - 2);
      moveWithoutTransition(2);
    } else {
      setIdx((state) => state + 1);
    }
  };

  const prevHandler = () => {
    if (idx === 2) {
      setIdx(1);
      moveWithoutTransition(imageList.length - 3);
    } else {
      setIdx((state) => state - 1);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.carousel}>
        <div
          className={styles.carousel_list}
          style={{
            transition: `${transitionOn ? "300ms all ease-in-out" : "0ms"}`,
            transform: `translate3d(${-730 * idx}px,0,0)`,
          }}
        >
          {imageList.map((image) => (
            <img key={image.id} src={image.src} alt="imag" />
          ))}
        </div>
        <div className={styles.button_box}>
          <button onClick={prevHandler}>이전</button>
          <button onClick={nextHandler}>다음</button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
