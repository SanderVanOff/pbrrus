import { useFirebase } from 'src/shared/plugins/firebase';
import { useUserStore } from 'src/shared/stores';
import { useNotifyStore } from 'src/shared/stores';

const useLoginApi = (): {
    logInWithEmailAndPassword: (email: string, password: string) => Promise<void>,
} => {
    const logInWithEmailAndPassword = async (email: string, password: string): Promise<void> => {
        const firebase = useFirebase();

        try {
            const user = await firebase.logIn(email, password);

            if (user) {
                const userStore = useUserStore();
                userStore.setCurrentUser(user);
            }
        } catch (e) {
            const notifyStory = useNotifyStore();
            notifyStory.addNotification({
                type: 'error',
                text: 'Ошибка при входе пользователя'
            });
            console.log(e);
        }
    }
    return {
        logInWithEmailAndPassword,
    }
}

export default useLoginApi;