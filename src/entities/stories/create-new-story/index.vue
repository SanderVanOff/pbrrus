<script setup lang="ts">
import { Ref, ref } from 'vue';

const props = defineProps<{
    isOpen: boolean,
}>();

const emits = defineEmits(['update:is-open', 'add-new-story']);

const text: Ref<string | null> = ref(null);

const link: Ref<string | null> = ref(null);

const addNewStory = (): void => {
    if (text.value) {
        emits('add-new-story', { text: text.value, link: link.value });
        text.value = null;
        link.value = null;
        emits('update:is-open', false);
    }
}
</script>

<template>
  <v-dialog
    v-model="props.isOpen"
    persistent
    class="create-new-story"
  >
    <v-card class="create-new-story__card create-new-story-card">
      <div class="create-new-story-card__header">
        <div class="create-new-story-card__title">Add stories</div>
        <v-btn
          density="compact"
          variant="flat"
          icon
          @click="emits('update:is-open', false)"
        >
          <v-icon icon="mdi mdi-close" />
        </v-btn>
      </div>
      <v-text-field
        v-model="text"
        label="title *"
        density="compact"
        variant="outlined"
      />
      <v-text-field
        label="link"
        v-model="link"
        density="compact"
        variant="outlined"
      />
      <div class="create-new-story-card__buttons">
        <v-btn
          density="compact"
          color="grey"
          style="font-size: 10px"
          class="mr-2"
          @click="emits('update:is-open', false)"
        >
          Cancel
        </v-btn>
        <v-btn
          :disabled="!text"
          density="compact"
          color="blue-accent-4"
          style="font-size: 10px"
          @click="addNewStory"
        >
          Add story
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>
.create-new-story {
  .create-new-story-card {
    padding: 1rem;
    max-width: 400px;
    min-width: 400px;
    margin: 0 auto;

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 0 0.5rem 0;
    }

    &__title {
      font-weight: bold;
      font-size:  20px;
    }

    &__buttons {
      display: flex;
      align-items: center;
      justify-content: end;
    }
  }
}
</style>