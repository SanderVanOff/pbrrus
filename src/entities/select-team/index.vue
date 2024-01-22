<script setup lang="ts">

import { getAllTeams } from 'src/entities/select-team/api';
import { Ref, ref } from 'vue';

const props = withDefaults(defineProps<{
    isOpen: boolean,
}>(), {
    isOpen: true,
});

const emits = defineEmits(['update:is-open', 'selected']);

const selectedTeam: Ref<string | null> = ref(null);

const teams = await getAllTeams();

const selectTeam = (): void => {
  emits('selected', selectedTeam.value);
  selectedTeam.value = null;
}
</script>

<template>
  <v-dialog
    :model-value="isOpen"
  >
    <v-card class="select-team-card">
      <div class="select-team-card__header">
        <div class="select-team-card__title">Team in session</div>
        <v-btn
          density="compact"
          variant="text"
          size="small"
          icon
          @click="emits('update:is-open', false)"
        >
          <v-icon icon="mdi mdi-close"/>
        </v-btn>
      </div>

      <div class="select-team-card__content">
        <v-combobox
          v-model="selectedTeam"
          density="compact"
          variant="outlined"
          :items="teams"
          item-title="name"
          item-value="id"
          :return-object="false"
        />
      </div>
      <div class="select-team-card__actions">
        <v-btn
          density="compact"
          style="font-size: 10px;"
          class="mr-4"
          @click="emits('update:is-open', false)"
        >
          cancel
        </v-btn>
        <v-btn
          density="compact"
          style="font-size: 10px;"
          color="blue-accent-4"
          :disabled="!selectedTeam"
          @click="selectTeam"
        >
          done
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>
.select-team-card {
  padding: 1rem;
  width: 400px;
  margin: 0 auto;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  &__title {
    font-weight: bold;
    font-size: 18px;
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: end;
  }
}
</style>