import { defineStore } from 'pinia';
import { computed, Ref, ref } from 'vue';
import { PokerSession } from 'src/shared/const';

const usePokerSessionStore = defineStore('poker-session-store', () => {
    const _pokerSessions: Ref<any[]> = ref([]);

    const pokerSessions = computed(() => _pokerSessions.value);

    const _sessionParticipants: Ref<{
        id: string,
        username: string,
    }[]> = ref([]);

    const sessionParticipants = computed(() => _sessionParticipants.value);

    const setSessionParticipants = (sp: {
        id: string,
        username: string,
    }[]): void => {
        _sessionParticipants.value = sp;
    }

    const setParticipantsToSession = (sessionId: string, payload: { id: string, username: string}): void => {
        const currentSession = _pokerSessions.value.find((item) => item.id === sessionId);
        if (currentSession) {
            currentSession.participants = currentSession.participants ? currentSession.participants : [];
            currentSession.participants.push(payload);
        }
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
        setParticipantsToSession,
    }
});

export default usePokerSessionStore;