import './assets/main.css'

import { createApp } from 'vue'

import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Vue3Toastify from 'vue3-toastify'

const app = createApp(App)
const pinia = createPinia()

const options = {
  autoClose: 3000
}

app.use(Vue3Toastify, options)

app.use(pinia)
app.use(router)

app.mount('#app')
