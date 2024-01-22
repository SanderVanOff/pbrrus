<script setup lang="ts">
import { Ref, ref } from 'vue';
import { useValidators } from 'src/shared/utils';
import { createNewTeam } from './api';

const  { valueLength } = useValidators()

const teamName: Ref<string | null> = ref(null);

const canCreate = ref(false);

const create = async (): Promise<void> => {
    if (teamName.value) {
        await createNewTeam(teamName.value as string);
        teamName.value = null;
    }
}

</script>

<template>
  <div class="create-new-team">
    <v-form
      v-model="canCreate"
      class="create-new-team__form"
    >
      <v-text-field
        v-model="teamName"
        density="compact"
        variant="outlined"
        hide-details
        :rules="[(v) => valueLength(v, 2)]"
        class="mr-4"
      />
      <v-btn
        density="comfortable"
        color="blue-accent-4"
        style="font-size: 10px"
        :disabled="!canCreate"
        @click="create"
      >
        <v-icon
          icon="mdi mdi-plus"
          class="mr-2"
        />
        create team
      </v-btn>
    </v-form>
  </div>
</template>

<style lang="scss" scoped>
.create-new-team {
  &__form {
    display: flex;
    align-items: center;
  }
}
</style>