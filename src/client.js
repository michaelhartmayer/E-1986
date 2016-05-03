// global styles
require('./styles/global.less');

// react
import React, { Component } from 'react';
import { render }           from 'react-dom';

// redux
import { Provider }                     from 'react-redux';
import { createStore, combineReducers } from 'redux';

// container
import ApplicationContainer from './containers/ApplicationContainer';

// reducers
import applicationState from './reducers/applicationStateReducer';

// actions
import { serverConnected, serverDisconnected } from './actions/applicationStateActions';

// generate reducers
const reducers = combineReducers({
    applicationState
});

// build store
const store = createStore(
    // reducers
    reducers,
    // dev tools
    window.devToolsExtension ? window.devToolsExtension() : undefined
);

var socket = io();
socket.on('connect', () => store.dispatch(serverConnected()));
socket.on('disconnect', () => store.dispatch(serverDisconnected()));

// render
render(
    <Provider store={store}>
        <ApplicationContainer />
    </Provider>,
    document.getElementById('container')
);