<script setup lang="ts">
import StartEstimationStory from 'src/entities/stories/start-estimation-story';
import StoryTeam from 'src/entities/stories/story-team';
import StoriesPersonCard from 'src/entities/stories/person-card';
import VoteCards from 'src/entities/stories/vote-cards';

import { useCommonStore, useStoriesStore, usePokerSessionStore, useUserStore } from 'src/shared/stores';
import { computed, Ref, ref } from 'vue';
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

const isStartedStory: Ref<boolean> = ref(false);

const openLink = (): void => {
    if (storiesStore.currentStory?.link) {
        window.open(storiesStore.currentStory.link, '_blank');
    }
}

const vote = async (val: number): Promise<void> => {
    if (storiesStore.currentStory) {
        const { currentUser } = storeToRefs(userStore);
        if (currentUser.value) {
            await voteForStory(props.sessionId, storiesStore.currentStory!.id, {
                id: currentUser.value!.id,
                username: currentUser.value!.username,
                isVoted: true,
                result: val,
            });
        }
    }
}

const startStory = async (): Promise<void> => {
    if (storiesStore.currentStory) {
        isStartedStory.value = true;
        commonStore.isGlobalLoading = true;
        await startCurrentStory(props.sessionId, storiesStore.currentStory!.id, 'inProgress');
        const storyParticipants = sessionStore.sessionParticipants.map((item) => {
            return {
                ...item,
                result: 0,
                isVoted: false,
            }
        });

        await setParticipantsToStory(props.sessionId, storiesStore.currentStory!.id, storyParticipants);
        commonStore.isGlobalLoading = false;
    }
}

const canVote = computed(() => {
    if (storiesStore.currentStory && storiesStore.currentStory.participants) {
        const user = storiesStore.currentStory.participants.find((item) => {
            return item.id === userStore.currentUser?.id;
        });

        return storiesStore.currentStory?.status === 'inProgress' && (user && !user.isVoted);
    }

    return false;
});

const revealAllCards = async (): Promise<void> => {
    await setStoryStatus(props.sessionId, storiesStore.currentStory!.id, 'voted');
}

const closeStory = async (): Promise<void> => {
    await setStoryStatus(props.sessionId, storiesStore.currentStory!.id, 'done');
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
        <template v-if="storiesStore.currentStory">
          <div class="current-story__subtitle">
            {{ storiesStore.currentStory.text }}
          </div>
          <a
            class="current-story__link"
            @click="openLink">{{ storiesStore.currentStory.link }}</a>
        </template>
      </div>
      <div
        v-if="storiesStore.currentStory"
        class="d-flex flex-column align-items-end"
      >
        <div class="current-story__title">Story score</div>
        <div class="current-story__subtitle ml-auto">
          {{ storiesStore.currentStory.estimation }}
        </div>
      </div>
    </div>
    <div
      v-if="storiesStore.currentStory"
      class="current-story__content"
    >
      <StartEstimationStory
        :is-started-estimation="isStartedStory"
        class="mb-4"
        @start-estimation="startStory"
        @reveal-all-cards="revealAllCards"
        @done="closeStory"
        @restart="restartStory"
      />
      <StoryTeam
        v-if="isStartedStory || storiesStore.currentStory.status !== 'created'"
        :can-vote="canVote"
        @open-vote-modal="isModalOpen = true"
      >
        <template v-if="storiesStore.currentStory?.participants">
        <StoriesPersonCard
          v-for="item in storiesStore.currentStory.participants"
          :key="item.id"
          :user-name="item.username"
          :is-voted="item.isVoted"
          :score="item.result"
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
      v-if="storiesStore.currentStory"
      v-model:is-open="isModalOpen"
      :title="storiesStore.currentStory?.text!"
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