require('./ApplicationContainer.less');

// dependencies
import React, { Component } from 'react';
import { connect }          from 'react-redux';

// containers
import LoginContainer from './LoginContainer';

// component
class Application extends Component {
    render () {
        return (
            <div className='e-ux e-application-container full closed'>
                <LoginContainer />
            </div>
        );
    }
}

// container
const ApplicationContainer = connect(
    ({ applicationState }) => ({
        isConnected: applicationState.connectedToServer
    }),
    null
)(Application);

// exports
export { Application };
export default ApplicationContainer;