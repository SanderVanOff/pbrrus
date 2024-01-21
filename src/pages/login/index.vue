<script setup lang="ts">
import Header from 'src/widgets/header';
import Content from 'src/widgets/content';
import LoginForm from 'src/entities/login';
</script>

<template>
  <div class="login-view">
    <Header />
    <Content class="login-view__content">
      <LoginForm />
    </Content>
  </div>
</template>

<style lang="scss" scoped>
.login-view {
  height: 100%;
  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100% - 35px);
  }
}
</style>