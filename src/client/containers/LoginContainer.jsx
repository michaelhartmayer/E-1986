// styles
require('./LoginContainer.jsx');

// dependencies
import React, { Component } from 'react';
import { connect }          from 'react-redux';

// components
import Container from '../components/Container';
import TextField from '../components/TextField';
import Modal     from '../components/Modal';

// component
class Login extends Component {
    handleLogin () {
        const { onLogin }                  = this.props;
        const { cmpUsername, cmpPassword } = this.refs;

        const username = cmpUsername.state.value;
        const password = cmpPassword.state.value;

        onLogin({ username, password });
    }

    render () {
        return (
            <Container classes='e-login-container full closed'>
                <Modal>
                    <TextField placeholder='Username' ref='cmpUsername' />
                    <TextField type='password' ref='cmpPassword' />

                    <button onClick={ () => this.handleLogin() }>Login</button>
                </Modal>
            </Container>
        );
    }
}

Login.defaultProps = {
    onLogin: () => {}
};

// container
const LoginContainer = connect(
    null,
    null
)(Login);

// exports
export { Login };
export default LoginContainer;