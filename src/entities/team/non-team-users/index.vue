<script setup lang="ts">
import { User } from 'src/shared/const';

const props = withDefaults(defineProps<{
    users: User[],
}>(), {
    users: () => [],
});

const emits = defineEmits(['add-team']);
</script>

<template>
  <div class="non-team-users">
    <div class="non-team-users__list">
      <v-card
        v-for="item in users"
        class="non-team-users__card"
      >
        <div class="non-team-users__item">
          <v-btn
            density="compact"
            variant="text"
            size="small"
            icon
            class="mr-4"
            @click="emits('add-team', item.id)"
          >
            <v-icon
              icon="mdi mdi-arrow-left"
              color="green"
            />
          </v-btn>
          <div>{{ item.username }}</div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.non-team-users {

  &__card {
    margin-bottom: 1rem;
  }

  &__item {
    display: flex;
    align-items: center;
    padding: 0.5rem;

  }
}
</style>