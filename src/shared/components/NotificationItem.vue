<script lang="ts" setup>
import { onMounted } from 'vue';

const props = withDefaults(defineProps<{
    type: 'error' | 'success' | 'warning' | 'info' | undefined,
    id: string,
    title?: string,
    text: string,
    autoClose: boolean,
    duration: number,
}>(), {
    title: '',
    autoClose: true,
    duration: 5000,
});
const emits = defineEmits(['close']);

const onClose = (): void => {
    emits('close', props.id);
};

onMounted(() => {
    if(props.autoClose) {
        setTimeout(onClose, props.duration);
    }
});
</script>

<template>
  <v-alert
    density="compact"
    border="end"
    position="absolute"
    :title="title"
    :type="type"
    closable
    class="notification mb-1"
    @click:close="onClose"
  >
    <div>
      <div class="p-1">
        {{ text }}
      </div>
    </div>
  </v-alert>
</template>

<style scoped lang="scss">
.notification{
  min-height: 50px;
  width: 350px;
  bottom: 0;
  right: 0;
}
</style>

