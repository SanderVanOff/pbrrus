<script setup lang="ts">
import { Ref, ref } from 'vue';
import { useValidators } from 'src/shared/utils';
import useRegistrationApi from './api/registration';
import router from 'src/shared/router';

const registrationApi = useRegistrationApi();

const  { required, isEmail, valueLength } = useValidators()

const username: Ref<string | null> = ref(null);

const email: Ref<string | null> = ref(null);

const password: Ref<string | null> = ref(null);

const selectedRole: Ref<string> = ref('developer');

const roles = ref([
    { name: 'developer' },
    { name: 'admin' },
]);

const canRegister = ref(false);

const createNewUser = async (): Promise<void> => {
    if (email.value && password.value && username.value && selectedRole.value) {
        await registrationApi.registration(email.value!, password.value!, username.value!, selectedRole.value);
        email.value = null;
        password.value = null;
        username.value = null;
        selectedRole.value = 'developer';
        await router.push({ name: 'main'});
    }
}
</script>

<template>
  <v-card class="registration-form">
    <v-form v-model="canRegister">
    <div class="registration-form__header">Registration</div>
    <div class="registration-form__content">
      <v-text-field
        v-model="username"
        label="username"
        variant="outlined"
        density="compact"
        :rules="[required]"
      />
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
      <v-combobox
        v-model="selectedRole"
        label="role"
        density="compact"
        variant="outlined"
        :items="roles"
        item-title="name"
        item-value="name"
        :return-object="false"
      />
    </div>
    <div class="registration-form__actions">
      <v-btn
        :disabled="!canRegister"
        density="compact"
        color="blue-accent-4"
        style="font-size: 10px"
        @click="createNewUser"
      >
        register
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