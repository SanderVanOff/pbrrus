import { useFirebase } from 'src/shared/plugins/firebase';
import { usePokerSessionStore } from 'src/shared/stores';
import { PokerSession } from 'src/shared/const';
import { uuidv4 } from 'src/shared/utils';

export const createNewSession = async (title: string, teamId: string): Promise<void> => {
    const firebase = useFirebase();
    const pokerSessionStore = usePokerSessionStore();
    const teamMembers = await firebase.getTeamMembers(teamId);

    const pokerSession: PokerSession  = {
        id: uuidv4(),
        title,
        creationTime: new Date().toString(),
        participants: teamMembers.map((item) => {
            return {
                id: item.id,
                username: item.username,
            }
        })
    };
    await firebase.createNewSession(pokerSession);
    pokerSessionStore.createNewSession(pokerSession);
}