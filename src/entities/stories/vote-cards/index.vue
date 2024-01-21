<script setup lang="ts">
import VoteCard from 'src/entities/components/VoteCard.vue';
import { ref } from 'vue';

const props = defineProps<{
    isOpen: boolean,
    title: string,
}>();

const emits = defineEmits(['select', 'update:is-open']);

const voteCards = ref([
    { name: '1h', value: 1 },
    { name: '2h', value: 2 },
    { name: '3h', value: 3 },
    { name: '4h', value: 4 },
    { name: '6h', value: 6 },
    { name: '1d', value: 8 },
    { name: '2d', value: 16 },
]);

</script>

<template>
  <v-dialog
    v-model="props.isOpen"
    persistent
  >
    <v-card class="vote-cards">
      <div class="vote-cards__title">{{ title }}</div>
      <div class="vote-cards__list">
        <VoteCard
          v-for="item in voteCards"
          :key="item.value"
          :title="item.name"
          @click="emits('select', item.value); emits('update:is-open', false)"
        />
      </div>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>
.vote-cards {
  width: 400px;
  margin: 0 auto;
  padding: 1rem;

  &__title {
    font-weight: bold;
    margin-bottom: 1rem;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
}
</style>