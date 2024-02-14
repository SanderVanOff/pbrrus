<script setup lang="ts">
import Content from 'src/widgets/content/index.vue';
import SessionTeam from 'src/entities/team/session-team';
import Header from 'src/widgets/header';
import StoryList from 'src/widgets/story-list';
import CurrentStory from 'src/widgets/current-story';
import { getPokerSessionById } from './api';
import router from 'src/shared/router';
import { useCommonStore, usePokerSessionStore, useStoriesStore, useUserStore } from 'src/shared/stores';
import { storeToRefs } from 'pinia';
import { AppLoadingMask } from 'src/shared/components';

const { isGlobalLoading } = storeToRefs(useCommonStore());
const storiesStore = useStoriesStore();
const sessionStore = usePokerSessionStore();
const userStore = useUserStore();

const { id } = router.currentRoute.value.params;
isGlobalLoading.value = true;

let pokerSession = await getPokerSessionById(id as string);

storiesStore.currentStoryId = null;

if (pokerSession && pokerSession.stories) {
    storiesStore.setStories(pokerSession.stories);
} else {
    storiesStore.setStories([]);
}

if (pokerSession && pokerSession.participants) {
    sessionStore.setSessionParticipants(pokerSession.participants);
}

isGlobalLoading.value = false;
</script>

<template>
  <div class="poker-session">
    <Header />
    <Content>
      <div class="poker-session__header">
        <div>Session: <span>{{ pokerSession?.title }}</span></div>
      </div>
      <div
        v-if="pokerSession"
        class="poker-session__content">
        <div class="poker-session__story-list">
          <StoryList
            :session-id="pokerSession.id"
            class="poker-session-story-list"
          />
          <SessionTeam
            v-if="userStore.isAdmin && pokerSession.participants && pokerSession.participants.length"
            :session-id="pokerSession.id"
            :participants="pokerSession.participants!"
            class="mt-2"
          />
        </div>
        <CurrentStory
          :session-id="pokerSession.id"
        />
      </div>
    </Content>
    <AppLoadingMask v-if="isGlobalLoading"/>
  </div>
</template>

<style lang="scss" scoped>
.poker-session {
  &__header {
    margin-bottom: 1rem;
    font-weight: bold;
  }
  &__content {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1rem;
  }

  &__story-list {
    //height: max-content;
    height: 85svh;
    display: flex;
    flex-direction: column;
  }
}

.poker-session-story-list {
  min-height: 85%;
  height: 100%;
}
</style>