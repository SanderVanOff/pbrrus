<script setup lang="ts">
import Header from 'src/widgets/header';
import Content from 'src/widgets/content';
import RegistrationForm from 'src/entities/registration';
</script>

<template>
  <div class="registration-view">
    <Header />
    <Content class="registration-view__content">
      <RegistrationForm />
    </Content>
  </div>
</template>

<style lang="scss" scoped>
.registration-view {
  height: 100%;
  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100% - 35px);
  }
}
</style>