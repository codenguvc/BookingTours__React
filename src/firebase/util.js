import { ref, set, get } from 'firebase/database';
import { database } from './firebase';

export const saveUserData = async (userId, data) => {
    try {
        await set(ref(database, 'users/' + userId), data);
    } catch (error) {
        console.error('Error saving user data:', error);
    }
};

export const fetchUserData = async (userId) => {
    console.log(userId);
    try {
        const userRef = ref(database, 'users/' + userId);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log('No data available');
            return null;
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
};

