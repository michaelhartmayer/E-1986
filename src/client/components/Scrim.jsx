// styles
require('./Scrim.less');

// dependencies
import React from 'react';

// component
const Scrim = ({ children, opacity }) => {
    return (
        <div className='e-ux e-scrim full closed'>
            <div className='e-ux full closed overlay' style={{opacity}}></div>
            {children}
        </div>
    );
};

Scrim.defaultProps = {
    opacity: 0.8
};

// exports
export default Scrim;