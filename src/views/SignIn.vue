<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";

import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Message from "primevue/message";
import Loader from "../components/Loader.vue"

const authStore = useAuthStore();

const email = ref();
const password = ref();

const signin = async () => {
  await authStore.auth({ email: email.value, password: password.value }, 'signin');
};
</script>

<template>
  <main>
    <div class="container">
      <h1>Войти</h1>
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
          <Button label="Войти" @click="signin" />
          <span
            >Нет аккаунта?
            <router-link to="/signup">Зарегистрироватся</router-link></span
          >
        </div>
      </form>
    </div>
  </main>
</template>
<style scoped>
.container {
  max-width: 700px;
  margin: auto;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
</style>
