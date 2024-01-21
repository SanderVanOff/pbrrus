import { useFirebase } from 'src/shared/plugins/firebase';
import { useUserStore } from 'src/shared/stores';

const useLoginApi = (): {
    logInWithEmailAndPassword: (email: string, password: string) => Promise<void>,
} => {
    const logInWithEmailAndPassword = async (email: string, password: string): Promise<void> => {
        const firebase = useFirebase();
        const user = await firebase.logIn(email, password);

        if (user) {
            const userStore = useUserStore();
            userStore.setCurrentUser(user);
        }
    }
    return {
        logInWithEmailAndPassword,
    }
}

export default useLoginApi;