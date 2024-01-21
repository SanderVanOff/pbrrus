import {
    getAuth,
    createUserWithEmailAndPassword,
    type Auth,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { getDatabase, set, ref as dbRef, get, child } from "firebase/database";
import { User } from 'src/shared/const';

export const registerNewUser = async (user: User): Promise<void> => {
    const auth: Auth = getAuth();

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
        await addNewUserToDB({
            ...user,
            id: userCredential.user.uid,
        });
    } catch (e) {
        console.log(e);
    }
}

export const logIn = async (email: string, password: string): Promise<User | undefined> => {
    const auth: Auth = getAuth();

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return await getUserDataById(userCredential.user.uid);
    } catch (e) {
        console.log(e);
    }
}

export const logout = async (): Promise<void> => {
    try {
        const auth = getAuth();
        await signOut(auth);
    } catch (e) {
        console.log(e);
    }
}

export const addNewUserToDB = async (payload: {
    id: string,
    username: string,
    email: string,
    role: string,
}): Promise<void> => {
    const db = getDatabase();
    try {
        await set(dbRef(db, 'users/' + payload.id), {
            id: payload.id,
            username: payload.username,
            email: payload.email,
            role: payload.role,
        });
    } catch (e) {
        console.log(e);
    }
}

export const getUserDataById = async (userId: string): Promise<User | undefined> => {
    const db = dbRef(getDatabase());
    try {
        const snapshot = await get(child(db, `users/${userId}`));
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log("No data available");
            return Promise.resolve(undefined);
        }
    } catch (e) {
        console.log(e);
    }
}