import { useFirebase } from 'src/shared/plugins/firebase';
import { uuidv4 } from 'src/shared/utils';
import useStoriesStore from 'src/shared/stores/stories';

const createNewStory = async (sessionId: string, payload: { text: string, link?: string }): Promise<void> => {
    const firebase = useFirebase();

    const newStory = {
        id: uuidv4(),
        text: payload.text,
        link: payload.link,
        status: 'created',
        estimation: 0,
        totalTime: 0,
    }

    await firebase.createNewStory(sessionId, newStory);
    const storiesStore = useStoriesStore();
    storiesStore.addNewStory(newStory);
}

export default createNewStory;