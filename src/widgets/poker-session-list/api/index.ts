import { useFirebase } from 'src/shared/plugins/firebase';
import { usePokerSessionStore } from 'src/shared/stores';

export default {
    loadAllPokerSession: async (): Promise<void> => {
        const firebase = useFirebase();
        let pokerSessions = await firebase.getAllPokerSession();
        pokerSessions = pokerSessions ? pokerSessions : [];
        const pokerSessionStore = usePokerSessionStore();
        pokerSessionStore.fillPokerSession(pokerSessions);
    }
}