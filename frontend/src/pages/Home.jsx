import React from 'react';
import ImageSlider from '../components/Slider';

function Home() {
  const images = [
    '/slider/slider_1.png',
    '/slider/slider_2.png',
    '/slider/slider_3.png',

    // Add more image URLs as needed
  ];

  return (
    <div>
      <ImageSlider images={images} />
    </div>
  );
}

export default Home;
