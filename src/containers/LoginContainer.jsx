// dependencies
import React, { Component } from 'react';
import { connect }          from 'react-redux';

// component
class Login extends Component {
    render () {
        const { doLogin } = this.props;

        return (
            <div className='e-ux e-login-container full closed'>
                <button onClick={() => doLogin()}>Login</button>
            </div>
        );
    }
}

// container
const LoginContainer = connect(
    null,
    dispatch => ({
        doLogin: () => alert('login')
    })
)(Login);

// exports
export { Login };
export default LoginContainer;