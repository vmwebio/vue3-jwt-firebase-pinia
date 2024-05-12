<script setup>
import { ref } from "vue";

import InputText from "primevue/inputtext";
import Button from "primevue/button";

const email = ref();
const password = ref();

const signup = () => {
  console.log("test");
};
</script>

<template>
  <main>
    <div class="container">
      <h1>Регистрация</h1>
      <form class="flex flex-column gap-3">
        <div class="p-inputgroup flex-1">
          <span class="p-inputgroup-addon">
            <i class="pi pi-user"></i>
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
            <i class="pi pi-sign-in"></i>
          </span>
          <InputText
            type="password"
            v-model="password"
            placeholder="Ваш пароль"
            required
          />
        </div>
        <div class="flex flex-column gap-3">
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
<style scoped>
.container {
  max-width: 700px;
  margin: auto;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
</style>
