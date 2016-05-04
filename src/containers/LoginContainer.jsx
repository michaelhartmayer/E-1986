// styles
require('./LoginContainer.jsx');

// dependencies
import React, { Component } from 'react';
import { connect }          from 'react-redux';

// components
import TextField from '../components/TextField';
import Modal     from '../components/Modal';

// component
class Login extends Component {
    handleLogin () {
        const { doLogin }                  = this.props;
        const { cmpUsername, cmpPassword } = this.refs;

        const username = cmpUsername.state.value;
        const password = cmpPassword.state.value;

        doLogin({ username, password });
    }

    render () {
        return (
            <div className='e-ux e-login-container full closed'>
                <Modal>
                    <TextField placeholder='Username' ref='cmpUsername' />
                    <TextField type='password' ref='cmpPassword' />
                    Forgot Password? Fuck you.<br />

                    <button onClick={ () => this.handleLogin() }>Login</button>
                </Modal>
            </div>
        );
    }
}

// container
const LoginContainer = connect(
    null,
    dispatch => ({
        doLogin: ({ username, password }) => alert(`logging in as ${username}, ${password}`) // todo, bind to event
    })
)(Login);

// exports
export { Login };
export default LoginContainer;