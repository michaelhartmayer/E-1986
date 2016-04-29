// dependencies
import React, { Component } from 'react';
import connect              from 'react-redux';

// component
class Login extends Component {
    render () {
        return (<div></div>);
    }
}

// container
const LoginContainer = connect(
    null,
    null
)(Login);

// exports
export Login;
export default LoginContainer;