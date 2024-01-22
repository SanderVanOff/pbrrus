import { getDatabase, set, ref as dbRef, child, get, onChildChanged, onValue } from "firebase/database";
import { PokerSession } from 'src/shared/const';
import { useStoriesStore } from 'src/shared/stores';

export const createNewSession = async (payload: PokerSession): Promise<void> => {
    const db = getDatabase();
    const mappedParticipants: Record<string, any> = {};

    if (payload.participants) {
        payload.participants.forEach((item) => {
            mappedParticipants[item.id] = item;
        });
    }

    try {
        await set(dbRef(db, 'poker-session/' + payload.id), {
            id: payload.id,
            title: payload.title,
            creationTime: payload.creationTime,
            participants: mappedParticipants,
        });
    } catch (e) {
        console.log(e);
    }
};

export const getAllPokerSession = async (): Promise<any> => {
    const db = dbRef(getDatabase());
    try {
        const snapshot = await get(child(db, `poker-session`));

        if (snapshot.exists()) {
            const results = snapshot.val();
            return Object.keys(results).map((key) => results[key]);
        } else {
            console.log("No data available");
        }
    } catch (error) {
        console.error(error);
    }
};

export const createNewStory = async (
    sessionId: string,
    payload: {
        id: string,
        text: string,
        link?: string,
        status: string,
        estimation: number,
        totalTime: number,
    }): Promise<any> => {
    const db = getDatabase();
    try {
        await set(dbRef(db, `poker-session/${sessionId}/stories/${payload.id}`), {
            id: payload.id,
            text: payload.text,
            link: payload.link,
            status: payload.status,
            estimation: payload.estimation,
            totalTime: payload.totalTime,
        });
    } catch (e) {
        console.log(e);
    }
}

export const startObserveStory = (sessionId: string, storyId: string): void => {
    onValue(dbRef(getDatabase(), `poker-session/${sessionId}/stories/${storyId}`), (snapshot) => {
        if (snapshot.exists()) {
            const story = snapshot.val()
            const storiesStore = useStoriesStore();
            storiesStore.setStatusStore(storyId, story.status);
        } else {
            console.log('нет данных')
        }
    });

    onChildChanged(dbRef(getDatabase(), `poker-session/${sessionId}/stories/${storyId}/participants`), (data) => {
        const storiesStore = useStoriesStore();
        if (data.exists()) {
            const userData = data.val();
            storiesStore.vote(storyId, userData.id, userData.isVoted, userData.result);
        } else {
            console.log('нет данных')
        }
    });
}

export const changeStoryStatus = async (sessionId: string, storyId: string, status: string): Promise<void> => {
    try {
        await set(dbRef(getDatabase(), `poker-session/${sessionId}/stories/${storyId}/status`), status);
    } catch (e) {
        console.log(e);
    }

}

export const setParticipantsToStory = async (
    sessionId: string,
    storyId: string,
    participants: {
        id: string,
        username: string,
        result: number,
        isVoted: boolean,
    }[],
): Promise<void> => {
    const db = getDatabase();
    try {
        const mappedParticipants: Record<string, any> = {};
        participants.forEach((item) => {
            mappedParticipants[item.id] = item;
        });

        const databaseReference = dbRef(db, `poker-session/${sessionId}/stories/${storyId}/participants`);
        await set(databaseReference, mappedParticipants);
    } catch (e) {
        console.log(e);
    }
}

export const voteForStory = async (
    sessionId: string,
    storyId: string,
    user: {
        id: string,
        username: string,
        result: number,
        isVoted: boolean,
    }
): Promise<void> => {
    const db = getDatabase();
    try {
        const databaseReference = dbRef(db, `poker-session/${sessionId}/stories/${storyId}/participants/${user.id}`);
        await set(databaseReference, user);
    } catch (e) {
        console.log(e);
    }
}

export const getPokerSessionById = async(id: string): Promise<any> => {
    const db = dbRef(getDatabase());
    try {
        const snapshot = await get(child(db, `poker-session/${id}`));
        if (snapshot.exists()) {
            const data = snapshot.val();
            const result = {
                ...data,
            }

            if (data.stories) {
                result.stories = Object.keys(data.stories).map((key) => {
                    const res = {
                        ...data.stories[key],
                    };

                    if (data.stories[key].participants) {
                        res.participants = Object.keys(data.stories[key].participants).map((k) => data.stories[key].participants[k]);
                    }

                    return res;
                }) ?? [];
            }

            if (data.participants) {
                result.participants = Object.keys(data.participants).map((key) => data.participants[key]) ?? [];
            }

            return result;
        } else {
            console.log("No data available");
        }
    } catch (e) {
        console.log(e);
    }
}

export const setCurrentUserToSessionParticipants = async (
    sessionId: string,
    payload: {
        id: string,
        username: string,
    }): Promise<void> => {
    const db = getDatabase();
    try {
        await set(dbRef(db, `poker-session/${sessionId}/participants/${payload.id}`), {
            id: payload.id,
            username: payload.username,
        });
    } catch (e) {
        console.log(e);
    }
}