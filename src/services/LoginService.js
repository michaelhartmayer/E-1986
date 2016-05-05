class LoginService {
    constructor (sb) {
        this.sb = sb;
        this.initListeners();
    }

    initListeners () {
        const { sb }       = this;
        const { mediator } = sb;

        mediator.subscribe('ON_LOGIN', credentials => this.handleLogin(credentials));
        mediator.subscribe('ON_LOGOUT', credentials => this.handleLogout());
    }

    handleLogin ({ username = '', password = '' }) {
        console.log('handle login');
    }

    handleLogout () {
        console.log('handle logout');
    }
}

export default LoginService;