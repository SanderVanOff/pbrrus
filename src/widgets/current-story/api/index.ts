import { useFirebase } from 'src/shared/plugins/firebase';
import { useStoriesStore } from 'src/shared/stores';

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
    await firebase.setParticipantsToStory(sessionId, storyId, participants);
    const storiesStore = useStoriesStore()
    storiesStore.setParticipantsToCurrentStory(storyId, participants);
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
    await firebase.voteForStory(sessionId, storyId, user);
}

export const setStoryStatus = async (sessionId: string, storyId: string, status: string): Promise<void> => {
    const firebase = useFirebase();
    await firebase.changeStoryStatus(sessionId, storyId, status);
}