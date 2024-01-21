<script setup lang="ts">

</script>

<template>
  <div class="loading-mask">
    <v-progress-circular
      color="blue"
      indeterminate
      size="40"
    />
  </div>
</template>

<style lang="scss" scoped>
.loading-mask {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .5);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
}
</style>