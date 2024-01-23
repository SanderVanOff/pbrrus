import { useFirebase } from 'src/shared/plugins/firebase';
import { usePokerSessionStore } from 'src/shared/stores';
import { useNotifyStore } from 'src/shared/stores';

export default {
    loadAllPokerSession: async (): Promise<void> => {
        const firebase = useFirebase();
        try {
            let pokerSessions = await firebase.getAllPokerSession();
            pokerSessions = pokerSessions ? pokerSessions : [];
            const pokerSessionStore = usePokerSessionStore();
            pokerSessionStore.fillPokerSession(pokerSessions);
        } catch (e) {
            const notifyStory = useNotifyStore();
            notifyStory.addNotification({
                type: 'error',
                text: 'Ошибка при получении всех сессии'
            });
            throw e;
        }
    }
}