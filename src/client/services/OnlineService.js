// actions
import { serverConnected, serverDisconnected } from '../actions/applicationStateActions';

class OnlineService {
    constructor (sb) {
        this.sb = sb;
        this.initListeners();
    }

    initListeners () {
        const { sb }     = this;
        const { socket } = sb;
        const { store }  = sb;

        socket.on('connect',    () => store.dispatch(serverConnected()));
        socket.on('disconnect', () => store.dispatch(serverDisconnected()));
    }
}

export default OnlineService;