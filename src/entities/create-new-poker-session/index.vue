<script setup lang="ts">
import { Ref, ref } from 'vue';
import { usePokerSessionApi } from 'src/entities/api/poker-session';

const title: Ref<string | null> = ref(null);

const pokerSessionApi = usePokerSessionApi();

const createNewPokerSession = async (): Promise<void> => {
    if (title.value) {
        await pokerSessionApi.createNewPokerSession(title.value!);
        title.value = null;
    }
}

</script>

<template>
  <v-card class="create-new-poker-session">
    <div class="create-new-poker-session__title">Create new poker-session</div>
    <div class="create-new-poker-session__content">
      <v-text-field
        v-model="title"
        density="compact"
        variant="outlined"
        hide-details
        class="mr-4"
      />
      <v-btn
        color="primary"
        @click="createNewPokerSession"
      >
        Create
      </v-btn>
    </div>
  </v-card>
</template>

<style lang="scss" scoped>
.create-new-poker-session {
  padding: 1rem;
  &__title {
    font-weight: bold;
  }

  &__content {
    display: flex;
    align-items: center;
    padding: 0.75rem 0;
  }
}
</style>