require('./ApplicationContainer.less');

// dependencies
import React, { Component } from 'react';
import { connect }          from 'react-redux';

// containers
import LoginContainer from './LoginContainer';
import StatusBarContainer from './StatusBarContainer';

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
        const sb = this.props.sandbox;

        return (
            <div className='e-ux e-application-container full closed'>
                <StatusBarContainer />
                <LoginContainer onLogin={ credentials => this.handleLogin(credentials) } />
                {/*
                    <Scrim>
                        <Modal>Hello!</Modal>
                    </Scrim>
                */}
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
        isConnected: applicationState.connectedToServer
    }),
    null
)(Application);

// exports
export { Application };
export default ApplicationContainer;