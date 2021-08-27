import React from 'react';
import { Link } from 'react-router-dom';

const Menu = ({ isOpen }) => {
    return (
        <div className={`menu ${isOpen ? 'open' : ''}`}>
            <div className="menuBack"></div>
            <div className="menuContent">
                <div>
                    <Link to="/">Home & Kitchen</Link>
                    <hr />
                    <Link to="/">Health & Beauty</Link>
                    <hr />
                    <Link to="/">Yoga & Fitness</Link>
                    <hr />
                    <Link to="/">Pet supplies</Link>
                    <hr />
                    <Link to="/">Baby & Baby</Link>
                </div>
                <div>
                    <Link to="/">About us</Link>
                    <Link to="/">Delivery</Link>
                    <Link to="/">Refund</Link>
                </div>
            </div>
        </div>
    );
};

export default Menu;
