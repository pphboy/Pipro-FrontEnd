import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import router from '@/router'
import pinia from '@/store'



const app = createApp(App)

app.use(ElementPlus);
app.use(router);
app.use(pinia)

app.mount('#app')
