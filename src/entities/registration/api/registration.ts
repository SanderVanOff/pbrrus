import { useFirebase } from 'src/shared/plugins/firebase';
import { uuidv4 } from 'src/shared/utils';
import useUserStore from '../../../shared/stores/user';

const useRegistrationApi = (): {
    registration: (email: string, password: string, username: string, role: string) => Promise<void>,
} => {
    const registration = async (email: string, password: string, username: string, role: string): Promise<void> => {
        const firebase = useFirebase();
        const newUser = {
            id: uuidv4(),
            email,
            password,
            username,
            role,
        }

        await firebase.registerNewUser(newUser);
        const userStore = useUserStore();
        userStore.setCurrentUser(newUser);
    }

    return {
        registration,
    }
}

export default useRegistrationApi;