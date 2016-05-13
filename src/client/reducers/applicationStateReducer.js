// defaults
const defaults = {
    applicationStatus: 'LOADING',
    connectedToServer: false,
    loggedIn:          false,
    sessionToken:      null
};

// reducer
const applicationStateReducer = (state = defaults, action = {}) => {
    switch (action.type) {
        case 'SERVER_CONNECTED':
            return Object.assign({}, state, { connectedToServer: true });
        case 'SERVER_DISCONNECTED':
            return Object.assign({}, state, { connectedToServer: false });
        case 'SET_APPLICATION_STATUS':
            return Object.assign({}, state, { applicationStatus: action.applicationStatus });
        default:
            return state;
    }
};

// exports
export { defaults };
export default applicationStateReducer;