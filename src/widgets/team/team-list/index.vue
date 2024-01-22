<script setup lang="ts">
import CreateNewTeam from 'src/entities/team/create-new-team/index';
import TeamItem from 'src/entities/team/team-item/index';
import { getAllTeams } from 'src/widgets/team/team-list/api';

const teams = await getAllTeams();
</script>

<template>
  <v-card class="team-list">
    <div class="team-list__title">Teams</div>
    <div class="team-list__content">
      <RouterLink
        v-for="item in teams"
        :to="{ name: 'team', params: { id: item.id } }"
      >
        <TeamItem
          :key="item.id"
          :title="item.name"
        />
      </RouterLink>
    </div>
    <CreateNewTeam />
  </v-card>
</template>

<style lang="scss" scoped>
.team-list {
  padding: 1rem;

  &__title {
    font-weight: bold;
    margin-bottom: 1rem;
  }

  &__content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-bottom: 1rem;
  }
}
</style>