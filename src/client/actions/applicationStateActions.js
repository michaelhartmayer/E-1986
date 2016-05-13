// actions
const serverConnected = () => ({
    type: 'SERVER_CONNECTED'
});

const serverDisconnected = () => ({
    type: 'SERVER_DISCONNECTED'
});

const setApplicationStatus = (applicationStatus = 'READY_TO_LOGIN') => ({
    type: 'SET_APPLICATION_STATUS',
    applicationStatus
});

// exports
export {
    serverConnected,
    serverDisconnected,
    setApplicationStatus
};