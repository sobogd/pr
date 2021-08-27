import React from 'react';

const SearchLightbox = ({ searchValue, setSearchValue }) => {
    return (
        <div>
            <input
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
                placeholder="Enter search this place"
            />
        </div>
    );
};

export default SearchLightbox;
