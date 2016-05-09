// styles
require('./Modal.less');

// dependencies
import React from 'react';

// component
const Modal = ({ children, width = 400, height = 300 }) => {
    const marginLeft = -width / 2;
    const marginTop  = -height / 2;

    return (
        <div className='e-ux e-modal closed' style={{ width, height, marginLeft, marginTop }}>
            <div className='container'>
                {children}
            </div>
        </div>
    );
};

// exports
export default Modal;