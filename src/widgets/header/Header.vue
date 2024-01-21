<script setup lang="ts">
import { useUserStore } from 'src/shared/stores';
import useLogoutApi from 'src/widgets/header/api/logout';
import router from 'src/shared/router';

const userStore = useUserStore();

const logoutApi = useLogoutApi();

const logout = async (): Promise<void> => {
    await logoutApi.logout();
    await router.push({ name: 'login' });
}
</script>

<template>
  <div class="app-header">
    <RouterLink :to="{ name: 'main' }">
      PBRrus
    </RouterLink>
    <div class="d-flex align-center">
      <div class="app-header__username">{{ userStore.currentUser?.username }}</div>
      <template v-if="!userStore.currentUser">
        <v-btn
          :to="{ name: 'registration' }"
          density="compact"
          color="blue-accent-4"
          style="font-size: 10px"
          class="mr-2"
        >
          sign up
        </v-btn>
        <v-btn
          :to="{ name: 'login' }"
          density="compact"
          color="blue-accent-4"
          style="font-size: 10px"
          class="mr-2"
        >
          sign in
        </v-btn>
      </template>
      <v-btn
        v-else
        density="compact"
        color="blue-accent-4"
        style="font-size: 10px"
        class="mr-2"
        @click="logout"
      >
       log out
      </v-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-header {
  min-height: 30px;
  background: #fff;
  border-bottom: 1px solid rgba(0,0,0,0.2);
  padding: 0.3rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__username {
    margin-right: 1rem;
  }
}
</style>