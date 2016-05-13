import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

// components
import Scrim from '../src/client/components/Scrim.jsx';

// containers
import SplashContainer from '../src/client/containers/SplashContainer.jsx';

/* Component: <Scrim /> */
storiesOf('<Scrim />', module)
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

/* Container: <SplashContainer /> */
// x