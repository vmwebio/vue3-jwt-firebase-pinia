import axios from 'axios'
import { useAuthStore } from './stores/auth'
import router from './router'

// Создание экземпляра axios для работы с API
const axiosApiInstance = axios.create()

// Получение API ключа из переменных окружения
const apiKey = import.meta.env.VITE_API_KEY_FIREBASE;

// Перехватчик запросов для добавления токена в параметры запроса
axiosApiInstance.interceptors.request.use((config) => {
  const url = config.url
  // Добавление токена только для запросов, не связанных с аутентификацией
  if (!url.includes('signInWithPassword') && !url.includes('signUp')) {
    const authStore = useAuthStore()
    let params = new URLSearchParams()
    params.append('auth', authStore.userInfo.token)
    config.params = params
  }
  return config
})

// Перехватчик ответов для обработки ошибки 401 (Unauthorized) и 400 (Bad Request)
axiosApiInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const authStore = useAuthStore()
  const originalRequest = error.config
  
  // Проверка на ошибку 400 (неправильный запрос) или 401 (неавторизованный доступ)
  if (error.response.status === 400 || (error.response.status === 401 && !originalRequest._retry)) {
    if (error.response.status === 400) {
      // Обработка ошибки 400 (неправильный запрос)
      // Ваш код для обработки неправильного ввода данных при логине или регистрации
      console.log('Ошибка в запросе:', error.response.data); // Вывод информации об ошибке в консоль
      // Дополнительные действия, если необходимо
    }
    
    // Попытка обновления токенов с помощью refreshToken
    try {
      const newTokens = await axios.post(
        `https://securetoken.googleapis.com/v1/token?key=${apiKey}`, {
          grant_type: 'refresh_token',
          refresh_token: JSON.parse(localStorage.getItem('userTokens')).refreshToken
        }
      )
      // Обновление токенов и сохранение их в локальном хранилище
      authStore.userInfo.token = newTokens.data.access_token
      authStore.userInfo.refreshToken = newTokens.data.refresh_token
      localStorage.setItem('userTokens', JSON.stringify({
        token: newTokens.data.access_token,
        refreshToken: newTokens.data.refresh_token
      }))
    } catch (err) {
      // В случае ошибки при обновлении токенов выполняется выход из аккаунта и перенаправление на страницу входа
      localStorage.removeItem('userTokens')
      router.push('/signin')
      authStore.userInfo.token = ''
      authStore.userInfo.refreshToken = ''
    }
  }
  
  // Пробрасываем ошибку дальше по цепочке промисов
  return Promise.reject(error);
})

export default axiosApiInstance