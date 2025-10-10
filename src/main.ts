import { createApp } from 'vue'
import "mdb-vue-ui-kit/css/mdb.min.css";
const pinia=createPinia()
import App from './App.vue'
import { createPinia } from 'pinia';
const app = createApp(App);
app.use(pinia)
app.mount('#app')
