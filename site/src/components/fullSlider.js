import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/navigation/navigation.scss";
import { Link } from "react-router-dom";
import { useGetSlidesQuery } from "services/slides";

const FullSlider = () => {
  SwiperCore.use([Pagination, Navigation]);
  const { data: slides } = useGetSlidesQuery();

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={0}
      loop={true}
      pagination={{ clickable: true }}
      navigation={true}
      className="homeslider"
      allowTouchMove={false}
    >
      {slides &&
        slides.map((slide) => (
          <SwiperSlide>
            <img src={slide.image1} alt={slide.name} />
            <img src={slide.image2} alt={slide.name} />
            <div className="homeslider-overlay">
              <div className="homeslider-block">
                <span>{slide.name}</span>
                <p>{slide.description}</p>
                <Link to={slide.link}>Learn more</Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default FullSlider;
