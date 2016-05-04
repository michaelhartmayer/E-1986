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
    render () {
        return (
            <div className='e-ux e-application-container full closed'>
                <StatusBarContainer />
                <LoginContainer />
                {/*
                    <Scrim>
                        <Modal>Hello!</Modal>
                    </Scrim>
                */}
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