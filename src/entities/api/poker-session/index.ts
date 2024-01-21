import { useFirebase } from 'src/shared/plugins/firebase';
import { usePokerSessionStore } from 'src/shared/stores';
import { uuidv4 } from 'src/shared/utils';
import { PokerSession } from 'src/shared/const';

export const usePokerSessionApi = (): {
    createNewPokerSession: (title: string) => Promise<void>,
} => {
    const createNewPokerSession = async (title: string): Promise<void> => {
        const firebase = useFirebase();
        const pokerSessionStore = usePokerSessionStore();
        const pokerSession: PokerSession  = {
            id: uuidv4(),
            title,
            creationTime: new Date().toString(),
        };
        await firebase.createNewPokerSession(pokerSession);
        pokerSessionStore.createNewPokerSession(pokerSession);
    }

    return {
        createNewPokerSession,
    }
}