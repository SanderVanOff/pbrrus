<script setup lang="ts">
import { Ref, ref } from 'vue';
import { useValidators } from 'src/shared/utils';
import useLoginApi from './api';
import router from 'src/shared/router';

const loginApi = useLoginApi();

const  { required, isEmail, valueLength } = useValidators()

const email: Ref<string | null> = ref(null);

const password: Ref<string | null> = ref(null);

const canLogin = ref(false);

const logIn = async (): Promise<void> => {
    if (email.value && password.value) {
        await loginApi.logInWithEmailAndPassword(email.value!, password.value!);
        email.value = null;
        password.value = null;
        await router.push({ name: 'main'});
    }
}
</script>

<template>
  <v-card class="registration-form">
    <v-form v-model="canLogin">
      <div class="registration-form__header">Login</div>
      <div class="registration-form__content">
        <v-text-field
          v-model="email"
          label="e-mail"
          variant="outlined"
          density="compact"
          :rules="[required, isEmail]"
        />
        <v-text-field
          v-model="password"
          label="password"
          type="password"
          variant="outlined"
          density="compact"
          :rules="[required, (v) => valueLength(v, 6)]"
        />
      </div>
      <div class="registration-form__actions">
        <v-btn
          :disabled="!canLogin"
          density="compact"
          color="blue-accent-4"
          style="font-size: 10px"
          @click="logIn"
        >
          log in
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<style lang="scss" scoped>
.registration-form {
  width: 400px;
  padding: 1rem;

  &__header {
    margin-bottom: 1rem;
    font-weight: bold;
    font-size: 1.3rem;
  }

  &__actions {
    display: flex;
    justify-content: center;
  }
}
</style>