require('./ApplicationContainer.less');

// dependencies
import React, { Component } from 'react';
import { connect }          from 'react-redux';

// containers
import LoginContainer from './LoginContainer';
import StatusBarContainer from './StatusBarContainer';
import SplashContainer from './SplashContainer';

// components
import Modal from '../components/Modal';
import Scrim from '../components/Scrim';

// component
class Application extends Component {
    handleLogin (credentials) {
        const sb = this.props.sandbox;
        sb.mediator.publish('ON_LOGIN', credentials);
    }

    render () {
        const sb                    = this.props.sandbox;
        const { applicationStatus } = this.props;

        let screen;
        switch (applicationStatus) {
            case 'LOADING': 
                screen = (
                    <SplashContainer />
                );
                break;
            case 'READY_TO_LOGIN':
                screen = (
                    <div>
                        <StatusBarContainer />
                        <LoginContainer onLogin={ credentials => this.handleLogin(credentials) } />
                    </div>
                );
                break;
        }

        return (
            <div className='e-ux e-application-container full closed'>
                { screen }
            </div>
        );
    }
}

// defaults
Application.defaultProps = {
    sandbox: null
};

// container
const ApplicationContainer = connect(
    ({ applicationState }) => ({
        isConnected:       applicationState.connectedToServer,
        applicationStatus: applicationState.applicationStatus
    }),
    null
)(Application);

// exports
export { Application };
export default ApplicationContainer;