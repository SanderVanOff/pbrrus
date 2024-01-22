<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    canVote: boolean,
    storyStatus: string,
}>();

const emits = defineEmits(['open-vote-modal']);

const isAllVoted = computed(() => {
    return props.storyStatus === 'voted' || props.storyStatus === 'done';
});

</script>

<template>
  <div class="story-team">
    <div class="story-team__title">AIST</div>
    <div class="story-team__list">
      <slot />
    </div>
    <div>
      <v-btn
        v-if="canVote"
        density="compact"
        color="indigo-accent-4"
        style="font-size: 10px"
        class="mr-4"
        @click="emits('open-vote-modal')"
      >
        <v-icon icon="mdi mdi-vote" />
        <span>Vote</span>
      </v-btn>
      <v-btn
        v-if="!canVote && !isAllVoted"
        density="compact"
        color="blue-grey-lighten-2"
        style="font-size: 10px"
        class="mr-4"
      >
        <v-icon
          icon="mdi mdi-restart"
          class="mr-2"
        />
        <span>ReVote</span>
      </v-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.story-team {
  border: 1px solid rgba(0,0,0,0.2);
  border-radius: 4px;
  padding: 1rem;
  &__title {
    font-weight: bold;
    margin-bottom: 1rem;
  }

  &__list {
    display: flex;
    //justify-content: center;
    flex-wrap: wrap;
    gap: 30px;
    margin-bottom: 1rem;
  }
}
</style>