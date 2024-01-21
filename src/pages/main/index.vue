<script setup lang="ts">
import Header from 'src/widgets/header';
import Content from 'src/widgets/content';
import CreateNewPokerSession from 'src/entities/create-new-poker-session';
import PokerSessionList from 'src/widgets/poker-session-list';
import { AppLoadingMask } from 'src/shared/components';
import { useCommonStore, useUserStore } from 'src/shared/stores';
import { storeToRefs } from 'pinia';

const { isGlobalLoading } = storeToRefs(useCommonStore());

const { currentUser } = storeToRefs(useUserStore());

</script>

<template>
  <div class="main-view">
    <Header />
    <Content>
      <CreateNewPokerSession
        v-if="currentUser?.role === 'admin'"
        class="mb-4"
      />
      <PokerSessionList />
    </Content>
    <AppLoadingMask v-if="isGlobalLoading"/>
  </div>
</template>

<style lang="scss" scoped>

</style>