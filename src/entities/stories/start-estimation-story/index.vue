<script setup lang="ts">
// import Timer from '../../components/Timer.vue';
import { computed } from 'vue';

const props = defineProps<{
    storyStatus: string,
}>();

const emits = defineEmits(['start-estimation', 'reveal-all-cards', 'done', 'restart']);

const isAllVoted = computed(() => {
    return (props.storyStatus === 'voted' || props.storyStatus === 'done') ?? false;
});

const isDone = computed(() => {
    return props.storyStatus === 'done';
});
</script>

<template>
  <div class="start-estimation-story">
    <v-btn
      v-if="props.storyStatus === 'created'"
      density="compact"
      color="indigo-accent-4"
      style="font-size: 10px"
      class="mr-4"
      @click="emits('start-estimation')"
    >
      <v-icon
        icon="mdi mdi-play"
        class="mr-1"
      />
      Start story
    </v-btn>
    <template v-else>
      <v-btn
        v-if="!isAllVoted"
        density="compact"
        color="indigo-accent-4"
        style="font-size: 10px"
        class="mr-4"
        @click="emits('reveal-all-cards')"
      >
        <v-icon
          icon="mdi mdi-book-open-blank-variant-outline"
          class="mr-1"
        />
        Reveal all cards
      </v-btn>
      <v-btn
        v-if="isAllVoted && !isDone"
        density="compact"
        color="indigo-accent-4"
        style="font-size: 10px"
        class="mr-4"
        @click="emits('done')"
      >
        <v-icon
          icon="mdi mdi-check"
          class="mr-1"
        />
        Done
      </v-btn>
      <v-btn
        v-if="isDone"
        density="compact"
        color="indigo-accent-4"
        style="font-size: 10px"
        class="mr-4"
        @click="emits('restart')"
      >
        <v-icon
          icon="mdi mdi-restart"
          class="mr-1"
        />
        restart
      </v-btn>
    </template>
<!--    <Timer />-->
  </div>
</template>

<style lang="scss" scoped>
.start-estimation-story {
  display: flex;
  align-items: center;
}
</style>