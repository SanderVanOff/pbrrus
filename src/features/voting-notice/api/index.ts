import { useFirebase } from 'src/shared/plugins/firebase';

export const notifyAboutVoting = async (sessionId: string, storyId: string): Promise<void> => {
    const firebase = useFirebase();
    await firebase.notifyAboutVoting(sessionId, storyId);
}