<script setup lang="ts">
import StartEstimationStory from 'src/entities/stories/start-estimation-story';
import StoryTeam from 'src/entities/stories/story-team';
import StoriesPersonCard from 'src/entities/stories/person-card';
import VoteCards from 'src/entities/stories/vote-cards';

import { useCommonStore, useStoriesStore, usePokerSessionStore, useUserStore } from 'src/shared/stores';
import { computed, Ref, ref, watch } from 'vue';
import { setParticipantsToStory, voteForStory, startStory as startCurrentStory, setStoryStatus } from './api';
import { storeToRefs } from 'pinia';

const storiesStore = useStoriesStore();
const commonStore = useCommonStore();
const sessionStore = usePokerSessionStore();
const userStore = useUserStore();

const props = defineProps<{
    sessionId: string,
}>();


const isModalOpen: Ref<boolean> = ref(false);

const currentStory = computed(() => storiesStore.stories.find((story) => story.id === storiesStore.currentStoryId));

const openLink = (): void => {
    if (currentStory.value?.link) {
        window.open(currentStory.value.link, '_blank');
    }
}

const vote = async (val: number): Promise<void> => {
    if (currentStory.value) {
        const { currentUser } = storeToRefs(userStore);
        if (currentUser.value) {
            await voteForStory(props.sessionId, currentStory.value!.id, {
                id: currentUser.value!.id,
                username: currentUser.value!.username,
                isVoted: true,
                result: val,
            });
        }
    }
}

const startStory = async (): Promise<void> => {
    if (currentStory.value) {
        commonStore.isGlobalLoading = true;
        await startCurrentStory(props.sessionId, currentStory.value!.id, 'inProgress');
        const storyParticipants = sessionStore.sessionParticipants.map((item) => {
            return {
                ...item,
                result: 0,
                isVoted: false,
            }
        });

        await setParticipantsToStory(props.sessionId, currentStory.value!.id, storyParticipants);
        commonStore.isGlobalLoading = false;
    }
}

const canVote = computed(() => {
    if (currentStory.value && currentStory.value?.participants) {
        const user = currentStory.value!.participants!.find((item) => {
            return item.id === userStore.currentUser?.id;
        });

        return currentStory.value?.status === 'inProgress' && (user && !user.isVoted);
    }

    return false;
});

const revealAllCards = async (): Promise<void> => {
    await setStoryStatus(props.sessionId, currentStory.value!.id, 'voted');
}

const closeStory = async (): Promise<void> => {
    await setStoryStatus(props.sessionId, currentStory.value!.id, 'done');
}

const restartStory = async (): Promise<void> => {
    await startStory();
}
</script>

<template>
  <v-card class="current-story">
    <div class="current-story__header">
      <div>
        <div class="current-story__title">Current Story</div>
        <template v-if="currentStory">
          <div class="current-story__subtitle">
            {{ currentStory.text }}
          </div>
          <a
            class="current-story__link"
            @click="openLink">{{ currentStory.link }}</a>
        </template>
      </div>
      <div
        v-if="currentStory"
        class="d-flex flex-column align-items-end"
      >
        <div class="current-story__title">Story score</div>
        <div class="current-story__subtitle ml-auto">
          {{ currentStory.estimation }}
        </div>
      </div>
    </div>
    <div
      v-if="currentStory"
      class="current-story__content"
    >
      <StartEstimationStory
        :story-status="currentStory.status"
        class="mb-4"
        @start-estimation="startStory"
        @reveal-all-cards="revealAllCards"
        @done="closeStory"
        @restart="restartStory"
      />
      <StoryTeam
        v-if="currentStory.status !== 'created'"
        :story-status="currentStory.status"
        :can-vote="canVote"
        @open-vote-modal="isModalOpen = true"
      >
        <template v-if="currentStory?.participants">
        <StoriesPersonCard
          v-for="item in currentStory.participants"
          :key="item.id"
          :user-name="item.username"
          :is-voted="item.isVoted"
          :score="item.result"
          :story-status="currentStory.status"
        />
        </template>
      </StoryTeam>
    </div>
    <div
      v-else
      class="current-story__empty"
    >
      Story not selected
    </div>
    <VoteCards
      v-if="currentStory"
      v-model:is-open="isModalOpen"
      :title="currentStory?.text!"
      @select="vote"
    />
  </v-card>
</template>

<style lang="scss" scoped>
.current-story {
  padding: 1rem;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 1rem 0;
  }

  &__title {
    font-size: 13px;
    font-weight: bold;
    color: grey;
    text-transform: uppercase;
  }

  &__subtitle {
    font-size: 24px;
    font-weight: bold;
  }

  &__link {
    cursor: pointer;
  }
}
</style>