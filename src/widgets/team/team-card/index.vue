<script setup lang="ts">
import { ref } from 'vue';
import { getTeamById, changeTeam, getNonTeamUsers } from 'src/widgets/team/team-card/api';
import TeamMember from 'src/entities/team/team-member/index';
import AddTeamMember from 'src/entities/team/add-team-member/index';
import NonTeamUsers from 'src/entities/team/non-team-users/index';
import router from 'src/shared/router';
import { useCommonStore, useTeamStore } from 'src/shared/stores';
import { storeToRefs } from 'pinia';

const teamStore = useTeamStore();

const { isGlobalLoading } = storeToRefs(useCommonStore());

const { id } = router.currentRoute.value.params;

const isVisibleNonTeamUsers = ref(false);

await getTeamById(id as string);

const startAddition = async (isVisible: boolean): Promise<void> => {
    isVisibleNonTeamUsers.value = isVisible;

    if (isVisible) {
        isGlobalLoading.value = true;
        await getNonTeamUsers();
        isGlobalLoading.value = false;
    }

}

const changeUserTeam = async (userId: string, teamId: string | null): Promise<void> => {
    isGlobalLoading.value = true;
    await changeTeam(userId, teamId);
    await getTeamById(id as string);
    await getNonTeamUsers();
    isGlobalLoading.value = false;
}
</script>

<template>
  <v-card class="team-card">
    <template v-if="teamStore.currentTeam">
      <div class="team-card__header">
        <div class="team-card__title">{{ teamStore.currentTeam.name }}</div>
        <AddTeamMember
          class="team-members__add-team-member"
          @start-addition="startAddition"
        />
      </div>
      <div class="team-card__content">
        <div class="team-members">
          <div class="team-members__title">Team members</div>
          <TeamMember
            v-for="item in teamStore.currentTeam.members"
            :key="item.id"
            :username="item.username"
            class="team-members__item mb-3"
            @remove="changeUserTeam(item.id, null)"
          />
        </div>
        <div
          v-if="isVisibleNonTeamUsers"
          class="team-members">
          <div class="team-members__title">Non-team users</div>
            <NonTeamUsers
              :users="teamStore.nonTeamUsers"
              @add-team="changeUserTeam($event, id as string)"
            />
        </div>
      </div>
    </template>
    <template v-else>
      <div>Нет данных по команде</div>
    </template>
  </v-card>
</template>

<style lang="scss" scoped>
.team-card {
  padding: 1rem;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  &__title {
    font-size: 24px;
    font-weight: bold;
  }

  &__content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}

.team-members {
  border: 1px solid rgba(0,0,0,0.2);
  padding: 1rem;
  border-radius: 4px;

  &__title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
}
</style>