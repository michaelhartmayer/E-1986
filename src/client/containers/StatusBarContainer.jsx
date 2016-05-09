// styles
require('./StatusBarContainer.less');

// react
import React, { Component } from 'react';
import { connect }          from 'react-redux';

// component
class StatusBar extends Component {
    render () {
        const { isOnline } = this.props;

        return (
            <div className='e-status-bar-container'>
                <p><strong>Server Status</strong>: { isOnline ? 'Online' : 'Offline' }</p>
            </div>
        );
    }
}

// container
const StatusBarContainer = connect(
    ({ applicationState }) => ({
        isOnline: applicationState.connectedToServer
    }),
    null
)(StatusBar);

// exports
export default StatusBarContainer;