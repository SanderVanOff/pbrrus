import createNewStory from './createNewStory';
import { useFirebase } from 'src/shared/plugins/firebase';

const startObserveStory = (sessionId: string, storyId: string): void => {
    const firebase = useFirebase();
    firebase.startObserveStory(sessionId, storyId);
}

export {
    createNewStory,
    startObserveStory,
}