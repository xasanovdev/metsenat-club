import './assets/main.css'

import { createApp } from 'vue'

import { createPinia } from 'pinia'

import App from './App.vue'

import router from './router'

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import { Mask } from 'maska'

const app = createApp(App)

const pinia = createPinia()

app.use(pinia)

app.use(router)

app.use(Toast)

app.use.apply(Mask)

app.mount('#app')
