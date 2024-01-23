import { defineStore } from 'pinia';
import { computed, Ref, ref } from 'vue';
import { uuidv4 } from 'src/shared/utils';

type NotificationType = 'error' | 'success' | 'warning' | 'info' | undefined;

type Notification = {
    id: string,
    type: NotificationType,
    text: string,
    title?: string,
}

const useNotifyStore = defineStore('notify', () => {
    const _notifications: Ref<Notification[]> = ref([]);

    const notifications = computed(() => _notifications.value);

    const addNotification = (payload: {
        type: NotificationType,
        text: string,
        title?: string,
    }): void => {
        _notifications.value.push({
            id: uuidv4(),
            ...payload,
        });
    }

    const closeNotification = (id: string): void => {
        _notifications.value = _notifications.value.filter((item) => item.id !== id);
    }

    return {
        notifications,
        addNotification,
        closeNotification,
    }
});

export default useNotifyStore;