<script setup lang="ts">
import { ref } from 'vue';

const emits = defineEmits(['start-addition']);

const isAddition = ref(false);

</script>

<template>
  <div class="add-team-member">
    <v-btn
      v-if="!isAddition"
      density="comfortable"
      color="blue-accent-4"
      style="font-size: 10px"
      @click="isAddition = true; emits('start-addition', true)"
    >
      <v-icon
        icon="mdi mdi-plus"
        class="mr-2"
      />
      add team member
    </v-btn>
    <v-btn
      v-else
      density="comfortable"
      color="blue-accent-4"
      style="font-size: 10px"
      @click="isAddition = false; emits('start-addition', false)"
    >
      <v-icon
        icon="mdi mdi-check"
        class="mr-2"
      />
      done
    </v-btn>
  </div>
</template>

<style lang="scss" scoped>
.add-team-member {

}
</style>