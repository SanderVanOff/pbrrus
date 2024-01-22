import { defineStore } from 'pinia';
import { computed, Ref, ref } from 'vue';
import { Team, User } from 'src/shared/const';

const useTeamStore = defineStore('team', () => {
    const _teams: Ref<Team[]> = ref([]);

    const teams = computed(() => _teams.value);

    const _currentTeam: Ref<Team | null> = ref(null);

    const currentTeam = computed(() => _currentTeam.value);

    const setCurrentTeam = (team: Team): void => {
        _currentTeam.value = team;
    }

    const setMemberToCurrentTeam = (member: User): void => {
        if (_currentTeam.value) {
            _currentTeam.value.members.push(member);
        }
    }

    const removeMemberFromCurrentTeam = (userId: string): void => {
        if (_currentTeam.value && _currentTeam.value.members) {
            _currentTeam.value.members = _currentTeam.value.members.filter((item) => item.id !== userId);
        }
    }

    const _nonTeamUsers: Ref<User[]> = ref([]);

    const nonTeamUsers = computed(() => _nonTeamUsers.value);

    const updateNonTeamUsers = (ntu: User[]): void => {
        _nonTeamUsers.value = ntu;
    }

    return {
        teams,
        currentTeam,
        setCurrentTeam,
        setMemberToCurrentTeam,
        removeMemberFromCurrentTeam,
        nonTeamUsers,
        updateNonTeamUsers,
    }
});

export default useTeamStore;