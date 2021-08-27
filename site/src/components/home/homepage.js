import React, { useEffect } from 'react';
import HomeSlider from './homeslider';

const HomePage = ({ slides, fetchSlides }) => {
    useEffect(() => fetchSlides(), []);
    console.log(slides);
    return <div>{slides.list.length > 0 && <HomeSlider slides={slides.list} />}</div>;
};

export default HomePage;
