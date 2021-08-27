import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

const setStateWidth = (setWidth, sliderRef) => {
    return setWidth(sliderRef.current ? sliderRef.current.offsetWidth : 0);
};

const HomeSlider = ({ slides }) => {
    const sliderRef = useRef();
    const [width, setWidth] = useState(0);
    const quantitySlides = slides.length;
    const widthContainer = quantitySlides * width;
    const height = width / 2;
    window.addEventListener('resize', () => setStateWidth(setWidth, sliderRef));
    useLayoutEffect(() => setStateWidth(setWidth, sliderRef), []);

    return (
        <div className="homeSlider" ref={sliderRef} style={{ height }}>
            <div className="homeSliderContainer" style={{ width: widthContainer }}>
                {slides.map((slide) => (
                    <div className="homeSliderSlide" style={{ width }}>
                        <img src={slide.image} alt={slide.name} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeSlider;
