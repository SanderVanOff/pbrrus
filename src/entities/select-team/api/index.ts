import { Team } from 'src/shared/const';
import { useFirebase } from 'src/shared/plugins/firebase';

export const getAllTeams = async (): Promise<Team[]> => {
    const firebase = useFirebase();
    return await firebase.getAllTeams();
}