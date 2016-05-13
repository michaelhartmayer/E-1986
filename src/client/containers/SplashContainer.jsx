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
                        <div style={{
                            textAlign:  'center',
                            fontSize:   '5em',
                            fontFamily: 'Serif',
                            position:   'absolute',
                            top:        '40%',
                            width:      '100%',
                            color:      '#222'
                        }}>&mdash; E-1986 &mdash;</div>
                        <div style={{
                            width:      '100%',
                            textAlign:  'center',
                            position:   'absolute',
                            top:        '53%',
                            fontFamily: 'Trebuchet MS',
                            fontSize:   '1.2em',
                            color:      '#777'
                        }}><strong>M</strong>ultiplayer <strong>O</strong>nline <strong>B</strong>attle <strong>A</strong>rena</div>
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