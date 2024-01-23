import { Team } from 'src/shared/const';
import { useFirebase } from 'src/shared/plugins/firebase';
import { useNotifyStore } from 'src/shared/stores';

export const getAllTeams = async (): Promise<Team[]> => {
    try {
        const firebase = useFirebase();
        return await firebase.getAllTeams();
    } catch (e) {
        const notifyStory = useNotifyStore();
        notifyStory.addNotification({
            type: 'error',
            text: 'Ошибка при получении команд'
        });
        throw e;
    }
}