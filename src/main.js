import { createApp } from 'vue'
import App from './App.vue'
import router from './router'  //<-- importing our router file, and then we use the router when creating our application



// createApp(App).mount('#app')
createApp(App).
use(router).mount('#app') // Edited to use router
