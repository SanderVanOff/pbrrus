<script setup lang="ts">
import Content from 'src/widgets/content/index.vue';
import Header from 'src/widgets/header';
import StoryList from 'src/widgets/story-list';
import CurrentStory from 'src/widgets/current-story';
import { getPokerSessionById, setCurrentUserToSessionParticipants } from './api';
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

// router.beforeEach(async (to, from, next) => {
//     if (userStore.currentUser) {
//         console.log(2)
//         if (!sessionStore.sessionParticipants.some((item) => item.id === userStore.currentUser!.id)) {
//             const user = {
//                 id: userStore.currentUser.id,
//                 username: userStore.currentUser.username,
//             };
//             await setCurrentUserToSessionParticipants(pokerSession.id, user);
//             sessionStore.setParticipantsToSession(pokerSession.id, user);
//         }
//     } else {
//         console.log(999)
//     }
//
//     next();
// });

let pokerSession = await getPokerSessionById(id as string);

if (userStore.currentUser) {
    if (!sessionStore.sessionParticipants.some((item) => item.id === userStore.currentUser!.id)) {
        const user = {
            id: userStore.currentUser.id,
            username: userStore.currentUser.username,
        };
        await setCurrentUserToSessionParticipants(pokerSession.id, user);
        pokerSession = await getPokerSessionById(id as string);
    }
} else {
    console.log('почему-то нет юзера')
}

if (pokerSession && pokerSession.stories) {
    storiesStore.setStories(pokerSession.stories);
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
      <div class="poker-session__content">
        <v-card>
          <StoryList
            :session-id="pokerSession.id"
          />
        </v-card>
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
}
</style>