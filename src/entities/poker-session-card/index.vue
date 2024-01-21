<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    title: string,
    creationTime: String,
}>();

const internalCreationTime = computed(() => {
    return new Intl.DateTimeFormat('default', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).format(new Date(props.creationTime));
})

</script>

<template>
  <v-card class="poker-session-card">
    <div class="poker-session-card__title">
      <div class="poker-session-card__title-text">
        {{ title }}
      </div>
      <div class="poker-session-card__creation-time">
        {{ internalCreationTime }}
      </div>
    </div>
  </v-card>
</template>

<style lang="scss" scoped>
.poker-session-card {
  padding: 0.5rem 1rem;
  background: rgba(0,0,0,0.025);

  &__title-text {
    font-weight: bold;
    margin-bottom: 0.25rem;
  }

  &__creation-time {
    color: grey;
  }
}
</style>