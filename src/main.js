import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'
import "primeflex/primeflex.css";

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './api'

import PrimeVue from 'primevue/config';

// Import Firebase
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAS_BRgXKoue7kGxEIPc1XzV2idSmiKCnA",
  authDomain: "vue3-jwt-pinia.firebaseapp.com",
  projectId: "vue3-jwt-pinia",
  storageBucket: "vue3-jwt-pinia.appspot.com",
  messagingSenderId: "750520181105",
  appId: "1:750520181105:web:5a8458ac3dd797b54296d0"
};
// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue);

app.mount('#app')