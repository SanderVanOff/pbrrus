<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from 'src/shared/stores';

const props = defineProps<{
    username: string,
}>();

const emits = defineEmits(['remove']);

const { isAdmin } = storeToRefs(useUserStore());

</script>

<template>
  <v-card class="team-member">
    <div class="team-member__content">
      <div class="team-member__username">{{ username }}</div>
      <div class="team-member__actions">
        <v-btn
          v-if="isAdmin"
          density="compact"
          variant="text"
          size="small"
          icon
          @click="emits('remove')"
        >
          <v-icon
            icon="mdi mdi-close"
            color="red"
          />
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<style lang="scss" scoped>
.team-member {
  padding: 0.5rem;
  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>