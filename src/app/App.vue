<script setup lang="ts">
import { Routing } from 'src/pages';
import { useNotifyStore } from 'src/shared/stores';
import NotificationItem from 'src/shared/components/NotificationItem.vue';

const notifyStore = useNotifyStore();
</script>

<template>
  <Suspense>
    <div class="app-main">
      <v-app>
        <Routing />
        <NotificationItem
          v-for="notify in notifyStore.notifications"
          :key="notify.id"
          :id="notify.id"
          :title="notify.title"
          :type="notify.type"
          :text="notify.text"
          @close="notifyStore.closeNotification($event)"
        />
      </v-app>
    </div>
  </Suspense>
</template>

<style lang="scss">
#app {
  display: flex;
}
.app-main {
  display: flex;
  flex-direction: column;
  width: 100%;

  &__content {
    height: 100%;
    width: 100%;
    background: rgb(235,108,0);
    background: linear-gradient(90deg, rgba(235,108,0,0.4668461134453782) 0%, rgba(255,237,0,0.6125043767507004) 100%);
  }
}
</style>
