// libs
import Mediator from 'mediator-js';

const sandbox = ({ store, io, socket }) => {
    const mediator = new Mediator();

    return {
        // injectables
        store, io, socket,

        // helpers
        mediator
    };
};

export default sandbox;