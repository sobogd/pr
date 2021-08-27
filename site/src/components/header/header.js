import SearchLightbox from 'components/lightboxes/search';
import Overlay from 'components/overlay';
import CartIcon from 'icons/cart';
import SearchIcon from 'icons/search';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Menu from './menu';

const Header = ({ searchValue, setSearchValue }) => {
    const [isHoverMenu, setHoverMenu] = useState(false);
    const [isHoverSearch, setHoverSearch] = useState(false);
    const [isHoverCart, setHoverCart] = useState(false);
    const [isOpenSearch, setOpenSearch] = useState(false);
    const [isOpenMenu, setOpenMenu] = useState(false);
    return (
        <>
            <Menu isOpen={isOpenMenu} />
            <Overlay isOpen={isOpenSearch} onClose={() => setOpenSearch(false)} title={'Search'}>
                <SearchLightbox setSearchValue={setSearchValue} searchValue={searchValue} />
            </Overlay>
            <header>
                <div>
                    <Link
                        to="#"
                        className={`menuIcon ${isOpenMenu ? 'open' : ''} ${isHoverMenu ? 'hover' : ''}`}
                        onClick={() => setOpenMenu(!isOpenMenu)}
                        onMouseEnter={() => setHoverMenu(true)}
                        onMouseLeave={() => setHoverMenu(false)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </Link>
                    <Link
                        to="#"
                        onClick={() => setOpenSearch(true)}
                        onMouseEnter={() => setHoverSearch(true)}
                        onMouseLeave={() => setHoverSearch(false)}
                    >
                        <SearchIcon color={isHoverSearch ? '#a8b3b3' : 'white'} />
                    </Link>
                </div>
                <Link className="logo" to="/">
                    Bogdan & Anastasia
                </Link>
                <div>
                    <Link to="/cart/" onMouseEnter={() => setHoverCart(true)} onMouseLeave={() => setHoverCart(false)}>
                        <CartIcon color={isHoverCart ? '#a8b3b3' : 'white'} />
                        {/* <span>2</span> */}
                    </Link>
                </div>
            </header>
        </>
    );
};

export default Header;
