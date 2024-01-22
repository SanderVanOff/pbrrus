<script setup lang="ts">
import Header from 'src/widgets/header';
import Content from 'src/widgets/content/index.vue';
import { AppLoadingMask } from 'src/shared/components';
import { storeToRefs } from 'pinia';
import { useCommonStore } from 'src/shared/stores';
import TeamCard from 'src/widgets/team/team-card';

const { isGlobalLoading } = storeToRefs(useCommonStore());
</script>

<template>
  <div>
    <Header />
    <Content>
      <TeamCard />
    </Content>
    <AppLoadingMask v-if="isGlobalLoading"/>
  </div>
</template>

<style lang="scss" scoped>

</style>