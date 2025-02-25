import { useFirebase } from 'src/shared/plugins/firebase';
import { useStoriesStore } from 'src/shared/stores';
import { useNotifyStore } from 'src/shared/stores';

export const startStory = async (sessionId: string, storyId: string, status: string): Promise<void> => {
    const firebase = useFirebase();
    await firebase.changeStoryStatus(sessionId, storyId, status);
}

export const setParticipantsToStory = async (
    sessionId: string,
    storyId: string,
    participants: {
        id: string,
        username: string,
        result: number,
        isVoted: boolean,
    }[],
    ): Promise<void> => {
    const firebase = useFirebase();
    try {
        await firebase.setParticipantsToStory(sessionId, storyId, participants);
        const storiesStore = useStoriesStore()
        storiesStore.setParticipantsToCurrentStory(storyId, participants);
    } catch (e) {
        const notifyStory = useNotifyStore();
        notifyStory.addNotification({
            type: 'error',
            text: 'Ошибка при добавлении участников в стори сессии'
        });
        throw e;
    }
}

export const voteForStory = async (
    sessionId: string,
    storyId: string,
    user: {
        id: string,
        username: string,
        result: number,
        isVoted: boolean,
    }): Promise<void> => {
    const firebase = useFirebase();
    try {
        await firebase.voteForStory(sessionId, storyId, user);
    } catch (e) {
        const notifyStory = useNotifyStore();
        notifyStory.addNotification({
            type: 'error',
            text: 'Ошибка при голосовании'
        });
        throw e;
    }
}

export const setStoryStatus = async (sessionId: string, storyId: string, status: string): Promise<void> => {
    const firebase = useFirebase();
    try {
        await firebase.changeStoryStatus(sessionId, storyId, status);
    } catch (e) {
        const notifyStory = useNotifyStore();
        notifyStory.addNotification({
            type: 'error',
            text: 'Ошибка при изменении статуса стори'
        });
        throw e;
    }
}

export const reVote = async (sessionId: string, storyId: string, user: { id: string, username: string }): Promise<void> => {
    const firebase = useFirebase();
    try {
        await firebase.reVoteForStory(sessionId, storyId, user);
    } catch (e) {
        const notifyStory = useNotifyStore();
        notifyStory.addNotification({
            type: 'error',
            text: 'Ошибка при переголосовании'
        });
        throw e;
    }
}

export const removeStory = async (sessionId: string, storyId: string): Promise<void> => {
    const firebase = useFirebase();
    try {
        await firebase.removeStory(sessionId, storyId);
    } catch (e) {
        const notifyStory = useNotifyStore();
        notifyStory.addNotification({
            type: 'error',
            text: 'Ошибка при удалении story'
        });
        throw e;
    }
}