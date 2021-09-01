import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { name, link, price } = product;
  let { images } = product;
  images.slice().sort((a, b) => (a.sort > b.sort ? 1 : -1));
  return (
    <div className="product-card">
      <Link to={`/products/${link}`} className="product-card-image">
        <img src={images[0].src} alt={name} />
      </Link>
      <Link to={`/products/${link}`} className="product-card-name">
        {name}
      </Link>
      <span className="product-card-price">${price}</span>
    </div>
  );
};

export default ProductCard;
