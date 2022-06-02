import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'  //<-- importing our router file, and then we use the router when creating our application

// Added to import the Store (Custom Implementation of Store)
import { store } from './components/Budget/store.js'
import Axios from 'axios'
//** */

const app = createApp(App)
// Register global component and variables (Custome Store Implementation)
app.config.globalProperties.$store = store
app.config.globalProperties.$http = Axios
// app.component('Budget',Budget);
app
    .use(createPinia())
    .use(router)
    .mount('#app');
