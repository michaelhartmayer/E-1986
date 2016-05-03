// defaults
const defaults = {
    connectedToServer: false,
    loggedIn:          false,
    sessionToken:      null
};

// reducer
const applicationStateReducer = (state = defaults, action = {}) => {
    switch (action.type) {
        case 'SERVER_CONNECTED':
            return Object.assign({}, { connectedToServer: true });
        case 'SERVER_DISCONNECTED':
            return Object.assign({}, { connectedToServer: false });
        default:
            return state;
    }
};

// exports
export { defaults };
export default applicationStateReducer;