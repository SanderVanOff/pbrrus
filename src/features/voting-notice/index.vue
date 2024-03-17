<script setup lang="ts">
import { notifyAboutVoting } from './api';

const props = defineProps<{
    sessionId: string,
    storyId: string,
}>();
</script>

<template>
  <v-btn
    density="compact"
    color="indigo-accent-4"
    icon="mdi mdi-bell"
    style="font-size: 10px"
    class="mr-4"
    @click="notifyAboutVoting(props.sessionId, props.storyId)"
  />
</template>