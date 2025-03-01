import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { VueEditor } from "vue3-editor";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const app = createApp(App);

app.component("VueEditor", VueEditor);

const auth = getAuth();
onAuthStateChanged(auth,() => {
  app.use(router);
  app.use(store);
  app.mount("#app");
  console.log('main.js (first load)')
});
