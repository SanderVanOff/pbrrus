import { useFirebase } from 'src/shared/plugins/firebase';
import { uuidv4 } from 'src/shared/utils';
import useStoriesStore from 'src/shared/stores/stories';
import { useNotifyStore } from 'src/shared/stores';

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

    try {
        await firebase.createNewStory(sessionId, newStory);
        const storiesStore = useStoriesStore();
        storiesStore.addNewStory(newStory);
    } catch (e) {
        const notifyStory = useNotifyStore();
        notifyStory.addNotification({
            type: 'error',
            text: 'Ошибка при создании стори'
        });
        console.log(e);
    }
}

export default createNewStory;