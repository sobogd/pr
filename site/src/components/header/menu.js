import React from "react";
import { Link } from "react-router-dom";

const Menu = ({ isOpen, setOpenMenu }) => {
  return (
    <div className={`menu ${isOpen ? "open" : ""}`}>
      <div className="menuBack" onClick={() => setOpenMenu(false)}></div>
      <div className="menuContent">
        <div>
          <Link to="/" onClick={() => setOpenMenu(false)}>
            Home & Kitchen
          </Link>
          <hr />
          <Link to="/" onClick={() => setOpenMenu(false)}>
            Health & Beauty
          </Link>
          <hr />
          <Link to="/" onClick={() => setOpenMenu(false)}>
            Yoga & Fitness
          </Link>
          <hr />
          <Link to="/" onClick={() => setOpenMenu(false)}>
            Pet supplies
          </Link>
          <hr />
          <Link to="/" onClick={() => setOpenMenu(false)}>
            Baby & Baby
          </Link>
        </div>
        <div>
          <Link to="/" onClick={() => setOpenMenu(false)}>
            About us
          </Link>
          <Link to="/" onClick={() => setOpenMenu(false)}>
            Delivery
          </Link>
          <Link to="/" onClick={() => setOpenMenu(false)}>
            Refund
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Menu;
