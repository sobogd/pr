import CloseIcon from 'icons/close';

import React, { useState } from 'react';

const Overlay = ({ isOpen, onClose, children, title }) => {
    const [hoverClose, setHoverClose] = useState(false);
    return (
        <div className={`overlay ${isOpen ? 'open' : ''}`}>
            <div className="overlayBack" onClick={onClose}></div>
            <div className="overlayBody">
                <div className="overlayTitle">
                    {title}
                    <span
                        onClick={onClose}
                        onMouseEnter={() => setHoverClose(true)}
                        onMouseLeave={() => setHoverClose(false)}
                    >
                        <CloseIcon color={hoverClose ? '#a8b3b3' : 'white'} />
                    </span>
                </div>
                <div className="overlayContent">{children}</div>
            </div>
        </div>
    );
};

export default Overlay;
