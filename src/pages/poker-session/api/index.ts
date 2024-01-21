import { PokerSession } from 'src/shared/const';
import { useFirebase } from 'src/shared/plugins/firebase';

export const getPokerSessionById = async (id: string): Promise<PokerSession> => {
    const firebase = useFirebase();
    return await firebase.getPokerSessionById(id);
}

export const setCurrentUserToSessionParticipants = async (sessionId: string, payload: {
    id: string,
    username: string,
}): Promise<void> => {
    const firebase = useFirebase();
    await firebase.setCurrentUserToSessionParticipants(sessionId, payload);
}