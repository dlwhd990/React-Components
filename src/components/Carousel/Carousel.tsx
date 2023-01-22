import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Carousel.module.css";
import { CarouselProps } from "./interface";

// 1. 반응형 (분기? 강제?)
// 2. 드래그 (addEventListener)V
// 3. 자동재생 (따로 함수 만들어 적용)V

let clicked = false;
let throttleCheck = false;
let timer: ReturnType<typeof setTimeout>;

const Carousel: React.FC<CarouselProps> = (props) => {
  // defaultValue에 대비
  const [translateX, setTranslateX] = useState(props.translateX || 0);
  let duration = props.duration === undefined ? 300 : props.duration;
  let imageWidth = props.imageWidth === undefined ? 375 : props.imageWidth;
  let imageMargin = props.imageMargin === undefined ? 0 : props.imageMargin;
  let imageHeight = props.imageHeight === undefined ? 180 : props.imageHeight;
  let sideWidth = props.sideWidth === undefined ? 0 : props.sideWidth;
  let arrowShowType =
    props.arrowShowType === undefined ? "static" : props.arrowShowType;
  let arrowPosition =
    props.arrowPosition === undefined ? 10 : props.arrowPosition;
  let arrowLeftIcon =
    props.arrowLeftIcon === undefined ? faAngleLeft : props.arrowLeftIcon;
  let arrowRightIcon =
    props.arrowRightIcon === undefined ? faAngleRight : props.arrowRightIcon;
  let arrowSize = props.arrowSize === undefined ? 17 : props.arrowSize;
  let arrowButtonSize =
    props.arrowButtonSize === undefined ? 40 : props.arrowButtonSize;
  let arrowButtonBackGroundColor =
    props.arrowButtonBackGroundColor === undefined
      ? "white"
      : props.arrowButtonBackGroundColor;
  let showDot = props.showDot === undefined ? false : props.showDot;
  let dotSize = props.dotSize === undefined ? 10 : props.dotSize;
  let autoPlay = props.autoPlay === undefined ? false : props.autoPlay;
  let autoPlayDelay =
    props.autoPlayDelay === undefined ? 2000 : props.autoPlayDelay;

  // 무한 슬라이드를 위한 imageList 변경 작업
  let { imageList } = props;
  imageList = imageList
    .slice(imageList.length - 2)
    .concat(imageList)
    .concat(imageList.slice(0, 2));

  imageList = imageList.map((image, index) => {
    return { ...image, id: index };
  });

  const carouselRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(2);
  const [dragTrans, setDragTrans] = useState(0);
  const [translateValue, setTranslateValue] = useState(
    -(imageWidth + imageMargin * 2) * 2
  );
  const [transitionOn, setTransitionOn] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [isResponsive, setIsResponsive] = useState(false);
  const [isOverFlow, setIsOverFlow] = useState(false);

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
    if (isResponsive) {
      setTranslateValue(-window.innerWidth * idx);
    } else {
      setTranslateValue(-(imageWidth + imageMargin * 2) * idx);
    }
    clearTimeout(timer);
    if (autoPlay) {
      setAutoPlay();
    }
  }, [idx, imageWidth, imageMargin, autoPlay, isResponsive]);

  useEffect(() => {
    const resizeHandler = () => {
      if (throttleCheck) return;
      throttleCheck = true;
      setTimeout(() => {
        if (!(carouselRef && carouselRef.current)) return;
        const carouselWidth = carouselRef.current.offsetWidth;

        if (window.innerWidth <= imageWidth + imageMargin * 4 + sideWidth * 2) {
          setIsOverFlow(true);
          setTranslateX(
            -(
              imageWidth +
              imageMargin * 4 +
              sideWidth * 2 -
              window.innerWidth
            ) / 2
          );
        } else {
          setIsOverFlow(false);
          setTranslateX(props.translateX || 0);
        }
        if (carouselWidth <= imageWidth) {
          setIsResponsive(true);
          setTranslateValue(-carouselWidth * idx);
        } else {
          setIsResponsive(false);
        }
        throttleCheck = false;
      }, 200);
    };
    // 초기 실행
    resizeHandler();
    window.addEventListener("resize", resizeHandler);

    return () => window.removeEventListener("resize", resizeHandler);
  }, [carouselRef.current]);

  return (
    <div
      ref={carouselRef}
      className={styles.carousel}
      style={{
        width: `${
          isOverFlow
            ? "100%"
            : `${imageWidth + imageMargin * 4 + sideWidth * 2}px`
        }`,
      }}
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
            style={{
              transform: `${
                isResponsive
                  ? "none"
                  : `translateX(${sideWidth + imageMargin + translateX}px)`
              }`,
              height: `${
                isResponsive
                  ? `${
                      carouselRef &&
                      carouselRef.current &&
                      carouselRef.current?.offsetWidth *
                        (imageHeight / imageWidth)
                    }px`
                  : `${imageHeight}px`
              }`,
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              style={{
                width: `${isResponsive ? "100vw" : `${imageWidth}px`}`,
                height: `${
                  isResponsive
                    ? `${
                        carouselRef &&
                        carouselRef.current &&
                        carouselRef.current?.offsetWidth *
                          (imageHeight / imageWidth)
                      }px`
                    : `${imageHeight}px`
                }`,

                margin: `${isResponsive ? "0" : `0px ${imageMargin}px`}`,
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
            left: `${arrowPosition}px`,
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
            right: `${arrowPosition}px`,
            fontSize: `${arrowSize}px`,
            backgroundColor: arrowButtonBackGroundColor,
          }}
        >
          <FontAwesomeIcon icon={arrowRightIcon || faAngleRight} />
        </button>
      </div>
      {showDot && <div className={styles.dot_box}>{makeDot()}</div>}
    </div>
  );
};

export default Carousel;
