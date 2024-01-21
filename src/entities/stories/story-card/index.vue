<script setup lang="ts">
const props = defineProps<{
    title: string,
    estimation: number,
}>();
</script>

<template>
  <v-card class="task-card">
    <div class="task-card__title">
      {{ title }}
    </div>
<!--    <div class="task-card__estimation">-->
<!--      {{ estimation }}-->
<!--    </div>-->
  </v-card>
</template>

<style lang="scss" scoped>
.task-card {
  background: rgba(0,0,0,0.025);
  padding: 0.5rem 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__title {
    width: 100%;
  }

  &__estimation {
    font-weight: bold;
    font-size: 20px;
  }
}
</style>