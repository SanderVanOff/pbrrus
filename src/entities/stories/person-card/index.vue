<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    userName: string
    isVoted: boolean,
    score: number,
    storyStatus: string,
}>();

const isAllVoted = computed(() => {
    return props.storyStatus === 'voted' || props.storyStatus === 'done';
});

</script>

<template>
  <div class="person-card">
    <div class="person-card__card">
      <v-icon
        v-if="isVoted && !isAllVoted"
        size="x-large"
        icon="mdi mdi-check-circle"
        color="blue-accent-4"
      />
      <div
        v-if="isAllVoted"
        class="person-card__result"
      >
        {{ props.score }}
      </div>
    </div>
    <div class="person-card__username">{{ props.userName }}</div>
  </div>
</template>

<style lang="scss" scoped>
.person-card {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &__card {
    width: 140px;
    height: 100px;
    border: 1px solid rgba(0,0,0,.15);
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0,0,0,0.1);
    margin-bottom: 0.25rem;
  }

  &__username {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__result {
    font-weight: bold;
    font-size: 20px;
  }
}
</style>