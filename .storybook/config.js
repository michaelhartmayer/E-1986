require('./styles.less');

import { configure } from '@kadira/storybook';

function loadStories () {
    require('../stories/stories.jsx');
}

configure(loadStories, module);