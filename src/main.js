import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { VueEditor } from "vue3-editor"
import Toast  from "vue-toastification"
import "vue-toastification/dist/index.css";

const app = createApp(App)

// register the VueEditor component globally (optional)
app.component('VueEditor', VueEditor)

app.use(Toast) // ✅ Initializes Toast
app.use(router) // ✅ Initializes Vue Router
app.use(store) // ✅ Initializes Vuex Store

app.mount('#app') // ✅ Mounts the app to #app
