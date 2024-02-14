import { useFirebase } from 'src/shared/plugins/firebase';
import usePokerSessionStore from '../../../../shared/stores/poker-session';
import { useNotifyStore } from 'src/shared/stores';

export const updateActiveSessionParticipants = async (
    sessionId: string,
    participants: {
        id: string,
        teamName: string,
        username: string,
        isActive: boolean,
    }[],): Promise<any> => {
    const firebase = useFirebase();
    try {
        await firebase.updateActiveSessionParticipants(sessionId, participants);
        const { setSessionParticipants } = usePokerSessionStore();
        setSessionParticipants(participants);
    } catch (e) {
        const notifyStory = useNotifyStore();
        notifyStory.addNotification({
            type: 'error',
            text: 'Ошибка при обновлении участников сессии'
        });
        console.log(e);
    }
}