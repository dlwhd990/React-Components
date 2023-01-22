import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import styles from "./Carousel.module.css";
import { CarouselProps } from "./interface";

// 1. 반응형 (분기? 강제?)
// 2. 드래그 (addEventListener)V
// 3. 자동재생 (따로 함수 만들어 적용)V

let clicked = false;
let timer: ReturnType<typeof setTimeout>;

const Carousel: React.FC<CarouselProps> = ({
  imageList,
  duration,
  imageWidth,
  imageMargin,
  imageHeight,
  sideWidth,
  translateX,
  arrowShowType,
  arrowLeftIcon,
  arrowRightIcon,
  arrowSize,
  arrowButtonSize,
  arrowButtonBackGroundColor,
  dotSize,
  autoPlay,
  autoPlayDelay,
}) => {
  imageList = imageList
    .slice(imageList.length - 2)
    .concat(imageList)
    .concat(imageList.slice(0, 2));

  imageList = imageList.map((image, index) => {
    return { ...image, id: index };
  });
  const [idx, setIdx] = useState(2);
  const [dragTrans, setDragTrans] = useState(0);
  const [translateValue, setTranslateValue] = useState(
    -(imageWidth + imageMargin * 2) * 2
  );
  const [transitionOn, setTransitionOn] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

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
    clearTimeout(timer);
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
    clearTimeout(timer);
    clicked = true;
    if (idx === 2) {
      setIdx(1);
      moveWithoutTransition(imageList.length - 3);
    } else {
      setIdx((state) => state - 1);
    }
    makeClickedFalse();
  };

  const clickDotHandler = (index: number) => {
    setIdx(index);
  };

  const makeDot = () => {
    const dotList = [];
    dotList.push(
      imageList.slice(2, imageList.length - 2).map((image) => (
        <div
          key={image.id}
          style={{
            backgroundColor: `${idx === image.id ? "#2c3e50" : "#687074"}`,
            width: `${dotSize}px`,
            height: `${dotSize}px`,
          }}
          onClick={() => clickDotHandler(image.id)}
        ></div>
      ))
    );
    return dotList;
  };

  const setAutoPlay = () => {
    timer = setTimeout(() => {
      nextHandler();
    }, autoPlayDelay);
  };

  useEffect(() => {
    setTranslateValue(-(imageWidth + imageMargin * 2) * idx);
    clearTimeout(timer);
    if (autoPlay) {
      setAutoPlay();
    }
  }, [idx, imageWidth, imageMargin, autoPlay]);

  return (
    <div className={styles.container}>
      <div
        className={styles.carousel}
        style={{ width: `${imageWidth + imageMargin * 4 + sideWidth * 2}px` }}
      >
        <div
          className={styles.carousel_list}
          onMouseDown={(downEvent: React.MouseEvent) => {
            clearTimeout(timer);
            setTransitionOn(false);
            const onMouseMove: any = (moveEvent: React.MouseEvent) => {
              if (Math.abs(moveEvent.screenX - downEvent.screenX) > 10) {
                setIsDragging(true);
              }
              setDragTrans(moveEvent.screenX - downEvent.screenX);
              if (translateValue + dragTrans >= 0) {
                document.removeEventListener("mousemove", onMouseMove);
              }
            };

            const onMouseUp: any = (upEvent: React.MouseEvent) => {
              console.log("MOUSE UP!!");
              if (upEvent.screenX - downEvent.screenX >= 100) {
                prevHandler();
              }
              if (downEvent.screenX - upEvent.screenX >= 100) {
                nextHandler();
              }
              setDragTrans(0);
              document.removeEventListener("mousemove", onMouseMove);
              setTransitionOn(true);
              setAutoPlay();
              setTimeout(() => {
                console.log("SET ISDRAGGING!");
                setIsDragging(false);
              }, 0);
              console.log("END OF MOUSE UP!!");
            };

            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp, { once: true });
          }}
          // 모바일 터치 대응
          onTouchStart={(downEvent: React.TouchEvent) => {
            clearTimeout(timer);
            setTransitionOn(false);

            const downTouchX = downEvent.touches[0].screenX;
            let lastPosition = downTouchX;
            const onTouchMove: any = (moveEvent: React.TouchEvent) => {
              lastPosition = moveEvent.touches[0].screenX;
              if (Math.abs(lastPosition - downTouchX) > 10) {
                setIsDragging(true);
              }
              setDragTrans(lastPosition - downTouchX);
              if (translateValue + dragTrans >= 0) {
                document.removeEventListener("touchmove", onTouchMove);
              }
            };

            const onTouchEnd: any = () => {
              if (lastPosition - downTouchX >= 100) {
                prevHandler();
              }
              if (downTouchX - lastPosition >= 100) {
                nextHandler();
              }
              setDragTrans(0);
              document.removeEventListener("touchmove", onTouchMove);
              setTransitionOn(true);
              setAutoPlay();
              setTimeout(() => {
                setIsDragging(false);
              }, 0);
            };

            document.addEventListener("touchmove", onTouchMove);
            document.addEventListener("touchend", onTouchEnd, { once: true });
          }}
          style={{
            transition: `${
              transitionOn ? `${duration}ms all ease-in-out` : "0ms"
            }`,
            transform: `translate3d(${translateValue + dragTrans}px,0,0)`,
          }}
        >
          {imageList.map((image) => (
            <a
              key={image.id}
              href={image.href}
              onClick={(e: React.MouseEvent) => {
                console.log("A TAG CLICKED");
                if (isDragging) e.preventDefault();
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                style={{
                  width: `${imageWidth}px`,
                  height: `${imageHeight}px`,
                  transform: `translateX(${
                    sideWidth + imageMargin + translateX
                  }px)`,
                  margin: `0px ${imageMargin}px`,
                }}
              />
            </a>
          ))}
        </div>
        <div className={styles.button_box}>
          <button
            onClick={prevHandler}
            className={`${styles.prev} ${
              arrowShowType === "static" && `${styles.arrow_static}`
            } ${arrowShowType === "hover" && `${styles.arrow_hover}`}`}
            style={{
              width: `${arrowButtonSize}px`,
              height: `${arrowButtonSize}px`,
              fontSize: `${arrowSize}px`,
              backgroundColor: arrowButtonBackGroundColor,
            }}
          >
            <FontAwesomeIcon icon={arrowLeftIcon || faAngleLeft} />
          </button>
          <button
            onClick={nextHandler}
            className={`${styles.next} ${
              arrowShowType === "static" && `${styles.arrow_static}`
            } ${arrowShowType === "hover" && `${styles.arrow_hover}`}`}
            style={{
              width: `${arrowButtonSize}px`,
              height: `${arrowButtonSize}px`,
              fontSize: `${arrowSize}px`,
              backgroundColor: arrowButtonBackGroundColor,
            }}
          >
            <FontAwesomeIcon icon={arrowRightIcon || faAngleRight} />
          </button>
        </div>
        <div className={styles.dot_box}>{makeDot()}</div>
      </div>
    </div>
  );
};

export default Carousel;
