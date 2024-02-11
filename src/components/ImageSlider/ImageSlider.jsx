import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from '../../assets/banner7.jpg'
import img2 from '../../assets/banner6.jpg'
import img3 from '../../assets/banner1.jpg'
import img4 from '../../assets/banner2.jpg'
import { GrNext, GrPrevious } from 'react-icons/gr';


const ImageSlider = () => {

  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,        
    autoplaySpeed: 3000,
  };

  const images = [ img1, img2, img3, img4 ];

  const goToNext = () => {
    sliderRef.current.slickNext();
  };

  const goToPrev = () => {
    sliderRef.current.slickPrev();
  };

  useEffect(() => {
    sliderRef.current.slickPlay();
  }, []);

  return (
    <div className="relative">
    <Slider {...settings} className="overflow-hidden" ref={sliderRef}>
      {images.map((imageUrl, index) => (
        <div key={index} className="h-96 w-full object-cover border rounded-xl">
          <img
            src={imageUrl}
            alt={`slider-image-${index}`}
            className="object-fit aspect-square w-full h-full"
          />
        </div>
      ))}
    </Slider>
    {/* <button onClick={goToPrev} className="absolute top-1/2 left-2 md:left-10 transform -translate-y-1/2 focus:outline-none">
      <GrPrevious size={24} />
    </button>
    <button onClick={goToNext} className="absolute top-1/2 right-2 md:right-10 transform -translate-y-1/2 focus:outline-none">
      <GrNext size={24} />
    </button> */}
  </div>
  );
};

export default ImageSlider;
