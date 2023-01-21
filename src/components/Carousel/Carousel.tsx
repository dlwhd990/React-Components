import { useState } from "react";
import styles from "./Carousel.module.css";
import { CarouselProps } from "./interface";

// 양 옆에 조그맣게 보일 사이즈(width) + 메인 사이즈(width+height) + 카드 간격 (margin)
// + 이동 속도(duration) + 자동 재생 여부 (+ 간격 시간)

let clicked = false;

const Carousel: React.FC<CarouselProps> = ({
  imageList,
  duration,
  imageWidth,
  imageMargin,
  imageHeight,
  sideWidth,
}) => {
  imageList = imageList
    .slice(imageList.length - 2)
    .concat(imageList)
    .concat(imageList.slice(0, 2));

  imageList = imageList.map((image, index) => {
    return { ...image, id: index };
  });

  const [idx, setIdx] = useState(2);
  const [transitionOn, setTransitionOn] = useState(true);

  const makeClickedFalse = () => {
    setTimeout(() => {
      clicked = false;
    }, duration + 150);
  };

  const moveWithoutTransition = (position: number) => {
    setTimeout(() => {
      setTransitionOn(false);
      setIdx(position);
    }, duration + 100);
    setTimeout(() => {
      setTransitionOn(true);
    }, duration + 150);
  };

  const nextHandler = () => {
    if (clicked) return;
    clicked = true;
    if (idx === imageList.length - 3) {
      setIdx(imageList.length - 2);
      moveWithoutTransition(2);
    } else {
      setIdx((state) => state + 1);
    }
    makeClickedFalse();
  };

  const prevHandler = () => {
    if (clicked) return;
    clicked = true;
    if (idx === 2) {
      setIdx(1);
      moveWithoutTransition(imageList.length - 3);
    } else {
      setIdx((state) => state - 1);
    }
    makeClickedFalse();
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.carousel}
        style={{ width: `${imageWidth + imageMargin * 2 + sideWidth * 2}px` }}
      >
        <div
          className={styles.carousel_list}
          style={{
            transition: `${
              transitionOn ? `${duration}ms all ease-in-out` : "0ms"
            }`,
            transform: `translate3d(${
              -(imageWidth + imageMargin * 2) * idx
            }px,0,0)`,
          }}
        >
          {imageList.map((image) => (
            <img
              key={image.id}
              src={image.src}
              alt={image.alt}
              style={{
                width: `${imageWidth}px`,
                height: `${imageHeight}px`,
                transform: `translateX(${sideWidth + imageMargin}px)`,
              }}
            />
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
