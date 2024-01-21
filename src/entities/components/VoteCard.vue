<script setup lang="ts">
const props = defineProps<{
    title: string,
}>();
</script>

<template>
  <div class="vote-card">
    {{ title }}
  </div>
</template>

<style lang="scss" scoped>
.vote-card {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background: #2962FF;
  font-size: 2rem;
  border: 1px solid #2979FF;
  border-radius: 8px;
  height: 100px;
  cursor: pointer;

  &:hover {
    background: black;
  }
}


</style>