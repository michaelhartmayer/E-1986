// styles
require('./TextField.less');

// dependencies
import React, { Component } from 'react';

// component
class TextField extends Component {
    constructor (props) {
        super(props);

        // default state
        this.state = {
            value: ''
        };
    }

    handleChange ({ target }) {
        this.setState({ value: target.value });
    }

    render () {
        const { placeholder, type } = this.props;

        return (
            <div className='e-ux e-text-field'>
                <input type={type} className='input' placeholder={placeholder} onChange={ evt => this.handleChange(evt) } />
            </div>
        );
    }
}

TextField.defaultProps = {
    placeholder: '',
    type:        'text'
};

// exports
export default TextField;