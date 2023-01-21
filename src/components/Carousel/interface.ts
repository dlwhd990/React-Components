export interface Image {
  id: number;
  src: string;
  alt: string;
}

export interface CarouselProps {
  imageList: Image[];
  duration: number;
  imageWidth: number;
  imageMargin: number;
  imageHeight: number;
  sideWidth: number;
}
