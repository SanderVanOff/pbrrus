import { PokerSession } from 'src/shared/const';
import { useFirebase } from 'src/shared/plugins/firebase';
import { useNotifyStore } from 'src/shared/stores';

export const getPokerSessionById = async (id: string): Promise<PokerSession> => {
    try {
        const firebase = useFirebase();
        return await firebase.getPokerSessionById(id);
    } catch (e) {
        const notifyStory = useNotifyStore();
        notifyStory.addNotification({
            type: 'error',
            text: 'Ошибка при получении сессии'
        });
        throw e;
    }
}
