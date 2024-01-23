import { defineStore } from 'pinia';
import { computed, Ref, ref } from 'vue';
import { User } from 'src/shared/const';

const useUserStore = defineStore('user', () => {
    const _currentUser: Ref<User | undefined> = ref();

    const currentUser = computed(() => _currentUser.value);

    const setCurrentUser = (cu: User | undefined): void => {
        _currentUser.value = cu;
    }

    const isAdmin = computed(() => _currentUser.value?.role === 'admin');

    return {
        currentUser,
        setCurrentUser,
        isAdmin,
    }
});

export default useUserStore;