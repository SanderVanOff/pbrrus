import { createPinia } from 'pinia';

import usePokerSessionStore from './poker-session';
import useStoriesStore from './stories';
import useCommonStore from './common';
import useUserStore from './user';

const store = createPinia();

export default store;

export {
    usePokerSessionStore,
    useStoriesStore,
    useCommonStore,
    useUserStore,
}