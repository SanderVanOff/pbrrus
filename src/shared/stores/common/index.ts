import { defineStore } from 'pinia';
import { ref } from 'vue';

const useCommonStore = defineStore('common', () => {
    const isGlobalLoading = ref(false);

    return {
        isGlobalLoading,
    }
});

export default useCommonStore;