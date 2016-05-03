require('./ApplicationContainer.less');

// dependencies
import React, { Component } from 'react';
import { connect }          from 'react-redux';

// containers
import LoginContainer from './LoginContainer';
import StatusBarContainer from './StatusBarContainer';

// component
class Application extends Component {
    render () {
        return (
            <div className='e-ux e-application-container full closed'>
                <LoginContainer />
                <StatusBarContainer />
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