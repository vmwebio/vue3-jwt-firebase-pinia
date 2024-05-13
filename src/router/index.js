import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Signup from '../views/SignUp.vue'
import Signin from '../views/SignIn.vue'
import Cars from '../views/Cars.vue'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      meta: {
        auth: false
      }
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin,
      meta: {
        auth: false
      }
    },
    {
      path: '/cars',
      name: 'cars',
      component: Cars,
      meta: {
        auth: true
      }
    },
  ]
})

// Проверка аутентификации пользователя
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Если требуется аутентификация и нет токена, перенаправить на страницу входа
  if (to.meta.auth && !authStore.userInfo.token) {
    next('/signin')
  // Если аутентификация не требуется, но есть токен, перенаправить на страницу с автомобилями
  } else if (!to.meta.auth && authStore.userInfo.token) {
    next('/cars')
  } else {
    next();
  }
})

export default router