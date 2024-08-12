import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

type CustomSliderProps = {
  images: {
    src: string;
    title: string;
    alt: string;
  }[];
};
const CustomSlider = ({ images }: CustomSliderProps) => {
  return (
    <Swiper
      loop
      modules={[Autoplay]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      slidesPerView={1}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img src={image.src} alt={image.alt} loading="eager" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CustomSlider;
