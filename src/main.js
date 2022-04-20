import { createApp } from 'vue'
import App from './App.vue'
import router from './router'  //<-- importing our router file, and then we use the router when creating our application

// Added to import the Store
import { store } from './components/Budget/store.js'
import Axios from 'axios'
//** */

// Original 1
// createApp(App).mount('#app')

// Original 2
// createApp(App).
// use(router).
// mount('#app') // Edited to use router
//** */

const app = createApp(App)
// Register global component and variables
app.config.globalProperties.$store = store
app.config.globalProperties.$http = Axios
app.use(router).mount('#app')
