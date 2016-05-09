// styles
require('./Container.less');

// dependencies
import React from 'react';

// component
const Container = ({ classes, children }) => {
    return (
        <div className={'e-ux e-container ' + classes}>
            {children}
        </div>
    );
};

Container.defaultProps = {
    classes: ''
};

// exports
export default Container;