import { defineStore } from 'pinia';
import { computed, Ref, ref } from 'vue';
import { PokerSession } from 'src/shared/const';

const usePokerSessionStore = defineStore('poker-session-store', () => {
    const _pokerSessions: Ref<any[]> = ref([]);

    const pokerSessions = computed(() => _pokerSessions.value);

    const _sessionParticipants: Ref<{
        id: string,
        teamName: string,
        username: string,
        isActive: boolean,
    }[]> = ref([]);

    const sessionParticipants = computed(() => _sessionParticipants.value);

    const setSessionParticipants = (sp: {
        id: string,
        teamName: string,
        username: string,
        isActive: boolean,
    }[]): void => {
        _sessionParticipants.value = sp;
    }

    const fillPokerSession = (ps: PokerSession[]): void => {
        _pokerSessions.value = ps;
    }

    const createNewSession = (payload: PokerSession): void => {
        _pokerSessions.value.push(payload);
    }

    return {
        pokerSessions,
        createNewSession,
        fillPokerSession,
        sessionParticipants,
        setSessionParticipants,
    }
});

export default usePokerSessionStore;