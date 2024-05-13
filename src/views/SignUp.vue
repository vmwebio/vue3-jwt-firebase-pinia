<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Message from "primevue/message";
import Loader from "../components/Loader.vue"

const authStore = useAuthStore();
const router = useRouter();

const email = ref();
const password = ref();

const signup = async () => {
  await authStore.auth({ email: email.value, password: password.value }, 'signup');
  router.push('/cars')
};
</script>

<template>
  <main>
    <div class="container">
      <h1>Регистрация</h1>
      <form class="flex flex-column gap-3">
        <Message v-if="authStore.error" severity="warn">{{ authStore.error }}</Message>
        <div class="p-inputgroup flex-1">
          <span class="p-inputgroup-addon">
            <i class="pi pi-at"></i>
          </span>
          <InputText
            type="email"
            v-model="email"
            placeholder="Ваш Email"
            required
          />
        </div>
        <div class="p-inputgroup flex-1">
          <span class="p-inputgroup-addon">
            <i class="pi pi-lock"></i>
          </span>
          <InputText
            type="password"
            v-model="password"
            placeholder="Ваш пароль"
            required
          />
        </div>
        <Loader v-if="authStore.loader"/> <!--Loader-->
        <div v-else class="flex flex-column gap-3">
          <Button label="Зарегистрироватся" @click="signup" />
          <span
            >Вы уже зарегистрированы?
            <router-link to="/signin">Войти</router-link></span
          >
        </div>
      </form>
    </div>
  </main>
</template>
