import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { VueEditor } from "vue3-editor"


const app = createApp(App)

// register the VueEditor component globally (optional)
app.component('VueEditor', VueEditor)

app.use(router)
app.use(store)

app.mount('#app')
