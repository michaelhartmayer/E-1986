require('./ApplicationContainer.less');

// dependencies
import React, { Component } from 'react';
import { connect }          from 'react-redux';

// component
class Application extends Component {
    render () {
        return (
            <div>Application!</div>
        );
    }
}

// container
const ApplicationContainer = connect(
    null,
    null
)(Application);

// exports
export { Application };
export default ApplicationContainer;