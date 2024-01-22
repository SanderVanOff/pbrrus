import { useFirebase } from 'src/shared/plugins/firebase';
import { uuidv4 } from 'src/shared/utils';

export const createNewTeam = async (name: string): Promise<void> => {
    const firebase = useFirebase();
    try {
        await firebase.createNewTeam({
            id: uuidv4(),
            name,
        });
    } catch (e) {
        console.log(e);
    }
}