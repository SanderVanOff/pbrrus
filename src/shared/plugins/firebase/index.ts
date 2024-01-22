import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, onAuthStateChanged, } from 'firebase/auth';

import { Ref, ref } from 'vue';
import {
    createNewSession,
    getAllPokerSession,
    createNewStory,
    getPokerSessionById,
    setCurrentUserToSessionParticipants,
    setParticipantsToStory,
    changeStoryStatus,
    voteForStory,
    startObserveStory,
} from './session';
import {
    registerNewUser,
    logout,
    logIn,
    getUserDataById,
} from './auth';
import {
    createNewTeam,
    getAllTeams,
    getTeamById,
    getNonTeamUsers,
    changeTeam,
    getTeamMembers,
} from './team';
import { PokerSession, Team, User } from 'src/shared/const';
import { useUserStore } from 'src/shared/stores';
import router from 'src/shared/router';

const firebaseConfig = {
    apiKey: "AIzaSyAMBMaVrVmYfYDjR1yxe79Bg5DHgKgzqtk",
    authDomain: "chpokify-d7298.firebaseapp.com",
    projectId: "chpokify-d7298",
    databaseURL: "https://chpokify-d7298-default-rtdb.asia-southeast1.firebasedatabase.app",
    storageBucket: "chpokify-d7298.appspot.com",
    messagingSenderId: "1094706223690",
    appId: "1:1094706223690:web:e56bb73f007e4d1f2c24b3",
    measurementId: "G-7VHP0W42KB"
};

const firebaseApp: Ref<FirebaseApp | null> = ref(null);

export const useFirebase = (): {
    createNewSession: (payload: PokerSession) => Promise<void>,
    getAllPokerSession: () => Promise<PokerSession[]>,
    getPokerSessionById: (id: string) => Promise<PokerSession>,
    createNewStory: (
        sessionId: string,
        payload: {
            id: string,
            text: string,
            link?: string,
            status: string,
            estimation: number,
            totalTime: number,
        }) => Promise<void>,
    setCurrentUserToSessionParticipants: (
        sessionId: string,
        payload: {
            id: string,
            username: string,
        }) => Promise<void>,
    setParticipantsToStory: (
        sessionId: string,
        storyId: string,
        participants: {
            id: string,
            username: string,
            result: number,
            isVoted: boolean,
        }[]) => Promise<void>,
    changeStoryStatus: (sessionId: string, storyId: string, status: string) => Promise<void>,
    startObserveStory: (sessionId: string, storyId: string) => void,
    voteForStory: (
        sessionId: string,
        storyId: string,
        user: {
            id: string,
            username: string,
            result: number,
            isVoted: boolean,
        }) => Promise<void>,
    registerNewUser: (user: {id: string, email: string, password: string, username: string, role: string }) => Promise<void>,
    logIn: (email: string, password: string) => Promise<User | undefined>,
    logout: () => Promise<void>,
    //Team
    createNewTeam: (payload: { id: string, name: string }) => Promise<void>,
    getAllTeams: () => Promise<Team[]>,
    getTeamById: (teamId: string) => Promise<Team | undefined>,
    getNonTeamUsers: () => Promise<User[]>,
    changeTeam: (userId: string, teamId: string | null) => Promise<void>,
    getTeamMembers: (teamId: string) => Promise<User[]>,
} => {
    if (!firebaseApp.value) firebaseApp.value = initializeApp(firebaseConfig);

    onAuthStateChanged(getAuth(), async (user) => {
        if (user) {
            const userData = await getUserDataById(user.uid);
            const userStore = useUserStore();
            userStore.setCurrentUser(userData);
        } else {
            await router.push({ name: 'login' });
        }
    });

    return {
        registerNewUser,
        logout,
        logIn,
        createNewSession,
        getAllPokerSession,
        createNewStory,
        getPokerSessionById,
        setCurrentUserToSessionParticipants,
        setParticipantsToStory,
        startObserveStory,
        changeStoryStatus,
        voteForStory,
        createNewTeam,
        getAllTeams,
        getTeamById,
        getNonTeamUsers,
        changeTeam,
        getTeamMembers,
    }
}