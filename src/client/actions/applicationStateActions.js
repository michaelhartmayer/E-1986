// actions
const serverConnected = () => ({
    type: 'SERVER_CONNECTED'
});

const serverDisconnected = () => ({
    type: 'SERVER_DISCONNECTED'
});

// exports
export {
    serverConnected,
    serverDisconnected
};