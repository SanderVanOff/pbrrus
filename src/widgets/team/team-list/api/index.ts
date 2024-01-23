import { useFirebase } from 'src/shared/plugins/firebase';
import { Team } from 'src/shared/const';
import { useNotifyStore } from 'src/shared/stores';

export const getAllTeams = async (): Promise<Team[]> => {
    const firebase = useFirebase();
    try {
        return await firebase.getAllTeams();
    } catch (e) {
        const notifyStory = useNotifyStore();
        notifyStory.addNotification({
            type: 'error',
            text: 'Ошибка при получении всех команд'
        });
        throw e;
    }
}