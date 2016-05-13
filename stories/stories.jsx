import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

// // components
// import Modal        from '../src/components/Modal.jsx';
// import TextButton   from '../src/components/TextButton.jsx';
import Scrim from '../src/client/components/Scrim.jsx';

/* Component: <Scrim /> */
storiesOf('Scrim', module)
    .add('Default', () => (
        <Scrim />
    ))
    .add('100% Opacity', () => (
        <Scrim opacity={1.0} />
    ))
    .add('50% Opacity', () => (
        <Scrim opacity={0.5} />
    ))
    .add('10% Opacity', () => (
        <Scrim opacity={0.1} />
    ));

/* Component: <TextButton /> */
// storiesOf('TextButton', module)
//     .add('Default', () => (
//         <TextButton />
//     ))
//     .add('With Text', () => (
//         <TextButton>Test</TextButton>
//     ));