<script setup lang="ts">
import PokerSessionCard from 'src/entities/poker-session-card';
import { usePokerSessionStore } from 'src/shared/stores';
import { computed } from 'vue';
import PokerSessionApi from './api';
import { useCommonStore } from 'src/shared/stores';
import { storeToRefs } from 'pinia';

const { isGlobalLoading } = storeToRefs(useCommonStore());

const pokerSessionStore = usePokerSessionStore();

const lastFivePokerSessions = computed(() => pokerSessionStore.pokerSessions ? pokerSessionStore.pokerSessions.slice(-5) : []);

isGlobalLoading.value = true;
await PokerSessionApi.loadAllPokerSession();
isGlobalLoading.value = false;
</script>

<template>
  <v-card class="poker-session-list">
    <div class="poker-session-list__title">Poker-sessions</div>
    <div class="poker-session-list__items">
      <RouterLink
        v-for="item in lastFivePokerSessions"
        :to="{
            name: 'poker-session',
            params: { id: item.id },
        }"
      >
        <PokerSessionCard
          :key="item.id"
          :title="item.title"
          :creation-time="item.creationTime"
          class="mb-3"
        />
      </RouterLink>
    </div>
  </v-card>
</template>

<style lang="scss" scoped>
.poker-session-list {
  padding: 1rem;

  &__title {
    font-weight: bold;
  }

  &__items {
    padding: 0.75rem 0 0 0;
  }
}
</style>