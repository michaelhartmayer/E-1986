// global styles
require('./client/styles/global.less');

// dependencies: react / redux
import React, { Component }             from 'react';
import { render }                       from 'react-dom';
import { Provider }                     from 'react-redux';
import { createStore, combineReducers } from 'redux';

// sandbox
import sandbox from './client/client.sandbox';

// services
import OnlineService from './client/services/OnlineService';
import LoginService  from './client/services/LoginService';

// container
import ApplicationContainer from './client/containers/ApplicationContainer';

// reducers
import applicationState from './client/reducers/applicationStateReducer';

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

// generator socket
var socket = io();

// build sandbox
const sb = sandbox({ store, io, socket });

// start services
new OnlineService(sb);
new LoginService(sb);

// render
render(
    <Provider store={store}>
        <ApplicationContainer sandbox={sb} />
    </Provider>,
    document.getElementById('container')
);