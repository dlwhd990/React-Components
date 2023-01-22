import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface Image {
  id: number;
  src: string; // 이미지 주소
  alt: string; // ALT
  href?: string; // 클릭 시 이동할 경로
}

export interface CarouselProps {
  imageList: Image[]; // 이미지들이 담긴 Array
  duration: number; // 이미지 이동 소요 시간 (transition-duration)
  imageWidth: number; // 이미지의 가로 길이
  imageMargin: number; // 이미지 간의 간격
  imageHeight: number; // 이미지의 세로 길이
  sideWidth: number; // 양옆에 살짝 보일 이전/다음 요소의 가로 길이
  translateX: number; // carousel의 초기 가로 방향 위치 변경 값
  arrowShowType?: string; // DEFAULT: none (static/hover/none)
  arrowLeftIcon?: IconDefinition; //Fontawesome (왼쪽 화살표 아이콘 / DEFAULT = faAngleLeft)
  arrowRightIcon?: IconDefinition; //Fontawesome (오른쪽 화살표 아이콘 / DEFAULT = faAngleRight)
  arrowSize: number; // 화살표 아이콘의 크기
  arrowButtonSize: number; // 화살표를 담고있는 버튼의 크기
  arrowButtonBackGroundColor: string; // 화살표 버튼의 배경색
  dotSize: number; // 하단 중앙의 점 크기
  autoPlay: boolean; // 자동 재생 여부
  autoPlayDelay: number; // 자동 재생 시간 간격
}
