import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface Image {
  id: number;
  src: string;
  alt: string;
  href?: string;
}

export interface CarouselProps {
  imageList: Image[];
  duration: number;
  imageWidth: number;
  imageMargin: number;
  imageHeight: number;
  sideWidth: number;
  translateX: number;
  arrowShowType?: string; // DEFAULT: NONE
  arrowLeftIcon?: IconDefinition; //Fontawesome
  arrowRightIcon?: IconDefinition; //Fontawesome
  arrowSize: number;
  arrowButtonSize: number;
  arrowButtonBackGroundColor: string;
  dotSize: number;
  autoPlay: boolean;
  autoPlayDelay: number;
}
