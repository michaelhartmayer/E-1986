require('./SplashContainer.less');

// dependencies
import React, { Component } from 'react';
import { connect }          from 'react-redux';

// helper

// containers

// components
import Modal     from '../components/Modal';
import Scrim     from '../components/Scrim';
import Container from '../components/Container';

// component
class Splash extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <Container classes='full closed'>
                <Scrim opacity={0.8}>
                    <Modal width={900} height={680}>
                        Splash Screen Here
                    </Modal>
                </Scrim>
            </Container>
        );
    }
}

// container
const SplashContainer = connect(
    null,
    null
)(Splash);

// exports
export { Splash };
export default SplashContainer;