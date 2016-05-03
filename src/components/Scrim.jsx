// styles
require('./Scrim.less');

// dependencies
import React from 'react';

// component
const Scrim = ({ children, opacity = 0.8 }) => {
    return (
        <div className='e-ux e-scrim full closed'>
            <div className='overlay' style={{opacity}}></div>
            {children}
        </div>
    );
};

// exports
export default Scrim;