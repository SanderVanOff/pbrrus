<script setup lang="ts">
import StoryCard from 'src/entities/stories/story-card';
import CreateNewStoryComponent from 'src/entities/stories/create-new-story';
import { useStoriesStore, useUserStore } from 'src/shared/stores';
import { computed, ref } from 'vue';
import { createNewStory, startObserveStory } from './api';
import router from 'src/shared/router';
import { storeToRefs } from 'pinia';

const props = defineProps<{
    sessionId: string,
}>();

const storiesStore = useStoriesStore();

const { isAdmin } = storeToRefs(useUserStore());

const isOpenStoryCreationModal = ref(false);

const selectStory = (storyId: string): void => {
    storiesStore.currentStoryId = storyId;
    startObserveStory(props.sessionId, storyId);
}

const currentStory = computed(() => storiesStore.stories.find((item) => item.id === storiesStore.currentStoryId));

const onCreateNewStory = async (value: {text: string, link?: string | undefined}): Promise<void> => {
    await createNewStory(router.currentRoute.value.params.id as string, value);
}

const isDone = computed(() => {
    return currentStory.value?.status  === 'done' ? 'light-green-lighten-3' : '';
});

const sortedStories = computed(() => {
    return storiesStore.stories.sort((a, b) => a.timeStamp - b.timeStamp);
});
</script>

<template>
  <v-card class="task-list">
    <div class="task-list__title">Stories</div>
    <div
      v-if="storiesStore.stories.length"
      class="task-list__list"
    >
      <StoryCard
        v-for="item in sortedStories"
        :title="item.text"
        :estimation="item.estimation"
        :class="`mb-3 ${item.id === currentStory?.id ? 'selected' : ''}`"
        :style="`background: ${item.status === 'done' ? '#C5E1A5' : ''}`"
        @click="selectStory(item.id)"
      />
    </div>
    <div
      v-else
      class="task-list__empty"
    >
      No stories in session
    </div>
    <v-btn
      v-if="isAdmin"
      density="compact"
      color="indigo-accent-4"
      style="font-size: 10px"
      @click="isOpenStoryCreationModal = true"
    >
      <v-icon
        icon="mdi mdi-plus"
        class="mr-1"
      />
      <span>Add story</span>
    </v-btn>
    <CreateNewStoryComponent
      v-model:is-open="isOpenStoryCreationModal"
      @add-new-story="onCreateNewStory"
    />
  </v-card>
</template>

<style lang="scss" scoped>
.task-list {
  padding: 1rem;

  &__title {
    font-size: 13px;
    font-weight: bold;
    color: grey;
    margin: 0 0 1rem 0;
    text-transform: uppercase;
  }

  &__list {
    min-height: max-content;
    max-height: 80%;
    height: 100%;
    overflow-y: auto;
    margin-bottom: 1rem;
  }

  &__empty {
    padding: 0 0 1rem 0;
  }

  & .selected {
    background: #BBDEFB;
    border: 2px solid #2962FF;
  }
}
</style>