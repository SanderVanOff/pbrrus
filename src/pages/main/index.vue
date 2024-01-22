<script setup lang="ts">
import Header from 'src/widgets/header';
import Content from 'src/widgets/content';
import CreateNewPokerSession from 'src/entities/create-new-poker-session';
import PokerSessionList from 'src/widgets/poker-session-list';
import SelectTeam from 'src/entities/select-team/index';
import TeamList from 'src/widgets/team/team-list/index';
import { AppLoadingMask } from 'src/shared/components';
import { useCommonStore, useUserStore } from 'src/shared/stores';
import { storeToRefs } from 'pinia';
import { Ref, ref } from 'vue';
import { createNewSession } from 'src/pages/main/api';

const { isGlobalLoading } = storeToRefs(useCommonStore());

const { currentUser } = storeToRefs(useUserStore());

const isSelectTeamOpen = ref(false);

const teamName: Ref<string | null> = ref(null);

const createTeamName = (name: string): void => {
    teamName.value = name;
    isSelectTeamOpen.value = true;
}

const selectedTeam = async (teamId: string): Promise<void> => {
    if (teamName.value) {
        isSelectTeamOpen.value = false;
        isGlobalLoading.value = true;
        await createNewSession(teamName.value as string, teamId);
        teamName.value = null;
        isGlobalLoading.value = false;
    }
}

</script>

<template>
  <div class="main-view">
    <Header />
    <Content class="main-view__content">
      <div>
        <pre>{{teamName}}</pre>
        <CreateNewPokerSession
          v-if="currentUser?.role === 'admin'"
          class="mb-4"
          @create-team="createTeamName($event)"
        />
        <PokerSessionList />
        <SelectTeam
          v-model:is-open="isSelectTeamOpen"
          @selected="selectedTeam($event)"
        />
      </div>
      <div>
        <TeamList />
      </div>
    </Content>
    <AppLoadingMask v-if="isGlobalLoading"/>
  </div>
</template>

<style lang="scss" scoped>
.main-view__content {
  display: grid;
  grid-template-columns: 2fr 1.5fr;
  gap: 1rem;
}
</style>