const settingDefaults = {
    MAX_CONNECTIONS: 20
};

class IOMicroservice {
    // stash socket, init listeners
    constructor (sck, settings = settingDefaults) {
        this.sck         = sck;
        this.connections = [];
        this.settings    = settings;

        this.initListeners();
    }

    // register a connection
    register (c) {
        this.connections.push(c);
    }

    // unregister a connection
    unregister (c) {
        this.connections.filter(i => i === c ? false : i);
    }

    // listen for incoming connections
    initListeners () {
        const { sck } = this;
        sck.on('connection', c => this.handleOnConnection(c));
    }

    // handle incoming connections
    handleOnConnection (c) {
        this.register(c);
        this.initListenersForConnection(c);
    }

    // init listerns for a specific connection
    initListenersForConnection (c) {
        // handle disconnect of this connection
        c.on('disconnect', () => this.handleOnConnectionDisconnect(c));
        // handle action from this connection
        c.on('action', action => this.handleOnConnectionAction(c, action));
    }

    // handle disconnect
    handleOnConnectionDisconnect (c) {
        this.unregister(c);
    }

    // handle action from a connection
    handleOnConnectionAction (c, action) {
        const { type, ...o } = action;

        switch (type) {
            case 'IDENT':
                this.handleIdentAction(c, o);
                break;
            default:
                break;
        }
    }

    handleIdentAction (c, o) {
    }
}

export default IOMicroservice;