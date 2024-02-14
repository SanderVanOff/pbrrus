import { useFirebase } from 'src/shared/plugins/firebase';
import { usePokerSessionStore } from 'src/shared/stores';
import { PokerSession } from 'src/shared/const';
import { uuidv4 } from 'src/shared/utils';
import { useNotifyStore } from 'src/shared/stores';

export const createNewSession = async (title: string, team: { id: string, name: string }): Promise<void> => {
    const firebase = useFirebase();
    const pokerSessionStore = usePokerSessionStore();

    try {
        const teamMembers = await firebase.getTeamMembers(team.id);

        const pokerSession: PokerSession  = {
            id: uuidv4(),
            title,
            creationTime: new Date().toString(),
            participants: teamMembers.map((item) => {
                return {
                    id: item.id,
                    teamName: team.name,
                    username: item.username,
                    isActive: true,
                }
            })
        };
        await firebase.createNewSession(pokerSession);
        pokerSessionStore.createNewSession(pokerSession);
    } catch (e) {
        const notifyStory = useNotifyStore();
        notifyStory.addNotification({
            type: 'error',
            text: 'Ошибка при создании сессии'
        });
        throw e;
    }
}