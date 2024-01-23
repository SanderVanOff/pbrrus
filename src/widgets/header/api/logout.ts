import { useFirebase } from 'src/shared/plugins/firebase';
import { useUserStore } from 'src/shared/stores';
import { useNotifyStore } from 'src/shared/stores';

const useLogoutApi = (): {
    logout: () => Promise<void>,
} => {
    const logout = async (): Promise<void> => {
        const firebase = useFirebase();
        try {
            await firebase.logout();
            const userStore = useUserStore();
            userStore.setCurrentUser(undefined);
        } catch (e) {
            const notifyStory = useNotifyStore();
            notifyStory.addNotification({
                type: 'error',
                text: 'Ошибка разлогине'
            });
            throw e;
        }
    }

    return {
        logout,
    }
}

export default useLogoutApi;