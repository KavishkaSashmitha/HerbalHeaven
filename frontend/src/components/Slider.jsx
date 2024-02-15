// Slider.js

import React from "react";
import Slider from "react-slick/lib/slider";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000, // Set the duration for each slide in milliseconds
};

const ImageSlider = ({ images }) => {
  return (
    <>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`slide-${index}`} />
          </div>
        ))}
      </Slider>

      <div className="featured-products"></div>
    </>
  );
};

export default ImageSlider;
