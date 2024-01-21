import { useFirebase } from 'src/shared/plugins/firebase';
import { useUserStore } from 'src/shared/stores';

const useLogoutApi = (): {
    logout: () => Promise<void>,
} => {
    const logout = async (): Promise<void> => {
        const firebase = useFirebase();
        await firebase.logout();
        const userStore = useUserStore();
        userStore.setCurrentUser(undefined);
    }

    return {
        logout,
    }
}

export default useLogoutApi;