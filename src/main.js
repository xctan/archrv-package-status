import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import with_root from '@/with-root'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'

const app = createApp(App)

app.component("with-root", with_root)

app.use(router)

app.mount('#app')
