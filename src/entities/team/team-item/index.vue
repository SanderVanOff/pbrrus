<script setup lang="ts">
const props = defineProps<{
    title: string,
}>();
</script>

<template>
  <div class="team-item">
    <div class="team-item__title">{{ title }}</div>
<!--    <div class="team-item__quantity">0</div>-->
  </div>
</template>

<style lang="scss" scoped>
.team-item {
  border: 1px solid rgba(0,0,0,.2);
  border-radius: 4px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__quantity {
    font-weight: bold;
  }
}
</style>