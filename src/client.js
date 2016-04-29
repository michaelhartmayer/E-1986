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

// generate reducers
// const reducers = combineReducers({
    // ...
// });

// build store
const store = createStore(
    // reducers
    () => {},
    // dev tools
    window.devToolsExtension ? window.devToolsExtension() : undefined
);

// render
render(
    <Provider store={store}>
        <ApplicationContainer />
    </Provider>,
    document.getElementById('container')
);