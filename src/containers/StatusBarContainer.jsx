require('./StatusBarContainer.less');

import React, { Component } from 'react';
import { connect }          from 'react-redux';

class StatusBar extends Component {
    render () {
        const { isOnline } = this.props;

        return (
            <div className='e-status-bar-container'>
                <p><strong>Online Status</strong>: { isOnline ? 'Online' : 'Offline' }</p>
            </div>
        );
    }
}

const StatusBarContainer = connect(
    ({ applicationState }) => ({
        isOnline: applicationState.connectedToServer
    }),
    null
)(StatusBar);

export default StatusBarContainer;