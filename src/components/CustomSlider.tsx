import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from '../images/esterno1.webp'
import img2 from '../images/esterno2.webp'
import img3 from '../images/ingresso1.webp'
import img4 from '../images/ingresso2.webp'
import img5 from '../images/ufficio1.webp'
import img6 from '../images/ufficio2.webp'

const images = [
  {
    src: img1.src,
    title: "Image 1",
  },
  {
    src: img2.src,
    title: "Image 2",
  },
  {
    src: img3.src, 
    title: "Image 3",
  },
  {
    src: img4.src, 
    title: "Image 4",
  },
  {
    src: img5.src, 
    title: "Image 5",
  },
  {
    src: img6.src, 
    title: "Image 6",
  },
];


const settings = {
  dots: false,
  infinite: true,
  speed: 200,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
  adaptiveHeight: true,
  slidesToShow: 1,
  fade: true,
  pauseOnHover: false,
};

/* https://github.com/akiran/react-slick/issues/2206 workaround */
/* @ts-ignore */
const SliderComponent = !!Slider.default ? Slider.default : Slider

const CustomSlider = () => {
  return (
    <SliderComponent {...settings}>
      {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.title}
            className="h-[700px] w-full object-cover"
          />
      ))}
    </SliderComponent>
  );
}

export default CustomSlider