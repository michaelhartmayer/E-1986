const redis  = require('redis');
const client = redis.createClient();

class Session {
    constructor (t) {
        this.token   = t;
        this.state   = {}
    }

    dehydrate () {
        return JSON.stringify(this.state);
    }

    rehydrate (s) {
        this.state = JSON.parse(s);
    }

    isValid () {

    }
}

const Toke = () => {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

Session.Generate = () => {
    const t = Toke();
    const s = new Session(t);

    client.set(t, Session.dehydrate());
};

Session.Load = id => {
    return new Promise((resolve, reject) => {
        client.get(id, (err, session) => {
            if (err) {
                reject();
            }

            else {
                const s = new Session();
                s.rehydrate(session);

                resolve(s);
            }
        });
    });
};