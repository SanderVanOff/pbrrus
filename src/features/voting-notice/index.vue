<script setup lang="ts">

const audio = new Audio(`/sounds/counter-strike-jingle-cs-radio-ok-lets-go.mp3`);

</script>

<template>
  <v-btn
    density="compact"
    color="indigo-accent-4"
    icon="mdi mdi-bell"
    style="font-size: 10px"
    class="mr-4"
    @click="audio.play()"
  />
</template>