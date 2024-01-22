import { useFirebase } from 'src/shared/plugins/firebase';
import { Team } from 'src/shared/const';

export const getAllTeams = async (): Promise<Team[]> => {
    const firebase = useFirebase();
    return await firebase.getAllTeams();
}