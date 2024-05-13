import { ref } from 'vue'
import { defineStore } from 'pinia'
import axiosApiInstance from '../api'

// Получение API ключа из переменных окружения
const apiKey = import.meta.env.VITE_API_KEY_FIREBASE;

// Определение хранилища аутентификации с использованием Pinia
export const useAuthStore = defineStore('auth', () => {
  const userInfo = ref({
    token: '',
    email: '',
    userId: '',
    refreshToken: ''
  })
  const error = ref('');
  const loader = ref(false)

  // Функция для аутентификации пользователя
  const auth = async (payload, type) => {
    // Определение строки URL для отправки запроса в зависимости от типа аутентификации
    const stringUrl = type === 'signup' ? 'signUp' : 'signInWithPassword';
    error.value = '';
    loader.value = true;
    try {
      // Отправка запроса на сервер для аутентификации пользователя
      let response = await axiosApiInstance.post(`https://identitytoolkit.googleapis.com/v1/accounts:${stringUrl}?key=${apiKey}`, {
        ...payload,
        returnSecureToken: true
      });
      // Обновление информации о пользователе после успешной аутентификации
      userInfo.value = {
        token: response.data.idToken,
        email: response.data.email,
        userId: response.data.localId,
        refreshToken: response.data.refreshToken,
      }
      // Сохранение токенов пользователя в локальном хранилище
      localStorage.setItem('userTokens', JSON.stringify({
        token: userInfo.value.token,
        refreshToken: userInfo.value.refreshToken}))
    } catch(err) {
      // Обработка ошибок при аутентификации
      switch (err.response.data.error.message) {
        case 'EMAIL_EXISTS':
          error.value = 'Такой email уже есть!'
          break;
        case 'OPERATION_NOT_ALLOWED':
          error.value = 'Дейстивие не разрешено'
          break;
        case 'EMAIL_NOT_FOUND':
          error.value = 'Email не найден!'
          break;
        case 'INVALID_PASSWORD':
          error.value = 'Не верный пароль!'
          break;
        default:
          error.value = 'Ошибка'
          break;
      }
      throw error.value;
    } finally {
      loader.value = false;
    }
  }

  // Функция для выхода из аккаунта и сброс информации о пользователе
  const logout = () => {
    userInfo.value = {
      token: '',
      email: '',
      userId: '',
      refreshToken: ''
    }
  }

  return { auth, userInfo, error, loader, logout }
})