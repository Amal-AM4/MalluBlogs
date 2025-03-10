import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { VueEditor } from "vue3-editor";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "@/assets/css/style.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css"; // Default theme

const app = createApp(App);

app.use(router);
app.use(store);
app.use(Toast);
app.component("VueEditor", VueEditor);
app.component("QuillEditor", QuillEditor);

const auth = getAuth();

onAuthStateChanged(auth, () => {
  // Only mount the app once
  if (!app._mounted) {
    app.mount("#app");
    app._mounted = true; // Prevents multiple mounts
    console.log("Vue app mounted successfully!");
  }
});
