import { child, get, getDatabase, set, equalTo, orderByChild, query } from 'firebase/database';
import { ref as dbRef } from '@firebase/database';
import { Team, User } from 'src/shared/const';

export const createNewTeam = async (payload: { id: string, name: string }): Promise<void> => {
    const db = getDatabase();
    try {
        await set(dbRef(db, 'teams/' + payload.id), {
            id: payload.id,
            name: payload.name,
        });
    } catch (e) {
        console.log(e);
    }
}

export const getAllTeams = async (): Promise<Team[]> => {
    const db = dbRef(getDatabase());
    try {
        const snapshot = await get(child(db, `teams`));

        if (snapshot.exists()) {
            const results = snapshot.val();
            return Object.keys(results).map((key) => {
                const team = {
                    ...results[key],
                }

                if (results[key]?.members) {
                    team.members = Object.keys(results[key]?.members).map((teamId) => results[key]?.members[teamId]);
                } else {
                    team.members = [];
                }

                return team;
            });
        } else {
            console.log("No data available");
            return [];
        }
    } catch (error) {
        throw error;
    }
}

export const getTeamById = async (teamId: string): Promise<Team | undefined> => {
    const db = dbRef(getDatabase());
    try {
        const snapshot = await get(child(db, `teams/${teamId}`));
        if (snapshot.exists()) {
            const team = snapshot.val();
            const members = await getTeamMembers(team.id);

            if (members && members.length) {
                team.members = members;
            }

            return team;
        } else {
            console.log("No data available");
            return Promise.resolve(undefined);
        }
    } catch (e) {
        throw e;
    }
}

export const getTeamMembers = async (teamId: string): Promise<User[]> => {
    try {
        const queryRequest = query(
            dbRef(getDatabase(), 'users'),
            orderByChild('team'),
            equalTo(teamId));
        const snapshot = await get(queryRequest);

        if (snapshot.exists()) {
            const results = snapshot.val();
            return Object.keys(results).map((memberId) => results[memberId]);
        } else {
            console.log("No data available");
            return Promise.resolve([]);
        }

    } catch (e) {
        throw e;
    }
}

export const getNonTeamUsers = async (): Promise<User[]> => {
    try {
        const queryRequest = query(
            dbRef(getDatabase(), 'users'),
            orderByChild('team'),
            equalTo(null));
        const snapshot = await get(queryRequest);

        if (snapshot.exists()) {
            const results = snapshot.val();
            return Object.keys(results).map((memberId) => results[memberId]);
        } else {
            console.log("No data available");
            return Promise.resolve([]);
        }

    } catch (e) {
        throw e;
    }
}

export const changeTeam = async (userId: string, teamId: string | null): Promise<void> => {
    try {
        await set(dbRef(getDatabase(), `users/${userId}/team`), teamId);
    } catch (e) {
        console.log(e);
        throw e;
    }
}