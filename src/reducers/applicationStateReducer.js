// defaults
const defaults = {
    connectedToServer: false
};

// reducer
const applicationStateReducer = (state = defaults, action = {}) => {
    switch (action.type) {
        default:
            return state;
    }
};

// exports
export { defaults };
export default applicationStateReducer;