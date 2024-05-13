<script setup>
import { computed } from "vue";
import { useAuthStore } from "./stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

// Получения токена пользователя
const token = computed(() => authStore.userInfo.token);

// Функция для проверки наличия токена пользователя в локальном хранилище и установки его в хранилище аутентификации
const checkUser = () => {
  // Получение токенов из локального хранилища
  const tokens = JSON.parse(localStorage.getItem("userTokens"));
  if (tokens) {
    // Установка токена в хранилище аутентификации
    authStore.userInfo.token = tokens.token;
    // Установка refreshToken в хранилище аутентификации
    authStore.userInfo.refreshToken = tokens.refreshToken;
  }
};

// Функция для выхода из аккаунта
const logout = () => {
  authStore.logout(); // Вызов метода logout из хранилища аутентификации для выхода из аккаунта
  localStorage.removeItem("userTokens"); // Удаление токенов из локального хранилища
  router.push("/signin"); // Перенаправление на страницу входа
};

checkUser();
</script>

<template>
  <div class="menu">
    <router-link class="menu__link" to="/">Главная</router-link>
    <router-link class="menu__link" to="/signin" v-if="!token">Войти</router-link>
    <router-link class="menu__link" to="/cars" v-if="token">Авто</router-link>
    <router-link class="menu__link" to="/signin" v-if="token" @click.prevent="logout">Выйти</router-link>
  </div>
  <div class="container">
    <RouterView />
  </div>
</template>

<style>
.container {
  margin: auto;
  font-family: 'Arial', sans-serif;
  max-width: 700px;
}
.menu {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 20px;
}

.menu__link {
  color: #000;
  margin: 0 20px;
  font-family: 'Arial', sans-serif;
}
</style>
