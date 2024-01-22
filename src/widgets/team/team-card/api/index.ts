import { Team, User } from 'src/shared/const';
import { useFirebase } from 'src/shared/plugins/firebase';
import { useTeamStore } from 'src/shared/stores';

export const getTeamById = async (id: string): Promise<Team | undefined> => {
    try {
        const firebase = useFirebase();
        const team = await firebase.getTeamById(id);
        const teamStore = useTeamStore();

        if (team) {
            teamStore.setCurrentTeam(team);
        }

        return team;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const getNonTeamUsers = async (): Promise<User[]> => {
    try {
        const firebase = useFirebase();
        const users = await firebase.getNonTeamUsers();
        const teamStore = useTeamStore();

        teamStore.updateNonTeamUsers(users);

        return users;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const changeTeam = async (userId: string, teamId: string | null): Promise<void> => {
    const firebase = useFirebase();
    try {
        await firebase.changeTeam(userId, teamId);
    } catch (e) {
        console.log(e);
    }
}