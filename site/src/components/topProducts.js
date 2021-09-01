import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/navigation/navigation.scss";
import { useGetTopProductsQuery } from "services/products";
import ProductCard from "./productCard";

const TopProducts = () => {
  SwiperCore.use([Pagination, Navigation]);
  const { data: products } = useGetTopProductsQuery();

  return (
    <div className="topproducts">
      <div className="topproducts-header">
        <img src="/topproductsheader.png" />
        <span>Top eco products</span>
      </div>
      <Swiper
        slidesPerView={3}
        spaceBetween={25}
        loop={true}
        pagination={{ clickable: true }}
        allowTouchMove={true}
        updateOnWindowResize={true}
        centerInsufficientSlides={true}
        shortSwipes={false}
        noSwipingClass={null}
        autoHeight={true}
      >
        {products &&
          products.map((product) => (
            <SwiperSlide>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default TopProducts;
